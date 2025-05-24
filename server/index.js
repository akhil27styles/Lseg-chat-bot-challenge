const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const stockData = [
    {
        "code": "LSE",
        "stockExchange": "London Stock Exchange",
        "topStocks": [
            {
                "code": "CRDA",
                "stockName": "CRODA INTERNATIONAL PLC",
                "price": 4807.00
            },
            {
                "code": "GSK",
                "stockName": "GSK PLC",
                "price": 1574.80
            },
            {
                "code": "ANTO",
                "stockName": "ANTOFAGASTA PLC",
                "price": 1746.00
            },
            {
                "code": "FLTR",
                "stockName": "FLUTTER ENTERTAINMENT PLC",
                "price": 16340.00
            },
            {
                "code": "BDEV",
                "stockName": "BARRATT DEVELOPMENTS PLC",
                "price": 542.60
            }
        ]
    },
    {
        "code": "NYSE",
        "stockExchange": "New York Stock Exchange",
        "topStocks": [
            {
                "code": "AHT",
                "stockName": "Ashford Hospitality Trust",
                "price": 1.72
            },
            {
                "code": "KUKE",
                "stockName": "Kuke Music Holding Ltd",
                "price": 1.20
            },
            {
                "code": "ASH",
                "stockName": "Ashland Inc.",
                "price": 93.42
            },
            {
                "code": "NMR",
                "stockName": "Nomura Holdings Inc.",
                "price": 5.84
            },
            {
                "code": "LC",
                "stockName": "LendingClub Corp",
                "price": 9.71
            }
        ]
    },
    {
        "code": "NASDAQ",
        "stockExchange": "Nasdaq",
        "topStocks": [
            {
                "code": "AMD",
                "stockName": "Advanced Micro Devices, Inc.",
                "price": 164.21
            },
            {
                "code": "TSLA",
                "stockName": "Tesla, Inc.",
                "price": 190.35
            },
            {
                "code": "SOFI",
                "stockName": "SoFi Technologies, Inc.",
                "price": 8.24
            },
            {
                "code": "PARA",
                "stockName": "Paramount Global",
                "price": 14.92
            },
            {
                "code": "GOOGL",
                "stockName": "Alphabet Inc.",
                "price": 141.91
            }
        ]
    }
];

app.get('/api/exchanges', (req, res) => {
    try {
        const exchanges = stockData.map(exchange => ({
            code: exchange.code,
            name: exchange.stockExchange
        }));
        res.json(exchanges);
    } catch (error) {
        console.error('Error fetching exchanges:', error);
        res.status(500).json({ error: 'Failed to fetch exchanges' });
    }
});

app.get('/api/stocks/:exchangeCode', (req, res) => {
    try {
        const exchangeCode = req.params.exchangeCode.toUpperCase();
        const exchange = stockData.find(e => e.code === exchangeCode);
        
        if (!exchange) {
            return res.status(404).json({ error: 'Exchange not found' });
        }
        
        res.json(exchange.topStocks);
    } catch (error) {
        console.error('Error fetching stocks:', error);
        res.status(500).json({ error: 'Failed to fetch stocks' });
    }
});

app.get('/api/stock/:exchangeCode/:stockCode', (req, res) => {
    try {
        const { exchangeCode, stockCode } = req.params;
        const exchange = stockData.find(e => e.code === exchangeCode.toUpperCase());
        
        if (!exchange) {
            return res.status(404).json({ error: 'Exchange not found' });
        }
        
        const stock = exchange.topStocks.find(s => s.code === stockCode.toUpperCase());
        
        if (!stock) {
            return res.status(404).json({ error: 'Stock not found' });
        }
        
        res.json(stock);
    } catch (error) {
        console.error('Error fetching stock price:', error);
        res.status(500).json({ error: 'Failed to fetch stock price' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});