import app from './app';  // app.tsからExpressアプリケーションインスタンスをインポート
import * as http from 'http';
import * as WebSocket from 'ws';

const PORT = process.env.PORT || 3000;  // 環境変数かデフォルトの3000番ポートを使用

// HTTPサーバを立ち上げ
const server = http.createServer(app);

// WebSocketサーバを作成（必要ならば）
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {
  // ここでWebSocketのイベントハンドリングを行う
});

// サーバ起動
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
