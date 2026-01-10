import { Button } from "@/components/ui/button"
import { XIcon, FileIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Controller } from "react-hook-form"

function FormImageUpload({ control, name }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value = [] }, fieldState: { error } }) => {
        
        const handleFileChange = (e) => {
          if (!e.target.files || e.target.files.length === 0) return
          const newFiles = Array.from(e.target.files)
          
          onChange([...value, ...newFiles]) 
          
          e.target.value = "" 
        }

        const removeImage = (indexToRemove) => {
          const updatedFiles = value.filter((_, index) => index !== indexToRemove)
          onChange(updatedFiles)
        }

        return (
          <div className="space-y-2">
            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-10 hover:bg-gray-100 transition-colors group">
              <div>
                {/* Check value.length instead of local state */}
                {value.length < 5 && (
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                )}
                <div className="text-center">
                  <p className="text-sm text-gray-600 group-hover:text-gray-900">
                    Click to upload one or more photos
                  </p>
                </div>
              </div>

              <div className="relative z-20 mt-5">
                {value.length > 0 && (
                  <div className="space-y-4">
                    {value.map((file, index) => (
                      <div
                        key={`${file.name}-${index}`}
                        className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md shadow-sm"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <FileIcon className="w-4 h-4 text-blue-500 shrink-0" />
                          <span className="text-sm text-gray-700 truncate font-medium">
                            {file.name}
                          </span>
                          <span className="text-xs text-gray-400 shrink-0">
                            ({(file.size / 1024).toFixed(1)} KB)
                          </span>
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500 hover:text-red-600"
                          onClick={() => removeImage(index)}
                        >
                          <XIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {error && (
              <p className="text-sm font-medium text-red-500">
                {error.message}
              </p>
            )}
          </div>
        )
      }}
    />
  )
}

export default FormImageUpload

