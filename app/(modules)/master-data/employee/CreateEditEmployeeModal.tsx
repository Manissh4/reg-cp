import React, { useState } from 'react'
import Accordion from './Accordian'
import { CustomInput } from '@/components/ui/custom-input'
import { languages } from '@/utils/CountryCodes'
import { Label } from "@/components/ui/label"
import { ChevronDown, ChevronUp, Minus, Plus, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface CreateEditEmployeeModalProps {
  formik: any
}
interface CategoryOption {
  id: string
  name: string
  type: "category"
  expanded: boolean
  children: Option[]
}

interface ItemOption {
  id: string
  name: string
  type: "item"
  selected?: boolean
}

type Option = CategoryOption | ItemOption

const searchableOptions: Option[] = [
  {
    id: "hospital",
    name: "Hospital",
    type: "category",
    expanded: true,
    children: [
      { id: "fortis", name: "Fortis Hospital", type: "item" },
      {
        id: "aiims",
        name: "AIIMS",
        type: "category",
        expanded: true,
        children: [
          { id: "aiims-delhi", name: "AIIMS, New Delhi", type: "item", selected: true },
          { id: "aiims-dehradun", name: "AIIMS, Dehradun", type: "item" },
        ],
      },
    ],
  },
  {
    id: "sample1",
    name: "Category Sample 1",
    type: "item",
  },
  {
    id: "sample2",
    name: "Category Sample 2",
    type: "item",
  },
]

const CreateEditEmployeeModal = ({ formik }: CreateEditEmployeeModalProps) => {

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [options, setOptions] = useState<Option[]>(searchableOptions)
  const [selectedOption, setSelectedOption] = useState("")
  const [categories, setCategories] = useState([{ id: 1, selected: "Select Category" }])
  const [open, setOpen] = useState(false)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (!query.trim()) {
      setOptions(searchableOptions)
      return
    }

    const filterOptions = (opts: Option[]): Option[] => {
      return opts
        .map((option) => {
          if (option.type === "category") {
            const filteredChildren = filterOptions(option.children)
            if (filteredChildren.length > 0 || option.name.toLowerCase().includes(query.toLowerCase())) {
              return {
                ...option,
                children: filteredChildren.length > 0 ? filteredChildren : option.children,
              }
            }
            return null
          } else {
            return option.name.toLowerCase().includes(query.toLowerCase()) ? option : null
          }
        })
        .filter((option): option is Option => option !== null)
    }

    setOptions(filterOptions(searchableOptions))
  }

  const toggleCategory = (categoryId: string) => {
    const updateOptions = (opts: Option[]): Option[] => {
      return opts.map((option) => {
        if (option.id === categoryId && option.type === "category") {
          return { ...option, expanded: !option.expanded }
        } else if (option.type === "category") {
          return {
            ...option,
            children: updateOptions(option.children),
          }
        }
        return option
      })
    }
    setOptions(updateOptions(options))
  }

  const selectOption = (optionId: string) => {
    setSelectedOption(optionId)

    // Build the category path
    const findPath = (opts: Option[], targetId: string, currentPath: string[] = []): string[] | null => {
      for (const option of opts) {
        const newPath = [...currentPath, option.name]
        if (option.id === targetId) {
          return newPath
        }
        if (option.type === "category") {
          const result = findPath(option.children, targetId, newPath)
          if (result) return result
        }
      }
      return null
    }

    const path = findPath(searchableOptions, optionId)
    if (path) {
      setSelectedCategory(path.join(" / ") + ", Patient Care")
    }

    // Update selection state
    const updateSelection = (opts: Option[]): Option[] => {
      return opts.map((option) => {
        if (option.type === "category") {
          return {
            ...option,
            children: updateSelection(option.children),
          }
        } else {
          return {
            ...option,
            selected: option.id === optionId,
          }
        }
      })
    }
    setOptions(updateSelection(options))
  }

  const renderOption = (option: Option, level = 0) => {
    const isNested = level > 0

    return (
      <div key={option.id} className="relative">
        {isNested && (
          <div
            className="absolute left-2 top-0 bottom-0 w-px bg-gray-300"
            style={{ left: `${(level - 1) * 24 + 8}px` }}
          />
        )}

        {option.type === "category" ? (
          <>
            <div
              className="flex items-center p-2"
              style={{ paddingLeft: `${level * 24 + 8}px` }}
            >
              <div className="flex items-center gap-2 flex-1">
                <div className="w-4 h-4 border border-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-700">{option.name}</span>
                <div
                  onClick={() => toggleCategory(option.id)}
                  className="h-4 w-4 p-0 ml-1"
                >
                  {option.expanded ? (
                    <Minus className="h-3 w-3 text-purple-500" />
                  ) : (
                    <Plus className="h-3 w-3 text-purple-500" />
                  )}
                </div>
              </div>
            </div>
            {option.expanded && (
              <div className="space-y-1">{option.children.map((child) => renderOption(child, level + 1))}</div>
            )}
          </>
        ) : (
          <div
            className="flex items-center p-2 cursor-pointer"
            style={{ paddingLeft: `${level * 24 + 8}px` }}
            onClick={() => selectOption(option.id)}
          >
            <div className="flex items-center gap-2 flex-1">
              <div
                className={cn(
                  "w-4 h-4 border-2 rounded-full flex items-center justify-center",
                  option.selected ? "border-purple-600 bg-purple-600" : "border-gray-300",
                )}
              >
                {option.selected && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              <span className="text-sm text-gray-700">{option.name}</span>
              {(option.id === "aiims-delhi" || option.id === "aiims-dehradun") && (
                <Plus className="h-3 w-3 text-purple-500 ml-1" />
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className='max-h-[578px] h-[578px] custom-scrollbar mr-1 mb-1'>
      <div className='flex flex-col gap-6 pl-6 pr-3 py-4'>

        <Accordion title="Personal Details" defaultOpen>
          <div className="w-full grid grid-cols-2 gap-4 transition-all">
            <CustomInput
              name="employeeName"
              label="Employee Name"
              placeholder="Enter employee name"
              value={formik.values.employeeName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.employeeName && !!formik.errors.employeeName}
              helperText={formik.touched.employeeName ? formik.errors.employeeName : ""}
              required
            />

            <CustomInput
              name="mobileNo"
              label="Mobile No."
              type="text"
              placeholder="Enter Mobile No."
              value={formik.values.mobileNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mobileNo && !!formik.errors.mobileNo}
              helperText={formik.touched.mobileNo ? formik.errors.mobileNo : ""}
              required
            />

            <CustomInput
              name="email"
              label="Email ID"
              type="text"
              placeholder="Enter email ID"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email ? formik.errors.email : ""}
              required
            />

            <CustomInput
              name="employeeId"
              label="Employee ID"
              placeholder="Enter employee ID"
              value={formik.values.employeeId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.employeeId && !!formik.errors.employeeId}
              helperText={formik.touched.employeeId ? formik.errors.employeeId : ""}
              required
            />

            <CustomInput
              type="text"
              name="city"
              label="Address"
              placeholder="Enter Village / City / Town"
              className=""
              containerClassName="flex flex-col gap-1"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // error={formik.touched.city && !!formik.errors.city}
              required
            />

            <CustomInput
              type="select"
              name="district"
              options={languages}
              label='District'
              placeholder='Select district'
              className="cursor-pointer w-full"
              value={formik.values.district}
              onChange={formik.handleChange}
              onSelectChange={(value) => formik.setFieldValue("district", value)}
              onBlur={formik.handleBlur}
            // error={formik.touched.district && !!formik.errors.district}
            />

            <CustomInput
              type="select"
              name="state"
              options={languages}
              placeholder='Select state'
              className="w-full cursor-pointer"
              containerClassName="flex flex-col gap-1"
              value={formik.values.state}
              onChange={formik.handleChange}
              onSelectChange={(value) => formik.setFieldValue("state", value)}
              onBlur={formik.handleBlur}
            // error={formik.touched.state && !!formik.errors.state}
            />

            <CustomInput
              type="text"
              name="pinCode"
              placeholder="Enter Pin Code"
              value={formik.values.pinCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            // error={formik.touched.pinCode && !!formik.errors.pinCode}
            />

          </div>
        </Accordion>

        {/* Professional Details */}
        <Accordion title="Professional Details" defaultOpen>
          <div className="grid grid-cols-2 gap-4">
            <CustomInput
              type="select"
              name="entityName"
              label="Entity Name"
              className="w-full cursor-pointer"
              placeholder="Select Entity Name"
              options={[
                { value: "admin", label: "Admin" },
                { value: "manager", label: "Manager" },
                { value: "employee", label: "Employee" },
              ]}
              value={formik.values.role}
              onSelectChange={(val) =>
                formik.setFieldValue("entityName", val)
              }
              onBlur={formik.handleBlur}
              error={formik.touched.role && !!formik.errors.role}
              helperText={formik.touched.role ? formik.errors.role : ""}
              required
            />

            <CustomInput
              name="designation"
              label="Designation"
              placeholder="Enter designation"
              value={formik.values.designation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.designation && !!formik.errors.designation}
              helperText={formik.touched.designation ? formik.errors.designation : ""}
              required
            />

            <CustomInput
              type="select"
              name="role"
              label="Role"
              placeholder="Select role"
              className="w-full cursor-pointer"
              options={[
                { value: "admin", label: "Admin" },
                { value: "manager", label: "Manager" },
                { value: "employee", label: "Employee" },
              ]}
              value={formik.values.role}
              onSelectChange={(val) =>
                formik.setFieldValue("role", val)
              }
              onBlur={formik.handleBlur}
              error={formik.touched.role && !!formik.errors.role}
              helperText={formik.touched.role ? formik.errors.role : ""}
              required
            />

            <CustomInput
              type="select"
              name="level"
              label="Level"
              placeholder="Select level"
              className="w-full cursor-pointer"
              options={[
                { value: "junior", label: "Junior" },
                { value: "mid", label: "Mid" },
                { value: "senior", label: "Senior" },
              ]}
              value={formik.values.level}
              onSelectChange={(val) =>
                formik.setFieldValue("level", val)
              }
              onBlur={formik.handleBlur}
              error={formik.touched.level && !!formik.errors.level}
              helperText={formik.touched.level ? formik.errors.level : ""}
              required
            />

            <CustomInput
              type="select"
              name="permissionAccessSet"
              label="Permission Access Set"
              placeholder="Select permission access set"
              className="w-full cursor-pointer"
              options={[
                { value: "junior", label: "Junior" },
                { value: "mid", label: "Mid" },
                { value: "senior", label: "Senior" },
              ]}
              value={formik.values.level}
              onSelectChange={(val) =>
                formik.setFieldValue("level", val)
              }
              onBlur={formik.handleBlur}
              error={formik.touched.level && !!formik.errors.level}
              helperText={formik.touched.level ? formik.errors.level : ""}
              required
            />

          </div>
        </Accordion>

        <Accordion title="Employee Mapping" defaultOpen>
          <div className="w-full flex items-end gap-3">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                Select Category <span className="text-red-500">*</span>
              </Label>

              <div className="relative">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger>
                    <div
                      className="w-full min-w-[350px] flex items-center justify-between px-3 py-2 text-sm border border-gray-300 rounded-md cursor-pointer bg-white"
                    >
                      <span className="text-[#868686]">{selectedCategory ?? "Select Category"}</span>
                      {open ? (
                        <ChevronUp className="h-4 w-4 text-[#FF7501] transition-transform" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-[#FF7501] transition-transform" />
                      )}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className='w-[350px] p-0'>
                    <div className='p-4 border-b border-[#DDDDDD]'>
                      <CustomInput
                        type='search'
                        value={searchQuery}
                        placeholder='Search'
                        className='pl-10'
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="rounded-[12px] p-[18px_12px_16px_16px]">
                      <div className="max-h-64 overflow-y-auto custom-scrollbar">
                        <div className="space-y-1 relative">{options.map((option) => renderOption(option, 0))}</div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className='cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M15.9974 29.3334C23.3307 29.3334 29.3307 23.3334 29.3307 16.0001C29.3307 8.66675 23.3307 2.66675 15.9974 2.66675C8.66406 2.66675 2.66406 8.66675 2.66406 16.0001C2.66406 23.3334 8.66406 29.3334 15.9974 29.3334Z" stroke="#212121" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.6641 16H21.3307" stroke="#212121" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 21.3332V10.6665" stroke="#212121" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </Accordion>
      </div>
    </div>
  )
}

export default CreateEditEmployeeModal