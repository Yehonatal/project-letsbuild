import { Wand2, Rocket, Users, Lightbulb } from 'lucide-react'

export default function VisionSection() {
    const pillars = [
        {
            icon: <Rocket className="w-5 h-5" />,
            title: 'Accelerate innovation',
            desc: 'Lower the barrier between imagination and implementation with real collaborators.',
        },
        {
            icon: <Users className="w-5 h-5" />,
            title: 'Grow together',
            desc: 'Peer-driven learning where every voice matters and credit is shared.',
        },
        {
            icon: <Lightbulb className="w-5 h-5" />,
            title: 'Inspire creativity',
            desc: 'Reframe problems, remix solutions, and keep shipping beautiful things.',
        },
    ]

    return (
        <section className="py-24 lg:py-32">
            <div className="relative max-w-6xl mx-auto px-4" data-aos="fade-up">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium">
                            <Wand2 className="w-4 h-4" />
                            Our vision
                        </div>
                        <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 leading-[1.1] tracking-tight">
                            A calmer, more intentional place to build
                        </h2>
                        <p className="text-slate-600 text-lg lg:text-xl leading-relaxed max-w-xl">
                            We see a future where developers share not just
                            code, but possibility. Mentorship, iteration, and
                            shared ownership are baked into every interaction.
                        </p>
                    </div>

                    <div className="grid gap-6">
                        {pillars.map((pillar, index) => (
                            <div
                                key={pillar.title}
                                className="group relative p-6 rounded-[2rem] border border-slate-100 bg-white hover:shadow-md transition-all duration-300"
                                data-aos="fade-left"
                                data-aos-delay={index * 100}
                            >
                                <div className="flex gap-6 items-start">
                                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                                        {pillar.icon}
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-slate-900">
                                            {pillar.title}
                                        </h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            {pillar.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
