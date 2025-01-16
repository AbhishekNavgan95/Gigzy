import { useUser } from '@clerk/clerk-react'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {

    const { isSignedIn, user, isLoaded } = useUser()
    const { pathName } = useLocation()

    if (isLoaded && !isSignedIn !== undefined && !isSignedIn) return (
        <Navigate to={`/?sign-in=true`} />
    )

    if(user !== undefined && !user?.unsafeMetadata?.role && pathName !== '/onboarding') return (
        <Navigate to={`/?setup=true`} />
    )

    return children
}

export default ProtectedRoute