import styles from './styles.module.scss'
import ptBR from 'date-fns/locale/pt-BR'
import { format } from 'date-fns'

const Header = () => {  
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR
  })

  return (
    <header className={styles.container}>
      <img src="/logo.svg" alt="Logo da Podcastr"/>
      <p>O melhor para você oubir sempre</p>
      <span>{currentDate}</span>
    </header>
  )
}

export default Header
