"use client"
 
import { useState } from "react"
import { Lightbulb, Search, Minus, Plus, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
 
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
 
// Dummy data structure
const ministries = ["Health & Family Welfare", "Education", "Finance", "Home Affairs", "Defence"]
 
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
 
export function SmartCategorizationForm() {
  const [selectedMinistry, setSelectedMinistry] = useState("Health & Family Welfare")
  const [selectedCategory, setSelectedCategory] = useState("Hospital / AIIMS / AIIMS, New Delhi, Patient Care")
  const [searchQuery, setSearchQuery] = useState("AIIMS, Delhi")
  const [isDropdownOpen, setIsDropdownOpen] = useState(true)
  const [options, setOptions] = useState<Option[]>(searchableOptions)
  const [selectedOption, setSelectedOption] = useState("aiims-delhi")
 
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
              className="flex items-center p-2 hover:bg-gray-50 rounded"
              style={{ paddingLeft: `${level * 24 + 8}px` }}
            >
              <div className="flex items-center gap-2 flex-1">
                <div className="w-4 h-4 border border-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-700">{option.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleCategory(option.id)}
                  className="h-4 w-4 p-0 ml-1"
                >
                  {option.expanded ? (
                    <Minus className="h-3 w-3 text-purple-500" />
                  ) : (
                    <Plus className="h-3 w-3 text-purple-500" />
                  )}
                </Button>
              </div>
            </div>
            {option.expanded && (
              <div className="space-y-1">{option.children.map((child) => renderOption(child, level + 1))}</div>
            )}
          </>
        ) : (
          <div
            className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
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
    <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 text-gray-700">
        <Lightbulb className="h-5 w-5 text-yellow-500" />
        <span className="font-medium">Smart Categorization</span>
        <span className="text-gray-500">based on your described grievance</span>
      </div>
 
      {/* Ministry/Department Dropdown */}
      <div className="space-y-2">
        <Label htmlFor="ministry" className="text-sm font-medium text-gray-700">
          Ministry / Department <span className="text-red-500">*</span>
        </Label>
        <Select value={selectedMinistry} onValueChange={setSelectedMinistry}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ministries.map((ministry) => (
              <SelectItem key={ministry} value={ministry}>
                {ministry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
 
      <div className="space-y-2">
        <Label htmlFor="category" className="text-sm font-medium text-gray-700">
          Select Category <span className="text-red-500">*</span>
        </Label>
 
   
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between px-3 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <span className="text-gray-900">{selectedCategory}</span>
            <ChevronDown className={cn("h-4 w-4 text-gray-400 transition-transform", isDropdownOpen && "rotate-180")} />
          </button>
 
          {/* Dropdown content with integrated search */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 border rounded-md bg-white shadow-lg z-50 max-h-80 overflow-hidden">
              {/* Search input inside dropdown */}
              <div className="p-3 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="AIIMS, Delhi"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 border-gray-200"
                  />
                </div>
              </div>
 
              <div className="max-h-64 overflow-y-auto">
                <div className="p-2 space-y-1 relative">{options.map((option) => renderOption(option, 0))}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}