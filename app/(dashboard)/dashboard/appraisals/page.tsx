import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Plus,
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  Car,
  ArrowRight,
  Download,
  MoreHorizontal,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for appraisals
const appraisals = [
  {
    id: "1",
    claimNumber: "CS-2026-001",
    vehicle: "2022 Toyota Camry XSE",
    vin: "4T1BZ1HK5NU123456",
    status: "completed",
    createdDate: "Mar 10, 2026",
    completedDate: "Mar 15, 2026",
    repairCost: 8500,
    diminishedValue: 4250,
  },
  {
    id: "2",
    claimNumber: "CS-2026-002",
    vehicle: "2023 Honda Accord Sport",
    vin: "1HGCV2F34PA567890",
    status: "processing",
    createdDate: "Mar 18, 2026",
    completedDate: null,
    repairCost: 12000,
    diminishedValue: null,
  },
  {
    id: "3",
    claimNumber: "CS-2026-003",
    vehicle: "2021 BMW X5 xDrive40i",
    vin: "5UXCR6C55M9D12345",
    status: "draft",
    createdDate: "Mar 25, 2026",
    completedDate: null,
    repairCost: null,
    diminishedValue: null,
  },
]

const statusConfig = {
  draft: {
    label: "Draft",
    variant: "secondary" as const,
    icon: Clock,
    className: "",
  },
  processing: {
    label: "Processing",
    variant: "default" as const,
    icon: AlertCircle,
    className: "bg-primary/10 text-primary border-primary/20",
  },
  completed: {
    label: "Completed",
    variant: "default" as const,
    icon: CheckCircle2,
    className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  },
}

export default function AppraisalsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Appraisals</h1>
          <p className="text-muted-foreground">
            Manage and track all your diminished value appraisals.
          </p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/dashboard/appraisals/new">
            <Plus className="mr-2 h-4 w-4" />
            New Appraisal
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by vehicle, VIN, or claim number..."
                className="pl-10"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Appraisals Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Appraisals</CardTitle>
          <CardDescription>
            A list of all your diminished value appraisal requests.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden md:block rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Claim #</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Repair Cost</TableHead>
                  <TableHead className="text-right">DV Amount</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appraisals.map((appraisal) => {
                  const status = statusConfig[appraisal.status as keyof typeof statusConfig]
                  const StatusIcon = status.icon
                  return (
                    <TableRow key={appraisal.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                            <Car className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">{appraisal.vehicle}</p>
                            <p className="text-xs text-muted-foreground font-mono">
                              {appraisal.vin}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {appraisal.claimNumber}
                      </TableCell>
                      <TableCell>
                        <Badge className={status.className}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {appraisal.createdDate}
                      </TableCell>
                      <TableCell className="text-right">
                        {appraisal.repairCost
                          ? `$${appraisal.repairCost.toLocaleString()}`
                          : "-"}
                      </TableCell>
                      <TableCell className="text-right font-semibold text-primary">
                        {appraisal.diminishedValue
                          ? `$${appraisal.diminishedValue.toLocaleString()}`
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/appraisals/${appraisal.id}`}>
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            {appraisal.status === "draft" && (
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/appraisals/${appraisal.id}/edit`}>
                                  Continue Editing
                                </Link>
                              </DropdownMenuItem>
                            )}
                            {appraisal.status === "completed" && (
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-4 md:hidden">
            {appraisals.map((appraisal) => {
              const status = statusConfig[appraisal.status as keyof typeof statusConfig]
              const StatusIcon = status.icon
              return (
                <div
                  key={appraisal.id}
                  className="rounded-lg border p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <Car className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{appraisal.vehicle}</p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {appraisal.claimNumber}
                        </p>
                      </div>
                    </div>
                    <Badge className={status.className}>
                      <StatusIcon className="mr-1 h-3 w-3" />
                      {status.label}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Created</span>
                    <span>{appraisal.createdDate}</span>
                  </div>
                  {appraisal.repairCost && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Repair Cost</span>
                      <span>${appraisal.repairCost.toLocaleString()}</span>
                    </div>
                  )}
                  {appraisal.diminishedValue && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Diminished Value</span>
                      <span className="font-semibold text-primary">
                        ${appraisal.diminishedValue.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href={`/dashboard/appraisals/${appraisal.id}`}>
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
