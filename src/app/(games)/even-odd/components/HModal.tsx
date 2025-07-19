'use client'
import React from 'react'

interface HModalProps {
  onModalClose: () => void;
}

const HModal = ({ onModalClose }: HModalProps) => {
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
                <h2 className="text-xl font-semibold mb-4 text-teal-700">How to Play Even-Odd</h2>
                <p className="text-gray-700">
                    1. Place your bet by selecting either &quot;Even&quot; or &quot;Odd&quot; from the options below.
                    2. Three dice will be rolled, and the sum of the dice will determine the result.
                    3. If the sum is even and you bet &quot;Even,&quot; or odd and you bet &quot;Odd,&quot; you win 2x your bet.
                    4. You lose if all three dice show the same number (triple).
                    5. Adjust your bet amount using the slider or chips, then confirm your bet.
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
    );
}

export default HModal