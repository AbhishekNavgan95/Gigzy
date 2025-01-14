import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom"
import AppLayout from "./layouts/AppLayout"
import LandingPage from "./pages/LandingPage"
import OnboardingPage from "./pages/OnboardingPage"
import JobListing from "./pages/JobListing"
import JobDetails from "./pages/JobDetails"
import CreateJob from "./pages/CreateJob"
import SavedJobs from "./pages/SavedJobs"
import MyJobs from "./pages/MyJobs"
import ApplicationListing from "./pages/ApplicationListing"
import { ThemeProvider } from "./components/ui/theme-provider"
import { ClerkProvider, Protect } from "@clerk/clerk-react"
import { dark, shadesOfPurple } from "@clerk/themes"
import ProtectedRoute from "./components/ProtectedRoute"
import Game from "./pages/Game"

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/play",
        element: <Game />,
      },
      {
        path: "/onboarding",
        element: <OnboardingPage />
      },
      {
        path: "/jobs/:page",
        element: <ProtectedRoute><JobListing /></ProtectedRoute>,
      },
      {
        path: "/job/:id",
        element: <ProtectedRoute><JobDetails /></ProtectedRoute>,
      },
      {
        path: "/job/:id/applications/:page",
        element: <ProtectedRoute><ApplicationListing /></ProtectedRoute>,
      },
      {
        path: "/post-job",
        element: <ProtectedRoute><CreateJob /></ProtectedRoute>
      },
      {
        path: "/saved-jobs",
        element: <ProtectedRoute><SavedJobs /></ProtectedRoute>
      },
      {
        path: "/my-jobs",
        element: <ProtectedRoute><MyJobs /></ProtectedRoute>
      }
    ]
  },
])


function App() {

  return (
    <>
      <ClerkProvider appearance={{ baseTheme: dark }} publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </ClerkProvider>
    </>
  )
}

export default App
