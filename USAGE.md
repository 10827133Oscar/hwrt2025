# 使用說明

## 專案概述

已建立完成的手寫數字與英文練習系統前端，包含以下功能：

### 📚 教學模式
1. **準備頁面**：點擊「開始吧！」進入練習
2. **練習頁面**：
   - 顯示題目：「請寫出OOO」（數字或英文字母）
   - 選擇輸入方式：「滑鼠寫字」或「鏡頭擷取」
   - 控制按鈕：
     - **鎖定答案**：擷取當前答案
     - **清空答案**：清除重新書寫
     - **確定送出**：提交答案並顯示正誤
     - **下一題**：繼續練習
     - **結束作答**：返回首頁

### 🎯 測驗模式
1. **準備頁面**：
   - 選擇題數（3, 5, 10, 15, 20題）
   - 點擊「開始吧！」開始測驗
2. **練習頁面**：
   - 顯示題號：「第O題」
   - **播放題目按鈕**：可以播放題目（由後端提供音頻）
   - 答題流程與教學模式相同
   - 答題後自動跳轉下一題
3. **結果頁面**：
   - 顯示分數和正確率
   - 顯示答對/答錯題數
   - 點擊「返回首頁」回到主頁

## 後端整合位置

在前端程式中，需要與您的後端模型 API 整合的位置如下：

### 1. 教學模式答案檢查
**檔案**：`src/pages/TeachingPractice.jsx`  
**函數**：`handleSubmit()`（約第 63 行）

```jsx
const response = await fetch('/api/check-answer', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    answer: answer, 
    correctAnswer: question 
  }),
})
```

### 2. 測驗模式答案提交
**檔案**：`src/pages/TestPractice.jsx`  
**函數**：`handleSubmit()`（約第 95 行）

### 3. 測驗結果計算
**檔案**：`src/pages/TestResult.jsx`  
**函數**：`useEffect()`（約第 14 行）

## 資料格式

### 提交答案
- **answer**: 以 Base64 編碼的圖片數據（PNG 格式）
- **correctAnswer**: 正確答案字串（如 "數字 6"、"英文字母 A"）

### 接收結果
- **isCorrect**: 布林值，表示答案是否正確

## 修改建議

1. **API 端點**：根據您的後端設定修改 API 網址
2. **題目來源**：目前使用隨機生成，可改為從後端獲取
3. **音頻播放**：在 `TestPractice.jsx` 的 `handlePlayQuestion()` 中整合您的音頻 API
4. **錯誤處理**：添加更完整的錯誤處理和提示訊息

## 運行專案

```bash
# 開發模式
npm run dev

# 建置生產版本
npm run build

# 預覽生產版本
npm run preview
```

專案會在 http://localhost:3000 啟動

