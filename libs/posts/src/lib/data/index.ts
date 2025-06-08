import { Post, PostComment, EmitPostData } from "./interfaces/post.interface";
import { PostService } from "./services/post.service";
import { PostHttpService } from "./services/post-http.service";

export {
    PostService,
    PostHttpService
}

export type {
    Post,
    PostComment,
    EmitPostData
}