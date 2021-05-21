type Episode = {
  title: string,
  members: string,
  thumbnail: string,
  duration: number,
  url: string
}

export type PlayerContextData = {
  episodeList: Episode[],
  currentEpisodeIndex: number,
  isPlaying: boolean,
  playEpisode: (episode: Episode) => void
  tooglePlay: () => void
  setPlayingState: (state: boolean) => void
}
