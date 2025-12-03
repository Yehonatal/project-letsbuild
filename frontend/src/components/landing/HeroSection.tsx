import { Github } from 'lucide-react'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative px-4 text-center bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto" data-aos="fade-up">
        <h1 className="text-5xl justify-center flex gap-2 items-center sm:text-6xl font-bold mb-6 leading-tight tracking-tight text-gray-900">
          Build Better Ideas, Together.
          <motion.div
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.5 }}
            drag
          >
            💡
          </motion.div>
        </h1>

        <p className="text-xl text-gray-600 mb-6 leading-relaxed max-w-3xl mx-auto">
          A community-powered platform for developers to share, grow, and
          collaborate on meaningful software ideas. From passion projects to
          startup sparks, everything starts with a single idea.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4 text-gray-700 text-sm">
          <FeatureCard
            icon="💭"
            title="Share Ideas"
            description="Post your own project concepts with tags, stack, and goals."
          />
          <FeatureCard
            icon="🔍"
            title="Explore"
            description="Browse ideas by difficulty, tech, and community buzz."
          />
          <FeatureCard
            icon="🔥"
            title="Get Inspired"
            description="Find your next hackathon project or side hustle starter."
          />
          <FeatureCard
            icon="🤝"
            title="Collaborate"
            description="Vote, comment, and connect with like-minded devs."
          />
        </div>

        <div className="mt-10 flex justify-center gap-4">
          <a
            href="/ideas"
            className="inline-flex items-center gap-2 px-6 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition text-base"
          >
            💡 Explore Ideas
          </a>
          <a
            href="https://github.com/your-repo"
            className="inline-flex items-center gap-2 px-6 py-2 rounded-md border border-gray-300 text-gray-800 hover:bg-gray-100 transition text-base"
          >
            <Github className="w-5 h-5" />
            Visit GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <div
      className="w-48 px-4 py-3  transition-all"
      data-aos="fade-zoom-in"
      data-aos-delay="300"
    >
      <div className="text-2xl">{icon}</div>
      <div className="font-semibold text-gray-800 mt-2">{title}</div>
      <div className="text-xs text-gray-500 mt-1">{description}</div>
    </div>
  )
}
