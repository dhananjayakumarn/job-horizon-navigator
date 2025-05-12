
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BellRing,
  BriefcaseBusiness,
  Eye,
  PlusCircle,
  Search,
  Star,
  TrendingUp,
} from "lucide-react";

// Mock data
const mockAlerts = [
  {
    id: "1",
    name: "Senior React Developer",
    criteria: {
      designation: "Senior Developer",
      keywords: ["React", "TypeScript"],
      location: "San Francisco",
      exp_min: 3,
    },
    frequency: "daily",
    active: true,
    lastSent: "2025-05-10T09:15:22.921Z",
    createdAt: "2025-05-01T10:24:16.921Z",
  },
  {
    id: "2",
    name: "Backend Engineer",
    criteria: {
      designation: "Backend Engineer",
      keywords: ["Node.js", "Express"],
      location: "Remote",
      exp_min: 2,
    },
    frequency: "weekly",
    active: true,
    lastSent: "2025-05-08T09:15:22.921Z",
    createdAt: "2025-05-02T10:24:16.921Z",
  },
];

const mockRecentJobs = [
  {
    id: "j1",
    title: "Senior React Developer",
    company: "Airbnb",
    logo: "https://example.com/logo1.png",
    location: "San Francisco, CA",
    salary: "$120K - $160K",
    posted: "2 days ago",
  },
  {
    id: "j2",
    title: "Full Stack Engineer",
    company: "Stripe",
    logo: "https://example.com/logo2.png",
    location: "Remote",
    salary: "$100K - $150K",
    posted: "3 days ago",
  },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [stats] = useState({
    views: 42,
    alerts: 2,
    matches: 15,
    saved: 7,
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-description">
          Welcome back, {user?.firstName}! Here's an overview of your job search activity.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center">
              <Eye className="mr-2 h-5 w-5 text-job" />
              Profile Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.views}</p>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center">
              <BellRing className="mr-2 h-5 w-5 text-job" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.alerts}</p>
            <p className="text-xs text-muted-foreground">
              {user?.plan === "free" ? "2/5 (Free plan)" : "Unlimited"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-job" />
              Job Matches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.matches}</p>
            <p className="text-xs text-muted-foreground">
              Based on your criteria
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center">
              <Star className="mr-2 h-5 w-5 text-job" />
              Saved Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.saved}</p>
            <p className="text-xs text-muted-foreground">
              Apply soon!
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Your Job Alerts</CardTitle>
                <Button size="sm" className="bg-job hover:bg-job-dark">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Alert
                </Button>
              </div>
              <CardDescription>
                Receive job matches based on your criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              {mockAlerts.length > 0 ? (
                <div className="space-y-4">
                  {mockAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="rounded-lg border bg-card p-4 shadow-sm"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="font-medium">{alert.name}</h3>
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${
                            alert.active
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {alert.active ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>
                          {alert.criteria.designation} in{" "}
                          {alert.criteria.location}
                        </p>
                        <p>
                          Keywords:{" "}
                          {alert.criteria.keywords.map((kw, i) => (
                            <span key={i} className="job-tag mr-1">
                              {kw}
                            </span>
                          ))}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {alert.frequency.charAt(0).toUpperCase() +
                            alert.frequency.slice(1)}{" "}
                          updates
                        </span>
                        <span>
                          Last sent:{" "}
                          {new Date(alert.lastSent).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-4">
                  <BellRing className="mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="mb-1 text-sm font-medium">No alerts yet</p>
                  <p className="text-xs text-muted-foreground">
                    Create your first job alert to get notified
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Link to="/alerts">
                <Button variant="outline" size="sm">
                  View All Alerts
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Job Matches</CardTitle>
              <CardDescription>
                Based on your job alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              {mockRecentJobs.map((job) => (
                <div
                  key={job.id}
                  className="mb-4 rounded-lg border bg-card p-3 shadow-sm"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-job-light">
                      <BriefcaseBusiness className="h-6 w-6 text-job" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-medium leading-tight">
                        <Link
                          to={`/jobs/${job.id}`}
                          className="hover:text-job"
                        >
                          {job.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {job.company} • {job.location}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          {job.posted}
                        </span>
                        <span className="font-medium text-job-dark">
                          {job.salary}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Link to="/search">
                <Button className="w-full bg-job hover:bg-job-dark">
                  <Search className="mr-2 h-4 w-4" />
                  Search More Jobs
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {user?.plan === "free" && (
            <Card className="mt-4">
              <CardHeader className="bg-job-light">
                <CardTitle>Upgrade to Premium</CardTitle>
                <CardDescription>
                  Get unlimited job alerts and more
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2 rounded-full bg-green-100 p-0.5 text-green-500">
                      ✓
                    </span>
                    <span className="text-sm">Unlimited job alerts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 rounded-full bg-green-100 p-0.5 text-green-500">
                      ✓
                    </span>
                    <span className="text-sm">
                      Access to all search filters
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 rounded-full bg-green-100 p-0.5 text-green-500">
                      ✓
                    </span>
                    <span className="text-sm">
                      View all job search results
                    </span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/pricing">
                  <Button className="w-full">View Plans</Button>
                </Link>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
