import {
    createContext,
    useContext,
    useState,
    type ReactNode,
    useEffect,
} from 'react'
import { refreshAccessToken } from '@/services/auth'
import { setStoredAccessToken } from '@/lib/authToken'

type AuthContextType = {
    accessToken: string | null
    setAccessToken: (token: string | null) => void
    user: {
        id: string
        name: string
        email: string
    } | null
    setUser: (user: AuthContextType['user'] | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [user, setUser] = useState<AuthContextType['user'] | null>(null)

    const value = {
        accessToken,
        setAccessToken,
        user,
        setUser,
    }

    useEffect(() => {
        const loadAuth = async () => {
            try {
                const { accessToken: newToken, user } =
                    await refreshAccessToken()
                setAccessToken(newToken)
                setStoredAccessToken(newToken)
                setUser(user)
            } catch (error: any) {
                console.log('Failed to refresh token', error)
            }
        }
        loadAuth()
    }, [])

    useEffect(() => {
        setStoredAccessToken(accessToken)
    }, [accessToken])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
