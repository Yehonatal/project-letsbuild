import axios from 'axios'
import { getStoredAccessToken, setStoredAccessToken } from './authToken'
import { refreshAccessToken } from '@/services/auth'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Attach the access token to every request
api.interceptors.request.use((config) => {
    const token = getStoredAccessToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

// Refresh token after expire
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (
            error.response.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes('/auth/refresh')
        ) {
            originalRequest._retry = true
            try {
                const { accessToken: newAccessToken } =
                    await refreshAccessToken()
                setStoredAccessToken(newAccessToken)
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                return api(originalRequest)
            } catch (refreshError) {
                console.error('Failed to refresh token', refreshError)
            }
        }

        return Promise.reject(error)
    },
)

export default api
