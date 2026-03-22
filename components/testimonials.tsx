"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "ClaimShield helped me get over 2x the initial settlement offer from my insurance company. Their expert guidance made all the difference in my claim.",
      name: "Michael R.",
      location: "FL",
    },
    {
      quote:
        "I had no idea I was entitled to diminished value until I found ClaimShield. They walked me through every step and I recovered thousands more than expected.",
      name: "Sarah T.",
      location: "GA",
    },
    {
      quote:
        "The appraisal report was professional and thorough. When the insurance company tried to lowball me, ClaimShield's team helped me negotiate a fair settlement.",
      name: "James L.",
      location: "TX",
    },
    {
      quote:
        "As an attorney, I refer all my clients to ClaimShield for their diminished value claims. Their reports are accurate, well-documented, and hold up against insurance scrutiny.",
      name: "David M., Esq.",
      location: "CA",
    },
    {
      quote:
        "Fast, professional, and worth every penny. The $399 fee paid for itself many times over with the settlement I received.",
      name: "Jennifer K.",
      location: "NC",
    },
    {
      quote:
        "I was skeptical at first, but ClaimShield exceeded all expectations. Their risk-free guarantee gave me confidence, and they delivered results.",
      name: "Robert H.",
      location: "AZ",
    },
  ]

  return (
    <section className="py-20" id="testimonials" aria-labelledby="testimonials-heading">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
              Testimonials
            </div>
            <h2 id="testimonials-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Hundreds of 5-star reviews
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              See what our clients have to say about their experience with ClaimShield DV.
            </p>
            <div className="flex items-center justify-center gap-2 pt-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-lg font-semibold">BBB A+ Rated</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full flex flex-col">
              <CardContent className="pt-6 flex-grow">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">{testimonial.quote}</p>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="flex items-center">
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
