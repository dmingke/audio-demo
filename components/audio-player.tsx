'use client'

import { useEffect, useRef } from 'react'

interface AudioPlayerProps {
  src: string
  play: boolean
  onEnded: () => void
  preloadedAudio?: HTMLAudioElement
  initialTime: number
}

export default function AudioPlayer({ 
  src, 
  play, 
  onEnded, 
  preloadedAudio,
  initialTime,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)


  useEffect(() => {
    let isSubscribed = true

    const setupAudio = async () => {
      // Clean up previous audio if it exists
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.onended = null
      }

      // Setup new audio source
      audioRef.current = preloadedAudio || new Audio(src)
      const currentAudio = audioRef.current

      currentAudio.currentTime = initialTime
      currentAudio.autoplay = true;

      try {
        if (play && isSubscribed) {  // If `play` prop is true, start playing
          currentAudio.muted = false
          await currentAudio.play()
          
        } else {  // If `play` is false, pause the audio
          currentAudio.pause()
        }

        // Setup onended callback
        currentAudio.onended = () => {
          if (isSubscribed) {
            onEnded()
          }
        }

      } catch (error) {
        console.error('Audio playback error:', error)
        if (isSubscribed) {
          onEnded()
        }
      }
    }

    setupAudio()

    return () => {
      isSubscribed = false
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.onended = null
      }
    }
  }, [src, play, onEnded, preloadedAudio, initialTime])
  return <audio ref={audioRef} autoPlay muted/>;

}

