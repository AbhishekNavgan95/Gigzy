import useFetch from '@/hooks/use-fetch'
import { getJobs } from '@/api/jobsApi'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import SearchFilter from '@/components/SearchFilter'
import Spinner from '@/components/Spinner'
import { getCompanies } from '@/api/companyApi'
import JobFilters from '@/components/JobFilters'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import ListJobs from '@/components/ListJobs'

const JobListing = () => {

  const { isLoaded, user } = useUser()
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [company_id, setCompany_id] = useState('');
  const [sortOption, setSortOption] = useState('relevence')
  const [jobType, setJobType] = useState('')
  const [showInActiveJobs, setShowInActiveJobs] = useState(false)
  const [industries, setIndustries] = useState([])
  const [education, setEducation] = useState([])

  const {
    data: jobs,
    loading: loadingJobs,
    fn: fnJobs,
  } = useFetch(getJobs, { location, company_id, searchQuery, jobType, showInActiveJobs, industries, education });

  const {
    data: companiesData,
    loading: companyDataLoading,
    fn: fnGetCompanies
  } = useFetch(getCompanies);

  useEffect(() => {
    if (!isLoaded) return
    if (isLoaded && !user) {
      navigate('/?sign-in=true')
      toast({
        title: 'Please Sign-in!'
      })
    }

    fnGetCompanies();
  }, [isLoaded])

  useEffect(() => {
    if (!isLoaded) return

    fnJobs()
  }, [isLoaded, location, company_id, searchQuery, jobType, showInActiveJobs, industries, education])

  // console.log("user : ", user);

  return (
    <section className='pt-20 px-3 bg-backgroundColor-default min-h-screen'>

      {/* header */}
      <div className='py-10 lg:py-20 border-y grid-background'>
        <div className='container px-3 mx-auto relative z-[2] flex flex-col lg:flex-row items-center w-full gap-y-5 gap-x-10'>
          <span className='w-full'>
            <h1 className='text-4xl text-center lg:text-start font-semibold text-accent-600'>Find Your Dream Job</h1>
            <p className='text-base text-center mx-auto md:mx-0 w-[90%] lg:text-start lg:text-xl mt-3 text-black-600'>Looking for a perfect job? Browse through latest job openings and apply with just few clicks.</p>
          </span>
          {
            isLoaded && user?.unsafeMetadata?.role === 'recruiter' &&
            <span className='w-max'>
              <Button>Post a Job</Button>
            </span>
          }
        </div>
      </div>


      <div className='flex items-start flex-col lg:flex-row py-5 md:py-10 gap-5 lg:gap-10 container mx-auto'>

        {/* filters */}
        <JobFilters
          education={education}
          setEducation={setEducation}
          industries={industries}
          setIndustries={setIndustries}
          showInActiveJobs={showInActiveJobs}
          setShowInActiveJobs={setShowInActiveJobs}
          jobType={jobType}
          setJobType={setJobType}
          companies={companiesData}
          companyDataLoading={companyDataLoading}
          setCompany_id={setCompany_id}
          company_id={company_id}
        />

        <div className='w-full flex flex-col gap-y-3'>

          {/* search filters */}
          <SearchFilter sortOption={sortOption} setSortOption={setSortOption} searchQuery={searchQuery} setSearchQuery={setSearchQuery} location={location} setLocation={setLocation} />

          {/* jobs list */}
          <ListJobs jobs={jobs} isLoaded={isLoaded} loadingJobs={loadingJobs} sortOption={sortOption} />
        </div>
      </div>
    </section>
  )
}

export default JobListing