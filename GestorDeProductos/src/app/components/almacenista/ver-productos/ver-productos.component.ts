import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/crear-productos.service';
import { Producto } from '../../../models/producto.model';
import { CatalogosService } from '../../../services/formularios/catalogos.service';

@Component({
  selector: 'app-ver-productos',
  templateUrl: './ver-productos.component.html',
  styleUrls: ['./ver-productos.component.css']
})
export class VerProductosComponent implements OnInit {
  productos: any[] = [];
  productosFiltrados: Producto[] = [];
  categories: string[] = ['Categoría 1', 'Categoría 2', 'Categoría 3'];
  selectedCategory: string = '';
  isEditDialogOpen: boolean = false;
  isExistenciasDialogOpen: boolean = false;
  isAddDialogOpen: boolean = false;
  currentProducto: Producto = this.initProducto();
  newProducto: Producto = this.initProducto();
  cantidadSeleccionada: number = 0;
  productoExistencias: any = {
    codigoBarras: '',
    nombreProducto: '',
    stockNuevo: 0
  };
  proveedorInput: string = '';

  mensaje: string = '';
  categorias: string[] = [];
  marcas: string[] = [];
  proveedores: string[] = [];
  tamanios: string[] = [];

  constructor(private productoService: ProductoService, private catalogosService: CatalogosService) { }

  ngOnInit(): void {
    this.loadProductos();
    this.loadCatalogos();
  }

  private initProducto(): Producto {
    return {
      _id: '',
      codigoBarras: '',
      nombreProducto: '',
      tamano: '',
      marca: '',
      imagenUrl: '',
      categoria: '',
      precioPieza: 0,
      precioCaja: 0,
      cantidadPiezasPorCaja: 0,
      proveedor: [],
      stockExhibe: 0,
      existenciaExhibida: 0,
      stockAlmacen: 0,
      cantidadAlmacen: 0
    };
  }

  loadProductos(): void {
    this.productoService.getProductos().subscribe(
      (data) => {
        this.productos = data;
        this.productosFiltrados = [...this.productos];
        console.log("Productos cargados:", this.productos); // <-- Agregar este log
      },
      (error) => {
        console.error("Error cargando productos:", error);
      }
    );
  }


  filterByCategory(): void {
    this.productosFiltrados = this.selectedCategory ?
      this.productos.filter(producto => producto.categoria === this.selectedCategory) :
      [...this.productos];
  }

  openEditDialog(producto: Producto): void {
    this.currentProducto = { ...producto };
    this.isEditDialogOpen = true;
  }

  closeEditDialog(): void {
    this.isEditDialogOpen = false;
  }

  updateProducto(): void {
    this.productoService.updateProducto(this.currentProducto).subscribe(
      (updatedProduct) => {
        const index = this.productos.findIndex(prod => prod._id === updatedProduct._id);
        if (index !== -1) {
          this.productos[index] = updatedProduct;
          this.filterByCategory();
        }
        this.closeEditDialog();
      },
      (error) => {
        console.error('Error actualizando producto:', error);
      }
    );
  }

  deleteProducto(id: string): void {
    console.log("ID recibido para borrar:", id);
    if (!id) {
      console.error('ID del producto no válido');
      return;
    }

    this.productoService.deleteProducto(id).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        alert('Producto borrado con éxito');
        window.location.reload();
      },
      (error) => {
        console.error('Error al borrar producto:', error);
      }
    );
  }

  openExistenciasDialog(producto: any) {
    console.log('Producto seleccionado para actualizar existencias:', producto);
    this.productoExistencias = { ...producto, stockNuevo: producto.stockTotal };
    this.isExistenciasDialogOpen = true;
  }


  closeExistenciasDialog(): void {
    this.isExistenciasDialogOpen = false;
  }

  actualizarStock(): void {
    if (this.cantidadSeleccionada <= 0) {
      alert('Ingresa una cantidad válida.');
      return;
    }

    if (this.productoExistencias.stockExhibe < this.cantidadSeleccionada) {
      alert('No puedes reducir más de lo que hay en stock.');
      return;
    }

    this.productoExistencias.stockExhibe -= this.cantidadSeleccionada;

    this.productoService.updateProducto(this.productoExistencias).subscribe(
      (updatedProduct) => {
        const index = this.productos.findIndex(prod => prod._id === updatedProduct._id);
        if (index !== -1) {
          this.productos[index] = updatedProduct;
          this.filterByCategory();
        }
        this.closeExistenciasDialog();
      },
      (error) => {
        console.error('Error actualizando stock:', error);
      }
    );
  }

  openAddDialog(): void {
    this.newProducto = this.initProducto();
    this.isAddDialogOpen = true;
  }

  closeAddDialog(): void {
    this.isAddDialogOpen = false;
  }

  addProducto(): void {
    console.log(this.newProducto);
    if (!this.newProducto.nombreProducto || !this.newProducto.categoria || this.newProducto.precioPieza <= 0) {
      this.mensaje = 'Por favor, llena los campos obligatorios correctamente.';
      return;
    }

    this.productoService.createProducto(this.newProducto).subscribe(
      (createdProduct) => {
        this.productos.push(createdProduct);
        this.filterByCategory();
        this.mensaje = 'Producto creado exitosamente.';
        this.closeAddDialog();
      },
      (error) => {
        console.error('Error agregando producto:', error);
        this.mensaje = 'Hubo un error al crear el producto.';
      }
    );
  }

  agregarProveedor(): void {
    if (this.proveedorInput && this.proveedorInput.trim()) {
      this.newProducto.proveedor.push(this.proveedorInput.trim());
      this.proveedorInput = '';  // Limpiar el campo después de agregar
    }
  }


  // Eliminar un proveedor del nuevo producto
  eliminarProveedor(index: number): void {
    this.newProducto.proveedor.splice(index, 1);
  }

  loadCatalogos(): void {
    this.catalogosService.getCategorias().subscribe(data => this.categorias = data.map(c => c.nombreCategoria));
    this.catalogosService.getMarcas().subscribe(data => this.marcas = data.map(m => m.nombreMarca));
    this.catalogosService.getProveedores().subscribe(data => this.proveedores = data.map(p => p.nombreProveedor));
    this.catalogosService.getTamanios().subscribe(data => this.tamanios = data.map(t => t.nombreTamanio));
  }


  actualizarProveedoresEdit(event: Event): void {
    const selectedOptions = (event.target as HTMLSelectElement).selectedOptions;
    const valoresSeleccionados = Array.from(selectedOptions).map(option => option.value);

    // Solo agregar nuevos proveedores si no están ya en la lista
    valoresSeleccionados.forEach(proveedor => {
        if (!this.currentProducto.proveedor.includes(proveedor)) {
            this.currentProducto.proveedor.push(proveedor);
        }
    });

    // Quitar proveedores que fueron deseleccionados
    this.currentProducto.proveedor = this.currentProducto.proveedor.filter(proveedor =>
        valoresSeleccionados.includes(proveedor)
    );
}

eliminarProveedorEdit(index: number): void {
  this.currentProducto.proveedor.splice(index, 1);
}

}