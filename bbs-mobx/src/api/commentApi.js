import { get, post } from "../utils/request";
import url from "../utils/url";


export default{
    getCommentList:postID =>get(url.getCommentList(postID)),
    createComment: data=>post(url.createComment(),data)
}