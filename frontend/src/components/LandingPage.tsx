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
        <div className="text-gray-900 bg-[#fcfcfd]">
            <HeadContent />

            <div
                ref={homeRef}
                className="relative pt-16 pb-24 lg:pt-20 lg:pb-32 scroll-mt-10 px-4 overflow-hidden"
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-50/50 blur-[120px]" />
                    <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-cyan-50/50 blur-[100px]" />
                </div>

                <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
                    <HeroSection />
                    <div className="relative" data-aos="fade-left">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 rounded-[2.5rem] -rotate-2 scale-105" />
                        <div className="relative bg-white border border-slate-100 rounded-[2rem] p-8 shadow-2xl shadow-slate-200/50">
                            <LatestIdeas />
                        </div>
                    </div>
                </div>
            </div>

            <div ref={goalsRef} className="scroll-mt-24">
                <GoalsSection />
            </div>

            <div ref={visionRef} className="scroll-mt-24">
                <VisionSection />
            </div>

            <div ref={featuredRef} className="scroll-mt-10">
                <FeaturedProjects />
            </div>

            <div ref={communityRef} className="scroll-mt-24">
                <CommunitySection />
            </div>

            <div className="scroll-mt-24">
                <Footer />
            </div>
        </div>
    )
}

export default LandingPageComponent
