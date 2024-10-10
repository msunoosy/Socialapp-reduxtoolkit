import React, { useState } from "react";
import { selectAllUsers } from "../users/usersSlice";
import { selectPostById, updatePost, deletePost } from "./postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

function EditPostForm() {
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUSerId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");

  if (!post) {
    <section>Post Not Found</section>;
  }
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUSerId(Number(e.target.value));
  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();
        setTitle("");
        setContent("");
        setUSerId("");
        navigate(`/post/${postId}`);
      } catch (err) {
        console.log("failed to save updated post ", err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const usersOptions = users.map(user => (
    <option
        key={user.id}
        value={user.id}
    >{user.name}</option>
))

  const onDeletePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          deletePost({id:post.id})).unwrap();

        setTitle("");
        setContent("");
        setUSerId("");
        navigate(`/`);

      } catch (err) {
        console.log("failed to save updated post ", err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };


  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        ></input>
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
        <button className="deleteButon" type='button' onClick={onDeletePostClicked}> delete Post</button>
      </form>
    </section>
  );
}

export default EditPostForm;
