const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static('.'));

// API proxy endpoint
app.get('/api/token/:contract/:tokenId', async (req, res) => {
  try {
    const { contract, tokenId } = req.params;
    const response = await fetch(`https://token.artblocks.io/${contract}/${tokenId}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch token data' });
  }
});

// Serve the HTML file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
