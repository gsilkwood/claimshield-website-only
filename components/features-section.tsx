import { CheckCircle2 } from "lucide-react"

export default function FeaturesSection() {
  const benefits = [
    "A certified diminished value appraisal report that is accurate and widely accepted by insurance companies",
    "In-depth instructions for every step of the diminished value claim process, including correspondence to submit to the insurance company",
    "Complete negotiation support throughout the claim settlement process",
    "A risk-free experience with our guarantee, ensuring you recover more than our diminished value appraisal fee",
    "Personalized assistance and advice from a trusted industry expert",
  ]

  return (
    <section className="py-20 bg-muted/50 dark:bg-muted/10" id="benefits" aria-labelledby="benefits-heading">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
              What You Get
            </div>
            <h2 id="benefits-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Everything you need to recover your claim
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Our comprehensive service includes everything from appraisal to settlement support.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl bg-background border shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                    <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>
                <p className="text-base leading-relaxed text-foreground">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
