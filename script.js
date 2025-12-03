const API_URL = '/laptops';

async function obtenerLaptops() {
  const res = await fetch(API_URL);
  const laptops = await res.json();
  const tbody = document.getElementById('tabla-laptops');
  tbody.innerHTML = '';
  laptops.forEach(laptop => {
    tbody.innerHTML += `
      <tr>
        <td>${laptop.id}</td>
        <td>${laptop.brand}</td>
        <td>${laptop.name}</td>
        <td>${laptop.price}</td>
        <td>
          <button onclick="eliminarLaptop(${laptop.id})">Eliminar</button>
          <button onclick="editarLaptop(${laptop.id}, ${laptop.price})">Editar Precio</button>
        </td>
      </tr>
    `;
  });
}

async function agregarLaptop() {
  const laptop = {
    id: parseInt(document.getElementById('id').value),
    brand: document.getElementById('brand').value,
    name: document.getElementById('name').value,
    price: parseFloat(document.getElementById('price').value)
  };
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(laptop)
  });
  obtenerLaptops();
}

async function eliminarLaptop(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  obtenerLaptops();
}

async function editarLaptop(id, precioActual) {
  const nuevoPrecio = prompt('Nuevo precio:', precioActual);
  if (nuevoPrecio !== null) {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: parseFloat(nuevoPrecio) })
    });
    obtenerLaptops();
  }
}

// Cargar tabla al iniciar
obtenerLaptops();
