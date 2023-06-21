console.log('working');

// Función para actualizar la expresión facial y el texto según los datos del gráfico
function updateExpression(chartData) {
    const face = document.querySelector('.face');
    const mouth = document.querySelector('.mouth');
    const financialHealthText = document.getElementById('financialHealth');
  
    const data = chartData.data;
    const lastDataValue = data[data.length - 1];
  
    face.classList.remove('happy', 'sad');
    mouth.classList.remove('straight', 'down'); // Removemos la clase 'down'
    if (lastDataValue===undefined) {
        face.classList.remove('happy');
        mouth.classList.add('straight'); 
        financialHealthText.textContent = 'Salud financiera: 0';
    }
    if (lastDataValue >= 80) {
      face.classList.add('happy');
      financialHealthText.textContent = 'Salud financiera: Buena';
    } else if (lastDataValue >= 30) {
      face.classList.remove('happy');
      mouth.classList.add('straight'); // Agregamos la clase 'straight'
      financialHealthText.textContent = 'Salud financiera: Regular';
    } else if(lastDataValue != undefined){
      face.classList.add('sad');
      mouth.classList.add('down'); // Agregamos la clase 'down' para boca hacia abajo
      financialHealthText.textContent = 'Salud financiera: Mala';
    }
  }
  
