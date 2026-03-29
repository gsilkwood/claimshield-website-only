"use client"

import { useState } from "react"
import { useWizard } from "@/lib/wizard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Search, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function StepVehicleDetails() {
  const { data, updateVehicle } = useWizard()
  const vehicle = data.vehicle!
  const [vinDecoding, setVinDecoding] = useState(false)
  const [vinDecoded, setVinDecoded] = useState(false)

  const handleVinDecode = async () => {
    if (vehicle.vin.length !== 17) return
    
    setVinDecoding(true)
    // Simulate VIN decode API call
    setTimeout(() => {
      // Mock decoded data
      updateVehicle({
        year: 2022,
        make: "Toyota",
        model: "Camry",
        trim: "XSE",
        bodyStyle: "4D Sedan",
        engine: "2.5L 4 Cyl Gas",
        transmission: "8 Speed Auto Trans FWD",
        productionDate: "03/2022",
        standardFeatures: [
          "Power Windows",
          "Power Locks",
          "Cruise Control",
          "Bluetooth",
          "Backup Camera",
          "Lane Departure Warning",
          "Adaptive Cruise Control",
        ],
      })
      setVinDecoding(false)
      setVinDecoded(true)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* VIN Entry */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Identification</CardTitle>
          <CardDescription>
            Enter your VIN to automatically decode vehicle details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vin">VIN (Vehicle Identification Number) *</Label>
            <div className="flex gap-2">
              <Input
                id="vin"
                placeholder="1HGCV2F34PA567890"
                value={vehicle.vin}
                onChange={(e) => {
                  updateVehicle({ vin: e.target.value.toUpperCase() })
                  setVinDecoded(false)
                }}
                maxLength={17}
                className="font-mono uppercase"
                required
              />
              <Button 
                type="button" 
                onClick={handleVinDecode}
                disabled={vehicle.vin.length !== 17 || vinDecoding}
              >
                {vinDecoding ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Decode
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {vehicle.vin.length}/17 characters
            </p>
          </div>
          
          {vinDecoded && (
            <Alert className="bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                VIN decoded successfully! Vehicle details have been populated below.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Vehicle Details */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Specifications</CardTitle>
          <CardDescription>
            Verify or manually enter vehicle details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="year">Year *</Label>
              <Input
                id="year"
                type="number"
                min={1980}
                max={new Date().getFullYear() + 1}
                value={vehicle.year}
                onChange={(e) => updateVehicle({ year: parseInt(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="make">Make *</Label>
              <Input
                id="make"
                placeholder="Toyota"
                value={vehicle.make}
                onChange={(e) => updateVehicle({ make: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Model *</Label>
              <Input
                id="model"
                placeholder="Camry"
                value={vehicle.model}
                onChange={(e) => updateVehicle({ model: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trim">Trim *</Label>
              <Input
                id="trim"
                placeholder="XSE"
                value={vehicle.trim}
                onChange={(e) => updateVehicle({ trim: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="bodyStyle">Body Style</Label>
              <Input
                id="bodyStyle"
                placeholder="4D Sedan"
                value={vehicle.bodyStyle}
                onChange={(e) => updateVehicle({ bodyStyle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productionDate">Production Date</Label>
              <Input
                id="productionDate"
                placeholder="MM/YYYY"
                value={vehicle.productionDate}
                onChange={(e) => updateVehicle({ productionDate: e.target.value })}
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="engine">Engine</Label>
              <Input
                id="engine"
                placeholder="2.5L 4 Cyl Gas"
                value={vehicle.engine}
                onChange={(e) => updateVehicle({ engine: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transmission">Transmission</Label>
              <Input
                id="transmission"
                placeholder="8 Speed Auto Trans FWD"
                value={vehicle.transmission}
                onChange={(e) => updateVehicle({ transmission: e.target.value })}
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="exteriorColor">Exterior Color</Label>
              <Input
                id="exteriorColor"
                placeholder="Midnight Black"
                value={vehicle.exteriorColor}
                onChange={(e) => updateVehicle({ exteriorColor: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interiorColor">Interior Color</Label>
              <Input
                id="interiorColor"
                placeholder="Black Leather"
                value={vehicle.interiorColor}
                onChange={(e) => updateVehicle({ interiorColor: e.target.value })}
              />
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="mileage">Mileage at Time of Accident *</Label>
            <Input
              id="mileage"
              type="number"
              min={0}
              placeholder="25000"
              value={vehicle.mileageAtAccident || ""}
              onChange={(e) => updateVehicle({ mileageAtAccident: parseInt(e.target.value) || 0 })}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Pre-Accident Condition */}
      <Card>
        <CardHeader>
          <CardTitle>Pre-Accident Condition Assessment</CardTitle>
          <CardDescription>
            Rate the vehicle&apos;s condition before the accident occurred (NAAA Grading Scale)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Overall Grade *</Label>
              <Select
                value={vehicle.preAccidentCondition.overallGrade}
                onValueChange={(value) => updateVehicle({
                  preAccidentCondition: { ...vehicle.preAccidentCondition, overallGrade: value as typeof vehicle.preAccidentCondition.overallGrade }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent - Like New</SelectItem>
                  <SelectItem value="good">Good - Minor Wear</SelectItem>
                  <SelectItem value="average">Average - Normal Wear</SelectItem>
                  <SelectItem value="below_average">Below Average</SelectItem>
                  <SelectItem value="rough">Rough - Significant Wear</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Mechanical Condition</Label>
              <Select
                value={vehicle.preAccidentCondition.mechanicalCondition}
                onValueChange={(value) => updateVehicle({
                  preAccidentCondition: { ...vehicle.preAccidentCondition, mechanicalCondition: value as typeof vehicle.preAccidentCondition.mechanicalCondition }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tire Condition</Label>
              <Select
                value={vehicle.preAccidentCondition.tireCondition}
                onValueChange={(value) => updateVehicle({
                  preAccidentCondition: { ...vehicle.preAccidentCondition, tireCondition: value as typeof vehicle.preAccidentCondition.tireCondition }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="good_tread">Good Tread</SelectItem>
                  <SelectItem value="average_tread">Average Tread</SelectItem>
                  <SelectItem value="worn">Worn</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Paint Condition</Label>
              <Select
                value={vehicle.preAccidentCondition.paintCondition}
                onValueChange={(value) => updateVehicle({
                  preAccidentCondition: { ...vehicle.preAccidentCondition, paintCondition: value as typeof vehicle.preAccidentCondition.paintCondition }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Interior Condition</Label>
              <Select
                value={vehicle.preAccidentCondition.interiorCondition}
                onValueChange={(value) => updateVehicle({
                  preAccidentCondition: { ...vehicle.preAccidentCondition, interiorCondition: value as typeof vehicle.preAccidentCondition.interiorCondition }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Glass Condition</Label>
              <Select
                value={vehicle.preAccidentCondition.glassCondition}
                onValueChange={(value) => updateVehicle({
                  preAccidentCondition: { ...vehicle.preAccidentCondition, glassCondition: value as typeof vehicle.preAccidentCondition.glassCondition }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="perfect">Perfect</SelectItem>
                  <SelectItem value="minor_pitting">Minor Pitting</SelectItem>
                  <SelectItem value="chips">Chips</SelectItem>
                  <SelectItem value="cracks">Cracks</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Prior Accidents */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label>Prior Accident History</Label>
              <p className="text-sm text-muted-foreground">
                Was this vehicle involved in any accidents before this claim?
              </p>
            </div>
            <Switch
              checked={vehicle.priorAccidents}
              onCheckedChange={(checked) => updateVehicle({ priorAccidents: checked })}
            />
          </div>

          {vehicle.priorAccidents && (
            <div className="space-y-2">
              <Label htmlFor="priorDetails">Prior Accident Details</Label>
              <Textarea
                id="priorDetails"
                placeholder="Describe any prior accidents, repairs, or damage history..."
                value={vehicle.priorAccidentDetails || ""}
                onChange={(e) => updateVehicle({ priorAccidentDetails: e.target.value })}
                rows={3}
              />
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Prior accident history may affect the diminished value calculation. Be thorough and accurate.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Standard Features */}
      {vehicle.standardFeatures.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Standard Features</CardTitle>
            <CardDescription>
              Features decoded from VIN (review for accuracy)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {vehicle.standardFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                >
                  <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                  {feature}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
