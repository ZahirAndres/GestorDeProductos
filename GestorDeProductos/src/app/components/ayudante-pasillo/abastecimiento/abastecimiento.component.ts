import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/crear-productos.service';
import { Router } from '@angular/router';
import { Producto } from '../../../models/producto.model';
import { NgForm } from '@angular/forms';
import { CategoriasService } from '../../../services/categorias.service';
import { Categoria } from '../../../models/categoria.model';

@Component({
  selector: 'app-abastecimiento',
  templateUrl: './abastecimiento.component.html',
  styleUrls: ['./abastecimiento.component.css']
})
export class AbastecimientoComponent implements OnInit {
  productos: Producto[] = []; // Lista de productos
  categorias: Categoria[] = []; // Lista de categorias

  constructor(private productoService: ProductoService, 
    private router: Router, 
    private categoriaService: CategoriasService) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCategorias();  
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe(
      (response: Producto[]) => {
        console.log('Productos:', response);
        this.productos = response.map(producto => ({ ...producto, mostrarFormulario: false, cantidadAgregada: 0 }));
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe(
      (response: Categoria[]) => {
        console.log("Respuesta de la API:", response); // ✅ Verificar la respuesta
        this.categorias = response;
      },
      error => {
        console.error("Error al cargar categorías:", error);
      }
    );
  }
  

  actualizarCantidad(form: NgForm, producto: Producto): void {
    if (form.valid) {
      if(producto.cantidadAgregada){
      producto.existenciaExhibida += producto.cantidadAgregada; 
      this.productoService.updateProducto(producto).subscribe(
        (response) => {
          console.log('Producto actualizado:', response);
          producto.cantidadAgregada = 0;
          form.resetForm();
          producto.mostrarFormulario = false;  
        },
        (error) => {
          console.error('Error al actualizar producto:', error);
        }
      );
    } else {
      console.warn("El formulario no es válido");
    }
  }
  }

  toggleFormulario(producto: Producto): void {
    this.productos.forEach(p => {
      if (p.mostrarFormulario !== producto.mostrarFormulario) {
        p.mostrarFormulario = false;
      }
    });
    producto.mostrarFormulario = !producto.mostrarFormulario;
  }
}
