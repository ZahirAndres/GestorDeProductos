// Datos para insertar en las colecciones

// Colección Usuarios
var usuarios = [
    {
      nombreUsuario: 'Carlos',
      apellidoPaterno: 'Gonzalez',
      apellidoMaterno: 'Martínez',
      correo: 'carlos.gonzalez@example.com',
      contrasena: '1234',
      rol: 'Almacenista',
      direccion: 'Avenida Central 123, Ciudad de México'
    },
    {
      nombreUsuario: 'María',
      apellidoPaterno: 'Lopez',
      apellidoMaterno: 'Fernández',
      correo: 'maria.lopez@example.com',
      contrasena: '1234',
      rol: 'Ayudante-Pasillo',
      direccion: 'Calle de la Paz 45, Guadalajara'
    }
  ];
  
  // Colección Tamaños
  var tamanios = [
    { nombreTamanio: "Pequeño", descripcion: "Tamaño pequeño" },
    { nombreTamanio: "Mediano", descripcion: "Tamaño mediano" },
    { nombreTamanio: "Grande", descripcion: "Tamaño grande" }
  ];
  
  // Colección Marcas
  var marcas = [
    { nombreMarca: "Leche Fresca" },
    { nombreMarca: "Oreo" },
    { nombreMarca: "Souvenir Shop" }
  ];
  
  // Colección Categorías
  var categorias = [
    { nombreCategoria: "Despensa" },
    { nombreCategoria: "Dulces" },
    { nombreCategoria: "Souvenirs" }
  ];
  
  // Colección Proveedores
  var proveedores = [
    {
      nombreProveedor: "Proveedor A",
      telefono: ["123456789", "987654321"],
      paginaWeb: "http://proveedora.com",
      correo: "contacto@proveedora.com",
      direccion: {
        calle: "Calle Principal",
        numeroInterior: "15A",
        numeroExterior: "34",
        colonia: "Centro",
        codigoPostal: "12345",
        ciudad: "Ciudad A"
      }
    },
    {
      nombreProveedor: "Proveedor B",
      telefono: ["234567890", "876543210"],
      paginaWeb: "http://proveedorb.com",
      correo: "contacto@proveedorb.com",
      direccion: {
        calle: "Avenida Secundaria",
        numeroInterior: "5B",
        numeroExterior: "10",
        colonia: "Zona Norte",
        codigoPostal: "67890",
        ciudad: "Ciudad B"
      }
    },
    {
      nombreProveedor: "Proveedor C",
      telefono: ["345678901", "765432109"],
      paginaWeb: "http://proveedorc.com",
      correo: "contacto@proveedorc.com",
      direccion: {
        calle: "Calle del Comercio",
        numeroInterior: "10A",
        numeroExterior: "20",
        colonia: "Zona Comercial",
        codigoPostal: "98765",
        ciudad: "Ciudad C"
      }
    }
  ];
  
  // Colección Productos
  var productos = [
    {
      codigoBarras: "1234567890",
      nombreProducto: "Leche Entera",
      tamano: "Mediano", // Relacionado con la colección Tamaños
      marca: "Leche Fresca", // Relacionado con la colección Marcas
      imagenUrl: [],
      categoria: "Despensa", // Relacionado con la colección Categorías
      precioPieza: 20.50,
      precioCaja: 123.00,
      cantidadPiezasPorCaja: 6,
      Proveedor: ["Proveedor A"], // Relacionado con la colección Proveedores
      stockExhibe: 50,
      existenciaExhibida: 30,
      stockAlmacen: 200,
      cantidadAlmacen: 150
    },
    {
      codigoBarras: "9876543210",
      nombreProducto: "Galletas Oreo",
      tamano: "Pequeño", // Relacionado con la colección Tamaños
      marca: "Oreo", // Relacionado con la colección Marcas
      imagenUrl: [],
      categoria: "Dulces", // Relacionado con la colección Categorías
      precioPieza: 35.75,
      precioCaja: 214.50,
      cantidadPiezasPorCaja: 6,
      Proveedor: ["Proveedor B"], // Relacionado con la colección Proveedores
      stockExhibe: 40,
      existenciaExhibida: 20,
      stockAlmacen: 150,
      cantidadAlmacen: 120
    },
    {
      codigoBarras: "1122334455",
      nombreProducto: "Souvenir Taza",
      tamano: "Grande", // Relacionado con la colección Tamaños
      marca: "Souvenir Shop", // Relacionado con la colección Marcas
      imagenUrl: [],
      categoria: "Souvenirs", // Relacionado con la colección Categorías
      precioPieza: 50.00,
      precioCaja: 300.00,
      cantidadPiezasPorCaja: 6,
      Proveedor: ["Proveedor C"], // Relacionado con la colección Proveedores
      stockExhibe: 30,
      existenciaExhibida: 20,
      stockAlmacen: 100,
      cantidadAlmacen: 70
    }
  ];
  
  // Colección Lotes Por Compra
  var lotesPorCompra = [
    {
      codigoLote: "L001",
      producto: "Leche Entera",
      fechaCaducidad: new Date("2025-12-31"),
      cantidadComprada: 50,
      fechaRegistro: new Date("2025-01-01")
    },
    {
      codigoLote: "L002",
      producto: "Galletas Oreo",
      fechaCaducidad: new Date("2025-11-30"),
      cantidadComprada: 100,
      fechaRegistro: new Date("2025-02-01")
    },
    {
      codigoLote: "L003",
      producto: "Souvenir Taza",
      fechaCaducidad: new Date("2026-05-31"),
      cantidadComprada: 150,
      fechaRegistro: new Date("2025-03-01")
    }
  ];
  
  // Colección Historial Precios
  var historialPrecios = [
    {
      codigoBarras: "1234567890", // Producto: Leche Entera
      producto: "Leche Entera",
      historialPrecios: [
        { precio: 20.50, fechaCambio: new Date("2025-03-18T01:59:40.365Z") }
      ]
    },
    {
      codigoBarras: "9876543210", // Producto: Galletas Oreo
      producto: "Galletas Oreo",
      historialPrecios: [
        { precio: 35.75, fechaCambio: new Date("2025-03-18T01:59:40.365Z") }
      ]
    },
    {
      codigoBarras: "1122334455", // Producto: Souvenir Taza
      producto: "Souvenir Taza",
      historialPrecios: [
        { precio: 50.00, fechaCambio: new Date("2025-03-18T01:59:40.365Z") }
      ]
    }
  ];
  
  // Insertar los datos generados en las colecciones correspondientes
  db.Usuarios.insertMany(usuarios);
  db.Tamanios.insertMany(tamanios);
  db.Marcas.insertMany(marcas);
  db.Categorias.insertMany(categorias);
  db.Proveedores.insertMany(proveedores);
  db.Productos.insertMany(productos);
  db.LotesPorCompra.insertMany(lotesPorCompra);
  db.HistorialPrecios.insertMany(historialPrecios);
  