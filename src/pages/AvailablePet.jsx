"use client"

import { useState } from "react"
import { Search, Filter, X } from "lucide-react"

export default function AvailablePets() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedPet, setSelectedPet] = useState(null)

  const allPets = [
    {
      id: 1,
      name: "Max",
      type: "Dog",
      breed: "Golden Retriever",
      age: "2 years",
      image: "/golden-retriever.jpg",
      description:
        "Max is a friendly and energetic Golden Retriever who loves to play fetch and cuddle. He's great with kids and other pets, making him a perfect family companion.",
    },
    {
      id: 2,
      name: "Luna",
      type: "Cat",
      breed: "Siamese",
      age: "1 year",
      image: "/siamese-cat.jpg",
      description:
        "Luna is a beautiful Siamese cat with striking blue eyes. She's affectionate, playful, and loves to interact with her owners. Perfect for an active household.",
    },
    {
      id: 3,
      name: "Charlie",
      type: "Dog",
      breed: "Labrador",
      age: "3 years",
      image: "/labrador-dog.jpg",
      description:
        "Charlie is a loyal and gentle Labrador who enjoys long walks and outdoor activities. He's well-trained and gets along wonderfully with families and other dogs.",
    },
    {
      id: 4,
      name: "Whiskers",
      type: "Cat",
      breed: "Tabby",
      age: "2 years",
      image: "/tabby-cat.jpg",
      description:
        "Whiskers is a curious and intelligent Tabby cat. He enjoys climbing and exploring, and loves interactive play with toys and laser pointers.",
    },
    {
      id: 5,
      name: "Buddy",
      type: "Dog",
      breed: "Beagle",
      age: "1 year",
      image: "/beagle-dog.jpg",
      description:
        "Buddy is an energetic and curious Beagle pup. He loves adventures, social interaction, and is always ready for his next game or walk in the park.",
    },
    {
      id: 6,
      name: "Mittens",
      type: "Cat",
      breed: "Calico",
      age: "3 years",
      image: "/calico-cat.jpg",
      description:
        "Mittens is a sweet and calm Calico cat who enjoys quiet moments and gentle petting. She's perfect for someone looking for a relaxed feline companion.",
    },
    {
      id: 7,
      name: "Rocky",
      type: "Dog",
      breed: "German Shepherd",
      age: "4 years",
      image: "/german-shepherd.jpg",
      description:
        "Rocky is an intelligent and protective German Shepherd. He's well-trained, loyal, and ideal for experienced dog owners who can provide structure and exercise.",
    },
    {
      id: 8,
      name: "Shadow",
      type: "Cat",
      breed: "Black Cat",
      age: "2 years",
      image: "/black-cat.jpg",
      description:
        "Shadow is a sleek black cat with a playful personality. He's independent yet affectionate, and loves window perches and interactive play sessions.",
    },
  ]

  const filteredPets = allPets.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || pet.type === selectedType
    return matchesSearch && matchesType
  })

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedPet(null)
    }
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className={selectedPet ? "blur-sm" : ""}>
        <section className="bg-amber-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-2">Available Pets</h1>
            <p className="text-lg opacity-90">
              Browse our collection of wonderful pets waiting for their forever homes
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg shadow p-6 h-fit sticky top-20 lg:col-span-1">
              <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-6">
                <Filter size={20} /> Filters
              </h3>

              <div className="mb-6">
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or breed..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Pet Type</label>
                <div className="flex flex-col gap-2">
                  {["all", "Dog", "Cat"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`py-2 px-4 rounded-lg transition font-medium ${
                        selectedType === type
                          ? "bg-amber-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {type === "all" ? "All Pets" : type + "s"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <p className="text-gray-700 font-semibold mb-6">{filteredPets.length} pet(s) found</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPets.length > 0 ? (
                  filteredPets.map((pet) => (
                    <div
                      key={pet.id}
                      onClick={() => setSelectedPet(pet)}
                      className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden cursor-pointer"
                    >
                      <div className="relative h-48 overflow-hidden bg-gray-200">
                        <img
                          src={pet.image || "/placeholder.svg"}
                          alt={pet.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 right-3 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {pet.type}
                        </span>
                      </div>
                      <div className="p-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">{pet.name}</h2>
                        <p className="text-amber-600 font-semibold mb-1">{pet.breed}</p>
                        <p className="text-gray-600 mb-4">🎂 Age: {pet.age}</p>
                        <button className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition font-semibold">
                          Adopt Now
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full bg-white rounded-lg p-12 text-center">
                    <p className="text-gray-600 text-lg mb-4">No pets found matching your criteria</p>
                    <button
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedType("all")
                      }}
                      className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition font-semibold"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedPet && (
        <div
          onClick={handleBackdropClick}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden">
            <div className="relative h-64 overflow-hidden bg-gray-200">
              <img
                src={selectedPet.image || "/placeholder.svg"}
                alt={selectedPet.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 right-3 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {selectedPet.type}
              </span>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{selectedPet.name}</h2>
                  <p className="text-amber-600 font-semibold text-lg">{selectedPet.breed}</p>
                </div>
                <button
                  onClick={() => setSelectedPet(null)}
                  className="text-gray-500 hover:text-gray-700 transition"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>

              <p className="text-gray-700 mb-4 text-lg font-medium">
                🎂 <span className="font-semibold">{selectedPet.age}</span>
              </p>

              <p className="text-gray-600 mb-6 leading-relaxed">{selectedPet.description}</p>

              <button className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition font-semibold text-lg">
                Adopt {selectedPet.name}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
