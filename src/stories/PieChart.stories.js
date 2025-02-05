const meta = {
  component: 'pie-chart'
};

export default meta;

export const Default = {
  args: {
    x: '[["Emplois à durée indéterminée", "Non-salariés", "Contrats à durée déterminée", "Apprentis", "Intérimaires"]]',
    y: '[[74.8, 11.7, 9.3, 1.6, 2.6]]',
    name: '["Emplois à durée indéterminée", "Non-salariés", "Contrats à durée déterminée", "Apprentis", "Intérimaires"]',
    unitTooltip: '%'
  }
};

export const Fill = {
  args: {
    x: '[["Protection sociale", "Santé", "Affaires économiques", "Services publics généraux", "Autres", "Enseignement", "Défense"]]',
    y: '[[40.8, 15.6, 11.5, 10.6, 9.4, 9, 3.1]]',
    name: '["Protection sociale", "Santé", "Affaires économiques", "Services publics généraux", "Autres", "Enseignement", "Défense"]',
    fill: true,
    unitTooltip: '%'
  }
};
