import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { fetchIdeaById } from '@/services/shared'
import { toast } from 'sonner'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { deleteIdea } from '@/services/shared'
import { useAuth } from '@/context/AuthContext'

import {
    AngryIcon,
    BadgeCheckIcon,
    LucideArrowLeft,
    DeleteIcon,
    FileEdit,
    MoreVerticalIcon,
} from 'lucide-react'

const ideasQueryOptions = (ideaId: string) =>
    queryOptions({
        queryKey: ['ideas', ideaId],
        queryFn: () => fetchIdeaById(ideaId),
        staleTime: 1000 * 60 * 2, // 2 minutes
        refetchOnWindowFocus: true,
    })

export const Route = createFileRoute('/ideas/$ideasId/')({
    component: IdeasDetailsPage,
    loader: async ({ params, context: { queryClient } }) => {
        return queryClient.ensureQueryData(ideasQueryOptions(params.ideasId))
    },
})

function IdeasDetailsPage() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const { data: idea } = useSuspenseQuery(
        ideasQueryOptions(Route.useParams().ideasId),
    )

    const [isOptionsOpen, setOptionsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    console.log('Idea details:', idea)
    console.log('User:', user)

    useEffect(() => {
        function onClickOutside(e: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node)
            ) {
                setOptionsOpen(false)
            }
        }
        if (isOptionsOpen) {
            document.addEventListener('mousedown', onClickOutside)
            return () =>
                document.removeEventListener('mousedown', onClickOutside)
        }
    }, [isOptionsOpen])

    // Handle Delete Mutations
    const { mutateAsync } = useMutation({
        mutationFn: (id: string) => deleteIdea(id),
        onSuccess: () => {
            navigate({ to: '/ideas' })
            toast.success('Idea deleted successfully!')
        },
        onError: () => {
            toast.error('Failed to delete idea')
        },
    })

    const handleDelete = async () => {
        setOptionsOpen(false)
        // fire delete mutation, then redirect or toast
        try {
            await mutateAsync(idea._id)
        } catch (error) {
            toast.error('Failed to delete idea')
        }
    }

    if (!idea) {
        return (
            <div className="mt-10 flex flex-col items-center justify-center h-screen text-center">
                <AngryIcon
                    size={48}
                    color={'red'}
                    className="inline-block mb-4 animate-shake"
                />
                <h1 className="text-2xl font-bold text-gray-800 mt-4">
                    Idea Not Found
                </h1>
                <p className="text-gray-600 mt-2">
                    Sorry, we couldn't find the idea you're looking for.
                </p>
            </div>
        )
    }

    useEffect(() => {
        if (idea) toast.success(`Loaded idea: ${idea.title}`)
    }, [idea])

    return (
        <div className="min-h-screen bg-[#fcfcfd] py-12 lg:py-20">
            <div className="max-w-7xl mx-auto px-4">
                <Link
                    to="/ideas"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-12 group"
                >
                    <LucideArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to ideas</span>
                </Link>

                <div className="grid lg:grid-cols-[1fr_320px] gap-16 items-start">
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <div className="flex justify-between items-start gap-4">
                                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                                    {idea.title}
                                </h1>
                                <div className="relative shrink-0">
                                    <button
                                        onClick={() =>
                                            setOptionsOpen((o) => !o)
                                        }
                                        className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                                    >
                                        <MoreVerticalIcon className="w-6 h-6 text-slate-400" />
                                    </button>

                                    {isOptionsOpen && user && (
                                        <div
                                            ref={menuRef}
                                            className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl shadow-slate-200/50 z-20 overflow-hidden"
                                        >
                                            <Link
                                                to="/ideas/$ideasId/edit"
                                                params={{ ideasId: idea._id }}
                                                className={`w-full px-4 py-3 text-left flex items-center gap-3 text-sm font-medium transition-colors ${
                                                    user.id !== idea.user
                                                        ? 'bg-slate-50 text-slate-300 cursor-not-allowed'
                                                        : 'hover:bg-slate-50 text-slate-700'
                                                }`}
                                            >
                                                <FileEdit className="w-4 h-4" />{' '}
                                                Edit idea
                                            </Link>
                                            <button
                                                onClick={handleDelete}
                                                disabled={
                                                    user.id !== idea?.user
                                                }
                                                className={`w-full px-4 py-3 text-left flex items-center gap-3 text-sm font-medium transition-colors ${
                                                    user.id !== idea?.user
                                                        ? 'bg-slate-50 text-slate-300 cursor-not-allowed'
                                                        : 'hover:bg-red-50 text-red-600'
                                                }`}
                                            >
                                                <DeleteIcon className="w-4 h-4" />{' '}
                                                Delete idea
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <p className="text-xl text-slate-600 leading-relaxed">
                                {idea.summary}
                            </p>

                            <div className="flex flex-wrap gap-3">
                                {idea.tags?.map(
                                    (tag: string, index: number) => (
                                        <span
                                            key={index}
                                            className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold border border-emerald-100"
                                        >
                                            #{tag}
                                        </span>
                                    ),
                                )}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900">
                                The Concept
                            </h2>
                            <div className="prose prose-slate max-w-none">
                                <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                                    {idea.description}
                                </p>
                            </div>
                        </div>

                        {idea.techStack?.length > 0 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-slate-900">
                                    Tech Stack
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {idea.techStack.map(
                                        (tech: string, index: number) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 text-sm font-medium"
                                            >
                                                {tech}
                                            </span>
                                        ),
                                    )}
                                </div>
                            </div>
                        )}

                        {idea.inspirationLink && (
                            <div className="p-8 rounded-[2rem] bg-slate-900 text-white space-y-4">
                                <h3 className="text-xl font-bold">
                                    Inspiration
                                </h3>
                                <p className="text-slate-400 text-sm">
                                    This idea was inspired by:
                                </p>
                                <a
                                    href={idea.inspirationLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                                >
                                    {idea.inspirationLink}
                                    <span className="text-xs">↗</span>
                                </a>
                            </div>
                        )}
                    </div>

                    <aside className="space-y-8 sticky top-8">
                        <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 space-y-8">
                            <div className="space-y-4">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    Created by
                                </p>
                                <div className="flex items-center gap-4">
                                    <img
                                        src={
                                            idea.author?.avatarUrl ||
                                            '/logo192.png'
                                        }
                                        alt={idea.author?.name}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-slate-50"
                                    />
                                    <div>
                                        <p className="font-bold text-slate-900">
                                            {idea.author?.name}
                                        </p>
                                        {idea.author?.githubUrl && (
                                            <a
                                                href={idea.author.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-emerald-600 font-medium hover:underline"
                                            >
                                                GitHub Profile ↗
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6 pt-6 border-t border-slate-50">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500">
                                        Difficulty
                                    </span>
                                    <span className="px-3 py-1 rounded-lg bg-slate-50 text-slate-700 text-xs font-bold uppercase border border-slate-100">
                                        {idea.difficulty}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500">
                                        Est. Time
                                    </span>
                                    <span className="text-sm font-bold text-slate-900">
                                        {idea.estimatedTime}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500">
                                        Views
                                    </span>
                                    <span className="text-sm font-bold text-slate-900">
                                        {idea.views}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500">
                                        Upvotes
                                    </span>
                                    <span className="text-sm font-bold text-slate-900">
                                        {idea.upvotes}
                                    </span>
                                </div>
                            </div>

                            <button className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
                                Upvote Idea
                            </button>
                        </div>

                        <div className="text-center">
                            <p className="text-xs text-slate-400">
                                Posted on{' '}
                                {new Date(idea.createdAt).toLocaleDateString(
                                    undefined,
                                    {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    },
                                )}
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}
