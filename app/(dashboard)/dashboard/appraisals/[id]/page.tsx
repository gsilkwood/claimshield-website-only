import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ArrowLeft,
  Download,
  Printer,
  Share2,
  Car,
  User,
  Building2,
  Wrench,
  FileText,
  CheckCircle2,
  AlertTriangle,
  TrendingDown,
  Scale,
  Shield,
  Clock,
  ExternalLink,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Gauge,
  DollarSign,
} from "lucide-react"

// Mock data for the completed appraisal
const appraisalData = {
  id: "CS-2026-001",
  status: "completed",
  createdAt: "March 10, 2026",
  completedAt: "March 15, 2026",
  vehicle: {
    vin: "4T1BZ1HK5NU123456",
    year: 2022,
    make: "Toyota",
    model: "Camry",
    trim: "XSE",
    bodyStyle: "4D Sedan",
    engine: "2.5L 4 Cyl Gas",
    transmission: "8 Speed Auto Trans FWD",
    exteriorColor: "Midnight Black",
    interiorColor: "Black Leather",
    mileage: 25000,
    condition: "Good",
  },
  owner: {
    name: "John Doe",
    address: "123 Main Street",
    city: "Atlanta",
    state: "GA",
    zip: "30301",
    phone: "(555) 123-4567",
    email: "john.doe@email.com",
  },
  insurance: {
    company: "State Farm",
    claimNumber: "CLM-987654321",
    adjuster: "Jane Smith",
    adjusterPhone: "(555) 987-6543",
  },
  accident: {
    date: "February 15, 2026",
    lossType: "Collision",
    pointOfImpact: "Rear",
    repairCost: 8500,
    laborHours: 32.5,
    structuralDamage: true,
    frameDamage: false,
    airbagDeployment: false,
    severityLevel: 3,
    severityLabel: "Significant",
  },
  valuation: {
    preAccidentFmv: 28100,
    postAccidentAcv: 23850,
    diminishedValue: 4250,
    dvPercentage: 15.1,
    confidenceRange: { low: 3800, high: 4700 },
  },
  preAccidentComps: [
    { id: "1", source: "AutoTrader", year: 2022, mileage: 20000, price: 28500, adjusted: 28200 },
    { id: "2", source: "Cars.com", year: 2022, mileage: 28000, price: 27900, adjusted: 28100 },
    { id: "3", source: "CarGurus", year: 2022, mileage: 33000, price: 27200, adjusted: 27800 },
  ],
  postAccidentComps: [
    { id: "p1", source: "AutoTrader", year: 2022, mileage: 23000, price: 24500, adjusted: 24200 },
    { id: "p2", source: "Cars.com", year: 2022, mileage: 30000, price: 23800, adjusted: 24100 },
    { id: "p3", source: "CarGurus", year: 2022, mileage: 26000, price: 24000, adjusted: 24000 },
  ],
  appraiser: {
    name: "Licensed Appraiser",
    company: "ClaimShield DV",
    license: "GA-APR-12345",
    certifications: ["CPCU", "AIC", "ASE"],
  },
}

export default function AppraisalReportPage() {
  const { vehicle, owner, insurance, accident, valuation, appraiser } = appraisalData

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/appraisals">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">
                Appraisal Report
              </h1>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Completed
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Claim #{appraisalData.id} - Completed {appraisalData.completedAt}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Summary Hero Card */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="bg-gradient-to-br from-primary via-primary to-primary/80 p-6 lg:p-8 text-primary-foreground">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <Shield className="h-5 w-5" />
                <span className="text-sm font-medium">ClaimShield DV Certified Appraisal</span>
              </div>
              <h2 className="text-3xl font-bold">
                {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}
              </h2>
              <p className="text-primary-foreground/80 font-mono">VIN: {vehicle.vin}</p>
            </div>
            <div className="flex flex-col items-center lg:items-end bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <p className="text-sm text-primary-foreground/80 mb-1">Diminished Value</p>
              <p className="text-5xl font-bold">${valuation.diminishedValue.toLocaleString()}</p>
              <p className="text-sm text-primary-foreground/80 mt-1">
                {valuation.dvPercentage}% reduction from pre-accident value
              </p>
            </div>
          </div>
        </div>
        <CardContent className="p-6 lg:p-8">
          <div className="grid gap-6 md:grid-cols-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Pre-Accident Value</p>
              <p className="text-2xl font-bold">${valuation.preAccidentFmv.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Fair Market Value</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Post-Accident Value</p>
              <p className="text-2xl font-bold">${valuation.postAccidentAcv.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Actual Cash Value</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Repair Cost</p>
              <p className="text-2xl font-bold">${accident.repairCost.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total repairs</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Damage Severity</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">Level {accident.severityLevel}</p>
                <Badge 
                  className={
                    accident.severityLevel >= 4 
                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100" 
                      : accident.severityLevel === 3 
                      ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                  }
                >
                  {accident.severityLabel}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Report Sections */}
      <Tabs defaultValue="summary" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto p-1">
          <TabsTrigger value="summary" className="py-2">Summary</TabsTrigger>
          <TabsTrigger value="vehicle" className="py-2">Vehicle</TabsTrigger>
          <TabsTrigger value="damage" className="py-2">Damage</TabsTrigger>
          <TabsTrigger value="comparables" className="py-2">Comparables</TabsTrigger>
          <TabsTrigger value="analysis" className="py-2">Analysis</TabsTrigger>
        </TabsList>

        {/* Summary Tab */}
        <TabsContent value="summary" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Owner Information */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Vehicle Owner</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-semibold text-lg">{owner.name}</p>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p>{owner.address}</p>
                    <p>{owner.city}, {owner.state} {owner.zip}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{owner.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{owner.email}</span>
                </div>
              </CardContent>
            </Card>

            {/* Insurance Information */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Insurance Claim</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-semibold text-lg">{insurance.company}</p>
                  <p className="text-sm text-muted-foreground">Claim #{insurance.claimNumber}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Adjuster</p>
                  <p className="font-medium">{insurance.adjuster}</p>
                  <p className="text-sm text-muted-foreground">{insurance.adjusterPhone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Accident Details */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Accident Details</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Date: {accident.date}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Loss Type</p>
                    <p className="font-medium">{accident.lossType}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Point of Impact</p>
                    <p className="font-medium">{accident.pointOfImpact}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {accident.structuralDamage && (
                    <Badge variant="destructive" className="bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200">
                      Structural Damage
                    </Badge>
                  )}
                  {accident.frameDamage && (
                    <Badge variant="destructive">Frame Damage</Badge>
                  )}
                  {accident.airbagDeployment && (
                    <Badge variant="destructive">Airbags Deployed</Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Appraiser Information */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Certified Appraiser</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-semibold text-lg">{appraiser.name}</p>
                  <p className="text-sm text-muted-foreground">{appraiser.company}</p>
                </div>
                <div className="text-sm">
                  <p className="text-muted-foreground">License</p>
                  <p className="font-mono">{appraiser.license}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {appraiser.certifications.map((cert) => (
                    <Badge key={cert} variant="secondary">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Vehicle Tab */}
        <TabsContent value="vehicle" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" />
                <CardTitle>Subject Vehicle Details</CardTitle>
              </div>
              <CardDescription>
                Complete vehicle specifications and condition assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-semibold">Identification</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">VIN</p>
                      <p className="font-mono">{vehicle.vin}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Year</p>
                      <p className="font-medium">{vehicle.year}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Make</p>
                      <p className="font-medium">{vehicle.make}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Model</p>
                      <p className="font-medium">{vehicle.model}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Trim</p>
                      <p className="font-medium">{vehicle.trim}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Body Style</p>
                      <p className="font-medium">{vehicle.bodyStyle}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Specifications</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Engine</p>
                      <p className="font-medium">{vehicle.engine}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Transmission</p>
                      <p className="font-medium">{vehicle.transmission}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Exterior Color</p>
                      <p className="font-medium">{vehicle.exteriorColor}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Interior Color</p>
                      <p className="font-medium">{vehicle.interiorColor}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Mileage at Accident</p>
                      <p className="font-medium">{vehicle.mileage.toLocaleString()} mi</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Pre-Accident Condition</p>
                      <Badge variant="secondary">{vehicle.condition}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Damage Tab */}
        <TabsContent value="damage" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-primary" />
                <CardTitle>Damage Assessment & Repairs</CardTitle>
              </div>
              <CardDescription>
                Detailed breakdown of accident damage and repair work
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-lg border p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Total Repair Cost</p>
                  <p className="text-3xl font-bold text-primary">${accident.repairCost.toLocaleString()}</p>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Total Labor Hours</p>
                  <p className="text-3xl font-bold">{accident.laborHours}</p>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Severity Level</p>
                  <p className="text-3xl font-bold">
                    Level {accident.severityLevel}
                    <span className="text-lg font-normal text-muted-foreground ml-2">
                      ({accident.severityLabel})
                    </span>
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-4">Damage Indicators</h4>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <span>Structural Damage</span>
                    {accident.structuralDamage ? (
                      <Badge variant="destructive">Yes</Badge>
                    ) : (
                      <Badge variant="secondary">No</Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <span>Frame Damage</span>
                    {accident.frameDamage ? (
                      <Badge variant="destructive">Yes</Badge>
                    ) : (
                      <Badge variant="secondary">No</Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <span>Airbag Deployment</span>
                    {accident.airbagDeployment ? (
                      <Badge variant="destructive">Yes</Badge>
                    ) : (
                      <Badge variant="secondary">No</Badge>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Severity Classification</h4>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Based on the repair estimate analysis, this claim has been classified as:
                  </p>
                  <div className="flex items-center gap-3">
                    <Badge 
                      className={
                        accident.severityLevel >= 4 
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100" 
                          : accident.severityLevel === 3 
                          ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                      }
                    >
                      Level {accident.severityLevel}: {accident.severityLabel}
                    </Badge>
                  </div>
                  <p className="text-sm mt-3">
                    <strong>Justification:</strong> Total labor hours of {accident.laborHours} combined with 
                    {accident.structuralDamage ? " structural damage" : ""} indicates significant 
                    repairs were required. This level of damage typically results in substantial diminished value.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Comparables Tab */}
        <TabsContent value="comparables" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Pre-Accident Comparables */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <CardTitle className="text-lg">Pre-Accident Comparables</CardTitle>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    Clean Title
                  </Badge>
                </div>
                <CardDescription>
                  Similar vehicles with no accident history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Source</TableHead>
                      <TableHead>Mileage</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Adjusted</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appraisalData.preAccidentComps.map((comp) => (
                      <TableRow key={comp.id}>
                        <TableCell className="font-medium">{comp.source}</TableCell>
                        <TableCell>{comp.mileage.toLocaleString()}</TableCell>
                        <TableCell className="text-right">${comp.price.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-semibold">${comp.adjusted.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 p-4 rounded-lg bg-green-50 dark:bg-green-950/20 text-center">
                  <p className="text-sm text-muted-foreground">Median Fair Market Value</p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                    ${valuation.preAccidentFmv.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Post-Accident Comparables */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <CardTitle className="text-lg">Post-Accident Comparables</CardTitle>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100">
                    Accident History
                  </Badge>
                </div>
                <CardDescription>
                  Similar vehicles with reported accidents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Source</TableHead>
                      <TableHead>Mileage</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Adjusted</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appraisalData.postAccidentComps.map((comp) => (
                      <TableRow key={comp.id}>
                        <TableCell className="font-medium">{comp.source}</TableCell>
                        <TableCell>{comp.mileage.toLocaleString()}</TableCell>
                        <TableCell className="text-right">${comp.price.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-semibold">${comp.adjusted.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20 text-center">
                  <p className="text-sm text-muted-foreground">Median Actual Cash Value</p>
                  <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                    ${valuation.postAccidentAcv.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analysis Tab */}
        <TabsContent value="analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                <CardTitle>Diminished Value Analysis</CardTitle>
              </div>
              <CardDescription>
                Detailed calculation methodology and supporting analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Calculation Breakdown */}
              <div className="rounded-lg border p-6">
                <h4 className="font-semibold mb-4">Calculation Methodology</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span>Pre-Accident Fair Market Value (Median of 3 clean-title comparables)</span>
                    <span className="font-semibold">${valuation.preAccidentFmv.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span>Post-Accident Actual Cash Value (Median of 3 accident-history comparables)</span>
                    <span className="font-semibold">${valuation.postAccidentAcv.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 bg-primary/5 rounded-lg px-4">
                    <span className="font-semibold">Calculated Diminished Value</span>
                    <span className="text-2xl font-bold text-primary">${valuation.diminishedValue.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Confidence Range */}
              <div className="rounded-lg border p-6">
                <h4 className="font-semibold mb-4">Confidence Range</h4>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Low Estimate</p>
                    <p className="text-xl font-semibold">${valuation.confidenceRange.low.toLocaleString()}</p>
                  </div>
                  <div className="flex-1 mx-8">
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary/50 via-primary to-primary/50"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">High Estimate</p>
                    <p className="text-xl font-semibold">${valuation.confidenceRange.high.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Market Stigma Analysis */}
              <div className="rounded-lg border p-6">
                <h4 className="font-semibold mb-4">Market Stigma Analysis</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Vehicles with reported accident history experience significant resistance in the marketplace. 
                  Studies consistently show that buyers are willing to pay 10-25% less for a vehicle with 
                  accident history compared to an identical vehicle with a clean title. This &quot;stigma&quot; persists 
                  regardless of repair quality and is reflected in lower resale values, reduced trade-in 
                  offers, and longer time-on-market for affected vehicles. The {vehicle.year} {vehicle.make} {vehicle.model} 
                  with Level {accident.severityLevel} damage and ${accident.repairCost.toLocaleString()} in repairs demonstrates a 
                  {valuation.dvPercentage}% reduction in value, consistent with market expectations for this severity level.
                </p>
              </div>

              {/* Legal Foundation */}
              <div className="rounded-lg border p-6">
                <h4 className="font-semibold mb-4">Legal Foundation</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  The right to claim diminished value is well-established in tort law. When a vehicle is 
                  damaged due to another party&apos;s negligence, the owner is entitled to recover the full 
                  measure of damages, including the inherent diminished value that persists after repairs.
                </p>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm font-medium mb-2">State of {owner.state} - Applicable Law</p>
                  <p className="text-xs text-muted-foreground">
                    Georgia recognizes inherent diminished value claims under State Farm v. Mabry (2001). 
                    Claimants in Georgia may pursue diminished value directly from the at-fault party&apos;s 
                    insurer without the need for independent legal action.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="border-muted">
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2 text-sm">Disclaimer</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                This appraisal report is prepared for informational purposes and represents our professional 
                opinion of the diminished value of the subject vehicle based on available market data and 
                accepted valuation methodologies. The final settlement amount may vary based on negotiations 
                with the insurance company. ClaimShield DV makes no guarantee of any specific settlement 
                outcome. This report should not be construed as legal advice. For specific legal questions, 
                please consult with a qualified attorney in your jurisdiction.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
