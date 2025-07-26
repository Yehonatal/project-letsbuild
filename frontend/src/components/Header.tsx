import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="p-2 bg-green-50/50 border-b border-dashed text-black sticky top-0 z-10 backdrop-blur-sm">
      <nav className="flex flex-row justify-between max-w-5xl mx-auto">
        <div className="px-2 font-bold">
          <Link to="/" className="flex items-center gap-2 ">
            <span className="text-xl font-bold text-gray-800">letsBuild</span>
            <span className="text-sm font-medium text-gray-400">
              Share Your Vision
            </span>
          </Link>
        </div>
        <nav className="flex flex-row justify-between max-w-5xl mx-auto">
          <div>
            <ul className="flex flex-row gap-4 text-gray-700">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <a href="#vision" className="hover:text-green-700">
                  Vision
                </a>
              </li>
              <li>
                <a href="#featured" className="hover:text-green-700">
                  Featured
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-green-700">
                  Community
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div>
          <ul className="flex flex-row gap-4 text-gray-700">
            <li
              className=" cursor-pointer *:hover:text-green-700
           "
            >
              <Link to="/ideas">Explore Ideas</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
