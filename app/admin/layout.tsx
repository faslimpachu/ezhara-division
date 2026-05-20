export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <div className="font-semibold tracking-tight">Ezhara Admin</div>
              <div className="text-[10px] text-muted-foreground -mt-0.5">Superuser Panel</div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Logged in as Superuser
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
