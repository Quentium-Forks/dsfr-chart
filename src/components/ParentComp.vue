<template>
  <h1>{{ title }}</h1>
  <div
    :id="id + '-chart'"
    :class="showChart ? '' : 'fr-hidden'"
  />
  <div
    :id="id + '-table'"
    :class="showChart ? 'fr-hidden' : ''"
  />

  <button
    class="fr-btn fr-btn--secondary"
    @click="showChart = !showChart"
  >
    {{ showChart ? 'Show Table' : 'Show Chart' }}
  </button>

  <button
    class="fr-btn fr-btn--tertiary fr-ml-2v"
    @click="downloadCSV('table')"
  >
    Download CSV
  </button>
  
  <button
    class="fr-btn fr-btn--tertiary fr-ml-2v"
    @click="screenshotChart"
  >
    Screenshot
  </button>
</template>

<script setup>

import { ref } from 'vue';
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const showChart = ref(true);

const downloadCSV = (mode) => {
  const dom = document.querySelector(`[databox-id="${props.id}"][databox-type="${mode}"]`);
  const x = JSON.parse(dom.getAttribute('x'));
  const y = JSON.parse(dom.getAttribute('y'));
  
  let csv = ['x,y'];
  if (mode === 'chart') {
    x.forEach((x, i) => csv.push(`\n${x},${y[i]}`));
  } else if (mode === 'table') {
    x.forEach((x, i) => csv.push(`\n${x},${y[0][i]}`));
  }

  const blob = new Blob(csv, { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.csv';
  a.click();
  window.URL.revokeObjectURL(url);
};

const screenshotChart = () => {
  const chart = document.getElementById(`${props.id}-chart`);
  const canvas = chart.querySelector('canvas');
  
  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/png');
  a.download = 'chart.png';
  a.click();
}
</script>
