export type Episodes = {
  id: string
  title: string
  members: string
  publishedAt: string
  thumbnail: string
  description: string
  url: string
  type: string
  duration: number
  durationAsString: string
}

export type HomeProps = {
  latestEpisodes: Episodes[];
  allEpisodes: Episodes[];
}