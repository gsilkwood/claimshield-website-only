"use client"

import { useState } from "react"
import { ChevronDown, Scale, Clock, FileText, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"

interface StateInfo {
  name: string
  abbreviation: string
  legalStatus: {
    firstParty: boolean
    thirdParty: boolean
    description: string
  }
  statuteOfLimitations: string
  relevantCaseLaw: string[]
  notableConsiderations: string[]
  filingRequirements: string
}

const stateData: Record<string, StateInfo> = {
  AL: {
    name: "Alabama",
    abbreviation: "AL",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Alabama recognizes third-party diminished value claims. If another driver is at fault, you can pursue a claim against their insurance."
    },
    statuteOfLimitations: "2 years from the date of the accident",
    relevantCaseLaw: [
      "Franklin v. Auto-Owners Insurance Co. - Established that diminished value is a compensable loss"
    ],
    notableConsiderations: [
      "Third-party claims are generally well-supported by courts",
      "Documentation of pre-accident condition is helpful",
      "Professional appraisals strengthen claims"
    ],
    filingRequirements: "File claim with at-fault party's insurance; lawsuit if necessary within statute of limitations"
  },
  AK: {
    name: "Alaska",
    abbreviation: "AK",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Alaska allows third-party diminished value claims against at-fault drivers. First-party claims are generally not recognized."
    },
    statuteOfLimitations: "2 years from the date of the accident",
    relevantCaseLaw: [
      "Limited case law specific to diminished value; general property damage principles apply"
    ],
    notableConsiderations: [
      "Remote locations may affect vehicle market comparisons",
      "Thorough documentation is essential",
      "Consider seasonal factors in vehicle valuation"
    ],
    filingRequirements: "Standard third-party claim process through at-fault party's insurer"
  },
  AZ: {
    name: "Arizona",
    abbreviation: "AZ",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Arizona recognizes third-party diminished value claims. You may recover diminished value from the at-fault driver's insurance."
    },
    statuteOfLimitations: "2 years from the date of the accident",
    relevantCaseLaw: [
      "General property damage law applies to diminished value claims"
    ],
    notableConsiderations: [
      "Hot climate can affect vehicle condition assessments",
      "High vehicle turnover in the state provides good market data",
      "Insurance companies may initially resist but courts are supportive"
    ],
    filingRequirements: "File with at-fault party's insurer; prepare for potential negotiation or litigation"
  },
  AR: {
    name: "Arkansas",
    abbreviation: "AR",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Arkansas allows diminished value claims against at-fault parties. Third-party claims are recognized under property damage law."
    },
    statuteOfLimitations: "3 years from the date of the accident",
    relevantCaseLaw: [
      "Standard property damage principles govern diminished value claims"
    ],
    notableConsiderations: [
      "Longer statute of limitations provides more time to file",
      "Rural areas may have limited comparable vehicle data",
      "Professional appraisals are recommended"
    ],
    filingRequirements: "Submit claim to at-fault party's insurance with supporting documentation"
  },
  CA: {
    name: "California",
    abbreviation: "CA",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "California strongly supports third-party diminished value claims. Courts have consistently upheld the right to recover diminished value from at-fault parties."
    },
    statuteOfLimitations: "3 years from the date of the accident",
    relevantCaseLaw: [
      "Civil Code Section 3333 - Measure of damages for injury to property",
      "Multiple appellate decisions support diminished value recovery"
    ],
    notableConsiderations: [
      "Strong consumer protection laws support claimants",
      "Large vehicle market provides excellent comparable data",
      "Insurance companies are familiar with DV claims",
      "Consider smog and emissions requirements in valuations"
    ],
    filingRequirements: "File claim with at-fault party's insurer; small claims court available for amounts under $10,000"
  },
  CO: {
    name: "Colorado",
    abbreviation: "CO",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Colorado recognizes third-party diminished value claims. Recovery is available when another driver is at fault for the accident."
    },
    statuteOfLimitations: "3 years from the date of the accident",
    relevantCaseLaw: [
      "Property damage law principles apply to diminished value"
    ],
    notableConsiderations: [
      "Altitude and weather conditions may factor into vehicle assessments",
      "AWD/4WD vehicles common; consider in market analysis",
      "Mountain driving conditions can affect vehicle history perception"
    ],
    filingRequirements: "Standard third-party claim filing with supporting appraisal documentation"
  },
  CT: {
    name: "Connecticut",
    abbreviation: "CT",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Connecticut permits third-party diminished value claims against at-fault drivers."
    },
    statuteOfLimitations: "2 years from the date of the accident",
    relevantCaseLaw: [
      "General tort and property damage law applies"
    ],
    notableConsiderations: [
      "Dense population provides good market data",
      "Higher vehicle values may result in larger DV claims",
      "Document all repairs thoroughly"
    ],
    filingRequirements: "File with at-fault party's insurance; prepare comprehensive documentation"
  },
  DE: {
    name: "Delaware",
    abbreviation: "DE",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Delaware allows diminished value claims in third-party situations where another driver caused the accident."
    },
    statuteOfLimitations: "2 years from the date of the accident",
    relevantCaseLaw: [
      "Standard property damage recovery principles apply"
    ],
    notableConsiderations: [
      "Small state may have limited local comparable data",
      "Consider regional market data from nearby states",
      "Professional appraisal highly recommended"
    ],
    filingRequirements: "Submit claim with appraisal to at-fault party's insurer"
  },
  FL: {
    name: "Florida",
    abbreviation: "FL",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Florida strongly supports third-party diminished value claims. Florida courts have consistently recognized the right to recover diminished value."
    },
    statuteOfLimitations: "4 years from the date of the accident (recently changed - verify current status)",
    relevantCaseLaw: [
      "Bowers v. Nationwide - Affirmed diminished value as compensable",
      "Multiple circuit court decisions support recovery"
    ],
    notableConsiderations: [
      "High accident volume means insurers are experienced with DV claims",
      "Salt air and humidity can affect vehicle condition",
      "Strong case law supports claimants",
      "No-fault state for injuries, but property damage is fault-based"
    ],
    filingRequirements: "File third-party claim with at-fault driver's liability insurance"
  },
  GA: {
    name: "Georgia",
    abbreviation: "GA",
    legalStatus: {
      firstParty: true,
      thirdParty: true,
      description: "Georgia is the only state that explicitly allows BOTH first-party and third-party diminished value claims by statute. This is the most favorable state for DV claims."
    },
    statuteOfLimitations: "4 years from the date of the accident",
    relevantCaseLaw: [
      "State Farm v. Mabry (2001) - Landmark case establishing first-party DV rights",
      "OCGA § 33-4-6 - Statutory basis for diminished value claims"
    ],
    notableConsiderations: [
      "Most favorable state for diminished value claims",
      "First-party claims against your own insurer are allowed",
      "Strong precedent and clear legal framework",
      "Insurance companies are well-versed in handling DV claims"
    ],
    filingRequirements: "Can file first-party claim with your own insurer or third-party claim with at-fault party's insurer"
  },
  HI: {
    name: "Hawaii",
    abbreviation: "HI",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Hawaii allows third-party diminished value claims against at-fault drivers."
    },
    statuteOfLimitations: "2 years from the date of the accident",
    relevantCaseLaw: [
      "General property damage principles apply"
    ],
    notableConsiderations: [
      "Island market may limit comparable vehicle data",
      "Salt air exposure is a significant factor",
      "Higher shipping costs affect vehicle values",
      "Consider regional market factors in appraisals"
    ],
    filingRequirements: "Standard third-party claim process"
  },
  ID: {
    name: "Idaho",
    abbreviation: "ID",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Idaho recognizes third-party diminished value claims. Recovery is available from at-fault drivers."
    },
    statuteOfLimitations: "3 years from the date of the accident",
    relevantCaseLaw: [
      "Property damage law principles apply"
    ],
    notableConsiderations: [
      "Rural areas may require regional market data",
      "Weather conditions factor into vehicle assessments",
      "4WD/AWD vehicles common in the market"
    ],
    filingRequirements: "File with at-fault party's insurance with supporting documentation"
  },
  IL: {
    name: "Illinois",
    abbreviation: "IL",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Illinois allows third-party diminished value claims against at-fault parties."
    },
    statuteOfLimitations: "5 years from the date of the accident",
    relevantCaseLaw: [
      "General property damage recovery principles apply",
      "Courts have recognized diminished value as compensable loss"
    ],
    notableConsiderations: [
      "Generous statute of limitations",
      "Large metropolitan market provides excellent comparable data",
      "Salt and winter conditions affect vehicles",
      "Strong consumer protection environment"
    ],
    filingRequirements: "Submit claim to at-fault party's insurer with professional appraisal"
  },
  IN: {
    name: "Indiana",
    abbreviation: "IN",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Indiana permits third-party diminished value claims against at-fault drivers."
    },
    statuteOfLimitations: "2 years from the date of the accident",
    relevantCaseLaw: [
      "Standard property damage principles govern claims"
    ],
    notableConsiderations: [
      "Midwest market provides good comparable data",
      "Weather conditions factor into vehicle assessments",
      "Document all repairs and pre-accident condition"
    ],
    filingRequirements: "File claim with at-fault party's insurance company"
  },
  IA: {
    name: "Iowa",
    abbreviation: "IA",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Iowa recognizes third-party diminished value claims against at-fault parties."
    },
    statuteOfLimitations: "5 years from the date of the accident",
    relevantCaseLaw: [
      "Property damage recovery principles apply"
    ],
    notableConsiderations: [
      "Generous statute of limitations",
      "Rural areas may require regional market analysis",
      "Agricultural use may affect some vehicle valuations"
    ],
    filingRequirements: "Standard third-party claim filing process"
  },
  KS: {
    name: "Kansas",
    abbreviation: "KS",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Kansas allows third-party diminished value claims. Recovery available from at-fault drivers."
    },
    statuteOfLimitations: "2 years from the date of the accident",
    relevantCaseLaw: [
      "General property damage law applies"
    ],
    notableConsiderations: [
      "Central location provides good regional market data",
      "Weather extremes factor into vehicle assessments",
      "Professional appraisal recommended"
    ],
    filingRequirements: "File with at-fault party's insurer with documentation"
  },
  KY: {
    name: "Kentucky",
    abbreviation: "KY",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Kentucky permits third-party diminished value claims against at-fault drivers."
    },
    statuteOfLimitations: "2 years from the date of the accident (verify current - may be 5 years for some property claims)",
    relevantCaseLaw: [
      "Standard property damage principles apply"
    ],
    notableConsiderations: [
      "No-fault state for some claims - verify applicability",
      "Regional market data available",
      "Document accident and repairs thoroughly"
    ],
    filingRequirements: "Submit claim to at-fault party's liability insurance"
  },
  LA: {
    name: "Louisiana",
    abbreviation: "LA",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Louisiana recognizes third-party diminished value claims. Civil law system may have unique procedures."
    },
    statuteOfLimitations: "1 year from the date of the accident (prescriptive period)",
    relevantCaseLaw: [
      "Civil Code principles govern property damage claims"
    ],
    notableConsiderations: [
      "Short prescriptive period - act quickly",
      "Civil law system differs from common law states",
      "Humidity and flooding history affect vehicle values",
      "Professional appraisal essential"
    ],
    filingRequirements: "File promptly due to short prescriptive period; follow civil law procedures"
  },
  ME: {
    name: "Maine",
    abbreviation: "ME",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Maine allows third-party diminished value claims against at-fault drivers."
    },
    statuteOfLimitations: "6 years from the date of the accident",
    relevantCaseLaw: [
      "Property damage principles apply to diminished value"
    ],
    notableConsiderations: [
      "Very generous statute of limitations",
      "Salt and harsh winters affect vehicle condition",
      "Rural areas may require regional market data"
    ],
    filingRequirements: "Standard third-party claim process"
  },
  MD: {
    name: "Maryland",
    abbreviation: "MD",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Maryland recognizes third-party diminished value claims. Strong consumer protections support claimants."
    },
    statuteOfLimitations: "3 years from the date of the accident",
    relevantCaseLaw: [
      "Courts have recognized diminished value as compensable loss"
    ],
    notableConsiderations: [
      "Dense population provides excellent market data",
      "Strong consumer protection laws",
      "Professional appraisals strengthen claims",
      "Proximity to DC market affects valuations"
    ],
    filingRequirements: "File with at-fault party's insurer; small claims court available for smaller amounts"
  },
  MA: {
    name: "Massachusetts",
    abbreviation: "MA",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Massachusetts allows third-party diminished value claims against at-fault drivers."
    },
    statuteOfLimitations: "3 years from the date of the accident",
    relevantCaseLaw: [
      "Property damage recovery principles apply"
    ],
    notableConsiderations: [
      "No-fault state for injuries, but property damage is fault-based",
      "Strong consumer protection environment",
      "Harsh winters and salt affect vehicles",
      "Good metropolitan market data available"
    ],
    filingRequirements: "Submit third-party claim with comprehensive documentation"
  },
  MI: {
    name: "Michigan",
    abbreviation: "MI",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Michigan's no-fault system complicates some claims, but third-party diminished value claims for property damage may still be available."
    },
    statuteOfLimitations: "3 years from the date of the accident",
    relevantCaseLaw: [
      "Complex interaction with no-fault insurance system"
    ],
    notableConsiderations: [
      "No-fault state with unique insurance system",
      "Property damage claims may differ from personal injury",
      "Consult with professional regarding specific situation",
      "Salt and harsh winters affect vehicle condition"
    ],
    filingRequirements: "Navigate no-fault system carefully; professional guidance recommended"
  },
  MN: {
    name: "Minnesota",
    abbreviation: "MN",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Minnesota allows third-party diminished value claims against at-fault drivers."
    },
    statuteOfLimitations: "6 years from the date of the accident",
    relevantCaseLaw: [
      "Property damage principles apply"
    ],
    notableConsiderations: [
      "Very generous statute of limitations",
      "No-fault state for some claims - verify applicability",
      "Harsh winters and road salt affect vehicles",
      "Good metropolitan market data"
    ],
    filingRequirements: "Standard third-party claim filing with documentation"
  },
  MS: {
    name: "Mississippi",
    abbreviation: "MS",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Mississippi recognizes third-party diminished value claims against at-fault parties."
    },
    statuteOfLimitations: "3 years from the date of the accident",
    relevantCaseLaw: [
      "General property damage law applies"
    ],
    notableConsiderations: [
      "Humidity and flooding history affect vehicle values",
      "Regional market data may be needed",
      "Professional appraisal recommended"
    ],
    filingRequirements: "File claim with at-fault party's insurance"
  },
  MO: {
    name: "Missouri",
    abbreviation: "MO",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Missouri permits third-party diminished value claims against at-fault drivers."
    },
    statuteOfLimitations: "5 years from the date of the accident",
    relevantCaseLaw: [
      "Property damage recovery principles apply"
    ],
    notableConsiderations: [
      "Generous statute of limitations",
      "Central location provides good market data",
      "Weather conditions factor into assessments"
    ],
    filingRequirements: "Submit claim to at-fault party's insurer with appraisal"
  },
  MT: {
    name: "Montana",
    abbreviation: "MT",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Montana allows third-party diminished value claims. Recovery available from at-fault drivers."
    },
    statuteOfLimitations: "2 years from the date of the accident",
    relevantCaseLaw: [
      "Standard property damage principles apply"
    ],
    notableConsiderations: [
      "Rural state may have limited local market data",
      "Consider regional market comparisons",
      "4WD/AWD vehicles common",
      "Harsh weather conditions affect vehicles"
    ],
    filingRequirements: "File with at-fault party's insurance with documentation"
  },
  NE: {
    name: "Nebraska",
    abbreviation: "NE",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Nebraska recognizes third-party diminished value claims against at-fault parties."
    },
    statuteOfLimitations: "4 years from the date of the accident",
    relevantCaseLaw: [
      "Property damage law principles apply"
    ],
    notableConsiderations: [
      "Central location provides regional market data",
      "Weather extremes factor into vehicle assessments",
      "Professional appraisal recommended"
    ],
    filingRequirements: "Standard third-party claim process"
  },
  NV: {
    name: "Nevada",
    abbreviation: "NV",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Nevada allows third-party diminished value claims against at-fault drivers."
    },
    statuteOfLimitations: "3 years from the date of the accident",
    relevantCaseLaw: [
      "General property damage recovery principles apply"
    ],
    notableConsiderations: [
      "High vehicle turnover in Las Vegas market",
      "Desert conditions affect vehicles differently",
      "Good market data available from metropolitan areas"
    ],
    filingRequirements: "File claim with at-fault party's insurer"
  },
  NH: {
    name: "New Hampshire",
    abbreviation: "NH",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "New Hampshire permits third-party diminished value claims against at-fault drivers."
    },
    statuteOfLimitations: "3 years from the date of the accident",
    relevantCaseLaw: [
      "Property damage principles apply"
    ],
    notableConsiderations: [
      "Unique insurance market (no mandatory auto insurance)",
      "Harsh winters and salt affect vehicles",
      "Regional market data from New England"
    ],
    filingRequirements: "Submit claim to at-fault party's insurer with appraisal"
  },
  NJ: {
    name: "New Jersey",
    abbreviation: "NJ",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "New Jersey allows third-party diminished value claims. Complex insurance system requires careful navigation."
    },
    statuteOfLimitations: "6 years from the date of the accident",
    relevantCaseLaw: [
      "Courts have recognized diminished value claims"
    ],
    notableConsiderations: [
      "Very generous statute of limitations",
      "No-fault state for some claims - verify applicability",
      "Dense population provides excellent market data",
      "Strong consumer protection laws"
    ],
    filingRequirements: "Navigate no-fault system for property damage; professional guidance helpful"
  },
  NM: {
    name: "New Mexico",
    abbreviation: "NM",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "New Mexico recognizes third-party diminished value claims against at-fault parties."
    },
    statuteOfLimitations: "4 years from the date of the accident",
    relevantCaseLaw: [
      "Standard property damage law applies"
    ],
    notableConsiderations: [
      "Desert climate affects vehicle condition differently",
      "Regional market data may be needed for rural areas",
      "Professional appraisal recommended"
    ],
    filingRequirements: "File with at-fault party's insurance with documentation"
  },
  NY: {
    name: "New York",
    abbreviation: "NY",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "New York allows third-party diminished value claims. No-fault system affects some aspects but property damage claims are available."
    },
    statuteOfLimitations: "3 years from the date of the accident",
    relevantCaseLaw: [
      "Courts have recognized diminished value as compensable loss"
    ],
    notableConsiderations: [
      "No-fault state for injuries, property damage is fault-based",
      "Large metropolitan market provides excellent data",
      "Strong consumer protection laws",
      "Salt and harsh winters affect vehicles"
    ],
    filingRequirements: "Submit third-party property damage claim with professional appraisal"
  },
  NC: {
    name: "North Carolina",
    abbreviation: "NC",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "North Carolina recognizes third-party diminished value claims against at-fault drivers."
    },
    statuteOfLimitations: "3 years from the date of the accident",
    relevantCaseLaw: [
      "Strong case law supporting diminished value recovery"
    ],
    notableConsiderations: [
      "Contributory negligence state - must prove other party fully at fault",
      "Good case law supports diminished value claims",
      "Diverse market provides good comparable data"
    ],
    filingRequirements: "File with at-fault party's insurer; be aware of contributory negligence rule"
  },
  ND: {
    name: "North Dakota",
    abbreviation: "ND",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "North Dakota allows third-party diminished value claims. Recovery available from at-fault drivers."
    },
    statuteOfLimitations: "6 years from the date of the accident",
    relevantCaseLaw: [
      "Property damage principles apply"
    ],
    notableConsiderations: [
      "Very generous statute of limitations",
      "Rural state may require regional market data",
      "Harsh winters affect vehicle condition",
      "No-fault state for some claims"
    ],
    filingRequirements: "Standard third-party claim filing"
  },
  OH: {
    name: "Ohio",
    abbreviation: "OH",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Ohio permits third-party diminished value claims against at-fault drivers."
    },
    statuteOfLimitations: "4 years from the date of the accident",
    relevantCaseLaw: [
      "Courts have recognized diminished value recovery"
    ],
    notableConsiderations: [
      "Good statute of limitations",
      "Large state with good market data",
      "Salt and winter conditions affect vehicles",
      "Professional appraisal strengthens claims"
    ],
    filingRequirements: "Submit claim to at-fault party's insurer with documentation"
  },
  OK: {
    name: "Oklahoma",
    abbreviation: "OK",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Oklahoma recognizes third-party diminished value claims against at-fault parties."
    },
    statuteOfLimitations: "2 years from the date of the accident",
    relevantCaseLaw: [
      "Standard property damage law applies"
    ],
    notableConsiderations: [
      "Weather extremes (tornadoes, hail) may affect claims",
      "Central location provides regional market data",
      "Document all damage thoroughly"
    ],
    filingRequirements: "File claim with at-fault party's insurance"
  },
  OR: {
    name: "Oregon",
    abbreviation: "OR",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Oregon allows third-party diminished value claims against at-fault drivers."
    },
    statuteOfLimitations: "6 years from the date of the accident",
    relevantCaseLaw: [
      "Property damage recovery principles apply"
    ],
    notableConsiderations: [
      "Very generous statute of limitations",
      "Pacific Northwest climate affects vehicles",
      "Good market data from metropolitan areas",
      "Strong consumer protection environment"
    ],
    filingRequirements: "Standard third-party claim process with appraisal"
  },
  PA: {
    name: "Pennsylvania",
    abbreviation: "PA",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Pennsylvania permits third-party diminished value claims against at-fault drivers."
    },
    statuteOfLimitations: "2 years from the date of the accident",
    relevantCaseLaw: [
      "Courts have recognized diminished value as compensable"
    ],
    notableConsiderations: [
      "Choice no-fault system - verify coverage type",
      "Large state with good market data",
      "Salt and harsh winters affect vehicles",
      "Professional appraisal recommended"
    ],
    filingRequirements: "Submit third-party claim with comprehensive documentation"
  },
  RI: {
    name: "Rhode Island",
    abbreviation: "RI",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Rhode Island allows third-party diminished value claims against at-fault drivers."
    },
    statuteOfLimitations: "10 years from the date of the accident",
    relevantCaseLaw: [
      "Property damage principles apply"
    ],
    notableConsiderations: [
      "Exceptionally generous statute of limitations",
      "Small state may require regional market data",
      "Salt and coastal air affect vehicles"
    ],
    filingRequirements: "File with at-fault party's insurer"
  },
  SC: {
    name: "South Carolina",
    abbreviation: "SC",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "South Carolina recognizes third-party diminished value claims against at-fault parties."
    },
    statuteOfLimitations: "3 years from the date of the accident",
    relevantCaseLaw: [
      "Strong case law supporting diminished value recovery"
    ],
    notableConsiderations: [
      "Good case law supports claimants",
      "Coastal humidity affects vehicles",
      "Regional market data readily available"
    ],
    filingRequirements: "Submit claim to at-fault party's insurer with appraisal"
  },
  SD: {
    name: "South Dakota",
    abbreviation: "SD",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "South Dakota allows third-party diminished value claims. Recovery available from at-fault drivers."
    },
    statuteOfLimitations: "6 years from the date of the accident",
    relevantCaseLaw: [
      "Standard property damage principles apply"
    ],
    notableConsiderations: [
      "Very generous statute of limitations",
      "Rural areas may need regional market data",
      "Harsh winters affect vehicle condition"
    ],
    filingRequirements: "Standard third-party claim filing"
  },
  TN: {
    name: "Tennessee",
    abbreviation: "TN",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Tennessee permits third-party diminished value claims against at-fault drivers."
    },
    statuteOfLimitations: "3 years from the date of the accident",
    relevantCaseLaw: [
      "Courts have recognized diminished value recovery"
    ],
    notableConsiderations: [
      "Good case law supports claims",
      "Diverse market provides comparable data",
      "Professional appraisal strengthens position"
    ],
    filingRequirements: "File claim with at-fault party's insurance with documentation"
  },
  TX: {
    name: "Texas",
    abbreviation: "TX",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Texas strongly supports third-party diminished value claims. Large market and good case law favor claimants."
    },
    statuteOfLimitations: "2 years from the date of the accident",
    relevantCaseLaw: [
      "Diminished value well-established in Texas courts",
      "Multiple appellate decisions support recovery"
    ],
    notableConsiderations: [
      "Large vehicle market provides excellent data",
      "Strong case law supports claimants",
      "Insurance companies experienced with DV claims",
      "Heat and hail damage common"
    ],
    filingRequirements: "Submit claim to at-fault party's insurer with professional appraisal"
  },
  UT: {
    name: "Utah",
    abbreviation: "UT",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Utah allows third-party diminished value claims against at-fault drivers."
    },
    statuteOfLimitations: "4 years from the date of the accident",
    relevantCaseLaw: [
      "Property damage recovery principles apply"
    ],
    notableConsiderations: [
      "No-fault state for some claims - verify applicability",
      "Desert and mountain conditions affect vehicles",
      "Good market data from metropolitan areas"
    ],
    filingRequirements: "Navigate insurance system; file third-party claim with documentation"
  },
  VT: {
    name: "Vermont",
    abbreviation: "VT",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Vermont permits third-party diminished value claims against at-fault drivers."
    },
    statuteOfLimitations: "3 years from the date of the accident",
    relevantCaseLaw: [
      "Standard property damage principles apply"
    ],
    notableConsiderations: [
      "Small rural state may need regional market data",
      "Harsh winters and salt affect vehicles",
      "Consider New England regional comparisons"
    ],
    filingRequirements: "Standard third-party claim process"
  },
  VA: {
    name: "Virginia",
    abbreviation: "VA",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Virginia recognizes third-party diminished value claims against at-fault parties."
    },
    statuteOfLimitations: "5 years from the date of the accident",
    relevantCaseLaw: [
      "Courts have recognized diminished value as compensable loss"
    ],
    notableConsiderations: [
      "Generous statute of limitations",
      "Contributory negligence state - must prove other party at fault",
      "Good market data from DC metro area",
      "Professional appraisal recommended"
    ],
    filingRequirements: "File with at-fault party's insurer; be aware of contributory negligence"
  },
  WA: {
    name: "Washington",
    abbreviation: "WA",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Washington allows third-party diminished value claims against at-fault drivers."
    },
    statuteOfLimitations: "3 years from the date of the accident",
    relevantCaseLaw: [
      "Property damage recovery well-established"
    ],
    notableConsiderations: [
      "Pacific Northwest climate affects vehicles",
      "Large metropolitan market in Seattle area",
      "Strong consumer protection laws",
      "Professional appraisal strengthens claims"
    ],
    filingRequirements: "Submit third-party claim with comprehensive appraisal"
  },
  WV: {
    name: "West Virginia",
    abbreviation: "WV",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "West Virginia permits third-party diminished value claims against at-fault drivers."
    },
    statuteOfLimitations: "2 years from the date of the accident",
    relevantCaseLaw: [
      "Standard property damage principles apply"
    ],
    notableConsiderations: [
      "Mountainous terrain and weather affect vehicles",
      "Regional market data may be needed",
      "Document all damage and repairs"
    ],
    filingRequirements: "File claim with at-fault party's insurance"
  },
  WI: {
    name: "Wisconsin",
    abbreviation: "WI",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Wisconsin recognizes third-party diminished value claims against at-fault parties."
    },
    statuteOfLimitations: "6 years from the date of the accident",
    relevantCaseLaw: [
      "Property damage recovery principles apply"
    ],
    notableConsiderations: [
      "Very generous statute of limitations",
      "Harsh winters and salt affect vehicles",
      "Good regional market data available",
      "Professional appraisal recommended"
    ],
    filingRequirements: "Standard third-party claim process with documentation"
  },
  WY: {
    name: "Wyoming",
    abbreviation: "WY",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "Wyoming allows third-party diminished value claims. Recovery available from at-fault drivers."
    },
    statuteOfLimitations: "4 years from the date of the accident",
    relevantCaseLaw: [
      "Standard property damage principles apply"
    ],
    notableConsiderations: [
      "Rural state may require regional market data",
      "Harsh weather and altitude affect vehicles",
      "4WD/AWD vehicles common in the market"
    ],
    filingRequirements: "File with at-fault party's insurer with appraisal documentation"
  },
  DC: {
    name: "District of Columbia",
    abbreviation: "DC",
    legalStatus: {
      firstParty: false,
      thirdParty: true,
      description: "The District of Columbia allows third-party diminished value claims against at-fault drivers."
    },
    statuteOfLimitations: "3 years from the date of the accident",
    relevantCaseLaw: [
      "Property damage recovery principles apply"
    ],
    notableConsiderations: [
      "Dense urban environment with high vehicle values",
      "No-fault system for some claims - verify",
      "Excellent market data available",
      "Professional appraisal recommended"
    ],
    filingRequirements: "Submit third-party claim with comprehensive documentation"
  }
}

const sortedStates = Object.entries(stateData).sort((a, b) => 
  a[1].name.localeCompare(b[1].name)
)

export default function StateLawLibrary() {
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const stateInfo = selectedState ? stateData[selectedState] : null

  return (
    <section id="state-laws" className="py-20 bg-muted/30" aria-labelledby="state-laws-heading">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground mb-2">
                Education Center
              </div>
              <h2 id="state-laws-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Diminished value laws by state
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
                Understanding your rights is the first step to recovering your vehicle&apos;s lost value. Select your state below to learn about your specific rights and requirements.
              </p>
            </div>
          </div>

          {/* State Selector */}
          <div className="bg-background rounded-xl border p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
              <label htmlFor="state-select" className="text-lg font-semibold whitespace-nowrap">
                Select your state:
              </label>
              <Select value={selectedState || ""} onValueChange={(value) => setSelectedState(value)}>
                <SelectTrigger id="state-select" className="w-full md:w-80">
                  <SelectValue placeholder="Choose a state..." />
                </SelectTrigger>
                <SelectContent>
                  {sortedStates.map(([abbr, state]) => (
                    <SelectItem key={abbr} value={abbr}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* State Info Display */}
            {stateInfo ? (
              <div className="space-y-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
                {/* State Header */}
                <div className="border-b pb-6">
                  <h3 className="text-2xl font-bold mb-2">
                    {stateInfo.name} Diminished Value Laws
                  </h3>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                      stateInfo.legalStatus.thirdParty 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    }`}>
                      {stateInfo.legalStatus.thirdParty ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <AlertCircle className="h-4 w-4" />
                      )}
                      Third-Party Claims: {stateInfo.legalStatus.thirdParty ? "Allowed" : "Limited"}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                      stateInfo.legalStatus.firstParty 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                        : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}>
                      {stateInfo.legalStatus.firstParty ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <AlertCircle className="h-4 w-4" />
                      )}
                      First-Party Claims: {stateInfo.legalStatus.firstParty ? "Allowed" : "Generally Not Allowed"}
                    </span>
                  </div>
                </div>

                {/* Legal Status */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-primary" />
                    <h4 className="text-lg font-semibold">Legal Status</h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed pl-7">
                    {stateInfo.legalStatus.description}
                  </p>
                </div>

                {/* Statute of Limitations */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <h4 className="text-lg font-semibold">Statute of Limitations</h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed pl-7">
                    {stateInfo.statuteOfLimitations}
                  </p>
                </div>

                {/* Relevant Case Law */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h4 className="text-lg font-semibold">Relevant Case Law</h4>
                  </div>
                  <ul className="space-y-2 pl-7">
                    {stateInfo.relevantCaseLaw.map((caseLaw, index) => (
                      <li key={index} className="text-muted-foreground leading-relaxed">
                        {caseLaw}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Notable Considerations */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    <h4 className="text-lg font-semibold">Notable Considerations</h4>
                  </div>
                  <ul className="space-y-2 pl-7">
                    {stateInfo.notableConsiderations.map((consideration, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span>{consideration}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Filing Requirements */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h4 className="text-lg font-semibold">Filing Requirements</h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed pl-7">
                    {stateInfo.filingRequirements}
                  </p>
                </div>

                {/* CTA */}
                <div className="pt-4 border-t">
                  <Button asChild className="w-full md:w-auto">
                    <Link href="#contact">
                      Get Your Free {stateInfo.name} DV Estimate
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Scale className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg">Select a state above to view diminished value laws and information.</p>
              </div>
            )}
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>Disclaimer:</strong> This information is for educational purposes only and does not constitute legal advice. 
                Laws and statutes may change, and the application of these laws to your specific situation may vary. 
                Consult with a licensed attorney for guidance specific to your case.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
