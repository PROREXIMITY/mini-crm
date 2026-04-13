import { useState, useCallback } from 'react';

/**
 * Hook for managing contact reordering via drag-and-drop
 * Handles local state updates and optional backend persistence
 */
export function useContactReorder(initialContacts) {
    const [contacts, setContacts] = useState(initialContacts);
    const [draggedItem, setDraggedItem] = useState(null);
    const [dragOverItem, setDragOverItem] = useState(null);

    const handleDragStart = useCallback((e, index) => {
        setDraggedItem(index);
        e.dataTransfer.effectAllowed = 'move';
    }, []);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }, []);

    const handleDragEnter = useCallback((e, index) => {
        e.preventDefault();
        setDragOverItem(index);
    }, []);

    const handleDragLeave = useCallback((e) => {
        // Only leave if we're actually leaving the drag target
        if (e.currentTarget === e.target) {
            setDragOverItem(null);
        }
    }, []);

    const handleDrop = useCallback(
        (e, dropIndex) => {
            e.preventDefault();
            e.stopPropagation();

            if (draggedItem === null || draggedItem === dropIndex) {
                setDraggedItem(null);
                setDragOverItem(null);
                return;
            }

            const newContacts = [...contacts];
            const draggedContacts = newContacts.splice(draggedItem, 1);
            newContacts.splice(dropIndex, 0, ...draggedContacts);

            setContacts(newContacts);
            setDraggedItem(null);
            setDragOverItem(null);
        },
        [contacts, draggedItem]
    );

    const handleDragEnd = useCallback(() => {
        setDraggedItem(null);
        setDragOverItem(null);
    }, []);

    return {
        contacts,
        setContacts,
        draggedItem,
        dragOverItem,
        handlers: {
            handleDragStart,
            handleDragOver,
            handleDragEnter,
            handleDragLeave,
            handleDrop,
            handleDragEnd,
        },
    };
}
