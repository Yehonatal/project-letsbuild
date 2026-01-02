import { Link } from '@tanstack/react-router'
import { useLandingScroll } from '@/context/LandingPageScrollContext'
import { useRouterState } from '@tanstack/react-router'
import { useAuth } from '@/context/AuthContext'
import { useNavigate } from '@tanstack/react-router'
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
        <header className="sticky top-0 z-20 backdrop-blur-lg bg-white/75 border-b border-slate-200/70">
            <nav className="flex flex-row items-center justify-between max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center gap-3">
                    <Link
                        to="/"
                        onClick={() => scrollTo(homeRef)}
                        className="flex items-center gap-2"
                    >
                        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-white font-bold flex items-center justify-center shadow-lg shadow-emerald-300/40">
                            LB
                        </div>
                        <div className="leading-tight">
                            <span className="text-lg font-semibold text-slate-900 block">
                                letsBuild
                            </span>
                            <span className="text-xs text-slate-500 block">
                                Share your vision
                            </span>
                        </div>
                    </Link>
                </div>

                {isVisible && (
                    <nav
                        data-aos="fade-down"
                        data-aos-duration="500"
                        className="hidden md:flex flex-row items-center gap-3 text-slate-700"
                    >
                        {[
                            { label: 'Goals', ref: goalsRef },
                            { label: 'Vision', ref: visionRef },
                            { label: 'Featured', ref: featuredRef },
                            { label: 'Community', ref: communityRef },
                        ].map((item) => (
                            <button
                                key={item.label}
                                className="px-3 py-2 rounded-full border border-transparent hover:border-slate-200 hover:bg-white transition text-sm"
                                onClick={() => scrollTo(item.ref)}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                )}

                <div className="flex flex-row gap-3 items-center">
                    <Link
                        to="/ideas"
                        className="hidden sm:inline-flex items-center rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all"
                    >
                        Explore ideas
                    </Link>

                    {!user ? (
                        <div className="flex flex-row gap-3">
                            <Link
                                to="/login"
                                className="inline-flex items-center rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="inline-flex items-center rounded-2xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all"
                            >
                                Sign up
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-row gap-3 items-center">
                            <Link to="/profile" className="group">
                                <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold group-hover:ring-4 group-hover:ring-emerald-500/10 transition-all overflow-hidden">
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                                        alt={user.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    )
}
