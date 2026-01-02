import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import type { IdeaType } from '@/types/types'
import StepsProgress from '@/components/ui/StepsProgress'
import type { ChangeEvent, DragEvent } from 'react'
import { Link } from '@tanstack/react-router'
import { LucideArrowLeft } from 'lucide-react'
import { createIdea } from '@/services/shared'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const Route = createFileRoute('/ideas/new/')({
    component: NewIdeaPage,
})

export default function NewIdeaPage() {
    const navigate = useNavigate()
    const [step, setStep] = useState(0)

    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [description, setDescription] = useState('')
    const [tagsInput, setTagsInput] = useState('')
    const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>(
        'easy',
    )
    const [estimatedTime, setEstimatedTime] = useState('')
    const [techStackInput, setTechStackInput] = useState('')
    const [authorName, setAuthorName] = useState('')
    const [avatarFile, setAvatarFile] = useState<string | null>(null)
    const [authorGithub, setAuthorGithub] = useState('')
    const [inspirationLink, setInspirationLink] = useState('')

    // Mutation to create a new idea
    const { mutateAsync } = useMutation({
        mutationFn: createIdea,
        onSuccess: () => {
            toast.success('Idea created successfully!')
            navigate({ to: '/ideas' })
        },
    })

    const steps = ['Basic Info', 'Details', 'Author']

    function handleNext() {
        if (step < steps.length - 1) setStep(step + 1)
        else handleSubmit()
    }

    function handleBack() {
        if (step > 0) setStep(step - 1)
        else navigate({ to: '/ideas' })
    }

    async function handleSubmit() {
        const newIdea: Omit<
            IdeaType,
            '_id' | 'id' | 'createdAt' | 'upvotes' | 'views'
        > = {
            title: title.trim(),
            verified: false, // Default to false, can be updated later
            summary: summary.trim(),
            description: description.trim(),
            tags: tagsInput
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean),
            difficulty,
            estimatedTime: estimatedTime.trim(),
            techStack: techStackInput
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean),
            author: {
                name: authorName.trim(),
                avatarUrl: '/logo192.png', // upload logic to fill
                githubUrl: authorGithub.trim() || undefined,
            },
            inspirationLink: inspirationLink.trim() || undefined,
        }
        if (!validateForm()) {
            setStep(0) // Reset to first step if validation fails
            return
        }
        try {
            await mutateAsync(newIdea)
        } catch (error) {
            toast.error('Failed to create idea. Please try again.')
            console.error('Error creating idea:', error)
        }

        resetForm()
        toast.success('Idea created successfully!')

        setTimeout(() => {
            navigate({ to: '/ideas' })
        }, 2000)
    }

    function resetForm() {
        setStep(0)
        setTitle('')
        setSummary('')
        setDescription('')
        setTagsInput('')
        setDifficulty('easy')
        setEstimatedTime('')
        setTechStackInput('')
        setAuthorName('')
        setAvatarFile(null)
        setAuthorGithub('')
    }

    function validateForm() {
        if (!title.trim() || !summary.trim() || !authorName.trim()) {
            toast.error('Please fill in all required fields.')
            return false
        }
        if (tagsInput && tagsInput.split(',').some((t) => t.trim() === '')) {
            toast.error('Tags cannot be empty.')
            return false
        }
        if (
            techStackInput &&
            techStackInput.split(',').some((t) => t.trim() === '')
        ) {
            toast.error('Tech Stack cannot be empty.')
            return false
        }
        return true
    }

    function onFileSelect(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null
        setAvatarFile(file)
    }

    function onDrop(e: DragEvent<HTMLDivElement>) {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        setAvatarFile(file)
    }

    const inputClass =
        'w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none text-slate-900 placeholder:text-slate-400'
    const labelClass = 'text-sm font-bold text-slate-700 ml-1 mb-2 block'

    return (
        <div className="min-h-screen bg-[#fcfcfd] py-6 lg:py-20">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex items-center justify-between mb-12">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
                            Share your{' '}
                            <span className="text-emerald-600">spark</span>
                        </h1>
                        <p className="text-slate-500">
                            Fill in the details to share your idea with the
                            community.
                        </p>
                    </div>
                    <Link
                        to="/ideas"
                        className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-slate-900 hover:border-slate-200 transition-all shadow-sm"
                    >
                        <LucideArrowLeft className="w-6 h-6" />
                    </Link>
                </div>

                <div className="bg-white p-8 lg:p-6 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
                    <div className="mb-6">
                        <StepsProgress
                            steps={steps}
                            currentStep={step}
                            onStepChange={(newStep: number) => setStep(newStep)}
                        />
                    </div>

                    <div className="space-y-8">
                        {step === 0 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="space-y-2">
                                    <label className={labelClass}>Title</label>
                                    <input
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        className={inputClass}
                                        placeholder="A catchy name for your idea"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className={labelClass}>
                                        Summary
                                    </label>
                                    <textarea
                                        rows={2}
                                        value={summary}
                                        onChange={(e) =>
                                            setSummary(e.target.value)
                                        }
                                        className={inputClass}
                                        placeholder="Briefly describe the core concept"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className={labelClass}>
                                        Full Description
                                    </label>
                                    <textarea
                                        rows={6}
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        className={inputClass}
                                        placeholder="Go into detail about the problem and solution"
                                    />
                                </div>
                            </div>
                        )}

                        {step === 1 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="space-y-2">
                                    <label className={labelClass}>Tags</label>
                                    <input
                                        placeholder="e.g. auth, ui, database (comma separated)"
                                        value={tagsInput}
                                        onChange={(e) =>
                                            setTagsInput(e.target.value)
                                        }
                                        className={inputClass}
                                    />
                                </div>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className={labelClass}>
                                            Difficulty
                                        </label>
                                        <select
                                            value={difficulty}
                                            onChange={(e) =>
                                                setDifficulty(
                                                    e.target.value as any,
                                                )
                                            }
                                            className={inputClass}
                                        >
                                            <option value="easy">Easy</option>
                                            <option value="medium">
                                                Medium
                                            </option>
                                            <option value="hard">Hard</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className={labelClass}>
                                            Estimated Time
                                        </label>
                                        <input
                                            placeholder="e.g. 2 weeks"
                                            value={estimatedTime}
                                            onChange={(e) =>
                                                setEstimatedTime(e.target.value)
                                            }
                                            className={inputClass}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className={labelClass}>
                                        Tech Stack
                                    </label>
                                    <input
                                        placeholder="e.g. React, Node.js, Tailwind (comma separated)"
                                        value={techStackInput}
                                        onChange={(e) =>
                                            setTechStackInput(e.target.value)
                                        }
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="space-y-2">
                                    <label className={labelClass}>
                                        Your Name
                                    </label>
                                    <input
                                        value={authorName}
                                        onChange={(e) =>
                                            setAuthorName(e.target.value)
                                        }
                                        className={inputClass}
                                        placeholder="How should we credit you?"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className={labelClass}>Avatar</label>
                                    <div
                                        className="relative w-full h-40 border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 hover:border-emerald-200 transition-all cursor-pointer group"
                                        onDrop={onDrop}
                                        onDragOver={(e) => e.preventDefault()}
                                    >
                                        <div className="text-slate-400 group-hover:text-emerald-600 transition-colors text-center p-4">
                                            {avatarFile ? (
                                                <span className="font-bold text-emerald-600">
                                                    {avatarFile.name}
                                                </span>
                                            ) : (
                                                <>
                                                    <p className="font-bold">
                                                        Click or drag to upload
                                                    </p>
                                                    <p className="text-xs mt-1">
                                                        PNG, JPG up to 5MB
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            onChange={onFileSelect}
                                        />
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className={labelClass}>
                                            GitHub URL
                                        </label>
                                        <input
                                            placeholder="https://github.com/..."
                                            value={authorGithub}
                                            onChange={(e) =>
                                                setAuthorGithub(e.target.value)
                                            }
                                            className={inputClass}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className={labelClass}>
                                            Inspiration Link
                                        </label>
                                        <input
                                            placeholder="Link to related project"
                                            value={inspirationLink}
                                            onChange={(e) =>
                                                setInspirationLink(
                                                    e.target.value,
                                                )
                                            }
                                            className={inputClass}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-50">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="px-8 py-4 rounded-2xl text-slate-500 font-bold hover:bg-slate-50 transition-all"
                        >
                            {step === 0 ? 'Cancel' : 'Back'}
                        </button>
                        <button
                            type="button"
                            onClick={handleNext}
                            className="px-10 py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-200 transition-all"
                        >
                            {step === steps.length - 1
                                ? 'Submit Idea'
                                : 'Continue'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
