import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileHttpService } from '@tt/data-access';
import { profileActions } from './actions';
import { map, switchMap, tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProfileEffects {
	profileService = inject(ProfileHttpService);

	actions$ = inject(Actions);

	filterProfiles = createEffect(() => {
		return this.actions$.pipe(
			ofType(profileActions.filterEvents),
			switchMap(({ filters }) => {
				return this.profileService.filterProfiles(filters);
			}),
			map((res) => {
				return profileActions.profilesLoaded({ profiles: res.items });
			})
		);
	});
}
