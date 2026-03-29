"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useWizard } from "@/lib/wizard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { 
  CheckCircle2, 
  AlertCircle, 
  Car, 
  User, 
  Building2, 
  Wrench,
  FileText,
  Calculator,
  Loader2,
  Download,
  Shield,
  TrendingDown,
  AlertTriangle
} from "lucide-react"

export function StepReviewCalculate() {
  const router = useRouter()
  const { data } = useWizard()
  const [generating, setGenerating] = useState(false)
  const [confirmations, setConfirmations] = useState({
    accurateInfo: false,
    authorizeReport: false,
    agreeTerms: false,
  })

  const owner = data.owner!
  const vehicle = data.vehicle!
  const accident = data.accident!
  const comparables = data.comparables!
  const insurance = data.insurance!

  // Calculate values
  const calculateMedian = (comps: typeof comparables.preAccidentComps) => {
    const values = comps.map(c => c.adjustedValue || c.listingPrice).sort((a, b) => a - b)
    if (values.length === 0) return 0
    const mid = Math.floor(values.length / 2)
    return values.length % 2 !== 0 ? values[mid] : (values[mid - 1] + values[mid]) / 2
  }

  const preAccidentFmv = calculateMedian(comparables.preAccidentComps)
  const postAccidentAcv = calculateMedian(comparables.postAccidentComps)
  const diminishedValue = preAccidentFmv - postAccidentAcv
  const dvPercentage = preAccidentFmv > 0 ? ((diminishedValue / preAccidentFmv) * 100).toFixed(1) : "0"

  // Calculate severity
  const calculateSeverity = () => {
    const totalHours = accident.totalLaborHours
    const frameHours = accident.frameLaborHours

    if (totalHours > 60 || frameHours > 10) return { level: 5, label: "Critical" }
    if (accident.framePullingRequired || (accident.structuralDamage && totalHours > 35)) return { level: 4, label: "Severe" }
    if (accident.airbagDeployment || (totalHours >= 20 && totalHours <= 35)) return { level: 3, label: "Significant" }
    if (totalHours >= 10 && totalHours < 20) return { level: 2, label: "Moderate" }
    return { level: 1, label: "Minor" }
  }

  const severity = calculateSeverity()

  const allConfirmed = confirmations.accurateInfo && confirmations.authorizeReport && confirmations.agreeTerms
  const hasComparables = comparables.preAccidentComps.length > 0 && comparables.postAccidentComps.length > 0

  const handleGenerateReport = async () => {
    setGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      setGenerating(false)
      router.push("/dashboard/appraisals/1") // Navigate to report view
    }, 3000)
  }

  return (
    <div className="space-y-6">
      {/* DV Summary Card */}
      <Card className="border-primary bg-gradient-to-br from-primary/5 via-background to-primary/10 overflow-hidden">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center text-center space-y-4 py-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <TrendingDown className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Estimated Diminished Value</p>
              <p className="text-5xl font-bold text-primary">
                ${diminishedValue.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {dvPercentage}% reduction from pre-accident value
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 pt-4 border-t w-full max-w-md">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Pre-Accident FMV</p>
                <p className="text-xl font-semibold">${preAccidentFmv.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Post-Accident ACV</p>
                <p className="text-xl font-semibold">${postAccidentAcv.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validation Warnings */}
      {!hasComparables && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Missing Comparables</AlertTitle>
          <AlertDescription>
            Please add both pre-accident and post-accident comparable vehicles before generating your report.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Sections */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Vehicle Summary */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Car className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Vehicle</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Year/Make/Model</span>
              <span className="font-medium">{vehicle.year} {vehicle.make} {vehicle.model}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Trim</span>
              <span className="font-medium">{vehicle.trim}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">VIN</span>
              <span className="font-mono text-xs">{vehicle.vin || "Not entered"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mileage</span>
              <span className="font-medium">{vehicle.mileageAtAccident?.toLocaleString() || 0} mi</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Condition</span>
              <Badge variant="secondary" className="capitalize">
                {vehicle.preAccidentCondition?.overallGrade?.replace("_", " ") || "Good"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Owner Summary */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Owner</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">{owner.fullName || "Not entered"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Location</span>
              <span className="font-medium">
                {owner.address?.city && owner.address?.state 
                  ? `${owner.address.city}, ${owner.address.state}` 
                  : "Not entered"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium">{owner.email || "Not entered"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone</span>
              <span className="font-medium">{owner.phone || "Not entered"}</span>
            </div>
          </CardContent>
        </Card>

        {/* Insurance Summary */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Insurance</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Company</span>
              <span className="font-medium">{insurance.insuranceCompany || "Not entered"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Claim #</span>
              <span className="font-medium">{insurance.claimNumber || "Not entered"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Adjuster</span>
              <span className="font-medium">{insurance.adjusterName || "Not entered"}</span>
            </div>
          </CardContent>
        </Card>

        {/* Damage Summary */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Damage & Repairs</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Repair Cost</span>
              <span className="font-medium">${accident.totalRepairCost?.toLocaleString() || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Labor Hours</span>
              <span className="font-medium">{accident.totalLaborHours?.toFixed(1) || 0} hrs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Severity Level</span>
              <Badge 
                className={
                  severity.level >= 4 
                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100" 
                    : severity.level === 3 
                    ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                }
              >
                Level {severity.level}: {severity.label}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {accident.structuralDamage && <Badge variant="outline" className="text-xs">Structural</Badge>}
              {accident.frameDamage && <Badge variant="outline" className="text-xs">Frame</Badge>}
              {accident.airbagDeployment && <Badge variant="outline" className="text-xs">Airbags</Badge>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comparables Summary */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Market Comparables</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Pre-Accident (Clean Title)</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  {comparables.preAccidentComps.length} comps
                </Badge>
              </div>
              <p className="text-2xl font-bold">${preAccidentFmv.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Median fair market value</p>
            </div>
            <div className="rounded-lg border p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Post-Accident (Accident History)</span>
                <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100">
                  {comparables.postAccidentComps.length} comps
                </Badge>
              </div>
              <p className="text-2xl font-bold">${postAccidentAcv.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Median actual cash value</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirmations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Confirm & Generate Report</CardTitle>
          <CardDescription>
            Please review and confirm the following before generating your appraisal report
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <Checkbox
              id="accurateInfo"
              checked={confirmations.accurateInfo}
              onCheckedChange={(checked) => 
                setConfirmations(prev => ({ ...prev, accurateInfo: checked as boolean }))
              }
            />
            <Label htmlFor="accurateInfo" className="text-sm leading-relaxed cursor-pointer">
              I certify that all information provided is accurate and complete to the best of my knowledge. 
              I understand that inaccurate information may affect the validity of this appraisal.
            </Label>
          </div>
          <div className="flex items-start gap-3">
            <Checkbox
              id="authorizeReport"
              checked={confirmations.authorizeReport}
              onCheckedChange={(checked) => 
                setConfirmations(prev => ({ ...prev, authorizeReport: checked as boolean }))
              }
            />
            <Label htmlFor="authorizeReport" className="text-sm leading-relaxed cursor-pointer">
              I authorize ClaimShield DV to generate a diminished value appraisal report based on 
              the information provided and current market data.
            </Label>
          </div>
          <div className="flex items-start gap-3">
            <Checkbox
              id="agreeTerms"
              checked={confirmations.agreeTerms}
              onCheckedChange={(checked) => 
                setConfirmations(prev => ({ ...prev, agreeTerms: checked as boolean }))
              }
            />
            <Label htmlFor="agreeTerms" className="text-sm leading-relaxed cursor-pointer">
              I agree to the Terms of Service and understand that this appraisal is for informational 
              purposes and does not guarantee any specific settlement amount.
            </Label>
          </div>

          <Separator />

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Your report will be ready in approximately 24-48 hours</span>
            </div>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90"
              disabled={!allConfirmed || !hasComparables || generating}
              onClick={handleGenerateReport}
            >
              {generating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Report...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Appraisal Report
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
