import { useState } from 'react'
import { Episode } from '../types'
import { PlayerContext } from './PlayerContext'

const PlayerContextProvider: React.FC = ({ children }) => {
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)

  const playEpisode = (episode: Episode) => {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  const tooglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toogleLoop = () => {
    setIsLooping(!isLooping)
  }

  const toogleShuffle = () => {
    setIsShuffling(!isShuffling)
  }

  const setPlayingState = (state: boolean) => {
    setIsPlaying(state)
  }

  const clearPlayerState = () => {
    setEpisodeList([])
    setCurrentEpisodeIndex(0)
  }

  const playList = (list: Episode[], index: number) => {
    setEpisodeList(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length

  const playNext = () => {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
      setCurrentEpisodeIndex(nextRandomEpisodeIndex)
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
  }

  const hasPrevious = isShuffling || currentEpisodeIndex > 0

  const playPrevious = () => {
    if(isShuffling) {
      const previousRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
      setCurrentEpisodeIndex(previousRandomEpisodeIndex)
    } else if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
  }


  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        hasPrevious,
        hasNext,
        isPlaying,
        isLooping,
        isShuffling,
        playEpisode,
        playNext,
        playPrevious,
        tooglePlay,
        toogleLoop,
        toogleShuffle,
        setPlayingState,
        playList,
        clearPlayerState
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export default PlayerContextProvider
