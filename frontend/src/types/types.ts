interface IdeaType {
    _id: string
    id: string
    title: string
    verified: boolean
    summary: string
    description: string
    tags: string[]
    createdAt: string

    difficulty: 'easy' | 'medium' | 'hard'
    estimatedTime: string // e.g., '2 weeks', '3-4 days'
    techStack: string[] // e.g., ['React', 'Node.js', 'Stripe']
    upvotes: number
    views: number
    author: {
        name: string
        avatarUrl?: string
        githubUrl?: string
    }
    inspirationLink?: string // link to similar real-world product
}

export type { IdeaType }
