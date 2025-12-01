'use client'

interface ApplicationProgressProps {
  currentStep: 'apply' | 'coupon' | 'complete'
  className?: string
}

const steps = [
  // Login, verify, and payment steps skipped for now
  // { id: 'login', label: 'Login', labelAr: 'تسجيل الدخول', icon: '🔐' },
  // { id: 'verify', label: 'Verify', labelAr: 'التحقق', icon: '✓' },
  { id: 'apply', label: 'Apply', labelAr: 'التقديم', icon: '📝' },
  // { id: 'payment', label: 'Payment', labelAr: 'الدفع', icon: '💳' },
  { id: 'coupon', label: 'Coupon', labelAr: 'الكوبون', icon: '🎫' },
]

export default function ApplicationProgress({ currentStep, className = '' }: ApplicationProgressProps) {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep)
  
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="text-lg font-bold mb-6 text-center">Application Progress / تقدم الطلب</h3>
      
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
          <div 
            className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-500"
            style={{ 
              width: currentStepIndex >= 0 
                ? `${(currentStepIndex / (steps.length - 1)) * 100}%` 
                : '0%' 
            }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex
            const isCurrent = index === currentStepIndex
            const isUpcoming = index > currentStepIndex

            return (
              <div key={step.id} className="flex flex-col items-center flex-1">
                {/* Step Circle */}
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    text-lg font-bold transition-all duration-300
                    ${isCompleted 
                      ? 'bg-green-500 text-white' 
                      : isCurrent 
                        ? 'bg-blue-600 text-white ring-4 ring-blue-200' 
                        : 'bg-gray-200 text-gray-500'
                    }
                  `}
                >
                  {isCompleted ? '✓' : step.icon}
                </div>

                {/* Step Label */}
                <div className="mt-3 text-center">
                  <p className={`text-xs font-medium ${
                    isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </p>
                  <p className={`text-xs ${
                    isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {step.labelAr}
                  </p>
                </div>

                {/* Connector Line (except last step) */}
                {index < steps.length - 1 && (
                  <div className="absolute top-5 left-1/2 w-full h-0.5 -z-10" />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Current Step Info */}
      {currentStepIndex >= 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
          <p className="text-sm font-semibold text-blue-900">
            Current Step: {steps[currentStepIndex].label} / {steps[currentStepIndex].labelAr}
          </p>
          <p className="text-xs text-blue-700 mt-1">
            {currentStepIndex < steps.length - 1 
              ? `Next: ${steps[currentStepIndex + 1].label} / ${steps[currentStepIndex + 1].labelAr}`
              : 'Application Complete! / الطلب مكتمل!'
            }
          </p>
        </div>
      )}
    </div>
  )
}

