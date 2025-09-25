import { CustomInput } from '@/components/ui/custom-input'
import { languages } from '@/utils/CountryCodes'
import React from 'react'

interface CreateEditDepartmentModalProps {
  formik: any
}

const CreateEditDepartmentModal = ({ formik }: CreateEditDepartmentModalProps) => {
  return (
    <div className='max-h-[578px] custom-scrollbar mr-1 mb-1'>
      <div className='flex flex-col gap-10 pl-6 pr-3 py-4'>
        <div className='w-full flex items-center gap-4'>
          <CustomInput
            type="select"
            name="departmentType"
            label="Department Type"
            placeholder='Select Department Type'
            options={languages}
            className="w-full cursor-pointer"
            containerClassName="flex flex-col gap-1 w-1/2"
            value={formik.values.departmentType}
            onChange={formik.handleChange}
            onSelectChange={(value: any) => formik.setFieldValue("departmentType", value)}
            onBlur={formik.handleBlur}
            error={formik.touched.departmentType && !!formik.errors.departmentType}
            required
          />
          <CustomInput
            type="select"
            name="organisationType"
            label="Organisation Type"
            placeholder='Select Organisation Type'
            options={languages}
            className="w-full cursor-pointer"
            containerClassName="flex flex-col gap-1 w-1/2"
            value={formik.values.organisationType}
            onChange={formik.handleChange}
            onSelectChange={(value: any) => formik.setFieldValue("organisationType", value)}
            onBlur={formik.handleBlur}
            error={formik.touched.organisationType && !!formik.errors.organisationType}
            required
          />
        </div>
        <div className='w-full flex items-center gap-4'>
          <CustomInput
            type="text"
            name="departmentName"
            label="Department Name"
            placeholder='Enter Department Name'
            className="w-full cursor-pointer"
            containerClassName="flex flex-col gap-1 w-1/2"
            value={formik.values.departmentName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.departmentName && !!formik.errors.departmentName}
            required
          />
          <CustomInput
            type="select"
            name="parentDepartmentName"
            label="Parent Department Name"
            placeholder='Select Parent Department Type'
            options={languages}
            className="w-full cursor-pointer"
            containerClassName="flex flex-col gap-1 w-1/2"
            value={formik.values.parentDepartmentName}
            onChange={formik.handleChange}
            onSelectChange={(value: any) => formik.setFieldValue("parentDepartmentName", value)}
            onBlur={formik.handleBlur}
            error={formik.touched.parentDepartmentName && !!formik.errors.parentDepartmentName}
            required
          />
        </div>
        <CustomInput
          type='textarea'
          name='description'
          label='Description'
          placeholder='Write Description here'
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && !!formik.errors.description}
        />
        <div className='w-full flex items-center gap-4'>
          <CustomInput
            type="text"
            name="organisationCode"
            label="Organisation Code"
            placeholder='Enter Org code'
            className="w-full cursor-pointer"
            containerClassName="flex flex-col gap-1 w-1/2"
            value={formik.values.organisationCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.organisationCode && !!formik.errors.organisationCode}
            required
          />
          <CustomInput
            type="select"
            name="sector"
            label="Sector"
            placeholder='Select sector'
            options={languages}
            className="w-full cursor-pointer"
            containerClassName="flex flex-col gap-1 w-1/2"
            value={formik.values.sector}
            onChange={formik.handleChange}
            onSelectChange={(value: any) => formik.setFieldValue("sector", value)}
            onBlur={formik.handleBlur}
            error={formik.touched.sector && !!formik.errors.sector}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-full flex items-center gap-4">
            <CustomInput
              type="text"
              name="city"
              label="Location of cause of greivance occur"
              placeholder="Enter Village / City / Town"
              className=""
              containerClassName="flex flex-col gap-1 w-1/2"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.city && !!formik.errors.city}
              required
            />
            <CustomInput
              type="select"
              name="district"
              options={languages}
              placeholder='Select district'
              className="w-full cursor-pointer mt-4"
              containerClassName='flex flex-col gap-1 w-1/2'
              value={formik.values.district}
              onChange={formik.handleChange}
              onSelectChange={(value) => formik.setFieldValue("district", value)}
              onBlur={formik.handleBlur}
              error={formik.touched.district && !!formik.errors.district}
            />
          </div>
          <div className="w-full flex items-center gap-4">
            <CustomInput
              type="select"
              name="state"
              options={languages}
              placeholder='Select state'
              className="w-full cursor-pointer"
              containerClassName="flex flex-col gap-1 w-1/2"
              value={formik.values.state}
              onChange={formik.handleChange}
              onSelectChange={(value) => formik.setFieldValue("state", value)}
              onBlur={formik.handleBlur}
              error={formik.touched.state && !!formik.errors.state}
            />
            <CustomInput
              type="text"
              name="pinCode"
              placeholder="Enter Pin Code"
              containerClassName="flex flex-col gap-1 w-1/2"
              value={formik.values.pinCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.pinCode && !!formik.errors.pinCode}
            />
          </div>
        </div>
        <div className='w-full flex items-center gap-4'>
          <CustomInput
            type="select"
            name="status"
            label="Status"
            placeholder='Select status'
            options={languages}
            className="w-full cursor-pointer"
            containerClassName="flex flex-col gap-1 w-1/2"
            value={formik.values.status}
            onChange={formik.handleChange}
            onSelectChange={(value: any) => formik.setFieldValue("status", value)}
            onBlur={formik.handleBlur}
            error={formik.touched.status && !!formik.errors.status}
          />
          <CustomInput
            type="select"
            name="tags"
            label="Tags"
            placeholder='Select tags'
            options={languages}
            className="w-full cursor-pointer"
            containerClassName="flex flex-col gap-1 w-1/2"
            value={formik.values.tags}
            onChange={formik.handleChange}
            onSelectChange={(value: any) => formik.setFieldValue("tags", value)}
            onBlur={formik.handleBlur}
            error={formik.touched.tags && !!formik.errors.tags}
          />
        </div>
      </div>
    </div>
  )
}

export default CreateEditDepartmentModal