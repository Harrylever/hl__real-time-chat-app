import { useRef } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'

const LoadingPlayer = () => {
  const playerRef = useRef(null)
  return (
    <Player
      ref={playerRef}
      autoplay
      loop
      controls={false}
      src="/loader.json"
      className="w-32 h-32"
    />
  )
}

export default LoadingPlayer
