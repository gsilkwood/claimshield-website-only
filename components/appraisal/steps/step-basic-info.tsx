"use client"

import { useWizard } from "@/lib/wizard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
]

export function StepBasicInfo() {
  const { data, updateMetadata, updateOwner, updateInsurance } = useWizard()
  const metadata = data.metadata!
  const owner = data.owner!
  const insurance = data.insurance!

  return (
    <div className="space-y-6">
      {/* Appraisal Metadata */}
      <Card>
        <CardHeader>
          <CardTitle>Appraisal Information</CardTitle>
          <CardDescription>
            Basic details about this appraisal request
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="accidentDate">Accident Date *</Label>
              <Input
                id="accidentDate"
                type="date"
                value={metadata.accidentDate}
                onChange={(e) => updateMetadata({ accidentDate: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose *</Label>
              <Select
                value={metadata.purpose}
                onValueChange={(value) => updateMetadata({ purpose: value as typeof metadata.purpose })}
              >
                <SelectTrigger id="purpose">
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="insurance_claim">Insurance Claim</SelectItem>
                  <SelectItem value="legal_proceeding">Legal Proceeding</SelectItem>
                  <SelectItem value="dispute_resolution">Dispute Resolution</SelectItem>
                  <SelectItem value="expert_testimony">Expert Testimony</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="claimNumber">Claim Number (if known)</Label>
            <Input
              id="claimNumber"
              placeholder="e.g., CLM-2026-12345"
              value={metadata.claimNumber || ""}
              onChange={(e) => updateMetadata({ claimNumber: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Owner Information */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Owner Information</CardTitle>
          <CardDescription>
            The registered owner of the vehicle being appraised
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              value={owner.fullName}
              onChange={(e) => updateOwner({ fullName: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="street">Street Address *</Label>
            <Input
              id="street"
              placeholder="123 Main Street"
              value={owner.address.street}
              onChange={(e) => updateOwner({ address: { ...owner.address, street: e.target.value } })}
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                placeholder="Anytown"
                value={owner.address.city}
                onChange={(e) => updateOwner({ address: { ...owner.address, city: e.target.value } })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State *</Label>
              <Select
                value={owner.address.state}
                onValueChange={(value) => updateOwner({ address: { ...owner.address, state: value } })}
              >
                <SelectTrigger id="state">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {US_STATES.map((state) => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP Code *</Label>
              <Input
                id="zip"
                placeholder="12345"
                value={owner.address.zip}
                onChange={(e) => updateOwner({ address: { ...owner.address, zip: e.target.value } })}
                required
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={owner.phone}
                onChange={(e) => updateOwner({ phone: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={owner.email}
                onChange={(e) => updateOwner({ email: e.target.value })}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insurance Information */}
      <Card>
        <CardHeader>
          <CardTitle>Insurance Information</CardTitle>
          <CardDescription>
            At-fault party&apos;s insurance details (the insurance company you&apos;re claiming against)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="insuranceCompany">Insurance Company *</Label>
            <Input
              id="insuranceCompany"
              placeholder="State Farm, GEICO, Progressive, etc."
              value={insurance.insuranceCompany}
              onChange={(e) => updateInsurance({ insuranceCompany: e.target.value })}
              required
            />
          </div>
          <Separator />
          <p className="text-sm text-muted-foreground">Optional: Additional claim details</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="policyNumber">Policy Number</Label>
              <Input
                id="policyNumber"
                placeholder="POL-123456789"
                value={insurance.policyNumber || ""}
                onChange={(e) => updateInsurance({ policyNumber: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="insClaimNumber">Insurance Claim Number</Label>
              <Input
                id="insClaimNumber"
                placeholder="CLM-987654321"
                value={insurance.claimNumber || ""}
                onChange={(e) => updateInsurance({ claimNumber: e.target.value })}
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="adjusterName">Adjuster Name</Label>
              <Input
                id="adjusterName"
                placeholder="Jane Smith"
                value={insurance.adjusterName || ""}
                onChange={(e) => updateInsurance({ adjusterName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adjusterPhone">Adjuster Phone</Label>
              <Input
                id="adjusterPhone"
                type="tel"
                placeholder="(555) 987-6543"
                value={insurance.adjusterPhone || ""}
                onChange={(e) => updateInsurance({ adjusterPhone: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
