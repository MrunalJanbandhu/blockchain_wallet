// src/components/TransferForm.jsx
import { useState } from 'react';
import axios from 'axios';

export default function TransferForm() {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState('');

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/token/transfer', { to, amount });
      setTxHash(res.data.txHash);
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="p-4 border rounded shadow bg-white text-black max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Transfer Tokens</h2>
      <form onSubmit={handleTransfer} className="flex flex-col space-y-3">
        <input type="text" placeholder="Recipient address" className="input" value={to} onChange={(e) => setTo(e.target.value)} />
        <input type="number" placeholder="Amount" className="input" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button type="submit" className="btn">Transfer</button>
        {txHash && <p className="text-green-600 text-sm">Tx: {txHash}</p>}
      </form>
    </div>
  );
}
