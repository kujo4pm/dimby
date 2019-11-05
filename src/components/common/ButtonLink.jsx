import React from 'react';
import styled from 'styled-components';

import { textOnSecondary, secondaryDark, link } from '../../styles/colors';

const Button = styled.button`
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
  background-color: ${link};
  overflow: hidden;
  transition: color 0.4s ease-in-out;

  &::before {
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

  &:hover {
    cursor: pointer;
    color: #161616;
  }

  &:hover::before {
    transform: translate3d(-50%, -50%, 0) scale3d(15, 15, 15);
  }

  a {
    color: ${textOnSecondary};
    text-transform: uppercase;
    text-decoration: none;
    padding: 5px;
  }
`;

export const ButtonLink = ({ url, text }) => {
  return (
    <Button>
      <a target="_blank" rel="noopener noreferrer" href={url}>
        {text}
      </a>
    </Button>
  );
};
