import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const SendMoney = () => {
  const [recipientId, setRecipientId] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/account/transfer',
        {
          to: recipientId,
          amount,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );
      alert('Transfer successful!');
      navigate('/dashboard'); 
    } catch (error) {
      setErrorMessage('Transfer failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Send Money</h1>
        
        {errorMessage && (
          <div className="bg-red-200 text-red-600 p-4 rounded-md mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
         
          <div className="mb-4">
            <label htmlFor="recipientId" className="block text-gray-700 font-medium">
              Recipient ID
            </label>
            <input
              id="recipientId"
              type="text"
              value={recipientId}
              onChange={(e) => setRecipientId(e.target.value)}
              className="w-full p-2 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter recipient ID"
              required
            />
          </div>

        
          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700 font-medium">
              Amount (Rs)
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter amount"
              required
            />
          </div>

          
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Send Money'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
