import { merge } from "theme-ui";
import { tailwind } from "@theme-ui/presets";

export default merge(tailwind, {
  initialColorModeName: `light`,
  useCustomProperties: true,
  code: {
    backgroundColor: `gray`,
  },
  colors: {
    primary: tailwind.colors.gray[7],
    secondary: `#5f6c80`,
    toggleIcon: tailwind.colors.gray[8],
    heading: tailwind.colors.black,
    divide: tailwind.colors.gray[4],
    modes: {
      dark: {
        text: tailwind.colors.gray[4],
        primary: `#999999`,
        secondary: `#7f8ea3`,
        toggleIcon: tailwind.colors.gray[4],
        background: `#1A202C`,
        heading: tailwind.colors.white,
        divide: tailwind.colors.gray[8],
        muted: tailwind.colors.gray[8],
      },
    },
  },
  fonts: {
    heading: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`,
    body: `"source sans pro", "IBM Plex Sans", -apple-system, BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"`,
  },
  styles: {
    root: {
      color: `text`,
      backgroundColor: `background`,
      margin: 10,
      padding: 0,
      boxSizing: `border-box`,
      textRendering: `optimizeLegibility`,
      fontWeight: 300,
    },
    p: {
      fontSize: [1, 1, 2],
      //letterSpacing: `0.003em`,
      lineHeight: `body`,
      "--baseline-multiplier": 0.179,
      "--x-height-multiplier": 0.35,
    },
    ul: {
      li: {
        fontSize: [1, 1, 2],
        letterSpacing: `-0.003em`,
        lineHeight: `body`,
        "--baseline-multiplier": 0.179,
        "--x-height-multiplier": 0.35,
      },
    },
    ol: {
      li: {
        fontSize: [1, 1, 2],
        letterSpacing: `-0.003em`,
        lineHeight: `body`,
        "--baseline-multiplier": 0.179,
        "--x-height-multiplier": 0.35,
      },
    },
    h1: {
      variant: `text.heading`,
      fontSize: [5, 6, 7],
      fontFamily: "heading",
      mt: 2,
    },
    h2: {
      variant: `text.heading`,
      fontSize: [4, 5, 6],
      mt: 2,
    },
    h3: {
      variant: `text.heading`,
      fontSize: [3, 4, 5],
      mt: 3,
    },
    h4: {
      variant: `text.heading`,
      fontSize: [2, 3, 4],
    },
    h5: {
      variant: `text.heading`,
      fontSize: [1, 2, 3],
    },
    h6: {
      variant: `text.heading`,
      fontSize: 1,
      mb: 2,
    },
    blockquote: {
      borderLeftColor: `secondary`,
      borderLeftStyle: `solid`,
      borderLeftWidth: `10px`,
      mx: 0,
      pl: 20,
      p: {
        fontFamily: `body`,
        color: `secondary`,
      },
    },
    table: {
      width: `100%`,
      my: 4,
      borderCollapse: `separate`,
      borderSpacing: 0,
      [[`th`, `td`]]: {
        textAlign: `left`,
        py: `4px`,
        pr: `4px`,
        pl: 0,
        borderColor: `muted`,
        borderBottomStyle: `solid`,
      },
    },
    th: {
      verticalAlign: `bottom`,
      borderBottomWidth: `2px`,
      color: `heading`,
    },
    td: {
      verticalAlign: `top`,
      borderBottomWidth: `1px`,
    },
  },
  layout: {
    container: {
      padding: [4, 5],
      maxWidth: `800px`,
    },
  },
  text: {
    heading: {
      fontFamily: `heading`,
      fontWeight: `heading`,
      lineHeight: `heading`,
      color: `heading`,
    },
  },
  dividers: {
    bottom: {
      borderBottomStyle: `solid`,
      borderBottomWidth: `1px`,
      borderBottomColor: `divide`,
      pb: 3,
    },
    top: {
      borderTopStyle: `solid`,
      borderTopWidth: `1px`,
      borderTopColor: `divide`,
      pt: 3,
    },
  },
  links: {
    secondary: {
      color: `secondary`,
      textDecoration: `none`,
      ":hover": {
        color: `heading`,
        textDecoration: `underline`,
      },
      ":focus": {
        color: `heading`,
      },
    },
    listItem: {
      fontSize: [1, 2, 3],
      color: `text`,
    },
  },
});
