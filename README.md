# TypeScript オセロ

## インストール

```sh
npm i
```

## ゲームの開始

```sh
npm start
```

実行結果

```
npm start

> start
> ts-node -r tsconfig-paths/register ./src/main.ts

  a b c d e f g h
1 . . . . . . . .
2 . . . . . . . .
3 . . . . _ . . .
4 . . . x o _ . .
5 . . _ o x . . .
6 . . . _ . . . .
7 . . . . . . . .
8 . . . . . . . .

x: 2
o: 2

1: x の番です。
石を置く場所を入力してください (例: e5)。
>
```

`./src/main.ts` のプレイヤーと盤面の設定を変更すれば 4 人対戦も可能

```ts
const players = [
  new Player('x'), // Player 1
  new Player('o'), // Player 2
  new Player('#'), // Player 3
  new Player('@'), // Player 4
];
```

```ts
// Player 1
board.setPiece(players[0], 3, 3);
board.setPiece(players[0], 2, 4);

// Player 2
board.setPiece(players[1], 4, 4);
board.setPiece(players[1], 5, 3);

// Player 3
board.setPiece(players[2], 4, 3);
board.setPiece(players[2], 3, 2);

// Player 4
board.setPiece(players[3], 4, 5);
board.setPiece(players[3], 3, 4);
```

## JavaScript のビルド

```sh
npm run build
```
