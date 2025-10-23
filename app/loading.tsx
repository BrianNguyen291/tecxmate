export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="text-center">
        <div className="mb-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-alt-gray-200 border-t-primary mx-auto"></div>
        </div>
        <p className="text-alt-gray-500">Loading...</p>
      </div>
    </div>
  )
}
