import {FormControl} from './types';

export function initFormControl(formControl: FormControl<any>, value: any) {
  formControl.setValue(value)
}