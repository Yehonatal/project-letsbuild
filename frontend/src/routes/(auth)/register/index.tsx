import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { registerUser } from '@/services/auth'
import { useAuth } from '@/context/AuthContext'

export const Route = createFileRoute('/(auth)/register/')({
    component: RegisterPage,
})

function RegisterPage() {
    const navigate = useNavigate()
    const { setAccessToken, setUser } = useAuth()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const { mutateAsync, isPending } = useMutation({
        mutationFn: registerUser,
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

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await mutateAsync({ name: username, email, password })
        } catch (error) {
            console.error('Registration failed:', error)
            setError('Registration failed. Please try again.')
            return
        }

        // Reset form fields
        setUsername('')
        setEmail('')
        setPassword('')
        setError(null)
    }
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg border-dashed border shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6  text-gray-800">
                    Register
                </h1>
                {error && (
                    <div className="mb-4 text-red-500 bg-red-50 p-2">
                        {error}
                    </div>
                )}
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleRegister(e)
                    }}
                    className="space-y-6"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 border-l-4 border-2 p-2 block w-full border-gray-300 rounded-md shadow-sm "
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 p-2 border-l-4 border-2 block w-full border-gray-300 rounded-md shadow-sm"
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
                            className="mt-1 p-2 block border-l-4 border-2 w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition duration-200"
                    >
                        {isPending ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <p className="mt-6 text-sm text-gray-600 text-center">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="text-green-500 hover:underline"
                    >
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    )
}
