import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { authservice } from "../main"
import toast from "react-hot-toast"
import type { User } from "../types"


const Home = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
      return
    }

    axios
      .get(`${authservice}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data)
        setLoading(false)
      })
      .catch(() => {
        toast.error("Session expired. Please login again.")
        localStorage.removeItem("token")
        navigate("/login")
      })
  }, [navigate])

  if (loading) {
    return (
      <div className="home-loading">
        <div className="spinner large" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-zooq-bg font-sans">
      <main className="flex-1">
        {/* Delivery Hero Section */}
        <section className="relative px-4 py-20 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          
          <div className="flex-1 space-y-8 z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-zooq-primary/10 px-4 py-2 text-sm font-bold text-zooq-primary border border-zooq-primary/20">
              <span className="flex h-2 w-2 rounded-full bg-zooq-primary shadow-[0_0_8px_#ffc200]"></span>
              Delivering near you
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9]">
              Craving <br/>
              <span className="text-zooq-primary">Something?</span>
            </h1>
            
            <p className="max-w-md text-lg text-zooq-text-muted">
              Welcome back, {user?.name?.split(" ")[0]}. Order from your favorite local restaurants and track your delivery in real-time.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="rounded-full bg-zooq-primary px-8 py-4 text-base font-bold text-black shadow-[0_4px_20px_rgba(255,194,0,0.3)] transition-all hover:bg-zooq-primary-hover hover:-translate-y-1">
                Order Now
              </button>
              <button className="rounded-full bg-zooq-surface px-8 py-4 text-base font-bold text-white border border-zooq-border transition-all hover:bg-white/5 hover:-translate-y-1">
                View Past Orders
              </button>
            </div>
          </div>

          {/* Abstract Food/App Illustration Area */}
          <div className="flex-1 relative w-full aspect-square max-w-md md:max-w-lg">
            <div className="absolute inset-0 bg-gradient-to-tr from-zooq-primary/20 to-transparent rounded-full blur-3xl"></div>
            <div className="relative h-full w-full rounded-3xl bg-zooq-surface border border-zooq-border p-8 flex flex-col gap-4 shadow-2xl transform rotate-3">
              {/* Mock App UI */}
              <div className="h-8 w-1/3 bg-white/10 rounded-lg"></div>
              <div className="h-48 w-full bg-white/5 rounded-2xl animate-pulse"></div>
              <div className="flex gap-4">
                <div className="h-16 w-16 bg-zooq-primary/20 rounded-xl"></div>
                <div className="flex-1 space-y-2 py-2">
                  <div className="h-4 w-3/4 bg-white/10 rounded"></div>
                  <div className="h-3 w-1/2 bg-white/5 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions Grid */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-zooq-border">
          <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-8">Quick Links</h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Action 1 */}
            <div className="group cursor-pointer rounded-2xl bg-zooq-surface border border-zooq-border p-6 transition-all hover:border-zooq-primary hover:bg-white/[0.03]">
              <div className="mb-4 text-4xl transform group-hover:scale-110 transition-transform">🍔</div>
              <h3 className="mb-2 text-xl font-bold text-white">Restaurants</h3>
              <p className="text-sm text-zooq-text-muted leading-relaxed">
                Browse hundreds of local restaurants delivering directly to your door.
              </p>
            </div>

            {/* Action 2 */}
            <div className="group cursor-pointer rounded-2xl bg-zooq-surface border border-zooq-border p-6 transition-all hover:border-zooq-primary hover:bg-white/[0.03]">
              <div className="mb-4 text-4xl transform group-hover:scale-110 transition-transform">🛵</div>
              <h3 className="mb-2 text-xl font-bold text-white">Live Tracking</h3>
              <p className="text-sm text-zooq-text-muted leading-relaxed">
                See exactly where your rider is with our real-time GPS tracking system.
              </p>
            </div>

            {/* Action 3 */}
            <div className="group cursor-pointer rounded-2xl bg-zooq-surface border border-zooq-border p-6 transition-all hover:border-zooq-primary hover:bg-white/[0.03]">
              <div className="mb-4 text-4xl transform group-hover:scale-110 transition-transform">⭐</div>
              <h3 className="mb-2 text-xl font-bold text-white">Favorites</h3>
              <p className="text-sm text-zooq-text-muted leading-relaxed">
                Reorder your usual meals in seconds securely saved to your account.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home