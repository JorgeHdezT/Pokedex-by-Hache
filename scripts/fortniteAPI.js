// Tu API key
const apiKey = 'a028e5ca50c4a1d1e74f2f5bc59d4a4fdf437db921b23c3cdfdca6a353bdd6e5';
        
// Endpoint de la API
const apiUrl = 'https://fortnite-api.com/v1/map';

// Función para obtener el mapa
async function obtenerMapa() {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': apiKey
            }
        });
        
        // Verifica si la respuesta es correcta
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`);
        }
        
        // Parsear la respuesta a JSON
        const data = await response.json();
        
        // Obtener la URL del mapa
        const mapaUrl = data.data.images.pois;
        
        // Mostrar el mapa en la página
        document.getElementById('fortnite-map').src = mapaUrl;
    } catch (error) {
        console.error('Error al obtener el mapa:', error);
    }
}

// Llama a la función para obtener el mapa cuando la página carga
obtenerMapa();


// Ver la tienda de fortnite

fetch('https://fortnite-api.com/v2/shop', {
  method: 'GET'
})
.then(response => response.json())
.then(data => {
  const items = data.data.entries.map(entry => {
      const imageUrl = entry.newDisplayAsset?.materialInstances?.[0]?.images?.OfferImage || 'https://via.placeholder.com/200';  // Imagen por defecto
      return {
          name: entry.devName,
          image: imageUrl,
          price: entry.finalPrice
      };
  });

  const shopItemsContainer = document.getElementById('shopItems');

  items.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'item';

      itemDiv.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p>Precio: ${item.price} V-Bucks</p>
      `;

      shopItemsContainer.appendChild(itemDiv);
  });
})
.catch(error => {
  console.error('Error al obtener los datos de la tienda:', error);
});

