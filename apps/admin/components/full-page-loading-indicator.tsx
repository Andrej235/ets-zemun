import LoadingIndicator from "./loading-indicator";

export default function FullPageLoadingIndicator() {
  return (
    <div className="fixed top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
      <LoadingIndicator className="size-8" />
    </div>
  );
}
