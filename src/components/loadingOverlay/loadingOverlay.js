"use client";
import React, { useState, useEffect } from 'react';

const LoadingOverlay = ({ isLoading }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    let progress = 0;
    // Start a timer to simulate loading progress
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      setLoadingProgress(Math.min(progress, 100));
    }, 90);

    // Clear the timer when component unmounts
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // If loading is complete and progress reaches 100%, hide the overlay after a short delay
    if (!isLoading && loadingProgress === 100) {
      setTimeout(() => setShowOverlay(false), );
    }
  }, [isLoading, loadingProgress]);

  // Show the loading overlay if 'showOverlay' state is true
  if (showOverlay) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-gray-800 flex justify-center items-center z-50">
        <div className="text-white text-center">
          <div className="w-40 h-40 mb-4 bg-cover bg-center bg-no-repeat">
            <img className="bg-cover bg-no-repeat bg-center" src="https://i.pinimg.com/originals/c8/7f/64/c87f64184f6fdb0dce8966cf8f41875e.gif" alt="Loading GIF" />
          </div>
          <p>Loading...</p>
          <div className="w-full h-2 bg-gray-300 rounded-lg mt-2 overflow-hidden">
            <div className="h-full animate-neon bg-yellow-500" style={{ width: `${loadingProgress}%` }}></div>
          </div>
        </div>
      </div>
    );
  } else {
    // Hide the loading overlay if 'showOverlay' state is false
    return null;
  }
};

export default LoadingOverlay;