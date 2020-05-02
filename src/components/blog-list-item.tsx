/** @jsx jsx */
import React from "react";
import { jsx, Link as TLink } from "theme-ui";
import { Box } from "@theme-ui/components";
import { Link } from "gatsby";
import ItemTags from "./item-tags";

type BlogListItemProps = {
    post: {
        slug: string;
        title: string;
        date: string;
        excerpt: string;
        description: string;
        timeToRead?: number;
        tags?: {
            name: string;
            slug: string;
        }[];
    };
    showTags?: boolean;
};

const BlogListItem = ({ post, showTags = true }: BlogListItemProps) => (
    <Box mb={5}>
        <TLink
            as={Link}
            to={post.slug}
            sx={{ fontSize: [3, 4, 5], color: `text`, fontWeight: `bold` }}
        >
            {post.title}
        </TLink>
        <p
            sx={{
                color: `secondary`,
                mt: 1,
                a: { color: `secondary` },
                fontSize: [1, 1, 1],
            }}
        >
            {post.tags && showTags && (
                <React.Fragment>
                    <ItemTags tags={post.tags} />
                </React.Fragment>
            )}
            <br />
            {post.description && post.description}
        </p>
    </Box>
);

export default BlogListItem;
