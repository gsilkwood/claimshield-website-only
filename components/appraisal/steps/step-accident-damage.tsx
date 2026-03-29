"use client"

import { useCallback, useState } from "react"
import { useWizard } from "@/lib/wizard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Upload, X, FileText, Image, AlertTriangle, CheckCircle2 } from "lucide-react"

export function StepAccidentDamage() {
  const { data, updateAccident } = useWizard()
  const accident = data.accident!
  const [dragActive, setDragActive] = useState(false)

  // Calculate severity level based on inputs
  const calculateSeverity = useCallback(() => {
    const totalHours = accident.totalLaborHours
    const frameHours = accident.frameLaborHours

    if (totalHours > 60 || frameHours > 10) return 5
    if (accident.framePullingRequired || (accident.structuralDamage && totalHours > 35)) return 4
    if (accident.airbagDeployment || (totalHours >= 20 && totalHours <= 35)) return 3
    if (totalHours >= 10 && totalHours < 20) return 2
    return 1
  }, [accident])

  const severityLevel = calculateSeverity()

  const severityLabels = {
    1: { label: "Minor", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" },
    2: { label: "Moderate", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100" },
    3: { label: "Significant", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100" },
    4: { label: "Severe", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100" },
    5: { label: "Critical", color: "bg-red-200 text-red-900 dark:bg-red-950 dark:text-red-100" },
  }

  // Auto-calculate total labor hours
  const updateLaborHours = (field: string, value: number) => {
    const newAccident = { ...accident, [field]: value }
    const total = 
      (field === "bodyLaborHours" ? value : accident.bodyLaborHours) +
      (field === "frameLaborHours" ? value : accident.frameLaborHours) +
      (field === "refinishLaborHours" ? value : accident.refinishLaborHours) +
      (field === "mechanicalLaborHours" ? value : accident.mechanicalLaborHours)
    
    updateAccident({ ...newAccident, totalLaborHours: total })
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    // Handle file upload
  }

  return (
    <div className="space-y-6">
      {/* Accident Details */}
      <Card>
        <CardHeader>
          <CardTitle>Accident Details</CardTitle>
          <CardDescription>
            Information about how the accident occurred
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Loss Type *</Label>
              <Select
                value={accident.lossType}
                onValueChange={(value) => updateAccident({ lossType: value as typeof accident.lossType })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="collision">Collision</SelectItem>
                  <SelectItem value="comprehensive">Comprehensive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Point of Impact *</Label>
              <Select
                value={accident.pointOfImpact}
                onValueChange={(value) => updateAccident({ pointOfImpact: value as typeof accident.pointOfImpact })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="front">Front</SelectItem>
                  <SelectItem value="rear">Rear</SelectItem>
                  <SelectItem value="left_side">Left Side</SelectItem>
                  <SelectItem value="right_side">Right Side</SelectItem>
                  <SelectItem value="rollover">Rollover</SelectItem>
                  <SelectItem value="multiple">Multiple Points</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Damage Classification */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Damage Classification</CardTitle>
              <CardDescription>
                Critical damage indicators that affect diminished value
              </CardDescription>
            </div>
            <Badge className={severityLabels[severityLevel as keyof typeof severityLabels].color}>
              Severity Level {severityLevel}: {severityLabels[severityLevel as keyof typeof severityLabels].label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label>Structural Damage</Label>
                <p className="text-xs text-muted-foreground">
                  Damage to structural components
                </p>
              </div>
              <Switch
                checked={accident.structuralDamage}
                onCheckedChange={(checked) => updateAccident({ structuralDamage: checked })}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label>Frame Damage</Label>
                <p className="text-xs text-muted-foreground">
                  Frame bent, cracked, or compromised
                </p>
              </div>
              <Switch
                checked={accident.frameDamage}
                onCheckedChange={(checked) => updateAccident({ frameDamage: checked })}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label>Airbag Deployment</Label>
                <p className="text-xs text-muted-foreground">
                  Any airbags deployed during accident
                </p>
              </div>
              <Switch
                checked={accident.airbagDeployment}
                onCheckedChange={(checked) => updateAccident({ airbagDeployment: checked })}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label>Frame Pulling Required</Label>
                <p className="text-xs text-muted-foreground">
                  Frame machine used for repairs
                </p>
              </div>
              <Switch
                checked={accident.framePullingRequired}
                onCheckedChange={(checked) => updateAccident({ framePullingRequired: checked })}
              />
            </div>
          </div>

          {(accident.structuralDamage || accident.frameDamage || accident.airbagDeployment) && (
            <Alert className="bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-900">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertTitle className="text-orange-800 dark:text-orange-200">Significant Damage Indicators</AlertTitle>
              <AlertDescription className="text-orange-700 dark:text-orange-300">
                The damage indicators selected typically result in higher diminished value due to permanent safety concerns and market stigma.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Repair Information */}
      <Card>
        <CardHeader>
          <CardTitle>Repair Information</CardTitle>
          <CardDescription>
            Details about the repair facility and costs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="repairFacility">Repair Facility Name</Label>
              <Input
                id="repairFacility"
                placeholder="ABC Auto Body Shop"
                value={accident.repairFacility}
                onChange={(e) => updateAccident({ repairFacility: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="repairPhone">Repair Facility Phone</Label>
              <Input
                id="repairPhone"
                type="tel"
                placeholder="(555) 123-4567"
                value={accident.repairFacilityPhone}
                onChange={(e) => updateAccident({ repairFacilityPhone: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalRepairCost">Total Repair Cost (USD) *</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="totalRepairCost"
                type="number"
                min={0}
                placeholder="8500"
                value={accident.totalRepairCost || ""}
                onChange={(e) => updateAccident({ totalRepairCost: parseFloat(e.target.value) || 0 })}
                className="pl-7"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Labor Hours Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Labor Hours Breakdown</CardTitle>
          <CardDescription>
            Enter labor hours from the repair estimate (critical for severity calculation)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="bodyHours">Body Labor</Label>
              <Input
                id="bodyHours"
                type="number"
                min={0}
                step={0.1}
                placeholder="0"
                value={accident.bodyLaborHours || ""}
                onChange={(e) => updateLaborHours("bodyLaborHours", parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="frameHours">Frame Labor</Label>
              <Input
                id="frameHours"
                type="number"
                min={0}
                step={0.1}
                placeholder="0"
                value={accident.frameLaborHours || ""}
                onChange={(e) => updateLaborHours("frameLaborHours", parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="refinishHours">Refinish Labor</Label>
              <Input
                id="refinishHours"
                type="number"
                min={0}
                step={0.1}
                placeholder="0"
                value={accident.refinishLaborHours || ""}
                onChange={(e) => updateLaborHours("refinishLaborHours", parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mechanicalHours">Mechanical Labor</Label>
              <Input
                id="mechanicalHours"
                type="number"
                min={0}
                step={0.1}
                placeholder="0"
                value={accident.mechanicalLaborHours || ""}
                onChange={(e) => updateLaborHours("mechanicalLaborHours", parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-muted p-4">
            <span className="font-medium">Total Labor Hours</span>
            <span className="text-2xl font-bold text-primary">{accident.totalLaborHours.toFixed(1)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Parts Information */}
      <Card>
        <CardHeader>
          <CardTitle>Parts Used in Repair</CardTitle>
          <CardDescription>
            Type of parts used affects the diminished value calculation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label>OEM Parts Used</Label>
                <p className="text-xs text-muted-foreground">
                  Original Equipment Manufacturer parts
                </p>
              </div>
              <Switch
                checked={accident.oemPartsUsed}
                onCheckedChange={(checked) => updateAccident({ oemPartsUsed: checked })}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label>Aftermarket Parts Used</Label>
                <p className="text-xs text-muted-foreground">
                  Non-OEM replacement parts
                </p>
              </div>
              <Switch
                checked={accident.aftermarketPartsUsed}
                onCheckedChange={(checked) => updateAccident({ aftermarketPartsUsed: checked })}
              />
            </div>
          </div>
          {accident.aftermarketPartsUsed && (
            <div className="space-y-2">
              <Label htmlFor="aftermarketList">Aftermarket Parts List</Label>
              <Textarea
                id="aftermarketList"
                placeholder="List the aftermarket parts used in repairs..."
                value={accident.aftermarketPartsList || ""}
                onChange={(e) => updateAccident({ aftermarketPartsList: e.target.value })}
                rows={3}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label>Paint Type Used</Label>
            <Select
              value={accident.paintType}
              onValueChange={(value) => updateAccident({ paintType: value as typeof accident.paintType })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="factory_oem">Factory OEM Paint</SelectItem>
                <SelectItem value="aftermarket_quality">Quality Aftermarket Paint</SelectItem>
                <SelectItem value="budget">Budget Paint</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Document Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Documents</CardTitle>
          <CardDescription>
            Upload repair estimate, photos, and supporting documents
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Repair Estimate Upload */}
          <div className="space-y-2">
            <Label>Repair Estimate / Invoice (PDF) *</Label>
            <div
              className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
                dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <FileText className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground text-center mb-2">
                Drag and drop your repair estimate here, or
              </p>
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Browse Files
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                PDF files up to 10MB
              </p>
            </div>
          </div>

          <Separator />

          {/* Photo Upload */}
          <div className="space-y-2">
            <Label>Damage & Repair Photos</Label>
            <div
              className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
                dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
              }`}
            >
              <Image className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground text-center mb-2">
                Upload photos of the damage and completed repairs
              </p>
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Upload Photos
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                JPG, PNG up to 5MB each
              </p>
            </div>
          </div>

          {/* Uploaded Files Preview */}
          {(accident.damagePhotos.length > 0 || accident.repairEstimatePdf) && (
            <div className="space-y-2">
              <Label>Uploaded Files</Label>
              <div className="space-y-2">
                {accident.repairEstimatePdf && (
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="text-sm">repair_estimate.pdf</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
