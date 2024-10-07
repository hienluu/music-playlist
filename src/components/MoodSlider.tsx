import React from 'react'

interface MoodSliderProps {
  icon: React.ReactNode
  label: string
  value: number
  onChange: (value: number) => void
}

const MoodSlider: React.FC<MoodSliderProps> = ({ icon, label, value, onChange }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        {icon}
        <span className="ml-2 text-lg font-medium text-gray-700">{label}</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="text-sm text-gray-500 mt-1">{value}%</div>
    </div>
  )
}

export default MoodSlider