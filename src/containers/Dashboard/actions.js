import { GETPosts, LOADPosts } from './constants';

export function getPosts() {
    return {
        type: GETPosts,
    };
}

export function loadPosts(posts) {
    return {
      type: LOADPosts,
      posts,
    };
  }
