import React, { Component } from 'react';
import styled from 'styled-components';

import { MapViewportContext } from '../Map/MapViewportContext';
import PlanningPin from '../Map/PlanningPin';
import {
  primary,
  secondaryDark,
  textOnSecondary,
  secondary
} from '../../styles/colors';
import { getImageUrl } from '../../api';

const Container = styled.div`
  margin: 10px;
  padding: 5px;
  background: ${primary};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-around;
`;

const TitleField = styled.div`
  width: 100%;
  border-bottom: 1px solid ${secondaryDark};
  padding-bottom: 5px;
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
  margin: 5px 0 5px 38px;
`;

const ExternalInfo = styled.div`
  margin: 5px 0 0 38px;
  padding-top: 5px;
  border-top: 1px solid ${secondaryDark};

  button {
    margin-top: 5px;
    z-index: 1;
    position: relative;
    font-size: inherit;
    font-family: inherit;
    font-weight: 500;
    color: white;
    height: 30px;
    outline: none;
    border: none;
    border-radius: 4px;
    background-color: ${secondary};
    overflow: hidden;
    transition: color 0.4s ease-in-out;
  }

  button::before {
    content: '';
    z-index: -1;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    background-color: ${secondaryDark};
    transform-origin: center;
    transform: translate3d(-50%, -50%, 0) scale3d(0, 0, 0);
    transition: transform 0.45s ease-in-out;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }

  button:hover {
    cursor: pointer;
    color: #161616;
  }

  button:hover::before {
    transform: translate3d(-50%, -50%, 0) scale3d(15, 15, 15);
  }

  a {
    color: ${textOnSecondary};
    text-transform: uppercase;
    text-decoration: none;
    padding: 5px;
  }
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
            <PlanningPin />
          </PinIcon>
          <TitleField>
            <Address>{address || defaultText}</Address>
            <br />
            {date_received}
          </TitleField>
        </Header>

        {!defaultText && (
          <div>
            <Description>{description}</Description>

            <ExternalInfo>
              <div>Reference: {council_reference}</div>
              <button>
                <a target="_blank" href={info_url}>
                  view application
                </a>
              </button>
            </ExternalInfo>
          </div>
        )}
        {streetViewImage && <img src={streetViewImage} />}
      </Container>
    );
  }
}

export const ApplicationInfo = props => (
  <MapViewportContext.Consumer>
    {({ application }) => <Application application={application} />}
  </MapViewportContext.Consumer>
);
