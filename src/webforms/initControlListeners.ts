import { FormGroupType } from './types'

export function initControlListeners<T = any>(
  property: string,
  model: any,
  group: FormGroupType<any>,
  container: HTMLElement | Document,
  strategy: 'keyup' | 'change',
) {
  ;(
    container.querySelector(`[name="${property}"]`) as HTMLInputElement
  ).addEventListener(strategy, e => {
    group.controls[property].touched = true

    group.controls[property].errors = []

    group.hasErrors = false
    group.controls[property].validators.forEach(l => {
      const res = l(group.controls[property].getValue())
      if (res) {
        group.controls[property].errors.push(res)
        group.hasErrors = true
      }
    })

    group.valueChangeListeners.forEach(l => {
      l(getFormGroupValue(model, group), group)
    })
  })
}

function getFormGroupValue(model: any, group: FormGroupType<any>) {
  const res: any = {}
  Object.keys(model).forEach(k => {
    res[k] = group.controls[k].getValue()
  })
  return res
}
