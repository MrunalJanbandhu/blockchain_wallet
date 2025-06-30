import { useState } from 'react';
import axios from 'axios';

export default function MintForm() {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState('');

  const handleMint = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/token/mint', { to, amount }, {
        headers: { 'x-wallet-address': to } // For now, you can test with admin address
      });
      setTxHash(res.data.txHash);
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="p-4 border rounded shadow bg-white text-black max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Mint Tokens</h2>
      <form onSubmit={handleMint} className="flex flex-col space-y-3">
        <input type="text" placeholder="Recipient address" className="input" value={to} onChange={(e) => setTo(e.target.value)} />
        <input type="number" placeholder="Amount" className="input" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button type="submit" className="btn">Mint</button>
        {txHash && <p className="text-green-600 text-sm">Tx: {txHash}</p>}
      </form>
    </div>
  );
}
