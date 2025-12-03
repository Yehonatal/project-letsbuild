import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { loginUser } from '@/services/auth'
import { useAuth } from '@/context/AuthContext'

export const Route = createFileRoute('/(auth)/login/')({
    component: LoginPage,
})

function LoginPage() {
    const navigate = useNavigate()
    const { setAccessToken, setUser } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const { mutateAsync, isPending } = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            setAccessToken(data.accessToken)
            setUser({
                id: data.user.id,
                name: data.user.name,
                email: data.user.email,
            })
            navigate({ to: '/ideas' })
        },
        onError: (error: Error) => {
            setError(error.message)
        },
    })

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await mutateAsync({ email, password })
        } catch (error: any) {
            setError(error.message)
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="bg-white p-8 rounded-lg border-dashed border shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Login</h1>
                {error && (
                    <div className="mb-4 text-red-500 bg-red-50 p-2">
                        {error}
                    </div>
                )}
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleLogin(e)
                    }}
                    className="space-y-6"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            email
                        </label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 border-l-4 border-2 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 border-l-4 border-2 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition duration-200"
                    >
                        {isPending ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="mt-6 text-sm text-gray-600 text-center">
                    Don't have an account?{' '}
                    <Link
                        to="/register"
                        className="text-green-500 hover:underline"
                    >
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    )
}
