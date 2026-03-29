"use client"

import { cn } from "@/lib/utils"
import { WIZARD_STEPS } from "@/lib/appraisal-types"
import { useWizard } from "@/lib/wizard-context"
import { User, Car, AlertTriangle, Search, CheckCircle } from "lucide-react"

const iconMap = {
  user: User,
  car: Car,
  "alert-triangle": AlertTriangle,
  search: Search,
  "check-circle": CheckCircle,
}

export function WizardStepper() {
  const { currentStep, setCurrentStep } = useWizard()

  return (
    <div className="w-full">
      {/* Desktop Stepper */}
      <div className="hidden lg:block">
        <nav aria-label="Progress">
          <ol className="flex items-center">
            {WIZARD_STEPS.map((step, index) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap] || CheckCircle
              const isCompleted = index < currentStep
              const isCurrent = index === currentStep

              return (
                <li key={step.id} className={cn("relative", index !== WIZARD_STEPS.length - 1 && "flex-1")}>
                  <div className="flex items-center">
                    <button
                      onClick={() => index <= currentStep && setCurrentStep(index)}
                      disabled={index > currentStep}
                      className={cn(
                        "group relative flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                        isCompleted && "bg-primary text-primary-foreground",
                        isCurrent && "border-2 border-primary bg-background text-primary",
                        !isCompleted && !isCurrent && "border-2 border-muted-foreground/30 bg-background text-muted-foreground",
                        index <= currentStep && "cursor-pointer hover:bg-primary/10"
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </button>
                    {index !== WIZARD_STEPS.length - 1 && (
                      <div
                        className={cn(
                          "ml-4 h-0.5 w-full",
                          isCompleted ? "bg-primary" : "bg-muted-foreground/30"
                        )}
                      />
                    )}
                  </div>
                  <div className="mt-2 min-w-[120px] pr-4">
                    <p
                      className={cn(
                        "text-xs font-medium",
                        isCurrent ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {step.title}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </nav>
      </div>

      {/* Mobile Stepper */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {WIZARD_STEPS.length}
          </span>
          <span className="text-sm font-medium">{WIZARD_STEPS[currentStep].title}</span>
        </div>
        <div className="flex gap-1">
          {WIZARD_STEPS.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                index <= currentStep ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
