// Punto de entrada para la página: expone window.MCMotion.mount(el, nombre, props)
// y devuelve un control { play, pause, seek(progreso 0-1) }.
import { createRef } from "react";
import { createRoot } from "react-dom/client";
import { Player } from "@remotion/player";
import { HERO, HeroCiclo } from "./HeroCiclo.jsx";
import { PROCESO, ProcesoEscena } from "./ProcesoEscena.jsx";

const ESCENAS = {
  hero: { component: HeroCiclo, ...HERO, loop: true, autoPlay: true },
  proceso: { component: ProcesoEscena, ...PROCESO, loop: false, autoPlay: false },
};

function mount(el, nombre, inputProps = {}) {
  const e = ESCENAS[nombre];
  if (!el || !e) return null;
  const ref = createRef();
  createRoot(el).render(
    <Player
      ref={ref}
      component={e.component}
      inputProps={inputProps}
      durationInFrames={e.durationInFrames}
      compositionWidth={e.width}
      compositionHeight={e.height}
      fps={e.fps}
      loop={e.loop}
      autoPlay={e.autoPlay}
      controls={false}
      clickToPlay={false}
      doubleClickToFullscreen={false}
      spaceKeyToPlayOrPause={false}
      acknowledgeRemotionLicense
      style={{ width: "100%", height: "100%", background: "transparent" }}
    />
  );
  const last = e.durationInFrames - 1;
  return {
    play: () => ref.current?.play(),
    pause: () => ref.current?.pause(),
    seek: (p) => ref.current?.seekTo(Math.round(Math.min(1, Math.max(0, p)) * last)),
  };
}

window.MCMotion = { mount };
document.dispatchEvent(new Event("mcmotion:ready"));
