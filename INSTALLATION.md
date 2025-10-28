# 安裝指南

由於您的工作環境是 WSL2，請依照以下步驟進行安裝：

## 在 WSL 中安裝 Node.js 和 npm

如果 npm 遇到權限問題，請在 WSL 中執行以下命令：

```bash
# 使用 nvm 安裝 Node.js（推薦）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18

# 安裝專案依賴
npm install
```

或者使用 apt 安裝：

```bash
# 更新套件列表
sudo apt update

# 安裝 Node.js 和 npm
sudo apt install -y nodejs npm

# 安裝專案依賴
npm install
```

## 如果在 Windows 主機執行

如果您在 Windows 上執行，請確保使用 Windows 原生的 Node.js 版本：

```bash
npm install
```

## 常見問題

### 問題：npm install 失敗（UNC 路徑錯誤）

這通常發生在 Windows 系統透過 WSL 路徑執行 npm 時。

**解決方案：**
1. 在 WSL 終端中使用 Linux 版本的 npm
2. 或將專案移動到 Linux 磁碟掛載點（如 `/mnt/c/` 之外的本地位置）

## 啟動專案

安裝完成後執行：

```bash
npm run dev
```

瀏覽器會自動開啟至 http://localhost:3000

