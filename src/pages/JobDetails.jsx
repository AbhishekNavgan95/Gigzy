import { getJobDetails } from '@/api/jobsApi';
import useFetch from '@/hooks/use-fetch';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const JobDetails = () => {

  const { id } = useParams();

  const { 
    data: jobData, 
    loading: jobDataLoading, 
    fn: fnGetJobDetails 
  } = useFetch(getJobDetails, { jobId: id });

  console.log("jobData : ", jobData);  

  useEffect(() => {
    if (!id) return; 
    fnGetJobDetails(id); 
  }, [id]);

  return (
    <div>
      
      

    </div>
  )
}

export default JobDetails