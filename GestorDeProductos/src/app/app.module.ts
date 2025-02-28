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

import { NavbarComponent } from './components/nav/navbarAlmacenista/navbar.component';
import { ProductosAlmacenComponent } from './components/administrador/productos-almacen/productos-almacen.component';
import { LotesAlmacenComponent } from './components/administrador/lotes-almacen/lotes-almacen.component';


@NgModule({
  declarations: [
    AppComponent,
    CrearUsuariosComponent,
    UsuariosComponent,
    AbastecimientoComponent,
    ToolBarComponent,
    FootComponent
    NavbarComponent,
    ProductosAlmacenComponent,
    LotesAlmacenComponent

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
