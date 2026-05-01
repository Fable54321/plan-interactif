import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '../src/100--App/App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Plan from './110--Plan/Plan'



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Plan />,
      },
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
