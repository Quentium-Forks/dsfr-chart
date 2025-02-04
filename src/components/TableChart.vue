<template>
  <Teleport
    :disabled="!databoxId && !databoxType && databoxSource === 'global'"
    :to="'#' + databoxId + '-' + databoxType + '-' + databoxSource"
  >
    <div
      :ref="widgetId"
      class="widget_container"
    >
      <div
        :ref="tableId"
        class="fr-table"
        :style="{ maxHeight: '25rem', overflow: 'auto' }"
      >
        <div class="fr-table__wrapper">
          <div class="fr-table__container">
            <div class="fr-table__content">
              <table>
                <caption>
                  {{ tableName }}
                </caption>
                <thead>
                  <tr>
                    <th scope="col">
                      {{ tableName }}
                    </th>
                    <th
                      v-for="(item, index) in nameParse"
                      :key="index"
                      scope="col"
                    >
                      {{ item }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(rowItem, rowIndex) in xparse"
                    :key="rowIndex"
                  >
                    <td :class="getClass(rowItem)">
                      {{ rowItem }}
                    </td>
                    <td
                      v-for="(colItem, colIndex) in yparse"
                      :key="colIndex"
                      :class="getClass(colItem[rowIndex])"
                    >
                      {{ convertIntToHumanTable(colItem[rowIndex]) }}
                    </td>
                  </tr>
                  <tr
                    v-for="(rowItem, rowIndex) in lineParse"
                    :key="rowIndex"
                  >
                    <!-- eslint-disable vue/no-v-html -->
                    <td
                      v-for="(cellItem, cellIndex) in rowItem"
                      :key="cellIndex"
                      :class="getClass(cellItem)"
                      v-html="cellItem"
                    />
                    <!-- eslint-enable vue/no-v-html -->
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import { mixin } from '@/utils/global.js';

export default {
  name: 'TableChart',
  mixins: [mixin],
  props: {
    databoxId: {
      type: String,
      default: null,
    },
    databoxType: {
      type: String,
      default: null,
    },
    databoxSource: {
      type: String,
      default: 'global',
    },
    x: {
      type: String,
      default: undefined,
    },
    y: {
      type: String,
      default: undefined,
    },
    line: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      default: undefined,
    },
    tableName: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      widgetId: '',
      tableId: '',
      xparse: [],
      yparse: [],
      lineParse: [],
      nameParse: [],
    };
  },
  created() {
    this.widgetId = 'widget' + Math.floor(Math.random() * 1000);
    this.tableId = 'table' + Math.floor(Math.random() * 1000);
  },
  mounted() {
    this.resetData();
    this.getData();
  },
  methods: {
    resetData() {
      this.xparse = [];
      this.yparse = [];
      this.lineParse = [];
      this.nameParse = [];
    },
    getData() {
      // Parsing des données
      try {
        this.xparse = JSON.parse(this.x ?? '[]');
        this.yparse = JSON.parse(this.y ?? '[]');
      } catch (error) {
        console.error('Erreur lors du parsing des données x ou y:', error);
        return;
      }

      try {
        this.lineParse = JSON.parse(this.line ?? '[]');
      } catch (error) {
        console.error('Erreur lors du parsing des données line:', error);
        return;
      }

      let tmpNameParse = [];
      if (this.name !== undefined) {
        try {
          tmpNameParse = JSON.parse(this.name);
        } catch (error) {
          console.error('Erreur lors du parsing de name:', error);
        }
      }

      for (let i = 0; i < this.yparse.length; i++) {
        if (tmpNameParse[i] !== undefined) {
          this.nameParse.push(tmpNameParse[i]);
        } else {
          this.nameParse.push('Série ' + (i + 1));
        }
      }
    },
    getClass(value) {
      return typeof value === 'number' ? 'text-right' : 'text-left';
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/TableChart.scss';
</style>
