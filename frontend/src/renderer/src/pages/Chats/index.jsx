import { SendHorizonal } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import './styles.css';
import Back from '../../components/Back';
import io from 'socket.io-client';
import useAuth from '../Auth/useAuth';
import { request } from '../../utils/remote/axios';
import { requestMethods } from '../../utils/enums/request.methods';

const Chats = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socketRef = useRef(null);
  const bottomRef = useRef(null);
  const { user, token } = useAuth();

  const localStorageToken = localStorage.getItem("bearer_token");

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await request({
          method: requestMethods.GET,
          route: "/user/get-messages",
        });
        setMessages(response.map(msg => ({
          ...msg,
          own: msg.user.id === (user?.id || null)
        })));
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };

    if (localStorageToken) loadMessages();

    socketRef.current = io('http://localhost:3001', {
      auth: { token: token || localStorageToken },
      transports: ['websocket']
    });

    socketRef.current.on('chat-message', (message) => {
      setMessages(prev => [...prev, {
        ...message,
        own: message.user.id === (user?.id || null)
      }]);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [user, token, localStorageToken]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView();
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const tempId = Date.now();
    const optimisticMessage = {
      id: tempId,
      content: newMessage,
      created_at: new Date().toISOString(),
      user: user || { id: 'temp', name: 'You' },
      own: true
    };

    setMessages(prev => [...prev, optimisticMessage]);
    setNewMessage('');

    socketRef.current.emit('chat-message', {
      text: newMessage,
      token: token || localStorageToken
    }, (ack) => {
      if (ack?.error) {
        setMessages(prev => prev.filter(msg => msg.id !== tempId));
      }
    });
  };

  const isAuthenticated = !!user || !!localStorageToken;

  return (
    <div className='chats-page flex align-center justify-center'>
      <Back />
      <div className="chat-container flex column">
        <div className="chat-header">Global Chat</div>
        <div className="messages-container">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`message-bubble ${message.own ? 'own' : ''}`}
            >
              <span className="message-sender">
                {message.user?.name || 'You'}
              </span>
              <div className="message-text">{message.content}</div>
              <div className="message-meta">
                <span className="message-time">
                  {new Date(message.created_at).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="message-input-container">
          <input
            type="text"
            className="message-input"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={!isAuthenticated}
          />
          <button 
            className="send-button flex align-center" 
            onClick={handleSendMessage}
            disabled={!isAuthenticated}
          >
            <SendHorizonal size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chats;
