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
  currentProducto: any = {};

  constructor(private productoService: ProductoService) {}

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

  // Ver existencias (opcional, según la funcionalidad)
  viewExistencias(id: string): void {
    // Puedes agregar aquí la lógica para mostrar existencias
    console.log('Ver existencias del producto', id);
  }
}
