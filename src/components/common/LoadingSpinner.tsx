import * as React from "react";

export function LoadingSpinner() {
  return (
    <activityIndicator
      busy={true}
      className="text-blue-500 w-8 h-8"
    />
  );
}