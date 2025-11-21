import { Link } from 'react-router-dom'
import { ArrowRight, Heart, Users, Award } from 'lucide-react'

export default function Home() {
  const featuredPets = [
    {
      id: 1,
      name: 'Max',
      type: 'Dog',
      breed: 'Golden Retriever',
      image: '/golden-retriever.jpg',
      age: '2 years',
    },
    {
      id: 2,
      name: 'Luna',
      type: 'Cat',
      breed: 'Siamese',
      image: '/siamese-cat.jpg',
      age: '1 year',
    },
    {
      id: 3,
      name: 'Charlie',
      type: 'Dog',
      breed: 'Labrador',
      image: '/labrador-dog.jpg',
      age: '3 years',
    },
    {
      id: 4,
      name: 'Whiskers',
      type: 'Cat',
      breed: 'Tabby',
      image: '/tabby-cat.jpg',
      age: '2 years',
    },
  ]

  const benefits = [
    {
      icon: <Heart size={32} className="text-amber-600" />,
      title: 'Save a Life',
      description: 'Give a loving home to a pet in need and make a difference',
    },
    {
      icon: <Users size={32} className="text-amber-600" />,
      title: 'Family Joy',
      description: 'Bring happiness and companionship to your home',
    },
    {
      icon: <Award size={32} className="text-amber-600" />,
      title: 'Full Support',
      description: 'We provide guidance and support throughout the adoption process',
    },
  ]

  return (
    <div className="w-full">
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Find Your Perfect Pet
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover loving pets waiting for their forever homes. Start your journey with PetHub today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/available-pets" className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition flex items-center justify-center gap-2">
                Browse Pets <ArrowRight size={20} />
              </Link>
              <Link to="/how-to-adopt" className="bg-white text-amber-600 border-2 border-amber-600 px-8 py-3 rounded-lg hover:bg-amber-50 transition flex items-center justify-center">
                Learn More
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <img src="/happy-family-with-pets.jpg" alt="Happy family with pets" className="w-full rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Pets</h2>
            <p className="text-xl text-gray-600">Meet some of our wonderful pets looking for homes</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredPets.map((pet) => (
              <div key={pet.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
                <div className="h-48 overflow-hidden bg-gray-200">
                  <img src={pet.image || "/placeholder.svg"} alt={pet.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{pet.name}</h3>
                  <p className="text-amber-600 font-semibold mb-1">{pet.breed}</p>
                  <p className="text-gray-600 mb-4">Age: {pet.age}</p>
                  <button className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/available-pets" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 text-lg font-semibold">
              View All Pets <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Why Adopt?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-amber-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Find Your Companion?</h2>
          <p className="text-xl mb-8 opacity-90">
            Our adoption process is simple and supportive. We're here to help every step of the way.
          </p>
          <Link to="/available-pets" className="inline-flex items-center gap-2 bg-white text-amber-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition font-semibold">
            Start Browsing <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}
