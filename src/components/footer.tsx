/** @jsx jsx */
import { jsx } from "theme-ui";

const Footer = () => {
    return (
        <footer
            sx={{
                boxSizing: `border-box`,
                display: `flex`,
                justifyContent: `space-between`,
                mt: [100],
                color: `secondary`,
                a: {
                    variant: `links.secondary`,
                },
                flexDirection: [`column`, `column`, `row`],
                variant: `dividers.top`,
            }}
        >
            <div>&copy; {new Date().getFullYear()} by NM</div>
        </footer>
    );
};

export default Footer;
