import React from 'react'
import { useAppData } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Account = () => {
  const {user , setIsAuth} = useAppData()

  const firstLetter = user?.name.charAt(0).toUpperCase()

  const navigate = useNavigate()

  const logoutHandler = () => {
    localStorage.removeItem("token")
    setIsAuth(false)
    navigate("/login")
    toast.success("Logged out successfully")
  }

  return (
    <div className="min-h-screen bg-zooq-bg px-4 py-8 sm:px-6 lg:px-8 font-sans">
      <div className="mx-auto max-w-2xl mt-10">
        
        {/* Profile Header */}
        <div className="flex flex-col items-center justify-center p-8 bg-zooq-surface border border-zooq-border rounded-3xl shadow-xl mb-8">
          <div className="h-24 w-24 rounded-full bg-zooq-primary flex items-center justify-center text-black text-4xl font-black shadow-[0_0_20px_rgba(255,194,0,0.3)] mb-4">
            {firstLetter || "?"}
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">{user?.name || "Guest User"}</h2>
          <p className="text-sm text-zooq-text-muted mt-1 font-medium">{user?.email || "No email provided"}</p>
        </div>

        {/* Action Menu */}
        <div className="flex flex-col gap-3">
          
          <button className="flex items-center gap-4 w-full p-5 bg-zooq-surface border border-zooq-border rounded-2xl transition-all hover:border-white/20 hover:bg-white/[0.04] active:scale-[0.98] text-left">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-white/5 text-2xl">
              🧾
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white">Orders</h3>
              <p className="text-sm text-zooq-text-muted">View past and current orders</p>
            </div>
            <span className="text-zooq-text-muted">➔</span>
          </button>

          <button className="flex items-center gap-4 w-full p-5 bg-zooq-surface border border-zooq-border rounded-2xl transition-all hover:border-white/20 hover:bg-white/[0.04] active:scale-[0.98] text-left">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-white/5 text-2xl">
              📍
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white">Addresses</h3>
              <p className="text-sm text-zooq-text-muted">Manage your delivery locations</p>
            </div>
            <span className="text-zooq-text-muted">➔</span>
          </button>

          {/* Logout Button */}
          <button 
            onClick={logoutHandler}
            className="flex items-center gap-4 w-full p-5 mt-4 bg-zooq-surface border border-zooq-border rounded-2xl transition-all hover:border-red-500/50 hover:bg-red-500/10 active:scale-[0.98] text-left group"
          >
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-red-500/10 text-2xl text-red-500 group-hover:bg-red-500/20 transition-colors">
              🚪
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-500">Log out</h3>
              <p className="text-sm text-zooq-text-muted hidden sm:block">Sign out of your account</p>
            </div>
            <span className="text-red-500/50 group-hover:text-red-500 transition-colors">➔</span>
          </button>

        </div>
      </div>
    </div>
  )
}

export default Account