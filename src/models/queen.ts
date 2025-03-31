/* eslint-disable @typescript-eslint/no-unused-vars */
import { Piece, PieceColor, PieceImages, PieceType } from "./piece";

export  class Queen implements Piece {
  pieceType: PieceType;
  constructor(public name: string, public color: PieceColor) {
    this.pieceType = PieceType.QUEEN;
  }

  getType(): PieceType {
    return this.pieceType;
  }

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