import React, { Component } from 'react';
import styled from 'styled-components';

import { Search } from '../Search';
import { ApplicationInfo } from '../Application';
import { primaryDark, textOnPrimary } from '../../styles/colors';

const Container = styled.div`
  background: ${primaryDark};
  color: ${textOnPrimary};
  box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.9);
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Footer = styled.div`
  text-align: center;
`;

export class Sidebar extends Component {
  render() {
    return (
      <Container>
        <Search />
        <ApplicationInfo />
        <Footer>Data collected by OpenAustralia</Footer>
      </Container>
    );
  }
}
