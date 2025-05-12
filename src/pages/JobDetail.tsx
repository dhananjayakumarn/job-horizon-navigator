
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BriefcaseBusiness,
  MapPin,
  Calendar,
  Building,
  ExternalLink,
  Share2,
  Bookmark,
  Search,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { toast } from "sonner";

// Mock job data
const mockJob = {
  jobId: "job-123",
  jobTitle: "Senior React Developer",
  companyName: "Harness",
  companyLogoUrl: null,
  location: "San Francisco, CA",
  skills: ["React", "TypeScript", "Redux", "JavaScript", "Node.js", "REST API"],
  experienceRange: "5-8 years",
  datePosted: "2025-05-09",
  salary: "$120K - $160K",
  jobUrl: "https://example.com/job/123",
  description: `We're looking for a Senior React Developer to join our growing team. 

As a Senior React Developer at Harness, you will play a crucial role in developing and maintaining our web applications. You'll collaborate closely with designers, product managers, and other engineers to deliver exceptional user experiences.

**Requirements:**
- 5+ years of experience with React and modern JavaScript
- Strong understanding of state management libraries like Redux
- Experience with TypeScript
- Ability to write clean, maintainable, and well-tested code
- Knowledge of responsive design and cross-browser compatibility
- Experience with REST APIs and data integration

**Responsibilities:**
- Develop and maintain React components and applications
- Collaborate with the design team to implement pixel-perfect UIs
- Optimize applications for maximum speed and scalability
- Work with product managers to understand requirements
- Mentor junior developers and provide code reviews
- Troubleshoot and debug issues as they arise

**Benefits:**
- Competitive salary and equity
- Health, dental, and vision insurance
- 401(k) matching
- Flexible work arrangements
- Professional development budget
- Annual team retreats
- Unlimited PTO

If you're passionate about building great user experiences and want to work with a talented and collaborative team, we'd love to hear from you!`,
  companyDescription: "Harness is a continuous delivery platform that helps companies build, test, and deploy software quickly and securely."
};

// Mock similar jobs
const mockSimilarJobs = [
  {
    jobId: "job-124",
    jobTitle: "Senior Frontend Engineer",
    companyName: "Stripe",
    location: "Remote",
    datePosted: "2025-05-08",
  },
  {
    jobId: "job-125",
    jobTitle: "React Developer",
    companyName: "Airbnb",
    location: "San Francisco, CA",
    datePosted: "2025-05-07",
  },
  {
    jobId: "job-126",
    jobTitle: "Frontend Team Lead",
    companyName: "Netflix",
    location: "Los Angeles, CA",
    datePosted: "2025-05-06",
  },
];

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(mockJob);
  const [isLoading, setIsLoading] = useState(true);
  const [similarJobs, setSimilarJobs] = useState(mockSimilarJobs);

  useEffect(() => {
    // Simulate API call to get job details
    setIsLoading(true);
    setTimeout(() => {
      // In a real app, we would fetch job details from the API based on id
      setJob(mockJob);
      setSimilarJobs(mockSimilarJobs);
      setIsLoading(false);
    }, 800);
  }, [id]);

  const handleSaveJob = () => {
    toast.success("Job saved to your bookmarks");
  };

  const handleShareJob = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Job URL copied to clipboard");
  };

  const handleApply = () => {
    toast.success("Redirecting to application page...");
    // In a real app, we would redirect to the job application page or open in a new tab
  };

  if (isLoading) {
    return (
      <div className="page-container">
        <div className="animate-pulse-light space-y-4">
          <div className="h-10 w-1/3 rounded bg-gray-200" />
          <div className="h-6 w-1/4 rounded bg-gray-200" />
          <div className="mt-6 h-40 rounded-lg bg-gray-200" />
          <div className="mt-6 space-y-2">
            <div className="h-4 rounded bg-gray-200" />
            <div className="h-4 rounded bg-gray-200" />
            <div className="h-4 w-4/5 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/search">Jobs</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{job.jobTitle}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold">{job.jobTitle}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Building className="mr-1 h-4 w-4" />
                    {job.companyName}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    Posted {new Date(job.datePosted).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                  onClick={handleShareJob}
                >
                  <Share2 className="mr-1 h-4 w-4" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                  onClick={handleSaveJob}
                >
                  <Bookmark className="mr-1 h-4 w-4" />
                  Save
                </Button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {job.skills.map((skill, idx) => (
                <span key={idx} className="job-tag">
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Job Description</h2>
                <span className="text-sm font-medium text-job-dark">
                  {job.salary}
                </span>
              </div>
              <div className="mt-4 whitespace-pre-line text-gray-600">
                {job.description}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold">About {job.companyName}</h2>
              <p className="mt-2 text-gray-600">{job.companyDescription}</p>
            </div>

            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                className="flex items-center"
                onClick={handleSaveJob}
              >
                <Bookmark className="mr-2 h-4 w-4" />
                Save Job
              </Button>
              <Button
                className="bg-job hover:bg-job-dark"
                onClick={handleApply}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Apply Now
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Similar Jobs</h2>
            <div className="mt-4 space-y-4">
              {similarJobs.map((job) => (
                <div key={job.jobId} className="border-b pb-4 last:border-0 last:pb-0">
                  <Link
                    to={`/jobs/${job.jobId}`}
                    className="block hover:text-job"
                  >
                    <h3 className="font-medium">{job.jobTitle}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {job.companyName} • {job.location}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Posted {new Date(job.datePosted).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link to="/search">
                <Button variant="outline" className="w-full">
                  <Search className="mr-2 h-4 w-4" />
                  Find More Jobs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
