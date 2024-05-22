import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeLanding: React.FC = () => {
  const navigate = useNavigate();

  const goToPersonalExpenses = () => {
    navigate('/individual');
  };

  const goToGroupExpenses = () => {
    navigate('/group');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">Gastando Ando</h1>
      <div className="flex flex-col space-y-4">
        <button
          onClick={goToPersonalExpenses}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Personal Expenses
        </button>
        <button
          onClick={goToGroupExpenses}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Go to Group Expenses
        </button>
      </div>
    </div>
  );
};

export default HomeLanding;
