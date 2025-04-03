import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to ExerciseRight</h1>
        <p className="text-lg mb-8">Get Personalised AI Coach</p>
        <Button
          variant="outline"
          size="lg"
          className="px-6 py-3 text-lg font-semibold"
        >
          Get Started
        </Button>

      </div>
    </div>
  )
}
