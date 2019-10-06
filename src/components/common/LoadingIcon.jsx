import React from 'react';
import styled from 'styled-components';

const LoadingIconComponent = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: ${props => `${2 * props.size}em`};
  z-index: 999;

  span {
    width: ${props => `${0.3 * props.size}em`};
    height: ${props => `${1 * props.size}em`};
    background-color: #3cefff;
  }

  span:nth-of-type(1) {
    animation: grow 1s -0.45s ease-in-out infinite;
  }

  span:nth-of-type(2) {
    animation: grow 1s -0.3s ease-in-out infinite;
  }

  span:nth-of-type(3) {
    animation: grow 1s -0.15s ease-in-out infinite;
  }

  span:nth-of-type(4) {
    animation: grow 1s ease-in-out infinite;
  }
  @keyframes grow {
    0%,
    100% {
      transform: scaleY(1);
    }

    50% {
      transform: scaleY(2);
    }
  }
`;

export const LoadingIcon = ({ sizeMultiplyer = 1 }) => {
  return (
    <LoadingIconComponent size={sizeMultiplyer}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </LoadingIconComponent>
  );
};
