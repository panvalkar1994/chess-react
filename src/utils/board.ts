export function GetRowCol(square: string): { row: number; col: number } {
  const col = square.charCodeAt(0) - 65 + 1;
  const row = parseInt(square[1]);
  return { row, col };
}
