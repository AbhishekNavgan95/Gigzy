import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import ApplicationCard from '@/components/ApplicationCard';
import { MdVerified } from 'react-icons/md';
import { IoIosArrowBack } from "react-icons/io";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Slash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ApplicationListin = () => {
  const { user, isLoaded } = useUser();
  const location = useLocation();
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  const jobData = location.state;

  if (!isLoaded) {
    return (
      <div className='min-h-screen flex items-center'>
        <Spinner />
      </div>
    )
  }

  if (isLoaded && jobData?.recruiter_id !== user?.id) {
    navigate(-1)
    return null;
  } else {
    return (
      <section className='container md:max-w-[740px] mx-auto pt-24 md:pt-28 py-12 px-3 '>

        <Breadcrumb className='mb-7'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/jobs/1">Explore</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/job/${jobData.id}`}>{jobData.title}</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Applications</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className='flex items-center gap-5'>
          <span className='shadow-lg rounded-lg border border-black-400 p-2 bg-white'>
            <img className='w-10 sm:w-14 rounded-lg object-cover' src={jobData?.company?.logo_url} alt="logo" />
          </span>
          <span className='justify-self-start'>
            <h4 className='flex gap-1 items-center'>{jobData?.company?.name} <MdVerified /></h4>
            <h2 className='text-2xl sm:text-3xl font-semibold'>{jobData?.title}</h2>
          </span>
        </div>
        <div className='my-10 flex flex-col gap-5'>
          {
            jobData?.application && jobData.application.map((app) => (
              <ApplicationCard key={app?.id} app={app} />
            ))
          }
        </div>
      </section>
    )
  }
}

export default ApplicationListin