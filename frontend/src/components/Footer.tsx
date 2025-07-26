import { Github, Twitter, Mail } from 'lucide-react'
import { Link } from '@tanstack/react-router'

const Footer = () => {
  return (
    <footer className="bg-green-50/100 border-t border-dashed text-black py-12 px-6 mt-20">
      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-3 items-start">
        {/* Logo or Title */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Project Idea Drop</h2>
          <p className="text-sm text-black">
            Build. Share. Collaborate. Fueling developer creativity.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Explore</h3>
          <ul className="space-y-2 text-sm text-black">
            <li>
              <Link to="/" className="hover:text-green-700">
                Home
              </Link>
            </li>
            <li>
              <Link to="/ideas" className="hover:text-green-700">
                Ideas
              </Link>
            </li>

            <li>
              <a
                href="https://github.com/your-repo"
                target="_blank"
                className="hover:text-green-700"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Connect</h3>
          <div className="flex space-x-4">
            <a
              href="https://github.com/your-repo"
              target="_blank"
              aria-label="GitHub"
              className="hover:text-black"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="mailto:youremail@example.com"
              aria-label="Email"
              className="hover:text-black"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/yourhandle"
              target="_blank"
              aria-label="Twitter"
              className="hover:text-black"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-black">
        &copy; {new Date().getFullYear()} Project Idea Drop. Built with ❤️ by a
        developer for the community.
      </div>
    </footer>
  )
}

export default Footer
