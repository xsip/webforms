import { FormControl, FormGroupType, ValueListener } from './types'
import { addDebounce } from './utils'

export function initFormGroup<T extends object>(
  group: FormGroupType<T>,
  model: T,
): void {
  group.valueChangeListeners = []
  group.controls = {} as any
  group.hasErrors = false;
  group.getValue = () => {
    const res: any = {}
    Object.keys(model).forEach(k => {
      res[k] = group.controls[k].getValue()
    })
    return res
  }

  group.setValue = value => {
    Object.keys(value).forEach(key => {
      if (!group.controls[key]) console.warn(`No Control for ${key}`)
    })
    Object.entries(group.controls).forEach(([key, entry]) => {
      ;(entry as FormControl<any>).setValue(value[key])
    })
    group.validate();
  }

  group.disable = () => {
    Object.entries(group.controls).forEach(([, entry]) => {
      ;(entry as FormControl<any>).disable()
    })
  }

  group.enable = () => {
    Object.entries(group.controls).forEach(([, entry]) => {
      ;(entry as FormControl<any>).enable()
    })
  }

  group.addValueChangesListener = (
    listener: (value: T, formGroup: FormGroupType<T>) => void,
    debounceTime?: number,
  ): ValueListener => {
    group.valueChangeListeners.push(
      debounceTime ? addDebounce(listener, debounceTime) : listener,
    )
    const index = group.valueChangeListeners.length - 1
    return {
      remove: () => {
        delete group.valueChangeListeners[index]
      },
    } as ValueListener
  }

  group.getErrorList = () => {
    const res: any = {}
    Object.entries(group.controls).forEach(([key, entry]) => {
      res[key] = (entry as FormControl<any>).errors
    })
    return res
  }
  group.validate = () => {
    group.hasErrors = false;
    Object.entries(group.controls).forEach(([, entry]) => {
      const el = entry as FormControl<any>
      el.errors = []
      el.validators.forEach(v => {
        const error = v(el.getValue())
        if(error) {
          el.errors.push(error)
          group.hasErrors = true;
        }
      })
    })
  }
}
