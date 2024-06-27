
import React from 'react';

const HistoryCard = ({ user={}, receiver={},sender={}, amount=0 }) => {
  const isReceiver = (user.username) === (receiver.username);
  
  const cardClasses = isReceiver
    ? 'bg-green-100 text-green-800'
    : 'bg-red-100 text-red-800';
  const amountClasses = isReceiver
    ? 'text-green-700'
    : 'text-red-700';

  return (
    <div className={`p-4 rounded-lg shadow-md ${cardClasses} mb-4`}>
      <div className="flex justify-between items-center">
        <div className='flex justify-center items-center'>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                {isReceiver ? sender.username[0] :receiver.username[0]}
                </div>
            </div>
        <span className="font-medium">{isReceiver ? sender.firstName + " " + sender.lastName:receiver.firstName +" "+ receiver.lastName}</span>
        </div>
        <span className={`font-bold ${amountClasses}`}>
          {isReceiver ? '+' : '-'}Rs {amount}
        </span>
      </div>
    </div>
  );
};

export default HistoryCard;

