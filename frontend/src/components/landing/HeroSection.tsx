import { Github, Sparkles, ArrowRight, Wand2 } from 'lucide-react'

export default function HeroSection() {
    return (
        <section className="relative py-12 lg:py-16">
            <div className="relative space-y-8" data-aos="fade-up">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    Human-first idea lab
                </div>

                <div className="space-y-6">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-slate-900">
                        Build better ideas with{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">
                            people who care.
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
                        A calm space for developers to share sparks, gather
                        collaborators, and grow concepts into thoughtful
                        products. Minimal noise, more signal.
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                    <a
                        href="/ideas"
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-4 text-white font-medium transition hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-200 hover:-translate-y-0.5"
                    >
                        Start exploring
                        <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                        href="/register"
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-4 text-slate-900 font-medium transition hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-0.5"
                    >
                        Join the community
                    </a>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 pt-12">
                    <FeatureCard
                        icon={<Wand2 className="w-5 h-5 text-emerald-600" />}
                        title="Share concepts"
                        description="Capture your spark with goals, stack, and impact so people instantly get it."
                    />
                    <FeatureCard
                        icon={<Sparkles className="w-5 h-5 text-cyan-600" />}
                        title="Find collaborators"
                        description="Match with builders who resonate with your idea and values."
                    />
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
    icon: React.ReactNode
    title: string
    description: string
}) {
    return (
        <div
            className="group relative p-6 rounded-2xl border border-slate-100 bg-white/50 transition-all hover:border-emerald-200 hover:bg-white hover:shadow-md"
            data-aos="fade-up"
        >
            <div className="mb-4 inline-flex p-3 rounded-xl bg-slate-50 group-hover:bg-emerald-50 transition-colors">
                {icon}
            </div>
            <h3 className="font-semibold text-slate-900 text-lg">{title}</h3>
            <p className="text-slate-600 mt-2 leading-relaxed text-sm">
                {description}
            </p>
        </div>
    )
}
