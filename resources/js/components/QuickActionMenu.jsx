import { useState } from 'react';

/**
 * QuickActionMenu Component
 *
 * Floating action menu (top-right)
 * Primary action + optional sub-actions in dropdown
 */
export default function QuickActionMenu({ actions }) {
    const [isOpen, setIsOpen] = useState(false);

    if (!actions || actions.length === 0) return null;

    const primaryAction = actions[0];
    const secondaryActions = actions.slice(1);

    return (
        <div className="fixed bottom-8 right-8 flex flex-col items-end gap-3">
            {/* Secondary Actions (show when menu is open) */}
            {isOpen &&
                secondaryActions.map((action, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            action.onClick();
                            setIsOpen(false);
                        }}
                        className="flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 shadow-lg border border-gray-200 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        <span>{action.icon}</span>
                        <span>{action.label}</span>
                    </button>
                ))}

            {/* Primary Action (always visible) */}
            <button
                onClick={() => {
                    if (secondaryActions.length === 0) {
                        primaryAction.onClick();
                    } else {
                        setIsOpen(!isOpen);
                    }
                }}
                className="flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-3 shadow-lg text-white font-semibold transition hover:bg-indigo-700 active:scale-95"
            >
                <span>{primaryAction.icon}</span>
                <span className="hidden sm:inline">{primaryAction.label}</span>
            </button>
        </div>
    );
}
