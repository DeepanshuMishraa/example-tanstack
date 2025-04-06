import { DatePicker } from '@/components/date-picker'
import { EmptyState } from '@/components/EmptyState'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useExercises } from '@/hooks/use-exercises'
import { AnalyseText } from '@/lib/actions'
import { createFileRoute } from '@tanstack/react-router'
import { Loader2, SendIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: exercises = [], isLoading, isError, error } = useExercises();

  const handleSubmit = async () => {
    if (!info.trim()) return;

    try {
      setLoading(true);
      await AnalyseText({
        data: {
          text: info
        }
      });
      setInfo("");
      toast.success("Logged");
    } catch (err) {
      toast.error("Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (isLoading) {
    return <div className="fixed inset-0 grid place-items-center"><Loader2 className="animate-spin w-6 h-6" /></div>
  }

  if (isError) {
    return <div className="fixed inset-0 grid place-items-center text-sm">Failed to load</div>
  }

  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-6 relative">
      {/* Minimalist date picker */}
      <div className="mx-auto mb-6">
        <DatePicker />
      </div>

      {/* Content area */}
      <div className="flex-1 w-full max-w-screen-md mx-auto">
        {exercises.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="p-3 rounded bg-muted/40 hover:bg-muted/70 transition-colors border border-border/40 hover:border-border"
              >
                <p className="text-sm font-medium line-clamp-2">{exercise.info}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(exercise.time).toLocaleString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-32">
            <EmptyState />
          </div>
        )}
      </div>

      {/* Fixed input at bottom */}
      <div className="fixed bottom-0 inset-x-0 p-4 bg-background">
        <div className="max-w-md mx-auto flex gap-2">
          <Input
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What did you do today?"
            className="flex-1 bg-muted/30 border-border/30 focus-visible:ring-1 h-10"
          />
          <Button
            onClick={handleSubmit}
            disabled={loading || !info.trim()}
            size="sm"
            variant="ghost"
            className="h-10 w-10 p-0 rounded-full bg-primary/10 hover:bg-primary/20"
          >
            {loading ?
              <Loader2 className="h-4 w-4 animate-spin" /> :
              <SendIcon className="h-4 w-4" />
            }
          </Button>
        </div>
      </div>
    </div>
  )
}
