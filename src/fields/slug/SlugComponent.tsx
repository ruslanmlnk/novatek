'use client'

import type { TextFieldClientProps } from 'payload'
import React, { useCallback, useEffect } from 'react'
import { Button, FieldLabel, TextInput, useField, useForm, useFormFields } from '@payloadcms/ui'

import { formatSlugValue } from './formatSlug'

type SlugComponentProps = {
  checkboxFieldPath: string
  fieldToUse: string
} & TextFieldClientProps

export const SlugComponent: React.FC<SlugComponentProps> = ({
  checkboxFieldPath: checkboxFieldPathFromProps,
  field,
  fieldToUse,
  path,
  readOnly: readOnlyFromProps,
}) => {
  const { label } = field

  const checkboxFieldPath = path?.includes('.')
    ? `${path}.${checkboxFieldPathFromProps}`
    : checkboxFieldPathFromProps

  const { setValue, value } = useField<string>({ path: path || field.name })
  const { dispatchFields } = useForm()

  const checkboxValue = useFormFields(([fields]) => fields[checkboxFieldPath]?.value as boolean)
  const targetFieldValue = useFormFields(([fields]) => fields[fieldToUse]?.value as string)

  useEffect(() => {
    if (checkboxValue) {
      if (targetFieldValue) {
        const formattedSlug = formatSlugValue(targetFieldValue)
        if (value !== formattedSlug) setValue(formattedSlug)
      } else if (value !== '') {
        setValue('')
      }
    }
  }, [targetFieldValue, checkboxValue, setValue, value])

  const handleLock = useCallback(
    (event: React.MouseEvent<Element>) => {
      event.preventDefault()
      dispatchFields({
        type: 'UPDATE',
        path: checkboxFieldPath,
        value: !checkboxValue,
      })
    },
    [checkboxValue, checkboxFieldPath, dispatchFields],
  )

  const readOnly = readOnlyFromProps || checkboxValue

  return (
    <div className="field-type slug-field-component">
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
        <FieldLabel htmlFor={`field-${path}`} label={label} />
        <Button buttonStyle="none" className="lock-button" onClick={handleLock}>
          {checkboxValue ? 'Unlock' : 'Lock'}
        </Button>
      </div>
      <TextInput
        onChange={setValue}
        path={path || field.name}
        readOnly={Boolean(readOnly)}
        value={value}
      />
    </div>
  )
}
