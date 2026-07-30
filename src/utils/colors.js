import chroma from 'chroma-js';
import { COLOR_SET } from '@/utils/constants.js';

export const getColorName = (colorValue) => Object.entries(COLOR_SET.palette.light).find(([, value]) => value === colorValue)?.[0] ?? colorValue;

export const getColors = (count = 1, type = 'categorical', colors = [], highlight = [], highlightColor = null, theme = null) => {
  const themeColors = COLOR_SET.themed ? COLOR_SET.palette[theme || document.documentElement.getAttribute('data-fr-theme') || 'light'] : COLOR_SET.palette.light;
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
        background: [chroma.scale([COLOR_SET.gradient_start, COLOR_SET.gradient_end]).colors(count)],
        hover: [
          chroma
            .scale([COLOR_SET.gradient_start, COLOR_SET.gradient_end])
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
    let backgroundColors = validCustomColors.map((color) => themeColors[color] || COLOR_SET.default);
    let hoverColors = validCustomColors.map((color) => (themeColors[color] ? chroma(themeColors[color]).darken(0.8).hex() : chroma(COLOR_SET.default).darken(0.8).hex()));
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
