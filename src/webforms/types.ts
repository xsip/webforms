export type FormControl<T> = {
  element: () => HTMLElement
  touched?: boolean
  getValue: () => T
  setValue: (value: T) => void
  enable: () => void
  disable: () => void
  addValidator: (validator: (value: T) => string | undefined) => Validator
  validators: ((value: T) => string | undefined)[]
  errors: string[]
  validate: () => void
}
export type FormGroupType<T> = {
  controls: {
    [key in keyof T]: FormControl<T[key]>
  }
  addValueChangesListener: (
    listener: (data: T, formGroup: FormGroupType<T>) => void,
    debounceTime?: number,
  ) => ValueListener
  valueChangeListeners: ((data: T, formGroup: FormGroupType<T>) => void)[]
  getValue: () => T
  setValue: (value: T) => void
  disable: () => void
  enable: () => void
  getErrorList: () => { [key in keyof T]: string[] }
  validate: () => void
  hasErrors: boolean
}

export type ValueListener = {
  remove: () => void
}

export type Validator = {
  remove: () => void
}
