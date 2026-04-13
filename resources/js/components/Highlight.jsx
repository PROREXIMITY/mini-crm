/**
 * Highlight Component
 * Renders text with highlighted search matches
 */
export default function Highlight({ text, query }) {
    if (!text || !query) {
        return text;
    }

    // For non-string text, just return as-is
    if (typeof text !== 'string') {
        return text;
    }

    const parts = text.split(new RegExp(`(${query})`, 'gi'));

    return parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="bg-yellow-200 rounded px-0.5 font-medium">
                {part}
            </span>
        ) : (
            <span key={i}>{part}</span>
        )
    );
}
