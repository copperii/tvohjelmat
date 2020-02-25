import styled from 'styled-components'

export const ChannelRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  background: ${props => (props.index % 2 === 0 ? '#F5F5F5' : '#f9ffff')};

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
export const ChannelLogo = styled.img`
  margin-left: 0.5em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  height: 2em;
`
export const ChannelName = styled.div`
  height: 2em;
  margin-left: 1.5em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`
export const LeftRegion = styled.div`
  width: 8%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: flex-start;
`
export const CenterRegion = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`
export const RightRegion = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`
