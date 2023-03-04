import React from "react";
import {
  HiOutlineThumbDown,
  HiOutlineThumbUp,
  HiThumbUp,
} from "react-icons/hi";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "lib/store/hooks";
import { selectUser } from "lib/store/slices/user.slice";
import { toggleModal } from "lib/store/slices/registrationModal.slice";
import {
  ArticleReactionType,
  onReaction,
} from "lib/store/slices/article.slice";
import styles from "@/styles/pages/article.module.scss";

const ArticleReactions = ({
  articleSlug,
  userId,
  reaction,
}: {
  articleSlug: string;
  userId?: string;
  reaction: { like: number; dislike: number; comment: number };
}) => {
  const dispatch = useAppDispatch();
  const showRegistrationModal = () => dispatch(toggleModal());
  const onArticleAction = (reactionType: ArticleReactionType) => {
    if (!userId) {
      showRegistrationModal();
      return;
    }
    dispatch(
      onReaction({
        userId,
        reactionType,
        articleSlug,
      })
    );
  };

  return (
    <div className={styles.button_group}>
      <button onClick={() => onArticleAction(ArticleReactionType.LIKE)}>
        <HiOutlineThumbUp />
        <span>{reaction?.like ?? 0} Like</span>
      </button>

      <button onClick={() => onArticleAction(ArticleReactionType.DISLIKE)}>
        <HiOutlineThumbDown />
        <span>{reaction?.dislike ?? 0} Dislike</span>
      </button>

      <button>
        <HiOutlineChatBubbleOvalLeft />
        <span>{reaction?.comment ?? 0} Comment</span>
      </button>
    </div>
  );
};

export default ArticleReactions;
