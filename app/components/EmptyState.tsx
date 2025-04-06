import { Card, CardContent } from '@/components/ui/card'

export function EmptyState() {
  return (
    <Card className="mx-auto max-w-md mt-12">
      <CardContent className="flex flex-col gap-8 text-center items-center py-12">
        <div className='space-y-2'>
          <h1 className="text-xl font-bold">All clear for today?</h1>
          <p className="text-gray-500">Seems like you've been relaxing too much</p>
        </div>

        <div className='flex flex-col space-y-2 items-center justify-center'>
          <h3 className='text-xl font-bold'>You did 0 workouts</h3>
          <h3 className='text-xl font-bold'>You ate 0 calories</h3>
        </div>

        <div className="mt-4">
          <img
            src="https://imgs.search.brave.com/vggxNn5i1WdT3e54wX8LFXrZrr9Kf4s8yHU6JLVAnsQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTMx/ODc4ODk2OS92ZWN0/b3IvYWJzdHJhY3Qt/aWxsdW1pbmF0ZWQt/YmFja2dyb3VuZC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/QmgtdDMzOXMwQm1D/WDJGZ3J5c1lzZGVD/MTdGNjRkVUozOWxn/RXNRQl94az0"
            alt="No exercises found"
            className='w-[120px] h-[120px] rounded-xl'
          />
        </div>
      </CardContent>
    </Card>
  )
}
