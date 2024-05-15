import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  doc,
  addDoc,
  getDocs,
  collection,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/database/firebase";
import { postsActions } from "./actions";
import {
  Post,
  TAddCommentProps,
  TCreatePostProps,
  TEditPostProps,
} from "./types";
import { QueryDocumentSnapshot, arrayUnion } from "firebase/firestore";
import { PayloadAction } from "@reduxjs/toolkit";

// Saga for fetching posts

function* fetchPostsSaga(): Generator<any, void, any> {
  try {
    const querySnapshot = yield call(getDocs, collection(db, "posts"));
    const loadedPosts: Post[] = [];
    querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
      const postData = doc.data();
      loadedPosts.push({
        id: doc.id,
        title: postData.title,
        content: postData.content,
        tags: postData.tags,
        comments: postData.comments,
      });
    });
    yield put(postsActions.setPosts(loadedPosts));
  } catch (error) {
    console.error("Error loading posts: ", error);
  }
}

// Saga for deleting post

function* deletePostSaga(
  action: PayloadAction<string>
): Generator<any, void, any> {
  try {
    const postId = action.payload;
    console.log(postId);
    yield call(deleteDoc, doc(db, "posts", postId));
  } catch (error) {
    console.error("Error loading posts: ", error);
  }
}

// Saga for creating post

function* createPostSaga(
  action: PayloadAction<TCreatePostProps>
): Generator<any, void, any> {
  try {
    const { title, content, tags, comments } = action.payload;
    const postData = {
      title,
      content,
      tags,
      comments,
    };
    yield call(addDoc, collection(db, "posts"), postData);
  } catch (error) {
    console.error("Error loading posts: ", error);
  }
}

// Saga for editing post

function* editPostSaga(
  action: PayloadAction<TEditPostProps>
): Generator<any, void, any> {
  try {
    const { id, ...postData } = action.payload;
    const docRef = doc(db, "posts", id);
    yield call(() => updateDoc(docRef, postData));
  } catch (error) {
    console.error("Error editing post: ", error);
  }
}

// Saga for adding comment

function* addCommentSaga(
  action: PayloadAction<TAddCommentProps>
): Generator<any, void, any> {
  try {
    const { id, comment } = action.payload;
    const docRef = doc(db, "posts", id);
    yield call(() =>
      updateDoc(docRef, {
        comments: arrayUnion(comment),
      })
    );
    yield put(postsActions.setComment(action.payload));
  } catch (error) {
    console.error("Error editing post: ", error);
  }
}

function* watchPosts(): Generator {
  yield takeLatest(postsActions.FETCH_POSTS.type, fetchPostsSaga);
  yield takeLatest(postsActions.DELETE_POST.type, deletePostSaga);
  yield takeLatest(postsActions.CREATE_POST.type, createPostSaga);
  yield takeLatest(postsActions.EDIT_POST.type, editPostSaga);
  yield takeLatest(postsActions.ADD_COMMENT.type, addCommentSaga);
}

export function* postsSagas(): Generator {
  yield all([watchPosts()]);
}
