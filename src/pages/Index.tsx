
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BriefcaseBusiness,
  Search,
  MapPin,
  Laptop,
  Clock,
  Bell,
  BarChart,
  CheckCircle,
  ChevronRight,
} from "lucide-react";

// Categories for the job types section
const jobCategories = [
  {
    name: "Technology",
    icon: <Laptop className="h-6 w-6" />,
    count: 2543,
  },
  {
    name: "Marketing",
    icon: <BarChart className="h-6 w-6" />,
    count: 1829,
  },
  {
    name: "Customer Support",
    icon: <Bell className="h-6 w-6" />,
    count: 1375,
  },
  {
    name: "Sales",
    icon: <Clock className="h-6 w-6" />,
    count: 1205,
  },
];

// Testimonials data
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    company: "Stripe",
    content:
      "I found my dream job at Stripe through JobPortal. The search filters and job alerts made it super easy to find positions that matched my skills and interests.",
    avatar: null,
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    company: "Google",
    content:
      "As someone who was looking for specific roles in tech, JobPortal's advanced filters saved me so much time. I was able to land a position at Google within just 3 weeks!",
    avatar: null,
  },
  {
    name: "Emma Wilson",
    role: "UX Designer",
    company: "Airbnb",
    content:
      "The job alert feature is amazing! I set up alerts for design positions and received a notification about my current role at Airbnb. The application process was seamless.",
    avatar: null,
  },
];

// Features list
const features = [
  {
    icon: <Search className="h-10 w-10 text-job" />,
    title: "Advanced Search Filters",
    description:
      "Find the perfect job with our powerful search filters. Filter by location, experience, skills, and more.",
  },
  {
    icon: <Bell className="h-10 w-10 text-job" />,
    title: "Job Alerts",
    description:
      "Set up personalized job alerts and receive notifications when new jobs matching your criteria are posted.",
  },
  {
    icon: <BriefcaseBusiness className="h-10 w-10 text-job" />,
    title: "Multiple Job Sources",
    description:
      "We aggregate job listings from multiple sources to give you the widest selection of opportunities.",
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    keyword: "",
    location: "",
    category: "",
  });

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/search", { state: searchParams });
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-job to-blue-700 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Find Your Dream Job Today
            </h1>
            <p className="mt-4 text-lg text-white/90 md:text-xl">
              Search through thousands of job listings from multiple sources and
              get matched with the perfect opportunity.
            </p>

            <form
              onSubmit={handleSearchSubmit}
              className="mt-8 rounded-lg bg-white p-4 shadow-lg md:p-6"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="keyword" className="mb-1.5 block text-gray-700">
                    What
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="keyword"
                      name="keyword"
                      className="pl-10"
                      placeholder="Job title, skills, or company"
                      value={searchParams.keyword}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location" className="mb-1.5 block text-gray-700">
                    Where
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="location"
                      name="location"
                      className="pl-10"
                      placeholder="City, state, or remote"
                      value={searchParams.location}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="category" className="mb-1.5 block text-gray-700">
                    Category
                  </Label>
                  <Select
                    value={searchParams.category}
                    onValueChange={(value) =>
                      setSearchParams((prev) => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="customer_support">
                        Customer Support
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                type="submit"
                className="mt-4 w-full bg-job hover:bg-job-dark"
              >
                Search Jobs
              </Button>
            </form>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}></div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold">
            Browse by Category
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
            Explore job opportunities across various industries and find the
            perfect role for your skills and experience.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {jobCategories.map((category, idx) => (
              <div
                key={idx}
                className="rounded-lg border bg-white p-6 text-center shadow-sm transition-all hover:shadow-md"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-job-light">
                  <div className="text-job">{category.icon}</div>
                </div>
                <h3 className="mt-4 text-xl font-medium">{category.name}</h3>
                <p className="mt-2 text-muted-foreground">
                  {category.count.toLocaleString()} jobs available
                </p>
                <Link to={`/search?category=${category.name.toLowerCase()}`}>
                  <Button variant="link" className="mt-2 text-job">
                    Browse Jobs
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold">How It Works</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
            Find your dream job in just a few simple steps with our powerful job
            search platform.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-job text-white">
                1
              </div>
              <h3 className="mt-4 text-xl font-medium">Create an Account</h3>
              <p className="mt-2 text-gray-600">
                Sign up for a free account to unlock personalized job
                recommendations and alerts.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-job text-white">
                2
              </div>
              <h3 className="mt-4 text-xl font-medium">
                Search or Set Job Alerts
              </h3>
              <p className="mt-2 text-gray-600">
                Use our powerful search filters or create job alerts to find
                opportunities that match your criteria.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-job text-white">
                3
              </div>
              <h3 className="mt-4 text-xl font-medium">Apply and Get Hired</h3>
              <p className="mt-2 text-gray-600">
                Apply directly to jobs through our platform and track your
                applications in one place.
              </p>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-job hover:bg-job-dark">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="lg:flex lg:items-center lg:space-x-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold">
                Powerful Features to Help You Find Your Dream Job
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Our platform is designed to make your job search efficient and
                effective with these powerful tools.
              </p>

              <div className="mt-8 space-y-8">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex">
                    <div className="mr-4 mt-1">{feature.icon}</div>
                    <div>
                      <h3 className="text-xl font-medium">{feature.title}</h3>
                      <p className="mt-2 text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link to="/search">
                  <Button size="lg" className="bg-job hover:bg-job-dark">
                    Start Searching
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-10 lg:mt-0 lg:w-1/2">
              <div className="rounded-lg bg-job p-1">
                <div className="rounded-md bg-white p-6 shadow-lg">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Access to thousands of job listings</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Create custom job alerts</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Track your job applications</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Filter by salary, location, and more</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Get personalized job recommendations</span>
                    </div>
                  </div>

                  <div className="mt-6 rounded-lg bg-job-light p-4">
                    <p className="text-center text-sm">
                      <span className="font-medium">Pro Tip:</span> Set up job
                      alerts to get notified when new jobs matching your criteria
                      are posted.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold">
            Success Stories
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
            Hear from job seekers who found their dream jobs through our
            platform.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="rounded-lg bg-white p-6 shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-job text-job-foreground">
                    {testimonial.avatar || testimonial.name[0]}
                  </div>
                  <div>
                    <h3 className="font-medium">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-job py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Ready to Find Your Dream Job?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/90">
            Join thousands of job seekers who have found their perfect job
            through our platform. It's free to get started!
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link to="/register">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-job hover:bg-gray-100"
              >
                Create an Account
              </Button>
            </Link>
            <Link to="/search">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Browse Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
