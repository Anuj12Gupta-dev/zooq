import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { authservice } from "../main"
import toast from "react-hot-toast"
import { useGoogleLogin } from "@react-oauth/google"
import { useAppData } from "../context/AppContext"
import { FcGoogle } from "react-icons/fc"

const Login = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { setIsAuth, setUser } = useAppData()

  const responseGoogle = async (authResult: any) => {
    setLoading(true)
    try {
      const result = await axios.post(`${authservice}/api/auth/login`, {
        code: authResult["code"],
      })
      localStorage.setItem("token", result.data.token)
      if (result.data.user) {
        setUser(result.data.user)
      }
      setIsAuth(true)
      toast.success("Welcome to Zooq!")
      setLoading(false)
      navigate("/")
    } catch (error: any) {
      console.log(error)
      toast.error("Problem while logging in")
      setLoading(false)
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  })

  return (
    <div className="flex min-h-screen items-center justify-center bg-zooq-bg px-4 py-12 sm:px-6 lg:px-8">
      {/* Background radial gradient for focus and depth */}
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-zooq-primary/5 via-zooq-bg to-zooq-bg"></div>

      <div className="relative z-10 w-full max-w-md space-y-8 rounded-3xl border border-zooq-border bg-zooq-surface p-10 shadow-2xl">
        
        {/* Brand Header */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-zooq-primary text-3xl font-black text-black shadow-[0_0_20px_rgba(255,194,0,0.3)]">
            Z
          </div>
          <h2 className="mt-6 text-4xl font-black uppercase tracking-[-0.04em] text-white">
            zooq<span className="text-zooq-primary">.</span>
          </h2>
          <p className="mt-3 text-sm font-medium text-zooq-text-muted">
            Sign in to order your favorite food.
          </p>
        </div>

        {/* Action Button Area */}
        <div className="mt-8 space-y-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-zooq-surface px-4 font-semibold text-zooq-text-muted uppercase tracking-wider text-xs">
                Welcome Back
              </span>
            </div>
          </div>

          <button
            onClick={() => googleLogin()}
            disabled={loading}
            className="group relative flex w-full justify-center items-center gap-3 rounded-xl border border-white/10 bg-white/5 py-4 px-4 text-sm font-bold text-white transition-all hover:border-zooq-primary/50 hover:bg-white/10 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="spinner" />
            ) : (
              <FcGoogle className="h-6 w-6 transition-transform group-hover:scale-110" />
            )}
            <span className="tracking-wide">{loading ? "Signing in..." : "Continue with Google"}</span>
          </button>
        </div>

        {/* Footer Text */}
        <p className="mt-6 text-center text-xs font-medium text-zooq-text-muted/70 leading-relaxed">
          By continuing, you agree to our <br className="hidden sm:block" />
          <a href="#" className="text-white hover:text-zooq-primary transition-colors underline decoration-white/20 underline-offset-4">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-white hover:text-zooq-primary transition-colors underline decoration-white/20 underline-offset-4">Privacy Policy</a>
        </p>
      </div>
    </div>
  )
}

export default Login