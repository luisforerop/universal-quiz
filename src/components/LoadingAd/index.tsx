import { Dna } from 'react-loader-spinner'
import styles from './LoadingAd.module.css'

export const LoadingAd = () => {
  return (
    <div className={styles.loadingAdContainer}>
      <Dna
        visible={true}
        height="250"
        width="250"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  )
}
