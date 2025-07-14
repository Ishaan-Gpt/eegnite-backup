import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description?: string;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
  className = '',
  orientation = 'horizontal'
}) => {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div className={`${isHorizontal ? 'flex items-center' : 'flex flex-col'} ${className}`}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        const isUpcoming = stepNumber > currentStep;

        return (
          <React.Fragment key={step.id}>
            <div className={`flex ${isHorizontal ? 'flex-col items-center' : 'flex-row items-center'} ${isHorizontal ? 'text-center' : 'text-left'}`}>
              {/* Step Circle */}
              <div className="relative">
                <motion.div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm
                    ${isCompleted ? 'bg-primary text-primary-foreground' : ''}
                    ${isCurrent ? 'bg-primary text-primary-foreground' : ''}
                    ${isUpcoming ? 'bg-muted text-muted-foreground' : ''}
                    transition-all duration-300
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    stepNumber
                  )}
                </motion.div>
                
                {/* Current Step Ring */}
                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>

              {/* Step Content */}
              <div className={`${isHorizontal ? 'mt-2' : 'ml-4'}`}>
                <h4 className={`font-satoshi font-medium ${isCurrent ? 'text-foreground' : isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step.title}
                </h4>
                {step.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {step.description}
                  </p>
                )}
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className={`
                ${isHorizontal ? 'h-px w-8 mx-4' : 'w-px h-8 ml-5 my-2'}
                ${stepNumber < currentStep ? 'bg-primary' : 'bg-muted'}
                transition-colors duration-300
              `}>
                <motion.div
                  className={`h-full ${isHorizontal ? 'w-full' : 'w-full'} bg-primary origin-left`}
                  initial={{ scaleX: isHorizontal ? 0 : 1, scaleY: isHorizontal ? 1 : 0 }}
                  animate={{ 
                    scaleX: isHorizontal ? (stepNumber < currentStep ? 1 : 0) : 1,
                    scaleY: isHorizontal ? 1 : (stepNumber < currentStep ? 1 : 0)
                  }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};