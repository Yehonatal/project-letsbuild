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
            <div className="flex items-center justify-center h-screen">
                <Loader2 size={35} className="animate-spin text-gray-500" />
            </div>
        )
    }

    return (
        <div className="space-y-4 relative">
            <div className="">
                <h3 className="text-lg font-extralight text-gray-900">
                    LATEST IDEAS IN OUR COLLECTION
                </h3>
            </div>
            {ideas.map((idea, idx) => (
                <div
                    key={idea._id}
                    data-aos="fade-left"
                    data-aos-delay={150 * Number(idx)}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between
                 bg-white border-dashed border-1 border-gray-300 shadow-md rounded-lg p-4
                 hover:shadow-lg transition"
                >
                    <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">
                            {idea.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {idea.summary}
                        </p>
                        {idea.tags.length > 0 && (
                            <ul className="flex flex-wrap gap-2 mt-2">
                                {idea.tags.map((tag) => (
                                    <li
                                        key={tag}
                                        className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full"
                                    >
                                        #{tag}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div>
                        <Link
                            to="/ideas/$ideasId"
                            params={{ ideasId: idea._id }}
                            className="mt-3 sm:mt-0 sm:ml-6 text-sm font-medium text-blue-600 hover:underline"
                        >
                            <DoorOpenIcon className="inline-block w-4 h-4 mr-1" />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default LatestIdeas
