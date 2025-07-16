"use client"

export function Footer() {
  return (
    <footer className="no-print border-t border-border bg-background">
      <div className="container-app py-8">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-6 text-body-small text-muted-foreground">
            <button className="hover:text-foreground transition-colors-smooth focus-ring">Privacy Policy</button>
            <button className="hover:text-foreground transition-colors-smooth focus-ring">Terms of Use</button>
            <button className="hover:text-foreground transition-colors-smooth focus-ring">Cookies Policy</button>
          </div>
          <div className="text-body-small text-muted-foreground">© 2024 Kirtos CV. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
