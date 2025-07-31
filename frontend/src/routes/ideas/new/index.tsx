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
            'id' | 'createdAt' | 'upvotes' | 'views'
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
                avatarUrl: '/public/logo192.png', // upload logic to fill
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
        'w-full border border-gray-400 rounded px-3 py-2 bg-transparent focus:outline-none focus:border-gray-600'
    const dashedClass = inputClass + ' border-dashed'

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold ">Submit a New Idea</h1>
                    <p className="text-gray-600 mb-6">
                        Share your innovative ideas with the community!
                    </p>
                </div>
                <div>
                    <Link to="/ideas" className="text-blue-600 hover:underline">
                        <LucideArrowLeft
                            size={25}
                            color="blue"
                            className="inline-block"
                        />
                    </Link>
                </div>
            </div>

            <div className="max-w-2xl mx-auto p-6">
                <div className="flex items-center mb-8">
                    <StepsProgress
                        steps={steps}
                        currentStep={step}
                        onStepChange={(newStep: number) => setStep(newStep)}
                    />
                </div>

                {/* Step Form */}
                <div className="space-y-6">
                    {step === 0 && (
                        <>
                            <div>
                                <label className="block font-medium mb-1">
                                    Title
                                </label>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">
                                    Summary
                                </label>
                                <textarea
                                    rows={2}
                                    value={summary}
                                    onChange={(e) => setSummary(e.target.value)}
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">
                                    Description
                                </label>
                                <textarea
                                    rows={4}
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    className={inputClass}
                                />
                            </div>
                        </>
                    )}

                    {step === 1 && (
                        <>
                            <div>
                                <label className="block font-medium mb-1">
                                    Tags
                                </label>
                                <input
                                    placeholder="e.g. auth, ui"
                                    value={tagsInput}
                                    onChange={(e) =>
                                        setTagsInput(e.target.value)
                                    }
                                    className={dashedClass}
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">
                                    Difficulty
                                </label>
                                <select
                                    value={difficulty}
                                    onChange={(e) =>
                                        setDifficulty(e.target.value as any)
                                    }
                                    className={inputClass}
                                >
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium mb-1">
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
                            <div>
                                <label className="block font-medium mb-1">
                                    Tech Stack
                                </label>
                                <input
                                    placeholder="e.g. React, Node.js"
                                    value={techStackInput}
                                    onChange={(e) =>
                                        setTechStackInput(e.target.value)
                                    }
                                    className={dashedClass}
                                />
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div>
                                <label className="block font-medium mb-1">
                                    Your Name
                                </label>
                                <input
                                    value={authorName}
                                    onChange={(e) =>
                                        setAuthorName(e.target.value)
                                    }
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">
                                    Avatar
                                </label>
                                <div
                                    className="relative w-full h-32 border border-dashed border-gray-400 rounded flex items-center justify-center"
                                    onDrop={onDrop}
                                    onDragOver={(e) => e.preventDefault()}
                                >
                                    {avatarFile
                                        ? avatarFile.name
                                        : 'Drag & drop or click to select (optional)'}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={onFileSelect}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 ">
                                <div className="flex-1">
                                    <label className="block font-medium mb-1">
                                        GitHub URL
                                    </label>
                                    <input
                                        placeholder="optional"
                                        value={authorGithub}
                                        onChange={(e) =>
                                            setAuthorGithub(e.target.value)
                                        }
                                        className={inputClass}
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block font-medium mb-1">
                                        Inspiration Link
                                    </label>
                                    <input
                                        placeholder="optional"
                                        value={inspirationLink}
                                        onChange={(e) =>
                                            setInspirationLink(e.target.value)
                                        }
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-8">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="px-8 cursor-pointer py-1 border border-dashed border-gray-600 rounded"
                    >
                        {step === 0 ? 'Cancel' : 'Back'}
                    </button>
                    <button
                        type="button"
                        onClick={handleNext}
                        className="px-8 py-1 cursor-pointer bg-black text-white rounded hover:bg-gray-800 transition"
                    >
                        {step === steps.length - 1 ? 'Submit' : 'Next'}
                    </button>
                </div>
            </div>
        </div>
    )
}
