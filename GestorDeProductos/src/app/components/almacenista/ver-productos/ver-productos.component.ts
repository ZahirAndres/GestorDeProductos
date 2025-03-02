import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/crear-productos.service';
import { Producto } from '../../../models/producto.model';

@Component({
  selector: 'app-ver-productos',
  templateUrl: './ver-productos.component.html',
  styleUrl: './ver-productos.component.css'
})
export class VerProductosComponent implements OnInit {
  productos: any[] = [];
  categories: string[] = ['Categoría 1', 'Categoría 2', 'Categoría 3']; // Reemplaza con las categorías que desees
  selectedCategory: string = '';
  isEditDialogOpen: boolean = false;
  isExistenciasDialogOpen: boolean = false
  currentProducto: Producto | any = {};
  cantidadSeleccionada: number = 0;
  productoExistencias: any = {};

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.loadProductos();
  }

  // Cargar los productos desde el backend
  loadProductos(): void {
    this.productoService.getProductos().subscribe(
      (data) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error cargando productos:', error);
      }
    );
  }

  // Filtrar productos por categoría
  filterByCategory(): void {
    this.productos = this.productos.filter(producto =>
      !this.selectedCategory || producto.categoria === this.selectedCategory
    );
  }

  // Abrir el cuadro de diálogo para editar el producto
  openEditDialog(producto: any): void {
    this.currentProducto = { ...producto }; // Copiar el producto para editarlo sin modificar el original
    this.isEditDialogOpen = true;
  }

  // Cerrar el cuadro de diálogo de edición
  closeEditDialog(): void {
    this.isEditDialogOpen = false;
  }

  // Actualizar el producto
  updateProducto(): void {
    this.productoService.updateProducto(this.currentProducto).subscribe(
      (updatedProduct) => {
        const index = this.productos.findIndex(prod => prod._id === updatedProduct._id);
        if (index !== -1) {
          this.productos[index] = updatedProduct; // Actualizar la lista de productos
        }
        this.closeEditDialog();
      },
      (error) => {
        console.error('Error actualizando producto:', error);
      }
    );
  }

  // Eliminar un producto
  deleteProducto(id: string): void {
    this.productoService.deteleteProducto(id).subscribe(
      () => {
        this.productos = this.productos.filter(producto => producto._id !== id);
      },
      (error) => {
        console.error('Error eliminando producto:', error);
      }
    );
  }

  // Abrir diálogo de existencias
  viewExistencias(id: string): void {
    console.log('ID recibido:', id); // Verifica que el ID llega correctamente
    const productoSeleccionado = this.productos.find(prod => prod._id === id);
  
    if (productoSeleccionado) {
      console.log('Producto seleccionado:', productoSeleccionado); 
      this.productoExistencias = { ...productoSeleccionado }; 
      this.isExistenciasDialogOpen = true; 
    } else {
      console.error('No se encontró el producto con ID:', id);
    }
  }

  // Cerrar diálogo de existencias
  closeExistenciasDialog(): void {
    this.isExistenciasDialogOpen = false;
  }

  actualizarStock(): void {
    if (this.productoExistencias.cantidadSeleccionada > 0) {
      this.productoExistencias.stockExhibe -= this.productoExistencias.cantidadSeleccionada;

      this.productoService.updateProducto(this.productoExistencias).subscribe(
        (updatedProduct) => {
          const index = this.productos.findIndex(prod => prod._id === updatedProduct._id);
          if (index !== -1) {
            this.productos[index] = updatedProduct; // Actualizar la lista de productos
          }
          this.closeExistenciasDialog();
        },
        (error) => {
          console.error('Error actualizando stock:', error);
        }
      );
    } else {
      alert('Ingresa una cantidad válida.');
    }
  }
}
