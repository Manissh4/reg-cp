import { CustomInput } from '@/components/ui/custom-input';
import { languages } from '@/utils/CountryCodes';
import React, { useState } from 'react';

export default function ATRSectionB() {

    return (
        <div className="flex flex-col gap-6 px-6">
            <CustomInput
                type='text'
                name='resolutionDate'
                label='Date of Resolution'
                suffixIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                        <path d="M6.33203 1.58398V3.95898" stroke="#FF7501" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12.668 1.58398V3.95898" stroke="#FF7501" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2.76953 7.19531H16.2279" stroke="#FF7501" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16.625 6.72982V13.459C16.625 15.834 15.4375 17.4173 12.6667 17.4173H6.33333C3.5625 17.4173 2.375 15.834 2.375 13.459V6.72982C2.375 4.35482 3.5625 2.77148 6.33333 2.77148H12.6667C15.4375 2.77148 16.625 4.35482 16.625 6.72982Z" stroke="#FF7501" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12.4266 10.8451H12.4338" stroke="#FF7501" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12.4266 13.2201H12.4338" stroke="#FF7501" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.49695 10.8451H9.50406" stroke="#FF7501" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.49695 13.2201H9.50406" stroke="#FF7501" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.56727 10.8451H6.57438" stroke="#FF7501" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.56727 13.2201H6.57438" stroke="#FF7501" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                }
                containerClassName='max-w-1/2 cursor-pointer'
            />
            <div className='flex flex-col items-start gap-3'>
                <p className='font-medium text-sm text-label-dark'>Grievance Status</p>
                <div className='flex items-center gap-10'>
                    <div className='flex items-center gap-3'>
                        <input type='radio' name='resolved' />
                        <label htmlFor='resolved' className='text-base text-text-hint font-normal'>Resolved</label>
                    </div>
                    <div className='flex items-center gap-3'>
                        <input type='radio' name='partially-resolved' />
                        <label htmlFor='partially-resolved' className='text-base text-text-hint font-normal'>Partially Resolved</label>
                    </div>
                    <div className='flex items-center gap-3'>
                        <input type='radio' name='cannot-resolve' />
                        <label htmlFor='cannot-resolve' className='text-base text-text-hint font-normal'>Can not be Resolved</label>
                    </div>
                </div>
            </div>
            <CustomInput
                type='textarea'
                name='remarks'
                label='Actions taken for Resolution and Closing Remarks'
                containerClassName='flex flex-col gap-1'
            />
            <CustomInput
                type='upload'
                name='upload'
                label='Upload Documents'
                containerClassName='max-w-1/2 flex flex-col gap-1'
            />
            <div className='flex items-center gap-6'>
                <CustomInput
                    type='select'
                    name='groName'
                    label='GRO Name'
                    containerClassName='flex flex-col gap-1 w-full '
                    className='w-full cursor-pointer'
                    options={languages}
                    placeholder='Select GRO Name'
                />
                <CustomInput
                    type='select'
                    name='designation'
                    label='Designation'
                    containerClassName='flex flex-col gap-1 w-full'
                    className='w-full cursor-pointer'
                    options={languages}
                    placeholder='Select designation'
                />
            </div>
        </div>
    );
}