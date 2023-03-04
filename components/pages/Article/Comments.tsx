import { useAppDispatch } from "lib/store/hooks";
import {
  ArticleReactionType,
  IReaction,
  onReaction,
} from "lib/store/slices/article.slice";
import React, { useState } from "react";
import styles from "@/styles/pages/article.module.scss";

interface CommentsProps {
  comments: IReaction[];
  userId?: string;
  articleSlug: string;
}

const Comments: React.FC<CommentsProps> = ({
  comments,
  userId,
  articleSlug,
}) => {
  const [comment, setComment] = useState("");
  const dispatch = useAppDispatch();

  const postComment = () => {
    if (!userId) {
      return;
    }

    if (!comment) {
      return;
    }

    dispatch(
      onReaction({
        userId,
        articleSlug,
        comment,
        reactionType: ArticleReactionType.COMMENT,
      })
    );
    setComment("");
  };

  return (
    <div className={styles.comments_container}>
      <div className={styles.header}>
        <span>All Comments ({comments.length})</span>
      </div>

      <textarea
        id="#comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        name=""
        rows={6}
        placeholder="Post your comment"
      ></textarea>
      <button onClick={postComment}>Comment</button>

      <ul>
        {comments.map(({ comment, reactionId }) => (
          <li key={reactionId}>
            <span>{comment}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
