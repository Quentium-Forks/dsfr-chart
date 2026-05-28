import chroma from 'chroma-js';
import { COLORS_DSFR_V2, COLORS_CHARTS } from '@/utils/constants';

export const getColorNames = (theme = null) => {
  const themeColors = COLORS_DSFR_V2[theme || document.documentElement.getAttribute('data-fr-theme') || 'light'];
  return Object.keys(themeColors);
};

export const getColors = (count = 1, type = 'categorical', colors = [], theme = null) => {
  const themeColors = COLORS_DSFR_V2[theme || document.documentElement.getAttribute('data-fr-theme') || 'light'];
  const customColors = typeof colors === 'string' ? JSON.parse(colors) : colors;
  const validCustomColors = customColors.filter((color) => themeColors[color]);
  if (type === 'gradient') {
    if (validCustomColors.length === 0) {
      return {
        background: [chroma.scale([themeColors.saphir.bg, themeColors.lagon.bg]).colors(count)],
        hover: [
          chroma
            .scale([themeColors.saphir.bg, themeColors.lagon.bg])
            .colors(count)
            .map((color) => chroma(color).darken(0.8).hex()),
        ],
      };
    } else {
      return {
        background: [chroma.scale(validCustomColors.map((color) => themeColors[color].bg)).colors(count)],
        hover: [
          chroma
            .scale(validCustomColors.map((color) => themeColors[color].bg))
            .colors(count)
            .map((color) => chroma(color).darken(0.8).hex()),
        ],
      };
    }
  } else {
    if (type !== 'categorical') {
      console.warn(`Unknown color type: ${type}. Returning categorical colors.`);
    }
    if (validCustomColors.length === 0) {
      return {
        background: Object.values(themeColors).map((color) => color.bg),
        hover: Object.values(themeColors).map((color) => chroma(color.bg).darken(0.8).hex()),
      };
    } else {
      return {
        background: validCustomColors.map((color) => (themeColors[color] ? themeColors[color].bg : themeColors.saphir.bg)),
        hover: validCustomColors.map((color) => (themeColors[color] ? chroma(themeColors[color].bg).darken(0.8).hex() : chroma(themeColors.saphir.bg).darken(0.8).hex())),
      };
    }
  }
};
