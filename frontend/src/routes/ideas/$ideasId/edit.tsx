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
        if (name === 'tags') {
            const arr = String(value)
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean)
            setFormData((prev) => ({ ...prev, tags: arr }))
            return
        }
        if (name === 'techStack') {
            const arr = String(value)
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean)
            setFormData((prev) => ({ ...prev, techStack: arr }))
            return
        }
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
        <div className="min-h-screen bg-[#fcfcfd] py-16">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <Link
                        to="/ideas/$ideasId"
                        params={{ ideasId }}
                        className="inline-flex items-center gap-3 rounded-2xl bg-white border border-slate-100 px-4 py-2 text-slate-700 hover:shadow transition"
                    >
                        <LucideArrowLeft className="w-5 h-5" />
                        Back to Details
                    </Link>
                    <div className="text-sm text-slate-500">Editing idea</div>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl p-8">
                    <div className="mb-6">
                        <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-2">
                            Edit Idea: {idea.title}
                            {idea.verified && (
                                <BadgeCheckIcon className="inline-block ml-3 text-emerald-500 w-5 h-5" />
                            )}
                        </h1>
                        <p className="text-slate-500 text-sm">
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
                            <FormSelect
                                label="Difficulty"
                                name="difficulty"
                                value={formData.difficulty}
                                onChange={handleChange}
                                options={[
                                    { label: 'Easy', value: 'easy' },
                                    { label: 'Medium', value: 'medium' },
                                    { label: 'Hard', value: 'hard' },
                                ]}
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
                            value={
                                Array.isArray(formData.tags)
                                    ? formData.tags.join(', ')
                                    : formData.tags
                            }
                            onChange={handleChange}
                        />

                        <FormInput
                            label="Tech Stack (comma separated)"
                            name="techStack"
                            value={
                                Array.isArray(formData.techStack)
                                    ? formData.techStack.join(', ')
                                    : formData.techStack
                            }
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

                        <div className="pt-6 mt-6 border-t border-slate-50 flex items-center justify-between">
                            <Link
                                to="/ideas/$ideasId"
                                params={{ ideasId }}
                                className="px-6 py-3 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                className="px-8 py-3 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 shadow-lg"
                            >
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

function FormInput({ label, name, value, onChange }: any) {
    const labelClass = 'text-sm font-bold text-slate-700 ml-1 mb-2 block'
    const inputClass =
        'w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none text-slate-900 placeholder:text-slate-400'

    return (
        <div className="w-full">
            <label className={labelClass}>{label}</label>
            <input
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                className={inputClass}
            />
        </div>
    )
}

function FormSelect({ label, name, value, onChange, options }: any) {
    const labelClass = 'text-sm font-bold text-slate-700 ml-1 mb-2 block'
    const inputClass =
        'w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none text-slate-900 placeholder:text-slate-400'

    return (
        <div className="w-full">
            <label className={labelClass}>{label}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className={inputClass}
            >
                {options.map((opt: any) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

function FormTextarea({ label, name, value, onChange, rows }: any) {
    const labelClass = 'text-sm font-bold text-slate-700 ml-1 mb-2 block'
    const inputClass =
        'w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none text-slate-900 placeholder:text-slate-400'

    return (
        <div className="w-full">
            <label className={labelClass}>{label}</label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                rows={rows}
                className={inputClass}
            />
        </div>
    )
}
