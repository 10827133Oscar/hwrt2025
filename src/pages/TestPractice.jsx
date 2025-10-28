import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Canvas from '../components/Canvas'
import CameraCapture from '../components/CameraCapture'

export default function TestPractice() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const totalQuestions = parseInt(searchParams.get('count') || '5')
  
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [inputMode, setInputMode] = useState(() => localStorage.getItem('testInputMode') || '')
  const [question, setQuestion] = useState('數字 6')
  const [answerCaptured, setAnswerCaptured] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [clearTrigger, setClearTrigger] = useState(false)
  const [answer, setAnswer] = useState(null)
  const [answers, setAnswers] = useState([])

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
      localStorage.setItem('testInputMode', inputMode)
    }
  }, [inputMode])

  useEffect(() => {
    setQuestion(getRandomQuestion())
  }, [currentQuestion])

  const handlePlayQuestion = () => {
    // 這裡應該播放題目音頻（由後端提供）
    console.log('播放題目:', question)
  }

  const handleLockAnswer = () => {
    if (inputMode === 'draw') {
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
    }
  }

  const handleClear = () => {
    setClearTrigger(true)
    setAnswer(null)
    setAnswerCaptured(false)
    
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

    console.log('提交答案:', answer)

    // 記錄答案
    setAnswers([...answers, { question, answer }])

    // 跳到下一題
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1)
      setAnswer(null)
      setAnswerCaptured(false)
      // 不重置 inputMode，保持使用者選擇
      handleClear()
    } else {
      // 測驗結束，計算結果
      navigate('/test/result', { state: { answers, totalQuestions } })
    }
  }

  const handleCameraCapture = (imageData) => {
    setAnswer(imageData)
    setAnswerCaptured(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              第{currentQuestion}題
            </h1>
            <button
              onClick={handlePlayQuestion}
              className="flex items-center space-x-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-lg transition-all"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              <span>播放題目</span>
            </button>
          </div>

          {/* 輸入模式選擇 */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => {
                setInputMode('draw')
                setIsDrawing(true)
              }}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                inputMode === 'draw'
                  ? 'bg-purple-500 text-white shadow-lg'
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
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                inputMode === 'camera'
                  ? 'bg-purple-500 text-white shadow-lg'
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

          {/* 控制按鈕 */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleLockAnswer}
              disabled={!inputMode || answerCaptured}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
            >
              鎖定答案
            </button>
            <button
              onClick={handleClear}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl shadow-lg transition-all"
            >
              清空答案
            </button>
            <button
              onClick={handleSubmit}
              disabled={!answerCaptured}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
            >
              {currentQuestion < totalQuestions ? '下一題' : '完成測驗'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

