import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function TestPrepare() {
  const navigate = useNavigate()
  const [questionCount, setQuestionCount] = useState(5)

  const handleStart = () => {
    navigate(`/test/practice?count=${questionCount}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-12">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            測驗模式 隨機出題
          </h1>
          
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              選擇題數：
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[3, 5, 10, 15, 20].map((count) => (
                <button
                  key={count}
                  onClick={() => setQuestionCount(count)}
                  className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                    questionCount === count
                      ? 'bg-purple-500 text-white shadow-lg scale-105'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {count}題
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <button
              onClick={handleStart}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-6 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-2xl"
            >
              開始吧！
            </button>

            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-6 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-2xl"
            >
              我想換模式
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

