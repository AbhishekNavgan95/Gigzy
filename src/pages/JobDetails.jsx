import { getJobDetails } from '@/api/jobsApi';
import useFetch from '@/hooks/use-fetch';
import React, { useEffect, useState } from 'react'
import { FaBook, FaStar, FaStarHalfStroke } from 'react-icons/fa6';
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { Link, useLocation, useParams } from 'react-router-dom'
import { MdVerified } from "react-icons/md";
import MDEditor from '@uiw/react-md-editor';
import { updateJobStatus } from '@/api/jobsApi';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import ToolTip from '@/components/ToolTip';
import Apply from '@/components/Apply';
import { saveJob } from '@/api/saveJobApi';
import SaveJob from '@/components/SaveJob';
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

const JobDetails = () => {

  const { id } = useParams();
  const { isLoaded, user } = useUser()
  const { toast } = useToast();

  const { data: jobData, loading: jobDataLoading, fn: fnGetJobDetails } = useFetch(getJobDetails, { jobId: id });
  const { data: statusData, loading: loadingJobStatus, fn: fnUpdateJobStatus } = useFetch(updateJobStatus, { jobId: id });

  const handleStatusChange = async (val) => {
    const isOpen = val === "Active";
    const res = await fnUpdateJobStatus(isOpen);
    if (res) {
      toast({
        title: "Status updated successfully."
      })
      jobData.status = jobData.status === "Active" ? "Inactive" : "Active";
    }
  }

  useEffect(() => {
    if (id) fnGetJobDetails();
  }, [id, isLoaded]);

  if (jobDataLoading) return <div>Loading...</div>

  if (!jobDataLoading && !jobData) return <div>Data not found</div>

  return (
    <section className='container md:max-w-[740px] mx-auto pt-24 md:pt-28 py-12 px-3 '>

      <Breadcrumb className='mb-6'>
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
            <BreadcrumbPage>{jobData.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* header */}
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-8'>
        <div className='flex items-center gap-5'>
          <span className='shadow-lg rounded-lg border border-black-400 p-2 bg-white'>
            <img className='w-10 sm:w-14 rounded-lg object-cover' src={jobData?.company?.logo_url} alt="logo" />
          </span>
          <span className='justify-self-start'>
            <h4 className='flex gap-1 items-center'>{jobData?.company?.name} <MdVerified /></h4>
            <h2 className='text-2xl sm:text-3xl font-semibold'>{jobData?.title}</h2>
          </span>
        </div>
        {
          jobData.recruiter_id !== user.id && (
            <div className='flex flex-row-reverse md:flex-row items-center gap-3'>
              <SaveJob
                jobSaved={jobData?.saved_job?.some((job) => job.user_id === user.id)}
                job={jobData}
                user={user}
              />
              <Apply
                job={jobData}
                user={user}
                fetchJob={fnGetJobDetails}
                applied={jobData?.application?.find((j) => j.candidate_id === user.id)}
              />
            </div>
          )
        }
        {
          jobData.recruiter_id === user.id &&
          <Link state={jobData} to={`/job/${jobData.id}/applications/1`}>
            <Button>
              View Applications
            </Button>
          </Link>
        }
      </div>

      {/* status */}
      <div className='flex gap-3 mb-8'>
        <p className="flex items-center text-green-700 text-xs md:text-sm font-semibold bg-green-100 px-3 py-[2px] tracking-wide rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 mr-2 fill-current" viewBox="0 0 32 32">
            <path d="M18.12 27.76H7.7a2.653 2.653 0 0 1-2.65-2.65V5.55A2.653 2.653 0 0 1 7.7 2.9h15.25a2.653 2.653 0 0 1 2.65 2.65v14.71a.9.9 0 0 0 1.8 0V5.55a4.455 4.455 0 0 0-4.45-4.45H7.7a4.455 4.455 0 0 0-4.45 4.45v19.56a4.455 4.455 0 0 0 4.45 4.45h10.42a.9.9 0 0 0 0-1.8z" data-original="#000000" />
            <path d="M21.992 6.431H8.664a.9.9 0 0 0 0 1.8h13.328a.9.9 0 0 0 0-1.8zm.9 6.231a.9.9 0 0 0-.9-.9H8.664a.9.9 0 0 0 0 1.8h13.328a.9.9 0 0 0 .9-.9zM8.66 18.89h4.18a.9.9 0 0 0 0-1.8H8.66a.9.9 0 0 0 0 1.8zm0 5.33h4.54a.9.9 0 0 0 0-1.8H8.66a.9.9 0 0 0 0 1.8zm19.009.882-7.029-7.029a1.589 1.589 0 0 0-1.031-.463l-2.624-.153a1.593 1.593 0 0 0-1.68 1.679l.153 2.625c.022.389.187.755.463 1.031l7.029 7.029c.65.651 1.505.976 2.359.976s1.709-.325 2.359-.976a3.338 3.338 0 0 0 .001-4.719zm-10.553-5.834 2.309.135 5.316 5.315-2.174 2.174-5.316-5.316zm9.281 9.28a1.54 1.54 0 0 1-2.174 0l-.384-.384 2.174-2.174.384.384a1.54 1.54 0 0 1 0 2.174z" data-original="#000000" />
          </svg>
          {jobData?.employment_type}
        </p>

        <p className="flex items-center text-blue-700 text-xs md:text-sm font-semibold bg-blue-100 px-3 py-[2px] tracking-wide rounded-full">
          <span className='text-xs pr-2'>
            <FaBook />
          </span>
          {jobData?.education}
        </p>

        <p className="flex items-center text-orange-700 text-xs md:text-sm font-semibold bg-orange-100 px-3 py-[2px] tracking-wide rounded-full">
          <span className='text-xs pr-2'>
            <FaBook />
          </span>
          {jobData?.status === 'Active' ? 'Open' : 'Closed'}
        </p>
      </div>

      {
        jobData.recruiter_id === user.id &&
        <div className='mb-8'>
          {
            !jobDataLoading &&
            <div className="flex items-center space-x-2">
              <Switch
                id="airplane-mode"
                checked={jobData?.status === "Active"}
                onCheckedChange={() => handleStatusChange(jobData?.status === "Active" ? "Inactive" : "Active")}
              />
              <Label htmlFor="airplane-mode">Opening Status: {jobData.status === 'Active' ? 'Open' : 'Closed'}</Label>
            </div>
          }
        </div>
      }

      {/* details */}
      <div className='md:text-lg'>
        <p><span className='font-semibold'>Experience required:</span> {jobData?.experience_level || "N/A"}</p>
        <p><span className='font-semibold'>Salary range:</span> {jobData?.salary_range || "N/A"}</p>
        <p><span className='font-semibold'>Location:</span> {jobData?.city}, {jobData?.state}, {jobData?.country}</p>
      </div>

      {/* deascription */}
      <div>
        <h3 className='text-xl font-semibold mt-5'>Job Description</h3>
        <p className='mt-3'>{jobData?.description}</p>
      </div>

      {/* skills */}
      <div>
        <h3 className='text-xl font-semibold mt-5'>Skills</h3>
        <ul className='list-inside list-[circle] mt-3'>
          {jobData?.skills_required?.split(',').map((skill, index) => (
            <li key={index}>
              {skill}
            </li>
          ))}
        </ul>
      </div>

      {/* requirements */}
      <div className=''>
        <h3 className='text-xl font-semibold mt-5'>Requirements</h3>
        <MDEditor.Markdown source={jobData?.requirements}
          className='text-lg mt-3'
        />
      </div>

      {
        jobData?.company && (
          <div >
            <h3 className='text-xl font-semibold mt-5'>About {jobData?.company?.name}</h3>
            <p className='mt-3'>
              {jobData?.company?.description}
            </p>
          </div>
        )
      }

      {
        jobData?.benifits && (
          <div>
            <h3 className='text-xl font-semibold mt-5'>Benifits</h3>
            <ul className='pl-5 list-[circle] mt-3'>
              {
                jobData?.benifits?.split(',').map((ben, i) => (
                  <li key={i}>
                    {
                      ben
                    }
                  </li>
                ))
              }
            </ul>
          </div>
        )
      }

      {
        jobData?.name && jobData?.phone && (
          <div className='md:text-lg'>
            <h3 className='text-xl font-semibold mt-5'>Contact for more info</h3>
            <div className='mt-3'>
              <p >{jobData.name}</p>
              <a className='' href={`mailto:${jobData?.email}`}>{jobData?.email}</a>
              <p className='' href={`tel:${jobData.phone?.replaceAll(' ', '')}`}>{jobData.phone}</p>
            </div>
          </div>
        )
      }

    </section>
  )
}

export default JobDetails