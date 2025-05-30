import { Component, effect, inject, ViewChild } from '@angular/core';
import { UiProfileHeaderComponent } from "../../common-ui/ui-profile-header/ui-profile-header.component";
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProfileHttpService } from '../../data/services/profile-http.service';
import { firstValueFrom } from 'rxjs';
import { UiAvatarUploadComponent } from '../../common-ui/ui-avatar-upload/ui-avatar-upload.component';
import { AuthHttpService } from '../../data/services/auth-http.service';

@Component({
  selector: 'settings',
  imports: [UiProfileHeaderComponent, ReactiveFormsModule, UiAvatarUploadComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  @ViewChild(UiAvatarUploadComponent) uiAvatar!: UiAvatarUploadComponent

  profileService = inject(ProfileHttpService);
  authHttpService = inject(AuthHttpService);
  
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
    firstValueFrom(this.profileService.patchProfile({
      ...this.form.value,
      stack: this.splitStack(this.form.value.stack)
    }));

    if(this.uiAvatar.avatar) {
      firstValueFrom(this.profileService.uploadAvatar(this.uiAvatar.avatar))
    }
  }

  splitStack(stack: string | null | string[] | undefined):string[] {
    if(Array.isArray(stack)) return stack

    if(!stack) return [];

    return stack.split(',')
  }

  mergeStack(stack: string | null | string[]):string {
    if(Array.isArray(stack)) return stack.join(',')

    if(!stack) return '';

    return stack;
  }

  logout() {
    this.authHttpService.logout()
  }

}
