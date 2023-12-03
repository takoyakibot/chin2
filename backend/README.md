# APIエンドポイントドキュメント - クイズアプリ

## 概要
このAPIは、クイズアプリのバックエンド機能を提供します。クイズの作成、取得、更新、および特定のクイズの画像の取得が可能です。

## 認証
このAPIを使用するためには、ヘッダーに有効なAPIトークンを含める必要があります。

## エンドポイント

### GET http://localhost:3000/api/games
- **説明**：すべてのクイズを取得します。
- **レスポンス**：クイズの配列。各クイズにはID、タイトル、説明が含まれます。

### POST http://localhost:3000/api/games
- **説明**：新しいクイズを作成します。
- **リクエストボディ**：`{ "title": "string", "description": "string", "image": "string" }`
- **レスポンス**：作成されたクイズの情報。

### PUT http://localhost:3000/api/games
- **説明**：既存のクイズを更新します。
- **リクエストボディ**：`{ "id": "string", "title": "string", "description": "string", "image": "string" }`
- **レスポンス**：更新されたクイズの情報。

### GET http://localhost:3000/api/games/:id/image
- **説明**：指定されたクイズの画像を取得します。
- **レスポンス**：画像データ。

## ディレクトリ構造
```
backend/
├── node_modules/         # Node.jsの依存パッケージ
├── src/                  # TypeScriptソースコード
│   ├── config/           # 設定ファイル
│   ├── controllers/      # APIのエンドポイントの処理
│   ├── middlewares/      # ミドルウェア
│   ├── models/           # データモデル、ORM用の設定
│   ├── routes/           # APIルーティング
│   ├── utils/            # 共通で使う小さな関数や設定
│   ├── app.ts            # expressアプリケーションのエントリポイント
│   └── index.ts          # アプリケーションを起動するエントリポイント
├── dist/                 # コンパイル後のJavaScriptファイル
├── package.json          # プロジェクトの依存関係、スクリプト
├── tsconfig.json         # TypeScriptの設定
└── README.md             # プロジェクトの説明
```