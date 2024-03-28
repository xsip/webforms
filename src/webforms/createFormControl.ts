import { FormControl, FormGroupType, Validator, ValueListener } from './types'

export function createFormControl<T>(
  property: string,
  container: HTMLElement | Document,
): FormControl<T> {
  const el: FormControl<T> = {
    validators: [],
    errors: [],
    element: () =>
      container.querySelector(`[name="${property}"]`) as HTMLInputElement,
    touched: false,
    getValue: () => {
      return (
        container.querySelector(`[name="${property}"]`) as HTMLInputElement
      )?.value
    },
    setValue: (value: any) => {
      const el = container.querySelector(
        `[name="${property}"]`,
      ) as HTMLInputElement
      if (el) {
        el.value = value
      }
    },
    disable: () => {
      const el = container.querySelector(
        `[name="${property}"]`,
      ) as HTMLInputElement
      if (el) el.setAttribute('disabled', 'true')
    },
    enable: () => {
      const el = container.querySelector(
        `[name="${property}"]`,
      ) as HTMLInputElement
      if (el) el.removeAttribute('disabled')
    },
  } as unknown as FormControl<T>

  el.addValidator = (
    validator: (value: T) => string | undefined,
  ): Validator => {
    el.validators.push(validator)
    const index = el.validators.length - 1
    return {
      remove: () => {
        delete el.validators[index]
      },
    } as Validator
  }

  el.validate = () => {
    el.errors = []
    el.validators.forEach(v => {
      const error = v(el.getValue())
      error && el.errors.push(error)
    })
  }

  return el
}
