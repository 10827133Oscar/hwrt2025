import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Canvas from '../components/Canvas'
import CameraCapture from '../components/CameraCapture'

export default function TeachingPractice() {
  const navigate = useNavigate()
  const [inputMode, setInputMode] = useState(() => localStorage.getItem('teachingInputMode') || '') // 從 localStorage 讀取
  const [question, setQuestion] = useState('數字 6')
  const [answerCaptured, setAnswerCaptured] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [clearTrigger, setClearTrigger] = useState(false)
  const [answer, setAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  // 模擬從後端獲取題目
  const getRandomQuestion = () => {
    const questions = [
      '數字 0', '數字 1', '數字 2', '數字 3', '數字 4', '數字 5',
      '數字 6', '數字 7', '數字 8', '數字 9',
      '英文字母 A', '英文字母 B', '英文字母 C', '英文字母 D', '英文字母 E'
    ]
    return questions[Math.floor(Math.random() * questions.length)]
  }

  // 保存輸入方式到 localStorage
  useEffect(() => {
    if (inputMode) {
      localStorage.setItem('teachingInputMode', inputMode)
    }
  }, [inputMode])

  const handleLockAnswer = () => {
    if (inputMode === 'draw') {
      // 從 Canvas 獲取圖像數據
      const canvas = document.querySelector('canvas')
      if (canvas) {
        const imageData = canvas.toDataURL('image/png')
        setAnswer(imageData)
        setAnswerCaptured(true)
        
        // 添加鎖定特效：給 canvas 加上紅框和脈衝效果
        canvas.style.border = '4px solid #ef4444'
        canvas.style.animation = 'pulse-glow 2s ease-in-out infinite'
        canvas.style.transition = 'all 0.3s ease'
      }
    } else if (inputMode === 'camera') {
      // Camera 會在按下擷取按鈕時自動處理
    }
  }

  const handleClear = () => {
    setClearTrigger(true)
    setAnswer(null)
    setAnswerCaptured(false)
    setShowResult(false)
    
    // 移除鎖定特效
    const canvas = document.querySelector('canvas')
    if (canvas) {
      canvas.style.border = '2px solid #d1d5db'
      canvas.style.animation = 'none'
    }
    
    setTimeout(() => setClearTrigger(false), 100)
  }

  const handleSubmit = async () => {
    if (!answer) return

    // 這裡模擬後端 API 呼叫
    // 實際應該呼叫您的後端來判斷答案
    console.log('提交答案:', answer)
    
    // 模擬 API 呼叫
    try {
      // const response = await fetch('/api/check-answer', {
      //   method: 'POST',
      //   body: JSON.stringify({ answer, correctAnswer: question }),
      // })
      // const result = await response.json()
      // setIsCorrect(result.isCorrect)
      
      // 模擬結果（暫時使用隨機）
      setIsCorrect(Math.random() > 0.5)
      setShowResult(true)
    } catch (error) {
      console.error('提交答案時發生錯誤:', error)
    }
  }

  const handleNextQuestion = () => {
    setQuestion(getRandomQuestion())
    setAnswer(null)
    setAnswerCaptured(false)
    setShowResult(false)
    // 不重置 inputMode，保持使用者選擇
    handleClear()
  }

  const handleEndPractice = () => {
    navigate('/')
  }

  const handleCameraCapture = (imageData) => {
    setAnswer(imageData)
    setAnswerCaptured(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            請寫出{question}
          </h1>

          {/* 輸入模式選擇 */}
          <div className="flex justify-center space-x-4 mb-8 animate-fade-in">
            <button
              onClick={() => {
                setInputMode('draw')
                setIsDrawing(true)
              }}
              className={`px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                inputMode === 'draw'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span>滑鼠寫字</span>
              </span>
            </button>
            <button
              onClick={() => setInputMode('camera')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                inputMode === 'camera'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>鏡頭擷取</span>
              </span>
            </button>
          </div>

          {/* 答案輸入區域 */}
          <div className="mb-8">
            {inputMode === 'draw' && (
              <div className="flex justify-center">
                <Canvas
                  isDrawing={inputMode === 'draw' && !answerCaptured}
                  clear={clearTrigger}
                  onCapture={() => {}}
                />
              </div>
            )}
            {inputMode === 'camera' && (
              <CameraCapture
                isActive={inputMode === 'camera'}
                onCapture={handleCameraCapture}
                capturedImage={answer}
                clearTrigger={clearTrigger}
              />
            )}
            {!inputMode && (
              <div className="w-full h-96 border-2 border-gray-300 rounded-lg bg-gray-100 flex items-center justify-center">
                <p className="text-gray-500 text-xl">請選擇輸入方式</p>
              </div>
            )}
          </div>

          {/* 結果顯示 */}
          {showResult && (
            <div className={`text-center mb-6 p-6 rounded-xl animate-scale-in ${
              isCorrect ? 'bg-green-100 text-green-700 border-4 border-green-500' : 'bg-red-100 text-red-700 border-4 border-red-500'
            }`}>
              <p className="text-3xl font-bold animate-fade-in">
                {isCorrect ? '答題正確 ✓' : '答題錯誤 ✗'}
              </p>
            </div>
          )}

          {/* 控制按鈕 */}
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
            <button
              onClick={handleLockAnswer}
              disabled={!inputMode || answerCaptured}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
            >
              鎖定答案
            </button>
            <button
              onClick={handleClear}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-95"
            >
              清空答案
            </button>
            <button
              onClick={handleSubmit}
              disabled={!answerCaptured || showResult}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
            >
              確定送出
            </button>
            <button
              onClick={handleNextQuestion}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-95"
            >
              下一題
            </button>
            <button
              onClick={handleEndPractice}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-95"
            >
              結束教學
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

