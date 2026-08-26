type CharacterProps = {
  isTalking: boolean;
};

export default function Character({ isTalking }: CharacterProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-28 h-28 sm:w-36 sm:h-36"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body */}
      <ellipse cx="100" cy="150" rx="45" ry="40" fill="#22d3ee" />

      {/* Waving arm (right side, animated) */}
      <g style={{ transformOrigin: "130px 130px" }} className="animate-wave">
        <ellipse cx="150" cy="120" rx="10" ry="30" fill="#22d3ee" />
        <circle cx="155" cy="95" r="10" fill="#fcd34d" />
      </g>

      {/* Still arm (left side) */}
      <ellipse cx="60" cy="140" rx="10" ry="28" fill="#22d3ee" />

      {/* Head */}
      <circle cx="100" cy="85" r="45" fill="#fcd34d" />

      {/* Eyes */}
      <circle cx="85" cy="80" r="5" fill="#1e1e1e" />
      <circle cx="115" cy="80" r="5" fill="#1e1e1e" />

      {/* Mouth: talking hole isTalking-er upor depend kore shape change hobe */}
      {isTalking ? (
        <ellipse
          cx="100"
          cy="102"
          rx="12"
          ry="8"
          fill="#7c2d12"
          className="animate-talk"
        />
      ) : (
        <path
          d="M 85 100 Q 100 110 115 100"
          stroke="#7c2d12"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}