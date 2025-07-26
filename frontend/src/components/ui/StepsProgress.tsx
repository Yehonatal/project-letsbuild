import React from 'react'
import { motion } from 'framer-motion'

type StepsProgressProps = {
  steps: string[]
  currentStep: number
  onStepChange: (step: number) => void
}

export default function StepsProgress({
  steps,
  currentStep,
  onStepChange,
}: StepsProgressProps) {
  return (
    <div className="w-full flex flex-col items-center py-12">
      <div className="flex w-full justify-between items-center">
        {steps.map((_, idx) => {
          const isActive = idx === currentStep
          const isCompleted = idx < currentStep
          const bgColor = isActive
            ? 'bg-green-600 text-white'
            : isCompleted
              ? 'bg-green-200'
              : 'bg-gray-200'
          const borderColor = isActive
            ? 'border-green-700'
            : isCompleted
              ? 'border-green-400'
              : 'border-gray-300'
          const textColor = isActive
            ? 'text-white'
            : isCompleted
              ? 'text-green-800'
              : 'text-gray-500'

          return (
            <React.Fragment key={idx}>
              <motion.button
                onClick={() => onStepChange(idx)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={isActive ? { y: [0, -4, 0] } : { y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${borderColor} ${bgColor} focus:outline-none`}
              >
                <span
                  className="text-base font-bold"
                  style={{ color: textColor }}
                >
                  {idx + 1}
                </span>
              </motion.button>
              {idx < steps.length - 1 && (
                <motion.div
                  initial={false}
                  animate={{
                    scaleX: isCompleted ? 1 : 0.2,
                  }}
                  transformOrigin="left"
                  className={`flex-1 h-0.5 rounded ${isCompleted ? 'bg-green-400' : 'bg-gray-300'}`}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>

      {}
      <p className="mt-6 text-center text-sm font-bold text-gray-700">
        {steps.join(' — ')}
      </p>
    </div>
  )
}
