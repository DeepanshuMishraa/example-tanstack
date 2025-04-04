export const convertSpeechToText = async (file: File) => {
  const formData = new FormData()
  formData.append('audio', file)

  const response = await fetch('/api/transcribe', {
    method: 'POST',
    body: formData
  })

  if (!response.ok) {
    throw new Error('Failed to transcribe')
  }

  const data = await response.json()
  return data.text
}

export const convertTextToAnalysis = async (model: string, text: string) => {
  const formData = new FormData()
  formData.append('model', model)
  formData.append('text', text)

  const response = await fetch('/api/analyse', {
    method: 'POST',
    body: formData
  })

  if (!response.ok) {
    throw new Error('Failed to analyse')
  }

  const data = await response.json()
  return data.analysis
}
