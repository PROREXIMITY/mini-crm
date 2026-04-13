/**
 * Highlight text utility
 *
 * Takes a text string and a query, returns array of parts with metadata.
 * Case-insensitive matching.
 *
 * @param {string} text - The text to highlight
 * @param {string} query - The search query
 * @returns {Array} Array of {type, key, content} objects
 */
export function highlightText(text, query) {
    if (!text || !query) return text;

    // Split text by the query (case-insensitive) while keeping the matched parts
    const parts = text.split(new RegExp(`(${query})`, 'gi'));

    return parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase()
            ? {
                  type: 'highlight',
                  key: i,
                  content: part,
              }
            : {
                  type: 'text',
                  key: i,
                  content: part,
              }
    );
}
