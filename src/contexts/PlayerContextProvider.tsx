import { useState } from 'react'
import { Episode } from '../types'
import { PlayerContext } from './PlayerContext'

const PlayerContextProvider: React.FC = ({ children }) => {
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const playEpisode = (episode: Episode) => {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  const playList = (list: Episode[], index: number) => {
    setEpisodeList(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  const hasNext = (currentEpisodeIndex + 1) < episodeList.length

  const playNext = () => {
    if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }

  const hasPrevious = currentEpisodeIndex > 0

  const playPrevious = () => {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
  }

  const tooglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const setPlayingState = (state: boolean) => {
    setIsPlaying(state)
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        hasPrevious,
        hasNext,
        playEpisode,
        playNext,
        playPrevious,
        isPlaying,
        tooglePlay,
        setPlayingState,
        playList
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export default PlayerContextProvider
