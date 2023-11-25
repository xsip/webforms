import { FormGroupType } from './types'
import { FormGroup } from './form'

export function renderForm<T>(
  container: HTMLElement,
  model: {
    [key in keyof T]: {
      value?: string
      type: 'text' | 'password' | 'email' | 'number'
      label: string
    }
  },
): FormGroupType<T> {
  const fgModel: T & object = {} as T & object
  Object.keys(model).forEach(property => {
    const element = createFormField(property, model[property])
    console.log(element);
    container.appendChild(element)
    fgModel[property] = model[property].value ?? ''
  })
  const fg = FormGroup(container, fgModel) as FormGroupType<T>
  return fg
}

function createFormField(
  name: string,
  model: {
    value?: string
    type: 'text' | 'password' | 'email' | 'number'
    label: string
  },
): HTMLDivElement {
  const containerElement = document.createElement('div') as HTMLDivElement
  containerElement.classList.add(`${name}-container`);

  const labelElement = document.createElement('label') as HTMLLabelElement
  labelElement.setAttribute('for', name);
  labelElement.innerText = model.label;

  const inputElement = document.createElement('input') as HTMLInputElement
  inputElement.name = name
  inputElement.type = model.type


  containerElement.appendChild(labelElement);
  containerElement.appendChild(inputElement);
  return containerElement;
}
