import React from 'react'
import LiveProgram from './index'
import { render } from '@testing-library/react'

describe('liveProgram testing', () => {
  test('renders empty component', () => {
    const component = render(<LiveProgram />)
    expect(component).toBeDefined()
  })
})
