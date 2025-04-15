import { SendHorizonal } from 'lucide-react';
import { useState } from 'react';
import './styles.css';
import Back from '../../components/Back';

const Chats = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        text: newMessage,
        own: true,
        timestamp: new Date().toISOString()
      }]);
      setNewMessage('');
    }
  };

  return (
    <div className='chats-page flex align-center justify-center'>
    <Back/>
    <div className="chat-container">
      <div className="chat-header">Global Chat</div>
      <div className="messages-container">
        {messages.map((message, index) => (
          <div 
            key={index}
            className={`message-bubble ${message.own ? 'own' : ''}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="message-input-container">
        <input
          type="text"
          className="message-input"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button className="send-button" onClick={handleSendMessage}>
          <SendHorizonal size={18} />
        </button>
      </div>
    </div>
    </div>
  );
};

export default Chats;