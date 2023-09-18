import { Router, Request, Response } from 'express';
import Game from '../models/Game'; // 新しく作ったモデルをインポート

const router = Router();

const sampleGameData = [
  {
    quizName: "aaa",
    thumbnail: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAAXNSR0IArs4c6QAAAP9JREFUGFcFwU9LwmAAwOHf68HMFCIUooKCFLF/0CUo0ohB4W0WeBBPUUEfx0vQoWOfQYggcxcPkaVCVCsYuNhpNp1WI/f2POKodCAT6QzN1i21uzq23ceXI4SytSrnYkGSSyk8YjRq11SfDISaW5fjIsDmWhrtps67K3kzTEQhvyFXUstk9w55bVRx3V/K51eI/WxC5gunBEZxjLZG90unorUQqpKQC4sZcGaxTIv2RwXDthElNS1D4XkGn3F63SGd7jOm20GcHeekrpuEnCn+/Cgv1gM/voPYySRlOBJhVznBG/S4vCjzPeojisVtGZ2cZiY+wf1jk7GgjzcY8g9n/Gxp222AWAAAAABJRU5ErkJggg==",
    stickerImage: null,
    updDate: "2023-08-19T09:51:55.365Z",
    quizInfo: [
      {
        x: 392,
        y: 353,
        answer: "YES",
        size: 50
      },
      {
        x: 95,
        y: 324,
        answer: "YES",
        size: 50
      }
    ],
    answerDate: "2023-08-21T16:19:23.037Z"
  }
];

router.get('/mock', (req: Request, res: Response) => {
  res.status(200).json(sampleGameData);
});

router.get('/', async (req: Request, res: Response) => {
  try {
    // Mongooseを使って全てのgamesを取得
    const games = await Game.find({});
    console.log("ok");
    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
