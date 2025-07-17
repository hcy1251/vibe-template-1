# 🏆 黃金範本儲存庫 (Golden Template)

這是一個為「AI 驅動開發」設計的 Next.js 專案範本。讓非技術背景的創意工作者（Vibe Coder）能透過簡單的文字描述，由 AI 自動生成功能完整的網頁應用。

## 🎯 專案特色

- **AI 優先設計** - 所有文檔和結構都為 AI 理解優化
- **零程式碼創作** - 只需修改 `prd.md` 文件描述你的創意
- **自動化開發** - GitHub Actions + Claude AI 自動實現功能
- **現代技術棧** - Next.js 15+、TypeScript、Tailwind CSS、Shadcn/UI

## 🚀 快速開始

### 1. Fork 這個範本

點擊右上角的 Fork 按鈕，創建你自己的專案副本。

### 2. 設置 API 金鑰（必須）

在你的 GitHub 儲存庫中設置以下 Secrets：

1. 進入 **Settings** → **Secrets and variables** → **Actions**
2. 點擊 **"New repository secret"**
3. 添加以下 Secret：
   - **Name**: `ANTHROPIC_API_KEY`
   - **Value**: 你的 Claude API 金鑰（從 [Anthropic Console](https://console.anthropic.com/) 獲取）

⚠️ **重要**：如果沒有設置這個 Secret，GitHub Actions 將無法運行！

### 3. 表達你的創意

編輯 `prd.md` 文件，在各個段落中描述你理想中的網頁設計：

- 核心設計理念
- 頁面佈局結構
- 商品展示方式
- 視覺風格與品牌
- 互動效果與動畫
- 響應式設計需求

### 4. 啟動 AI 開發

1. 創建一個新的 Issue 描述你的需求
2. 在 Issue 評論中輸入 `@claude` 
3. AI 將自動開始工作並創建 Pull Request

## 📁 專案結構

```
golden-template/
├── src/
│   ├── app/              # Next.js 頁面和 API
│   ├── components/       # React 元件
│   │   └── ui/          # Shadcn/UI 元件
│   └── lib/             # 工具函數
├── public/              
│   └── products.json    # 商品數據（模擬資料）
├── docs/                # 技術規範文檔
│   ├── api_docs.md      # API 文檔
│   ├── db_schema.md     # 數據結構
│   ├── coding_style.md  # 編碼規範
│   └── style_guide.md   # 視覺風格指南
├── .github/workflows/   # GitHub Actions
├── CLAUDE.md           # AI 角色定義與規則
├── prd.md             # 產品需求文檔（你的創意空間）
└── README.md          # 本文件
```

## 🛠️ 技術棧

- **框架**: Next.js 15+ (App Router)
- **語言**: TypeScript
- **樣式**: Tailwind CSS
- **UI 元件**: Shadcn/UI
- **AI 引擎**: Claude (Anthropic)

## 📚 預安裝元件

專案已預先配置以下 Shadcn/UI 元件：
- Button - 按鈕元件
- Card - 卡片容器
- Input - 輸入框

## 🔧 本地開發

如果你想在本地運行專案：

```bash
# 安裝依賴
pnpm install

# 啟動開發服務器
pnpm dev

# 構建專案
pnpm build

# 運行測試
pnpm test
```

## 📝 工作流程

1. **Vibe Coder** 修改 `prd.md` 描述創意
2. 使用 Issue 模板創建新 Issue
3. 在評論中輸入 `@claude` 觸發 AI
4. **Claude AI** 讀取所有文檔並實現功能
5. 自動創建 Pull Request
6. 審查並合併程式碼

## 📚 Issue 和 PR 模板

專案提供了以下模板來協助您與 Claude 互動：

**Issue 模板：**
- 🎨 功能實現請求 - 請求新功能
- 🐛 Bug 修復請求 - 報告問題
- ❓ 詢問 Claude - 提出問題

**其他資源：**
- 📖 [Claude 互動指南](docs/claude_interaction_guide.md) - 學習如何有效地與 AI 對話
- 📝 Pull Request 模板 - 審查 AI 生成的程式碼

## ⚙️ GitHub Actions 配置

專案使用官方的 Claude Code Action：
- 檔案：`.github/workflows/claude.yml`
- Action：`anthropics/claude-code-action@beta`
- 觸發詞：`@claude`
- 自動讀取 prd.md 並實現功能

## 🤝 貢獻指南

歡迎提交 Issue 和 Pull Request 來改進這個範本！

## 📄 授權

MIT License

---

> 💡 **提示**: 這個範本是實驗性質的，旨在探索 AI 驅動開發的可能性。享受創作的樂趣！