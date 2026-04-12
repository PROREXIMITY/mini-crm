import { useState, useEffect } from 'react';
import ActivityItem from './ActivityItem';

export default function ActivityTimeline({ activities, isLoading, onDelete }) {

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-center">
                    <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
                    <p className="text-sm text-gray-500">
                        Loading activities...
                    </p>
                </div>
            </div>
        );
    }

    if (!activities || Object.keys(activities).length === 0) {
        return (
            <div className="rounded-lg border-2 border-dashed border-gray-200 py-12 text-center">
                <p className="text-sm text-gray-500">
                    No activities yet. Create your first note!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {Object.entries(activities).map(
                ([dateGroup, groupActivities]) => (
                    <div key={dateGroup}>
                        {/* Date Group Header */}
                        <div className="mb-4 flex items-center gap-3">
                            <div className="text-sm font-semibold text-gray-700">
                                {dateGroup}
                            </div>
                            <div className="flex-1 border-t border-gray-200"></div>
                            <span className="text-xs font-medium text-gray-400">
                                {groupActivities.length}{' '}
                                {groupActivities.length === 1
                                    ? 'item'
                                    : 'items'}
                            </span>
                        </div>

                        {/* Activities in this group */}
                        <div className="space-y-3">
                            {groupActivities.map((activity) => (
                                <div key={activity.id} className="group">
                                    <ActivityItem
                                        activity={activity}
                                        onDelete={onDelete}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ),
            )}
        </div>
    );
}
