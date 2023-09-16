import { Router } from 'express';
const router = Router();

router.get('/games', (req, res) => {
  // すべてのユーザーを取得する処理
});

router.get('/games/:id', (req, res) => {
  // 特定のIDを持つユーザーを取得する処理
});

router.post('/games', (req, res) => {
  // 新しいユーザーを作成する処理
});

export default router;
