import { useRef, useEffect, useState } from 'react'

export default function CameraCapture({ isActive, onCapture, capturedImage, clearTrigger }) {
  const videoRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [captured, setCaptured] = useState(false)

  useEffect(() => {
    if (capturedImage) {
      setCaptured(true)
    } else {
      // 當外部清除時，重置狀態並重啟攝影機
      setCaptured(false)
      if (isActive && captured) {
        setTimeout(() => {
          startCamera()
        }, 100)
      }
    }
  }, [capturedImage])

  useEffect(() => {
    // 外部清除觸發
    if (clearTrigger) {
      setCaptured(false)
      setTimeout(() => {
        if (isActive) {
          startCamera()
        }
      }, 100)
    }
  }, [clearTrigger])

  useEffect(() => {
    if (isActive && !captured) {
      startCamera()
    } else if (!isActive || captured) {
      // 只在不是活動狀態或已擷取時停止
      if (!captured) {
        stopCamera()
      }
    }

    return () => {
      if (!captured && !isActive) {
        stopCamera()
      }
    }
  }, [isActive, captured])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (err) {
      console.error('無法訪問鏡頭:', err)
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    if (videoRef.current && !captured) {
      videoRef.current.srcObject = null
    }
  }

  const captureImage = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const canvas = document.createElement('canvas')
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(videoRef.current, 0, 0)
      const imageData = canvas.toDataURL('image/png')
      
      // 停止攝影機
      stopCamera()
      setCaptured(true)
      onCapture(imageData)
    }
  }

  const resetCapture = () => {
    setCaptured(false)
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    // 重置並重新開始攝影機
    setTimeout(() => {
      if (isActive) {
        startCamera()
      }
    }, 100)
  }

  if (!isActive) {
    return (
      <div className="w-96 h-96 border-2 border-gray-300 rounded-lg bg-gray-100 flex items-center justify-center mx-auto">
        <p className="text-gray-500 text-lg">請選擇【鏡頭擷取】來啟動攝影機</p>
      </div>
    )
  }

  return (
    <div className="relative">
      {captured && capturedImage ? (
        <div className="relative animate-fade-in">
          <img
            src={capturedImage}
            alt="擷取的畫面"
            className="w-96 h-96 mx-auto object-cover border-4 border-red-500 rounded-lg shadow-lg animate-scale-in"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
            <button
              onClick={resetCapture}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all"
            >
              重新擷取
            </button>
          </div>
        </div>
      ) : (
        <div className="relative animate-fade-in">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-96 h-96 mx-auto object-cover border-2 border-gray-300 rounded-lg bg-gray-900"
          />
          <button
            onClick={captureImage}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all"
          >
            擷取畫面
          </button>
        </div>
      )}
    </div>
  )
}

