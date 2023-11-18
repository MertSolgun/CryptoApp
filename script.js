const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

let globalData;

const getCoins = async () => {
  const res = await fetch("https://api.coinranking.com/v2/coins");
  if (!res) {
    alert("API ERROR");
  }
  const data = await res.json();
  globalData = data;
  createTable(data);
};

const mCapform = (value) => {
  const integerValue = parseInt(value);
  return integerValue.toLocaleString();
};

const Mprice = (value) => {
  const intvalue = parseInt(value);
  return intvalue.toLocaleString();
};

const change = (value) => {
  if (value > 0) {
    return `<span style="color:green">▲ ${value}</span>`;
  } else if (value === 0) {
    return `Stable`;
  } else if (value < 0) {
    return `<span style="color:red">▼ ${value}</span>`;
  }
  return;
};

const createTable = (data) => {
  const tableContainer = document.getElementById("coinTable");
  let tableHTML = `
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>MarketCap</th>
          <th>Change</th>
        </tr>
      </thead>
      <tbody>
  `;
  data.data.coins.forEach((coin) => {
    const coinPrice = Mprice(coin.price);
    const marketCap = mCapform(coin.marketCap);
    const changeVal = parseFloat(coin.change);
    const changeDisp = change(changeVal);
    tableHTML += `
      <tr>
        <td>${coin.rank}</td>
        <td><img class="iconurl" src="${coin.iconUrl}"/>${coin.name}</td>
        <td><span class="coinsymbol" style="color:${coin.color}">${coin.symbol}</span></td>
        <td>$${coinPrice}</td>
        <td>$${marketCap}</td>
        <td>${changeDisp}</td>

      </tr>
    `;
  });

  tableHTML += `
      </tbody>

  `;

  tableContainer.innerHTML = tableHTML;
};

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredCoins = globalData.data.coins.filter((coin) => {
    return (
      coin.name.toLowerCase().includes(searchTerm) ||
      coin.symbol.toLowerCase().includes(searchTerm)
    );
  });

  const filteredData = { data: { coins: filteredCoins } };
  createTable(filteredData);
});
getCoins();
