import React from 'react'
import { render } from '@testing-library/react'
import ChannelList from './index'

describe('ChannelList testing', () => {
  test('Shows loading data', () => {
    const { getByTestId } = render(<ChannelList />)
    expect(getByTestId('channelList-loading').textContent).toBe('Loading ...')
  })
})
