import { GetRowCol } from "../utils/board";
import { Piece, PieceColor, PieceImages, PieceType } from "./piece";

export class Rook implements Piece {
  pieceType:PieceType;
  constructor(public name: string, public color: PieceColor) {
    this.pieceType = PieceType.ROOK;
  }

  getType(): PieceType {
    return this.pieceType;
  }

  getImage(): string {
    return PieceImages.get(`${this.name}-${this.color}`) || "";
  }

  validateMove(gameState: { pieces: { [key: string]: Piece } }, from: string, to: string): boolean {
    const { row: fromRow, col: fromCol } = GetRowCol(from);
    const { row: toRow, col: toCol } = GetRowCol(to);
    const rowDiff = Math.abs(fromRow - toRow);
    const colDiff = Math.abs(fromCol - toCol);
    const isStraightMove = rowDiff === 0 || colDiff === 0;
    if (!isStraightMove) {
      console.log("Rook can only move in straight lines");
      return false;
    }
    const rowStep = rowDiff === 0 ? 0 : (toRow - fromRow) / rowDiff;
    const colStep = colDiff === 0 ? 0 : (toCol - fromCol) / colDiff;
    let currentRow = fromRow + rowStep;
    let currentCol = fromCol + colStep;
    while (currentRow !== toRow || currentCol !== toCol) {
      const square = String.fromCharCode(65 + currentCol - 1) + currentRow;
      if (gameState.pieces[square]) {
        console.log("There is a piece in the way", square);
        return false; // There is a piece in the way
      }
      currentRow += rowStep;
      currentCol += colStep;
    }
    return true; // Valid move
  }

  getColor(): PieceColor {
    return this.color;
  }
}
