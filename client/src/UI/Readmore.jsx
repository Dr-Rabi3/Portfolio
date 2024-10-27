import { Link } from "react-router-dom";

export default function ReadMore({ content, url, download, ...props }) {
  return (
    <div className="more" {...props}>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-up-right"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M17 7l-10 10" />
          <path d="M8 7l9 0l0 9" />
        </svg>
      </span>
      {download ? (
        <Link
          to={url}
          download="CV.pdf"
          target="_blank" // Open in a new tab
          rel="noopener noreferrer" // Recommended for security reasons
          data-text={content}
        >
          {content}
        </Link>
      ) : (
        <Link
          to={url}
          target="_blank" // Open in a new tab
          rel="noopener noreferrer" // Recommended for security reasons
          data-text={content}
        >
          {content}
        </Link>
      )}
    </div>
  );
}
