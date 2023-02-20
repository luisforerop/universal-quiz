import styles from './ErrorAd.module.css'
import { useScreensContext } from '../../shared/providers/Screens'

export const ErrorAd = () => {
  const { currentScreen } = useScreensContext()
  return (
    <div className={styles.errorAdContainer}>
      <img
        src="https://png.pngtree.com/png-clipart/20220705/ourmid/pngtree-sadness-eye-pupil-png-image_5683400.png"
        alt=""
      />
      <div className={styles.errorAdTextContainer}>
        <h1>Oops!</h1>
        <p>Algo salió mal</p>
      </div>
      <button onClick={() => currentScreen.set('home')}>Ir al inicio</button>
    </div>
  )
}
