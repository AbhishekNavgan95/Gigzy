import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Spinner from '@/components/Spinner';
import { MdVerified } from 'react-icons/md';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Slash } from 'lucide-react';
import useFetch from '@/hooks/use-fetch';
import { getJobDetails } from '@/api/jobsApi';
import ListApplications from '@/components/ListApplications';

const ApplicationListin = () => {

  const { user, isLoaded } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: jobData, error: jobError, loading: jobLoading, fn: fnGetJobDetails } = useFetch(getJobDetails, { jobId: id })

  useEffect(() => {
    if (id) {
      fnGetJobDetails();
    }
  }, [isLoaded])

  if (!isLoaded || jobLoading || !jobData) {
    return (
      <div className='min-h-screen flex items-center'>
        <Spinner />
      </div>
    )
  }

  if (isLoaded && jobData && jobData?.recruiter_id !== user?.id) {
    navigate(-1)
    return null;
  } else {
    return (
      <section className='container md:max-w-[750px] mx-auto pt-24 md:pt-28 py-12 px-3 '>

        {/* breadcrumb */}
        <Breadcrumb className='mb-6 text-xs md:text-base'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>

            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <BreadcrumbEllipsis className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className='flex flex-col items-center'>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/jobs/1">Explore</BreadcrumbLink>
                  </BreadcrumbItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>


            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/job/${jobData?.id}`}>{jobData?.title}</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Applications</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* header */}
        <div className='flex items-center gap-5'>
          <span className='shadow-lg rounded-lg border border-black-400 p-2 bg-white'>
            <img className='w-10 sm:w-14 rounded-lg object-cover' src={jobData?.company?.logo_url} alt="logo" />
          </span>
          <span className='justify-self-start'>
            <h4 className='flex gap-1 items-center'>{jobData?.company?.name} <MdVerified /></h4>
            <h2 className='text-2xl sm:text-3xl font-semibold'>{jobData?.title}</h2>
          </span>
        </div>

        {/* Applications Listing */}
        <ListApplications jobId={jobData?.id} />

      </section>
    )
  }
}

export default ApplicationListin