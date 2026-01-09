import { Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"

const FormInput = ({name,control,label,type="text",placeholder,required}) =>{
    return(
        <Controller 
        name={name}
        control={control} 
        render={({field, fieldState}) => (
        <Field data-invalid={fieldState.invalid} >
            <FieldLabel htmlFor={name}>{label}</FieldLabel>
            <Input 
                {...field} 
                aria-invalid={fieldState.invalid} 
                id={name} 
                type={type} 
                placeholder={placeholder}
                required={required}>
            </Input>
            {fieldState.invalid && (<FieldError errors={[fieldState.error]}></FieldError>)}
        </Field>
    )}/>
)
}

export default FormInput