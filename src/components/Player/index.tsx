import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { usePlayer } from '../../contexts/PlayerContext'
import styles from './styles.module.scss'

const Player = () => {
  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    tooglePlay,
    setPlayingState,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious
  } = usePlayer()

  const audioRef = useRef<HTMLAudioElement>(null)
  const episode = episodeList[currentEpisodeIndex]
  useEffect(() => {
    if (!audioRef.current) {
      return
    }
    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  return (
    <div className={styles.container}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>
      { episode ? (
        <div className={styles.currentEpisode}>
          <Image
            src={episode.thumbnail}
            height={592}
            width={592}
            objectFit='cover'
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )
      }
      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            {episode ? (
              <Slider
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ backgroundColor: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          <span>00:00</span>
        </div>

        {episode && (
          <audio
            src={episode.url}
            ref={audioRef}
            autoPlay
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
          />
        )}

        <div className={styles.buttons}>
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="Botão de embaralhar" />
          </button>
          <button type="button" disabled={!episode || !hasPrevious} onClick={playPrevious}>
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button
            type="button"
            className={styles.playButton}
            disabled={!episode}
            onClick={tooglePlay}
          >
            {isPlaying
              ? <img src="/pause.svg" alt="Tocar" />
              : <img src="/play.svg" alt="Tocar" />
            }
          </button>
          <button type="button" disabled={!episode || !hasNext} onClick={playNext}>
            <img src="/play-next.svg" alt="Tocar próxima" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  )
}

export default Player
