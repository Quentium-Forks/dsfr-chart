import { html } from 'lit';

const meta = {
  component: 'data-box',
  subcomponents: {
    PieChart: 'pie-chart',
  }
};

export default meta;

export const Default = {
  args: {
    id: 'def',
    title: 'Statut des emplois en France en 2018',
    tooltipTitle: 'Statut des emplois en France',
    tooltipContent: "Pour l'année 2018. France hors Mayotte, population des ménages, personnes en emploi.",
    source: 'Insee, enquête Emploi',
    date: '04/11/2024',
    trend: '-15%',
    segmentedControl: true,
    screenshot: true,
    download: true,
    fullscreen: true,
    modalTitle: 'Titre de la modale',
    modalContent: 'Contenu de la modale'
  },
  render: (args) => html`
    <data-box
      id="${args.id}"
      ${Object.entries(args).map(([k, v]) => `${k}="${v}"`).join(' ')}>
    </data-box>
    <pie-chart
      databox-id="${args.id}"
      databox-type="chart"
      x='[["Non-salariés", "Emplois à durée indéterminée", "Contrats à durée déterminée", "Apprentis", "Intérimaires"]]'
      y="[[11.7, 74.8, 9.3, 1.6, 2.6]]"
      name='["Non-salariés", "Emplois à durée indéterminée", "Contrats à durée déterminée", "Apprentis", "Intérimaires"]'
      unit-tooltip="%">
    </pie-chart>
    <table-chart
      databox-id="def"
      databox-type="table"
      x='["Non-salariés", "Emplois à durée indéterminée", "Contrats à durée déterminée", "Apprentis", "Intérimaires"]'
      y="[[11.7, 74.8, 9.3, 1.6, 2.6]]"
      table-name="Nomenclature"
      name='["Non-salariés", "Emplois à durée indéterminée", "Contrats à durée déterminée", "Apprentis", "Intérimaires"]'>
    </table-chart>
  `
};

console.log(Object.entries(Default.args).map(([k, v]) => `${k}="${v}"`).join(' '));
