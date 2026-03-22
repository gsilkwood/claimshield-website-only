import Link from "next/link"
import { Shield, Phone, Mail } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">ClaimShield DV</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Professional, data-backed diminished value appraisals to help you recover the compensation you deserve.
            </p>
            <div className="space-y-2">
              <Link href="tel:8502011950" className="flex items-center gap-2 text-sm text-primary hover:underline">
                <Phone className="h-4 w-4" />
                (850) 201-1950
              </Link>
              <Link href="mailto:info@claimshielddv.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <Mail className="h-4 w-4" />
                info@claimshielddv.com
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold">Services</h3>
            <nav aria-label="Services Navigation">
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#benefits" className="text-muted-foreground hover:text-foreground">
                    Diminished Value Appraisals
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#who-we-serve" className="text-muted-foreground hover:text-foreground">
                    Partner Program
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-muted-foreground hover:text-foreground">
                    Free Estimate
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold">Resources</h3>
            <nav aria-label="Resources Navigation">
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#what-is-dv" className="text-muted-foreground hover:text-foreground">
                    What is Diminished Value
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials" className="text-muted-foreground hover:text-foreground">
                    Client Reviews
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-muted-foreground hover:text-foreground">
                    FAQ
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold">Legal</h3>
            <nav aria-label="Legal Navigation">
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">&copy; {currentYear} ClaimShield DV. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-primary">BBB A+ Rated</span>
            <span className="text-sm text-muted-foreground">25+ Years of Experience</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
