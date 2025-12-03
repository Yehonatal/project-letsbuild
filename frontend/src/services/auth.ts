import api from '@/lib/axios'

export const registerUser = async ({
    name,
    email,
    password,
}: {
    name: string
    email: string
    password: string
}) => {
    try {
        const response = await api.post('/api/auth/register', {
            name,
            email,
            password,
        })
        return response.data
    } catch (error: any) {
        console.error('Error registering user:', error)
        const msg = error.response?.data?.message || 'Registration failed'
        throw new Error(msg)
    }
}

export const loginUser = async (credentials: {
    email: string
    password: string
}) => {
    try {
        const response = await api.post('/api/auth/login', credentials)
        return response.data
    } catch (error: any) {
        console.error('Error logging in user:', error)
        const msg = error.response?.data?.message || 'Login failed'
        throw new Error(msg)
    }
}

export const logoutUser = async () => {
    try {
        const response = await api.post('/api/auth/logout')
        return response.data
    } catch (error: any) {
        console.error('Error logging out user:', error)
        const msg = error.response?.data?.message || 'Logout failed'
        throw new Error(msg)
    }
}

export const refreshAccessToken = async () => {
    try {
        const response = await api.post('/api/auth/refresh')
        return response.data
    } catch (error: any) {
        console.error('Error refreshing the access token', error)
        const msg = error.response?.data.message || 'Refresh failed'
        throw new Error(msg)
    }
}
