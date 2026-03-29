"use client"

import { WizardProvider, useWizard } from "@/lib/wizard-context"
import { WizardStepper } from "@/components/appraisal/wizard-stepper"
import { StepBasicInfo } from "@/components/appraisal/steps/step-basic-info"
import { StepVehicleDetails } from "@/components/appraisal/steps/step-vehicle-details"
import { StepAccidentDamage } from "@/components/appraisal/steps/step-accident-damage"
import { StepPreAccidentComps } from "@/components/appraisal/steps/step-pre-accident-comps"
import { StepPostAccidentComps } from "@/components/appraisal/steps/step-post-accident-comps"
import { StepReviewCalculate } from "@/components/appraisal/steps/step-review-calculate"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Save } from "lucide-react"
import { WIZARD_STEPS } from "@/lib/appraisal-types"

function WizardContent() {
  const { currentStep, goToNextStep, goToPreviousStep, isFirstStep, isLastStep } = useWizard()

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepBasicInfo />
      case 1:
        return <StepVehicleDetails />
      case 2:
        return <StepAccidentDamage />
      case 3:
        return <StepPreAccidentComps />
      case 4:
        return <StepPostAccidentComps />
      case 5:
        return <StepReviewCalculate />
      default:
        return <StepBasicInfo />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">New Appraisal</h1>
          <p className="text-muted-foreground">
            {WIZARD_STEPS[currentStep].title}: {WIZARD_STEPS[currentStep].description}
          </p>
        </div>
        <Button variant="outline" className="w-fit">
          <Save className="mr-2 h-4 w-4" />
          Save Draft
        </Button>
      </div>

      {/* Progress Stepper */}
      <Card className="overflow-hidden">
        <CardContent className="p-4 lg:p-6">
          <WizardStepper />
        </CardContent>
      </Card>

      {/* Step Content */}
      <div className="pb-20">
        {renderStep()}
      </div>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-64 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 z-40">
        <div className="container max-w-5xl mx-auto flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={goToPreviousStep}
            disabled={isFirstStep}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <span>Step {currentStep + 1} of {WIZARD_STEPS.length}</span>
          </div>
          {!isLastStep && (
            <Button 
              onClick={goToNextStep}
              className="bg-primary hover:bg-primary/90"
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function NewAppraisalPage() {
  return (
    <WizardProvider>
      <WizardContent />
    </WizardProvider>
  )
}
