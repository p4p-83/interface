import lightHome from './static-images/lightHome.png'
import lightHomeCalibrate from './static-images/lightHomeCalibrate.png'
import lightHomeShift from './static-images/lightHomeShift.png'
import darkHome from './static-images/darkHome.png'
import darkHomeCalibrate from './static-images/darkHomeCalibrate.png'
import darkHomeShift from './static-images/darkHomeShift.png'

import lightPlaceProgress from './static-images/lightPlaceProgress.png'
import lightPlaceError from './static-images/lightPlaceError.png'
import lightPlaceSocketOpened from './static-images/lightPlaceSocketOpened.png'
import lightPlaceHud from './static-images/lightPlaceHud.png'
import darkPlaceProgress from './static-images/darkPlaceProgress.png'
import darkPlaceError from './static-images/darkPlaceError.png'
import darkPlaceSocketOpened from './static-images/darkPlaceSocketOpened.png'
import darkPlaceHud from './static-images/darkPlaceHud.png'

import calibrationBottom from './static-images/calibrationBottom.png'
import calibrationTop from './static-images/calibrationTop.png'
import calibrationSchematic from './static-images/calibrationSchematic.png'

import lightSettings from './static-images/lightSettings.png'
import darkSettings from './static-images/darkSettings.png'

import lightArchitectureBlockDiagram from './static-images/lightArchitectureBlockDiagram.png'
import lightArchitecture from './static-images/lightArchitecture.png'
import darkArchitectureBlockDiagram from './static-images/darkArchitectureBlockDiagram.png'
import darkArchitecture from './static-images/darkArchitecture.png'

import headUp from './static-images/headUp.png'
import headDown from './static-images/headDown.png'

import centroidRaw from './static-images/centroidRaw.jpg'
import centroidKeyed from './static-images/centroidKeyed.png'
import centroidMasked from './static-images/centroidMasked.png'
import centroidFinal from './static-images/centroidFinal.png'

import componentAligning from './static-images/componentAligning.png'
import componentPlaced from './static-images/componentPlaced.png'

import targetPlotUnweightedDots from './static-images/targetPlotUnweightedDots.png'
import targetPlotUnweighted from './static-images/targetPlotUnweighted.png'
import targetPlotWeightedSimple from './static-images/targetPlotWeightedSimple.png'
import targetPlotWeightedNonLinear1u from './static-images/targetPlotWeightedNonLinear1u.png'
import targetPlotWeightedNonLinear0p25 from './static-images/targetPlotWeightedNonLinear0p25.png'
import targetPlotWeightedNonLinear0p5 from './static-images/targetPlotWeightedNonLinear0p5.png'
import targetPlotWeightedNonLinear1 from './static-images/targetPlotWeightedNonLinear1.png'
import targetPlotWeightedNonLinear2 from './static-images/targetPlotWeightedNonLinear2.png'
import targetPlotWeightedNonLinear1M from './static-images/targetPlotWeightedNonLinear1M.png'
import targetExampleUnweighted1 from './static-images/targetExampleUnweighted1.png'
import targetExampleUnweighted2 from './static-images/targetExampleUnweighted2.png'
import targetExampleWeightedSimple from './static-images/targetExampleWeightedSimple.png'
import targetExampleWeightedNonLinear1 from './static-images/targetExampleWeightedNonLinear1.png'
import targetExampleWeightedNonLinear2 from './static-images/targetExampleWeightedNonLinear2.png'
import targetExampleWeightedUnreachable from './static-images/targetExampleWeightedUnreachable.png'

export const STATIC_IMAGES = {

  HOME: {
    PAGE: { light: lightHome, dark: darkHome },
    CALIBRATE: { light: lightHomeCalibrate, dark: darkHomeCalibrate },
    SHIFT: { light: lightHomeShift, dark: darkHomeShift },
  },

  PLACE: {
    PROGRESS: { light: lightPlaceProgress, dark: darkPlaceProgress },
    ERROR: { light: lightPlaceError, dark: darkPlaceError },
    SOCKET: { light: lightPlaceSocketOpened, dark: darkPlaceSocketOpened },
    HUD: { light: lightPlaceHud, dark: darkPlaceHud },
  },

  CALIBRATE: {
    BOTTOM: calibrationBottom,
    TOP: calibrationTop,
    SCHEMATIC: calibrationSchematic,
  },

  SETTINGS: {
    PAGE: { light: lightSettings, dark: darkSettings },
  },

  ARCHITECTURE: {
    BLOCK_DIAGRAM: { light: lightArchitectureBlockDiagram, dark: darkArchitectureBlockDiagram },
    DIAGRAM: { light: lightArchitecture, dark: darkArchitecture },
  },

  HEAD: {
    UP: headUp,
    DOWN: headDown,
  },

  CENTROID: {
    RAW: centroidRaw,
    KEYED: centroidKeyed,
    MASKED: centroidMasked,
    FINAL: centroidFinal,
  },

  COMPOSITE: {
    ALIGNING: componentAligning,
  },

  NEAREST_TARGET: {
    PLOTS: {
      UNWEIGHTED_DOTS: targetPlotUnweightedDots,
      UNWEIGHTED: targetPlotUnweighted,
      WEIGHTED_SIMPLE: targetPlotWeightedSimple,
      WEIGHTED_NON_LINEAR_1u: targetPlotWeightedNonLinear1u,
      WEIGHTED_NON_LINEAR_0p25: targetPlotWeightedNonLinear0p25,
      WEIGHTED_NON_LINEAR_0p5: targetPlotWeightedNonLinear0p5,
      WEIGHTED_NON_LINEAR_1: targetPlotWeightedNonLinear1,
      WEIGHTED_NON_LINEAR_2: targetPlotWeightedNonLinear2,
      WEIGHTED_NON_LINEAR_1M: targetPlotWeightedNonLinear1M,
    },
    EXAMPLES: {
      UNWEIGHTED_1: targetExampleUnweighted1,
      UNWEIGHTED_2: targetExampleUnweighted2,
      WEIGHTED_SIMPLE: targetExampleWeightedSimple,
      WEIGHTED_NON_LINEAR_1: targetExampleWeightedNonLinear1,
      WEIGHTED_NON_LINEAR_2: targetExampleWeightedNonLinear2,
      WEIGHTED_UNREACHABLE: targetExampleWeightedUnreachable,
    },
  },

  HUD: {
    PLACED: componentPlaced,
  },

} as const