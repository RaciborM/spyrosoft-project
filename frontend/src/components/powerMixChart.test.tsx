import React from 'react'
import { render, screen } from '@testing-library/react'
import PowerMixChart from './powerMixChart'
import '@testing-library/jest-dom'

jest.mock('../api/power.api', () => ({
  getPowerMix: jest.fn().mockResolvedValue([
    {
      data: '2025-12-18',
      average: { wind: 40, nuclear: 30 },
      cleanPerc: 70,
    }
  ])
}))

test('renders power mix chart', async () => {
  render(<PowerMixChart />)
  expect(await screen.findByText(/Clean power/i)).toBeInTheDocument()
})