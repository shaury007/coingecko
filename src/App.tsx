import React, { useState } from 'react';
import logo from './assets/images/logo.webp';
import './App.css';
import CoinsGrid from './components/coinsGrid';
import InfoDialog from './components/infoDialog';

function App() {
  const [coinId, setCoinId] = useState<string>('');
  const [openDialog, setopenDialog] = useState<boolean>(false);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="CoinGecko logo" data-testid="logoImg" />
      </header>
      {/* CoinGrid component displays the list of coins*/}
      <CoinsGrid
        handleCoinClick={(coinId) => {
          setCoinId(coinId);
          setopenDialog(true);
        }}
      />
      {/* InfoDialog displays a particular coin's information */}
      <InfoDialog coinId={coinId} open={openDialog} onClose={() => setopenDialog(false)} />
    </div>
  );
}

export default App;
