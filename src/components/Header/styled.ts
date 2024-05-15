import Link from "next/link";
import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #333333;
  color: #ffffff;
`;

export const Logo = styled.h1`
  font-size: 24px;
  margin: 0;
`;

export const NavLink = styled(Link)`
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
  margin-left: 20px;
  transition: color 0.3s ease;

  &:hover {
    color: #a1a1a1;
  }
`;
