import { Button } from "@/components/ui/button"
import { Phone, Shield, CheckCircle2, Award } from "lucide-react"
import Link from "next/link"
import ContactForm from "@/components/contact-form"
import Testimonials from "@/components/testimonials"
import UseCases from "@/components/use-cases"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FramerSpotlight from "@/components/framer-spotlight"
import CssGridBackground from "@/components/css-grid-background"
import FeaturesSection from "@/components/features-section"
import StructuredData from "@/components/structured-data"

export default function Home() {
  return (
    <>
      <StructuredData />
      <div className="flex min-h-screen flex-col">
        <Navbar />

        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <CssGridBackground />
          <FramerSpotlight />
          <div className="container px-4 md:px-6 py-16 md:py-20">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-1 text-sm mb-6">
                <Award className="h-4 w-4 text-primary" />
                <span>25+ Years of Service</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
                Diminished value appraisals you can trust
              </h1>
              <p className="text-xl text-muted-foreground md:text-2xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-2xl mb-6">
                We provide professional, data-backed diminished value appraisals to help you prove your claim and recover the compensation you deserve after an accident.
              </p>
              <p className="text-lg font-semibold text-foreground mb-8">
                Do not leave money on the table. We Can Help.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <Button 
                  asChild
                  className="px-6 py-6 h-[56px] bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl border-0 text-base font-semibold"
                >
                  <Link href="#contact">
                    Get Your Free Estimate
                  </Link>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  className="px-6 py-6 h-[56px] rounded-xl border-2 text-base font-semibold"
                >
                  <Link href="#how-it-works">
                    Learn More
                  </Link>
                </Button>
              </div>

              <Link 
                href="tel:8502011950" 
                className="flex items-center gap-2 text-primary hover:underline text-lg font-medium"
              >
                <Phone className="h-5 w-5" />
                Or call us directly at (850) 201-1950
              </Link>
            </div>
          </div>
        </section>

        {/* What is Diminished Value Section */}
        <section id="what-is-dv" className="py-20" aria-labelledby="what-is-dv-heading">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
                    Understanding Your Rights
                  </div>
                  <h2 id="what-is-dv-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    What is diminished value?
                  </h2>
                </div>
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none text-center">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  When your vehicle is involved in an accident, even after repairs, it loses value. This loss is called &quot;diminished value.&quot; Most people do not realize that if you were not at fault, you have the right to claim this lost value from the at-fault party&apos;s insurance company.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Insurance companies are not required to tell you about diminished value, and they often hope you will not find out. The result? Thousands of dollars left on the table that rightfully belong to you.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  ClaimShield DV provides certified, data-backed diminished value appraisals that are accurate and widely accepted by insurance companies. We guide you through every step of the claim process and help you negotiate the settlement you deserve.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <FeaturesSection />

        {/* How It Works */}
        <section className="py-20" id="how-it-works" aria-labelledby="how-it-works-heading">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
                  Simple Process
                </div>
                <h2 id="how-it-works-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  How it works
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Three simple steps to recover your vehicle&apos;s lost value.
                </p>
              </div>
            </div>
            <div className="grid gap-8 lg:grid-cols-3 lg:gap-12 items-start max-w-5xl mx-auto">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold">Get your free estimate</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Learn how much diminished value you can claim. Get answers to all of your questions with no obligation.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold">Purchase your appraisal</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We charge a one-time, flat fee upfront, typically $399 for most claims. Our certified appraisal reports are accurate, not over-inflated, and widely accepted by insurance companies.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold">Negotiate your settlement</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We consult with you throughout your claim. Our ongoing assistance includes helping you gather additional evidence and personalized coaching to address any issues that may arise.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Bio Section */}
        <section id="about" className="py-20 bg-[#1E293B] dark:bg-[#0F172A]" aria-labelledby="founder-heading">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 id="founder-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl text-white mb-8">
                Our Founder
              </h2>
              <div className="flex flex-col items-center space-y-6">
                <div className="w-32 h-32 rounded-full bg-[#2a3a4f] flex items-center justify-center">
                  <Shield className="h-16 w-16 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">Industry Expert, CPCU, AIC, ASE</h3>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
                  Our founder is well known in the auto insurance and appraisal industry with over 25 years of experience working with Fortune 500 companies including Kemper, SAFECO, First Federal Bank & Trust, Progressive, Liberty Mutual, and USAA. Leverage our knowledge and expertise to help you with your claim.
                </p>
                <Button 
                  asChild
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10 mt-4"
                >
                  <Link href="#contact">
                    Learn More About ClaimShield DV
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Serve */}
        <UseCases />

        {/* Testimonials */}
        <Testimonials />

        {/* Trust & Guarantee Section */}
        <section className="py-20 bg-muted/50 dark:bg-muted/10" aria-labelledby="guarantee-heading">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-4">
                Risk-Free Guarantee
              </div>
              <h2 id="guarantee-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                Our commitment to you
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
                We stand behind our work with a risk-free guarantee. If you do not recover more than our appraisal fee, you do not pay. Our data-backed methodology and licensed appraiser credentials ensure you receive an accurate, defensible appraisal.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="flex flex-col items-center space-y-3 p-6 rounded-xl bg-background border">
                  <CheckCircle2 className="h-10 w-10 text-primary" />
                  <h3 className="font-bold">Data-Backed Methodology</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Our appraisals are based on verifiable market data and proven valuation methods.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-3 p-6 rounded-xl bg-background border">
                  <CheckCircle2 className="h-10 w-10 text-primary" />
                  <h3 className="font-bold">Licensed Appraisers</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    CPCU, AIC, and ASE certified professionals with industry expertise.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-3 p-6 rounded-xl bg-background border">
                  <CheckCircle2 className="h-10 w-10 text-primary" />
                  <h3 className="font-bold">Insurance Accepted</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Our reports are widely accepted by insurance companies nationwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact/Pricing Section */}
        <section id="contact" className="py-20" aria-labelledby="contact-heading">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
                    Get Started
                  </div>
                  <h2 id="contact-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Ready to recover your claim?
                  </h2>
                  <p className="text-muted-foreground md:text-xl">
                    Contact us today for a free estimate. We will help you understand your options and guide you through the entire process.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Typically $399 for most claims - one-time, flat fee</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Risk-free guarantee - recover more than our fee or you do not pay</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>Complete negotiation support included</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>25+ years of industry experience</span>
                  </div>
                </div>
                <div className="pt-4">
                  <p className="font-medium mb-2">Business Hours</p>
                  <p className="text-muted-foreground">Monday - Friday, 9am - 6pm EST</p>
                  <Link 
                    href="tel:8502011950" 
                    className="flex items-center gap-2 text-primary hover:underline text-lg font-semibold mt-4"
                  >
                    <Phone className="h-5 w-5" />
                    (850) 201-1950
                  </Link>
                </div>
              </div>
              <div className="lg:ml-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
