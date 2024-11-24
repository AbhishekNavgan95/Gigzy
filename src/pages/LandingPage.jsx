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
import { Toast, ToastAction } from '@/components/ui/toast'
import { useToast } from "../hooks/use-toast"
import { useNavigate } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";


const LandingPage = () => {

  const { isLoaded, user, isSignedIn } = useUser();
  const { toast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoaded && isSignedIn && user?.unsafeMetadata?.role === undefined) {
      toast({
        title: "Please complete your account setup ",
        description: "",
        action: (
          <button onClick={() => navigate('/onboarding')}
          >
            <ToastAction altText="Goto schedule to undo"><FaArrowRight /></ToastAction>
          </button>
        ),
      })
    }
  }, [isLoaded, user, isSignedIn])

  return (
    <section className='bg-backgroundColor-default min-h-screen'>

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