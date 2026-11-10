import chroma from 'chroma-js';

import { COLOR_SETS } from '@/utils/constants.js';

const COLOR_SET_STORAGE_KEY = Symbol.for('@gouvfr/dsfr-chart/color-set');
globalThis[COLOR_SET_STORAGE_KEY] = globalThis[COLOR_SET_STORAGE_KEY] ?? 'charts';

export const getColorSet = () => COLOR_SETS[globalThis[COLOR_SET_STORAGE_KEY]] || COLOR_SETS.charts;

export const setColorSet = (colorSet) => {
  const colorSetName = typeof colorSet === 'string' ? colorSet : Object.keys(COLOR_SETS).find((name) => COLOR_SETS[name] === colorSet);
  if (!Object.hasOwn(COLOR_SETS, colorSetName)) {
    throw new TypeError(`Unknown color set: ${colorSet}. Available sets are: ${Object.keys(COLOR_SETS).join(', ')}`);
  }

  globalThis[COLOR_SET_STORAGE_KEY] = colorSetName;
  return COLOR_SETS[colorSetName];
};

export const getColorName = (colorValue) => {
  const colorSet = getColorSet();
  return Object.entries(colorSet.palette.light).find(([, value]) => value === colorValue)?.[0] ?? colorValue;
};

export const getColors = (count = 1, type = 'categorical', colors = [], highlight = [], highlightColor = null, theme = null) => {
  const colorSet = getColorSet();
  const themeColors = colorSet.themed ? colorSet.palette[theme || document.documentElement.getAttribute('data-fr-theme') || 'light'] : colorSet.palette.light;
  if (type === 'keys') {
    return Object.keys(themeColors);
  }
  const customColors = typeof colors === 'string' ? JSON.parse(colors) : colors;
  const validCustomColors = customColors.filter((color) => themeColors[color]);
  const highlightIndexes = typeof highlight === 'string' ? JSON.parse(highlight) : highlight;
  const validHighlightColor = themeColors[highlightColor] ?? (themeColors.caramel || themeColors.average);

  if (type === 'gradient') {
    if (validCustomColors.length === 0) {
      return {
        background: [chroma.scale([colorSet.gradient_start, colorSet.gradient_end]).colors(count)],
        hover: [
          chroma
            .scale([colorSet.gradient_start, colorSet.gradient_end])
            .colors(count)
            .map((color) => chroma(color).darken(0.8).hex()),
        ],
      };
    }
    return {
      background: [chroma.scale(validCustomColors.map((color) => themeColors[color])).colors(count)],
      hover: [
        chroma
          .scale(validCustomColors.map((color) => themeColors[color]))
          .colors(count)
          .map((color) => chroma(color).darken(0.8).hex()),
      ],
    };
  } else {
    if (type !== 'categorical') {
      console.warn(`Unknown color type: ${type}. Returning categorical colors.`);
    }
    if (validCustomColors.length === 0) {
      return {
        background: Object.values(themeColors).map((color) => color),
        hover: Object.values(themeColors).map((color) => chroma(color).darken(0.8).hex()),
      };
    }
    let backgroundColors = validCustomColors.map((color) => themeColors[color] || colorSet.default);
    let hoverColors = validCustomColors.map((color) => (themeColors[color] ? chroma(themeColors[color]).darken(0.8).hex() : chroma(colorSet.default).darken(0.8).hex()));
    if (highlightIndexes.length > 0) {
      for (let i = 0; i < count; i++) {
        if (highlightIndexes.includes(i)) {
          backgroundColors[i] = validHighlightColor;
          hoverColors[i] = chroma(validHighlightColor).darken(0.8).hex();
        } else {
          backgroundColors[i] = backgroundColors[0];
          hoverColors[i] = hoverColors[0];
        }
      }
      backgroundColors = [backgroundColors];
      hoverColors = [hoverColors];
    }

    return {
      background: backgroundColors,
      hover: hoverColors,
    };
  }
};
