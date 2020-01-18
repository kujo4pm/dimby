import React from 'react';
import styled from 'styled-components';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { MapViewportContext } from '../Map';

const Container = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 3px;
  padding: 5px;
  width: max-content;

  .react-daterange-picker__wrapper {
    border: none;
  }

  .react-daterange-picker__range-divider {
    margin-top: 4px;
    padding: 0 8px;
  }
`;

export const DateFilter = () => {
  const updateDateRange = React.useCallback((date, updateRange) => {
    updateRange({ dateRange: date });
  }, []);

  return (
    <MapViewportContext.Consumer>
      {({ updateApplicationFilters, applicationFilters }) => (
        <Container>
          <DateRangePicker
            format="dd/MM/y"
            onChange={date => updateDateRange(date, updateApplicationFilters)}
            value={applicationFilters.dateRange}
          />
        </Container>
      )}
    </MapViewportContext.Consumer>
  );
};
