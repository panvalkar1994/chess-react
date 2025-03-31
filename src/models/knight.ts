/* eslint-disable @typescript-eslint/no-unused-vars */
import { Piece, PieceColor, PieceImages, PieceType } from "./piece";

export class Knight implements Piece {
  pieceType: PieceType;
  constructor(public name: string, public color: PieceColor) {
    this.pieceType = PieceType.KNIGHT;
  }

  getType(): PieceType {
    return this.pieceType;
  }

  getImage(): string {
    return PieceImages.get(`${this.name}-${this.color}`) || "";
  }

  validateMove(_gameState: { pieces: { [key: string]: Piece } }, _from: string, _to: string): boolean {
    return false;
  }

  getColor(): PieceColor {
    return this.color;
  }
}