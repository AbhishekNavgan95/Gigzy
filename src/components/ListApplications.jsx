import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ApplicationCard from '@/components/ApplicationCard';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useToast } from '@/hooks/use-toast';
import { applicationStatus } from '@/data/staticData';
import useFetch from '@/hooks/use-fetch';
import { fetchApplications, updateApplicationStatus } from '@/api/applicationApi';
import Spinner from './Spinner';
import DataNotFound from './DataNotFound';

const ListApplications = ({ }) => {

    const { toast } = useToast();
    const { page: currentPage, id } = useParams();

    const [page, setPage] = useState(Number(currentPage))
    const [status, setStatus] = useState('');
    const [updateList, setUpdateList] = useState([]);
    const limit = 10

    const { data, error, loading, fn: fnUpdateApplicationStatus } = useFetch(updateApplicationStatus);
    const { data: applicationData, loading: applicationLoading, fn: fnFetchApplications } = useFetch(fetchApplications, { jobId: id })

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
                        const appIndex = applicationData?.data?.findIndex((a) => a.id === updatedApp.id);
                        if (appIndex !== -1) {
                            applicationData.data[appIndex].status = updatedApp?.status;
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

    useEffect(() => {
        fnFetchApplications(page, limit);
    }, [page])

    useEffect(() => {
        fnFetchApplications(page, limit);
    }, [id])

    useEffect(() => {
        handleStatusChange(status)
    }, [status])

    if (applicationLoading) {
        return (
            <span className='min-h-[400px] w-full flex items-center justify-center '>
                <Spinner />
            </span>
        )
    }

    return (
        <>
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

            {
                (!applicationLoading && applicationData?.data?.length === 0)
                    ? (
                        <DataNotFound />
                    ) : (
                        <div className='mb-5 flex flex-col gap-5 px-1'>
                            {
                                applicationData?.data && applicationData?.data.map((app) => (
                                    <ApplicationCard setUpdateList={setUpdateList} updateList={updateList} key={app?.id} app={app} />
                                ))
                            }
                        </div>
                    )
            }


            <div className='lg:self-end'>
                <PaginationSection setPage={setPage} page={page} jobId={id} paginationData={applicationData?.pagination} />
            </div>
        </>
    )
}

const PaginationSection = ({
    paginationData,
    jobId,
    page,
    setPage,
}) => {

    return (
        <Pagination>
            <PaginationContent>
                {
                    paginationData?.currentPage > 1 && (
                        <>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setPage(page => page - 1)}
                                />
                            </PaginationItem>
                        </>
                    )
                }

                {
                    paginationData?.totalPages > 0 && Array.from({ length: paginationData?.totalPages }, (_, index) => index + 1).map((page) => {
                        return (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    isActive={page === paginationData?.currentPage}
                                    onClick={() => setPage(page)}
                                >{page}</PaginationLink>
                            </PaginationItem>
                        )
                    })
                }

                {
                    paginationData?.currentPage < paginationData?.totalPages && (
                        <>
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setPage(page => page + 1)}
                                />
                            </PaginationItem>
                        </>
                    )
                }
            </PaginationContent>
        </Pagination>
    )
}

export default ListApplications