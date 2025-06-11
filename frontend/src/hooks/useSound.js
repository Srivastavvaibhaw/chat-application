// src/hooks/useSound.js
import { useRef, useCallback } from 'react';

export const useSound = () => {
  // Using a direct URL to the public folder
  const audioRef = useRef(new Audio('/sounds/notification.mp3'));
  
  const playMessageSound = useCallback(() => {
    try {
      const sound = audioRef.current;
      sound.currentTime = 0; // Reset to start
      
      // Modern browsers require user interaction before playing audio
      // This promise-based approach handles that requirement
      const playPromise = sound.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Audio playback started successfully
          })
          .catch(err => {
            console.log("Audio playback was prevented:", err);
            // Most likely cause is that the user hasn't interacted with the document yet
          });
      }
    } catch (error) {
      console.error("Failed to play notification sound:", error);
    }
  }, []);

  return { playMessageSound };
};
