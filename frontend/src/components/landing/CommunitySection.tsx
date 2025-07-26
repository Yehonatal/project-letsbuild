import { Users } from 'lucide-react'

const CommunitySection = () => {
  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
        <Users className="w-10 h-10 mx-auto text-black mb-4" />
        <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
        <p className="text-gray-700 text-lg mb-6">
          You’re not just sharing ideas — you’re helping shape the future of dev
          collaboration. Your voice and contributions matter.
        </p>
        <a
          href="/ideas"
          className="inline-block px-8 py-2 rounded-md border-2 border-black hover:bg-black hover:text-white transition text-lg"
        >
          Explore Ideas
        </a>
      </div>
    </section>
  )
}

export default CommunitySection
