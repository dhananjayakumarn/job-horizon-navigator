
import { Link } from "react-router-dom";
import { BriefcaseBusiness } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center">
              <BriefcaseBusiness className="h-8 w-8 text-job" />
              <span className="ml-2 text-xl font-bold">JobPortal</span>
            </Link>
            <p className="mt-4 text-gray-600">
              Find your dream job with our powerful job search platform.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Job Seekers</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/search" className="text-gray-600 hover:text-job">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-job">
                  Job Alerts
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 hover:text-job">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/help" className="text-gray-600 hover:text-job">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-job">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-job">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-600">
                Email: support@jobportal.com
              </li>
              <li className="text-gray-600">
                Phone: +1 (555) 123-4567
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} JobPortal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
