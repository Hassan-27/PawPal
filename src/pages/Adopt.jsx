'use client';

import { CheckCircle, Heart, FileCheck, Home } from 'lucide-react';

export default function HowToAdoptPage() {
  const steps = [
    {
      icon: CheckCircle,
      title: 'Browse Pets',
      description: 'Explore our available pets and find one that matches your lifestyle and preferences.',
      number: 1,
    },
    {
      icon: FileCheck,
      title: 'Complete Application',
      description: 'Fill out our adoption application to help us match you with the right pet.',
      number: 2,
    },
    {
      icon: Heart,
      title: 'Meet & Greet',
      description: 'Visit our facility to meet your potential new family member in person.',
      number: 3,
    },
    {
      icon: Home,
      title: 'Bring Home',
      description: 'Complete the adoption process and welcome your new pet to their forever home.',
      number: 4,
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How to Adopt</h1>
          <p className="text-lg opacity-90">A simple 4-step process to find your perfect pet</p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => {
              const IconComponent = step.icon;
              return (
                <div key={step.number} className="text-center">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                        <IconComponent className="text-primary-foreground" size={40} />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-primary-foreground font-bold">
                        {step.number}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">Adoption Requirements</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-primary mb-4">What We Need</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-3">•</span>
                  <span>Valid government-issued ID</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-3">•</span>
                  <span>Proof of residence</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-3">•</span>
                  <span>Veterinary references (if applicable)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-3">•</span>
                  <span>Information about your home</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-3">•</span>
                  <span>Your pet care experience</span>
                </li>
              </ul>
            </div>

            <div className="bg-card p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-primary mb-4">Adoption Fees</h3>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <p className="font-semibold text-foreground">Dogs</p>
                  <p>$150 - $300</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Cats</p>
                  <p>$75 - $150</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Includes</p>
                  <ul className="list-disc list-inside text-sm">
                    <li>Vaccinations & Health Check</li>
                    <li>Microchipping</li>
                    <li>Spay/Neuter</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {[
              {
                question: 'How long does the adoption process take?',
                answer:
                  'Typically, the adoption process takes 2-5 business days from application to bringing your pet home.',
              },
              {
                question: 'Can I return my pet if it does not work out?',
                answer:
                  'Yes, we offer a 30-day trial period. If the adoption is not working out, we will take the pet back.',
              },
              {
                question: 'Do you offer post-adoption support?',
                answer: 'We provide free counseling and support for the first year after adoption.',
              },
              {
                question: 'What if my pet gets sick after adoption?',
                answer:
                  'All adopted pets come with a health guarantee and we can recommend trusted veterinarians.',
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="bg-card p-6 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
              >
                <summary className="font-bold text-primary text-lg">
                  {faq.question}
                </summary>
                <p className="text-muted-foreground mt-4">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start?</h2>
          <p className="text-lg mb-8 opacity-90">Begin your adoption journey today and find your perfect companion</p>
          <button className="px-8 py-4 bg-primary-foreground text-primary font-bold rounded-lg hover:shadow-xl transition-all duration-200">
            Browse Available Pets
          </button>
        </div>
      </section>
    </main>
  );
}
