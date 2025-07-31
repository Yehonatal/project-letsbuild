import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Toaster } from 'sonner'
import NotFound from '@/components/NotFound'
import Header from '../components/Header'
import Footer from '@/components/Footer'
import { LandingScrollProvider } from '@/context/LandingPageScrollContext'

import {
    Outlet,
    createRootRouteWithContext,
    HeadContent,
    useRouter,
} from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'
import AOS from 'aos'

type RouterContext = {
    queryClient: QueryClient
}

AOS.init({
    duration: 500,
    once: true,
})

export const Route = createRootRouteWithContext<RouterContext>()({
    head: () => ({
        meta: [
            {
                name: 'description',
                content:
                    'Welcome to the Project Idea Drop! Explore ideas, share your thoughts, and contribute to the community.',
            },
            {
                title: 'Project Idea Drop - Your Idea Hub',
            },
        ],
    }),
    component: RootLayout,
    notFoundComponent: NotFound,
})

function RootLayout() {
    return (
        <>
            <HeadContent />
            <LandingScrollProvider>
                <Header />
                <Outlet />
            </LandingScrollProvider>

            <Toaster />
            <TanStackRouterDevtools position="bottom-left" />
        </>
    )
}
