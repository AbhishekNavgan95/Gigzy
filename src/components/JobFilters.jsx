import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const JobFilters = ({ companies, companyDataLoading, setCompany_id, company_id }) => {

    return (
        <div className='min-w-[300px]  p-5 sticky top-0 shadow-md bg-white border-2 min-h-screen rounded-md'>
            <span className='space-y-3'>
                <span className='flex items-center justify-between'>
                    <h5 className='font-semibold'>Companies</h5>
                    <button className='text-accent-600 text-sm font-semibold' onClick={() => setCompany_id('')}>Clear</button>
                </span>
                <Select className="w-full " value={company_id} onValueChange={(value) => setCompany_id(value)}>
                    <SelectTrigger className="w-full border border-black-600">
                        <SelectValue placeholder="Select a companay" />
                    </SelectTrigger>
                    <SelectContent className="">
                        {
                            companies && companies.map((company, index) => (
                                <SelectItem key={index} value={company?.id}>{company?.name}</SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </span>
        </div>
    )
}

export default JobFilters