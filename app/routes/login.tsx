import AuthCard from '@/components/AuthCard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: LoginComponent,
})

function LoginComponent() {

  return (
    <div className='flex items-center justify-center h-[30rem]'>
      <AuthCard />
    </div>
  )
}
