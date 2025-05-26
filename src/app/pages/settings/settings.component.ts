import { Component, effect, inject } from '@angular/core';
import { UiProfileHeaderComponent } from "../../common-ui/ui-profile-header/ui-profile-header.component";
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProfileHttpService } from '../../data/services/profile-http.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'settings',
  imports: [UiProfileHeaderComponent, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  profileService = inject(ProfileHttpService);
  fb = inject(FormBuilder);

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{value: '', disabled: true}, Validators.required],
    description: [''],
    stack: [''],
  })

  onSave():void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if(this.form.invalid) return;

    //@ts-ignore
    firstValueFrom(this.profileService.patchProfile(this.form.value));

  }

  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue(this.profileService.me())
    })
  }
}
