---
title: "TODO"
slug: todo
date: 2020-07-21
description: "todo"
tags: []
draft: true
---

Next time, before juggling tons of locks and waitgroups to prevent data races in Golang, you might consider simply opting for good old-fashioned channels. When used for mutual exclusion, channels too provide correctness all while. Moreoever they are arguably more readable and harder to get wrong. If you aren't fully familiar with the concurrency guarantees provided by Go channels (beyond allowing for concurrent sends & receives) read on.

As a working example to compare and contrast with, let's consider the [Workiva/go-datastructures/futures](github.com/Workiva/go-datastructures/tree/master/futures) package. I'd define a *future* as a sort of placeholder for a result that's being computed asynchronously and will be accessed by multiple threads/go-routines concurently. Here's a better and simpler definition though from Heather Miller & her students' book, *Programming Models for Distributed Computation*:
> A future or promise can be thought of as a value that will eventually become available.
Alternatively, if you're already familiar with Javasript, futures are similar to ES6 promises.

The `Workiva/futures` [API](godoc.org/github.com/Workiva/go-datastructures/futures) is short enough and is a great place to start from. The caller creates a Future value by invoking `futures.New(completer, timeout)`. The `completer` argument is a read-only channel through which the result is received asynchronously. The `timeout` argument is there to avoid waiting for the result indefinitely. One can then check whether the result is available using the `HasResult` method. If the result is available, it is retrieved using the `GetResult` method. If the result hasn't yet arrived, `GetResult` blocks until it's available or a timeout occurs.
```go
// Completer is a channel that the future expects to receive
// a result on.  The future only receives on this channel.
type Completer <-chan interface{}

type Future struct {...}

func New(completer Completer, timeout time.Duration) *Future

func (f *Future) HasResult() bool

func (f *Future) GetResult() (interface{}, error)
```


The Future struct has the following fields:
```go 
type Future struct {
	triggered bool 
	item      interface{}
	err       error
	lock      sync.Mutex
	wg        sync.WaitGroup
}
```
Once available, the result is stored in the `item` field. However, if a timeout occurs, the `item` field is set to nil and the `err` field is set to a timeout error. The `triggered` boolean is mainly used to check whether the result is available. By default it's `false`. Once either the result is received or a timeout occurs it's flipped to `true`. We'll get to `lock` and `wg` soon enough but as you can already guess, by the end of this post, both will be replaced with a single channel.

As already mentioned, the `futures.New` function is used to create a Future instance. Internally, `New` launches a goroutine in which it waits for the result. The code sample below has been trimmed to emphasize the key ideas. Also observe that `f.wg` is incremented by 1 - `f.wg` will become relevant when we get to the `GetResult` method.
```go
var errTimeout error = errors.New("timeout error")

func listenForResult(f *Future, ch <-chan interface{}, timeout time.Duration) {
	t := time.NewTimer(timeout)
	select {
	case item := <-ch:
		f.setItem(item, nil)
		t.Stop()
	case <-t.C:
		f.setItem(nil, errTimeout)
	}
}

func New(completer <-chan interface{}, timeout time.Duration) *Future {
	f := &Future{}
	f.wg.Add(1)
    // ...
	go listenForResult(f, completer, timeout)
    // ...
	return f
}
```

When the value arrives from the `completer` channel (or a timeout occurs), the future's `setItem` method is called with the result. Now, this is where things get interesting. The `setItem` method is defined as follows:
```go
func (f *Future) setItem(item interface{}, err error) {
	f.lock.Lock()
	f.triggered = true
	f.item = item
	f.err = err
	f.lock.Unlock()
	f.wg.Done()
}
```

Once `setItem` is done, all callers that were blocked on `GetResult` can now read the value. Again, for the sake of completion, here's how `GetResult` is defined:
```go
func (f *Future) GetResult() (interface{}, error) {
	f.lock.Lock()
	if f.triggered {
		f.lock.Unlock()
		return f.item, f.err
	}
	f.lock.Unlock()

	f.wg.Wait()
	return f.item, f.err
}
```

The usage of both the waitgroup and the lock can be replaced with channels. We'll go through each one by one to see why they are there and how channels can be used in an equivalent manner. Let's start with the waitgroup

The `wg` waitgroup (which was incremented to 1 during instantiation) is there to make every goroutine that calls `GetResult` wait if the result isn't available. Once available, i.e. when `setItem` invokes `f.wg.Done()`, all the goroutines that were blocked can then proceed and read the result. Simply put, the waitgroup is there for notifying blocked callers. The same can be achieved by having callers block directly while trying to 'read' a value from a channel and then closing the channel once the result is ready:
```go
type Future struct {
    // ...
    completed chan struct{}
}

func New(completer <-chan interface{}, timeout time.Duration) *Future {
    // Note that the channel is unbuffered
	f := &Future{
        completed: make(chan struct{}),
    }
    // ...
   	go listenForResult(f, completer, timeout)
    // ...
	return f
}

func listenForResult(f *Future, ch <-chan interface{}, timeout time.Duration) {
	t := time.NewTimer(timeout)
	select {
	case item := <-ch:
		f.setItem(item, nil)
		t.Stop()
	case <-t.C:
		f.setItem(nil, errTimeout)
    }
    close(f.complete) // broadcast completion
}

func (f *Future) GetResult() (interface{}, error) {
    f.lock.Lock()
	if f.triggered {
		f.lock.Unlock()
		return f.item, f.err
	}
    f.lock.Unlock()
    
	<-f.completed // blocks until either value is sent or channel is closed
	return f.item, f.err
}
```

The `close()` acts as the signal broadcast. Once closed

Now, for the locks. The `f.lock` is used to ensure that data races don't occur. By definition

Therefore, given the synchronization guarantees that unbuffered channels provide, the `Future` struct, `GetResult` and `listenForResult` can do away with locks and be further simplified into the following. Note that the `setItem` helper method is no longer required
```go
type Future struct {
	item      interface{}
	err       error
	completed chan struct{}
}

func (f *Future) GetResult() (interface{}, error) {
	<-f.completed
	return f.item, f.err
}

func (f *Future) listenForResult(ch <-chan interface{}, timeout time.Duration) {
	t := time.NewTimer(timeout)
	select {
	case item := <-ch:
		f.item = item
		t.Stop()
	case <-t.C:
		f.err = errTimeout
	}
	close(f.completed)
}
```