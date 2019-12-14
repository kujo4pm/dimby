import React from 'react';
import styled from 'styled-components';
import { DateFilter } from './DateFilter';
import { ChevronDown } from '../common/ChevronDown';
import { MapViewportContext } from '../Map';

const Container = styled.div`
  position: absolute;
  top: 50px;
  z-index: 10;
  width: 100%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  background: rgba(255, 255, 255, 0.75);

  h5 {
    margin: 0 0 10px 0;
    text-transform: uppercase;
    font-weight: 500;
    padding: 10px 14px 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }
`;

const Filters = styled.div`
  padding: 0 10px 10px 10px;
`;

export const TabletFilterDropdown = () => {
  const [showFilters, handleFilterDisplay] = React.useState(false);
  const toggleFilter = React.useCallback(() => {
    handleFilterDisplay(!showFilters);
  }, [showFilters]);

  return (
    <MapViewportContext.Consumer>
      {({ isSearchOpen }) =>
        !isSearchOpen && (
          <Container>
            <h5 onClick={toggleFilter}>
              Application Filters <ChevronDown />
            </h5>
            {showFilters && (
              <Filters>
                <DateFilter />
              </Filters>
            )}
          </Container>
        )
      }
    </MapViewportContext.Consumer>
  );
};
