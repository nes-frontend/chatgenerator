import { atom } from "recoil";

export const talkListState = atom<string[]>({
  key: "talkList",
  default: [
    "最近嬉しかったこと",
    "最近買ったモノ",
    "最近見たYoutube動画",
    "最近の趣味",
    "今一番欲しいもの",
    "週末に出かけた場所",
    "昨日の夜ご飯",
    "好きな漫画・アニメ",
    "小学校の頃の夢",
    "出身地について",
  ],
});
