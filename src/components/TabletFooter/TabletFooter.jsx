import React from 'react';
import styled from 'styled-components';

import { MapViewportContext } from '../Map/MapViewportContext';
import { ApplicationInfo } from '../Application';
import { primaryDark, textOnPrimary } from '../../styles/colors';

const Container = styled.div`
  background: ${primaryDark};
  color: ${textOnPrimary};
  box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.9);
  z-index: 10;
  position: absolute;
  bottom: 0;
  width: 100%;
  /* display: grid; */
  /* grid-auto-flow: row; */
  /* grid-template-rows: ${({ isSearchOpen }) =>
    isSearchOpen ? '50px auto' : ' 50px auto 30px'}; */
  /* align-content: space-between; */
`;

export const TabletFooter = () => (
  <MapViewportContext.Consumer>
    {({ isSearchOpen }) => (
      <Container isSearchOpen={isSearchOpen}>
        <ApplicationInfo showImage={false} isSearchOpen={isSearchOpen} />
      </Container>
    )}
  </MapViewportContext.Consumer>
);
