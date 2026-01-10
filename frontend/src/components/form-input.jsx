import { Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea" 
import { Field, FieldLabel, FieldError } from "@/components/ui/field"

const FormInput = ({ name, control, label, type = "text", placeholder, required }) => {
  return (
    <Controller 
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="-space-y-2">
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          
          {type === "textarea" ? (
            <Textarea
              {...field}
              id={name}
              placeholder={placeholder}
              aria-invalid={fieldState.invalid}
              className="resize-none h-32" 
            />
          ) : (
            <Input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              aria-invalid={fieldState.invalid}
              required={required}
            />
          )}

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}

export default FormInput