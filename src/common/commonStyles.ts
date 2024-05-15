import styled from "styled-components";

// Styles used in multiple places

export const Container = styled.div`
  padding: 30px;
`;

export const ErrorText = styled.p`
  color: #dc3545;
`;

export const PostButton = styled.button`
  font-size: 16px;
  font-weight: bold;
  background-color: #333333;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    background-color: #1c1c1c;
  }
`;

export const TextAreaInput = styled.textarea`
  font-family: "Inter", sans-serif;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
  min-height: 50px;
  font-size: 16px;

  @media (max-width: 767px) {
    width: 90%;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 70%;
  }
  @media (min-width: 1024px) {
    width: 50%;
  }
`;

export const TitleInput = styled.input`
  font-family: "Inter", sans-serif;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  @media (max-width: 767px) {
    width: 75%;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 50%;
  }
  @media (min-width: 1024px) {
    width: 25%;
  }
`;

export const FormTagsContainer = styled.div`
  font-size: 18px;
  margin-bottom: 30px;
`;
