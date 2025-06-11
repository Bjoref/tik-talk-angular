import { accessGuard } from './access.guard';
import { tokenInterceptor } from './token.interceptor';
import { AuthHttpService, AuthToken } from '@tt/shared';

export {
    accessGuard,
    tokenInterceptor,
    AuthHttpService,
}

export type {
    AuthToken
}