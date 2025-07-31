import { HeadContent } from '@tanstack/react-router'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import HeroSection from '@/components/landing/HeroSection'
import GoalsSection from '@/components/landing/GoalsSection'
import FeaturedProjects from '@/components/landing/FeaturedProjects'
import VisionSection from '@/components/landing/VisionSection'
import CommunitySection from '@/components/landing/CommunitySection'
import LatestIdeas from '@/components/LatestIdeas'
import Footer from '@/components/Footer'
import { useLandingScroll } from '@/context/LandingPageScrollContext'

const LandingPageComponent = () => {
    useEffect(() => {
        AOS.init({ duration: 800, once: true })
    }, [])

    const {
        refs: { homeRef, goalsRef, visionRef, featuredRef, communityRef },
    } = useLandingScroll()
    return (
        <div className="text-gray-900">
            <HeadContent />

            <div ref={homeRef} className="py-50 scroll-mt-10 max-w-6xl mx-auto">
                <HeroSection />
                <div className="absolute w-100 top-50 right-10 z-1">
                    <LatestIdeas />
                </div>
            </div>

            <div
                ref={goalsRef}
                className="py-32 scroll-mt-24 max-w-6xl mx-auto"
            >
                <GoalsSection />
            </div>

            <div ref={visionRef} className="pb-76 scroll-mt-24 ">
                <VisionSection />
            </div>

            <div
                ref={featuredRef}
                className="py-32 scroll-mt-10 max-w-6xl mx-auto"
            >
                <FeaturedProjects />
            </div>

            <div ref={communityRef} className="py-32 scroll-mt-24">
                <CommunitySection />
            </div>

            <div className=" scroll-mt-24">
                <Footer />
            </div>
        </div>
    )
}

export default LandingPageComponent
