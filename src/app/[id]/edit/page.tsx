import EditPost from "@/_pages/EditPost/EditPost";

const EditPage = ({ params }: { params: { id: string } }) => {
  return <EditPost id={params.id} />;
};

export default EditPage;
