import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '@/context/AuthContext'
import UserDashboard from '@/components/UserDashboard'
import UsersIdeas from '@/components/UsersIdeas'
import { LucideUser } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/profile/')({
    component: UserProfile,
})

function UserProfile() {
    const { user } = useAuth()
    const [activeTab, setActiveTab] = useState<'dashboard' | 'ideas'>(
        'dashboard',
    )

    if (!user) {
        return null
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-5xl mx-auto px-6 py-16 lg:py-24">
                {/* Minimal Profile Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="relative mb-8">
                        <div className="w-32 h-32 rounded-[2.5rem] bg-slate-50 p-1 border border-slate-100 shadow-sm">
                            <img
                                src={`https://ui-avatars.com/api/?name=${user.name}&background=random&size=256`}
                                alt={user.name}
                                className="w-full h-full rounded-[2.2rem] object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-emerald-500 rounded-2xl border-4 border-white flex items-center justify-center shadow-sm">
                            <LucideUser className="w-5 h-5 text-white" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
                            {user.name}
                        </h1>
                        <p className="text-slate-500 font-medium text-lg">
                            {user.email}
                        </p>
                    </div>

                    <div className="flex gap-4 mt-8">
                        <button className="px-6 py-2.5 rounded-2xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-all shadow-sm">
                            Edit Profile
                        </button>
                        <button className="px-6 py-2.5 rounded-2xl border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-all">
                            Share Profile
                        </button>
                    </div>
                </div>

                {/* Clean Tab Navigation */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex p-1 bg-slate-50 rounded-2xl border border-slate-100">
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`px-8 py-2.5 text-sm font-bold rounded-xl transition-all ${
                                activeTab === 'dashboard'
                                    ? 'bg-white text-slate-900 shadow-sm border border-slate-100'
                                    : 'text-slate-400 hover:text-slate-600'
                            }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('ideas')}
                            className={`px-8 py-2.5 text-sm font-bold rounded-xl transition-all ${
                                activeTab === 'ideas'
                                    ? 'bg-white text-slate-900 shadow-sm border border-slate-100'
                                    : 'text-slate-400 hover:text-slate-600'
                            }`}
                        >
                            My Projects
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {activeTab === 'dashboard' ? (
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 lg:p-12 shadow-sm">
                            <UserDashboard />
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-2xl font-bold text-slate-900">
                                    Contributions
                                </h2>
                                <p className="text-slate-400 text-sm font-medium">
                                    Manage your submitted ideas
                                </p>
                            </div>
                            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 lg:p-12 shadow-sm">
                                <UsersIdeas />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserProfile
