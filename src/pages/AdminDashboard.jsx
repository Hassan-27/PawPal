"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { BarChart3, Users, Play as Paw, Home, Heart, Clock, Plus, Edit2, Trash2, LogOut, Menu, X } from "lucide-react"

export default function AdminDashboard() {
  const { user, isAdmin, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  if (!isAdmin) {
    navigate("/login")
    return null
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  // Mock data for dashboard
  const stats = [
    { label: "Total Pets", value: 245, icon: Paw, color: "bg-amber-100 text-amber-600" },
    { label: "Total Users", value: 1230, icon: Users, color: "bg-blue-100 text-blue-600" },
    { label: "Total Shelters", value: 12, icon: Home, color: "bg-green-100 text-green-600" },
    { label: "Total Donations", value: "$45,230", icon: Heart, color: "bg-red-100 text-red-600" },
    { label: "Pending Adoptions", value: 34, icon: Clock, color: "bg-orange-100 text-orange-600" },
  ]

  const menuItems = [
    { id: "overview", label: "System Overview", icon: BarChart3 },
    { id: "pets", label: "Manage Pets", icon: Paw },
    { id: "users", label: "Manage Users", icon: Users },
    { id: "shelters", label: "Manage Shelters", icon: Home },
    { id: "vets", label: "Manage Veterinarians", icon: Users },
    { id: "records", label: "Medical Records", icon: Users },
    { id: "appointments", label: "Appointments", icon: Clock },
    { id: "donations", label: "Donations", icon: Heart },
    { id: "adoptions", label: "Adoption Requests", icon: Users },
  ]

  // Management tables component
  const ManagementTable = ({ title, columns, data }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <button className="bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-amber-700 transition">
          <Plus size={20} />
          Add New
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  {col}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition">
                {row.map((cell, i) => (
                  <td key={i} className="px-6 py-3 text-sm text-gray-700">
                    {cell}
                  </td>
                ))}
                <td className="px-6 py-3 text-sm flex gap-2">
                  <button className="text-blue-600 hover:bg-blue-50 p-2 rounded transition">
                    <Edit2 size={18} />
                  </button>
                  <button className="text-red-600 hover:bg-red-50 p-2 rounded transition">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${sidebarOpen ? "w-64" : "w-20"} bg-gray-900 text-white transition-all duration-300 min-h-screen`}
        >
          <div className="p-4 flex items-center justify-between">
            {sidebarOpen && <h2 className="text-xl font-bold">Admin Panel</h2>}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hover:bg-gray-800 p-2 rounded transition">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <nav className="mt-6">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition ${
                    activeTab === item.id ? "bg-amber-600 text-white" : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  <Icon size={20} />
                  {sidebarOpen && <span>{item.label}</span>}
                </button>
              )
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-3 text-gray-300 hover:text-white transition ${!sidebarOpen && "justify-center"}`}
            >
              <LogOut size={20} />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <header className="bg-white shadow-md p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <div className="text-right">
                <p className="text-gray-600">Welcome back!</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
          </header>

          <main className="p-6">
            {activeTab === "overview" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">System Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                  {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                      <div key={stat.label} className="bg-white rounded-lg shadow-md p-6">
                        <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                          <Icon size={24} />
                        </div>
                        <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {activeTab === "pets" && (
              <ManagementTable
                title="Manage Pets"
                columns={["Pet Name", "Breed", "Age", "Shelter", "Status"]}
                data={[
                  ["Max", "Golden Retriever", "2 years", "Central Shelter", "Available"],
                  ["Luna", "Siamese Cat", "1 year", "Downtown Shelter", "Available"],
                  ["Charlie", "Labrador", "3 years", "Central Shelter", "Adopted"],
                  ["Bella", "Poodle", "2 years", "North Shelter", "Available"],
                ]}
              />
            )}

            {activeTab === "users" && (
              <ManagementTable
                title="Manage Users"
                columns={["User Name", "Email", "Phone", "Joined Date", "Status"]}
                data={[
                  ["John Doe", "john@example.com", "+1 (555) 123-4567", "2024-01-15", "Active"],
                  ["Jane Smith", "jane@example.com", "+1 (555) 234-5678", "2024-02-20", "Active"],
                  ["Mike Johnson", "mike@example.com", "+1 (555) 345-6789", "2024-01-10", "Inactive"],
                ]}
              />
            )}

            {activeTab === "shelters" && (
              <ManagementTable
                title="Manage Shelters"
                columns={["Shelter Name", "Location", "Manager", "Phone", "Status"]}
                data={[
                  ["Central Shelter", "Downtown", "Sarah Wilson", "+1 (555) 111-2222", "Active"],
                  ["Downtown Shelter", "Midtown", "John Smith", "+1 (555) 222-3333", "Active"],
                  ["North Shelter", "North District", "Emily Brown", "+1 (555) 333-4444", "Active"],
                ]}
              />
            )}

            {activeTab === "adoptions" && (
              <ManagementTable
                title="Adoption Requests"
                columns={["Pet Name", "Requested By", "Date", "Status", "Notes"]}
                data={[
                  ["Max", "John Doe", "2024-11-18", "Pending", "Background check in progress"],
                  ["Bella", "Jane Smith", "2024-11-17", "Approved", "Ready for pickup"],
                  ["Rocky", "Mike Johnson", "2024-11-16", "Rejected", "Does not meet requirements"],
                ]}
              />
            )}

            {activeTab !== "overview" &&
              activeTab !== "pets" &&
              activeTab !== "users" &&
              activeTab !== "shelters" &&
              activeTab !== "adoptions" && (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <p className="text-gray-600 text-lg">
                    Management panel for {menuItems.find((m) => m.id === activeTab)?.label} coming soon...
                  </p>
                </div>
              )}
          </main>
        </div>
      </div>
    </div>
  )
}
