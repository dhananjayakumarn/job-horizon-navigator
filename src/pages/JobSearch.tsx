
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BriefcaseBusiness,
  MapPin,
  Search,
  AlertCircle,
  BellPlus,
  Filter,
} from "lucide-react";
import { toast } from "sonner";

// Mock job data
const mockJobs = [
  {
    jobId: "job-123",
    jobTitle: "Senior React Developer",
    companyName: "Harness",
    companyLogoUrl: null,
    location: "San Francisco, CA",
    skills: ["React", "TypeScript", "Redux"],
    experienceRange: "5-8 years",
    datePosted: "2025-05-09",
    salary: "$120K - $160K",
    jobUrl: "https://example.com/job/123",
    description: "We're looking for a experienced React developer to join our team...",
  },
  {
    jobId: "job-124",
    jobTitle: "Frontend Engineer",
    companyName: "Airbnb",
    companyLogoUrl: null,
    location: "Remote",
    skills: ["JavaScript", "React", "CSS"],
    experienceRange: "3-5 years",
    datePosted: "2025-05-08",
    salary: "$100K - $130K",
    jobUrl: "https://example.com/job/124",
    description: "Join our team and build the future of travel...",
  },
  {
    jobId: "job-125",
    jobTitle: "Full Stack Developer",
    companyName: "Stripe",
    companyLogoUrl: null,
    location: "New York, NY",
    skills: ["JavaScript", "Node.js", "React"],
    experienceRange: "2-4 years",
    datePosted: "2025-05-07",
    salary: "$110K - $140K",
    jobUrl: "https://example.com/job/125",
    description: "Help us build the next generation of payment infrastructure...",
  },
  {
    jobId: "job-126",
    jobTitle: "Senior Backend Engineer",
    companyName: "Netflix",
    companyLogoUrl: null,
    location: "Los Angeles, CA",
    skills: ["Java", "Spring Boot", "AWS"],
    experienceRange: "5+ years",
    datePosted: "2025-05-06",
    salary: "$140K - $180K",
    jobUrl: "https://example.com/job/126",
    description: "Join our team to build scalable backend systems...",
  },
  {
    jobId: "job-127",
    jobTitle: "DevOps Engineer",
    companyName: "Google",
    companyLogoUrl: null,
    location: "Mountain View, CA",
    skills: ["Docker", "Kubernetes", "CI/CD"],
    experienceRange: "3-6 years",
    datePosted: "2025-05-05",
    salary: "$130K - $170K",
    jobUrl: "https://example.com/job/127",
    description: "Help us build and maintain our cloud infrastructure...",
  },
];

const JobSearch = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useState({
    designation: "",
    keywords: "",
    location: "",
    expRange: [0, 15],
    sources: {
      googleJobs: true,
      indeedJobs: true,
      linkedinJobs: true,
    },
  });
  
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState(mockJobs);
  const [pagination] = useState({
    total: 45,
    page: 1,
    limit: 10,
    hasMore: true,
    totalPages: 5,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSourceToggle = (source: keyof typeof searchParams.sources) => {
    setSearchParams((prev) => ({
      ...prev,
      sources: {
        ...prev.sources,
        [source]: !prev.sources[source],
      },
    }));
  };

  const handleExpRangeChange = (value: number[]) => {
    setSearchParams((prev) => ({
      ...prev,
      expRange: value,
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // In a real app, we would fetch data from the API
      // For now, we'll just use our mock data
      setJobs(mockJobs);
      setIsLoading(false);
    }, 800);
  };

  const createJobAlert = () => {
    if (user) {
      toast.success("Job alert created successfully!");
    } else {
      toast.error("Please sign in to create job alerts");
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Find Your Dream Job</h1>
        <p className="page-description">
          Search through thousands of job listings from multiple sources
        </p>
      </div>

      <div className="rounded-lg bg-job-light p-6">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="designation" className="mb-1.5 block">
                Job Title
              </Label>
              <div className="relative">
                <BriefcaseBusiness className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="designation"
                  name="designation"
                  className="pl-10"
                  placeholder="Job title or role"
                  value={searchParams.designation}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="keywords" className="mb-1.5 block">
                Skills & Keywords
              </Label>
              <Input
                id="keywords"
                name="keywords"
                placeholder="React, Node.js, etc."
                value={searchParams.keywords}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="location" className="mb-1.5 block">
                Location
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="location"
                  name="location"
                  className="pl-10"
                  placeholder="City, state or remote"
                  value={searchParams.location}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Button
              type="submit"
              className="bg-job hover:bg-job-dark"
              disabled={isLoading}
            >
              <Search className="mr-2 h-4 w-4" />
              {isLoading ? "Searching..." : "Search Jobs"}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsFiltersVisible(!isFiltersVisible)}
            >
              <Filter className="mr-2 h-4 w-4" />
              {isFiltersVisible ? "Hide Filters" : "Show Filters"}
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={createJobAlert}
              className="ml-auto"
            >
              <BellPlus className="mr-2 h-4 w-4" />
              Save this search as alert
            </Button>
          </div>

          {isFiltersVisible && (
            <div className="mt-4 rounded-md border bg-white p-4 shadow-sm">
              <h3 className="mb-4 font-medium">Advanced Filters</h3>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Experience Level</Label>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">
                          {searchParams.expRange[0]} years
                        </span>
                        <span className="text-sm">
                          {searchParams.expRange[1] === 15
                            ? "15+ years"
                            : `${searchParams.expRange[1]} years`}
                        </span>
                      </div>
                      <Slider
                        defaultValue={[0, 15]}
                        max={15}
                        step={1}
                        value={searchParams.expRange}
                        onValueChange={handleExpRangeChange}
                        className="py-2"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="mb-2 block">Job Type</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="full-time">Full Time</SelectItem>
                      <SelectItem value="part-time">Part Time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label className="mb-2 block">Data Sources</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="googleJobs"
                        checked={searchParams.sources.googleJobs}
                        onCheckedChange={() => handleSourceToggle("googleJobs")}
                      />
                      <Label
                        htmlFor="googleJobs"
                        className="cursor-pointer text-sm font-normal"
                      >
                        Google Jobs
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="indeedJobs"
                        checked={searchParams.sources.indeedJobs}
                        onCheckedChange={() => handleSourceToggle("indeedJobs")}
                      />
                      <Label
                        htmlFor="indeedJobs"
                        className="cursor-pointer text-sm font-normal"
                      >
                        Indeed Jobs
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="linkedinJobs"
                        checked={searchParams.sources.linkedinJobs}
                        onCheckedChange={() => handleSourceToggle("linkedinJobs")}
                      />
                      <Label
                        htmlFor="linkedinJobs"
                        className="cursor-pointer text-sm font-normal"
                      >
                        LinkedIn Jobs
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {jobs.length > 0
              ? `${pagination.total} Jobs Found`
              : "No Jobs Found"}
          </h2>
          <Select defaultValue="relevance">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="newest">Date: Newest</SelectItem>
              <SelectItem value="salary">Salary: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="job-card animate-pulse-light"
              >
                <div className="flex">
                  <div className="h-12 w-12 rounded-md bg-gray-200" />
                  <div className="ml-4 flex-1 space-y-2">
                    <div className="h-5 w-3/4 rounded bg-gray-200" />
                    <div className="h-4 w-1/2 rounded bg-gray-200" />
                    <div className="flex gap-2">
                      <div className="h-6 w-16 rounded-full bg-gray-200" />
                      <div className="h-6 w-16 rounded-full bg-gray-200" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : jobs.length > 0 ? (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.jobId} className="job-card">
                <div className="flex items-start">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-job-light">
                    <BriefcaseBusiness className="h-6 w-6 text-job" />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium">
                          <Link
                            to={`/jobs/${job.jobId}`}
                            className="hover:text-job"
                          >
                            {job.jobTitle}
                          </Link>
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {job.companyName} • {job.location}
                        </p>
                      </div>
                      <span className="whitespace-nowrap text-sm font-medium text-job-dark">
                        {job.salary}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {job.skills.map((skill, idx) => (
                        <span key={idx} className="job-tag">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mt-3 text-sm">
                      <p className="line-clamp-2 text-gray-600">
                        {job.description}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Posted {new Date(job.datePosted).toLocaleDateString()}
                      </span>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          Save
                        </Button>
                        <Button size="sm" className="bg-job hover:bg-job-dark">
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <AlertCircle className="mb-2 h-10 w-10 text-muted-foreground" />
            <h3 className="mb-1 text-lg font-medium">No jobs found</h3>
            <p className="mb-4 max-w-md text-sm text-muted-foreground">
              We couldn't find any jobs matching your search criteria. Try
              adjusting your filters or search terms.
            </p>
            <Button
              className="bg-job hover:bg-job-dark"
              onClick={() => setSearchParams({
                designation: "",
                keywords: "",
                location: "",
                expRange: [0, 15],
                sources: {
                  googleJobs: true,
                  indeedJobs: true,
                  linkedinJobs: true,
                },
              })}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {jobs.length > 0 && (
          <div className="mt-8 flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page === 1}
            >
              Previous
            </Button>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
              (page) => (
                <Button
                  key={page}
                  variant={pagination.page === page ? "default" : "outline"}
                  size="sm"
                  className={pagination.page === page ? "bg-job" : ""}
                >
                  {page}
                </Button>
              )
            )}
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page === pagination.totalPages}
            >
              Next
            </Button>
          </div>
        )}

        {user?.plan === "free" && jobs.length > 0 && (
          <div className="mt-8 rounded-lg border bg-job-light p-6 text-center">
            <h3 className="text-lg font-semibold">
              Unlock Premium Features
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Upgrade to premium to access all search results, advanced filters,
              and unlimited job alerts.
            </p>
            <div className="mt-4">
              <Link to="/pricing">
                <Button className="bg-job hover:bg-job-dark">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSearch;
