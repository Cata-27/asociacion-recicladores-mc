// Ilustraciones de materiales aprovechables (SVG, viewBox 0 0 100 100).
// Se dibujan en código para que las escenas no dependan de imágenes externas.

export const C = {
  navy: "#14306e",
  navy700: "#0f2454",
  green: "#2f7d32",
  green700: "#256427",
  lime: "#8bc34a",
  white: "#ffffff",
};

export const Botella = () => (
  <g>
    <rect x="42" y="8" width="16" height="10" rx="3" fill={C.green} />
    <path d="M44 18h12v8c0 4 10 8 10 18v44c0 4-3 6-6 6H40c-3 0-6-2-6-6V44c0-10 10-14 10-18z" fill="#7cc8ef" stroke="#3a8fc4" strokeWidth="2.5" />
    <path d="M38 50h24v20H38z" fill="#ffffff" opacity=".85" />
    <path d="M42 56h16M42 63h10" stroke="#3a8fc4" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M40 36c3-3 6-4 6-4" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".7" fill="none" />
  </g>
);

export const Lata = () => (
  <g>
    <rect x="30" y="14" width="40" height="74" rx="7" fill="#cfd8e3" stroke="#7d8fa6" strokeWidth="2.5" />
    <rect x="30" y="38" width="40" height="26" fill={C.navy} />
    <path d="M38 51h24" stroke={C.lime} strokeWidth="4" strokeLinecap="round" />
    <ellipse cx="50" cy="16" rx="18" ry="4" fill="#e9eef5" stroke="#7d8fa6" strokeWidth="2" />
    <path d="M36 22v60" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".6" />
  </g>
);

export const Caja = () => (
  <g>
    <path d="M14 34l36-14 36 14v40L50 88 14 74z" fill="#d39c5d" stroke="#8a5a2b" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M14 34l36 14 36-14M50 48v40" fill="none" stroke="#8a5a2b" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M32 27l36 14v10" fill="none" stroke="#f3dfb8" strokeWidth="5" />
    <path d="M58 64l8-3M58 71l12-4" stroke="#8a5a2b" strokeWidth="2.5" strokeLinecap="round" />
  </g>
);

export const Periodico = () => (
  <g>
    <path d="M16 22h56l12 10v48H16z" fill="#f4f6f8" stroke="#8795a8" strokeWidth="2.5" strokeLinejoin="round" />
    <rect x="24" y="30" width="22" height="16" fill="#b9c3cf" />
    <path d="M52 32h22M52 39h22M52 46h16M24 54h50M24 61h50M24 68h40" stroke="#8795a8" strokeWidth="3" strokeLinecap="round" />
  </g>
);

export const Frasco = () => (
  <g>
    <rect x="34" y="10" width="32" height="12" rx="3" fill="#9aa7b8" />
    <path d="M32 24h36c4 0 8 4 8 9v47c0 6-4 10-10 10H34c-6 0-10-4-10-10V33c0-5 4-9 8-9z" fill="#5fae62" fillOpacity=".75" stroke={C.green700} strokeWidth="2.5" />
    <path d="M32 38v38" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".55" />
  </g>
);

export const Galon = () => (
  <g>
    <path d="M30 26h18l4-10h12v14l10 6v46c0 4-3 6-6 6H30c-4 0-6-2-6-6V32c0-4 2-6 6-6z" fill="#eaf3fb" stroke="#4f86c6" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M58 30h-6v20h12" fill="none" stroke="#4f86c6" strokeWidth="2.5" strokeLinejoin="round" />
    <rect x="30" y="54" width="34" height="18" rx="3" fill={C.lime} opacity=".9" />
  </g>
);

export const MATERIALES = [Botella, Lata, Caja, Periodico, Frasco, Galon];

// Hoja pequeña para partículas
export const Hoja = ({ fill = C.lime }) => (
  <path d="M0 -10C7 -6 8 4 0 10C-8 4 -7 -6 0 -10z" fill={fill} />
);

// Símbolo de reciclaje de tres flechas, centrado en (0,0), radio ~68
export const Flechas = ({ stroke = C.lime, progress = 1 }) => {
  const arcs = [
    { d: "M9.5 -67.3 A68 68 0 0 1 67.6 7.1", h: "M65.7 17.6 L81.8 5.7 L53.9 3.8 Z" },
    { d: "M53.6 41.9 A68 68 0 0 1 -40 55", h: "M-48.1 48.1 L-45.9 68 L-30.2 44.8 Z" },
    { d: "M-63 25.5 A68 68 0 0 1 -27.7 -62.1", h: "M-17.6 -65.7 L-35.9 -73.7 L-23.7 -48.5 Z" },
  ];
  return (
    <g>
      {arcs.map((a, i) => {
        const p = Math.min(1, Math.max(0, progress * 3 - i));
        return (
          <g key={i}>
            <path d={a.d} fill="none" stroke={stroke} strokeWidth="11" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - p} />
            <path d={a.h} fill={stroke} opacity={p >= 0.95 ? 1 : 0} />
          </g>
        );
      })}
    </g>
  );
};
