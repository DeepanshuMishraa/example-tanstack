import { Button } from '@/components/ui/button'
import { convertSpeechToText } from '@/lib/client.action'
import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef } from 'react'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsProcessing(true)
    try {
      const text = await convertSpeechToText(file)
      console.log('Transcribed:', text)
    } catch (error) {
      console.error('Failed:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="p-4">
      <input 
        ref={fileInputRef}
        type="file" 
        accept="audio/*"
        onChange={handleFileUpload}
        className="hidden"
      />
      <Button 
        onClick={() => fileInputRef.current?.click()}
        disabled={isProcessing}
      >
        {isProcessing ? 'Processing...' : 'Upload Audio'}
      </Button>
    </div>
  )
}
