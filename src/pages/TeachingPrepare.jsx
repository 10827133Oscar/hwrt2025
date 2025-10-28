import { useNavigate } from 'react-router-dom'

export default function TeachingPrepare() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-12">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
            教學模式 隨機出題
          </h1>
          
          <div className="space-y-6">
            <button
              onClick={() => navigate('/teaching/practice')}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-6 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-2xl"
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

