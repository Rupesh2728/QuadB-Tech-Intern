async function fetchTickerData() {
    try {
      const response = await fetch('http://localhost:8000/api/tickers');
      const data = await response.json();
      const tableBody = document.getElementById('ticker-data');
      tableBody.innerHTML = '';
  
      data.forEach((ticker, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${ticker.name}</td>
          <td>₹${ticker.last}</td>
          <td>₹${ticker.buy} / ₹${ticker.sell}</td>
          <td>-</td>
          <td>-</td>
        `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  // Initial fetch
  fetchTickerData();
  setInterval(fetchTickerData, 60000); // Refresh data every 60 seconds
  