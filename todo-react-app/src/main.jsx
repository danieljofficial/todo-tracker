import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { TasksContextProvider } from './Context/TaskContext.jsx'
import { AuthContextProvider } from './Context/AuthContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <TasksContextProvider>
        <App />
      </TasksContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
