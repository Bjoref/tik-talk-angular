import { createActionGroup, props } from "@ngrx/store";
import { Post, PostComment } from "@tt/data-access";

export const postsActions = createActionGroup({
    source: 'posts',
    events: {
        'posts loaded': props<{posts: Post[]}>(),
        'add comment': props<{comments: PostComment[]}>(),
    }
})