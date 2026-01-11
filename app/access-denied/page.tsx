export default function AccessDenied() {
  return (
    <div className="min-h-screen marble-bg flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="15" stroke="#141E24" strokeWidth="2" fill="none"/>
          </svg>
          <span className="text-3xl font-semibold text-text-primary">marble</span>
        </div>
        <h1 className="text-2xl font-semibold text-text-primary mb-2">Access Denied</h1>
        <p className="text-text-muted">
          This dashboard requires authentication.
        </p>
      </div>
    </div>
  )
}
