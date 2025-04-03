import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl mb-6 font-bold">Welcome to ExerciseRight</h1>
        <p className="text-lg mb-8">Get Personalised AI Coach</p>
        <Button
          variant="outline"
          size="lg"
          className="px-6 py-3 text-lg cursor-pointer font-semibold"
        >
          Get Started
        </Button>

      </div>
    </div>
  )
}
