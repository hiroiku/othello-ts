import { Game } from '@/Game';
import { Turn } from '@/Othello/Turn';
import { Board } from '@/Othello/Board';
import { Player } from '@/Othello/Player';
import { Square } from '@/Othello/Square';
import { RenderingScene } from '@/Scene/RenderingScene';

export interface Context {
  players: Player[];
  board: Board;
  turn: Turn;
  input: {
    x: number;
    y: number;
  };
}

new Game(() => {
  // プレイヤーを初期化する
  const players = [
    new Player('x'), // Player 1
    new Player('o'), // Player 2
  ];

  // 盤面を初期化する
  const board = new Board({
    xAxis: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    yAxis: ['1', '2', '3', '4', '5', '6', '7', '8'],
    blank: new Square('.'),
    valid: new Square('_'),
  });

  // Player 1
  board.setPiece(players[0], 3, 3);
  board.setPiece(players[0], 4, 4);

  // Player 2
  board.setPiece(players[1], 4, 3);
  board.setPiece(players[1], 3, 4);

  const turn = new Turn(players);

  const input = {
    x: 0,
    y: 0,
  };

  return {
    players,
    board,
    turn,
    input,
  };
}).run(RenderingScene);
