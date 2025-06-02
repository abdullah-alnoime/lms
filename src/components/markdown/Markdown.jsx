import React, { useContext, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import { Info, AlertTriangle, CheckCircle } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const BlockquoteRender = ({ node, children }) => {
    const childrenArray = React.Children.toArray(children);
    const processedChildren = childrenArray.map(child => {
        if (typeof child === "string") {
            return child.replace(/\[(warning|success)\]\s*/g, "");
        }
        if (React.isValidElement(child) && child.props.children) {
            const newChildren = React.Children.map(child.props.children, c => {
                return typeof c === "string"
                    ? c.replace(/\[(warning|success)\]\s*/g, "")
                    : c;
            });
            return React.cloneElement(child, {}, newChildren);
        }
        return child;
    });

    const hasWarning = childrenArray.some(child =>
        typeof child === "string"
            ? child.includes("[warning]")
            : React.isValidElement(child) &&
              child.props.children?.toString().includes("[warning]")
    );

    const hasSuccess = childrenArray.some(child =>
        typeof child === "string"
            ? child.includes("[success]")
            : React.isValidElement(child) &&
              child.props.children?.toString().includes("[success]")
    );

    if (hasWarning) {
        return <blockquote className="warning">{processedChildren}</blockquote>;
    }
    if (hasSuccess) {
        return (
            <blockquote className="success">
                {processedChildren}
            </blockquote>
        );
    }
    return <blockquote>{children}</blockquote>;
};

const Markdown = ({ content }) => {
    const { theme } = useTheme();
    useEffect(() => {
        const loadHighlightTheme = async () => {
            const existingTheme = document.querySelector('link[data-highlight-theme]');
            if (existingTheme) {
                existingTheme.remove();
            }
            const themeFile = theme === 'dark' 
                ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css'
                : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = themeFile;
            link.setAttribute('data-highlight-theme', theme);
            document.head.appendChild(link);
        };
        loadHighlightTheme();
    }, [theme]);
    return (
        <section className="markdown-content">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
                components={{
                    table: ({ node, ...props }) => (
                        <div className="table-container">
                            <div className="table-responsive">
                                <table {...props} />
                            </div>
                        </div>
                    ),
                    blockquote: BlockquoteRender
                }}
            >
                {content}
            </ReactMarkdown>
        </section>
    );
};

export default Markdown;