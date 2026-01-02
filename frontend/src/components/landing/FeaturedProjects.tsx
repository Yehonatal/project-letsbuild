import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { fetchFeaturedIdeas } from '@/services/shared'
import type { IdeaType } from '@/types/types'
import { Loader2, Star } from 'lucide-react'
import IdeaCard from '../IdeaCard'

const featuredIdeasQueryOptions = () =>
    queryOptions<IdeaType[]>({
        queryKey: ['featuredIdeas'],
        queryFn: () => fetchFeaturedIdeas(4),
        staleTime: 1000 * 60 * 2,
        refetchOnWindowFocus: true,
    })

const FeaturedProjects = () => {
    const { data: featuredIdeas } = useSuspenseQuery(
        featuredIdeasQueryOptions(),
    )

    if (!featuredIdeas) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 size={35} className="animate-spin text-gray-500" />
            </div>
        )
    }

    return (
        <section className="py-12">
            <div
                className="max-w-6xl mx-auto px-4"
                data-aos="fade-up"
                data-aos-delay="80"
            >
                <div className="space-y-12">
                    <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 text-amber-700 px-3 py-1 text-xs font-bold border border-amber-100">
                                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />{' '}
                                Curated spotlight
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
                                Featured project ideas
                            </h2>
                            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                                Handpicked concepts that blend originality,
                                clarity, and community energy. Explore these to
                                spark your next build or join forces with the
                                creators.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {['Upvotes', 'Creativity', 'Clarity', 'Impact'].map(
                                (tag) => (
                                    <span
                                        key={tag}
                                        className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 text-sm font-medium"
                                    >
                                        {tag}
                                    </span>
                                ),
                            )}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {featuredIdeas.map((idea) => (
                            <div key={idea._id} className="h-full">
                                <IdeaCard idea={idea} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

const Bullet = ({ title, body }: { title: string; body: string }) => (
    <div className="flex gap-3 items-start">
        <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-emerald-600 border border-slate-200 shadow-sm">
            <Star className="w-4 h-4" />
        </span>
        <div>
            <p className="font-semibold text-slate-900">{title}</p>
            <p className="text-sm text-slate-600">{body}</p>
        </div>
    </div>
)

export default FeaturedProjects
