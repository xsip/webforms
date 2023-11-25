import { initControlListeners } from './initControlListeners'
import { FormGroupType } from './types'
import { initFormControl } from './initFormControl'
import { createFormControl } from './createFormControl'
import { initFormGroup } from './iinitFormGroup'

export function FormGroup<T extends object>(
  container: HTMLElement | Document = document,
  model: T,
  config: {
    onChangesStrategy: 'keyup' | 'change'
  } = { onChangesStrategy: 'keyup' },
): FormGroupType<T> {
  const group: FormGroupType<T> = {} as FormGroupType<T>
  initFormGroup(group, model)

  Object.keys(model).forEach(property => {
    group.controls[property] = createFormControl<any>(property, container)
    initFormControl(group.controls[property], model[property])
    initControlListeners(property, model, group, container, config.onChangesStrategy)
  })
  return group
}
