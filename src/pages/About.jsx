import { Award, Target, Heart } from 'lucide-react'

export default function About() {
  const team = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: '/professional-woman.png',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Head of Adoptions',
      image: '/professional-man.png',
    },
    {
      id: 3,
      name: 'Emma Davis',
      role: 'Animal Care Specialist',
      image: '/professional-woman.png',
    },
  ]

  const stats = [
    { number: '5000+', label: 'Pets Adopted' },
    { number: '1000+', label: 'Happy Families' },
    { number: '50+', label: 'Partner Shelters' },
    { number: '10+', label: 'Years of Service' },
  ]

  const values = [
    {
      icon: <Heart size={32} className="text-amber-600" />,
      title: 'Compassion',
      description: 'We care deeply about every animal in our care',
    },
    {
      icon: <Target size={32} className="text-amber-600" />,
      title: 'Mission-Driven',
      description: 'Our goal is to find the perfect home for every pet',
    },
    {
      icon: <Award size={32} className="text-amber-600" />,
      title: 'Excellence',
      description: 'We maintain the highest standards of animal welfare',
    },
  ]

  return (
    <div className="w-full">
      <section className="bg-amber-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">About PetHub</h1>
          <p className="text-xl opacity-90">Connecting loving homes with deserving pets since 2014</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                At PetHub, our mission is to revolutionize pet adoption by making the process simple, transparent, and joyful. We believe every pet deserves a loving home, and every family deserves the joy of pet ownership.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We work directly with shelters, rescue organizations, and individual pet owners to create meaningful connections between people and animals.
              </p>
            </div>
            <div className="hidden md:block">
              <img src="/happy-family-with-dogs.jpg" alt="Our mission" className="w-full rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                <h3 className="text-4xl font-bold text-amber-600 mb-2">{stat.number}</h3>
                <p className="text-gray-600 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8 text-center hover:shadow-lg transition">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Our Team</h2>
          <p className="text-center text-gray-600 text-lg mb-12">Meet the passionate people behind PetHub</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="h-64 overflow-hidden bg-gray-200">
                  <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-amber-600 font-semibold">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
