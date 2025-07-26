import { createFileRoute, HeadContent } from '@tanstack/react-router'
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

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      {
        name: 'description',
        content: 'Learn more about the Project Idea Drop and its purpose.',
      },
      {
        title: 'Project Idea Drop - About',
      },
    ],
  }),
  component: AboutPage,
})

function AboutPage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true })
  }, [])

  return (
    <div className="text-gray-900">
      <HeadContent />

      <div id="home" className="py-50 scroll-mt-10">
        <HeroSection />
        <div className="absolute w-100 top-50 right-10 z-1">
          <LatestIdeas />
        </div>
      </div>

      <div id="goals" className="py-32 scroll-mt-24">
        <GoalsSection />
      </div>

      <div id="vision" className="pb-76 scroll-mt-24 ">
        <VisionSection />
      </div>

      <div id="featured" className="py-32 scroll-mt-10">
        <FeaturedProjects />
      </div>

      <div id="community" className="py-32 scroll-mt-24">
        <CommunitySection />
      </div>
    </div>
  )
}
