# 專案架構設計說明

## 目前狀態：前端已完成，等待後端整合

### ⚠️ 重要說明
**這個前端目前無法進行真正的辨識！** 所有顯示的結果都是隨機模擬數據。

---

## 專案設計流程

### 1. 使用者流程設計

#### 教學模式
```
首頁 → 選擇「教學」 → 準備頁（教學模式 隨機出題） 
  → 練習頁（顯示題目、畫布/攝影機、控制按鈕） 
  → 顯示對錯 → 繼續/結束
```

#### 測驗模式
```
首頁 → 選擇「測驗」 → 準備頁（選擇題數） 
  → 練習頁（題號、播放按鈕、畫布/攝影機） 
  → 自動跳轉下一題 → 結果頁（顯示分數、統計）
```

### 2. 前端架構（已完成）

```
src/
├── pages/              # 頁面組件
│   ├── Home.jsx                ✓ 首頁（模式選擇）
│   ├── TeachingPrepare.jsx     ✓ 教學準備頁
│   ├── TeachingPractice.jsx    ✓ 教學練習頁
│   ├── TestPrepare.jsx         ✓ 測驗準備頁
│   ├── TestPractice.jsx       ✓ 測驗練習頁
│   └── TestResult.jsx         ✓ 測驗結果頁
├── components/         # 可重用組件
│   ├── Canvas.jsx             ✓ 手寫畫布
│   └── CameraCapture.jsx      ✓ 攝影機擷取
└── App.jsx            ✓ 路由設定
```

### 3. 輸入數據格式（準備給後端）

當使用者提交答案時，前端會產生以下數據：

**Canvas（手寫）輸出：**
```javascript
{
  answer: "data:image/png;base64,iVBORw0KGgoAAAANS..." // Base64 圖片
}
```

**Camera（攝影機）輸出：**
```javascript
{
  answer: "data:image/png;base64,iVBORw0KGgoAAAANS..." // Base64 圖片
}
```

---

## 未來需要整合的後端 API

### 1. 答案檢查 API（教學模式）
**檔案：`src/pages/TeachingPractice.jsx` 第 63-70 行**

```javascript
// 目前是模擬的（第 66 行）
setIsCorrect(Math.random() > 0.5)

// 需要改成實際 API 呼叫
const response = await fetch('/api/check-answer', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    image: answer,           // Base64 圖片
    correctAnswer: question  // 正確答案，如 "數字 6"
  }),
})
const data = await response.json()
setIsCorrect(data.isCorrect)
```

### 2. 題目生成 API（選用）
**檔案：`src/pages/TeachingPractice.jsx` 第 8-16 行**

```javascript
// 目前是隨機生成（第 14 行）
const questions = [...]
return questions[Math.floor(Math.random() * questions.length)]

// 可以改為從後端獲取
const response = await fetch('/api/get-question')
const data = await response.json()
setQuestion(data.question)
```

### 3. 音頻播放（測驗模式）
**檔案：`src/pages/TestPractice.jsx` 第 35-38 行**

```javascript
// 目前只有 console.log
console.log('播放題目:', question)

// 需要整合語音播放
const audio = new Audio(`/api/audio/${question}`)
audio.play()
```

### 4. 答案提交 API（測驗模式）
**檔案：`src/pages/TestPractice.jsx` 第 89-106 行**

```javascript
// 目前只記錄答案，沒有實際判斷
setAnswers([...answers, { question, answer }])

// 需要同時提交到後端
await fetch('/api/submit-answer', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ question, image: answer }),
})
```

### 5. 結果計算 API（測驗結果）
**檔案：`src/pages/TestResult.jsx` 第 12-25 行**

```javascript
// 目前使用隨機模擬（第 22 行）
const mockCorrect = Math.floor(total * 0.7)

// 需要從後端獲取實際結果
const response = await fetch('/api/test-result', {
  method: 'POST',
  body: JSON.stringify({ answers }),
})
const data = await response.json()
setCorrectCount(data.correct)
setScore(data.score)
```

---

## 後端需要提供的 API

### API 端點設計建議

#### 1. POST /api/check-answer
```javascript
// 請求
{
  image: "data:image/png;base64,...",
  correctAnswer: "數字 6"
}

// 回應
{
  isCorrect: true/false,
  predictedAnswer: "6",  // 模型辨識的結果
  confidence: 0.95        // 信心度
}
```

#### 2. GET /api/get-question
```javascript
// 回應
{
  question: "數字 6",
  type: "number" // 或 "letter"
}
```

#### 3. POST /api/submit-answer
```javascript
// 請求（每題答完後提交）
{
  question: "數字 6",
  image: "data:image/png;base64,...",
  questionNumber: 1
}

// 回應
{
  success: true
}
```

#### 4. POST /api/test-result
```javascript
// 請求（提交所有答案）
{
  answers: [
    { question: "數字 6", image: "...", questionNumber: 1 },
    { question: "英文字母 A", image: "...", questionNumber: 2 },
    ...
  ],
  totalQuestions: 5
}

// 回應
{
  correct: 3,
  wrong: 2,
  score: 60,
  details: [
    { question: "數字 6", isCorrect: true },
    { question: "英文字母 A", isCorrect: false },
    ...
  ]
}
```

#### 5. GET /api/audio/{question}
```javascript
// 回應：音頻檔案
// 例如：數字6.mp3、英文字母A.mp3
```

---

## 數據流程圖

### 教學模式完整流程
```
1. 使用者畫出答案（Canvas）或拍照（Camera）
   ↓
2. 點擊「鎖定答案」→ 擷取圖片為 Base64
   ↓
3. 點擊「確定送出」→ 發送 API 請求
   ↓
4. 後端模型辨識圖片
   ↓
5. 後端回傳辨識結果
   ↓
6. 前端顯示「答題正確」或「答題錯誤」
```

### 測驗模式完整流程
```
1. 出題：從後端獲取題目（或使用前端隨機）
   ↓
2. 使用者答題 → 圖片轉 Base64
   ↓
3. 每題提交 → 後端記錄答案
   ↓
4. 最後提交全部答案
   ↓
5. 後端批量辨識並計算分數
   ↓
6. 顯示結果頁面
```

---

## 如何整合您的後端

### 步驟 1: 確認後端 API
檢查您的後端模型是否支援：
- 接收圖片（Base64 或檔案格式）
- 辨識手寫數字和英文字母
- 回傳辨識結果

### 步驟 2: 修改前端 API 呼叫
在所有標示「模擬」的地方，改成實際的 API 呼叫。

### 步驟 3: 設定 API 端點
在 `vite.config.js` 或建立 `config.js` 設定後端網址：

```javascript
// config.js
export const API_BASE_URL = 'http://localhost:8000' // 您的後端網址

// 使用範例
import { API_BASE_URL } from './config'
await fetch(`${API_BASE_URL}/api/check-answer`, {...})
```

### 步驟 4: 測試整合
1. 啟動後端伺服器
2. 測試每個 API 端點
3. 確認數據格式一致

---

## 總結

### 目前完成的部分
✅ **前端 UI** - 完整的使用者介面
✅ **手寫功能** - Canvas 繪畫
✅ **攝影機功能** - 照片擷取
✅ **路由系統** - 頁面導航
✅ **數據擷取** - 圖片轉 Base64
✅ **Git 管理** - 版本控制

### 待整合的部分
⏳ **模型辨識** - 需要您後端的 AI 模型
⏳ **API 呼叫** - 將模擬代碼改為實際 API
⏳ **結果顯示** - 依後端回傳的真實結果

### 資料格式已準備好
前端已經準備好提交 Base64 圖片數據，只要後端能夠接收這種格式的圖片並進行辨識即可！

