"use client"

import { useState } from "react"
import { Plus, Minus, FileText, Trash2, Info } from "lucide-react"
import { Timeline } from "./Common-timeline-stepper"
import { CustomInput } from "./ui/custom-input"

const cn = (...args: Array<string | false | null | undefined>) => args.filter(Boolean).join(" ")

export type GrievanceStatus = "Resolved" | "Pending" | "In Progress" | string

export interface ATRSection {
  id: string
  title: string
  dateOfResolution?: string
  grievanceStatus?: GrievanceStatus
  actionsAndRemarks?: string
  supportingDocuments?: { fileName: string; fileSize?: string }[]
  groName?: string
  assigneeName?: string
  type?: string
  [key: string]: any
}

export interface AccordionProps {
  items: ATRSection[] | any[]
  defaultOpen?: string[]
  allowMultiple?: boolean
  className?: string
  additional?: {
    draft?: any
    onAddFiles?: (files: FileList | null) => void
    onRemoveFile?: (index: number) => void
    onRemoveExistingFile?: (index: number) => void
    onCommentChange?: (val: string) => void
    onUpload?: () => void
  }
}

/** badge color helper */
const getStatusBadgeColor = (status?: GrievanceStatus) => {
  switch (status) {
    case "Resolved":
      return "bg-green-50 text-green-800 border-green-200"
    case "Pending":
      return "bg-yellow-50 text-yellow-800 border-yellow-200"
    case "In Progress":
      return "bg-blue-50 text-blue-800 border-blue-200"
    default:
      return "bg-gray-50 text-gray-800 border-gray-200"
  }
}

export default function Accordion({
  items,
  defaultOpen = [],
  allowMultiple = true,
  className,
  additional,
}: AccordionProps) {
  const normalizedItems = items.map((it, idx) => {
    if (!it) return { id: `item-${idx}`, title: `Item ${idx + 1}`, _raw: it }
    return {
      id: it.id ?? it.title ?? `item-${idx}`,
      title: it.title ?? it.subject ?? it.id ?? `Item ${idx + 1}`,
      _raw: it,
    }
  })

  const [openSet, setOpenSet] = useState<Set<string>>(new Set(defaultOpen))

  const toggle = (id: string) => {
    setOpenSet((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else {
        if (!allowMultiple) next.clear()
        next.add(id)
      }
      return next
    })
  }

  const renderSupportingDocs = (docs: { fileName: string; fileSize?: string }[], onRemove?: (i: number) => void) => (
    <div>
      <h4 className="text-sm font-medium text-gray-700 mb-2">Supporting Documents</h4>
      <div className="flex flex-wrap gap-3">
        {docs.map((doc, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <FileText className="h-5 w-5 text-orange-500" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">{doc.fileName}</span>
              {doc.fileSize ? <span className="text-xs text-gray-500">{doc.fileSize}</span> : null}
            </div>
            {onRemove && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onRemove(i)
                }}
                className="ml-2"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  const renderRemarks = (remarks: any) => {
    if (!remarks) return null
    return (
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Remarks by Authority</h4>
        {typeof remarks === "string" ? (
          <p className="text-sm text-gray-900 leading-relaxed">{remarks}</p>
        ) : (
          <>
            {remarks.byAuthority && <p className="text-sm text-gray-900 leading-relaxed mb-3">{remarks.byAuthority}</p>}
            {Array.isArray(remarks.internalNotes) && (
              <div>
                <h5 className="font-medium text-sm mb-1">Internal Notes</h5>
                <ul className="list-disc ml-6 text-sm">
                  {remarks.internalNotes.map((n: any, i: number) => (
                    <li key={i}>
                      <strong>{n.author}</strong> ({n.date}): {n.note}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    )
  }

  const renderItemContent = (raw: any) => {
    if (!raw) return <div className="text-sm text-gray-500">No details available.</div>

    if (raw.type === "timeline") {
      return (
        <div className="pt-4">
          {/* white rounded card for the timeline only */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            {Array.isArray(raw.timeline) && raw.timeline.length > 0 && <Timeline steps={raw.timeline} />}
          </div>
        </div>
      )
    }

    if (raw.type === "remarks") {
      return <div className="space-y-4 pt-4">{renderRemarks(raw.remarks)}</div>
    }

    if (raw.type === "personal") {
      return (
        <div className="space-y-5 pt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Client Name</h4>
              <p className="text-sm text-gray-900">**********</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Mobile Number</h4>
              <p className="text-sm text-gray-900">**********</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Email ID</h4>
              <p className="text-sm text-gray-900">**********</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Address</h4>
              <p className="text-sm text-gray-900">**********</p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments</h4>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm">
                <FileText className="h-5 w-5 text-orange-500" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700">**********.jpg</span>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm">
                <FileText className="h-5 w-5 text-orange-500" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700">**********.jpg</span>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm">
                <FileText className="h-5 w-5 text-orange-500" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700">**********.jpg</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">KYC Documents</h4>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm">
                <FileText className="h-5 w-5 text-orange-500" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700">**********.jpg</span>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm">
                <FileText className="h-5 w-5 text-orange-500" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700">**********.jpg</span>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm">
                <FileText className="h-5 w-5 text-orange-500" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700">**********.jpg</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Grievance Summary</h4>
            <p className="text-sm text-gray-900 leading-relaxed">
              ****************************************************************************************************
              ****************************************************************************************************
              ****************************************************************************************************
            </p>
          </div>
        </div>
      )
    }

    if (raw.type === "additional") {
      const draft = additional?.draft
      const pendingDocs = draft?.info?.additionalDocuments ?? []
      const comment = draft?.info?.additionalComment ?? ""
      const isUploaded = draft?.info?.isUploaded ?? false // Track upload state

      console.log("Rendering additional info section", { draft, pendingDocs, comment, isUploaded })
      const existingDocs =
        raw.supportingDocuments ??
        draft?.info?.existingDocuments ??
        (Array.isArray(raw.supportingDocuments) ? raw.supportingDocuments : [])

      return (
        <div className="space-y-4 pt-4">
          {!isUploaded ? (
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  <p className="text-red-600 flex gap-2">
                    <Info className="text-red-600" /> Please Share or Upload your Adhar Card & Date of Birth Certificate
                    proof.
                  </p>
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => additional?.onCommentChange?.(e.target.value)}
                  placeholder="Additional Comment or information sample text"
                  className="w-full rounded-md border border-[#C6C6C6] bg-white p-3 text-sm resize-none"
                  rows={4}
                />
              </div>

              <div>
                <div>
                  <CustomInput
                    type="upload"
                    accept="image/*,application/pdf"
                    multiple
                    containerClassName="w-full bg-white"
                    onFileInputChange={(e) => additional?.onAddFiles?.(e.target.files)}
                  />
                </div>
              </div>

              {pendingDocs && pendingDocs.length > 0 && (
                <div className="mt-2">
                  <div className="text-sm font-medium text-gray-700 mb-2">Selected files to upload</div>
                  <div className="space-y-2">
                    {pendingDocs.map((d: any, i: number) => (
                      <div
                        key={i}
                        className="flex items-center justify-between bg-white border rounded-md px-3 py-2 text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-orange-500" />
                          <span className="text-sm text-gray-700">{d.fileName}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            additional?.onRemoveFile?.(i)
                          }}
                          className="p-1 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-sm text-gray-700">
                {comment || "I am writing to bring to your attention the undue delay ..."}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {pendingDocs.map((d: any, i: number) => (
                  <div key={i} className="flex items-center gap-2 bg-white border rounded-md px-3 py-1 text-sm">
                    <FileText className="h-4 w-4 text-orange-500" />
                    <span className="text-sm text-gray-700">{d.fileName}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )
    }

    return (
      <div className="space-y-5 pt-5">
        {raw.dateOfResolution && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Date of Resolution</h4>
            <p className="text-sm text-gray-900">{raw.dateOfResolution}</p>
          </div>
        )}

        {raw.subject && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Subject</h4>
            <p className="text-sm text-gray-900">{raw.subject}</p>
          </div>
        )}
        {raw.ministry && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Ministry / Department</h4>
            <p className="text-sm text-gray-900">{raw.ministry}</p>
          </div>
        )}
        {raw.category && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Category</h4>
            <p className="text-sm text-gray-900">{raw.category}</p>
          </div>
        )}
        {raw.grievanceSummary && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Grievance Summary</h4>
            <p className="text-sm text-gray-900 leading-relaxed">{raw.grievanceSummary}</p>
          </div>
        )}

        {raw.estimatedResolution && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Estimated Time Remaining for resolution</h4>
            <p className="text-sm text-gray-900">{raw.estimatedResolution}</p>
          </div>
        )}

        {raw.actionsAndRemarks && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Actions taken for Resolution and Closing Remarks</h4>
            <p className="text-sm text-gray-900 leading-relaxed">{raw.actionsAndRemarks}</p>
          </div>
        )}

        {raw.supportingDocuments && raw.supportingDocuments.length > 0 && renderSupportingDocs(raw.supportingDocuments)}

        {(raw.groName || raw.assigneeName) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {raw.groName && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Name of GRO</h4>
                <p className="text-sm text-gray-900">{raw.groName}</p>
              </div>
            )}
            {raw.assigneeName && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Name of GRO that acted as assignee</h4>
                <p className="text-sm text-gray-900">{raw.assigneeName}</p>
              </div>
            )}
          </div>
        )}

        {Array.isArray(raw.sections) && raw.sections.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Related ATR Sections</h4>
            <div className="pl-2">
              <Accordion items={raw.sections} defaultOpen={[]} allowMultiple={true} />
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn("w-full max-w-4xl mx-auto space-y-3", className)}>
      {normalizedItems.map((meta, idx) => {
        const section = items[idx]
        const id = meta.id
        const title = meta.title
        const isOpen = openSet.has(id)

        return (
          <div key={id} className="rounded-lg overflow-hidden bg-gray-50">
            <button
              aria-expanded={isOpen}
              onClick={() => toggle(id)}
              className={cn(
                "w-full px-5 py-3 flex items-center justify-start gap-x-4 text-left focus:outline-none",
                "transition-colors hover:bg-gray-100",
              )}
            >
              <div className="text-left">
                <div className="font-medium text-gray-900">{title}</div>
                {section?.dateOfResolution ? (
                  <div className="text-xs text-gray-500">{section.dateOfResolution}</div>
                ) : section?.date ? (
                  <div className="text-xs text-gray-500">{section.date}</div>
                ) : null}
              </div>

              <span className="h-6 w-6 flex items-center justify-center rounded-full bg-blue-900 text-white">
                {isOpen ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
              </span>
            </button>

            {isOpen && <div className="px-5 pb-6 border-gray-200">{renderItemContent(section)}</div>}
          </div>
        )
      })}
    </div>
  )
}
