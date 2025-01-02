<template>
  <h1>{{ title }}</h1>

  <div
    v-if="chartSources.length > 0"
    class="fr-select-group"
  >
    <label
      class="fr-label"
      for="select"
    >
      Choisir une source de données
    </label>

    <select
      id="select"
      v-model="currentSource"
      name="select"
      class="fr-select"
    >
      <option
        v-for="option in generateOptions(chartSources)"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>

  <div
    v-for="source in chartSources"
    :id="id + '-chart-' + source"
    :class="!showChart || currentSource !== source ? 'fr-hidden' : ''"
  />
  <div
    v-for="source in chartSources"
    :id="id + '-table-' + source"
    :class="showChart || currentSource !== source ? 'fr-hidden' : ''"
  />
  <div
    :id="id + '-table-default'"
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
    @click="screenshotChart()"
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
  defaultSource: {
    type: String,
    default: null,
  },
});

const showChart = ref(true);

const chartSources = ref([]);

chartSources.value = [...document.querySelectorAll(`[databox-id="${props.id}"][databox-type="chart"]`)].map((el) => el.getAttribute('databox-source'));

const currentSource = ref(props.defaultSource || chartSources.value[0]);

const generateOptions = (source) => {
  return source.map((option) => ({
    label: option.charAt(0).toUpperCase() + option.slice(1).replace(/-/g, ' '),
    value: option,
  }));
};

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

<style scoped>
.fr-select-group {
  max-width: 300px;
}
</style>
