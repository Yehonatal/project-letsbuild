import { Wand2, Rocket, Users, Lightbulb } from 'lucide-react'

export default function VisionSection() {
  return (
    <section className="bg-gray-100 relative pt-32 pb-32 lg:pb-48 px-4">
      {/* Vision Text Block */}
      <div
        id="vision"
        className="max-w-3xl mx-auto text-center px-4 mb-10"
        data-aos="fade-up"
      >
        <Wand2 className="w-10  mx-auto text-indigo-600 " />
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Vision</h2>
        <p className="text-gray-700 text-lg mb-8">
          We imagine a future where developers globally share not just code —
          but potential. We’re building a community where mentorship, iteration,
          creativity, and shared ownership lead to more meaningful outcomes.
        </p>
      </div>

      <div
        className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 px-4
                      mt-12
                      md:mt-0 md:mt[-24px]
                      lg:mb-[-302px]"
      >
        {[
          {
            icon: <Rocket className="w-8 h-8 text-indigo-500 mb-2" />,
            title: 'Accelerate Innovation',
            desc: 'Lower the barrier between imagination and implementation.',
            delay: 200,
          },
          {
            icon: <Users className="w-8 h-8 text-indigo-500 mb-2" />,
            title: 'Grow Together',
            desc: 'Peer-driven learning where every voice matters.',
            delay: 300,
          },
          {
            icon: <Lightbulb className="w-8 h-8 text-indigo-500 mb-2" />,
            title: 'Inspire Creativity',
            desc: 'Express creativity and build something impactful.',
            delay: 400,
          },
        ].map(({ icon, title, desc, delay }, i) => (
          <div
            key={i}
            data-aos="fade-up"
            data-aos-delay={delay}
            className="bg-white flex-1 min-w-[220px] max-w-[300px] p-6 rounded-xl hover:shadow-2xl transition-all"
          >
            {icon}
            <h3 className="text-xl font-semibold mb-1">{title}</h3>
            <p className="text-gray-600 text-sm">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
