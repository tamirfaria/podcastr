import { GetStaticProps } from 'next'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { api } from '../service/api'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString'
import { HomeProps } from '../types/home'
import styles from './home.module.scss'

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>
        <ul>
          {latestEpisodes.map(episode => {
            return (
              <div key={episode.id}>
                <li>
                  <Image
                    width={192} 
                    height={192} 
                    src={episode.thumbnail} 
                    alt={episode.title}
                    objectFit="cover"
                  />
                  <div className={styles.episodeDetails}>
                    <a href="">{episode.title}</a>
                    <p>{episode.members}</p>
                    <span>{episode.piblishedAt}</span>
                    <span>{episode.durationAsString}</span>
                  </div>
                  <button type="button">
                    <img src="/play-green.svg" alt="Tocar episódio" />
                  </button>
                </li>
                <br />
              </div>
            )
          })}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'piblished_at',
      _order: 'desc'
    }
  })

  const episodes = data.map(episodes => {
    return {
      id: episodes.id,
      title: episodes.title,
      thumbnail: episodes.thumbnail,
      members: episodes.members,
      piblishedAt: format(parseISO(episodes.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(episodes.file.duration),
      durationAsString: convertDurationToTimeString(Number(episodes.file.duration)),
      description: episodes.description,
      url: episodes.file.url
    }
  })
  const latestEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8
  }
}
