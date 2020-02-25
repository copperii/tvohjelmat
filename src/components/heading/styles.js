import styled, { css } from 'styled-components'

const baseStyle = css`
  margin-bottom: ${props => props.noMargin && '0'};
  color: #202020;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  margin-top: 0;
  text-align: ${props => {
    if (props.center) return 'center'
    if (props.right) return 'right'
    return 'left'
  }};

  max-width: 100%;
`

const HeadingOne = styled.h1`
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 25px;
  ${baseStyle};
  @media (max-width: 480px) {
    font-size: 40px;
  }
`

const HeadingTwo = styled.h2`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
  ${baseStyle};
`

const HeadingThree = styled.h3`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 15px;
  ${baseStyle};
`

const HeadingFour = styled.h4`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
  ${baseStyle};
`

const HeadingFive = styled.h5`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  ${baseStyle};
`
export { HeadingOne, HeadingTwo, HeadingThree, HeadingFour, HeadingFive }
