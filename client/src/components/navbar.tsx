import { useEffect, useState } from "react";
import { useAppData } from "../context/AppContext";
import { Link, useLocation , useSearchParams } from "react-router-dom";

const Navbar = () => {
    const {isAuth , city , loadingLocation}  = useAppData();
    const currLocation = useLocation();

    const isHomePage = currLocation.pathname === "/";

    const [searchParams , setSearchParams] = useSearchParams() ;
    const [search , setSearch] = useState(searchParams.get("search") || "") ;

    useEffect(() => {
        const timer = setTimeout(() => {
            if(search) {
                setSearchParams({search}) ;
            } else {
                setSearchParams({}) ;
            }
        } , 400) ;
        return () => clearTimeout(timer) ;
    } , [search]) ;
    
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-zooq-bg/80 backdrop-blur-xl border-b border-zooq-border">
      {/* Brand */}
      <div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={() => {
            if (!isHomePage) {
                // Assuming we want to navigate home, though useNavigate isn't imported here.
                // For now, simple anchor tag behavior or just let it be a visual logo.
                window.location.href = "/";
            }
        }}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zooq-primary text-black font-black text-xl shadow-[0_0_15px_rgba(255,194,0,0.3)]">
          Z
        </div>
        <h1 className="text-2xl font-black tracking-tighter text-white">zooq<span className="text-zooq-primary">.</span></h1>
      </div>

      {/* Search & Actions */}
      <div className="flex items-center gap-4">
        {isHomePage && (
          <div className="relative flex items-center">
            {loadingLocation ? "Loading..." : city}
            <input 
              type="text" 
              placeholder="Search restaurants or food..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              className="w-full sm:w-64 md:w-80 px-4 py-2.5 rounded-xl bg-zooq-surface border border-zooq-border text-white text-sm placeholder:text-zooq-text-muted focus:outline-none focus:border-zooq-primary focus:ring-1 focus:ring-zooq-primary transition-all shadow-inner" 
            />
            {/* Optional search icon could go here */}
          </div>
        )}
        {isHomePage && (
          <button className="hidden sm:block px-5 py-2.5 rounded-xl bg-zooq-primary text-black font-bold text-sm shadow-[0_4px_14px_rgba(255,194,0,0.3)] transition-all hover:bg-zooq-primary-hover hover:-translate-y-0.5 active:scale-95">
            Search
          </button>
        )}
        <Link 
          to="/cart" 
          className="relative flex items-center justify-center h-10 w-10 rounded-xl bg-white/5 border border-white/10 text-white transition-all hover:bg-white/10 hover:border-zooq-primary/50 active:scale-95"
        >
          <span className="text-lg">🛒</span>
        </Link>
        {isAuth ? (
            <Link 
              to="/account"
              className="px-4 py-2 font-semibold text-sm text-zooq-text-muted transition-colors hover:text-white"
            >
              Account
            </Link>
        ) : (
            <Link 
              to="/login"
              className="px-4 py-2 font-semibold text-sm text-zooq-text-muted transition-colors hover:text-white"
            >
              Login
            </Link>
        )}
        
        
      </div>
    </nav>
  )
}

export default Navbar