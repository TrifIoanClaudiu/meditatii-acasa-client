import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IconButton } from '@mui/material';
import { ArrowBack, Home, AccountCircle } from '@mui/icons-material';
import { useDispatch } from "react-redux";
import {logout} from "../redux/userRedux.js"

const ToolbarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background-color: transparent;
  z-index: 100;
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 8px; /* Adjust the gap value to your preference */
`;

const Toolbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoToProfile = () => {
    navigate(`/profile`);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate(`/login`)
  };

  return (
    <ToolbarContainer>
      <IconsContainer>
        <IconButton onClick={handleGoBack}>
          <ArrowBack />
        </IconButton>
        <IconButton onClick={handleGoHome}>
          <Home />
        </IconButton>
        <IconButton onClick={handleGoToProfile}>
          <AccountCircle />
        </IconButton>
      </IconsContainer>
        <IconButton style={{ marginRight: '15px' }} onClick={handleLogout}>
          Logout
        </IconButton>
    </ToolbarContainer>
  );
};

export default Toolbar;
