import constant from './constants';

export const fetchPosts = () => dispatch => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(posts =>
      dispatch({
            type: constant.FETCH_POSTS,
            payload: posts
      })
    );
};