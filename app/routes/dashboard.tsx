import { DatePicker } from '@/components/date-picker'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createFileRoute } from '@tanstack/react-router'
import { SendIcon } from 'lucide-react'

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
})



function Dashboard() {
  let exercise = [
    {
      analysis: "TODAY | Exercise: Pushups x3 (9 cal) | Food: Banana (105 cal, 27g carbs, 1.3g protein) | Duration: 2 mins",
    },
    {
      analysis: "TOMORROW | Exercise: Squats x5 (15 cal) | Food: Apple (95 cal, 25g carbs, 0.5g protein) | Duration: 3 mins",
    },
  ]
  return (
    <div>
      <div className='flex items-center justify-center p-4'>
        <DatePicker />
      </div>
      {exercise.length > 0 ? (
        <div className="flex flex-col gap-10 text-center items-center justify-center mt-10">
          {exercise.map((ex, index) => (
            <div key={index} className='space-y-2 p-2 rounded-lg hover:bg-gray-100/10 transition-colors'>
              <h1>{ex.analysis.split('|')[0]}</h1>
              <h2>{ex.analysis.split('|')[1]}</h2>
              <h3>{ex.analysis.split('|')[2]}</h3>
              <h4>{ex.analysis.split('|')[3]}</h4>
            </div>
          ))}
        </div>

      ) : (
        <div className='flex flex-col gap-10 text-center items-center justify-center  mt-10'>
          <div className='space-y-2'>
            <h1>All clear for today?</h1>
            <h2>Seems like you've been relaxing too much</h2>
          </div >

          <div className='flex flex-col space-y-2 items-center justify-center'>
            <h3 className='text-xl font-bold'>You did 0 workouts</h3>
            <h3 className='text-xl font-bold'>You ate 0 calories</h3>
          </div>

          <div>
            <img src="https://imgs.search.brave.com/vggxNn5i1WdT3e54wX8LFXrZrr9Kf4s8yHU6JLVAnsQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTMx/ODc4ODk2OS92ZWN0/b3IvYWJzdHJhY3Qt/aWxsdW1pbmF0ZWQt/YmFja2dyb3VuZC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/QmgtdDMzOXMwQm1D/WDJGZ3J5c1lzZGVD/MTdGNjRkVUozOWxn/RXNRQl94az0" alt="empty" className='w-[120px] h-[120px] rounded-xl' />
          </div>
        </div >
      )
      }
      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 p-4 flex'>
        <Input type="text" placeholder='what did you do today?' className='w-[350px] pr-16' />
        <Button variant='ghost' className='absolute right-4  top-1/2 -translate-y-1/2'>
          <SendIcon className='h-3 w-3' />
        </Button>
      </div>
    </div >
  )
}
