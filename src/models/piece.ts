import king_w from "../assets/pieces/amazon-w.svg";
import queen_w from "../assets/pieces/queen-w.svg";
import rook_w from "../assets/pieces/rook-w.svg";
import bishop_w from "../assets/pieces/bishop-w.svg";
import knight_w from "../assets/pieces/knight-w.svg";
import pawn_w from "../assets/pieces/pawn-w.svg";
import king_b from "../assets/pieces/amazon-b.svg";
import queen_b from "../assets/pieces/queen-b.svg";
import rook_b from "../assets/pieces/rook-b.svg";
import bishop_b from "../assets/pieces/bishop-b.svg";
import knight_b from "../assets/pieces/knight-b.svg";
import pawn_b from "../assets/pieces/pawn-b.svg";

export const PieceImages: Map<string, string> = new Map([
  ["king-white", king_w],
  ["queen-white", queen_w],
  ["rook-white", rook_w],
  ["bishop-white", bishop_w],
  ["knight-white", knight_w],
  ["pawn-white", pawn_w],
  ["king-black", king_b],
  ["queen-black", queen_b],
  ["rook-black", rook_b],
  ["bishop-black", bishop_b],
  ["knight-black", knight_b],
  ["pawn-black", pawn_b],
]);

export enum PieceColor {
  w = "white",
  b = "black",
}

// enum PieceType {
//   king = "king",
//   queen = "queen",
//   rook = "rook",
//   bishop = "bishop",
//   knight = "knight",
//   pawn = "pawn",
// }

export type PieceType = "king" | "queen" | "rook" | "bishop" | "knight" | "pawn";


export interface Piece {
  getImage(): string;
  validateMove(gameState: { pieces: { [key: string]: Piece } }, from: string, to: string): boolean;
  getColor(): PieceColor;
}
