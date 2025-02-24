import React from 'react';
import styled from 'styled-components';
import { Menu } from "@mui/icons-material"; 
import { IconButton } from '@mui/material';

const NavBarDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 40px;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  gap: 30px;
  background: ${({ theme }) => theme.bg_light};
  box-shadow: 8px 4px 30px rgba(0, 0, 0, 0.1); 
  backdrop-filter: blur(5.7px);
  -webkit-backdrop-filter: blur(5.7px);
`;

const NavBar = ({ setMenuOpen, menuOpen }) => {
  return (
    <NavBarDiv>
      <IconButton onClick={() => setMenuOpen(!menuOpen)}>
        <Menu />
      </IconButton>
    </NavBarDiv>
  );
};

export default NavBar;
