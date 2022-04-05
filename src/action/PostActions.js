import * as action from './ActionTypes.js'

export const getPost = () => dispatch => {
  dispatch({
    type: action.GET_POST_START
  })
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(items =>{
      dispatch({
        type: action.GET_POST,
        payload: items
      })
      console.log(items)
      console.log("Dari Action")
    }
    );
};

export const createPost = (formState, navigate) => dispatch => {
  dispatch({
    type: action.CREATE_POST_START
  }) 
  console.log(formState)
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: formState.values.item_title,
      body: formState.values.item_body,
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then((response) => response.json())
    navigate('/')
}

export const editPost = (id, formState, navigate) => dispatch => {
  dispatch({
    type: action.EDIT_POST_START
  })
  console.log("Action Edit")
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
  method: 'PUT',
  body: JSON.stringify({
    id: id,
    title: formState.values.item_title,
    body: formState.values.item_body,
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  })
  .then((response) => response.json())
  navigate('/')
}
export const deletePost = (id, navigate) => dispatch => {
  dispatch({
    type: action.DELETE_POST_START
  })
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
  method: 'DELETE',
  });
  navigate('/')
}