import type { IdeaType } from '@/types/types'
import { Link } from '@tanstack/react-router'
import { BadgeCheckIcon } from 'lucide-react'

const IdeaCard = ({ idea }: { idea: IdeaType }) => {
    console.log(idea.author)
    return (
        <div
            data-aos="fade-up"
            data-aos-delay={100 * Number(idea.id)}
            key={idea.id}
            className="border border-dashed relative cursor-pointer border-gray-300 rounded-lg p-4 bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
        >
            <Link to="/ideas/$ideasId" params={{ ideasId: idea.id }}>
                <div className="mb-2">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-gray-900">
                            {idea.title}
                        </h2>
                        {idea.verified && (
                            <span>
                                <BadgeCheckIcon
                                    color="green"
                                    size={16}
                                    className="inline-block"
                                />
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-gray-500">
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

                <p className="text-sm text-gray-700 mb-2 line-clamp-3">
                    {idea.summary}
                </p>

                <div className="flex flex-wrap items-center text-xs text-gray-600 gap-x-3 gap-y-1 mb-3">
                    <span className="px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200">
                        {idea.difficulty.toUpperCase()}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200">
                        ⏱ {idea.estimatedTime}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200">
                        👁 {idea.views}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200">
                        👍 {idea.upvotes}
                    </span>
                </div>

                {idea.tags.length > 0 && (
                    <ul className="flex flex-wrap gap-2 mb-3">
                        {idea.tags.map((tag, id) => (
                            <li
                                key={id}
                                className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full border border-green-100"
                            >
                                #{tag}
                            </li>
                        ))}
                    </ul>
                )}

                {idea.techStack.length > 0 && (
                    <div className="text-xs text-gray-500 mb-10">
                        <strong className="text-gray-700">Tech Stack:</strong>{' '}
                        {idea.techStack.join(', ')}
                    </div>
                )}
            </Link>
            {idea.author && (
                <div className="flex border-dashed border-gray-200 items-center justify-between mt-auto pt-2 border-t absolute bottom-2 left-2 right-2">
                    <div className="flex items-center gap-2">
                        <img
                            src={`${idea.author ? idea.author.avatarUrl : '/logo192.png'}`}
                            alt={idea.author ? idea.author.name : idea.title}
                            className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-sm text-gray-700">
                            {idea.author ? idea.author.name : 'non'}
                        </span>
                    </div>

                    {idea.inspirationLink && (
                        <a
                            href={idea.inspirationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-500 hover:underline"
                        >
                            Inspiration ↗
                        </a>
                    )}
                </div>
            )}
        </div>
    )
}

export default IdeaCard
