import { useRef, useEffect, useState } from 'react'

export default function CameraCapture({ isActive, onCapture }) {
  const videoRef = useRef(null)
  const [stream, setStream] = useState(null)

  useEffect(() => {
    if (isActive) {
      startCamera()
    } else {
      stopCamera()
    }

    return () => {
      stopCamera()
    }
  }, [isActive])

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
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas')
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(videoRef.current, 0, 0)
      const imageData = canvas.toDataURL('image/png')
      onCapture(imageData)
    }
  }

  useEffect(() => {
    if (isActive) {
      startCamera()
    }
  }, [isActive])

  if (!isActive) {
    return (
      <div className="w-full h-96 border-2 border-gray-300 rounded-lg bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500 text-lg">請選擇【鏡頭擷取】來啟動攝影機</p>
      </div>
    )
  }

  return (
    <div className="relative">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-96 object-cover border-2 border-gray-300 rounded-lg bg-gray-900"
      />
      <button
        onClick={captureImage}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg"
      >
        擷取畫面
      </button>
    </div>
  )
}

