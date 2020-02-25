import React, { useState, useEffect } from 'react'
import { ChannelRow, ChannelLogo, LeftRegion, CenterRegion } from './styles'
import Heading from '../heading'
import LiveProgram from '../liveProgram'
import {
  getCurrentDate,
  getCurrentTime,
  getCurrentSeconds,
  getCurrentDateUS,
} from '../../utils'
import useFetch from '../../services/useFetch'
import NextProgram from '../nextProgram'

const ChannelList = () => {
  const channelUrl = 'https://rest-api.elisaviihde.fi/rest/epg/channels'
  const liveUrl = 'https://rest-api.elisaviihde.fi/rest/epg/schedule/live'
  const [dailyUrl, setDailyUrl] = useState('')
  const [currentTime, setCurrentTime] = useState('')
  const [channels] = useFetch(channelUrl)
  const [livePrograms, getLivePrograms] = useFetch(liveUrl)
  const [channelIds, setChannelIds] = useState([])

  const parseDailyUrl = () => {
    const baseUrl =
      'https://rest-api.elisaviihde.fi/rest/epg/schedule?channelId='
    const channels = channelIds.join()
    if (channels.length > 20) {
      setDailyUrl(`${baseUrl}${channels}&date=${getCurrentDateUS()}`)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      getLivePrograms(liveUrl)
    }, 6000)
  }, [currentTime, getLivePrograms])

  useEffect(() => {
    const refreshCycle = setInterval(() => {
      if (getCurrentSeconds() === '0') {
        setCurrentTime(getCurrentTime())
      }
    }, 1000)
    setCurrentTime(getCurrentTime())
    return () => clearInterval(refreshCycle)
  }, [])

  const addChannelId = id => {
    if (!channelIds.find(x => x === id)) {
      setChannelIds(channelIds => [...channelIds, id])
    }
  }

  if (channels.loading)
    return <div data-testid='channelList-loading'>Loading ...</div>

  if (!channels.loading && channels.data.channels.length > 20) {
    if (dailyUrl === '') {
      channels.data &&
        channels.data.length !== 0 &&
        channels.data.channels.map(channel => addChannelId(channel.id))
      parseDailyUrl()
    }
  }

  return (
    <>
      <Heading h4 data-testid='channelList-heading'>
        Currently running programs on tv
      </Heading>
      {getCurrentDate()} {currentTime}
      {channels.data &&
        channels.data.length !== 0 &&
        channels.data.channels.map((channel, i) => (
          <ChannelRow key={channel.id} index={i}>
            <LeftRegion>
              <ChannelLogo
                src={channel.logos[5].url}
                alt={channel.name}
                title={channel.name}
              ></ChannelLogo>
            </LeftRegion>
            <CenterRegion>
              <LiveProgram
                id={channel.id}
                programData={livePrograms.data.schedule}
                currentTime={currentTime}
              />
            </CenterRegion>
            {dailyUrl.length > 50 ? (
              <NextProgram id={channel.id} dailyUrl={dailyUrl} />
            ) : (
              ''
            )}
          </ChannelRow>
        ))}
    </>
  )
}

export default ChannelList
