import { Github, Twitter, Mail } from 'lucide-react'
import { Link } from '@tanstack/react-router'

const Footer = () => {
    return (
        <footer className="mt-20 border-t border-slate-100 bg-white">
            <div className="max-w-7xl mx-auto px-6 py-20 grid gap-12 md:grid-cols-4 items-start">
                <div className="md:col-span-2 space-y-6">
                    <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-2xl bg-slate-900 text-white font-bold flex items-center justify-center">
                            LB
                        </div>
                        <span className="text-xl font-bold text-slate-900">
                            letsBuild
                        </span>
                    </div>
                    <p className="text-slate-500 max-w-sm leading-relaxed">
                        A modern platform for developers to share, discover, and
                        collaborate on innovative project ideas. Built for the
                        community, by the community.
                    </p>
                    <div className="flex space-x-4">
                        {[
                            { icon: Github, label: 'GitHub' },
                            { icon: Twitter, label: 'Twitter' },
                            { icon: Mail, label: 'Email' },
                        ].map((social) => (
                            <a
                                key={social.label}
                                href="#"
                                className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all"
                            >
                                <social.icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-slate-900 mb-6">Platform</h3>
                    <ul className="space-y-4 text-slate-500 font-medium">
                        <li>
                            <Link
                                to="/ideas"
                                className="hover:text-emerald-600 transition-colors"
                            >
                                Explore Ideas
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/ideas/new"
                                className="hover:text-emerald-600 transition-colors"
                            >
                                Submit Idea
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/profile"
                                className="hover:text-emerald-600 transition-colors"
                            >
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-slate-900 mb-6">Resources</h3>
                    <ul className="space-y-4 text-slate-500 font-medium">
                        <li>
                            <a
                                href="#"
                                className="hover:text-emerald-600 transition-colors"
                            >
                                Documentation
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-emerald-600 transition-colors"
                            >
                                Community
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-emerald-600 transition-colors"
                            >
                                Support
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-slate-50">
                <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-slate-400 font-medium">
                        &copy; {new Date().getFullYear()} letsBuild. All rights
                        reserved.
                    </p>
                    <div className="flex gap-8 text-sm text-slate-400 font-medium">
                        <a href="#" className="hover:text-slate-900">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-slate-900">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
