'use client'

import SuccessModal from "@/components/SucessModal"
import { CustomInput } from "@/components/ui/custom-input"
import { useEffect, useState } from "react"
import { FaCheckCircle } from "react-icons/fa";

const Page = () => {
  const [files, setFiles] = useState<File[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (files.length > 0)
      setIsModalOpen(true)
  }, [files])

  return (
    <div className="w-full flex flex-col items-center">
      <CustomInput
        type="upload"
        containerClassName="w-full"
        accept=".jpg, .jpeg, .png, .pdf"
        multiple={true}
        onFileInputChange={(e) => {
          if (e.target.files) {
            const selectedFiles = Array.from(e.target.files)
            setFiles(selectedFiles)
            console.log(selectedFiles)
          }
        }}
      />
      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Selected Files:</h3>
          {files.map((file, index) => (
            <div key={index} className="text-sm text-gray-700">
              {file.name} - {(file.size / 1024).toFixed(2)} KB
            </div>
          ))}
        </div>
      )}
      {isModalOpen &&
        <SuccessModal
          title="Files Upload"
          message="Files have been successfully uploaded."
          handleModalClose={() => setIsModalOpen(false)}
          titleIcon={<FaCheckCircle className="text-[#3C9718]" size={24} />}
          ActionButtonText="Done"
          handleAction={() => setIsModalOpen(false)}
        />
      }
    </div>
  )
}

export default Page