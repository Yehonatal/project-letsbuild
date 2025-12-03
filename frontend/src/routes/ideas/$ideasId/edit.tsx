import { createFileRoute, Link } from '@tanstack/react-router'
import {
    useSuspenseQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'
import { fetchIdeaById, updateIdea } from '@/services/shared'
import { queryOptions } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import { LucideArrowLeft, BadgeCheckIcon } from 'lucide-react'
import type { IdeaType } from '@/types/types'

const ideasQueryOptions = (ideaId: string) =>
    queryOptions({
        queryKey: ['ideas', ideaId],
        queryFn: () => fetchIdeaById(ideaId),
    })

export const Route = createFileRoute('/ideas/$ideasId/edit')({
    component: IdeaEditPage,
    loader: async ({ params, context: { queryClient } }) => {
        return queryClient.ensureQueryData(ideasQueryOptions(params.ideasId))
    },
})

function IdeaEditPage() {
    const { ideasId } = Route.useParams()
    const queryClient = useQueryClient()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { data: idea } = useSuspenseQuery(ideasQueryOptions(ideasId))

    const [formData, setFormData] = useState<IdeaType>({
        ...idea,
    })

    const { mutateAsync: update } = useMutation({
        mutationFn: (updated: IdeaType) => updateIdea(idea._id, updated),
        onSuccess: () => {
            toast.success('Idea updated successfully!')
            queryClient.invalidateQueries({ queryKey: ['ideas', ideasId] })
        },
        onError: () => toast.error('Failed to update idea.'),
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            await update({
                ...formData,
                tags: formData.tags.map((t) => t.trim()),
                techStack: formData.techStack.map((t) => t.trim()),
            })
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="px-4 py-14 max-w-6xl mx-auto">
            <div className="flex justify-end">
                <Link
                    to="/ideas/$ideasId"
                    params={{ ideasId }}
                    className="text-blue-600 hover:underline mb-4 inline-flex items-center"
                >
                    <LucideArrowLeft size={25} className="inline-block mr-1" />
                    Back to Details
                </Link>
            </div>

            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Edit Idea: {idea.title}
                    {idea.verified && (
                        <BadgeCheckIcon
                            className="inline-block ml-2"
                            color="green"
                        />
                    )}
                </h1>
                <p className="text-gray-600 text-sm">
                    Update the fields and save your changes.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <FormInput
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <FormTextarea
                    label="Summary"
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    rows={2}
                />

                <div className="flex gap-4">
                    <FormInput
                        label="Difficulty"
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                    />
                    <FormInput
                        label="Estimated Time"
                        name="estimatedTime"
                        value={formData.estimatedTime}
                        onChange={handleChange}
                    />
                </div>

                <FormInput
                    label="Tags (comma separated)"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                />

                <FormInput
                    label="Tech Stack (comma separated)"
                    name="techStack"
                    value={formData.techStack}
                    onChange={handleChange}
                />

                <FormTextarea
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                />

                <FormInput
                    label="Inspiration Link"
                    name="inspirationLink"
                    value={formData.inspirationLink}
                    onChange={handleChange}
                />

                <div className="pt-4">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow"
                    >
                        {isSubmitting ? 'saving ... ' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    )
}

function FormInput({ label, name, value, onChange }: any) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                className="mt-1 block px-4 py-2 w-full border border-gray-300 rounded-md bg-gray-50"
            />
        </div>
    )
}

function FormTextarea({ label, name, value, onChange, rows }: any) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                rows={rows}
                className="mt-1 block px-4 py-2 w-full border border-gray-300 rounded-md bg-gray-50"
            />
        </div>
    )
}
