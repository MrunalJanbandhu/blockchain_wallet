// src/components/BalanceForm.jsx
import { useState } from 'react';
import axios from 'axios';

export default function BalanceForm() {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(null);

  const handleCheck = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/token/balance', { address });
      setBalance(res.data.balance);
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="p-4 border rounded shadow bg-white text-black max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Check Balance</h2>
      <form onSubmit={handleCheck} className="flex flex-col space-y-3">
        <input type="text" placeholder="Wallet address" className="input" value={address} onChange={(e) => setAddress(e.target.value)} />
        <button type="submit" className="btn">Check Balance</button>
        {balance && <p className="text-blue-600 text-sm">Balance: {balance}</p>}
      </form>
    </div>
  );
}
