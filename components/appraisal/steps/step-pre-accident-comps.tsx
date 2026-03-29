"use client"

import { useState } from "react"
import { useWizard } from "@/lib/wizard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
  Info
} from "lucide-react"
import type { ComparableVehicle } from "@/lib/appraisal-types"

export function StepPreAccidentComps() {
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
          id: "1",
          source: "AutoTrader",
          listingUrl: "https://autotrader.com/listing/1",
          listingStatus: "active",
          vin: "4T1BZ1HK5NU111111",
          year: vehicle.year,
          make: vehicle.make,
          model: vehicle.model,
          trim: vehicle.trim,
          mileage: vehicle.mileageAtAccident - 5000,
          accidentHistory: "no_accidents",
          listingPrice: 28500,
          adjustedValue: 28200,
          additionalEquipment: [],
          missingEquipment: [],
        },
        {
          id: "2",
          source: "Cars.com",
          listingUrl: "https://cars.com/listing/2",
          listingStatus: "active",
          vin: "4T1BZ1HK5NU222222",
          year: vehicle.year,
          make: vehicle.make,
          model: vehicle.model,
          trim: vehicle.trim,
          mileage: vehicle.mileageAtAccident + 3000,
          accidentHistory: "no_accidents",
          listingPrice: 27900,
          adjustedValue: 28100,
          additionalEquipment: [],
          missingEquipment: [],
        },
        {
          id: "3",
          source: "CarGurus",
          listingUrl: "https://cargurus.com/listing/3",
          listingStatus: "sold",
          vin: "4T1BZ1HK5NU333333",
          year: vehicle.year,
          make: vehicle.make,
          model: vehicle.model,
          trim: vehicle.trim,
          mileage: vehicle.mileageAtAccident + 8000,
          accidentHistory: "no_accidents",
          listingPrice: 27200,
          adjustedValue: 27800,
          additionalEquipment: [],
          missingEquipment: [],
        },
      ]
      updateComparables({ preAccidentComps: mockComps })
      setSearching(false)
    }, 2000)
  }

  const removeComp = (id: string) => {
    updateComparables({
      preAccidentComps: comparables.preAccidentComps.filter(c => c.id !== id)
    })
  }

  const calculateMedian = () => {
    const values = comparables.preAccidentComps
      .map(c => c.adjustedValue || c.listingPrice)
      .sort((a, b) => a - b)
    
    if (values.length === 0) return 0
    
    const mid = Math.floor(values.length / 2)
    return values.length % 2 !== 0
      ? values[mid]
      : (values[mid - 1] + values[mid]) / 2
  }

  return (
    <div className="space-y-6">
      {/* Explanation */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Pre-Accident Comparables</strong> are similar vehicles with NO accident history. 
          These establish your vehicle&apos;s fair market value before the accident occurred.
        </AlertDescription>
      </Alert>

      {/* Auto Search Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Comparable Search</CardTitle>
          <CardDescription>
            Search for {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim} listings with clean titles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label>Automatic Comparable Search</Label>
              <p className="text-sm text-muted-foreground">
                Let us find comparable vehicles for you
              </p>
            </div>
            <Switch
              checked={comparables.useAutoSearch}
              onCheckedChange={(checked) => updateComparables({ useAutoSearch: checked })}
            />
          </div>

          {comparables.useAutoSearch && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="searchRadius">Search Radius (miles)</Label>
                  <Input
                    id="searchRadius"
                    type="number"
                    min={25}
                    max={500}
                    value={comparables.autoSearchParams.searchRadiusMiles}
                    onChange={(e) => updateComparables({
                      autoSearchParams: {
                        ...comparables.autoSearchParams,
                        searchRadiusMiles: parseInt(e.target.value) || 100
                      }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mileageTolerance">Mileage Tolerance (+/-)</Label>
                  <Input
                    id="mileageTolerance"
                    type="number"
                    min={1000}
                    max={50000}
                    value={comparables.autoSearchParams.mileageTolerance}
                    onChange={(e) => updateComparables({
                      autoSearchParams: {
                        ...comparables.autoSearchParams,
                        mileageTolerance: parseInt(e.target.value) || 10000
                      }
                    })}
                  />
                </div>
              </div>

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
                    Search for Comparables
                  </>
                )}
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Results Summary */}
      {comparables.preAccidentComps.length > 0 && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <CheckCircle2 className="h-8 w-8 text-primary" />
              <h3 className="text-lg font-semibold">
                {comparables.preAccidentComps.length} Clean Title Comparables Found
              </h3>
              <div className="text-3xl font-bold text-primary">
                ${calculateMedian().toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">
                Median Pre-Accident Fair Market Value
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comparable Listings */}
      {comparables.preAccidentComps.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Comparable Vehicles</CardTitle>
                <CardDescription>
                  Clean title vehicles similar to your {vehicle.year} {vehicle.make} {vehicle.model}
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowManualForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Manual
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {comparables.preAccidentComps.map((comp) => (
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
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    >
                      No Accidents
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
                    <p className="font-semibold text-primary">
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
      {comparables.preAccidentComps.length === 0 && !searching && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">No Comparables Yet</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
              Use the automatic search above to find comparable clean-title vehicles, 
              or add them manually.
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
