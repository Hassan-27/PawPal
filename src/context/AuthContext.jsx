"use client"

import { createContext, useState, useContext } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  const login = (email, password, role) => {
    setUser({ email })
    setIsAdmin(role === "admin")
  }

  const logout = () => {
    setUser(null)
    setIsAdmin(false)
  }

  return <AuthContext.Provider value={{ user, isAdmin, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
