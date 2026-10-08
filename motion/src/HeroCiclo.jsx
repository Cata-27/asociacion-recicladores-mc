import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { C, Hoja, MATERIALES } from "./materiales.jsx";

// Inicio: el logo en el centro y los materiales girando a su alrededor.
// Uno a uno, cada material "cae" al logo, que late y suelta hojas.
// Todo es periódico en DURACION cuadros, así el bucle no tiene saltos.

export const HERO = { width: 720, height: 720, fps: 30, durationInFrames: 360 };

const N = MATERIALES.length;
const CICLO = HERO.durationInFrames / N; // cuadros entre una caída y la siguiente
const CAIDA = 26; // cuadros que tarda en caer
const ORBITA = 292;
const CENTRO = HERO.width / 2;

const ease = Easing.bezier(0.55, 0, 0.75, 0.2);

export const HeroCiclo = ({ logoSrc }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = frame / durationInFrames; // 0 → 1 en el bucle
  const giro = t * 360;

  // Latido del logo cada vez que llega un material
  const desde = (frame - CAIDA + durationInFrames) % CICLO;
  const latido = interpolate(desde, [0, 4, 22], [0, 1, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
  const flota = Math.sin(t * Math.PI * 4) * 6;

  return (
    <AbsoluteFill>
      <svg viewBox={`0 0 ${HERO.width} ${HERO.height}`} width="100%" height="100%" style={{ overflow: "visible" }}>
        <defs>
          <radialGradient id="mc-glow">
            <stop offset="0" stopColor={C.lime} stopOpacity=".55" />
            <stop offset="1" stopColor={C.lime} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Resplandor y órbitas */}
        <circle cx={CENTRO} cy={CENTRO} r={210 + latido * 30} fill="url(#mc-glow)" opacity={0.55 + latido * 0.45} />
        <g transform={`rotate(${giro} ${CENTRO} ${CENTRO})`}>
          <circle cx={CENTRO} cy={CENTRO} r={ORBITA} fill="none" stroke={C.lime} strokeOpacity=".55" strokeWidth="2" strokeDasharray="2 14" strokeLinecap="round" />
        </g>
        <g transform={`rotate(${-giro * 2} ${CENTRO} ${CENTRO})`}>
          <circle cx={CENTRO} cy={CENTRO} r={ORBITA - 46} fill="none" stroke="#fff" strokeOpacity=".22" strokeWidth="1.5" strokeDasharray="60 22" />
        </g>
        {/* Onda expansiva al absorber */}
        <circle cx={CENTRO} cy={CENTRO} r={190 + (desde / CICLO) * 170} fill="none" stroke={C.lime} strokeWidth="3"
          opacity={interpolate(desde, [0, CICLO * 0.7], [0.8, 0], { extrapolateRight: "clamp" })} />

        {/* Hojas que salen disparadas */}
        {Array.from({ length: 10 }).map((_, k) => {
          const a = (k / 10) * Math.PI * 2 + Math.floor((frame - CAIDA + durationInFrames) / CICLO);
          const p = interpolate(desde, [0, 34], [0, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
          const r = 150 + p * 150;
          return (
            <g key={k} transform={`translate(${CENTRO + Math.cos(a) * r} ${CENTRO + Math.sin(a) * r}) rotate(${(a * 180) / Math.PI + p * 180}) scale(${1.3 - p * 0.6})`} opacity={1 - p}>
              <Hoja fill={k % 2 ? C.lime : "#b5e07a"} />
            </g>
          );
        })}

        {/* Materiales en órbita */}
        {MATERIALES.map((Mat, i) => {
          const base = (i / N) * 360 + giro;
          const inicio = i * CICLO; // cuadro en que empieza a caer
          const local = (frame - inicio + durationInFrames) % durationInFrames;
          let r = ORBITA, s = 1, o = 1;
          if (local < CAIDA) {
            const p = ease(local / CAIDA);
            r = ORBITA * (1 - p) + 40 * p; s = 1 - 0.75 * p; o = 1 - p * p;
          } else if (local < CAIDA + 34) {
            const p = Easing.out(Easing.back(1.8))((local - CAIDA) / 34);
            r = ORBITA; s = p; o = Math.min(1, p * 1.5);
          }
          const ang = (base * Math.PI) / 180;
          const x = CENTRO + Math.cos(ang) * r, y = CENTRO + Math.sin(ang) * r;
          const balanceo = Math.sin((t * 4 + i / N) * Math.PI * 2) * 10;
          return (
            <g key={i} transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
              <circle r="54" fill="#fff" />
              <circle r="54" fill="none" stroke={C.lime} strokeWidth="3" strokeOpacity=".7" />
              <g transform={`rotate(${balanceo}) translate(-38 -38) scale(.76)`}><Mat /></g>
            </g>
          );
        })}

        {/* Logo */}
        <g transform={`translate(${CENTRO} ${CENTRO + flota}) scale(${1 + latido * 0.06})`}>
          <image href={logoSrc} x={-185} y={-185} width={370} height={370} style={{ filter: "drop-shadow(0 18px 36px rgba(0,0,0,.45))" }} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
