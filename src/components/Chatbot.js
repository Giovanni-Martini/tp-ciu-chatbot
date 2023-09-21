import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Chatbot.css';

const Chatbot = () => {
  // Gestión de estado utilizando hooks de React
  const [messages, setMessages] = useState([]); // Estado para almacenar los mensajes del chat
  const [userMessage, setUserMessage] = useState(''); // Estado para almacenar la entrada del usuario
  const [botTyping, setBotTyping] = useState(false); // Estado para simular la escritura del bot
  const chatWindowRef = useRef(null); // Referencia a la ventana del chat para el desplazamiento

  useEffect(() => {
    // Efecto para desencadenar el desplazamiento cuando cambian los mensajes
    scrollToBottom();
  }, [messages]);

  // Función para desplazar la ventana del chat hacia abajo
  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      // Comprueba si existe la referencia de la ventana del chat
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
      // Desplaza hacia abajo hasta el final de la ventana del chat
    }
  };

  // Controlador de eventos para el cambio en la entrada del usuario
  const handleUserMessageChange = (e) => {
    setUserMessage(e.target.value);
  };

  // Controlador de eventos para enviar un mensaje del usuario
  const handleSendMessage = () => {
    if (userMessage.trim() === '') {
      // Comprueba si la entrada del usuario está vacía o contiene solo espacios en blanco
      return; // Si está vacía, no hagas nada
    }

    const updatedMessages = [...messages, { text: userMessage, isUser: true }];
    // Crea una nueva matriz de mensajes con el mensaje del usuario
    setMessages(updatedMessages); // Actualiza el estado de los mensajes con la nueva matriz

    setTimeout(() => {
      // Simula la escritura del bot estableciendo botTyping en true con un retraso
      setBotTyping(true);

      setTimeout(() => {
        const botResponse = 'Esta es una respuesta de ejemplo';

        const updatedBotResponse = [
          ...updatedMessages,
          { text: botResponse, isUser: false },
        ];

        setMessages(updatedBotResponse);
        setBotTyping(false);

        // Borra el campo de entrada del usuario
        setUserMessage('');
      }, 1000); // Ajusta el retraso (por ejemplo, cambia 2000 a un valor mayor para un retraso más largo)
    }, 500); // Ajusta el retraso (por ejemplo, cambia 500 a un valor mayor para un retraso más largo)
  };

  // Controlador de eventos para el manejo de la tecla Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Evita el comportamiento predeterminado (envío de formulario)
      handleSendMessage(); // Llama a la función para enviar el mensaje del usuario
    }
  };

  // Renderiza el componente del chatbot
  return (
    <Container className="chatbot-container">
      <Row>
        <Col>
          <div className="chat-window" ref={chatWindowRef}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.isUser ? 'user' : 'bot'}`}
              >
                {message.text}
              </div>
            ))}
            {botTyping && (
              <div className="message bot bot-typing">El bot está escribiendo...</div>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '10px',
            }}
          >
            <Form.Group controlId="userMessage" style={{ flex: '2' }}>
              <Form.Control
                type="text"
                placeholder="Escribí tu mensaje..."
                value={userMessage}
                onChange={handleUserMessageChange}
                onKeyPress={handleKeyPress}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSendMessage}>
              <ion-icon
                name="paper-plane-outline"
                style={{
                  fontSize: '24px',
                  right: '50%',
                }}
              ></ion-icon>
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Chatbot;