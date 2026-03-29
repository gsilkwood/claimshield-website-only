// Appraisal Types based on ClaimShield DV Master Schema

export interface AppraisalMetadata {
  claimNumber?: string
  appraisalDate: string
  accidentDate: string
  purpose: "insurance_claim" | "legal_proceeding" | "dispute_resolution" | "expert_testimony"
  intendedUse: string
}

export interface VehicleOwner {
  fullName: string
  address: {
    street: string
    city: string
    state: string
    zip: string
  }
  phone: string
  email: string
}

export interface InsuranceInfo {
  insuranceCompany: string
  policyNumber?: string
  claimNumber?: string
  adjusterName?: string
  adjusterPhone?: string
}

export interface EquipmentItem {
  name: string
  factoryPrice: number
}

export interface PreAccidentCondition {
  overallGrade: "excellent" | "good" | "average" | "below_average" | "rough"
  mechanicalCondition: "excellent" | "good" | "fair" | "poor"
  tireCondition: "new" | "good_tread" | "average_tread" | "worn"
  paintCondition: "excellent" | "good" | "fair" | "poor"
  bodyCondition: "no_damage" | "minor_dings" | "moderate_wear" | "significant_damage"
  glassCondition: "perfect" | "minor_pitting" | "chips" | "cracks"
  interiorCondition: "excellent" | "good" | "fair" | "poor"
  maintenanceNotes?: string
}

export interface SubjectVehicle {
  vin: string
  year: number
  make: string
  model: string
  trim: string
  bodyStyle: string
  engine: string
  transmission: string
  exteriorColor: string
  interiorColor: string
  productionDate: string
  mileageAtAccident: number
  standardFeatures: string[]
  optionalEquipment: EquipmentItem[]
  preAccidentCondition: PreAccidentCondition
  priorAccidents: boolean
  priorAccidentDetails?: string
}

export interface PanelItem {
  panelName: string
  panelType: "structural" | "cosmetic" | "bolt-on"
  replacedOrRepaired: "replaced" | "repaired"
}

export interface AccidentDetails {
  lossType: "collision" | "comprehensive"
  pointOfImpact: "front" | "rear" | "left_side" | "right_side" | "rollover" | "multiple"
  structuralDamage: boolean
  frameDamage: boolean
  unibodyDeformation?: boolean
  airbagDeployment: boolean
  repairFacility: string
  repairFacilityPhone: string
  totalRepairCost: number
  bodyLaborHours: number
  frameLaborHours: number
  refinishLaborHours: number
  mechanicalLaborHours: number
  totalLaborHours: number
  framePullingRequired: boolean
  frameMachineHours?: number
  alignmentRequired: boolean
  panelsReplaced: PanelItem[]
  paintedPanels: string[]
  paintType: "factory_oem" | "aftermarket_quality" | "budget"
  oemPartsUsed: boolean
  aftermarketPartsUsed: boolean
  aftermarketPartsList?: string
  damagePhotos: string[]
  repairPhotos: string[]
  repairEstimatePdf: string
}

export interface ComparableVehicle {
  id: string
  source: string
  listingUrl: string
  listingStatus: "active" | "sold" | "pending"
  vin: string
  year: number
  make: string
  model: string
  trim: string
  mileage: number
  accidentHistory: "no_accidents" | "accident_reported"
  listingPrice: number
  adjustedValue?: number
  additionalEquipment: EquipmentItem[]
  missingEquipment: EquipmentItem[]
}

export interface ComparablesConfig {
  useAutoSearch: boolean
  autoSearchParams: {
    searchRadiusMiles: number
    mileageTolerance: number
    minComps: number
    maxComps: number
  }
  preAccidentComps: ComparableVehicle[]
  postAccidentComps: ComparableVehicle[]
}

export interface AppraiserInfo {
  isProfessionalAppraiser: boolean
  appraiserName: string
  appraiserCompany: string
  appraiserLicense: string
  appraiserCertifications: string[]
  appraiserSignature?: string
  financialInterest: boolean
  conflictOfInterest: boolean
}

export interface ValuationResults {
  preAccidentFmv: {
    rawCompValues: number[]
    calculationMethod: "median" | "mean" | "weighted_average"
    calculatedValue: number
    confidenceRange: { low: number; high: number }
  }
  postRepairAcv: {
    rawCompValues: number[]
    calculationMethod: "median" | "mean"
    calculatedValue: number
    confidenceRange: { low: number; high: number }
  }
  diminishedValue: {
    calculatedAmount: number
    percentageOfPreValue: number
    percentageOfRepairCost: number
    repairCostMethodEstimate: number
    varianceAnalysis: string
  }
}

export interface SeverityAnalysis {
  severityLevel: 1 | 2 | 3 | 4 | 5
  severityJustification: string
  postRepairNaaaGrade: "excellent" | "good" | "average" | "below_average" | "rough"
  naaaDowngradeReason: string
}

export interface AppraisalData {
  id?: string
  userId: string
  status: "draft" | "processing" | "completed"
  metadata: AppraisalMetadata
  owner: VehicleOwner
  insurance: InsuranceInfo
  vehicle: SubjectVehicle
  accident: AccidentDetails
  comparables: ComparablesConfig
  appraiser: AppraiserInfo
  valuation?: ValuationResults
  severity?: SeverityAnalysis
  reportPdfUrl?: string
  createdAt: string
  updatedAt: string
}

// Wizard step definition
export interface WizardStep {
  id: string
  title: string
  description: string
  icon: string
}

export const WIZARD_STEPS: WizardStep[] = [
  {
    id: "basic-info",
    title: "Basic Information",
    description: "Owner and claim details",
    icon: "user",
  },
  {
    id: "vehicle-details",
    title: "Vehicle Details",
    description: "VIN and vehicle specifications",
    icon: "car",
  },
  {
    id: "accident-damage",
    title: "Accident & Damage",
    description: "Damage details and repair info",
    icon: "alert-triangle",
  },
  {
    id: "pre-accident-comps",
    title: "Pre-Accident Comparables",
    description: "Clean vehicle market values",
    icon: "search",
  },
  {
    id: "post-accident-comps",
    title: "Post-Accident Comparables",
    description: "Accident-history vehicle values",
    icon: "search",
  },
  {
    id: "review-calculate",
    title: "Review & Calculate",
    description: "Review and generate report",
    icon: "check-circle",
  },
]
