import React from "react";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link, useParams } from "react-router-dom";

function SinglePostPage() {
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  if (!post) {
    return <section>Post not found!!!</section>
  }
    return (
      <article>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <p className="postCredit">
            <Link to={`/post/edit/${post.id}`}>Edit </Link>
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </p>
        <ReactionButtons post={post} />
      </article>
    );
  
}

export default SinglePostPage;
