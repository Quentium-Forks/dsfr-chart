import chroma from 'chroma-js';
import { COLORS_DSFR_V2 } from '@/utils/constants';

export const getColors = (count = 1, type = 'default', colors = [], theme = null) => {
  const themeColors = COLORS_DSFR_V2[theme || document.documentElement.getAttribute('data-fr-theme') || 'light'];
  if (type === 'unicolor') {
    if (colors.length === 0) {
      return {
        background: [themeColors.saphir.bg],
        hover: [chroma(themeColors.saphir.bg).darken(0.8).hex()],
      };
    } else {
      return {
        background: [themeColors[colors[0]] ? themeColors[colors[0]].bg : themeColors.saphir.bg],
        hover: [
          chroma(themeColors[colors[0]] ? themeColors[colors[0]].bg : themeColors.saphir.bg)
            .darken(0.8)
            .hex(),
        ],
      };
    }
  } else if (type === 'gradient') {
    if (colors.length === 0) {
      return {
        background: [chroma.scale([themeColors.lagon.bg, themeColors.saphir.bg]).colors(count)],
        hover: [
          chroma
            .scale([themeColors.lagon.bg, themeColors.saphir.bg])
            .colors(count)
            .map((color) => chroma(color).darken(0.8).hex()),
        ],
      };
    } else {
      const validColors = colors.filter((color) => themeColors[color]);
      return {
        background: [chroma.scale(validColors.map((color) => themeColors[color].bg)).colors(count)],
        hover: [
          chroma
            .scale(validColors.map((color) => themeColors[color].bg))
            .colors(count)
            .map((color) => chroma(color).darken(0.8).hex()),
        ],
      };
    }
  } else {
    if (type !== 'default') {
      console.warn(`Unknown color type: ${type}. Returning default colors.`);
    }
    if (colors.length === 0) {
      return {
        background: Object.values(themeColors).map((color) => color.bg),
        hover: Object.values(themeColors).map((color) => chroma(color.bg).darken(0.8).hex()),
      };
    } else {
      return {
        background: colors.map((color) => (themeColors[color] ? themeColors[color].bg : themeColors.saphir.bg)),
        hover: colors.map((color) => (themeColors[color] ? chroma(themeColors[color].bg).darken(0.8).hex() : chroma(themeColors.saphir.bg).darken(0.8).hex())),
      };
    }
  }
};
