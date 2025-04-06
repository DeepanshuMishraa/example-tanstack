import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { authClient } from "@/lib/auth-client"
import { DamIcon } from "lucide-react";
import { FaGoogle } from "react-icons/fa"
import { useNavigate } from "@tanstack/react-router";

export default function AuthCard() {

  const navigate = useNavigate()


  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/'
      });
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };


  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="w-[320px] overflow-hidden backdrop-blur-sm bg-card/80 border border-border/50 shadow-xl">
        <CardContent className="p-6 flex flex-col items-center space-y-6">
          <motion.div
            className="space-y-2 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-xl font-medium tracking-tight">Welcome back</h2>
            <p className="text-sm text-muted-foreground">Sign in to continue</p>
          </motion.div>

          <motion.div className="w-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              className="w-full relative overflow-hidden group transition-all duration-200"
              onClick={async () => {
                await authClient.oneTap({
                  fetchOptions: {
                    onSuccess: () => {
                      navigate({ to: "/dashboard" })
                    }
                  }
                })
              }}
            >
              <div className="absolute inset-0 w-0 bg-gradient-to-r from-background to-muted-foreground/10 group-hover:w-full transition-all duration-300 opacity-20" />
              <div className="flex items-center justify-center gap-2 relative z-10">
                <FaGoogle className="h-4 w-4" />
                Continue with Google
              </div>
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

