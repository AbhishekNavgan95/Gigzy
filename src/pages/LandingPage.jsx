import CompanyCarosal from '@/components/CompanyCarosal'
import HeroSection from '@/components/HeroSection'
import StepsInvovled from '../components/StepsInvolved'
import Accordian from '../components/Accordian'
import React, { useEffect } from 'react'
import HighLights from '@/components/HighLights'
import PostJob from '@/components/PostJob'
import Footer from '../components/Footer'
import Testimonials from '@/components/Testimonials'
import { useUser } from '@clerk/clerk-react'
import { useToast } from "../hooks/use-toast"
import { useNavigate, useSearchParams } from 'react-router-dom'
import OnboardingPage from './OnboardingPage'
import { Button } from '@/components/ui/button'

const LandingPage = () => {

  const { isLoaded, user, isSignedIn } = useUser();
  const { toast } = useToast()
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (isLoaded && isSignedIn && user?.unsafeMetadata?.role === undefined && searchParams.get('setup') !== 'true') {
      toast({
        title: "Please complete your account setup ",
        description: "",
        duration: 5000,
        action: (
          <Button onClick={() => setSearchParams({ setup: 'true' })} variant='default'>
            Start
          </Button>
        ),
      })
    }
  }, [isLoaded, user, isSignedIn])

  return (
    <section className='bg-backgroundColor-default min-h-screen'>

      <OnboardingPage />

      <HeroSection />

      <CompanyCarosal />

      <StepsInvovled />

      <HighLights />

      <Accordian />

      <PostJob />

      <Testimonials />

      <Footer />

    </section>
  )
}

export default LandingPage