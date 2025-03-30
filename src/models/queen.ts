/* eslint-disable @typescript-eslint/no-unused-vars */
import { Piece, PieceColor, PieceImages } from "./piece";

export  class Queen implements Piece {
  constructor(public name: string, public color: PieceColor) {}

  getImage(): string {
    return PieceImages.get(`${this.name}-${this.color}`) || "";
  }

  getColor(): PieceColor {
    return this.color;
  }

  validateMove(_gameState: { pieces: { [key: string]: Piece } }, _from: string, _to: string): boolean {
    return false;
  }
}