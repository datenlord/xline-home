import { createHashRouter } from 'react-router-dom'
import LayoutPage from './pages/Layout'
import HomePage from './pages/Home'
import ContributePage from './pages/Contribute'
import TestPage from './pages/Test'
import DocsPage from './pages/Docs'
import DeepDivePage from './pages/DeepDive'
import BlogListPage from './pages/BlogList'
import BlogDetailPage from './pages/BlogDetail'

export const router = createHashRouter([
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/contribute',
        element: <ContributePage />,
      },
      {
        path: '/blog',
        element: <BlogListPage />,
      },
      {
        path: '/blog/:msg',
        element: <BlogDetailPage />,
      },
      {
        path: '/docs/:params',
        element: <DocsPage />,
      },
      {
        path: '/deep-dive/:params',
        element: <DeepDivePage />,
      },
    ],
  },
  {
    path: 'test',
    element: <TestPage />,
  },
])
