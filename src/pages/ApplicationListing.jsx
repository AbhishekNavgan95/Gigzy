import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import ApplicationCard from '@/components/ApplicationCard';
import { MdVerified } from 'react-icons/md';
import { IoIosArrowBack } from "react-icons/io";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
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
import { applicationStatus } from '@/data/staticData';
import useFetch from '@/hooks/use-fetch';
import { fetchApplications, updateApplicationStatus } from '@/api/applicationApi';

const ApplicationListin = () => {
  const { user, isLoaded } = useUser();
  const [status, setStatus] = useState('');
  const location = useLocation();
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [updateList, setUpdateList] = useState([]);
  const jobData = location.state;
  const { data, error, loading, fn: fnUpdateApplicationStatus } = useFetch(updateApplicationStatus);
  const { data: applications, loading: applicationLoading, fn: fnFetchApplications } = useFetch(fetchApplications, { jobId: jobData.id })

  useEffect(() => {
    fnFetchApplications();
  }, [jobData, isLoaded])

  useEffect(() => {
    handleStatusChange(status)
  }, [status])

  const handleStatusChange = async (value) => {
    if (updateList.length === 0 && status !== '') {
      toast({
        title: 'No application selected',
        status: 'warning',
        duration: 3000,
      });
      setStatus('')
    }
    else if (value) {
      try {
        const res = await fnUpdateApplicationStatus(updateList, value);

        if (res) {
          res.forEach((updatedApp) => {
            const appIndex = applications.findIndex((a) => a.id === updatedApp.id);
            if (appIndex !== -1) {
              applications[appIndex].status = updatedApp.status;
            }
          });

          toast({
            title: 'Application status updated successfully',
            status: 'success',
            duration: 3000,
          });

          setStatus('');
          setUpdateList([]);
        }
      } catch (error) {
        console.error('Error updating application status: ', error);
        toast({
          title: 'Failed to update application status',
          status: 'error',
          duration: 3000,
        });
      }
    }
  };

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
      <section className='container md:max-w-[750px] mx-auto pt-24 md:pt-28 py-12 px-3 '>

        <Breadcrumb className='mb-6 text-xs md:text-base'>
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

        <div className='flex justify-start gap-3 sticky top-0 bg-white py-5'>
          <Select value={status} onValueChange={(value) => setStatus(value)} id='education-level' className=''>
            <SelectTrigger className="md:w-max bg-accent-600 h-8 text-black-50 text-xs md:text-sm sm:text-base">
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent >
              <SelectGroup>
                {
                  applicationStatus?.map((e, index) => (
                    <SelectItem key={e + index} value={e}>{e}</SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className='mb-5 flex flex-col gap-5 px-1'>
          {
            applications && applications.map((app) => (
              <ApplicationCard setUpdateList={setUpdateList} updateList={updateList} key={app?.id} app={app} />
            ))
          }
        </div>
      </section>
    )
  }
}

export default ApplicationListin