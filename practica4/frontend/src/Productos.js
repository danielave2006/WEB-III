import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [productoEdicion, setProductoEdicion] = useState(null);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = () => {
    axios.get('http://localhost:3001/api/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error(err));
  };

  const agregarProducto = () => {
    if (nombre.trim() === '' || precio === '') {
      alert('Completa todos los campos.');
      return;
    }
    axios.post('http://localhost:3001/api/productos', { nombre, precio })
      .then(() => {
        setNombre('');
        setPrecio('');
        obtenerProductos();
        // Mostrar mensaje de éxito con SweetAlert2
        Swal.fire('¡Producto Agregado!', 'El producto se agregó correctamente.', 'success');
      })
      .catch(err => console.error(err));
  };

  const actualizarProducto = () => {
    if (nombre.trim() === '' || precio === '') {
      alert('Completa todos los campos.');
      return;
    }
    axios.put(`http://localhost:3001/api/productos/${productoEdicion.id}`, { nombre, precio })
      .then(() => {
        Swal.fire('Actualizado!', 'El producto se actualizó correctamente.', 'success');
        setProductoEdicion(null);
        setNombre('');
        setPrecio('');
        obtenerProductos();
      })
      .catch(err => {
        console.error(err);
        Swal.fire('Error!', 'Hubo un problema al actualizar el producto.', 'error');
      });
  };

  const seleccionarProducto = (producto) => {
    setProductoEdicion(producto);
    setNombre(producto.nombre);
    setPrecio(producto.precio);
  };

  const eliminarProducto = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Este producto será eliminado permanentemente.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3001/api/productos/${id}`)
          .then(() => {
            Swal.fire('Eliminado!', 'El producto ha sido eliminado.', 'success');
            obtenerProductos();
          })
          .catch(err => {
            console.error(err);
            Swal.fire('Error!', 'Hubo un problema al eliminar el producto.', 'error');
          });
      } else {
        Swal.fire('Cancelado', 'El producto no se eliminó.', 'info');
      }
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Lista de Productos</h1>

      {/* Formulario */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        justifyContent: 'center',
        marginBottom: '20px'
      }}>
        <input
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          placeholder="Nombre"
          style={{ padding: '10px', flex: '1 1 200px', minWidth: '150px' }}
        />
        <input
          type="number"
          value={precio}
          onChange={e => setPrecio(e.target.value)}
          placeholder="Precio"
          style={{ padding: '10px', flex: '1 1 200px', minWidth: '150px' }}
        />
        {productoEdicion ? (
          <button
            onClick={actualizarProducto}
            style={{
              backgroundColor: '#FF9800', // Color naranja para actualizar
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Actualizar Producto
          </button>
        ) : (
          <button
            onClick={agregarProducto}
            style={{
              backgroundColor: '#4CAF50', // Color verde para agregar
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Agregar Producto
          </button>
        )}
      </div>

      {/* Tabla */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          minWidth: '600px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nombre</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Precio</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{p.id}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{p.nombre}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>Bs. {parseFloat(p.precio).toFixed(2)}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                  <FaEdit
                    onClick={() => seleccionarProducto(p)}
                    style={{
                      color: '#03A9F4', // Color azul para editar
                      cursor: 'pointer',
                      marginRight: '15px',
                      fontSize: '20px'
                    }}
                    title="Editar"
                  />
                  <FaTrash
                    onClick={() => eliminarProducto(p.id)}
                    style={{
                      color: '#F44336', // Color rojo para eliminar
                      cursor: 'pointer',
                      fontSize: '20px'
                    }}
                    title="Eliminar"
                  />
                </td>
              </tr>
            ))}
            {productos.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                  No hay productos disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Productos;
