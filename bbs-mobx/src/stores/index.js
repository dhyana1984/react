import AppStore from './AppStore';
import AuthStore from './AuthStore';
import CommentsStore from './CommentsStore';
import UIStore from './UIStore';
import PostsStore from './PostsStore';
import authApi from '../api/authApi';
import commentApi from '../api/commentApi';
import postApi from '../api/postApi';

const appStore = new AppStore()
const authStore = new AuthStore(authApi,appStore)
const commentsStore = new CommentsStore(commentApi,appStore,authStore)
const uiStore = new UIStore()
const postsStore = new PostsStore(postApi,appStore,authStore) 

const stores ={
    appStore,
    authStore,
    commentsStore,
    uiStore,
    postsStore,
}

export default stores