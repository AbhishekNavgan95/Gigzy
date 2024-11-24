import useFetch from '@/hooks/use-fetch'
import { getJobs } from '@/api/jobsApi'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import JobCard from '@/components/JobCard'
import SearchFilter from '@/components/SearchFilter'
import Spinner from '@/components/Spinner'
import { getCompanies } from '@/api/companyApi'
import JobFilters from '@/components/JobFilters'

const JobListing = () => {

  const { isLoaded, user } = useUser()
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [company_id, setCompany_id] = useState('');
  const [companies, setCompanies] = useState([]);

  const {
    data: jobs,
    loading: loadingJobs,
    fn: fnJobs,
  } = useFetch(getJobs, { location, company_id, searchQuery });

  const {
    data: companiesData,
    loading: companyDataLoading,
    fn: fnGetCompanies
  } = useFetch(getCompanies);

  useEffect(() => {
    if (!isLoaded) return

    fnGetCompanies();
  }, [isLoaded])

  useEffect(() => {
    if (!isLoaded) return

    fnJobs()
  }, [isLoaded, location, company_id, searchQuery])

  return (
    <section className='pt-20 bg-backgroundColor-default'>
      <div className='py-20 border-y gradient-bg bg-white'>

        <div className='container px-3 mx-auto relative z-[2]'>
          <h1 className='text-4xl text-center md:text-start font-semibold text-accent-600'>Find Your Dream Job</h1>
          <p className='text-base text-center mx-auto md:mx-0 w-[90%] md:text-start md:text-xl mt-3 text-black-600'>Looking for a perfect job? Browse through latest job openings and apply with just few clicks.</p>
        </div>

      </div>
      <div className='flex items-start py-10 gap-10 container mx-auto'>

        <JobFilters companies={companiesData} companyDataLoading={companyDataLoading} setCompany_id={setCompany_id} company_id={company_id} />

        <div className='container mx-auto'>

          <SearchFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} location={location} setLocation={setLocation} />

          {
            loadingJobs || !isLoaded && (
              <span className='min-h-[400px] flex items-center justify-center '>
                <Spinner />
              </span>
            )
          }
          {
            jobs && jobs.length > 0 && loadingJobs === false && (
              <>
                <h4 className='text-xl font-thin px-3 py-3'>{jobs && jobs.length} Jobs results</h4>
                <div className='flex flex-col gap-3'>
                  {
                    jobs.map((job) => {
                      return (
                        <div key={job.id}>
                          <JobCard job={job} saved={job?.saved_job?.some((e) => e.user_id === user.id)} />
                        </div>
                      )
                    })
                  }
                </div>
              </>
            )}
          {
            jobs && jobs.length === 0 && loadingJobs === false && <p>No jobs found</p>
          }
        </div>
      </div>
    </section>
  )
}

export default JobListing