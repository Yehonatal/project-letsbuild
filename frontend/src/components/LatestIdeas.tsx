import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { fetchLatestIdeas } from '@/services/shared'
import type { IdeaType } from '@/types/types'
import { DoorOpenIcon, Loader2 } from 'lucide-react'
import { Link } from '@tanstack/react-router'

const latestIdeasQueryOption = () =>
    queryOptions<IdeaType[]>({
        queryKey: ['latest-ideas'],
        queryFn: () => fetchLatestIdeas(3),
        staleTime: 1000 * 60 * 2, // 2 minutes
        refetchOnWindowFocus: true,
    })

const LatestIdeas = () => {
    const { data: ideas } = useSuspenseQuery(latestIdeasQueryOption())

    if (!ideas || ideas.length === 0) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 size={35} className="animate-spin text-gray-500" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold text-slate-900">
                        Latest drops
                    </h3>
                    <p className="text-sm text-slate-500">
                        Fresh from the community
                    </p>
                </div>
                <a
                    href="/ideas"
                    className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                    View all
                </a>
            </div>
            <div className="space-y-4">
                {ideas.map((idea, idx) => (
                    <div
                        key={idea._id}
                        data-aos="fade-up"
                        data-aos-delay={100 * Number(idx)}
                        className="group block p-5 rounded-2xl border border-slate-50 bg-slate-50/50 hover:bg-white hover:border-emerald-100 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300"
                    >
                        <div className="flex justify-between items-start gap-4">
                            <div className="flex-1 min-w-0">
                                <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                                    {idea.title}
                                </h4>
                                <p className="text-sm text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                                    {idea.summary}
                                </p>
                            </div>
                            <Link
                                to="/ideas/$ideasId"
                                params={{ ideasId: idea._id }}
                                className="shrink-0 p-2 rounded-full bg-white border border-slate-100 text-slate-400 group-hover:text-emerald-600 group-hover:border-emerald-100 transition-all"
                            >
                                <DoorOpenIcon className="w-4 h-4" />
                            </Link>
                        </div>

                        {idea.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {idea.tags.slice(0, 3).map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-emerald-600 transition-colors"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LatestIdeas
