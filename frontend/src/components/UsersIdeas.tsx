import { useSuspenseQuery, queryOptions } from '@tanstack/react-query'
import { fetchMyIdeas } from '@/services/shared'
import type { IdeaType } from '@/types/types'
import IdeaCard from './IdeaCard'

const myIdeasQueryOptions = () =>
    queryOptions<IdeaType[]>({
        queryKey: ['myIdeas'],
        queryFn: () => fetchMyIdeas(),
        staleTime: 1000 * 60 * 2,
    })

const UsersIdeas = () => {
    const { data: myIdeas } = useSuspenseQuery(myIdeasQueryOptions())
    console.log('My Ideas:', myIdeas)

    if (!Array.isArray(myIdeas) || myIdeas.length === 0) {
        return (
            <div className="flex items-center justify-center">
                <p className="text-gray-500">
                    You haven’t submitted any ideas yet.
                </p>
            </div>
        )
    }

    return (
        <section>
            <h2 className="text-2xl font-extralight mb-4">
                Your Top (2) Project Ideas
            </h2>
            {myIdeas.length === 0 ? (
                <p>You haven’t submitted any ideas yet.</p>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {myIdeas.map((idea) => (
                        <IdeaCard key={idea._id} idea={idea} />
                    ))}
                </div>
            )}
        </section>
    )
}

export default UsersIdeas
