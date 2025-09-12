export default function FullPageLoadingIndicator() {
  return (
    <div className="fixed top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
      <div className="flex h-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary" />
      </div>
    </div>
  );
}
