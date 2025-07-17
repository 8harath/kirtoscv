export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-black/10 dark:border-white/20 border-t-black dark:border-t-white rounded-full animate-spin" />
        <span className="text-muted-foreground text-sm tracking-wide">Loading...</span>
      </div>
    </div>
  )
}
