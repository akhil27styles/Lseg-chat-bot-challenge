import { useState, useEffect } from 'react';
import Bot from '../public/Bot.png'
import './App.css';
function ChatBot() {
  const [exchanges, setExchanges] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [selectedExchange, setSelectedExchange] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hello! Welcome to LSEG. I'm here to help you." }
  ]);

  useEffect(() => {
    fetchExchanges();
  }, []);

  const addBotMessage = (text) => {
    setMessages((prev) => [...prev, { type: 'bot', text }]);
  };

  const addUserMessage = (text) => {
    setMessages((prev) => [...prev, { type: 'user', text }]);
  };

  const fetchExchanges = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/api/exchanges');
      if (!res.ok) throw new Error('Failed to fetch exchanges');
      const data = await res.json();
      setExchanges(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStocks = async (exchangeCode) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:5000/api/stocks/${exchangeCode}`);
      if (!res.ok) throw new Error('Failed to fetch stocks');
      const data = await res.json();
      const selected = exchanges.find(e => e.code === exchangeCode);
      setSelectedExchange(selected);
      setStocks(data);
      setSelectedStock(null);
      addUserMessage(`${selected.name}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStockPrice = async (stockCode) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:5000/api/stock/${selectedExchange.code}/${stockCode}`);
      if (!res.ok) throw new Error('Failed to fetch stock price');
      const data = await res.json();
      setSelectedStock(data);
      addUserMessage(`${data.stockName}`);
      addBotMessage(`Stock Price of ${data.stockName} is ${data.price}.`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    setSelectedStock(null);
    addUserMessage('Going back to stock list.');
    addBotMessage('Please select a Stock:');
  };

  const goToMainMenu = () => {
    setSelectedExchange(null);
    setSelectedStock(null);
    setStocks([]);
    addUserMessage('Returning to main menu.');
    addBotMessage('Please select a Stock Exchange:');
  };

  return (
    <div className="chatbot-wrapper">
      <h1>  <img src={Bot} alt="Logo" width="50" /> LSEG Chatbot</h1>
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-bubble ${msg.type}`}>
            {msg.text}
          </div>
        ))}

        {loading && <div className="chat-bubble bot">Loading...</div>}
        {error && <div className="chat-bubble bot error">{error}</div>}

        {!selectedExchange && !selectedStock && !loading && (
          <div className="button-group">
            {exchanges.map(exchange => (
              <button
                key={exchange.code}
                className="menu-button"
                onClick={() => fetchStocks(exchange.code)}
              >
                {exchange.name}
              </button>
            ))}
          </div>
        )}

        {selectedExchange && !selectedStock && !loading && (
          <div className="button-group">
            {stocks.map(stock => (
              <button
                key={stock.code}
                className="menu-button"
                onClick={() => fetchStockPrice(stock.code)}
              >
                {stock.stockName}
              </button>
            ))}
            <button className="nav-button" onClick={goToMainMenu}>Main Menu</button>
          </div>
        )}

        {selectedStock && !loading && (
          <div className="button-group">
            <button className="nav-button" onClick={goToMainMenu}>Main Menu</button>
            <button className="nav-button" onClick={goBack}>Go Back</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatBot;
