import { create } from 'zustand'

interface PredictionState {
  totalBetsA: number
  totalBetsB: number
  updateTotalBets: (betOnA: boolean, amount: number) => void
  getOdds: () => { oddsA: number, oddsB: number }
}

export const usePredictionStore = create<PredictionState>((set, get) => ({
  totalBetsA: 0,
  totalBetsB: 0,
  updateTotalBets: (betOnA, amount) => set(state => ({
    totalBetsA: betOnA ? state.totalBetsA + amount : state.totalBetsA,
    totalBetsB: betOnA ? state.totalBetsB : state.totalBetsB + amount,
  })),
  getOdds: () => {
    const { totalBetsA, totalBetsB } = get()
    const total = totalBetsA + totalBetsB
    return {
      oddsA: total > 0 ? totalBetsA / total : 0.5,
      oddsB: total > 0 ? totalBetsB / total : 0.5,
    }
  },
}))
