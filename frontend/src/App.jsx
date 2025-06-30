import MintForm from './components/MintForm';
import BurnForm from './components/BurnForm';
import TransferForm from './components/TransferForm';
import BalanceForm from './components/BalanceForm';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Wallet L2 Stablecoin Dashboard</h1>
      <MintForm />
      <BurnForm /> 
      <TransferForm />
      <BalanceForm />
    </div>
  );
}
