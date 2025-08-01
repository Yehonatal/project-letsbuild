import api from '@/lib/axios'
import type { IdeaType } from '@/types/types'

export const fetchIdeas = async (): Promise<IdeaType[]> => {
    const response = await api.get('/api/ideas')
    return response.data
}

export const fetchIdeaById = async (id: string): Promise<IdeaType> => {
    const response = await api.get(`/api/ideas/${id}`)
    return response.data
}

export const createIdea = async (
    newIdea: Omit<IdeaType, 'id' | 'createdAt' | 'upvotes' | 'views'>,
): Promise<IdeaType> => {
    const response = await api.post('/api/ideas', {
        ...newIdea,
        createdAt: new Date().toISOString(),
        upvotes: 0,
        views: 0,
    })
    return response.data
}
export const updateIdea = async (
    id: string,
    updatedIdea: IdeaType,
): Promise<IdeaType> => {
    const response = await api.put(`/api/ideas/${id}`, updatedIdea)
    return response.data
}

export const deleteIdea = async (id: string): Promise<void> => {
    await api.delete(`/api/ideas/${id}`)
}
