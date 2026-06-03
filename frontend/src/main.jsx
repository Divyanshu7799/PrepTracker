import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QuestionsProvider } from "./context/QuestionsContext";
import App from './App.jsx'
import "./index.css"

createRoot(document.getElementById('root')).render(
<QuestionsProvider>
  <App />
</QuestionsProvider>
)
