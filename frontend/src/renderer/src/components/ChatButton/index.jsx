import { MessageCircle } from 'lucide-react';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const ChatButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/chats');
  };

  return (
    <button className="chat-button flex justify-center align-center" onClick={handleClick}>
      <MessageCircle size={24} />
    </button>
  );
};

export default ChatButton;