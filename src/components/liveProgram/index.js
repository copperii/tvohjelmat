import React from 'react'
import PropTypes from 'prop-types'
import { StyledName, StyledTime } from './styles'

const LiveProgram = props => {
  const { id, programData, currentTime } = props

  const filterByChannelID = id => {
    if (!programData) return null
    return programData.filter(
      ch => Number.isInteger(id) && ch.channel.id === id
    )
  }

  const programByID = filterByChannelID(id)

  if (!programByID) return null
  return (
    <>
      {programByID.map(n => (
        <React.Fragment key={id + currentTime}>
          <StyledName title={n.programs[0] && n.programs[0].shortDescription}>
            {n.programs[0] && n.programs[0].name}
          </StyledName>
          <StyledTime>
            {n.programs[0] && n.programs[0].endTime
              ? `Ends at ${n.programs[0] && n.programs[0].endTime}`
              : 'No program running'}
          </StyledTime>
        </React.Fragment>
      ))}
    </>
  )
}

LiveProgram.propTypes = {
  id: PropTypes.number,
  programData: PropTypes.array,
  currentTime: PropTypes.string,
}

export default LiveProgram
