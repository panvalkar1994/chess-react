import { GetRowCol } from "../utils/board";
import { Piece, PieceColor, PieceImages, PieceType,  } from "./piece";

export class Pawn implements Piece {
  pieceType: PieceType;
  constructor(public name: string, public color: PieceColor) {
    this.pieceType = PieceType.PAWN;
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

  validateMove(gameState: { pieces: { [key: string]: Piece } }, from: string, to: string): boolean {
    console.log("Validating move for pawn", from, to);
    const { row: fromRow, col: fromCol } = GetRowCol(from);
    const { row: toRow, col: toCol } = GetRowCol(to);
    const direction = this.color === PieceColor.w ? 1 : -1;

    console.log("Direction", direction);
    console.log("From Row", fromRow);
    console.log("To Row", toRow);
    console.log("From Col", fromCol);
    console.log("To Col", toCol);
    if (fromCol === toCol) {
      // Move 2 step forward only if it is the first move
      if (this.color == PieceColor.w && fromRow === 2 && toRow === 4) {
        console.log("Moving 2 steps forward");
        return !gameState.pieces[to];
      } else if (this.color == PieceColor.b && fromRow === 7 && toRow === 5) {
        console.log("Moving 2 steps forward");
        return !gameState.pieces[to];
      } else if (fromRow + direction === toRow) {
        return !gameState.pieces[to];
      }
      return false;
    } else if (Math.abs(fromCol - toCol) === 1 && fromRow + direction === toRow) {
      console.log("Diagonal move");
      // Capture move
      const targetPiece = gameState.pieces[to];
      if (!targetPiece) {
        console.log("No piece to capture");
        return false; // No piece to capture
      } else if (targetPiece.getColor() !== this.color) {
        return true; // Cannot capture own piece
      }
      return false;
    }
    return false; // Invalid move
  }

  isPromotion(to: string): boolean {
    const { row: toRow } = GetRowCol(to);
    if (this.color === PieceColor.w && toRow === 8) {
      console.log("Pawn promotion for white");
      return true;
    } else if (this.color === PieceColor.b && toRow === 1) {
      console.log("Pawn promotion for black");
      return true;
    }
    return false;
  }
}

