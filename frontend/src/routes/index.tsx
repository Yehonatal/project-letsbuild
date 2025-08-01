import LandingPageComponent from '@/components/LandingPage'
import { createFileRoute } from '@tanstack/react-router'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

type RefsContext = {
    homeRef: React.RefObject<HTMLDivElement>
    goalsRef: React.RefObject<HTMLDivElement>
    visionRef: React.RefObject<HTMLDivElement>
    featuredRef: React.RefObject<HTMLDivElement>
    communityRef: React.RefObject<HTMLDivElement>
}
export const Route = createFileRoute('/')({
    head: () => ({
        meta: [
            {
                name: 'description',
                content:
                    'Learn more about the Project Idea Drop and its purpose.',
            },
            {
                title: 'Project Idea Drop - About',
            },
        ],
    }),
    context: () => ({}) as RefsContext,
    component: HomePage,
})

function HomePage() {
    useEffect(() => {
        AOS.init({ duration: 800, once: true })
    }, [])

    return (
        <div>
            <LandingPageComponent />
        </div>
    )
}
