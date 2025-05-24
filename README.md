# LSEG Stock Chatbot

![Chatbot Interface](https://github.com/user-attachments/assets/6a81e965-1ce7-4a47-a319-31bf0b947bec)

## 🛠 Technologies

- **Frontend**: React, CSS3
- **Backend**: Node.js, Express
- **Data Format**: JSON
- **Package Manager**: npm

## 🚀 Installation

### Clone Repository
```bash
git clone https://github.com/yourusername/lseg-chatbot.git
cd lseg-chatbot
```
#Backend
```bash
cd server
npm install
npm start
```


## 📡 API Endpoints

| Method | Endpoint                                | Description                    | Example URL                                      |
|--------|-----------------------------------------|--------------------------------|--------------------------------------------------|
| GET    | `/api/exchanges`                        | List all exchanges             | `http://localhost:5000/api/exchanges`           |
| GET    | `/api/stocks/:exchangeCode`             | Get stocks for an exchange     | `http://localhost:5000/api/stocks/LSE`          |
| GET    | `/api/stock/:exchangeCode/:stockCode`   | Get specific stock details     | `http://localhost:5000/api/stock/LSE/GSK`       |

#Frontend
```
cd client
npm install
npm run dev
```
Frontend running [http://localhost:5173/](http://localhost:5173/)
