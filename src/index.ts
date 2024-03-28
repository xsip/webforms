import './style.scss'
import { FormGroup } from './webforms/form'
import { renderForm } from './webforms/renderForm'

window.onload = () => {
  const fg2 = renderForm(document.getElementById('form2') as HTMLElement, {
    name: { type: 'text', label: 'Name', value: 'Name' },
    email: { type: 'email', label: 'Email', value: 'xsip@pm.me' },
    password: { type: 'password', label: 'Password', value: 'password' },
  })
  const fg = FormGroup(document.getElementById('form1') as HTMLElement, {
    name: 'test123',
    email: 'wewd',
    password: '',
  })

  fg.addValueChangesListener((data, group) => {
    console.log('2', data, group)
  }, 200)

  const validator = fg.controls.email.addValidator(v => {
    return v.includes('@') ? undefined : 'INCLUDE_AT_SIGN'
  })

  fg.setValue({ email: 'xsippm.me', name: 'xsip', password: 'password' })

  console.log(fg.getValue())
  console.log(fg.controls.name.getValue())

  console.log(fg.getErrorList())
  fg.controls.name.validate()

  console.log(fg.controls.name.errors)

  fg.controls.password.disable()
  fg.disable()

  // @ts-ignore
  window.fg = fg
}
