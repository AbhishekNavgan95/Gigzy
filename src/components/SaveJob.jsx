import { saveJob } from '@/api/saveJobApi';
import useFetch from '@/hooks/use-fetch';
import React, { useEffect, useState } from 'react'
import ToolTip from './ToolTip';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa6';
import { toast } from '@/hooks/use-toast';

const SaveJob = ({
    jobSaved = false,
    job,
    user
}) => {

    const [saved, setSaved] = useState(jobSaved);
    const { fn: fnSaveJob, data: savedJobData, loading: saveJobLoading } = useFetch(saveJob, { alreadySaved: saved });

    const handleSaveChange = async () => {
        const res = await fnSaveJob({ job_id: job.id, user_id: user.id })

        if (res) {
            toast({
                title: 'Added to favourites'
            })
        } else {
            toast({
                title: 'Removed from favourites'
            })
        }

        setSaved(res ? true : false)
    }

    // useEffect(() => {

    // }, [jobSaved])

    return (
        <ToolTip text={'Save'}>
            <button onClick={handleSaveChange}>
                {
                    saved
                        ? <FaBookmark />
                        : <FaRegBookmark />
                }
            </button>
        </ToolTip>
    )
}

export default SaveJob