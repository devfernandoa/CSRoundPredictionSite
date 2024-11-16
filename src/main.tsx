import { createRoot } from 'react-dom/client'
import { useState } from 'react'
import './index.css'
import App from './App.tsx'
import Text from './Text.tsx'

function Root() {
  const [prediction, setPrediction] = useState<string | null>(null)

  return (
    <div className="flex space-x-8">
      <Text prediction={prediction} />
      <App onPredictionChange={setPrediction} />
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<Root />)