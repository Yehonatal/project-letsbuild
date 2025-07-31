import { Link } from '@tanstack/react-router'

const NotFound = () => {
    return (
        <div className="mt-10 flex flex-col items-center justify-center  text-center">
            <div className="mt-4 animate-bounce text-blue-600">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="red"
                    className="w-16 h-16"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 6v4m0 4h.01"
                    />
                </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Page Not Found</h1>
            <p className="text-gray-600 mt-2">
                Sorry, the page you are looking for does not exist.
            </p>

            <Link to="/" className="text-blue-600 mt-2">
                Please check the URL or go back to the homepage.
            </Link>
        </div>
    )
}

export default NotFound
