"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { AppraisalData, VehicleOwner, InsuranceInfo, SubjectVehicle, AccidentDetails, ComparablesConfig, AppraiserInfo, AppraisalMetadata } from "./appraisal-types"

interface WizardContextType {
  currentStep: number
  setCurrentStep: (step: number) => void
  data: Partial<AppraisalData>
  updateData: <K extends keyof AppraisalData>(key: K, value: AppraisalData[K]) => void
  updateMetadata: (metadata: Partial<AppraisalMetadata>) => void
  updateOwner: (owner: Partial<VehicleOwner>) => void
  updateInsurance: (insurance: Partial<InsuranceInfo>) => void
  updateVehicle: (vehicle: Partial<SubjectVehicle>) => void
  updateAccident: (accident: Partial<AccidentDetails>) => void
  updateComparables: (comparables: Partial<ComparablesConfig>) => void
  updateAppraiser: (appraiser: Partial<AppraiserInfo>) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
  isFirstStep: boolean
  isLastStep: boolean
  resetWizard: () => void
}

const WizardContext = createContext<WizardContextType | null>(null)

const TOTAL_STEPS = 6

const initialData: Partial<AppraisalData> = {
  status: "draft",
  metadata: {
    claimNumber: "",
    appraisalDate: new Date().toISOString().split("T")[0],
    accidentDate: "",
    purpose: "insurance_claim",
    intendedUse: "Support insurance or legal claims",
  },
  owner: {
    fullName: "",
    address: { street: "", city: "", state: "", zip: "" },
    phone: "",
    email: "",
  },
  insurance: {
    insuranceCompany: "",
    policyNumber: "",
    claimNumber: "",
    adjusterName: "",
    adjusterPhone: "",
  },
  vehicle: {
    vin: "",
    year: new Date().getFullYear(),
    make: "",
    model: "",
    trim: "",
    bodyStyle: "",
    engine: "",
    transmission: "",
    exteriorColor: "",
    interiorColor: "",
    productionDate: "",
    mileageAtAccident: 0,
    standardFeatures: [],
    optionalEquipment: [],
    preAccidentCondition: {
      overallGrade: "good",
      mechanicalCondition: "good",
      tireCondition: "good_tread",
      paintCondition: "good",
      bodyCondition: "no_damage",
      glassCondition: "perfect",
      interiorCondition: "good",
      maintenanceNotes: "",
    },
    priorAccidents: false,
    priorAccidentDetails: "",
  },
  accident: {
    lossType: "collision",
    pointOfImpact: "rear",
    structuralDamage: false,
    frameDamage: false,
    unibodyDeformation: false,
    airbagDeployment: false,
    repairFacility: "",
    repairFacilityPhone: "",
    totalRepairCost: 0,
    bodyLaborHours: 0,
    frameLaborHours: 0,
    refinishLaborHours: 0,
    mechanicalLaborHours: 0,
    totalLaborHours: 0,
    framePullingRequired: false,
    frameMachineHours: 0,
    alignmentRequired: false,
    panelsReplaced: [],
    paintedPanels: [],
    paintType: "factory_oem",
    oemPartsUsed: true,
    aftermarketPartsUsed: false,
    aftermarketPartsList: "",
    damagePhotos: [],
    repairPhotos: [],
    repairEstimatePdf: "",
  },
  comparables: {
    useAutoSearch: true,
    autoSearchParams: {
      searchRadiusMiles: 100,
      mileageTolerance: 10000,
      minComps: 3,
      maxComps: 5,
    },
    preAccidentComps: [],
    postAccidentComps: [],
  },
  appraiser: {
    isProfessionalAppraiser: true,
    appraiserName: "",
    appraiserCompany: "ClaimShield DV",
    appraiserLicense: "",
    appraiserCertifications: [],
    financialInterest: false,
    conflictOfInterest: false,
  },
}

export function WizardProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<Partial<AppraisalData>>(initialData)

  const updateData = useCallback(<K extends keyof AppraisalData>(key: K, value: AppraisalData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }))
  }, [])

  const updateMetadata = useCallback((metadata: Partial<AppraisalMetadata>) => {
    setData((prev) => ({
      ...prev,
      metadata: { ...prev.metadata, ...metadata } as AppraisalMetadata,
    }))
  }, [])

  const updateOwner = useCallback((owner: Partial<VehicleOwner>) => {
    setData((prev) => ({
      ...prev,
      owner: { ...prev.owner, ...owner } as VehicleOwner,
    }))
  }, [])

  const updateInsurance = useCallback((insurance: Partial<InsuranceInfo>) => {
    setData((prev) => ({
      ...prev,
      insurance: { ...prev.insurance, ...insurance } as InsuranceInfo,
    }))
  }, [])

  const updateVehicle = useCallback((vehicle: Partial<SubjectVehicle>) => {
    setData((prev) => ({
      ...prev,
      vehicle: { ...prev.vehicle, ...vehicle } as SubjectVehicle,
    }))
  }, [])

  const updateAccident = useCallback((accident: Partial<AccidentDetails>) => {
    setData((prev) => ({
      ...prev,
      accident: { ...prev.accident, ...accident } as AccidentDetails,
    }))
  }, [])

  const updateComparables = useCallback((comparables: Partial<ComparablesConfig>) => {
    setData((prev) => ({
      ...prev,
      comparables: { ...prev.comparables, ...comparables } as ComparablesConfig,
    }))
  }, [])

  const updateAppraiser = useCallback((appraiser: Partial<AppraiserInfo>) => {
    setData((prev) => ({
      ...prev,
      appraiser: { ...prev.appraiser, ...appraiser } as AppraiserInfo,
    }))
  }, [])

  const goToNextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1))
  }, [])

  const goToPreviousStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }, [])

  const resetWizard = useCallback(() => {
    setCurrentStep(0)
    setData(initialData)
  }, [])

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        data,
        updateData,
        updateMetadata,
        updateOwner,
        updateInsurance,
        updateVehicle,
        updateAccident,
        updateComparables,
        updateAppraiser,
        goToNextStep,
        goToPreviousStep,
        isFirstStep: currentStep === 0,
        isLastStep: currentStep === TOTAL_STEPS - 1,
        resetWizard,
      }}
    >
      {children}
    </WizardContext.Provider>
  )
}

export function useWizard() {
  const context = useContext(WizardContext)
  if (!context) {
    throw new Error("useWizard must be used within a WizardProvider")
  }
  return context
}
