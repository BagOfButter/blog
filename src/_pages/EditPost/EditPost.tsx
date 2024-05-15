"use client";

import EditPostForm from "@/components/EditPostForm/EditPostForm";

const EditPost = ({ id }: { id: string }) => {
  return <EditPostForm id={id} />;
};

export default EditPost;
