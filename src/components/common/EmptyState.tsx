import * as React from "react";

interface EmptyStateProps {
  message: string;
  action?: {
    label: string;
    onPress: () => void;
  };
}

export function EmptyState({ message, action }: EmptyStateProps) {
  return (
    <stackLayout className="p-8 items-center justify-center">
      <label className="text-gray-500 text-center mb-4" text={message} />
      {action && (
        <button
          className="text-blue-500"
          text={action.label}
          onTap={action.onPress}
        />
      )}
    </stackLayout>
  );
}