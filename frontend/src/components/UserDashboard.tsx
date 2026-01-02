import { useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import { fetchMySummary } from '@/services/shared'
import { Star, Eye, ClipboardList, Tag, Calendar } from 'lucide-react'
import CountUp from 'react-countup'
import { Link } from '@tanstack/react-router'

const metrics = [
    {
        label: 'Projects',
        icon: ClipboardList,
        key: 'totalIdeas',
        color: 'bg-purple-50',
        textColor: 'text-purple-600',
    },
    {
        label: 'Upvotes',
        icon: Star,
        key: 'totalUpvotes',
        color: 'bg-yellow-50',
        textColor: 'text-yellow-600',
    },
    {
        label: 'Views',
        icon: Eye,
        key: 'totalViews',
        color: 'bg-blue-50',
        textColor: 'text-blue-600',
    },
    {
        label: 'Avg Upvotes',
        icon: Star,
        key: 'avgUpvotes',
        color: 'bg-green-50',
        textColor: 'text-green-600',
    },
]

const UserDashboard = () => {
    const {
        data: summary,
        isLoading,
        isError,
    } = useSuspenseQuery(
        queryOptions({ queryKey: ['mySummary'], queryFn: fetchMySummary }),
    )

    if (isLoading) {
        return <p className="text-gray-500">Loading dashboard...</p>
    }

    if (isError || !summary) {
        return <p className="text-red-500">Failed to load dashboard data.</p>
    }

    const countsData =
        Array.isArray(summary.counts) && summary.counts.length > 0
            ? summary.counts[0]
            : { totalIdeas: 0, totalUpvotes: 0, totalViews: 0, avgUpvotes: 0 }

    const { totalIdeas, totalUpvotes, totalViews, avgUpvotes } = countsData
    const topTags = Array.isArray(summary.topTags) ? summary.topTags : []
    const recentIdeas = Array.isArray(summary.recentIdeas)
        ? summary.recentIdeas
        : []

    const valuesMap: Record<string, number> = {
        totalIdeas,
        totalUpvotes,
        totalViews,
        avgUpvotes: Number(avgUpvotes.toFixed(1)),
    }

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((m) => {
                    const Icon = m.icon
                    const value = valuesMap[m.key] || 0
                    return (
                        <div
                            key={m.label}
                            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className={`p-3 ${m.color} rounded-2xl group-hover:scale-110 transition-transform`}
                                >
                                    <Icon
                                        className={`${m.textColor} w-6 h-6`}
                                    />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                        {m.label}
                                    </p>
                                    <CountUp
                                        start={0}
                                        end={value}
                                        duration={2}
                                        separator=","
                                        className="text-2xl font-bold text-slate-900"
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-slate-900">
                            Recent Activity
                        </h3>
                        <Link
                            to="/ideas"
                            className="text-sm font-bold text-emerald-600 hover:text-emerald-700"
                        >
                            View all
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {recentIdeas.length > 0 ? (
                            recentIdeas.map((idea: any) => (
                                <Link
                                    key={idea._id}
                                    to="/ideas/$ideasId"
                                    params={{ ideasId: idea._id }}
                                    className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/5 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                        <ClipboardList className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-slate-900 truncate">
                                            {idea.title}
                                        </h4>
                                        <p className="text-sm text-slate-500 flex items-center gap-2">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(
                                                idea.createdAt,
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 text-emerald-600 font-bold">
                                            <Star className="w-4 h-4 fill-emerald-600" />
                                            {idea.upvotes}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="p-12 text-center bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
                                <p className="text-slate-400">
                                    No recent ideas found.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-900">
                        Top Expertise
                    </h3>
                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                        <div className="flex flex-wrap gap-2">
                            {topTags.length > 0 ? (
                                topTags.map((tag: any) => (
                                    <div
                                        key={tag._id}
                                        className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 text-sm font-medium flex items-center gap-2 hover:bg-emerald-50 hover:border-emerald-100 hover:text-emerald-700 transition-all cursor-default"
                                    >
                                        <Tag className="w-3 h-3" />
                                        {tag._id}
                                        <span className="text-xs opacity-50">
                                            ({tag.count})
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-slate-400 text-sm">
                                    No tags yet.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard
