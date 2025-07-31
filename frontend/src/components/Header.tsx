import { Link } from '@tanstack/react-router'
import { useLandingScroll } from '@/context/LandingPageScrollContext'
import { useRouterState } from '@tanstack/react-router'
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

    const routerState = useRouterState({ select: (state) => state.location })
    const isHome = routerState.pathname === '/'

    const isVisible = isHome ? useLandingScroll() : null

    return (
        <header className="p-2 bg-green-50/50 border-b border-dashed text-black sticky top-0 z-10 backdrop-blur-sm">
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
                        className="flex flex-row justify-between mx-auto"
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
