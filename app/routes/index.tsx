import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Mic, MessageSquare, Brain, Calendar } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <h1 className="text-5xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Track Your Fitness Journey
        </h1>
        <p className="text-xl text-center text-muted-foreground mb-8 max-w-2xl">
          Log your workouts and diet naturally - just speak or write, and let AI organize it for you
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full mb-12">
          <FeatureCard
            icon={<MessageSquare className="w-6 h-6" />}
            title="Natural Writing"
            description="Write your exercise and diet logs in your own words"
          />
          <FeatureCard
            icon={<Mic className="w-6 h-6" />}
            title="Voice Input"
            description="Simply speak about your workout, we'll handle the rest"
          />
          <FeatureCard
            icon={<Brain className="w-6 h-6" />}
            title="AI-Powered"
            description="Our AI structures and organizes your fitness data"
          />
          <FeatureCard
            icon={<Calendar className="w-6 h-6" />}
            title="Progress Tracking"
            description="View your fitness journey over time"
          />
        </div>
        <Link to="/dashboard">
          <Button
            size="default"
            variant="secondary"
            className="px-8 py-6 text-lg font-semibold"
          >
            Start Tracking Now
          </Button>
        </Link>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode,
  title: string,
  description: string
}) {
  return (
    <div className="p-6 rounded-lg border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-4 mb-3">
        {icon}
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
