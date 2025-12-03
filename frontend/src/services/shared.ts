import api from '@/lib/axios'
import type { IdeaType } from '@/types/types'

export const fetchIdeas = async (limit?: number): Promise<IdeaType[]> => {
    const response = await api.get('/api/ideas', {
        params: limit ? { _limit: limit } : {},
    })
    return response.data
}

export const fetchFeaturedIdeas = async (limit = 4): Promise<IdeaType[]> => {
    const response = await api.get('/api/ideas/featured', {
        params: { _limit: limit },
    })
    return response.data
}

export const fetchLatestIdeas = async (limit = 4): Promise<IdeaType[]> => {
    const response = await api.get('/api/ideas/latest', {
        params: { _limit: limit },
    })
    return response.data
}

export const fetchMySummary = async () => {
    const { data } = await api.get('/api/ideas/mine/summary')
    return data
}

export const fetchMyIdeas = async (): Promise<IdeaType[]> => {
    const response = await api.get('/api/ideas/mine')
    return response.data
}

export const fetchIdeaById = async (id: string): Promise<IdeaType> => {
    const response = await api.get(`/api/ideas/${id}`)
    return response.data
}

export const createIdea = async (
    newIdea: Omit<IdeaType, '_id' | 'id' | 'createdAt' | 'upvotes' | 'views'>,
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
