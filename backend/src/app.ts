import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';  // このファイルではAPIルーティングを設定している

const app = express();

// ミドルウェアの設定
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS設定（必要であれば）
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// APIルーティング
app.use('/api', routes);

// 404エラーハンドリング
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send('Sorry, can\'t find that!');
});

// その他のエラーハンドリング
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;
