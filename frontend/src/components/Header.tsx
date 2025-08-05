import { Link } from '@tanstack/react-router'
import { useLandingScroll } from '@/context/LandingPageScrollContext'
import { useRouterState } from '@tanstack/react-router'
import { useAuth } from '@/context/AuthContext'
import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import api from '@/lib/axios'
import { logoutUser } from '@/services/auth'

export default function Header() {
    let context
    try {
        context = useLandingScroll()
    } catch {
        context = null
    }
    const {
        scrollTo,
        refs: { homeRef, goalsRef, visionRef, featuredRef, communityRef },
    } = context || {
        scrollTo: () => {},
        refs: {
            homeRef: { current: null },
            goalsRef: { current: null },
            visionRef: { current: null },
            featuredRef: { current: null },
            communityRef: { current: null },
        },
    }
    const navigate = useNavigate()
    const { setUser, setAccessToken, user } = useAuth()

    const handleLogout = async () => {
        try {
            await logoutUser()
            setUser(null)
            setAccessToken(null)
            navigate({ to: '/' })
        } catch (error: any) {
            console.error('Error logging out user:', error)
        }
    }

    const routerState = useRouterState({ select: (state) => state.location })
    const isHome = routerState.pathname === '/'

    const isVisible = isHome ? useLandingScroll() : null

    return (
        <header className="p-2 px-4 bg-green-50/50 border-b border-dashed text-black sticky top-0 z-10 backdrop-blur-sm">
            <nav className="flex flex-row justify-between max-w-6xl mx-auto">
                <div className="px-2 font-bold">
                    <Link
                        to="/"
                        onClick={() => scrollTo(homeRef)}
                        className="flex items-center gap-2 "
                    >
                        <span className="text-xl font-bold text-gray-800">
                            letsBuild
                        </span>
                        <span className="text-sm font-medium text-gray-400">
                            Share Your Vision
                        </span>
                    </Link>
                </div>
                {isVisible && (
                    <nav
                        data-aos="fade-down"
                        data-aos-duration="500"
                        className="flex flex-row justify-between mx-auto items-center"
                    >
                        <ul className="flex flex-row gap-4 text-gray-700">
                            <li
                                className="cursor-pointer hover:underline"
                                onClick={() => scrollTo(goalsRef)}
                            >
                                Goals
                            </li>
                            <li
                                className="cursor-pointer hover:underline"
                                onClick={() => scrollTo(visionRef)}
                            >
                                Vision
                            </li>
                            <li
                                className="cursor-pointer hover:underline"
                                onClick={() => scrollTo(featuredRef)}
                            >
                                Featured Projects
                            </li>
                            <li
                                className="cursor-pointer hover:underline"
                                onClick={() => scrollTo(communityRef)}
                            >
                                Community
                            </li>
                        </ul>
                    </nav>
                )}

                <div className="flex flex-row gap-4 items-center">
                    <div className="flex flex-row gap-4 text-gray-700 items-center">
                        <ul>
                            <li
                                className=" cursor-pointer *:hover:text-green-700
           "
                            >
                                <Link to="/ideas">Explore Ideas</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Auth Button */}
                    {!user ? (
                        <div className="ml-4 flex flex-row gap-4">
                            <Link
                                to="/login"
                                className="font-bold px-2 py-1 border-dashed rounded-lg text-sm text-white border-2 border-green-700 bg-green-500 shadow-md transition-all duration-300 transform active:scale-95 active:bg-green-600 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-300 hover:shadow-lg"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="font-bold border-dashed px-2 py-1 rounded-lg text-sm text-white border-2 border-green-700 bg-green-500 shadow-md transition-all duration-300 transform active:scale-95 active:bg-green-600 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-300 hover:shadow-lg"
                            >
                                Register
                            </Link>
                        </div>
                    ) : (
                        <div className="ml-4 flex flex-row gap-4">
                            <button
                                onClick={handleLogout}
                                className="font-bold px-2 py-1 border-dashed rounded-lg text-sm text-white border-2 border-green-700 bg-green-500 shadow-md transition-all duration-300 transform active:scale-95 active:bg-green-600 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-300 hover:shadow-lg"
                            >
                                Logout
                            </button>
                        </div>
                    )}

                    {/* User Profile */}
                    {user && (
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 border-gray-700 border-dashed border-2 flex items-center justify-center rounded-full bg-green-500 text-white font-bold">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    )
}
