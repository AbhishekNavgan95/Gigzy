import { useState } from 'react'
import React, { useEffect } from 'react'
import JobCard from '@/components/JobCard'
import DataNotFound from '@/components/DataNotFound'
import Spinner from './Spinner'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


const ListJobs = ({
    jobsData,
    isLoaded,
    user,
    loadingJobs,
    sortOption,
}) => {

    const [data, setData] = useState({
        jobs: [],
        pagination: {}
    })

    useEffect(() => {
        if (jobsData) {
            setData({
                jobs: jobsData?.data,
                pagination: jobsData?.pagination
            })
        }
    }, [jobsData])

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
                data?.jobs && data?.jobs?.length > 0 && loadingJobs === false && (
                    <>
                        <h4 className='text-xl font-thin px-3'>{data?.pagination && data?.pagination?.totalCount } Jobs results</h4>
                        <div className='flex flex-col gap-3 w-full'>
                            {
                                isLoaded && data.jobs.map((job) => {
                                    return (
                                        <div key={job.id}>
                                            <JobCard job={job} saved={job?.saved_job?.some((e) => e?.user_id === user?.id)} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </>
                )}
            {
                data?.jobs && data?.jobs.length === 0 && loadingJobs === false && <DataNotFound />
            }

            <div className='lg:self-end'>
                <PaginationSection paginationData={data?.pagination} />
            </div>
        </>
    )
}

const PaginationSection = ({
    paginationData
}) => {

    return (
        <Pagination>
            <PaginationContent>
                {
                    paginationData?.currentPage > 1 && (
                        <>
                            <PaginationItem>
                                <PaginationPrevious href={`/jobs/${paginationData?.currentPage - 1}`} />
                            </PaginationItem>
                        </>
                    )
                }

                {
                    paginationData?.totalPages > 0 && Array.from({ length: paginationData?.totalPages }, (_, index) => index + 1).map((page) => {
                        return (
                            <PaginationItem key={page}>
                                <PaginationLink isActive={page === paginationData?.currentPage} href={`/jobs/${page}`}>{page}</PaginationLink>
                            </PaginationItem>
                        )
                    })
                }

                {
                    paginationData?.currentPage < paginationData?.totalPages && (
                        <>
                            <PaginationItem>
                                <PaginationNext href={`/jobs/${Number(paginationData?.currentPage) + 1}`} />
                            </PaginationItem>
                        </>
                    )
                }
            </PaginationContent>
        </Pagination>
    )
}

export default ListJobs