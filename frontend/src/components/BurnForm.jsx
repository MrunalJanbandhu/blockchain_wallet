import { useState } from 'react';
import axios from 'axios';

export default function BurnForm() {
  const [from, setFrom] = useState('');
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState('');
  const [admin, setAdmin] = useState(''); // temp for dynamic header

  const handleBurn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/token/burn', { from, amount }, {
        headers: { 'x-wallet-address': admin } // ✅ using dynamic admin
      });
      setTxHash(res.data.txHash);
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="p-4 border rounded shadow bg-white text-black max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Burn Tokens</h2>
      <form onSubmit={handleBurn} className="flex flex-col space-y-3">
        <input
          type="text"
          placeholder="From address"
          className="input"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          className="input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Admin address (x-wallet-address)"
          className="input"
          value={admin}
          onChange={(e) => setAdmin(e.target.value)}
        />
        <button type="submit" className="btn">Burn</button>
        {txHash && <p className="text-green-600 text-sm">Tx: {txHash}</p>}
      </form>
    </div>
  );
}
