
import * as types from './actionTypes';

export function receiveLogin(user) {
  return {
    type: types.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user: user
  }
}

export function loginError(message) {
  return {
    type: types.LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    errorMessage: message
  }
}

export function loginUser(creds) {
  return {
    type: types.LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

export function updateUser(user) {
    return {
        type: types.UPDATE_USER,
        user: user
    }
}

export function requestContent(url, page) {
    return {
        type: types.GLOBAL_CONTENT_REQUEST,
        url: url,
        page: page
    }
}

export function contentSuccess(data) {
    return {
        type: types.GLOBAL_CONTENT_SUCCESS,
        content: data.content,
        count: data.count
    }
}

export function clearExtraContent() {
    return {
        type: types.GLOBAL_CONTENT_CLEAR
    }
}
export function imageUpload(file, action) {
    return {
        type: types.GLOBAL_IMAGE_UPLOAD,
        file: file,
        action: action
    }
}

export function updateUrls(thumbnail, large_image) {
    return {
        type: types.GLOBAL_SET_IMAGES,
        image_one: thumbnail,
        image_two: large_image
    }
}

export function updateImageOne(url) {
    return {
        type: types.GLOBAL_SET_IMAGES,
        image_one: url
    }
}

export function updateImageTwo(url) {
    return {
        type: types.GLOBAL_SET_IMAGES,
        image_two: url
    }
}

export function showEditor(editor, article, game, project) {
    return {
        type: types.GLOBAL_SHOW_EDITOR,
        show: editor,
        article: article,
        game: game,
        project: project
    }
}

export function hideEditor() {
    return {
        type: types.GLOBAL_HIDE_EDITOR
    }
}

export function globalImageSuccess() {
    return {
        type: types.GLOBAL_IMAGE_SUCCESS
    }
}

export function submitThought(thought, action) {
    return {
        type: types.GLOBAL_THOUGHT_REQUEST,
        thought: thought,
        action: action
    }
}

export function thoughtSuccess() {
    return {
        type: types.GLOBAL_THOUGHT_SUCCESS
    }
}