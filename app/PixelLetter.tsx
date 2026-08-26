type PixelLetterProps = {
  pattern: number[][];
  baseDelay?: number;
  fillSpeed?: number;
  topColor?: string;
  bottomColor?: string;
};

function interpolateColor(color1: string, color2: string, factor: number) {
  const hex = (c: string) => [
    parseInt(c.slice(1, 3), 16),
    parseInt(c.slice(3, 5), 16),
    parseInt(c.slice(5, 7), 16),
  ];
  const [r1, g1, b1] = hex(color1);
  const [r2, g2, b2] = hex(color2);

  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);

  return `rgb(${r}, ${g}, ${b})`;
}

export default function PixelLetter({
  pattern,
  baseDelay = 0,
  fillSpeed = 60,
  topColor = "#22d3ee",
  bottomColor = "#a855f7",
}: PixelLetterProps) {
  const totalRows = pattern.length;

  return (
    <div className="grid grid-cols-5 gap-[2px] sm:gap-1">
      {pattern.map((row, rowIndex) =>
        row.map((cell, cellIndex) => {
          const pixelOrder = rowIndex * row.length + cellIndex;
          const factor = totalRows > 1 ? rowIndex / (totalRows - 1) : 0;
          const color = interpolateColor(topColor, bottomColor, factor);

          return (
            <div
              key={`${rowIndex}-${cellIndex}`}
              className={`h-2.5 w-2.5 sm:h-4 sm:w-4 md:h-5 md:w-5 rounded-sm ${
                cell === 1 ? "opacity-0 animate-pixel-fill" : "bg-transparent"
              }`}
              style={
                cell === 1
                  ? {
                      backgroundColor: color,
                      boxShadow: `0 0 4px ${color}`,
                      animationDelay: `${baseDelay + pixelOrder * fillSpeed}ms`,
                    }
                  : undefined
              }
            />
          );
        })
      )}
    </div>
  );
}