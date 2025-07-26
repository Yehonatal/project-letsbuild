import { Rocket, Lightbulb, Users, Hammer, Sparkles } from 'lucide-react'

export default function GoalsSection() {
  const items = [
    {
      icon: <Rocket className="w-8 h-8 text-purple-600" />,
      title: 'Launch Faster',
      desc: 'Reduce the time from idea to execution with shared inspiration and starter blueprints.',
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
      title: 'Grow Ideas Together',
      desc: 'Ideas evolve with discussion, voting, and iteration — the platform encourages feedback loops.',
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: 'Build in Public',
      desc: 'Collaborate openly. Share goals, progress, and updates to inspire and attract contributors.',
    },
    {
      icon: <Hammer className="w-8 h-8 text-blue-600" />,
      title: 'Tinker, Remix, Rebuild',
      desc: 'Start from scratch or fork ideas. Add your spin, build your vision.',
    },
    {
      icon: <Sparkles className="w-8 h-8 text-pink-500" />,
      title: 'Spark New Projects',
      desc: 'Get inspired by real-world challenges, startup concepts, and creative experiments.',
    },
  ]

  return (
    <section className="px-4 bg-white">
      <div className="max-w-6xl mx-auto" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
          Why We Built This 🚀
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              className="p-6 border border-gray-200 rounded-2xl transition bg-white"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
