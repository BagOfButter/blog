export type InitialState = {
  posts: Post[];
};

export type Post = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  comments: string[];
};

export type TCreatePostProps = {
  title: string;
  content: string;
  tags: string[];
  comments: string[];
};

export type TEditPostProps = {
  id: string;
  title: string;
  content: string;
  tags: string[];
};

export type TAddCommentProps = {
  id: string;
  comment: string;
};
