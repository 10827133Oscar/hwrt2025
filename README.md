# 手寫數字與英文練習系統

這是一個手寫識別輔助教學應用前端專案，支援教學模式與測驗模式。

## 功能特色

- **教學模式**：隨機出題，提供即時正誤回饋
- **測驗模式**：支援自訂題數，完成後顯示評分結果
- **多種輸入方式**：支援滑鼠手寫與攝影機擷取
- **現代化 UI**：使用 React 與 Tailwind CSS 打造美觀介面

## 技術棧

- React 18
- React Router 6
- Vite
- Tailwind CSS

## 安裝與執行

```bash
# 安裝依賴
npm install

# 開發模式執行
npm run dev

# 建立生產版本
npm run build

# 預覽生產版本
npm run preview
```

## 專案結構

```
src/
├── pages/          # 頁面組件
│   ├── Home.jsx           # 首頁
│   ├── TeachingPrepare.jsx # 教學模式準備頁
│   ├── TeachingPractice.jsx # 教學模式練習頁
│   ├── TestPrepare.jsx    # 測驗模式準備頁
│   ├── TestPractice.jsx  # 測驗模式練習頁
│   └── TestResult.jsx    # 測驗結果頁
├── components/    # 可重用組件
│   ├── Canvas.jsx        # 手寫畫布
│   └── CameraCapture.jsx # 攝影機擷取
├── App.jsx        # 主應用組件
└── main.jsx       # 應用入口
```

## 後端整合

目前前端已準備好與後端模型 API 整合。需要在以下位置添加 API 呼叫：

1. `TeachingPractice.jsx` 的 `handleSubmit` 函數
2. `TestPractice.jsx` 的 `handleSubmit` 函數
3. `TestResult.jsx` 的結果計算邏輯

## 開發狀態

- ✅ 首頁與路由設定
- ✅ 教學模式完整流程
- ✅ 測驗模式完整流程
- ✅ 手寫畫布功能
- ✅ 攝影機擷取功能
- ⏳ 後端 API 整合（待連接後端）

## 授權

大學專題專案

