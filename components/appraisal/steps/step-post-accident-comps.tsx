"use client"

import { useState } from "react"
import { useWizard } from "@/lib/wizard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Search, 
  Loader2, 
  Plus, 
  ExternalLink, 
  Trash2, 
  CheckCircle2,
  Car,
  DollarSign,
  Gauge,
  Info,
  AlertTriangle
} from "lucide-react"
import type { ComparableVehicle } from "@/lib/appraisal-types"

export function StepPostAccidentComps() {
  const { data, updateComparables } = useWizard()
  const comparables = data.comparables!
  const vehicle = data.vehicle!
  const [searching, setSearching] = useState(false)
  const [showManualForm, setShowManualForm] = useState(false)

  const handleAutoSearch = async () => {
    setSearching(true)
    // Simulate API search
    setTimeout(() => {
      const mockComps: ComparableVehicle[] = [
        {
          id: "p1",
          source: "AutoTrader",
          listingUrl: "https://autotrader.com/listing/p1",
          listingStatus: "active",
          vin: "4T1BZ1HK5NU444444",
          year: vehicle.year,
          make: vehicle.make,
          model: vehicle.model,
          trim: vehicle.trim,
          mileage: vehicle.mileageAtAccident - 2000,
          accidentHistory: "accident_reported",
          listingPrice: 24500,
          adjustedValue: 24200,
          additionalEquipment: [],
          missingEquipment: [],
        },
        {
          id: "p2",
          source: "Cars.com",
          listingUrl: "https://cars.com/listing/p2",
          listingStatus: "active",
          vin: "4T1BZ1HK5NU555555",
          year: vehicle.year,
          make: vehicle.make,
          model: vehicle.model,
          trim: vehicle.trim,
          mileage: vehicle.mileageAtAccident + 5000,
          accidentHistory: "accident_reported",
          listingPrice: 23800,
          adjustedValue: 24100,
          additionalEquipment: [],
          missingEquipment: [],
        },
        {
          id: "p3",
          source: "CarGurus",
          listingUrl: "https://cargurus.com/listing/p3",
          listingStatus: "sold",
          vin: "4T1BZ1HK5NU666666",
          year: vehicle.year,
          make: vehicle.make,
          model: vehicle.model,
          trim: vehicle.trim,
          mileage: vehicle.mileageAtAccident + 1000,
          accidentHistory: "accident_reported",
          listingPrice: 24000,
          adjustedValue: 24000,
          additionalEquipment: [],
          missingEquipment: [],
        },
      ]
      updateComparables({ postAccidentComps: mockComps })
      setSearching(false)
    }, 2000)
  }

  const removeComp = (id: string) => {
    updateComparables({
      postAccidentComps: comparables.postAccidentComps.filter(c => c.id !== id)
    })
  }

  const calculateMedian = () => {
    const values = comparables.postAccidentComps
      .map(c => c.adjustedValue || c.listingPrice)
      .sort((a, b) => a - b)
    
    if (values.length === 0) return 0
    
    const mid = Math.floor(values.length / 2)
    return values.length % 2 !== 0
      ? values[mid]
      : (values[mid - 1] + values[mid]) / 2
  }

  const preAccidentMedian = () => {
    const values = comparables.preAccidentComps
      .map(c => c.adjustedValue || c.listingPrice)
      .sort((a, b) => a - b)
    
    if (values.length === 0) return 0
    
    const mid = Math.floor(values.length / 2)
    return values.length % 2 !== 0
      ? values[mid]
      : (values[mid - 1] + values[mid]) / 2
  }

  const postMedian = calculateMedian()
  const preMedian = preAccidentMedian()
  const diminishedValue = preMedian - postMedian

  return (
    <div className="space-y-6">
      {/* Explanation */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Post-Accident Comparables</strong> are similar vehicles WITH reported accident history. 
          These establish what your vehicle is worth now that it has an accident on its record.
        </AlertDescription>
      </Alert>

      {/* Auto Search Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Accident-History Vehicle Search</CardTitle>
          <CardDescription>
            Search for {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim} listings with accident history
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label>Automatic Comparable Search</Label>
              <p className="text-sm text-muted-foreground">
                Find vehicles with accident reports for comparison
              </p>
            </div>
            <Switch
              checked={comparables.useAutoSearch}
              onCheckedChange={(checked) => updateComparables({ useAutoSearch: checked })}
            />
          </div>

          {comparables.useAutoSearch && (
            <Button 
              onClick={handleAutoSearch} 
              disabled={searching}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {searching ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching Market Data...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Search for Accident-History Vehicles
                </>
              )}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* DV Calculation Preview */}
      {comparables.postAccidentComps.length > 0 && comparables.preAccidentComps.length > 0 && (
        <Card className="border-primary bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 rounded-lg bg-background/50">
                <p className="text-sm text-muted-foreground mb-1">Pre-Accident Value</p>
                <p className="text-2xl font-bold text-foreground">
                  ${preMedian.toLocaleString()}
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/50">
                <p className="text-sm text-muted-foreground mb-1">Post-Accident Value</p>
                <p className="text-2xl font-bold text-foreground">
                  ${postMedian.toLocaleString()}
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-primary/20">
                <p className="text-sm text-primary font-medium mb-1">Diminished Value</p>
                <p className="text-3xl font-bold text-primary">
                  ${diminishedValue.toLocaleString()}
                </p>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Based on {comparables.preAccidentComps.length} clean title and {comparables.postAccidentComps.length} accident-history comparables
            </p>
          </CardContent>
        </Card>
      )}

      {/* Results Summary */}
      {comparables.postAccidentComps.length > 0 && (
        <Card className="border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950/20">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200">
                {comparables.postAccidentComps.length} Accident-History Comparables Found
              </h3>
              <div className="text-3xl font-bold text-orange-700 dark:text-orange-300">
                ${postMedian.toLocaleString()}
              </div>
              <p className="text-sm text-orange-600 dark:text-orange-400">
                Median Post-Accident Market Value
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comparable Listings */}
      {comparables.postAccidentComps.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Accident-History Vehicles</CardTitle>
                <CardDescription>
                  Similar vehicles with reported accidents
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowManualForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Manual
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {comparables.postAccidentComps.map((comp) => (
              <div
                key={comp.id}
                className="rounded-lg border p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <Car className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {comp.year} {comp.make} {comp.model} {comp.trim}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        VIN: {comp.vin}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="secondary" 
                      className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
                    >
                      <AlertTriangle className="mr-1 h-3 w-3" />
                      Accident Reported
                    </Badge>
                    <Button variant="ghost" size="icon" onClick={() => removeComp(comp.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-muted-foreground" />
                    <span>{comp.mileage.toLocaleString()} mi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>${comp.listingPrice.toLocaleString()}</span>
                  </div>
                  <div>
                    <Badge variant="outline" className="text-xs">
                      {comp.listingStatus === "sold" ? "Sold" : comp.listingStatus === "pending" ? "Pending" : "Active"}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Source:</span>
                    <span className="font-medium">{comp.source}</span>
                    <a
                      href={comp.listingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      View <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Adjusted Value</p>
                    <p className="font-semibold text-orange-600">
                      ${(comp.adjustedValue || comp.listingPrice).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {comparables.postAccidentComps.length === 0 && !searching && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">No Comparables Yet</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
              Search for vehicles with accident history to establish post-repair market value.
            </p>
            <div className="flex gap-2">
              <Button 
                onClick={handleAutoSearch}
                className="bg-primary hover:bg-primary/90"
              >
                <Search className="mr-2 h-4 w-4" />
                Auto Search
              </Button>
              <Button variant="outline" onClick={() => setShowManualForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Manually
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
