import React from 'react';
import styled from 'styled-components';

import { MapViewportContext } from '../Map/MapViewportContext';
import { Search } from '../Search';
import { ApplicationInfo } from '../Application';
import { primaryDark, textOnPrimary } from '../../styles/colors';

const Container = styled.div`
  background: ${primaryDark};
  color: ${textOnPrimary};
  box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.9);
  z-index: 10;
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: ${({ isSearchOpen }) =>
    isSearchOpen ? '50px auto' : ' 50px auto 30px'};
  align-content: space-between;
`;

const Footer = styled.div`
  text-align: center;
`;

export const Sidebar = () => (
  <MapViewportContext.Consumer>
    {({ isSearchOpen }) => (
      <Container isSearchOpen={isSearchOpen}>
        <Search />
        <ApplicationInfo isSearchOpen={isSearchOpen} />
        {!isSearchOpen && <Footer>Data collected by OpenAustralia</Footer>}
      </Container>
    )}
  </MapViewportContext.Consumer>
);
