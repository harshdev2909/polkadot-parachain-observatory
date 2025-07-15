"use client"

import { useState } from "react"
import {
  AlertTriangle,
  Bell,
  Clock,
  Database,
  GitBranch,
  Home,
  MessageSquare,
  Search,
  Settings,
  Shield,
  User,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data
const mockParachains = [
  "Acala",
  "Moonbeam",
  "Astar",
  "Parallel",
  "Centrifuge",
  "Composable",
  "Bifrost",
  "Phala",
  "Interlay",
  "Kilt",
  "Nodle",
  "Unique",
]

const mockAlerts = [
  {
    id: 1,
    timestamp: "2024-01-15 14:32:15",
    parachain: "Acala",
    type: "Runtime Anomaly",
    severity: "High",
    status: "Pending",
    description: "Unusual storage growth detected",
  },
  {
    id: 2,
    timestamp: "2024-01-15 14:28:42",
    parachain: "Moonbeam",
    type: "XCM Timeout",
    severity: "Medium",
    status: "Acknowledged",
    description: "Message timeout to Astar",
  },
  {
    id: 3,
    timestamp: "2024-01-15 14:15:33",
    parachain: "Parallel",
    type: "Block Production",
    severity: "Low",
    status: "Pending",
    description: "Slightly increased block time",
  },
]

const mockXcmTrace = [
  {
    step: 1,
    from: "Acala",
    to: "Moonbeam",
    status: "Success",
    timestamp: "2024-01-15 14:30:15.123",
    latency: "245ms",
  },
  {
    step: 2,
    from: "Moonbeam",
    to: "Astar",
    status: "Success",
    timestamp: "2024-01-15 14:30:15.368",
    latency: "189ms",
  },
  {
    step: 3,
    from: "Astar",
    to: "Parallel",
    status: "Pending",
    timestamp: "2024-01-15 14:30:15.557",
    latency: "—",
  },
]

// Heatmap component
function CrossChainHeatmap() {
  const parachains = mockParachains.slice(0, 8)

  return (
    <div className="grid grid-cols-9 gap-1 text-xs">
      <div></div>
      {parachains.map((chain) => (
        <div key={chain} className="p-2 text-center font-medium truncate">
          {chain.slice(0, 4)}
        </div>
      ))}
      {parachains.map((fromChain) => (
        <div key={fromChain}>
          <div className="p-2 font-medium truncate">{fromChain.slice(0, 4)}</div>
          {parachains.map((toChain) => {
            const intensity = fromChain === toChain ? 0 : Math.random()
            const bgColor =
              intensity > 0.7
                ? "bg-red-500"
                : intensity > 0.4
                  ? "bg-yellow-500"
                  : intensity > 0.1
                    ? "bg-green-500"
                    : "bg-gray-700"
            return (
              <div
                key={`${fromChain}-${toChain}`}
                className={`h-8 w-8 ${bgColor} rounded opacity-${Math.floor(intensity * 100)}`}
                title={`${fromChain} → ${toChain}: ${Math.floor(intensity * 100)} messages`}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

// Main dashboard view
function DashboardView() {
  return (
    <div className="space-y-6">
      {/* Ecosystem Health Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Parachains</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">XCM Messages Today</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,847</div>
            <p className="text-xs text-muted-foreground">+15.2% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Message Latency</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234ms</div>
            <p className="text-xs text-muted-foreground">-12ms from last hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Runtime Anomalies</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 high, 1 medium</p>
          </CardContent>
        </Card>
      </div>

      {/* Cross-Chain Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Cross-Chain Message Heatmap</CardTitle>
          <CardDescription>XCM traffic intensity between parachains (last 24h)</CardDescription>
        </CardHeader>
        <CardContent>
          <CrossChainHeatmap />
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>Latest detected anomalies and issues</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Parachain</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell className="font-mono text-sm">{alert.timestamp}</TableCell>
                  <TableCell>{alert.parachain}</TableCell>
                  <TableCell>{alert.type}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        alert.severity === "High"
                          ? "destructive"
                          : alert.severity === "Medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {alert.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={alert.status === "Pending" ? "outline" : "secondary"}>{alert.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// Parachain States view
function ParachainStatesView() {
  const [selectedParachain, setSelectedParachain] = useState("Acala")

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Label htmlFor="parachain-select">Select Parachain:</Label>
        <Select value={selectedParachain} onValueChange={setSelectedParachain}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {mockParachains.map((chain) => (
              <SelectItem key={chain} value={chain}>
                {chain}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Storage Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 GB</div>
            <div className="h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded mt-2 opacity-20"></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Transaction Count</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231</div>
            <div className="h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded mt-2 opacity-20"></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Avg Block Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.3s</div>
            <div className="h-20 bg-gradient-to-r from-yellow-500 to-red-500 rounded mt-2 opacity-20"></div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Runtime State Graph</CardTitle>
          <CardDescription>Real-time metrics for {selectedParachain}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-900 rounded-lg flex items-center justify-center">
            <div className="text-muted-foreground">Runtime state visualization would go here</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// XCM Tracer view
function XcmTracerView() {
  const [xcmHash, setXcmHash] = useState("")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>XCM Message Tracer</CardTitle>
          <CardDescription>Track cross-chain messages through the ecosystem</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="xcm-hash">XCM Hash or Sender/Receiver</Label>
              <Input
                id="xcm-hash"
                placeholder="0x1234...abcd or Acala→Moonbeam"
                value={xcmHash}
                onChange={(e) => setXcmHash(e.target.value)}
              />
            </div>
            <Button className="mt-6">Trace</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Message Trace</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Step</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Latency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockXcmTrace.map((trace) => (
                <TableRow key={trace.step}>
                  <TableCell>{trace.step}</TableCell>
                  <TableCell>{trace.from}</TableCell>
                  <TableCell>{trace.to}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        trace.status === "Success" ? "default" : trace.status === "Pending" ? "outline" : "destructive"
                      }
                    >
                      {trace.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{trace.timestamp}</TableCell>
                  <TableCell>{trace.latency}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Message Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-gray-900 rounded-lg flex items-center justify-center">
            <div className="text-muted-foreground">Visual flow diagram would go here</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Alerts view
function AlertsView() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Alert Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="acknowledged">Acknowledged</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Parachain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Parachains</SelectItem>
                {mockParachains.map((chain) => (
                  <SelectItem key={chain} value={chain}>
                    {chain}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detected Anomalies</CardTitle>
          <CardDescription>All alerts and anomalies detected in the ecosystem</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Parachain</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell className="font-mono text-sm">{alert.timestamp}</TableCell>
                  <TableCell>{alert.parachain}</TableCell>
                  <TableCell>{alert.type}</TableCell>
                  <TableCell>{alert.description}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        alert.severity === "High"
                          ? "destructive"
                          : alert.severity === "Medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {alert.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={alert.status === "Pending" ? "outline" : "secondary"}>{alert.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Acknowledge
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// Settings view
function SettingsView() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Observatory Settings</CardTitle>
          <CardDescription>Configure your PPO dashboard preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Notification Preferences</Label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="high-alerts" defaultChecked />
                <Label htmlFor="high-alerts">High severity alerts</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="medium-alerts" defaultChecked />
                <Label htmlFor="medium-alerts">Medium severity alerts</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="low-alerts" />
                <Label htmlFor="low-alerts">Low severity alerts</Label>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <Label>Refresh Intervals</Label>
            <div className="mt-2 grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="dashboard-refresh">Dashboard</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="30 seconds" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 seconds</SelectItem>
                    <SelectItem value="30">30 seconds</SelectItem>
                    <SelectItem value="60">1 minute</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="alerts-refresh">Alerts</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="5 seconds" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 seconds</SelectItem>
                    <SelectItem value="10">10 seconds</SelectItem>
                    <SelectItem value="30">30 seconds</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function PPODashboard() {
  const [currentView, setCurrentView] = useState("dashboard")

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "parachain-states", label: "Parachain States", icon: Database },
    { id: "xcm-tracer", label: "XCM Tracer", icon: GitBranch },
    { id: "alerts", label: "Alerts", icon: AlertTriangle },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardView />
      case "parachain-states":
        return <ParachainStatesView />
      case "xcm-tracer":
        return <XcmTracerView />
      case "alerts":
        return <AlertsView />
      case "settings":
        return <SettingsView />
      default:
        return <DashboardView />
    }
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <div className="flex items-center gap-2 px-2 py-1">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">PPO</span>
                    <span className="text-xs text-muted-foreground">Parachain Observatory</span>
                  </div>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton onClick={() => setCurrentView(item.id)} isActive={currentView === item.id}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex-1">
          {/* Topbar */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />

            <div className="flex flex-1 items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search parachains or XCM hash..." className="pl-8" />
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Notifications</span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Sign out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="p-4">{renderCurrentView()}</div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
