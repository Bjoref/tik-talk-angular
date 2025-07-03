import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { profileActions, ProfileHttpService, selectFilters, selectProfilePageable } from '@tt/data-access';
import { concat, map, switchMap, tap, withLatestFrom } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProfileEffects {
	profileService = inject(ProfileHttpService);

	actions$ = inject(Actions);
	store = inject(Store);
	
	filterProfiles = createEffect(() => {
		return this.actions$.pipe(
			ofType(
				profileActions.filterEvents,
				profileActions.setPage
			),
			withLatestFrom(
				this.store.select(selectFilters),
				this.store.select(selectProfilePageable)
			),
			switchMap(([_, filters, pageable]) => {
				console.log(filters)
				console.log(pageable)
				return this.profileService.filterProfiles({ ...filters, ...pageable});
			}),
			map((res) => {
				return profileActions.profilesLoaded({ profiles: res.items });
			})
		);
	});
}
