import { Link, useNavigate } from "@tanstack/react-router"
import { Button } from "./ui/button"
import { ModeToggle } from "./mode-toggle"
import { authClient } from "@/lib/auth-client"
import { Menu, X, Home, Dumbbell, History, Settings } from "lucide-react"
import { useState } from "react"

const Appbar = () => {
  const { data: session } = authClient.useSession();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Home', path: '/' },
    { icon: <Dumbbell className="w-5 h-5" />, label: 'Workouts', path: '/workouts' },
    { icon: <History className="w-5 h-5" />, label: 'History', path: '/history' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/settings' },
  ];

  const menuItems = (
    <>
      <div className="md:hidden space-y-6 text-center">
        {navigationItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-2 hover:bg-accent rounded-md transition-colors"
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
        <div className="h-px bg-border w-48 mx-auto" /> {/* Divider */}
      </div>

      <div className="flex md:flex-row flex-col items-center gap-4 md:gap-2">
        <ModeToggle />
        {session ? (
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <div className="flex items-center gap-3">
              <img 
                src={session.user?.image || "https://github.com/shadcn.png"} 
                alt="profile" 
                className="w-8 h-8 rounded-full"
              />
              <span className="md:hidden">{session.user?.name}</span>
            </div>
            <Button variant="outline" onClick={() => {
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    navigate({ to: "/login" });
                    setIsMenuOpen(false);
                  }
                }
              })
            }}>Logout</Button>
          </div>
        ) : (
          <Link 
            to="/login" 
            onClick={() => setIsMenuOpen(false)}
          >
            <Button variant="outline">
            Get started
              </Button>
          </Link>
        )}
        <Button 
          onClick={() => {
            window.location.href = "https://github.com/DeepanshuMishraa";
            setIsMenuOpen(false);
          }}
        >
          Github
        </Button>
      </div>
    </>
  );

  return (
    <nav className="relative border-b">
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold z-50">
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            ExerciseRight
          </span>
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          {menuItems}
        </div>

        <button 
          className="md:hidden z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-40 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {menuItems}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Appbar
