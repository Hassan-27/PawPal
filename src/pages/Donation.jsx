import React, { useState } from 'react';
import { Heart, DollarSign, Shield, Check, User, Mail, Phone, CreditCard, Calendar } from 'lucide-react';

const DonationPage = () => {
  const [donationType, setDonationType] = useState('one-time');
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [donationPurpose, setDonationPurpose] = useState('general');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const presetAmounts = [10, 25, 50, 100, 250, 500];
  
  const purposes = [
    { id: 'general', label: 'General Animal Care', icon: '🐾' },
    { id: 'medical', label: 'Medical Emergency Fund', icon: '💉' },
    { id: 'shelter', label: 'Shelter Maintenance', icon: '🏠' },
    { id: 'food', label: 'Food & Supplies', icon: '🍖' },
    { id: 'sponsor', label: 'Sponsor a Pet', icon: '❤️' }
  ];

  const impactExamples = [
    { amount: 25, impact: 'Provides 1 week of food for a rescue dog' },
    { amount: 50, impact: 'Covers vaccination for 3 puppies' },
    { amount: 100, impact: 'Emergency medical care for an injured pet' },
    { amount: 250, impact: 'One month of shelter operations' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = customAmount || selectedAmount;
    console.log('Donation submitted:', {
      amount,
      type: donationType,
      purpose: donationPurpose,
      anonymous: isAnonymous,
      ...formData
    });
    alert(`Thank you for your ${donationType} donation of $${amount}!`);
  };

  const finalAmount = customAmount || selectedAmount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full mb-4">
            <Heart className="w-8 h-8 text-white" fill="white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Make a Difference Today
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your donation helps us rescue, care for, and find loving homes for abandoned pets. Every contribution matters!
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-3xl font-bold text-orange-500">1,247</p>
            <p className="text-gray-600">Pets Rescued</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-3xl font-bold text-blue-500">Rs 85,420</p>
            <p className="text-gray-600">Raised This Year</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-3xl font-bold text-green-500">523</p>
            <p className="text-gray-600">Happy Adopters</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Donation Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              
              {/* Donation Type */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-orange-500" />
                  Donation Type
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setDonationType('one-time')}
                    className={`p-4 rounded-lg border-2 transition ${
                      donationType === 'one-time'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <p className="font-semibold">One-Time</p>
                    <p className="text-sm text-gray-600">Single donation</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDonationType('monthly')}
                    className={`p-4 rounded-lg border-2 transition ${
                      donationType === 'monthly'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <p className="font-semibold">Monthly</p>
                    <p className="text-sm text-gray-600">Recurring support</p>
                  </button>
                </div>
              </div>

              {/* Amount Selection */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-orange-500" />
                  Select Amount
                </h3>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount('');
                      }}
                      className={`p-4 rounded-lg border-2 transition font-semibold ${
                        selectedAmount === amount && !customAmount
                          ? 'border-orange-500 bg-orange-50 text-orange-600'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Or enter custom amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-gray-500">$</span>
                    <input
                      type="number"
                      min="1"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Donation Purpose */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-orange-500" />
                  Where should your donation go?
                </h3>
                <div className="space-y-3">
                  {purposes.map((purpose) => (
                    <label
                      key={purpose.id}
                      className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition ${
                        donationPurpose === purpose.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="purpose"
                        value={purpose.id}
                        checked={donationPurpose === purpose.id}
                        onChange={(e) => setDonationPurpose(e.target.value)}
                        className="mr-3 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-2xl mr-3">{purpose.icon}</span>
                      <span className="font-medium">{purpose.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Donor Information */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-orange-500" />
                  Your Information
                </h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="mr-2 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700">Make my donation anonymous</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition flex items-center justify-center"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Donate ${finalAmount} {donationType === 'monthly' && '/ month'}
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                <Shield className="w-4 h-4 inline mr-1" />
                Secure payment powered by Stripe
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Impact Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Your Impact
              </h3>
              <div className="space-y-3">
                {impactExamples.map((example) => (
                  <div key={example.amount} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-800">${example.amount}</p>
                      <p className="text-sm text-gray-600">{example.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Why Donate?
              </h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" />
                  <span>100% of donations go directly to pet care</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" />
                  <span>Tax-deductible (nonprofit registered)</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" />
                  <span>Instant email receipt</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" />
                  <span>Cancel recurring donations anytime</span>
                </li>
              </ul>
            </div>

            {/* Recent Donors */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Recent Donors
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Sarah M.</span>
                  <span className="font-semibold text-orange-500">$100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Anonymous</span>
                  <span className="font-semibold text-orange-500">$250</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">John D.</span>
                  <span className="font-semibold text-orange-500">$50</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default DonationPage;