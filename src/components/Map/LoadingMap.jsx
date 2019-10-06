import React from 'react';
import styled from 'styled-components';

import { LoadingIcon } from '../common';
/* 
  using a singleton Modal pattern to dodge 
  annoying state control through many component levels 
*/
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const Message = styled.div`
  position: fixed;
  padding: 10px;
  height: auto;
  top: 50%;
  left: 62%;
  transform: translate(-50%, -50%);
`;

export class LoadingMap extends React.Component {
  static show() {
    LoadingMap.__singletonRef.__show();
  }

  static hide() {
    LoadingMap.__singletonRef.__hide();
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    LoadingMap.__singletonRef = this;
  }

  render() {
    const { visible } = this.state;
    if (visible) {
      return (
        <Container>
          <Message>
            <LoadingIcon sizeMultiplyer={2} />
          </Message>
        </Container>
      );
    }
    return null;
  }

  __show() {
    this.setState({ visible: true });
  }
  __hide() {
    this.setState({ visible: false });
  }
}
