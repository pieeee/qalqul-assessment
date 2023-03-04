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
import { useRouter } from "next/router";

const ArticleReactions = ({
  articleSlug,
  userId,
  reaction,
}: {
  articleSlug: string;
  userId?: string;
  reaction: { like: number; dislike: number; comment: number };
}) => {
  const router = useRouter();
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

  const onComment = () => {
    if (router.pathname === "/") {
      router.push(`${articleSlug}#comment`);
    }
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

      <button onClick={onComment}>
        <HiOutlineChatBubbleOvalLeft />
        <span>{reaction?.comment ?? 0} Comment</span>
      </button>
    </div>
  );
};

export default ArticleReactions;
