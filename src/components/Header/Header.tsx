"use client";

import { HeaderContainer, Logo, NavLink } from "./styled";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  return (
    <HeaderContainer>
      <Logo>BLOG</Logo>
      {pathname !== "/" && <NavLink href="/">Back to Home</NavLink>}
    </HeaderContainer>
  );
};

export default Header;
