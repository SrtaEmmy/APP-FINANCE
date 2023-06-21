// chart.js

// Incluir la referencia a Chart.js antes de este código

// Obtener los datos del gráfico desde el elemento con id 'chartData' en el HTML
const chartData = JSON.parse(document.getElementById('chartData').textContent);

// Obtener el contexto del lienzo del gráfico
const ctx = document.getElementById('myChart').getContext('2d');

// Crear el gráfico utilizando los datos
new Chart(ctx, {
  type: 'line',
  data: {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Total',
        data: chartData.data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});
