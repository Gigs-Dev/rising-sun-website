import React from 'react'

interface HistoryModalProps {
  onModalClose: () => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ onModalClose }) => {
    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent click from bubbling up to sidebar
    };
  return (
    <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" 
        onClick={handleModalClick}
    >
      <div
          className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md"
          onClick={handleModalClick}
      >
          <h2 className="text-xl font-semibold mb-4 text-teal-700">Bet History</h2>
          <p className="text-gray-700">
              Bet History Comes up here. Heeyaaah!!!
          </p>
          <button
              className="mt-4 bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700"
              onClick={(e) => {
                e.stopPropagation();
                onModalClose();
              }}
          >
              Close
          </button>
      </div>
    </div>
  )
}

export default HistoryModal