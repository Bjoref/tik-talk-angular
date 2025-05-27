import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProfileHttpService } from '../../data/services/profile-http.service';
import { debounceTime, startWith, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ui-search-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './ui-search-filters.component.html',
  styleUrl: './ui-search-filters.component.scss'
})
export class UiSearchFiltersComponent {
  profileService = inject(ProfileHttpService);
  fb = inject(FormBuilder);

  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  })

  constructor() {
    this.searchForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(300),
        switchMap(formValue => {
          return this.profileService.filterProfiles(formValue)
        }),
        takeUntilDestroyed()
      ).subscribe()
  }

}
