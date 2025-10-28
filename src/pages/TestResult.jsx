import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function TestResult() {
  const navigate = useNavigate()
  const location = useLocation()
  const [correctCount, setCorrectCount] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [score, setScore] = useState(0)

  useEffect(() => {
    // 這裡應該從後端獲取結果
    // 暫時模擬計算正確率
    const total = location.state?.totalQuestions || 5
    setTotalQuestions(total)
    
    // 模擬判斷答案
    // const answers = location.state?.answers || []
    // const correct = answers.filter(answer => answer.isCorrect).length
    
    // 暫時使用隨機結果
    const mockCorrect = Math.floor(total * 0.7)
    setCorrectCount(mockCorrect)
    setScore(Math.round((mockCorrect / total) * 100))
  }, [location.state])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-12">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            測驗結果
          </h1>
          
          <div className="mb-8">
            <div className={`text-center mb-6 ${score >= 80 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
              <div className="text-8xl font-bold mb-4">{score}分</div>
              <div className="text-2xl font-semibold">
                {score >= 80 ? '表現優異！' : score >= 60 ? '表現良好' : '需要多加練習'}
              </div>
            </div>

            <div className="bg-gray-100 rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-4xl font-bold text-blue-600">{correctCount}</div>
                  <div className="text-gray-600">答對題數</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-600">{totalQuestions - correctCount}</div>
                  <div className="text-gray-600">答錯題數</div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>正確率</span>
                <span>{score}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full transition-all ${
                    score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-6 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-2xl"
          >
            返回首頁
          </button>
        </div>
      </div>
    </div>
  )
}

