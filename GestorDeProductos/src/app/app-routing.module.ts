import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './components/productos/productos.component';
import { CrearProductosComponent } from './components/crear-productos/crear-productos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CrearUsuariosComponent } from './components/crear-usuarios/crear-usuarios.component';
import { AbastecimientoComponent } from './components/ayudante-pasillo/abastecimiento/abastecimiento.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/abastecimiento-estantes',
    pathMatch: 'full'
  },

  // Rutas para Productos
  {
    path: 'productos',
    children: [
      { path: 'ver', component: ProductosComponent },           // Ruta para ver productos
      { path: 'crear', component: CrearProductosComponent }     // Ruta para crear productos
    ]
  },

  // Rutas para Usuarios
  {
    path: 'usuarios',
    children: [
      { path: 'ver', component: UsuariosComponent },            // Ruta para ver usuarios
      { path: 'crear', component: CrearUsuariosComponent }      // Ruta para crear usuarios
    ]
  },

  //Rutas del ayudante de pasillo
  {path:'abastecimiento-estantes', component: AbastecimientoComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
