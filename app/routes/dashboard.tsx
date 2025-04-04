import { Button } from '@/components/ui/button'
import { AnalyseText } from '@/lib/actions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <div>
      <Button onClick={async () => {
        await AnalyseText({ data: 'Today i did 3 pushups and ate a banana and it felt good' });
      }}>
        click me
      </Button>
    </div>
  )
}
