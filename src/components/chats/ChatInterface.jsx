import React, { useState, useEffect, useRef } from 'react';
import { Phone, VideoCall, Send, AttachFile, EmojiEmotions, CameraAlt, Mic, Search, MoreVert, ArrowBack, DarkMode, LightMode } from '@mui/icons-material';
// Import your images - make sure these paths are correct relative to your component
import proimage from '../../assets/images/profile/chat/image.png';
import chatBg from '../../assets/images/profile/chat/proimage.jpg';


// Subscription Popup Component
const SubscriptionPopup = ({ show, onClose, onSubscribe }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[10000]">
      <div className="bg-white rounded-2xl p-8 max-w-md w-11/12 text-center shadow-2xl">
        <div className="text-5xl mb-5">⚠️</div>
        <h2 className="text-[#f65595] mb-3 text-2xl font-bold">Free Time Over!</h2>
        <p className="text-gray-600 mb-6 text-base">
          Please subscribe to continue the chat.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 rounded-full bg-transparent text-gray-600 cursor-pointer text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSubscribe}
            className="px-6 py-3 border-none rounded-full bg-[#f65595] text-white cursor-pointer text-sm font-bold hover:bg-[#e6457e] transition-colors"
          >
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
};

// Friend List Item Component
const FriendListItem = ({ friend, isActive, onClick, lastMessage, unreadCount, theme }) => {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center p-3 px-4 cursor-pointer border-b ${theme === 'dark' ? 'border-white/5' : 'border-black/5'} transition-all duration-300 ${
        isActive ? 'bg-[#f65595]/15' : theme === 'dark' ? 'hover:bg-white/8' : 'hover:bg-black/8'
      }`}
    >
      <div className="relative mr-4">
        <img 
          src={friend.avatar} 
          alt={friend.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
        />
        <span className={`absolute bottom-0.5 right-0.5 w-3 h-3 ${
          friend.online ? 'bg-[#06c633]' : 'bg-gray-400'
        } rounded-full border-2 border-white`}></span>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <h3 className={`m-0 text-base font-bold ${theme === 'dark' ? 'text-white' : 'text-black'} truncate`}>
            {friend.name}
          </h3>
          <span className={`text-xs ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
            {friend.lastSeen}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <p className={`m-0 text-sm ${theme === 'dark' ? 'text-white/70' : 'text-black/70'} truncate max-w-[70%]`}>
            {lastMessage || friend.lastMessage}
          </p>
          
          {unreadCount > 0 && (
            <span className="bg-[#f65595] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Chat Interface Component
const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTyping, setIsTyping] = useState(false);
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFriend, setActiveFriend] = useState(null);
  const [friends, setFriends] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [theme, setTheme] = useState('dark'); // 'dark' or 'light'
  const chatBodyRef = useRef(null);
  const timerRef = useRef(null);
  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const menuRef = useRef(null);

  const emojis = [
    '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎',
    '😍', '😘', '😗', '😙', '😚', '🙂', '🤗', '🤩', '🤔', '🤨', '😐', '😑',
    '😶', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '🥱', '😴',
    '😌', '😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🙃', '🤑', '😲',
    '☹️', '🙁', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩',
    '🤯', '😬', '😰', '😱', '🥵', '🥶', '😳', '🤪', '😵', '🥴', '😠', '😡',
    '🤬', '😷', '🤒', '🤕', '🤢', '🤮', '🥳', '🥰', '💩', '👻', '👽', '😺',
    '😸', '😹', '😻', '😼', '🙈', '🙉', '🙊', '❤️', '🧡', '💛', '💚', '💙',
    '💜', '💰', '💳', '💎', '🔧', '🔨'
  ];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const preventZoom = (e) => {
      if (e.touches.length > 1) e.preventDefault();
    };

    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('touchstart', preventZoom, { passive: false });
    document.addEventListener('gesturestart', (e) => e.preventDefault());
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('touchstart', preventZoom);
      document.removeEventListener('gesturestart', (e) => e.preventDefault());
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const sampleFriends = [
      {
        id: 1,
        name: 'Shreyu N',
        avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
        online: true,
        lastSeen: '2 min ago',
        lastMessage: 'Hi there! Thanks for your message.'
      },
      {
        id: 2,
        name: 'Alice Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        online: true,
        lastSeen: '5 min ago',
        lastMessage: 'See you tomorrow!'
      },
      {
        id: 3,
        name: 'Bob Smith',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        online: false,
        lastSeen: '1 hour ago',
        lastMessage: 'Can we schedule a meeting?'
      },
      {
        id: 4,
        name: 'Carol Davis',
        avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
        online: true,
        lastSeen: 'Just now',
        lastMessage: 'I sent you the files'
      },
      {
        id: 5,
        name: 'Shrishti',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        online: true,
        lastSeen: '2 min ago',
        lastMessage: 'Hi there! Thanks for your message.'
      },
      {
        id: 6,
        name: 'Khushi',
        avatar: 'https://randomuser.me/api/portraits/women/72.jpg',
        online: true,
        lastSeen: '2 min ago',
        lastMessage: 'Hi there! Thanks for your message.'
      }
    ];

    setFriends(sampleFriends);
    setActiveFriend(sampleFriends[0]);
  }, []);

  useEffect(() => {
    const startTimer = () => {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setShowSubscriptionPopup(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    };

    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFriendSelect = (friend) => {
    setActiveFriend(friend);
    setMessages([]);
    setInputMessage('');
    setIsTyping(false);
    setShowEmojiPicker(false);
  };

  const sendMessage = () => {
    if (!inputMessage.trim() || timeLeft <= 0 || !activeFriend) return;

    const digitCount = (inputMessage.match(/\d/g) || []).length;
    let displayMsg = inputMessage;

    if (digitCount > 2) {
      displayMsg = inputMessage.replace(/\d/g, 'X');
    }

    const newMessage = {
      id: Date.now(),
      type: 'user',
      content: displayMsg,
      timestamp: new Date(),
      friendId: activeFriend.id,
      status: 'sent'
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.type === 'user' && msg.status !== 'read' ? {...msg, status: 'delivered'} : msg
      ));
      setIsTyping(false);
      const receiverMessage = {
        id: Date.now() + 1,
        type: 'receiver',
        content: activeFriend.lastMessage || 'Hi there! Thanks for your message.',
        timestamp: new Date(),
        friendId: activeFriend.id
      };
      setMessages(prev => {
        const updated = prev.map(msg => 
          msg.type === 'user' && msg.status === 'delivered' ? {...msg, status: 'read'} : msg
        );
        return [...updated, receiverMessage];
      });
    }, 1500);
  };

  const handleEmojiSelect = (emoji) => {
    setInputMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && activeFriend && timeLeft > 0) {
      const newMessage = {
        id: Date.now(),
        type: 'user',
        content: `📎 ${file.name}`,
        timestamp: new Date(),
        isFile: true,
        fileType: file.type.startsWith('image/') ? 'image' : 'file',
        fileUrl: URL.createObjectURL(file),
        friendId: activeFriend.id,
        status: 'sent'
      };
      setMessages(prev => [...prev, newMessage]);
      
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.type === 'user' && msg.status !== 'read' ? {...msg, status: 'delivered'} : msg
        ));
        const receiverMessage = {
          id: Date.now() + 1,
          type: 'receiver',
          content: 'Thanks for the file!',
          timestamp: new Date(),
          friendId: activeFriend.id
        };
        setMessages(prev => {
          const updated = prev.map(msg => 
            msg.type === 'user' && msg.status === 'delivered' ? {...msg, status: 'read'} : msg
          );
          return [...updated, receiverMessage];
        });
      }, 1000);
    }
    e.target.value = '';
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && activeFriend && timeLeft > 0) {
      if (file.type.startsWith('image/')) {
        const newMessage = {
          id: Date.now(),
          type: 'user',
          content: '📷 Image',
          timestamp: new Date(),
          isImage: true,
          imageUrl: URL.createObjectURL(file),
          friendId: activeFriend.id,
          status: 'sent'
        };
        setMessages(prev => [...prev, newMessage]);
        
        setTimeout(() => {
          setMessages(prev => prev.map(msg => 
            msg.type === 'user' && msg.status !== 'read' ? {...msg, status: 'delivered'} : msg
          ));
          const receiverMessage = {
            id: Date.now() + 1,
            type: 'receiver',
            content: 'Nice picture!',
            timestamp: new Date(),
            friendId: activeFriend.id
          };
          setMessages(prev => {
            const updated = prev.map(msg => 
              msg.type === 'user' && msg.status === 'delivered' ? {...msg, status: 'read'} : msg
            );
            return [...updated, receiverMessage];
          });
        }, 1000);
      }
    }
    e.target.value = '';
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSubscribe = () => {
    alert('Redirecting to subscription page...');
    setTimeLeft(300);
    setShowSubscriptionPopup(false);
  };

  const handleClosePopup = () => {
    setShowSubscriptionPopup(false);
  };

  const handleBackButton = () => {
    window.history.back();
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleMenuOption = (option) => {
    alert(`Selected: ${option}`);
    setShowMenu(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getReceipt = (status) => {
    if (status === 'sent') return '✓';
    if (status === 'delivered') return '✓✓';
    if (status === 'read') return <span className="text-blue-500">✓✓</span>;
    return '';
  };

  const chatExpired = timeLeft <= 0;
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;

  return (
    <>
      <style>
        {`
          @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .message-enter { animation: slideUp 0.3s ease-out; }
          .typing-indicator { animation: fadeIn 0.5s ease-out; }
          .bounce-dot { animation: bounce 1s infinite ease-in-out; }
          
          ::-webkit-scrollbar {
            width: 6px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: rgba(246, 85, 149, 0.6);
            border-radius: 10px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(246, 85, 149, 0.8);
          }

          @media (max-width: 768px) {
            body.no-scroll {
              overflow: hidden;
            }
          }
        `}
      </style>
      
      <div 
        className={`w-screen h-screen bg-cover bg-center bg-no-repeat bg-fixed flex overflow-hidden select-none pointer-events-auto transition-opacity duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
        style={{
          backgroundImage: theme === 'dark' ? `url(${proimage})` : 'none',
          padding: isMobile ? '70px 10px 10px 10px' : isTablet ? '75px 12px 15px 12px' : '40px 15px 20px 15px',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 100
        }}
      >
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-br from-black/30 to-[#f65595]/40' : 'bg-gradient-to-br from-white/30 to-[#f65595]/40'} z-[1]`} />

        <div className={`w-full max-w-6xl h-full ${theme === 'dark' ? 'bg-white/8' : 'bg-black/8'} backdrop-blur-xl ${
          isMobile ? 'rounded-2xl' : 'rounded-3xl'
        } border ${theme === 'dark' ? 'border-white/20' : 'border-black/20'} shadow-2xl overflow-hidden flex relative z-[2] ${
          isMobile ? 'flex-col' : 'flex-row'
        } mx-auto`}>

          {isMobile && activeFriend && (
            <div 
              onClick={() => setActiveFriend(null)}
              className="flex absolute top-4 left-4 z-10 w-9 h-9 bg-[#f65595]/90 rounded-full items-center justify-center cursor-pointer shadow-md border-2 border-white/30 hover:bg-[#e6457e] transition-colors"
            >
              <ArrowBack className="text-white text-xl" />
            </div>
          )}

          {/* Sidebar */}
          <div className={`${
            isMobile ? (activeFriend ? 'hidden' : 'flex w-full') : isTablet ? 'flex w-[320px]' : 'flex w-[350px]'
          } ${theme === 'dark' ? 'bg-[#36393f]/95' : 'bg-gray-100/95'} backdrop-blur-xl ${
            isMobile ? 'border-b' : 'border-r'
          } ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} flex-col flex-shrink-0 relative`}>
            <div className={`${
              isMobile ? 'p-2' : isTablet ? 'p-3' : 'px-3 py-1'
            } ${theme === 'dark' ? 'bg-[#f65595]/95' : 'bg-[#f65595]/80'} border-b ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} flex flex-col gap-1`}>
              
              <div className="flex items-center justify-between">
                <button
                  onClick={handleBackButton}
                  className={`${theme === 'dark' ? 'text-white' : 'text-black'} hover:opacity-80 transition-opacity`}
                  title="Go back"
                  aria-label="Go back"
                >
                  <ArrowBack className={isMobile ? 'text-xl' : 'text-2xl'} />
                </button>

                <h2 className={`m-0 ${theme === 'dark' ? 'text-white' : 'text-black'} ${
                  isMobile ? 'text-lg' : 'text-xl'
                } font-bold flex-1 text-center`}>
                  Chats
                </h2>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleTheme}
                    className={`${theme === 'dark' ? 'text-white' : 'text-black'} hover:opacity-80 transition-opacity`}
                    title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  >
                    {theme === 'dark' ? <LightMode className={isMobile ? 'text-xl' : 'text-2xl'} /> : <DarkMode className={isMobile ? 'text-xl' : 'text-2xl'} />}
                  </button>
                  <div className="relative">
                    <MoreVert 
                      onClick={() => setShowMenu(!showMenu)}
                      className={`${theme === 'dark' ? 'text-white/90' : 'text-black/90'} cursor-pointer ${
                        isMobile ? 'text-xl' : 'text-2xl'
                      }`} 
                      aria-label="More options" 
                    />
                    {showMenu && (
                      <div 
                        ref={menuRef}
                        className={`absolute right-0 top-full mt-2 ${theme === 'dark' ? 'bg-white text-black' : 'bg-gray-800 text-white'} rounded-lg shadow-xl z-50 min-w-[160px] overflow-hidden ${
                          isMobile ? 'text-sm' : ''
                        }`}
                      >
                        <ul className="py-1">
                          <li 
                            onClick={() => handleMenuOption('New Group')}
                            className={`px-4 py-2 ${theme === 'dark' ? 'hover:bg-gray-100' : 'hover:bg-gray-700'} cursor-pointer`}
                          >
                            New Group
                          </li>
                          <li 
                            onClick={() => handleMenuOption('Settings')}
                            className={`px-4 py-2 ${theme === 'dark' ? 'hover:bg-gray-100' : 'hover:bg-gray-700'} cursor-pointer`}
                          >
                            Settings
                          </li>
                          <li 
                            onClick={() => handleMenuOption('Logout')}
                            className={`px-4 py-2 ${theme === 'dark' ? 'hover:bg-gray-100' : 'hover:bg-gray-700'} cursor-pointer`}
                          >
                            Logout
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="relative flex items-center">
                <Search className={`absolute left-4 ${theme === 'dark' ? 'text-white/70' : 'text-black/70'} ${
                  isMobile ? 'text-lg' : 'text-xl'
                }`} />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full ${
                    isMobile ? 'py-3 pl-10 pr-4' : 'py-3 pl-11 pr-4'
                  } ${theme === 'dark' ? 'bg-white/15 text-white placeholder-white/60' : 'bg-black/15 text-black placeholder-black/60'} border-none rounded-full text-sm outline-none backdrop-blur-md focus:bg-white/25 transition-colors `}
                  aria-label="Search contacts"
                />
              </div>
            </div>

            <div className={`flex-1 overflow-y-auto ${theme === 'dark' ? 'bg-[#cf0772]/95' : 'bg-pink-100/95'}`}>
              {filteredFriends.map(friend => (
                <FriendListItem
                  key={friend.id}
                  friend={friend}
                  isActive={activeFriend?.id === friend.id}
                  onClick={() => handleFriendSelect(friend)}
                  lastMessage={friend.lastMessage}
                  unreadCount={friend.id === 2 ? 3 : 0}
                  theme={theme}
                />
              ))}
            </div>
          </div>

          {/* Chat Panel */}
          <div className={`flex-1 flex flex-col min-w-0 ${
            isMobile ? (activeFriend ? 'flex w-full' : 'hidden') : 'flex'
          }`}>
            {activeFriend ? (
              <div className={`${theme === 'dark' ? 'bg-[#f65595]/95' : 'bg-[#f65595]/80'} backdrop-blur-xl ${theme === 'dark' ? 'text-white' : 'text-black'} ${
                isMobile ? 'py-4 px-5' : isTablet ? 'py-4 px-5' : 'py-3 px-12'
              } flex justify-between items-center border-b ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} flex-shrink-0`}>
                <div className={`flex items-center ${isMobile ? 'gap-3' : 'gap-4'}`}>
                  <div className={`relative ${isMobile ? 'w-10 h-10' : isTablet ? 'w-11 h-11' : 'w-12 h-12'}`}>
                    <img 
                      src={activeFriend.avatar} 
                      alt={activeFriend.name}
                      className="w-full h-full rounded-full object-cover border-2 border-white/30"
                    />
                    <span className={`absolute bottom-0.5 right-0.5 w-3 h-3 ${
                      activeFriend.online ? 'bg-[#06c633]' : 'bg-gray-400'
                    } rounded-full border-2 border-white`}></span>
                  </div>
                  <div>
                    <div className={`${isMobile ? 'text-base' : 'text-lg'} font-bold`}>
                      {activeFriend.name}
                    </div>
                    <div className={`${isMobile ? 'text-[11px]' : 'text-xs'} opacity-90`}>
                      {activeFriend.online ? 'Online' : `Last seen ${activeFriend.lastSeen}`}
                    </div>
                  </div>
                </div>
                
                <div className={`font-bold ${
                  isMobile ? 'text-sm py-1.5 px-3' : 'text-base py-2 px-4'
                } ${theme === 'dark' ? 'bg-white/20 text-white' : 'bg-black/20 text-black'} rounded-full backdrop-blur-sm min-w-[60px] text-center`}>
                  {formatTime(timeLeft)}
                </div>
                
                <div className={`flex ${isMobile ? 'gap-3' : 'gap-4'} items-center`}>
                  <Phone className={`cursor-pointer ${
                    isMobile ? 'text-xl' : 'text-2xl'
                  } ${theme === 'dark' ? 'text-white' : 'text-black'} hover:opacity-80 transition-opacity`} aria-label="Phone call" />
                  <VideoCall className={`cursor-pointer ${
                    isMobile ? 'text-xl' : 'text-2xl'
                  } ${theme === 'dark' ? 'text-white' : 'text-black'} hover:opacity-80 transition-opacity`} aria-label="Video call" />
                </div>
              </div>
            ) : (
              <div className={`${theme === 'dark' ? 'bg-[#f65595]/95' : 'bg-[#f65595]/80'} backdrop-blur-xl ${theme === 'dark' ? 'text-white' : 'text-black'} ${
                isMobile ? 'p-4 h-[70px]' : isTablet ? 'py-4 px-5 h-[80px]' : 'py-5 px-6 h-[89px]'
              } flex justify-center items-center border-b ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} flex-shrink-0`}>
                <div className={`${isMobile ? 'text-base' : 'text-lg'} font-bold text-center`}>
                  Select a chat to start messaging
                </div>
              </div>
            )}

            {activeFriend ? (
              <div 
                ref={chatBodyRef}
                className={`flex-1 ${
                  isMobile ? 'p-2.5' : isTablet ? 'p-4' : 'p-5'
                } bg-cover bg-center bg-no-repeat overflow-y-auto flex flex-col ${
                  isMobile ? 'gap-2' : 'gap-4'
                } relative`}
                style={{ backgroundImage: theme === 'dark' ? `url(${chatBg})` : 'none', backgroundColor: theme === 'light' ? '#f3f4f6' : 'transparent' }}
              >
                <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-white/10' : 'bg-black/5'} z-[1]`} />

                <div className="relative z-[2]">
                  {chatExpired && (
                    <div className={`bg-gradient-to-br from-red-400/90 to-orange-500/90 backdrop-blur-md text-white ${
                      isMobile ? 'p-3 text-[13px]' : 'p-5 text-base'
                    } rounded-2xl text-center font-bold mb-4 border border-white/20 shadow-lg`}>
                      Free Time Over! Please subscribe to continue chatting.
                    </div>
                  )}

                  {messages.filter(msg => msg.friendId === activeFriend.id).map(message => (
                    <div 
                      key={message.id} 
                      className={`message-enter flex items-end ${
                        isMobile ? 'gap-1.5 mb-2' : 'gap-3 mb-3'
                      } ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.type === 'receiver' && (
                        <img 
                          src={activeFriend.avatar} 
                          className={`${
                            isMobile ? 'w-7 h-7' : 'w-9 h-9'
                          } rounded-full object-cover border-2 border-white/30 flex-shrink-0`}
                          alt={`${activeFriend.name}'s avatar`}
                        />
                      )}
                      
                      <div className={`${
                        message.type === 'user' 
                          ? theme === 'dark' ? 'bg-[#fcabb8]/95' : 'bg-[#fcabb8]/80'
                          : theme === 'dark' ? 'bg-white/95' : 'bg-gray-200/95'
                      } backdrop-blur-xl ${
                        isMobile ? 'py-2.5 px-3.5 text-sm' : 'py-4 px-5 text-base'
                      } ${
                        message.type === 'user' 
                          ? 'rounded-[18px_18px_6px_18px]' 
                          : 'rounded-[18px_18px_18px_6px]'
                      } ${
                        isMobile ? 'max-w-[85%]' : 'max-w-[70%]'
                      } ${theme === 'dark' ? 'text-[#222]' : 'text-[#111]'} shadow-lg border ${theme === 'dark' ? 'border-white/30' : 'border-black/30'} break-words flex flex-col`}>
                        {message.isImage && message.imageUrl && (
                          <div className="mb-2">
                            <img 
                              src={message.imageUrl} 
                              alt="Uploaded image"
                              className="max-w-full rounded-lg border border-black/10"
                            />
                          </div>
                        )}
                        
                        {message.isFile && message.fileUrl && (
                          <div className={`flex items-center gap-2 ${
                            message.fileType === 'image' ? 'mb-2' : ''
                          }`}>
                            <span className="text-xl">📎</span>
                            <a 
                              href={message.fileUrl} 
                              download 
                              className="text-[#f65595] no-underline font-bold hover:text-[#e6457e]"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {message.content.replace('📎 ', '')}
                            </a>
                          </div>
                        )}
                        
                        {!message.isImage && !message.isFile && message.content}
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'} mt-1 flex justify-end items-center gap-1`}>
                          {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                          {message.type === 'user' && <span className={message.status === 'read' ? 'text-blue-500' : 'text-gray-500'}>{getReceipt(message.status)}</span>}
                        </div>
                      </div>
                      
                      {message.type === 'user' && (
                       <img 
                          src="https://randomuser.me/api/portraits/women/65.jpg" 
                          className={`${
                            isMobile ? 'w-7 h-7' : 'w-9 h-9'
                          } rounded-full object-cover border-2 border-white/30 flex-shrink-0`}
                          alt="Your avatar"
                        />
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className={`typing-indicator ${theme === 'dark' ? 'bg-white/95' : 'bg-gray-200/95'} ${
                      isMobile ? 'py-2.5 px-3.5 text-xs ml-9 mb-2' : 'py-4 px-5 text-sm ml-12 mb-3'
                    } rounded-[18px_18px_18px_6px] max-w-fit ${theme === 'dark' ? 'text-gray-700' : 'text-gray-800'} flex items-center gap-2 shadow-lg border ${theme === 'dark' ? 'border-white/30' : 'border-black/30'}`}>
                      {activeFriend.name} is typing
                      <div className="flex gap-1">
                        {[0, 1, 2].map(i => (
                          <div
                            key={i}
                            className="w-1.5 h-1.5 bg-gray-600 rounded-full bounce-dot"
                            style={{ animationDelay: `${i * 0.16}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div 
                className={`flex-1 flex justify-center items-center ${theme === 'dark' ? 'text-white' : 'text-black'} text-lg ${theme === 'dark' ? 'bg-black/20' : 'bg-white/20'} bg-cover bg-center`}
                style={{ backgroundImage: theme === 'dark' ? `url(${proimage})` : 'none' }}
              >
                <div className={`text-center ${theme === 'dark' ? 'bg-black/50' : 'bg-white/50'} ${
                  isMobile ? 'p-5 mx-5' : 'p-10'
                } rounded-2xl backdrop-blur-md`}>
                  <div className={`${isMobile ? 'text-4xl' : 'text-6xl'} mb-4`}>💬</div>
                  <p className={isMobile ? 'text-base' : ''}>
                    Select a conversation from the sidebar to start chatting
                  </p>
                </div>
              </div>
            )}
            
            {activeFriend && (
              <div className={`flex ${
                isMobile ? 'py-2 px-3 gap-2' : 'py-0 px-5 gap-4'
              } ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'} backdrop-blur-md items-center border-t ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} flex-shrink-0 relative`}>
                <div className={`relative flex-1 flex items-center ${theme === 'dark' ? 'bg-white/95' : 'bg-gray-200/95'} backdrop-blur-xl rounded-full border ${theme === 'dark' ? 'border-white/30' : 'border-black/30'} ${
                  isMobile ? 'py-2 px-2 min-h-[44px]' : 'py-2 px-2'
                } shadow-md`}>
                  {showEmojiPicker && (
                    <div 
                      ref={emojiPickerRef}
                      className={`absolute ${
                        isMobile 
                          ? 'bottom-[50px] left-0 right-0 mx-2.5 w-auto max-h-[120px]' 
                          : 'bottom-[50px] left-0 w-[280px] max-h-[150px]'
                      } ${theme === 'dark' ? 'bg-white/98' : 'bg-gray-100/98'} backdrop-blur-xl border ${theme === 'dark' ? 'border-white/30' : 'border-black/30'} ${
                        isMobile ? 'p-2.5' : 'p-4'
                      } rounded-2xl overflow-y-auto flex flex-wrap ${
                        isMobile ? 'gap-1.5 text-xl' : 'gap-2 text-[22px]'
                      } shadow-xl z-[9999]`}
                    >
                      {emojis.map((emoji, index) => (
                        <span 
                          key={index} 
                          onClick={() => handleEmojiSelect(emoji)}
                          className="cursor-pointer transition-transform duration-100 p-1 rounded-lg hover:scale-110 hover:bg-[#f65595]/10"
                        >
                          {emoji}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className={`flex items-center ${
                    isMobile ? 'gap-2 pl-2' : 'gap-2.5 pl-4'
                  }`}>
                    <EmojiEmotions 
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className={`cursor-pointer ${theme === 'dark' ? 'text-gray-600' : 'text-gray-700'} ${
                        isMobile ? 'text-xl' : 'text-[22px]'
                      } transition-colors hover:text-[#f65595]`}
                      aria-label="Emoji picker"
                    />
                    
                    <label htmlFor="imageUpload" className={chatExpired ? 'cursor-not-allowed' : 'cursor-pointer'}>
                      <CameraAlt 
                        className={`${
                          chatExpired ? 'cursor-not-allowed text-gray-300' : `cursor-pointer ${theme === 'dark' ? 'text-gray-600' : 'text-gray-700'} hover:text-[#f65595]`
                        } ${isMobile ? 'text-xl' : 'text-[22px]'} transition-colors`}
                        aria-label="Upload image"
                      />
                    </label>
                    <input 
                      type="file" 
                      id="imageUpload" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={chatExpired}
                      className="hidden"
                    />
                    
                    <Mic 
                      className={`${
                        chatExpired ? 'cursor-not-allowed text-gray-300' : `cursor-pointer ${theme === 'dark' ? 'text-gray-600' : 'text-gray-700'} hover:text-[#f65595]`
                      } ${isMobile ? 'text-xl' : 'text-[22px]'} transition-colors`}
                      aria-label="Voice message"
                    />
                    
                    <label htmlFor="fileUpload" className={chatExpired ? 'cursor-not-allowed' : 'cursor-pointer'}>
                      <AttachFile 
                        className={`${
                          chatExpired ? 'text-gray-300' : `${theme === 'dark' ? 'text-gray-600' : 'text-gray-700'} hover:text-[#f65595]`
                        } ${isMobile ? 'text-xl' : 'text-[22px]'} transition-colors rotate-45`}
                        aria-label="Attach file"
                      />
                    </label>
                    <input 
                      type="file" 
                      id="fileUpload" 
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      disabled={chatExpired}
                      className="hidden"
                    />
                  </div>
                  
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={chatExpired ? "Time expired - Subscribe to continue" : "Type a message..."}
                    disabled={chatExpired}
                    className={`flex-1 ${
                      isMobile ? 'py-2.5 px-3 text-base min-h-[20px]' : 'py-3 px-5 text-base'
                    } border-none outline-none bg-transparent ${theme === 'dark' ? 'text-gray-800 placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
                    aria-label="Type a message"
                  />
                  
                  <div className={isMobile ? 'pr-2' : 'pr-4'}>
                    <Send 
                      onClick={sendMessage}
                      className={`${
                        inputMessage.trim() && !chatExpired 
                          ? 'cursor-pointer text-[#f65595] hover:text-[#e6457e] hover:scale-110' 
                          : 'cursor-not-allowed text-gray-300'
                      } ${isMobile ? 'text-xl' : 'text-[22px]'} transition-all duration-300`}
                      aria-label="Send message"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <SubscriptionPopup 
        show={showSubscriptionPopup} 
        onClose={handleClosePopup} 
        onSubscribe={handleSubscribe} 
      />
    </>
  );
};

export default ChatInterface;