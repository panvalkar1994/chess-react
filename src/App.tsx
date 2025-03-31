import "./App.css";
import { useState } from "react";
import Board from "./components/board";
import { Piece, Bishop, King, Knight, Pawn, Queen, Rook, PieceColor, PieceType } from "./models";

export default function App() {
  const initialPiecesSetup = {
    pieces: {
      A1: new Rook("rook", PieceColor.w),
      H1: new Rook("rook", PieceColor.w),
      B1: new Knight("knight", PieceColor.w),
      G1: new Knight("knight", PieceColor.w),
      C1: new Bishop("bishop", PieceColor.w),
      F1: new Bishop("bishop", PieceColor.w),
      D1: new Queen("queen", PieceColor.w),
      E1: new King("king", PieceColor.w),
      A2: new Pawn("pawn", PieceColor.w),
      B2: new Pawn("pawn", PieceColor.w),
      C2: new Pawn("pawn", PieceColor.w),
      D2: new Pawn("pawn", PieceColor.w),
      E2: new Pawn("pawn", PieceColor.w),
      F2: new Pawn("pawn", PieceColor.w),
      G2: new Pawn("pawn", PieceColor.w),
      H2: new Pawn("pawn", PieceColor.w),
      A8: new Rook("rook", PieceColor.b),
      H8: new Rook("rook", PieceColor.b),
      B8: new Knight("knight", PieceColor.b),
      G8: new Knight("knight", PieceColor.b),
      C8: new Bishop("bishop", PieceColor.b),
      F8: new Bishop("bishop", PieceColor.b),
      D8: new Queen("queen", PieceColor.b),
      E8: new King("king", PieceColor.b),
      A7: new Pawn("pawn", PieceColor.b),
      B7: new Pawn("pawn", PieceColor.b),
      C7: new Pawn("pawn", PieceColor.b),
      D7: new Pawn("pawn", PieceColor.b),
      E7: new Pawn("pawn", PieceColor.b),
      F7: new Pawn("pawn", PieceColor.b),
      G7: new Pawn("pawn", PieceColor.b),
      H7: new Pawn("pawn", PieceColor.b),
    },
  };
  const [gameState, setGameState] = useState<{ pieces: { [key: string]: Piece } }>(initialPiecesSetup);

  const [history, setHistory] = useState<Array<{ pieces: { [key: string]: Piece } }>>([initialPiecesSetup]);
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);

  function handleMove(piece: Piece, from: string, to: string): void {
    console.log(`Moving ${piece} from ${from} to ${to}`);
    const newState = { ...gameState };
    if (!piece) {
      console.error(`No piece found at ${from}`);
      return;
    }

    if (piece.getColor() !== (isWhiteTurn ? PieceColor.w : PieceColor.b)) {
      console.error(`It's not ${piece.getColor()}'s turn`);
      alert("It's not your turn");
      return;
    }
    if (!piece.validateMove(newState, from, to)) {
      console.error(`Invalid move from ${from} to ${to}`);
      alert("Invalid move");
      return;
    }
    newState.pieces[to] = piece;
    delete newState.pieces[from];
    if (newState.pieces[to].getType() === PieceType.PAWN && (piece as Pawn).isPromotion(to)) {
      let correctPromotion = false;
      while (!correctPromotion) {
        const newPiece = window.prompt("Promote to (Queen, Rook, Bishop, Knight):");
        if (newPiece) {
          switch (newPiece.toLowerCase()) {
            case "queen":
              newState.pieces[to] = new Queen("queen", piece.getColor());
              correctPromotion = true;
              break;
            case "rook":
              newState.pieces[to] = new Rook("rook", piece.getColor());
              correctPromotion = true;
              break;
            case "bishop":
              newState.pieces[to] = new Bishop("bishop", piece.getColor());
              correctPromotion = true;
              break;
            case "knight":
              newState.pieces[to] = new Knight("knight", piece.getColor());
              correctPromotion = true;
              break;
            default:
              alert("Invalid promotion");
              console.error("Invalid promotion");
              break;
          }
        }
      }
    }
    setGameState(newState);
    console.log("newState", newState);

    setHistory([...history, newState]);
    setIsWhiteTurn(!isWhiteTurn);
  }

  function handleReset() {
    setGameState(initialPiecesSetup);
    setHistory([initialPiecesSetup]);
    setIsWhiteTurn(true);
  }

  return (
    <div className="app">
      <div className="app-drawer">
        <header className="App-header">
          <h1>Chess Board</h1>
        </header>
        <div className="drawer-item">
          <button className="menu" onClick={handleReset}>
            New Game
          </button>
        </div>
      </div>
      <main className="page">
        <Board gameState={gameState} onMove={handleMove} />
      </main>
    </div>
  );
}
