import Post from "@/_pages/Post/Post";

const PostPage = ({ params }: { params: { id: string } }) => {
  return <Post id={params.id} />;
};

export default PostPage;
