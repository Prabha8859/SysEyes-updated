import { useEffect, useRef, useState } from "react";
import { Music, Play, Pause, Volume2, VolumeX, SkipForward, X, Heart, Laugh, Frown } from "lucide-react";

// Import your audio files
import music1 from "../../assets/audio/musi01.mp3";
import music2 from "../../assets/audio/music02.mp3";
import music3 from "../../assets/audio/music03.mp3";

const tracks = [
  { label: "Romantic", src: music1, emoji: "💕", icon: Heart },
  { label: "Funny", src: music2, emoji: "😄", icon: Laugh },
  { label: "Sad", src: music3, emoji: "😢", icon: Frown },
];

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Enable autoplay on first user interaction
  useEffect(() => {
    const audio = audioRef.current;

    const enableAudio = () => {
      if (audio && !isInitialized) {
        audio.muted = false;
        audio.play()
          .then(() => {
            setIsPlaying(true);
            setIsInitialized(true);
          })
          .catch((err) => {
            console.log("Autoplay blocked:", err);
            setIsInitialized(true);
          });
      }
      document.removeEventListener("click", enableAudio);
    };

    document.addEventListener("click", enableAudio);
    return () => {
      document.removeEventListener("click", enableAudio);
    };
  }, [isInitialized]);

  // Handle track change properly
  const handleTrackChange = (newIndex) => {
    const audio = audioRef.current;
    if (audio) {
      const wasPlaying = isPlaying;
      audio.pause();
      audio.src = tracks[newIndex].src;
      audio.load();

      if (wasPlaying) {
        audio.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }

      setSelectedTrackIndex(newIndex);
    }
  };

  const handlePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handlePause = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  const handleUnmute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = false;
      setIsMuted(false);
    }
  };

  const handleNext = () => {
    handleTrackChange(selectedTrackIndex < tracks.length - 1 ? selectedTrackIndex + 1 : 0);
  };

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const currentTrack = tracks[selectedTrackIndex];

  return (
    <>
      <audio ref={audioRef} loop muted={isMuted}>
        <source src={currentTrack.src} type="audio/mp3" />
      </audio>

      <div className="fixed bottom-6 right-6 z-[9999]">
        {/* Main Music Circle - Smaller Size */}
        <div
          className={`relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg hover:scale-110 ${
            isExpanded
              ? 'bg-gradient-to-br from-green-400 to-green-500'
              : 'bg-gradient-to-br from-pink-400 to-pink-600'
          }`}
          onClick={toggleExpanded}
        >
          {/* Pulse Rings */}
          <div className={`absolute inset-0 rounded-full border-2 ${
            isExpanded ? 'border-green-400/30' : 'border-pink-400/30'
          } animate-ping`} style={{ animationDuration: '2s' }}></div>
          <div className={`absolute inset-0 rounded-full border-2 ${
            isExpanded ? 'border-green-400/20' : 'border-pink-400/20'
          } animate-ping`} style={{ animationDuration: '2s', animationDelay: '0.5s' }}></div>

          <Music 
            size={24} 
            className={`${isPlaying ? "animate-spin" : ""} text-white relative z-10`} 
            style={{ animationDuration: '3s' }} 
          />
          
          {/* Emoji Badge */}
          <div className="absolute -top-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center text-base shadow-md">
            {currentTrack.emoji}
          </div>

          {/* Playing indicator */}
          {isPlaying && (
            <div className="absolute -bottom-1 flex gap-0.5">
              <div className="w-1 h-2 bg-white rounded-full animate-pulse"></div>
              <div className="w-1 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-1 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          )}
        </div>

        {/* Control Panel - Compact Size */}
        <div
          className={`absolute bottom-20 right-0 w-60 bg-white p-4 rounded-2xl shadow-xl transition-all duration-300 ${
            isExpanded ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-5'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-700">Choose Your Mood</h4>
            <button 
              className="p-1 hover:bg-gray-100 rounded-full transition-colors" 
              onClick={() => setIsExpanded(false)}
            >
              <X size={16} className="text-gray-600" />
            </button>
          </div>

          {/* Track Buttons */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {tracks.map((track, idx) => {
              const IconComp = track.icon;
              const isActive = idx === selectedTrackIndex;
              return (
                <button
                  key={idx}
                  className={`p-2.5 rounded-xl flex flex-col items-center gap-1 transition-all duration-300 ${
                    isActive 
                      ? "bg-pink-500 text-white shadow-md scale-105" 
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => handleTrackChange(idx)}
                >
                  <IconComp size={18} strokeWidth={2} />
                  <span className="text-xs font-medium">{track.label}</span>
                </button>
              );
            })}
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-2.5">
            <button 
              onClick={isMuted ? handleUnmute : handleMute} 
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-all hover:scale-110"
            >
              {isMuted ? <VolumeX size={18} className="text-gray-700" /> : <Volume2 size={18} className="text-gray-700" />}
            </button>
            
            <button 
              onClick={isPlaying ? handlePause : handlePlay} 
              className="p-3 bg-pink-500 text-white rounded-full transition-all hover:scale-110 shadow-md"
            >
              {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
            </button>
            
            <button 
              onClick={handleNext} 
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-all hover:scale-110"
            >
              <SkipForward size={18} className="text-gray-700" />
            </button>
          </div>

          {/* Track Info - Compact */}
          <div className="text-center mt-3 p-2 bg-gray-50 rounded-xl">
            <div className="text-xs font-medium text-gray-600">
              {isPlaying ? (
                <span className="flex items-center justify-center gap-1.5 text-green-500">
                  <div className="flex gap-0.5 items-end">
                    <div className="w-0.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="w-0.5 h-2 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-0.5 h-1.5 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  Now Playing
                </span>
              ) : (
                <span className="text-gray-400">Paused</span>
              )}
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isExpanded && <div className="fixed inset-0 bg-transparent -z-[1]" onClick={() => setIsExpanded(false)}></div>}
      </div>
    </>
  );
};

export default BackgroundMusic;