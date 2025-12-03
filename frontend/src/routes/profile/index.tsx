import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '@/context/AuthContext'
import UserDashboard from '@/components/UserDashboard'

export const Route = createFileRoute('/profile/')({
    component: UserProfile,
})

function UserProfile() {
    const { user } = useAuth()

    if (!user) {
        return
    }

    const dummyUser = {
        name: 'Yonatan Afewerk',
        email: 'yonatanafewerk@gmail.com',
        avatarUrl: 'https://i.pravatar.cc/150?img=1',
        bannerUrl: 'https://placehold.co/1200x200',
        handle: '@yonatan_afw',
    }

    return (
        <div className="max-w-6xl mx-auto p-6 relative">
            <div className=" overflow-hidden rounded-lg border-dashed border-1 mb-6">
                <div className="w-full overflow-hidden ">
                    <img
                        src={dummyUser.bannerUrl}
                        alt="Banner"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="absolute left-12 top-20 transform translate-y-1/2 z-199999">
                    <img
                        src={dummyUser.avatarUrl}
                        alt={`${user.name} avatar`}
                        className="w-32 h-32 rounded-full border-1 border-gray-500 border-dashed object-cover"
                    />
                </div>
            </div>
            <div className="mt-20 px-6 pb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    {user.name}
                </h1>
                <p className="text-gray-500">{dummyUser.handle}</p>
                <p className="text-gray-600 mt-2 text-sm">{user.email}</p>
            </div>

            {/* Mini Dashboard */}
            <div>
                <UserDashboard />
            </div>
        </div>
    )
}

export default UserProfile
