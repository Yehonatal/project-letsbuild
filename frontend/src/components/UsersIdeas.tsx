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
        <section className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">
                    Your Contributions
                </h2>
                <div className="px-4 py-1 rounded-full bg-emerald-50 text-emerald-600 text-sm font-bold border border-emerald-100">
                    {myIdeas.length} Ideas
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {myIdeas.map((idea) => (
                    <IdeaCard key={idea._id} idea={idea} />
                ))}
            </div>
        </section>
    )
}

export default UsersIdeas
