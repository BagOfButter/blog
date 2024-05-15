import styled from "styled-components";

export const TagsContainer = styled.div`
  display: flex;
  font-size: 18px;

  @media (max-width: 767px) {
    flex-direction: column;
  }
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const CheckboxInput = styled.input`
  margin-right: 5px;
`;

export const PostTitle = styled.h2`
  font-size: 20px;
`;

export const PostContent = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  word-wrap: break-word;
`;

export const PostItem = styled.div`
  margin-top: 10px;
  border-radius: 5px;
  padding: 10px;
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
