import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { v4 } from "uuid";
import content from "lib/articles.json";

export enum ArticleReactionType {
  LIKE = "LIKE",
  DISLIKE = "DISLIKE",
  COMMENT = "COMMENT",
}

export interface IReaction {
  reactionId: string;
  reactionType: ArticleReactionType;
  userId: string;
  articleSlug: string;
  comment?: string;
}

interface IArticleState {
  reactions: IReaction[];
}

const initialState: IArticleState = {
  reactions: [],
};

export const articleSlice = createSlice({
  name: "registrationModal",
  initialState,
  reducers: {
    onReaction: (
      state,
      action: PayloadAction<Omit<IReaction, "reactionId">>
    ) => {
      if (action.payload.reactionType === ArticleReactionType.COMMENT) {
        state.reactions.push({ reactionId: v4(), ...action.payload });
        return;
      }

      // handle like and dislike

      const existingReaction = state.reactions.filter(
        (reaction) =>
          reaction.userId === action.payload.userId &&
          reaction.articleSlug === action.payload.articleSlug &&
          reaction.reactionType !== ArticleReactionType.COMMENT
      )[0];

      if (!existingReaction) {
        state.reactions.push({ reactionId: v4(), ...action.payload });
        return;
      }

      if (existingReaction.reactionType === action.payload.reactionType) {
        state.reactions = state.reactions.filter(
          (reaction) => existingReaction.reactionId !== reaction.reactionId
        );
        return;
      }

      state.reactions = state.reactions.map((reaction) => {
        if (reaction.reactionId === existingReaction.reactionId) {
          return { ...reaction, reactionType: action.payload.reactionType };
        }
        return reaction;
      });
    },
    // toggleModal: (state) => {
    //   state.show = !state.show;
    // },
  },
});

export const { onReaction } = articleSlice.actions;

export const selectReactions = (state: RootState) => {
  const allReactions = state.articleReducer.reactions;
  const reactionsCount: {
    [key: string]: { like: number; dislike: number; comment: number };
  } = {};

  allReactions.forEach((reaction) => {
    if (!reactionsCount[reaction.articleSlug]) {
      reactionsCount[reaction.articleSlug] = {
        like: 0,
        dislike: 0,
        comment: 0,
      };
    }

    if (reaction.reactionType === ArticleReactionType.LIKE) {
      reactionsCount[reaction.articleSlug].like =
        reactionsCount[reaction.articleSlug].like + 1;
    }

    if (reaction.reactionType === ArticleReactionType.DISLIKE) {
      reactionsCount[reaction.articleSlug].dislike =
        reactionsCount[reaction.articleSlug].dislike + 1;
    }

    if (reaction.reactionType === ArticleReactionType.COMMENT) {
      reactionsCount[reaction.articleSlug].comment =
        reactionsCount[reaction.articleSlug].comment + 1;
    }
  });

  return reactionsCount;
};

export const selectReactionsByArticle =
  (slug: string) => (state: RootState) => {
    const reactionsCount = {
      like: 0,
      dislike: 0,
      comment: 0,
    };

    const reactions = state.articleReducer.reactions.filter(
      (reaction) => reaction.articleSlug === slug
    );

    if (reactions.length === 0) {
      return reactionsCount;
    }

    reactions.forEach((reaction) => {
      if (reaction.reactionType === ArticleReactionType.LIKE) {
        reactionsCount.like = reactionsCount.like + 1;
      }

      if (reaction.reactionType === ArticleReactionType.DISLIKE) {
        reactionsCount.dislike = reactionsCount.dislike + 1;
      }

      if (reaction.reactionType === ArticleReactionType.COMMENT) {
        reactionsCount.comment = reactionsCount.comment + 1;
      }
    });

    return reactionsCount;
  };

export const selectCommentsByArticle =
  (articleSlug: string) => (state: RootState) => {
    return state.articleReducer.reactions
      .filter(
        (reaction) =>
          reaction.articleSlug === articleSlug &&
          reaction.reactionType === ArticleReactionType.COMMENT
      )
      .reverse();
  };

interface IArticle {
  slug: string;
  title: string;
}

export const selectArticlesByuser = (userId?: string) => (state: RootState) => {
  if (!userId) {
    return [];
  }

  const articles: { [key: string]: IArticle } = {};

  content.forEach((content) => {
    articles[content.slug] = { slug: content.slug, title: content.title };
  });

  const likedArticles: IArticle[] = [];

  state.articleReducer.reactions.forEach((reaction) => {
    if (
      reaction.userId === userId &&
      reaction.reactionType === ArticleReactionType.LIKE
    ) {
      likedArticles.push(articles[reaction.articleSlug]);
    }
  });

  return likedArticles;
};

// export const selectRegistrationModal = (state: RootState) =>
//   state.registrationModalReducer.show;

export default articleSlice.reducer;
