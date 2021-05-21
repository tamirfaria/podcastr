import { createContext, useContext } from 'react'
import { PlayerContextData } from '../types'

export const PlayerContext = createContext({} as PlayerContextData)

export const usePlayer = () => {
  return useContext(PlayerContext)
}