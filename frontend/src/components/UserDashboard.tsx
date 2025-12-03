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
        <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {metrics.map((m) => {
                const Icon = m.icon
                const value = valuesMap[m.key] || 0
                return (
                    <div
                        key={m.label}
                        className={`${m.color} p-6 rounded-xl flex items-start gap-4`}
                    >
                        <div className="p-3 bg-white rounded-full">
                            <Icon className={`${m.textColor} w-6 h-6`} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">{m.label}</p>
                            <CountUp
                                start={0}
                                end={value}
                                duration={2}
                                separator=","
                                className={`text-2xl font-bold ${m.textColor}`}
                            />
                        </div>
                    </div>
                )
            })}

            {/* Top Tags */}
            <div className="p-6 bg-white rounded-xl col-span-1 sm:col-span-2 lg:col-span-1">
                <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                    <Tag className="w-5 h-5" /> Top Tags
                </p>
                {topTags.length === 0 ? (
                    <p className="text-gray-400 text-sm">No tags yet.</p>
                ) : (
                    <ul className="flex flex-wrap gap-2">
                        {topTags.map((t: any) => (
                            <span
                                key={t._id}
                                className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                            >
                                {t._id}
                                <span className="font-medium ml-1">
                                    ({t.count})
                                </span>
                            </span>
                        ))}
                    </ul>
                )}
            </div>

            {/* Recent Ideas */}
            <div className="p-6 bg-white rounded-xl col-span-1 sm:col-span-2 lg:col-span-1">
                <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                    <Calendar className="w-5 h-5" /> Recent Ideas
                </p>
                {recentIdeas.length === 0 ? (
                    <p className="text-gray-400 text-sm">No recent ideas.</p>
                ) : (
                    <ul className="divide-y divide-gray-100">
                        {recentIdeas.map((idea: any) => (
                            <Link
                                to="/ideas/$ideasId"
                                params={{ ideasId: idea._id }}
                                key={idea._id}
                                className="py-2 flex justify-between"
                            >
                                <span className="font-medium text-gray-800">
                                    {idea.title}
                                </span>
                                <span className="text-gray-400 text-sm">
                                    {new Date(
                                        idea.createdAt,
                                    ).toLocaleDateString()}
                                </span>
                            </Link>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    )
}

export default UserDashboard
