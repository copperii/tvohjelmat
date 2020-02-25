import { renderHook } from '@testing-library/react-hooks'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import useFetch from './useFetch'

describe('useFetch custom hook testing', () => {
  test('useFetch performs GET request', async () => {
    const initialValue = []
    const mock = new MockAdapter(axios)

    const mockData = 'response'
    const url = 'http://mock'
    mock.onGet(url).reply(200, mockData)

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch(url, initialValue)
    )

    expect(result.current[0].data).toEqual([])
    expect(result.current[0].loading).toBeTruthy()

    await waitForNextUpdate()

    expect(result.current[0].data).toEqual('response')
    expect(result.current[0].loading).toBeFalsy()
  })

  test('useFetch performs multiple GET requests for different URLs', async () => {
    const initialValue = 'initial value'
    const mock = new MockAdapter(axios)

    const mockData1 = 1
    const url1 = 'http://mock1'
    mock.onGet(url1).reply(200, mockData1)

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch(url1, initialValue)
    )

    expect(result.current[0].data).toEqual('initial value')
    expect(result.current[0].loading).toBeTruthy()

    await waitForNextUpdate()

    expect(result.current[0].data).toEqual(1)
    expect(result.current[0].loading).toBeFalsy()

    const url2 = 'http://mock2'
    const mockData2 = 2
    mock.onGet(url2).reply(200, mockData2)

    const initialValue2 = 'initial value 2'
    const {
      result: result2,
      waitForNextUpdate: waitForNextUpdate2,
    } = renderHook(() => useFetch(url2, initialValue2))

    expect(result2.current[0].data).toEqual('initial value 2')
    expect(result2.current[0].loading).toBeTruthy()

    await waitForNextUpdate2()

    expect(result2.current[0].data).toEqual(2)
    expect(result2.current[0].loading).toBeFalsy()
  })

  test('useFetch sets loading to false and returns inital value on network error', async () => {
    const mock = new MockAdapter(axios)

    const initialValue = ['abc']
    const url = 'http://mock'

    mock.onGet(url).networkError()

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch(url, initialValue)
    )

    expect(result.current[0].data).toEqual(['abc'])
    expect(result.current[0].loading).toBeTruthy()

    await waitForNextUpdate()

    expect(result.current[0].loading).toBeFalsy()
    expect(result.current[0].data).toEqual(['abc'])
  })
})
