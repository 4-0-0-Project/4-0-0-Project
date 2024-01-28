import { getPokemon } from "./main";

export const charts = () => {
    const parentElement = document.getElementById('myChart');
    parentElement.innerHTML = '';

    const canvas = document.createElement('canvas');
    canvas.classList.add('chart-item')
    parentElement.appendChild(canvas);

    const movies = getMovies();
    const titles = movies.map((movie) => movie.title);
    const domestic = movies.map((movie) => movie.domestic)
    
    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: titles,
        datasets: [{
          label: 'Domestic Gross',
          data: domestic,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  
  };