import styled from "styled-components";

export const PostTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

export const PostContent = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  word-wrap: break-word;
`;

export const CommentForm = styled.form`
  margin-top: 20px;
`;

export const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const CommentItem = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: #f5f5f5;
  word-wrap: break-word;

  @media (max-width: 767px) {
    max-width: 90%;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    max-width: 70%;
  }
  @media (min-width: 1024px) {
    max-width: 50%;
  }
`;
