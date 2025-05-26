import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { FormInput } from '../../data/types/formInput';
import { UiButtonComponent } from '../../common-ui/ui-button/ui-button.component';
import { AuthHttpService } from '../../data/services/auth-http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'page-login',
  imports: [ReactiveFormsModule, UiButtonComponent,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authService = inject(AuthHttpService);
  router: Router = inject(Router);

  isPasswordVisible = signal<boolean>(false)


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
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  })

  onSubmit(event: Event) {
    if(this.form.valid) {
      this.authService.login(this.form.value)
        .subscribe(val => {
          this.router.navigate([''])
        })    
    }
  }

  changeVisibility():void {
    this.isPasswordVisible.set(!this.isPasswordVisible)
  }
}
