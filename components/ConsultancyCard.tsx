import React from 'react';
import { Consultancy, ConsultancyStatus } from '../types';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { ShieldExclamationIcon } from './icons/ShieldExclamationIcon';

interface ConsultancyCardProps {
  consultancy: Consultancy;
}

const ConsultancyCard: React.FC<ConsultancyCardProps> = ({ consultancy }) => {
  const isScammer = consultancy.status === ConsultancyStatus.Scammer;

  const statusColor = isScammer ? 'text-red-700' : 'text-green-700';
  const bgColor = isScammer ? 'bg-red-50 hover:bg-red-100' : 'bg-green-50 hover:bg-green-100';
  const borderColor = isScammer ? 'border-red-200' : 'border-green-200';

  return (
    <div className={`border ${borderColor} rounded-lg p-6 flex flex-col h-full transition-all duration-300 ${bgColor}`}>
      <div className="flex items-start gap-4 mb-4">
        <div className={`flex-shrink-0 ${statusColor}`}>
          {isScammer ? <ShieldExclamationIcon className="w-8 h-8" /> : <ShieldCheckIcon className="w-8 h-8" />}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{consultancy.name}</h3>
          <p className={`text-sm font-semibold ${statusColor}`}>{consultancy.status}</p>
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-4 flex-grow">"{consultancy.story}"</p>
      <div className="text-xs text-gray-500 mt-auto pt-4 border-t border-gray-200/50">
        <p>Submitted by: <span className="font-medium text-gray-700">{consultancy.submittedBy}</span></p>
        <p>Date: <span className="font-medium text-gray-700">{consultancy.date}</span></p>
      </div>
    </div>
  );
};

export default ConsultancyCard;