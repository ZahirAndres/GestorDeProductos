import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CrearUsuariosComponent } from './components/crear-usuarios/crear-usuarios.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { FormsModule } from '@angular/forms';
import { AbastecimientoComponent } from './components/ayudante-pasillo/abastecimiento/abastecimiento.component';

import { ToolBarComponent } from './components/nav/navbarAyudante/tool-bar.component';
import { FootComponent } from './components/nav/foot/foot.component';

import { ProductosAlmacenComponent } from './components/administrador/productos-almacen/productos-almacen.component';
import { LotesAlmacenComponent } from './components/administrador/lotes-almacen/lotes-almacen.component';
import { VerLotesComponent } from './components/almacenista/ver-lotes/ver-lotes.component';
import { VerProductosComponent } from './components/almacenista/ver-productos/ver-productos.component';
import { VerProductosClienteComponent } from './components/cliente/ver-productos-cliente/ver-productos-cliente.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrarLoteComponent } from './components/almacenista/registrar-lote/registrar-lote.component';
import { ListaHistorialComponent } from './components/almacenista/lista-historial/lista-historial.component';
import { HistorialPreciosComponent } from './components/almacenista/historial-precios/historial-precios.component';
import { VerProductoComponent } from './components/cliente/ver-producto/ver-producto.component';
import { AgregarProductoComponent } from './components/almacenista/agregar-producto/agregar-producto.component';
import { EditarProductosComponent } from './components/almacenista/editar-productos/editar-productos.component';
import { ExistenciasComponent } from './components/almacenista/existencias/existencias.component';



@NgModule({
  declarations: [
    AppComponent,
    CrearUsuariosComponent,
    UsuariosComponent,
    AbastecimientoComponent,
    ToolBarComponent,
    FootComponent,
    ProductosAlmacenComponent,
    LotesAlmacenComponent,
    VerLotesComponent,
    VerProductosComponent,
    VerProductosClienteComponent,
    LoginComponent,
    RegistrarLoteComponent,
    ListaHistorialComponent,
    HistorialPreciosComponent,
    VerProductoComponent,
    AgregarProductoComponent,
    EditarProductosComponent,
    ExistenciasComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule, 
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
