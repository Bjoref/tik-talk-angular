import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { FormInput } from '../../data/types/formInput';
import { UiButtonComponent } from '../../common-ui/ui-button/ui-button.component';
import { AuthHttpService } from '../../data/services/auth-http.service';

@Component({
  selector: 'page-login',
  imports: [ReactiveFormsModule, UiButtonComponent,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authService = inject(AuthHttpService);


  public inputs: FormInput[] = [
    {
      type: 'text',
      formControlName: 'username',
      iconUrl: null,
      placeholder: 'Введите логин',
      label: 'Telegram username',
      autocomplete: 'on',
    },
    {
      type: 'password',
      formControlName: 'password',
      iconUrl: null,
      placeholder: 'Введите пароль',
      label: 'Пароль',
      autocomplete: 'off',
    },

  ]
  public form: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  })

  onSubmit(event: Event) {
    console.log(this.form.value)
    console.log(this.form.valid)

    if(this.form.valid) {
      this.authService.login(this.form.value)
        .subscribe(val => {
          console.log(val)
        })    
    }


  }
}
