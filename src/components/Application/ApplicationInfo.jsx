import React, { Component } from 'react';
import styled from 'styled-components';

import { getImageUrl } from '../../api';
import { MapViewportContext } from '../Map/MapViewportContext';

import { primary, secondaryDark } from '../../styles/colors';
import PlanningPin from '../Map/PlanningPin';
import { ButtonLink } from '../common';

const Container = styled.div`
  margin: 10px;
  padding-bottom: 10px;
  background: ${primary};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

const Header = styled.div`
  display: flex;
  padding: 5px;
`;

const TitleField = styled.div`
  width: 100%;
  align-self: flex-end;
`;

const Address = styled.span`
  font-weight: 600;
`;

const PinIcon = styled.div`
  height: 28px;
  width: 28px;
  position: relative;
  top: 5px;
  margin-right: 10px;

  > svg {
    height: 28px;
    width: 28px;
  }
`;

const Description = styled.div`
  padding: 10px 10px 0 10px;
`;

const ExternalInfo = styled.div`
  margin: 10px;
  padding-top: 10px;
  border-top: 1px solid ${secondaryDark};
`;

const StreetViewImage = styled.div`
  display: flex;
`;

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streetViewImage: null,
      address: props.application.address || null
    };
    this.getImage = this.getImage.bind(this);
  }

  async getImage() {
    const { address } = this.state;
    if (!address) return;
    const imageUrl = await getImageUrl({
      address
    });
    this.setState({
      streetViewImage: imageUrl
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.application.address !== this.props.application.address) {
      this.setState(
        {
          address: this.props.application.address || null
        },
        () => {
          this.getImage();
        }
      );
    }
  }

  render() {
    const {
      defaultText,
      council_reference,
      address,
      description,
      info_url,
      date_received
    } = this.props.application;
    const { streetViewImage } = this.state;

    return (
      <Container>
        <Header>
          <PinIcon>
            <PlanningPin isSelected={!!address} />
          </PinIcon>
          <TitleField>
            <Address>{address || defaultText}</Address>
            <br />
            {date_received}
          </TitleField>
        </Header>

        <StreetViewImage>
          {streetViewImage && (
            <img src={streetViewImage} alt="Google Street View" width="100%" />
          )}
        </StreetViewImage>

        {!defaultText && (
          <div>
            <Description>{description}</Description>

            <ExternalInfo>
              <div>Reference: {council_reference}</div>
              <ButtonLink url={info_url} text={'View application'} />
            </ExternalInfo>
          </div>
        )}
      </Container>
    );
  }
}

export const ApplicationInfo = props => (
  <MapViewportContext.Consumer>
    {({ application, isSearchOpen }) => (
      <Application isSearchOpen={isSearchOpen} application={application} />
    )}
  </MapViewportContext.Consumer>
);
