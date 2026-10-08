import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Botella, C, Caja, Flechas, Frasco, Galon, Lata, Periodico } from "./materiales.jsx";

// "Cómo funciona" en tres actos. En la página no se reproduce sola:
// el scroll decide en qué cuadro está (app.js llama a seekTo).
//   Acto 1 (0-119)   Separe en la fuente: los materiales caen a la bolsa blanca.
//   Acto 2 (120-239) Entregue: el reciclador se lleva la bolsa en su triciclo.
//   Acto 3 (240-359) Aprovechamiento: se pesa, se clasifica, se certifica y el ciclo se cierra.

export const PROCESO = { width: 800, height: 800, fps: 30, durationInFrames: 360 };

const FONT = "Manrope, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" };
const SUELO = 640;

const visible = (f, a, b) => interpolate(f, [a - 14, a + 6, b - 6, b + 14], [0, 1, 1, 0], clamp);

const Etiqueta = ({ n, texto, o }) => (
  <g opacity={o} transform={`translate(56 64) translate(${(1 - o) * -20} 0)`}>
    <circle r="26" cx="26" cy="26" fill={C.lime} />
    <text x="26" y="35" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="26" fill={C.navy700}>{n}</text>
    <text x="68" y="35" fontFamily={FONT} fontWeight="700" fontSize="26" fill="#fff">{texto}</text>
  </g>
);

/* ---------------- Acto 1 ---------------- */

const Bolsa = ({ color, borde, ancho = 1, lleno = 0, nudo = 0 }) => (
  <g transform={`scale(${ancho} ${1 + lleno * 0.08})`}>
    <path d={`M-92 0C-112 -60 -100 -150 -70 -190L${-30 + nudo * 22} -214 ${30 - nudo * 22} -214 70 -190C100 -150 112 -60 92 0z`} fill={color} stroke={borde} strokeWidth="4" strokeLinejoin="round" />
    <path d="M-60 -150C-70 -100 -68 -50 -56 -20" stroke="#fff" strokeOpacity=".35" strokeWidth="8" strokeLinecap="round" fill="none" />
    {nudo > 0 && <path d={`M-14 -214c-10 ${-20 * nudo} 38 ${-20 * nudo} 28 0`} fill={color} stroke={borde} strokeWidth="4" />}
  </g>
);

const CAEN = [Botella, Caja, Lata, Periodico];

const Acto1 = ({ f }) => {
  const lleno = interpolate(f, [24, 96], [0, 1], clamp);
  const nudo = interpolate(f, [100, 116], [0, 1], clamp);
  return (
    <g>
      {/* Bolsas negra y verde, de referencia */}
      {[{ x: 150, color: "#2a2f38", borde: "#11141a", t: "No aprovechables" }, { x: 650, color: "#4c9a3f", borde: C.green700, t: "Orgánicos" }].map((b, i) => (
        <g key={i} transform={`translate(${b.x} ${SUELO})`} opacity=".8">
          <g transform="scale(.55)"><Bolsa color={b.color} borde={b.borde} /></g>
          <text y="44" textAnchor="middle" fontFamily={FONT} fontSize="19" fontWeight="600" fill="#fff" opacity=".75">{b.t}</text>
        </g>
      ))}
      {/* Materiales que caen a la bolsa blanca */}
      {CAEN.map((Mat, i) => {
        const a = 8 + i * 22;
        const p = interpolate(f, [a, a + 20], [0, 1], { ...clamp, easing: Easing.in(Easing.quad) });
        const y = interpolate(p, [0, 1], [-70, SUELO - 150]);
        const x = 400 + (i % 2 ? 26 : -26) * (1 - p);
        return (
          <g key={i} transform={`translate(${x} ${y}) rotate(${(i % 2 ? 1 : -1) * p * 70}) scale(${1.1 - p * 0.35})`} opacity={p >= 1 ? 0 : 1}>
            <g transform="translate(-50 -50)"><Mat /></g>
          </g>
        );
      })}
      <g transform={`translate(400 ${SUELO})`}>
        <Bolsa color="#f7f9fb" borde="#c4cdd8" ancho={1.25} lleno={lleno} nudo={nudo} />
        <text y="-80" textAnchor="middle" fontFamily={FONT} fontSize="26" fontWeight="800" fill={C.navy}>Aprovechables</text>
        <text y="-50" textAnchor="middle" fontFamily={FONT} fontSize="18" fontWeight="600" fill="#5b6b80">limpio y seco</text>
      </g>
      <text x="400" y={SUELO + 46} textAnchor="middle" fontFamily={FONT} fontSize="19" fontWeight="700" fill={C.lime}>Bolsa blanca</text>
    </g>
  );
};

/* ---------------- Acto 2 ---------------- */

const Rueda = ({ x, giro }) => (
  <g transform={`translate(${x} -32) rotate(${giro})`}>
    <circle r="32" fill="none" stroke="#e8edf3" strokeWidth="7" />
    <circle r="6" fill="#e8edf3" />
    {[0, 60, 120].map((g) => <path key={g} d="M-30 0H30" transform={`rotate(${g})`} stroke="#e8edf3" strokeWidth="2.5" />)}
  </g>
);

const Triciclo = ({ avance, pedal }) => {
  const giro = (avance / 32) * (180 / Math.PI);
  const pie = { x: 76 + Math.cos(pedal) * 16, y: -52 + Math.sin(pedal) * 16 };
  return (
    <g>
      {/* Bolsa en la carga */}
      <g transform="translate(-92 -112) scale(.62)"><Bolsa color="#f7f9fb" borde="#c4cdd8" nudo={1} /></g>
      {/* Cajón */}
      <path d="M-182 -122h176l-10 84h-156z" fill={C.green} stroke={C.green700} strokeWidth="4" strokeLinejoin="round" />
      <text x="-94" y="-70" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="28" fill="#fff">MC</text>
      {/* Marco */}
      <path d="M-20 -38L76 -52L118 -32M76 -52L58 -122M50 -126h26M104 -150l14 118M92 -150h26" fill="none" stroke="#e8edf3" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <Rueda x={-140} giro={giro} /><Rueda x={-46} giro={giro} /><Rueda x={118} giro={giro} />
      {/* Reciclador: chaleco verde lima */}
      <path d={`M62 -126L${pie.x} ${pie.y}`} stroke={C.navy700} strokeWidth="13" strokeLinecap="round" />
      <path d="M58 -126L72 -196" stroke={C.lime} strokeWidth="30" strokeLinecap="round" />
      <path d="M74 -186L104 -152" stroke="#c58b5a" strokeWidth="10" strokeLinecap="round" />
      <circle cx="78" cy="-222" r="19" fill="#c58b5a" />
      <path d="M58 -228a20 20 0 0 1 40 0z" fill={C.navy} />
      <path d="M94 -230h14" stroke={C.navy} strokeWidth="5" strokeLinecap="round" />
    </g>
  );
};

const Ciudad = ({ dx, f }) => {
  const edificios = [[0, 90, 70], [80, 150, 60], [150, 110, 80], [240, 190, 54], [300, 120, 90], [400, 160, 70], [480, 100, 60], [550, 140, 80], [640, 90, 70], [720, 170, 60]];
  const llama = 1 + Math.sin(f * 0.9) * 0.15;
  return (
    <g transform={`translate(${dx} 0)`} opacity=".5">
      {[0, 800].map((o) => (
        <g key={o} transform={`translate(${o} 0)`}>
          {edificios.map(([x, h, w], i) => <rect key={i} x={x} y={SUELO - h} width={w} height={h} fill={C.navy} />)}
          {/* Chimenea de la refinería, guiño a Barrancabermeja */}
          <rect x="610" y={SUELO - 300} width="16" height="300" fill={C.navy} />
          <path d={`M618 ${SUELO - 300}c-12 -10 -6 -${30 * llama} 0 -${44 * llama}c6 14 14 24 0 44z`} fill="#f2a33a" />
          {/* Palmera */}
          <path d={`M196 ${SUELO}c6 -60 4 -120 12 -170`} stroke={C.navy} strokeWidth="10" fill="none" />
          {[-60, -20, 20, 60, 100].map((g) => <path key={g} d="M0 0c20 -18 50 -18 70 2c-24 -6 -48 -4 -70 -2z" fill={C.navy} transform={`translate(208 ${SUELO - 170}) rotate(${g - 40})`} />)}
        </g>
      ))}
    </g>
  );
};

const Acto2 = ({ f }) => {
  const l = f - 120;
  const x = interpolate(l, [0, 50, 90, 120], [-260, 380, 440, 900], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const pin = interpolate(l, [30, 48], [0, 1], { ...clamp, easing: Easing.out(Easing.back(2)) });
  return (
    <g>
      <Ciudad dx={-((l * 3) % 800)} f={f} />
      <rect x="0" y={SUELO} width="800" height="10" fill="#e8edf3" opacity=".7" />
      {Array.from({ length: 16 }).map((_, i) => (
        <rect key={i} x={((i * 60 - l * 9) % 960 + 960) % 960 - 80} y={SUELO + 34} width="34" height="6" rx="3" fill="#fff" opacity=".45" />
      ))}
      {/* Punto de la ruta */}
      <g transform={`translate(560 ${190 + (1 - pin) * -40})`} opacity={pin}>
        <path d="M0 0c-26 -34 -40 -52 -40 -74a40 40 0 0 1 80 0c0 22 -14 40 -40 74z" fill={C.lime} />
        <circle cy="-74" r="15" fill={C.navy700} />
        <rect x="-110" y="18" width="220" height="44" rx="22" fill="#fff" />
        <text y="47" textAnchor="middle" fontFamily={FONT} fontSize="19" fontWeight="700" fill={C.navy}>Ruta de su sector</text>
      </g>
      <g transform={`translate(${x} ${SUELO + 2})`}><Triciclo avance={x} pedal={l * 0.35} /></g>
    </g>
  );
};

/* ---------------- Acto 3 ---------------- */

const CANASTAS = [
  { t: "Plástico", c: "#4f86c6", M: Galon },
  { t: "Papel y cartón", c: "#b07a3d", M: Caja },
  { t: "Metales", c: "#7d8fa6", M: Lata },
  { t: "Vidrio", c: C.green, M: Frasco },
];

const Acto3 = ({ f }) => {
  const l = f - 240;
  const cae = interpolate(l, [2, 16], [0, 1], { ...clamp, easing: Easing.out(Easing.bounce) });
  const kg = interpolate(l, [16, 46], [0, 48.6], { ...clamp, easing: Easing.out(Easing.cubic) });
  const bascula = interpolate(l, [44, 56], [1, 0], clamp);
  const ciclo = interpolate(l, [92, 104], [0, 1], clamp);
  const flechas = interpolate(l, [96, 118], [0, 1], { ...clamp, easing: Easing.inOut(Easing.quad) });
  const cert = interpolate(l, [68, 84], [0, 1], { ...clamp, easing: Easing.out(Easing.back(1.4)) });
  const sello = interpolate(l, [82, 90], [2, 1], clamp);
  return (
    <g>
      {/* Báscula */}
      <g opacity={bascula * (1 - ciclo)} transform={`translate(400 ${SUELO})`}>
        <g transform={`translate(0 ${-30 + (1 - cae) * -320}) scale(.7)`}><Bolsa color="#f7f9fb" borde="#c4cdd8" nudo={1} /></g>
        <rect x="-170" y="-30" width="340" height="30" rx="8" fill="#e8edf3" />
        <rect x="-120" y="0" width="240" height="90" rx="14" fill={C.navy700} stroke="#e8edf3" strokeWidth="4" />
        <text y="60" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontWeight="700" fontSize="42" fill={C.lime}>{kg.toFixed(1).replace(".", ",")} kg</text>
      </g>
      {/* Clasificación en canastas */}
      <g opacity={1 - ciclo}>
        {CANASTAS.map(({ t, c, M }, i) => {
          const p = interpolate(l, [48 + i * 5, 62 + i * 5], [0, 1], { ...clamp, easing: Easing.out(Easing.back(2)) });
          const x = 100 + i * 200;
          return (
            <g key={i} transform={`translate(${x} ${SUELO - 40}) scale(${p})`} opacity={Math.min(1, p)}>
              <g transform="translate(-40 -140) scale(.8)"><M /></g>
              <path d="M-80 -70h160l-14 110h-132z" fill={c} stroke="#fff" strokeOpacity=".5" strokeWidth="3" strokeLinejoin="round" />
              <path d="M-64 -40h128M-60 -10h120" stroke="#fff" strokeOpacity=".25" strokeWidth="4" />
              <text y="78" textAnchor="middle" fontFamily={FONT} fontSize="19" fontWeight="700" fill="#fff">{t}</text>
            </g>
          );
        })}
      </g>
      {/* Certificado */}
      <g opacity={Math.min(1, cert) * (1 - ciclo)} transform={`translate(400 ${300 + (1 - cert) * 120}) rotate(${(1 - cert) * -8})`}>
        <rect x="-190" y="-130" width="380" height="230" rx="16" fill="#fff" />
        <rect x="-190" y="-130" width="380" height="16" rx="8" fill={C.green} />
        <text y="-66" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="24" fill={C.navy}>Certificado de</text>
        <text y="-36" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="24" fill={C.navy}>aprovechamiento</text>
        <path d="M-150 4h200M-150 34h160M-150 64h120" stroke="#d6dde6" strokeWidth="10" strokeLinecap="round" />
        <g transform={`translate(130 40) scale(${sello}) rotate(-12)`} opacity={l >= 82 ? 1 : 0}>
          <circle r="44" fill="none" stroke={C.green} strokeWidth="6" />
          <path d="M-20 0l14 14 26 -28" fill="none" stroke={C.green} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
      {/* El ciclo se cierra */}
      <g opacity={ciclo} transform={`translate(400 360) scale(2.3) rotate(${flechas * 120})`}>
        <Flechas progress={flechas} />
        <circle r="30" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.3)" strokeWidth="1.5" />
        <text y="8" textAnchor="middle" transform={`rotate(${-flechas * 120})`} fontFamily={FONT} fontWeight="800" fontSize="22" fill="#fff" opacity={flechas}>MC</text>
      </g>
      <text x="400" y="680" textAnchor="middle" fontFamily={FONT} fontSize="28" fontWeight="700" fill="#fff" opacity={flechas}>Vuelve a la industria como materia prima</text>
    </g>
  );
};

export const ProcesoEscena = () => {
  const f = useCurrentFrame();
  const a1 = f < 120 ? 1 : visible(f, 0, 120);
  const a2 = visible(f, 120, 240);
  const a3 = f >= 240 ? 1 : visible(f, 240, 360);
  return (
    <AbsoluteFill>
      <svg viewBox="0 0 800 800" width="100%" height="100%">
        <defs>
          <clipPath id="mc-marco"><rect width="800" height="800" rx="36" /></clipPath>
          <radialGradient id="mc-luz" cx=".5" cy=".35" r=".7">
            <stop offset="0" stopColor={C.lime} stopOpacity=".22" />
            <stop offset="1" stopColor={C.lime} stopOpacity="0" />
          </radialGradient>
        </defs>
        <g clipPath="url(#mc-marco)">
          <rect width="800" height="800" fill="rgba(10,24,58,.55)" />
          <rect width="800" height="800" fill="url(#mc-luz)" />
          {a1 > 0 && <g opacity={a1}><Acto1 f={f} /></g>}
          {a2 > 0 && <g opacity={a2}><Acto2 f={f} /></g>}
          {a3 > 0 && <g opacity={a3}><Acto3 f={f} /></g>}
          <Etiqueta n="1" texto="Separe en la fuente" o={f < 120 ? 1 : visible(f, 0, 120)} />
          <Etiqueta n="2" texto="Entregue el material" o={visible(f, 120, 240)} />
          <Etiqueta n="3" texto="Aprovechamiento y certificación" o={f >= 240 ? 1 : visible(f, 240, 360)} />
        </g>
        <rect x="1" y="1" width="798" height="798" rx="36" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="2" />
      </svg>
    </AbsoluteFill>
  );
};
