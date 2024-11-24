import React from 'react'
import JobCard from '@/components/JobCard'
import DataNotFound from '@/components/DataNotFound'
import Spinner from './Spinner'

const ListJobs = ({ jobs, isLoaded, loadingJobs, sortOption }) => {
    return (
        <>
            {
                loadingJobs || !isLoaded && (
                    <span className='min-h-[400px] w-full flex items-center justify-center '>
                        <Spinner />
                    </span>
                )
            }
            {
                jobs && jobs.length > 0 && loadingJobs === false && (
                    <>
                        <h4 className='text-xl font-thin px-3'>{jobs && jobs.length} Jobs results</h4>
                        <div className='flex flex-col gap-3 w-full'>
                            {
                                jobs.slice().sort((a, b) => {
                                    if (sortOption === 'date') {
                                        return new Date(b.created_at) - new Date(a.created_at)
                                    } else {
                                        return 0
                                    }
                                }).map((job) => {
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
                jobs && jobs.length === 0 && loadingJobs === false && <DataNotFound />
            }</>
    )
}

export default ListJobs