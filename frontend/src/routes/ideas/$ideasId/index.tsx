import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { fetchIdeaById } from '@/services/shared'
import { toast } from 'sonner'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { deleteIdea } from '@/services/shared'

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
  const { data: idea } = useSuspenseQuery(
    ideasQueryOptions(Route.useParams().ideasId),
  )
  const [isOptionsOpen, setOptionsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOptionsOpen(false)
      }
    }
    if (isOptionsOpen) {
      document.addEventListener('mousedown', onClickOutside)
      return () => document.removeEventListener('mousedown', onClickOutside)
    }
  }, [isOptionsOpen])

  // Handle Edit and Delete Mutations
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

  const handleEdit = () => {
    setOptionsOpen(false)
    // navigate to edit page or open inline form...
  }
  const handleDelete = async () => {
    setOptionsOpen(false)
    // fire delete mutation, then redirect or toast
    try {
      await mutateAsync(idea.id)
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
    <div data-aos="fade-zoom-in" data-aos-delay="300" className="px-4 py-8 ">
      {/* Title and Date */}
      <Link
        to="/ideas"
        className="text-blue-600 hover:underline mb-4 inline-flex items-center"
      >
        <LucideArrowLeft size={25} color="black" className="inline-block" />
      </Link>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4 ">
          <h1 className="text-3xl font-bold text-gray-900">
            {idea.title}{' '}
            {idea.verified && (
              <span>
                <BadgeCheckIcon color="green" className="inline-block" />
              </span>
            )}
          </h1>

          {/* More menu button */}
          <div className="relative inline-block text-left">
            <button
              onClick={() => setOptionsOpen((o) => !o)}
              className="p-1 hover:bg-gray-200 rounded-full cursor-pointer"
            >
              <MoreVerticalIcon size={20} />
            </button>

            {isOptionsOpen && (
              <div
                ref={menuRef}
                className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-md z-20"
              >
                <button
                  onClick={handleEdit}
                  className="w-full px-4 py-2 text-left cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                >
                  <FileEdit size={16} /> Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full px-4 py-2 text-left cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                >
                  <DeleteIcon size={16} /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Author */}
      <div className="mb-8 pt-4 flex items-top gap-3">
        <img
          src={`${idea.author.avatarUrl || '/logo192.png'}`}
          alt={idea.author.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm text-gray-800 font-medium">
            {idea.author.name}
          </p>
          {idea.author.githubUrl && (
            <a
              href={idea.author.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline"
            >
              GitHub ↗
            </a>
          )}
        </div>
        <p className="text-sm text-gray-500 ml-4">
          Posted on{' '}
          {new Date(idea.createdAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Summary */}
      <p className="text-md text-gray-700 mb-4">{idea.summary}</p>

      {/* Meta info: difficulty, time, views, votes */}
      <div className="flex flex-wrap items-center text-sm text-gray-600 gap-3 mb-6">
        <span
          data-aos="fade-zoom-in"
          data-aos-delay={100}
          className="px-3 py-1 rounded-full bg-gray-100 border border-gray-200"
        >
          Difficulty: <strong>{idea.difficulty}</strong>
        </span>
        <span
          data-aos="fade-zoom-in"
          data-aos-delay={200}
          className="px-3 py-1 rounded-full bg-gray-100 border border-gray-200"
        >
          ⏱ Estimated Time: {idea.estimatedTime}
        </span>
        <span
          data-aos="fade-zoom-in"
          data-aos-delay={300}
          className="px-3 py-1 rounded-full bg-gray-100 border border-gray-200"
        >
          👁 Views: {idea.views}
        </span>
        <span
          data-aos="fade-zoom-in"
          data-aos-delay={400}
          className="px-3 py-1 rounded-full bg-gray-100 border border-gray-200"
        >
          👍 Upvotes: {idea.upvotes}
        </span>
      </div>

      {/* Tags */}
      {idea.tags?.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-sm text-gray-700 mb-1">Tags:</h3>
          <ul className="flex flex-wrap gap-2">
            {idea.tags.map((tag: string, index: number) => (
              <li
                key={index}
                data-aos="fade-left"
                data-aos-delay={300 * index}
                className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full border border-blue-100"
              >
                #{tag}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tech Stack */}
      {idea.techStack?.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-sm text-gray-700 mb-2">
            Tech Stack:
          </h3>
          <ul className="flex flex-wrap gap-2">
            {idea.techStack.map((tech: string, index: number) => (
              <li
                key={index}
                data-aos="fade-left"
                data-aos-delay={300 * index}
                className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full border border-green-100"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-6">
        <h3 className="font-semibold text-sm text-gray-700 mb-1">
          Description:
        </h3>
        <p className="text-sm text-gray-800 whitespace-pre-line">
          {idea.description}
        </p>
      </div>

      {/* Inspiration link */}
      {idea.inspirationLink && (
        <div className="mb-6">
          <h3 className="font-semibold text-sm text-gray-700 mb-1">
            Inspiration:
          </h3>
          <a
            href={idea.inspirationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            {idea.inspirationLink}
          </a>
        </div>
      )}
    </div>
  )
}
