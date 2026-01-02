import { Rocket, Lightbulb, Users, Hammer, Sparkles } from 'lucide-react'

export default function GoalsSection() {
    const items = [
        {
            icon: <Rocket className="w-6 h-6 text-emerald-600" />,
            title: 'Launch faster',
            desc: 'Reduce the distance between idea and execution with starter templates and supportive peers.',
        },
        {
            icon: <Lightbulb className="w-6 h-6 text-cyan-600" />,
            title: 'Grow ideas together',
            desc: 'Iterate through constructive feedback, votes, and thoughtful comments that sharpen the vision.',
        },
        {
            icon: <Users className="w-6 h-6 text-emerald-600" />,
            title: 'Build in public',
            desc: 'Share progress transparently to inspire contributors and stay accountable.',
        },
        {
            icon: <Hammer className="w-6 h-6 text-slate-700" />,
            title: 'Remix with intention',
            desc: 'Fork ideas, add your spin, and credit collaborators for their sparks.',
        },
        {
            icon: <Sparkles className="w-6 h-6 text-amber-500" />,
            title: 'Seek fresh prompts',
            desc: 'Browse curated briefs, challenges, and experiments to kickstart your next build.',
        },
    ]

    return (
        <section className="py-12">
            <div className="max-w-6xl mx-auto" data-aos="fade-up">
                <div className="mb-16 space-y-4">
                    <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
                        Why we built{' '}
                        <span className="text-emerald-600">letsBuild</span>
                    </h2>
                    <p className="text-slate-600 max-w-2xl text-lg leading-relaxed">
                        A calmer corner of the internet for developers who want
                        to share meaningful concepts without the noise.
                        Everything is designed to move ideas forward.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className="group relative p-8 rounded-3xl border border-slate-100 bg-white transition-all hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1"
                            data-aos="fade-up"
                            data-aos-delay={i * 80}
                        >
                            <div className="inline-flex items-center justify-center rounded-2xl bg-slate-50 group-hover:bg-emerald-50 transition-colors w-12 h-12 mb-6">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900">
                                {item.title}
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
