import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { fetchIdeas } from '@/services/shared'
import type { IdeaType } from '@/types/types'
import { Loader2, Star } from 'lucide-react'
import IdeaCard from '../IdeaCard'

const ideasQueryOptions = () =>
  queryOptions<IdeaType[]>({
    queryKey: ['ideas'],
    queryFn: fetchIdeas,
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchOnWindowFocus: true,
  })

const FeaturedProjects = () => {
  const { data } = useSuspenseQuery(ideasQueryOptions())

  const sortedList = data.sort((a, b) => b.upvotes - a.upvotes)
  const featuredIdeas = sortedList.slice(0, 4)

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 size={35} className="animate-spin text-gray-500" />
      </div>
    )
  }

  return (
    <section className="bg-white px-4">
      <div data-aos="fade-up" data-aos-delay="100">
        <h2 className="text-4xl font-bold  mb-6">Featured Project Ideas</h2>

        <p className="text-lg text-gray-600 mb-12 mx-auto">
          Each project below has earned its spot through a combination of
          community support, originality, and potential impact. We handpick
          these ideas to highlight inspiring work and innovative thinking from
          the developer community.
        </p>

        <div className="p-6 mb-14">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" /> What Makes an Idea
            Featured?
          </h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>
              <strong>Upvotes:</strong> Community interest plays a major role in
              surfacing great ideas.
            </li>
            <li>
              <strong>Creativity:</strong> Ideas that are unique, clever, or
              solve meaningful problems.
            </li>
            <li>
              <strong>Clarity:</strong> Well-written and thought-out
              descriptions, problem statements, and goals.
            </li>
            <li>
              <strong>Impact:</strong> Ideas with strong potential to be useful
              or widely adopted.
            </li>
            <li>
              <strong>Momentum:</strong> New submissions gaining rapid attention
              may also be included.
            </li>
          </ul>
        </div>

        {/* Featured Idea Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {featuredIdeas.map((idea) => (
            <IdeaCard idea={idea} key={idea.id} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects
