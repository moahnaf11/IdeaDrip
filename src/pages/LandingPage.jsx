import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-8 w-8 bg-teal-400 rounded mr-2"></div>
          <span className="font-semibold text-lg">IdeaDrip</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="#" className="text-sm text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link to="#" className="text-sm text-gray-700 hover:text-gray-900">
            Features
          </Link>
          <Link to="#" className="text-sm text-gray-700 hover:text-gray-900">
            Pricing
          </Link>
          <Link to="#" className="text-sm text-gray-700 hover:text-gray-900">
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          <Link to="/login" className="text-sm font-medium">
            Login
          </Link>
          <Link
            to="/register"
            className="text-sm font-medium bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-md"
          >
            Register
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl mx-auto leading-tight">
          Generate Smart Business Ideas Instantly
        </h1>
        <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
          Turn trends and pain points into startup ideas with AI.
        </p>
        {/* <div className="mt-8">
          <button className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-md font-medium">
            Clear CTA Text
          </button>
          <p className="text-xs text-gray-500 mt-2">
            Reduce Risk: Free 14 day trial
          </p>
        </div> */}

        <div className="mt-12 relative">
          <div className="relative z-10 max-w-4xl mx-auto">
            <img
              src="https://placehold.co/1200x800/png"
              alt="Product Dashboard on Laptop"
              className="rounded-lg shadow-xl w-full"
            />
          </div>
          <div className="absolute -left-4 top-1/4 w-24 h-24 bg-yellow-300 rounded-full -z-10 hidden md:block"></div>
          <div className="absolute right-1/4 bottom-0 w-32 h-8 bg-yellow-300 -z-10 hidden md:block"></div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-600 mb-6">
          Join 1,000+ aspiring founders using IdeaDrip to discover their next
          business idea
        </p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-xs text-gray-500">Logo</span>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-xs text-gray-500">Logo</span>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-xs text-gray-500">Logo</span>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-xs text-gray-500">Logo</span>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-xs text-gray-500">Logo</span>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-xs text-gray-500">Logo</span>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-xs text-gray-500">Logo</span>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-xs text-gray-500">Logo</span>
          </div>
        </div>
      </section>

      {/* Problem Solution Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold max-w-2xl mx-auto">
          Turn real problems into real opportunities.
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          IdeaDrip scans forums, reviews, and social media to find what people
          are struggling with. Then, it summarizes those problems into clear,
          actionable startup ideas — so you can skip the noise and build what
          matters.
        </p>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {/* Benefit 1 */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-yellow-300 rounded-full flex items-center justify-center mb-6">
              <img
                src="https://placehold.co/120x120/png"
                alt="Benefit 1 illustration"
                className="w-24 h-24"
              />
            </div>
            <h3 className="font-semibold text-lg mb-2">
              Scrapes Real Pain Points
            </h3>
            <p className="text-gray-600 text-sm">
              Pulls complaints, questions, and rants from places like Reddit and
              Twitter, Quora
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-yellow-300 rounded-full flex items-center justify-center mb-6">
              <img
                src="https://placehold.co/120x120/png"
                alt="Benefit 2 illustration"
                className="w-24 h-24"
              />
            </div>
            <h3 className="font-semibold text-lg mb-2">
              AI Summarizes the Noise
            </h3>
            <p className="text-gray-600 text-sm">
              Turns messy posts into short, easy-to-digest summaries with
              potential solutions.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-yellow-300 rounded-full flex items-center justify-center mb-6">
              <img
                src="https://placehold.co/120x120/png"
                alt="Benefit 3 illustration"
                className="w-24 h-24"
              />
            </div>
            <h3 className="font-semibold text-lg mb-2">
              Validates Startup Ideas
            </h3>
            <p className="text-gray-600 text-sm">
              Get category tags, upvote metrics, and “build scores” to help you
              pick the best ideas to pursue.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <blockquote className="max-w-2xl mx-auto italic text-gray-600">
          “I used to spend hours on Twitter looking for startup ideas. Now I
          just open IdeaDrip.”
        </blockquote>
        <div className="mt-6 flex items-center justify-center">
          <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
          <div className="text-sm text-left">
            <p className="font-medium">— Jordan L., Indie Hacker</p>
            <p className="text-gray-600">CEO of Company Name</p>
          </div>
        </div>
      </section>

      {/* Features as Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 relative">
            <div className="relative z-10">
              <img
                src="https://placehold.co/400x800/png"
                alt="Mobile App"
                className="mx-auto rounded-lg shadow-xl"
              />
            </div>
            <div className="absolute -z-10 w-full h-full top-0 left-0">
              <div className="absolute left-0 bottom-0 w-32 h-32 bg-yellow-300 rounded-full"></div>
              <div className="absolute right-1/4 top-1/4 w-16 h-16 bg-blue-100 rounded-full"></div>
              <div className="absolute right-0 bottom-1/3 w-24 h-24 bg-purple-100 rounded-full"></div>
            </div>
          </div>

          <div className="md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Spark Your Next Big Idea in Seconds
            </h2>
            <p className="text-gray-600 mb-8">
              Tired of staring at blank screens? Our AI-powered generator
              delivers fresh, actionable business ideas tailored to your skills
              and market trends.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaCheck className="text-green-500 mr-2 mt-1 flex-shrink-0 w-5 h-5" />
                <span>No more creative blocks – get instant inspiration</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="text-green-500 mr-2 mt-1 flex-shrink-0 w-5 h-5" />
                <span>Skip the guesswork – validate ideas fast</span>
              </li>
              <li className="flex items-start">
                <FaCheck className="text-green-500 mr-2 mt-1 flex-shrink-0 w-5 h-5" />
                <span>Plain English results – no jargon overload</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold max-w-2xl mx-auto">
          Ready to build your next startup?
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Join 1,000+ founders using IdeaDrip to discover real problems worth
          solving.
        </p>
        <div className="mt-8">
          <Link
            to="/login"
            className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-md font-medium"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="h-8 w-8 bg-teal-400 rounded mr-2"></div>
              <span className="font-semibold">IdeaDrip</span>
            </div>

            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-6 md:mb-0">
              <Link
                to="#"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Home
              </Link>
              <Link
                to="#"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Features
              </Link>
              <Link
                to="#"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Pricing
              </Link>
              <Link
                to="#"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Contact
              </Link>
              <Link
                to="#"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Terms
              </Link>
              <Link
                to="#"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Privacy
              </Link>
            </nav>

            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} IdeaDrip. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
