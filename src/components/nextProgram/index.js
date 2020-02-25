import React from 'react'
import { getCurrentUTC } from '../../utils'
import useFetch from '../../services/useFetch'
import { ProgramData } from './styles'
import PropTypes from 'prop-types'

const NextProgram = props => {
  const { dailyUrl, id } = props
  const [{ data }] = useFetch(dailyUrl)
  const currentUTC = getCurrentUTC()

  const filterByChannelID = id => {
    if (!data.schedule) return null
    return data.schedule.filter(
      ch => Number.isInteger(id) && ch.channel.id === id
    )
  }

  const dailyProgramsByID = filterByChannelID(id)

  if (dailyProgramsByID && dailyProgramsByID[0].programs) {
    if (dailyProgramsByID[0].programs.length > 0) {
      const nextpgm = dailyProgramsByID[0].programs.find(
        utc => utc.startTimeUTC > currentUTC
      )
      return (
        <ProgramData title={nextpgm.shortDescription}>
          <i>Coming next:</i> {nextpgm.name}
        </ProgramData>
      )
    }
  }

  return <></>
}

NextProgram.propTypes = {
  dailyUrl: PropTypes.string,
  id: PropTypes.number,
}
export default NextProgram
