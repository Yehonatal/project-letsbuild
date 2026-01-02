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
        <div className="flex items-center justify-center min-h-screen bg-[#fcfcfd] px-4">
            <div className="w-full max-w-md">
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
                    <div className="mb-10 text-center">
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                            Join the community
                        </h1>
                        <p className="text-slate-500 mt-2">
                            Start sharing and building your ideas today
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 text-sm font-medium text-red-600 bg-red-50 p-4 rounded-2xl border border-red-100">
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleRegister(e)
                        }}
                        className="space-y-5"
                    >
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none text-slate-900"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">
                                Email address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none text-slate-900"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none text-slate-900"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                        >
                            {isPending
                                ? 'Creating account...'
                                : 'Create account'}
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-sm text-slate-500">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors"
                            >
                                Sign in instead
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
