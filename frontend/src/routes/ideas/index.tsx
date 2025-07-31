import { createFileRoute, HeadContent, Link } from '@tanstack/react-router'
import type { IdeaType } from '../../types/types'
import { toast } from 'sonner'
import { Loader2, Server } from 'lucide-react'
import { fetchIdeas } from '@/services/shared'
import { useEffect } from 'react'
import IdeaCard from '@/components/IdeaCard'
import { queryOptions, useQuery } from '@tanstack/react-query'

const ideasQueryOptions = () =>
    queryOptions<IdeaType[]>({
        queryKey: ['ideas'],
        queryFn: fetchIdeas,
        staleTime: 1000 * 60 * 2, // 2 minutes
        refetchOnWindowFocus: true,
    })

export const Route = createFileRoute('/ideas/')({
    head: () => ({
        meta: [
            {
                name: 'description',
                content:
                    'Explore and share project ideas in the Project Idea Drop.',
            },
            {
                title: 'Project Idea Drop - Browse Ideas',
            },
        ],
    }),
    component: IdeasPage,
    loader: async ({ context: { queryClient } }) => {
        return queryClient.ensureQueryData(ideasQueryOptions())
    },
})

function IdeasPage() {
    const { data, isLoading, error } = useQuery({
        ...ideasQueryOptions(),
        initialData: Route.useLoaderData(),
    })

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <HeadContent />

                <Loader2 size={35} className="animate-spin text-gray-500" />
            </div>
        )
    }

    if (error) {
        toast.error('Failed to load ideas')
        return (
            <div className="mt-10 flex items-center justify-center h-screen flex-col">
                <HeadContent />
                <Server
                    size={35}
                    className="text-red-600 mb-4 inline-block animate-bounce "
                />
                <p className="text-gray-500 mb-6">
                    There was an error loading the project ideas. Please try
                    again later.
                </p>
            </div>
        )
    }

    if (!data || data.length === 0) {
        return (
            <div className="mt-10">
                <HeadContent />
                <h1 className="text-2xl font-bold">No Ideas Found</h1>
                <p className="text-gray-600 mb-6">
                    There are currently no project ideas available. Check back
                    later!
                </p>
            </div>
        )
    }

    useEffect(() => {
        if (data.length > 0) {
            toast.success(`${data.length} Ideas loaded successfully`)
        }
    }, [data])

    return (
        <div className="my-10 max-w-6xl mx-auto px-4">
            <HeadContent />
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Project Ideas</h1>
                    <p className="text-gray-600 mb-6">
                        Browse through the latest project ideas shared by our
                        community.
                    </p>
                </div>
                <div>
                    <Link to="/ideas/new">
                        <button className="px-4 py-2 cursor-pointer hover:underline hover:text-blue-600 transition">
                            Submit a New Idea
                        </button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {data?.map((idea: IdeaType) => (
                    <IdeaCard idea={idea} key={idea.id} />
                ))}
            </div>
        </div>
    )
}
