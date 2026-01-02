import { Users } from 'lucide-react'

const CommunitySection = () => {
    return (
        <section className="py-24 lg:py-32">
            <div className="max-w-4xl mx-auto px-6">
                <div className="p-8 text-center" data-aos="fade-up">
                    <div className="inline-flex items-center justify-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 mb-6">
                        <Users className="w-4 h-4 mr-2" />
                        Community powered
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                        Join the movement
                    </h2>

                    <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
                        You are not just sharing ideas — you are shaping the
                        future of developer collaboration. Contribute feedback,
                        spark partnerships, and help ship meaningful products.
                    </p>

                    <div className="flex justify-center gap-4 flex-wrap">
                        <a
                            href="/ideas"
                            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 text-white px-6 py-3 font-bold shadow hover:bg-emerald-700 transition-all duration-200"
                        >
                            Explore ideas
                        </a>
                        <a
                            href="/register"
                            className="inline-flex items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700 px-6 py-3 font-bold hover:bg-emerald-100 transition-all duration-200"
                        >
                            Become a member
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CommunitySection
