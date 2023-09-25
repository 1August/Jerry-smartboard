import { createBrowserRouter, RouteObject } from 'react-router-dom'
import { BaseLayout } from '@/layouts'
import { Home } from '@/pages/Home'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { User } from '@/pages/User'
import { Login } from '@/pages/Login'
import { Signup } from '@/pages/Signup'

const routes: RouteObject[] = [
  {
    path: '/auth',
    children: [
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/user',
        element: <ProtectedRoute />,
        children: [
          {
            path: ':id',
            element: <User />,
          },
        ],
      },
      {
        path: '*',
        element: <h1>404 Not Found</h1>,
      },
    ],
  },
]

export const router = createBrowserRouter(routes, {
  future: {
    // Normalize `useNavigation()`/`useFetcher()` `formMethod` to uppercase
    v7_normalizeFormMethod: true,
  },
})
