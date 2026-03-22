"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import FrostedGlassIcon from "@/components/frosted-glass-icon"
import { Car, Scale, Briefcase, Wrench, Users, FileText } from "lucide-react"

export default function UseCases() {
  const audiences = [
    {
      icon: <Car className="h-6 w-6" />,
      title: "Individual Drivers",
      description:
        "If your vehicle was damaged in an accident that wasn't your fault, you may be entitled to diminished value compensation. We help you understand your rights and recover what you deserve.",
      accentColor: "rgba(37, 99, 235, 0.5)",
    },
    {
      icon: <Scale className="h-6 w-6" />,
      title: "Personal Injury Attorneys",
      description:
        "Partner with us to provide comprehensive diminished value services to your clients. Our accurate, well-documented reports strengthen cases and support maximum recovery.",
      accentColor: "rgba(139, 92, 246, 0.5)",
    },
    {
      icon: <Wrench className="h-6 w-6" />,
      title: "Auto Body Shops",
      description:
        "Enhance your customer service by connecting clients with professional diminished value appraisals. Earn referral fees while helping your customers recover additional compensation.",
      accentColor: "rgba(245, 158, 11, 0.5)",
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Insurance Professionals",
      description:
        "Independent adjusters and agents can partner with us to provide clients with accurate diminished value assessments. Build stronger relationships with comprehensive claim support.",
      accentColor: "rgba(16, 185, 129, 0.5)",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Fleet Managers",
      description:
        "Protect your company's vehicle investments. We provide bulk appraisal services for commercial fleets to recover diminished value across multiple vehicles.",
      accentColor: "rgba(239, 68, 68, 0.5)",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Vehicle Appraisers",
      description:
        "Expand your service offerings by partnering with ClaimShield. Access our proven methodology and industry expertise to deliver diminished value appraisals.",
      accentColor: "rgba(14, 165, 233, 0.5)",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-muted/10" id="who-we-serve">
      <div className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
              Who We Serve
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Trusted by drivers and professionals alike
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Whether you are an individual claimant or a professional partner, ClaimShield DV has you covered.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {audiences.map((audience, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full bg-background/60 backdrop-blur-sm border transition-all duration-300 hover:shadow-lg dark:bg-background/80">
                <CardHeader className="pb-2">
                  <FrostedGlassIcon icon={audience.icon} color={audience.accentColor} className="mb-4" />
                  <CardTitle>{audience.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{audience.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
