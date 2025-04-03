import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

interface User {
  name: string;
}

function getUser(): Promise<User> {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({ name: "John" })
    }, 2000);
  })
}

function RouteComponent() {
  const { data, isLoading, error } = useQuery({ queryKey: ['user'], queryFn: getUser })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data) return <div>No data</div>
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1>{data.name}</h1>
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
