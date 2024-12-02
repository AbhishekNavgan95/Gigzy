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
import ToolTip from './ToolTip'


const ListJobs = ({
    jobsData,
    isLoaded,
    user,
    loadingJobs,
    sortOption,
    openMenu,
    closeMenu,
    showMenu
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
            <div className='w-full flex justify-between items-center px-3'>
                <h4 className='sm:-text-base lg:text-lg xl:text-xl font-thin'>{data?.pagination && data?.pagination?.totalCount} Jobs results</h4>
                <ToolTip text={'filters'} >
                    <button onClick={showMenu ? closeMenu : openMenu} className='text-accent-600 font-semibold text-sm  lg:hidden'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#000000"} fill={"none"}>
                            <path d="M3 7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 17H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M18 17L21 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15 7L21 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 7C6 6.06812 6 5.60218 6.15224 5.23463C6.35523 4.74458 6.74458 4.35523 7.23463 4.15224C7.60218 4 8.06812 4 9 4C9.93188 4 10.3978 4 10.7654 4.15224C11.2554 4.35523 11.6448 4.74458 11.8478 5.23463C12 5.60218 12 6.06812 12 7C12 7.93188 12 8.39782 11.8478 8.76537C11.6448 9.25542 11.2554 9.64477 10.7654 9.84776C10.3978 10 9.93188 10 9 10C8.06812 10 7.60218 10 7.23463 9.84776C6.74458 9.64477 6.35523 9.25542 6.15224 8.76537C6 8.39782 6 7.93188 6 7Z" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M12 17C12 16.0681 12 15.6022 12.1522 15.2346C12.3552 14.7446 12.7446 14.3552 13.2346 14.1522C13.6022 14 14.0681 14 15 14C15.9319 14 16.3978 14 16.7654 14.1522C17.2554 14.3552 17.6448 14.7446 17.8478 15.2346C18 15.6022 18 16.0681 18 17C18 17.9319 18 18.3978 17.8478 18.7654C17.6448 19.2554 17.2554 19.6448 16.7654 19.8478C16.3978 20 15.9319 20 15 20C14.0681 20 13.6022 20 13.2346 19.8478C12.7446 19.6448 12.3552 19.2554 12.1522 18.7654C12 18.3978 12 17.9319 12 17Z" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                    </button>
                </ToolTip>
            </div>
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