import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Button } from "./components/ui/button"
import AppLayout from "./layouts/AppLayout"
import LandingPage from "./pages/LandingPage"
import OnboardingPage from "./pages/OnboardingPage"
import JobListing from "./pages/JobListing"
import JobDetails from "./pages/JobDetails"
import CreateJob from "./pages/CreateJob"
import SavedJobs from "./pages/SavedJobs"
import MyJobs from "./pages/MyJobs"
import { ThemeProvider } from "./components/ui/theme-provider"
import { ClerkProvider, Protect } from "@clerk/clerk-react"
import { dark, shadesOfPurple } from "@clerk/themes"
import ProtectedRoute from "./components/ProtectedRoute"

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
        path: "/onboarding",
        element: <OnboardingPage />
      },
      {
        path: "/jobs/:page",
        element: <ProtectedRoute><JobListing /></ProtectedRoute>,
      },
      {
        path: "/job/:id",
        element: <JobDetails />,
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
