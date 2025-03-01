import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './components/productos/productos.component';
import { CrearProductosComponent } from './components/crear-productos/crear-productos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CrearUsuariosComponent } from './components/crear-usuarios/crear-usuarios.component';
import { AbastecimientoComponent } from './components/ayudante-pasillo/abastecimiento/abastecimiento.component';
import { VerLotesComponent } from './components/almacenista/ver-lotes/ver-lotes.component';
import { VerProductosComponent } from './components/almacenista/ver-productos/ver-productos.component';
import { VerProductosClienteComponent } from './components/cliente/ver-productos-cliente/ver-productos-cliente.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/ayudante-pasillo/abastecimiento-estantes/ver', 
    pathMatch: 'full'
  },
  //Organizar las rutas de los productos
  // Rutas para Productos
  {
    path: 'productos',
    children: [
      { path: 'ver', component: ProductosComponent },           // Ruta para ver productos
      { path: 'crear', component: CrearProductosComponent }     // Ruta para crear productos
    ]
  },

  // Rutas para Clientes
  {
    path: 'usuarios',
    children: [
      { path: 'ver', component: UsuariosComponent },            // Ruta para ver usuarios
      { path: 'crear', component: CrearUsuariosComponent }      // Ruta para crear usuarios
    ]
  },

  //Rutas del ayudante de pasillo
  {
    path: 'ayudante-pasillo',
    children: [
      {
        path: 'abastecimiento-estantes',
        children: [
          { path: 'ver', component: AbastecimientoComponent }]
      },
    ]
  },


  //rutas del alamcenista

  {
    path: 'almacenista',
    children: [
      {
        path: 'lotes',
        children: [
          { path: 'ver', component: VerLotesComponent }] // Ruta para ver proveedores
      },
      {
        path: 'productos',
        children: [ 
          { path: 'ver', component: VerProductosComponent}
        ]
      }
    
    ]
      
  },

  //rutas cliente
{
  path: 'cliente',
  children: [
    { path: 'ver-productos', component: VerProductosClienteComponent },           // Ruta para ver productos
  ]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
