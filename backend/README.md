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