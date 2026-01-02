import { createFileRoute, HeadContent, Link } from '@tanstack/react-router'
import type { IdeaType } from '../../types/types'
import { toast } from 'sonner'
import { Loader2, Server } from 'lucide-react'
import { fetchIdeas } from '@/services/shared'
import { useEffect } from 'react'
import IdeaCard from '@/components/IdeaCard'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { useAuth } from '@/context/AuthContext'
import UsersIdeas from '@/components/UsersIdeas'

const ideasQueryOptions = () =>
    queryOptions<IdeaType[]>({
        queryKey: ['ideas'],
        queryFn: () => fetchIdeas(),
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
    const { user } = useAuth()
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
            <div className="mt-10 flex items-center justify-center h-screen flex-col">
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
        <div className="min-h-screen bg-[#fcfcfd] py-12 lg:py-20">
            <HeadContent />
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="space-y-4">
                        <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">
                            Project{' '}
                            <span className="text-emerald-600">Ideas</span>
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                            Browse through the latest project ideas shared by
                            our community. Find your next build or collaborate
                            with others.
                        </p>
                    </div>
                    {user && (
                        <Link
                            to="/ideas/new"
                            className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-8 py-4 text-white font-bold transition hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-200 hover:-translate-y-0.5"
                        >
                            Share an idea
                        </Link>
                    )}
                </div>

                {user && (
                    <div className="mb-20">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-8 w-1 bg-emerald-500 rounded-full" />
                            <h2 className="text-2xl font-bold text-slate-900">
                                Your contributions
                            </h2>
                        </div>
                        <UsersIdeas />
                    </div>
                )}

                <div className="space-y-10">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-1 bg-slate-200 rounded-full" />
                        <h2 className="text-2xl font-bold text-slate-900">
                            All Project Ideas
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data?.map((idea: IdeaType) => (
                            <IdeaCard idea={idea} key={idea._id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
