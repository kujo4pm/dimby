import React from 'react';
import styled from 'styled-components';
import { DateFilter } from './DateFilter';

const Container = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  padding: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  background: rgba(255, 255, 255, 0.75);
  border-radius: 3px;

  h5 {
    margin: 0 0 10px 0;
    text-transform: uppercase;
    font-weight: 500;
  }
`;

export const FilterDropdown = () => {
  return (
    <Container>
      <h5>Application Filters</h5>
      <DateFilter />
    </Container>
  );
};
