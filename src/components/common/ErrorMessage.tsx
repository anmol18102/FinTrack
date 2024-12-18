import * as React from "react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <stackLayout className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <label className="text-red-600 mb-2" text={message} />
      {onRetry && (
        <button
          className="text-red-600 text-center"
          text="Retry"
          onTap={onRetry}
        />
      )}
    </stackLayout>
  );
}