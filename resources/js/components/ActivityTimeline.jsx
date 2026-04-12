import { useState, useEffect } from 'react';
import ActivityItem from './ActivityItem';

export default function ActivityTimeline({ activities, isLoading, onDelete }) {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
                    <p className="text-sm text-gray-500">
                        Loading activities...
                    </p>
                </div>
            </div>
        );
    }

    const isEmpty =
        !activities || Object.keys(activities).length === 0;

    if (isEmpty) {
        return (
            <div className="flex items-center justify-center py-16">
                <div className="text-center">
                    <div className="mb-3 text-5xl">👀</div>
                    <h3 className="mb-2 font-semibold text-gray-900">
                        No activity yet
                    </h3>
                    <p className="text-sm text-gray-600">
                        Start building your relationship timeline.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative space-y-6 py-2">
            {/* Vertical Timeline Line */}
            <div className="absolute left-6 top-8 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 to-transparent"></div>

            {Object.entries(activities).map(
                ([dateGroup, groupActivities]) => (
                    <div key={dateGroup} className="space-y-4">
                        {/* Date Group Header */}
                        <div className="relative z-10 flex items-center gap-3 pl-20">
                            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 shadow-sm">
                                <span className="text-xs font-semibold text-gray-700">
                                    {dateGroup}
                                </span>
                                <span className="inline-flex items-center justify-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-bold text-gray-600">
                                    {groupActivities.length}
                                </span>
                            </div>
                        </div>

                        {/* Activities with Timeline Markers */}
                        <div className="relative space-y-3 pl-16">
                            {groupActivities.map((activity, index) => (
                                <div key={activity.id} className="relative">
                                    {/* Timeline Dot */}
                                    <div className="absolute -left-10 top-4 h-5 w-5 rounded-full border-4 border-white bg-blue-500 shadow-md"></div>

                                    {/* Activity Card */}
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
