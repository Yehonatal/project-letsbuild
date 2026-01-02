import type { IdeaType } from '@/types/types'
import { Link } from '@tanstack/react-router'
import { BadgeCheckIcon } from 'lucide-react'

const IdeaCard = ({ idea }: { idea: IdeaType }) => {
    return (
        <div
            data-aos="fade-up"
            key={idea.id}
            className="group relative flex flex-col h-full rounded-[2rem] border border-slate-100 bg-white p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-emerald-500/20"
        >
            <Link
                to="/ideas/$ideasId"
                params={{ ideasId: idea._id }}
                className="flex-1 flex flex-col"
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                                {idea.title}
                            </h2>
                            {idea.verified && (
                                <BadgeCheckIcon className="w-5 h-5 text-emerald-500" />
                            )}
                        </div>
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                            {new Date(idea.createdAt).toLocaleDateString(
                                undefined,
                                {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                },
                            )}
                        </p>
                    </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {idea.summary}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {idea.tags.slice(0, 3).map((tag, id) => (
                        <span
                            key={id}
                            className="px-3 py-1 rounded-lg bg-slate-50 text-slate-600 text-[11px] font-bold uppercase tracking-tight border border-slate-100 group-hover:bg-emerald-50 group-hover:text-emerald-700 group-hover:border-emerald-100 transition-colors"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-8">
                    <div className="p-3 rounded-xl bg-slate-50/50 border border-slate-100/50">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                            Difficulty
                        </p>
                        <p className="text-xs font-semibold text-slate-700">
                            {idea.difficulty}
                        </p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50/50 border border-slate-100/50">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                            Time
                        </p>
                        <p className="text-xs font-semibold text-slate-700">
                            {idea.estimatedTime}
                        </p>
                    </div>
                </div>
            </Link>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={`${idea.author ? idea.author.avatarUrl : '/logo192.png'}`}
                            alt={idea.author ? idea.author.name : idea.title}
                            className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">
                        {idea.author ? idea.author.name : 'Anonymous'}
                    </span>
                </div>

                <div className="flex items-center gap-3 text-slate-400">
                    <div className="flex items-center gap-1">
                        <span className="text-xs font-bold">
                            👍 {idea.upvotes}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default IdeaCard
