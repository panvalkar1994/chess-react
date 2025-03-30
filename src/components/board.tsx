import { Piece } from "../models/piece";

export default function board({ gameState, onMove }: { gameState: { pieces: { [key: string]: Piece } }; onMove: (piece: Piece, from: string, to: string) => void }) {
  const pieces = gameState.pieces;

  function dragEnd(event: React.DragEvent, to: string) {
    const from = event.dataTransfer.getData("from");
    const piece = pieces[from];
    if (piece && from && to) {
      console.log(`Moving ${piece} from ${from} to ${to}`);
      onMove(piece, from, to);
    }
  }

  return (
    <div className="className">
      {Array.from({ length: 8 }, (_, rowIndex) => (
        <div className="chess-row" key={rowIndex}>
          {Array.from({ length: 8 }, (_, colIndex) => {
            const squareId = String.fromCharCode(65 + colIndex) + (rowIndex + 1);
            const isLightSquare = (rowIndex + colIndex) % 2 === 0;
            return (
              <div
                key={squareId}
                id={squareId}
                className={`chess-square ${isLightSquare ? "light" : "dark"}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  dragEnd(e, squareId);
                }}
              >
                {pieces && pieces[squareId]?.getImage() && (
                  <img
                    key={squareId}
                    src={pieces[squareId].getImage() || ""}
                    className="piece"
                    id={squareId}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("from", squareId);
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}