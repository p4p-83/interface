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

import lightSettings from './static-images/lightSettings.png'
import darkSettings from './static-images/darkSettings.png'

import targetPlotUnweightedDots from './static-images/targetPlotUnweightedDots.png'
import targetPlotUnweighted from './static-images/targetPlotUnweighted.png'
import targetPlotWeightedSimple from './static-images/targetPlotWeightedSimple.png'
import targetPlotWeightedDamping0 from './static-images/targetPlotWeightedDamping0.png'
import targetPlotWeightedDamping0p5 from './static-images/targetPlotWeightedDamping0p5.png'
import targetPlotWeightedDamping1p5 from './static-images/targetPlotWeightedDamping1p5.png'
import targetPlotWeightedDamping5 from './static-images/targetPlotWeightedDamping5.png'
import targetPlotWeightedDamping1000 from './static-images/targetPlotWeightedDamping1000.png'
import targetExampleUnweighted1 from './static-images/targetExampleUnweighted1.png'
import targetExampleUnweighted2 from './static-images/targetExampleUnweighted2.png'
import targetExampleWeightedSimple from './static-images/targetExampleWeightedSimple.png'
import targetExampleWeightedDamped1 from './static-images/targetExampleWeightedDamped1.png'
import targetExampleWeightedDamped2 from './static-images/targetExampleWeightedDamped2.png'
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

  SETTINGS: {
    PAGE: { light: lightSettings, dark: darkSettings },
  },

  NEAREST_TARGET: {
    PLOTS: {
      UNWEIGHTED_DOTS: targetPlotUnweightedDots,
      UNWEIGHTED: targetPlotUnweighted,
      WEIGHTED_SIMPLE: targetPlotWeightedSimple,
      WEIGHTED_DAMPING_0: targetPlotWeightedDamping0,
      WEIGHTED_DAMPING_0p5: targetPlotWeightedDamping0p5,
      WEIGHTED_DAMPING_1p5: targetPlotWeightedDamping1p5,
      WEIGHTED_DAMPING_5: targetPlotWeightedDamping5,
      WEIGHTED_DAMPING_1000: targetPlotWeightedDamping1000,
    },
    EXAMPLES: {
      UNWEIGHTED_1: targetExampleUnweighted1,
      UNWEIGHTED_2: targetExampleUnweighted2,
      WEIGHTED_SIMPLE: targetExampleWeightedSimple,
      WEIGHTED_DAMPED_1: targetExampleWeightedDamped1,
      WEIGHTED_DAMPED_2: targetExampleWeightedDamped2,
      WEIGHTED_UNREACHABLE: targetExampleWeightedUnreachable,
    },
  },

} as const