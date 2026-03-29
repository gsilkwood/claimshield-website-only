import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Car,
  ArrowRight,
} from "lucide-react"

// Mock data for recent appraisals
const recentAppraisals = [
  {
    id: "1",
    vehicle: "2022 Toyota Camry XSE",
    status: "completed",
    date: "Mar 15, 2026",
    diminishedValue: 4250,
  },
  {
    id: "2",
    vehicle: "2023 Honda Accord Sport",
    status: "processing",
    date: "Mar 20, 2026",
    diminishedValue: null,
  },
  {
    id: "3",
    vehicle: "2021 BMW X5 xDrive40i",
    status: "draft",
    date: "Mar 25, 2026",
    diminishedValue: null,
  },
]

const statusConfig = {
  draft: {
    label: "Draft",
    variant: "secondary" as const,
    icon: Clock,
  },
  processing: {
    label: "Processing",
    variant: "default" as const,
    icon: AlertCircle,
  },
  completed: {
    label: "Completed",
    variant: "default" as const,
    icon: CheckCircle2,
  },
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, John</h1>
          <p className="text-muted-foreground">
            Here&apos;s an overview of your diminished value claims.
          </p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/dashboard/appraisals/new">
            <Plus className="mr-2 h-4 w-4" />
            New Appraisal
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Appraisals
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              1 completed, 2 in progress
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total DV Claimed
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,250</div>
            <p className="text-xs text-muted-foreground">
              From 1 completed appraisal
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Vehicles Appraised
            </CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Across all claims
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Recovery
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,250</div>
            <p className="text-xs text-muted-foreground">
              Per completed claim
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Appraisals */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Appraisals</CardTitle>
            <CardDescription>
              Your most recent diminished value appraisals
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/appraisals">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAppraisals.map((appraisal) => {
              const status = statusConfig[appraisal.status as keyof typeof statusConfig]
              const StatusIcon = status.icon
              return (
                <div
                  key={appraisal.id}
                  className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <Car className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{appraisal.vehicle}</p>
                      <p className="text-sm text-muted-foreground">{appraisal.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {appraisal.diminishedValue && (
                      <span className="text-lg font-semibold text-primary">
                        ${appraisal.diminishedValue.toLocaleString()}
                      </span>
                    )}
                    <Badge
                      variant={status.variant}
                      className={
                        appraisal.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : appraisal.status === "processing"
                          ? "bg-primary/10 text-primary"
                          : ""
                      }
                    >
                      <StatusIcon className="mr-1 h-3 w-3" />
                      {status.label}
                    </Badge>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/appraisals/${appraisal.id}`}>
                        View
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <Link href="/dashboard/appraisals/new">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-2">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Start New Appraisal</CardTitle>
              <CardDescription>
                Begin a new diminished value appraisal for your vehicle
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>
        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <Link href="/dashboard/appraisals">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-2">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">View All Appraisals</CardTitle>
              <CardDescription>
                Access and manage all your appraisal reports
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>
        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <Link href="/dashboard/help">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-2">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Learn About DV Claims</CardTitle>
              <CardDescription>
                Understand the process and maximize your recovery
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>
      </div>
    </div>
  )
}
