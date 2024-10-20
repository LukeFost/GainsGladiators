


// add a progress bar to the center with an input at the bottom and a button next to that
// expose the button function to a handleClick
// Add two pillar(/pillar.png) on either side and have them in the background going from the top to bottom max view height. 
// Add a modal component for when the button is clicked and the modal should have the background of scroll.gif and have that gif play once and stop at the end. 

import { AnimatePresence, motion } from "framer-motion";
import { useState, useCallback } from "react"


export default function PredictionMarket() {
    const [progress, setProgress] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleClick = useCallback(() => {
        setIsModalOpen(true)
        // Simulate progress increase
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval)
              return 100
            }
            return prev + 10
          })
        }, 500)
      }, [])


    return(<>
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Background Pillars */}
      <div className="absolute inset-y-0 left-0 w-24 h-screen">
        <img src="/pillar.png" alt="Left Pillar" layout="fill" objectFit="cover" />
      </div>
      <div className="absolute inset-y-0 right-0 w-24 h-screen">
        <img src="/pillar.png" alt="Right Pillar" layout="fill" objectFit="cover" />
      </div>

      {/* Main Content */}
      <div className="z-10 w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="mb-6">
          <div className="h-4 w-full bg-gray-200 rounded-full">
            <motion.div
              className="h-full bg-blue-600 rounded-full"
              style={{ width: `${progress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="mt-2 text-center">{progress}%</p>
        </div>
        <div className="flex">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter text..."
          />
          <button
            onClick={handleClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg p-8 bg-white rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 overflow-hidden rounded-lg">
                <img
                  src="/scroll_1.gif"
                  alt="Scroll Animation"
                  objectFit="cover"
                  onLoadingComplete={(target) => {
                    // Play the GIF once and stop at the end
                    setTimeout(() => {
                      target.style.opacity = '0'
                    }, target.duration * 1000)
                  }}
                />
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-4">Modal Content</h2>
                <p>Your input: {inputValue}</p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>)
}