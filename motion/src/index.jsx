// Remotion Studio: `npm run studio` para ver y ajustar las escenas cuadro a cuadro.
import { Composition, registerRoot, staticFile } from "remotion";
import { HERO, HeroCiclo } from "./HeroCiclo.jsx";
import { PROCESO, ProcesoEscena } from "./ProcesoEscena.jsx";

const Root = () => (
  <>
    <Composition id="HeroCiclo" component={HeroCiclo} {...HERO} defaultProps={{ logoSrc: staticFile("logo-hd.webp") }} />
    <Composition id="ProcesoEscena" component={ProcesoEscena} {...PROCESO} />
  </>
);

registerRoot(Root);
