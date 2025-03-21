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
    { nombreMarca: "Souvenir Shop" },
    { nombreMarca: "Marca1" },
  ];
  
  // Colección Categorías
  var categorias = [
    { nombreCategoria: "Despensa" },
    { nombreCategoria: "Dulces" },
    { nombreCategoria: "Souvenirs" },
    { nombreCategoria: "Categoria1" },
  ];
  
  // Colección Proveedores
  var proveedores = [
    {
      nombreProveedor: "Distribuidora El Águila",
      telefono: ["4421234567", "4427654321"],
      correo: "contacto@elaguila.com",
      direccion: "Calle Principal #123, Querétaro, QRO"
    },
    {
      nombreProveedor: "Comercializadora del Centro",
      telefono: ["5556789012"],
      correo: "ventas@comdelcentro.com",
      direccion: "Av. Insurgentes Sur #456, CDMX"
    },
    {
      nombreProveedor: "Abarrotes Express",
      telefono: ["8112345678"],
      correo: "info@abarrotesexpress.com",
      direccion: "Calle Hidalgo #78, Monterrey, NL"
    },
    {
      nombreProveedor: "Suministros del Bajío",
      telefono: ["4778901234", "4775678901"],
      correo: "atencion@sumbajio.com",
      direccion: "Blvd. López Mateos #321, León, GTO"
    }
  ];
  
  // Colección Productos
  var productos = [
    {
      codigoBarras: "1234567890",
      nombreProducto: "Leche Entera",
      tamano: "Mediano", // Relacionado con la colección Tamaños
      marca: "Leche Fresca", // Relacionado con la colección Marcas
      imagenUrl: [
        "https://res.cloudinary.com/walmart-labs/image/upload/d_default.jpg/w_960,dpr_auto,f_auto,q_auto:best/gr/images/product-images/img_large/00750105590007L.jpg",
        "https://www.lacteosbetania.com/wp-content/uploads/2021/11/Fresa-500x500.png"
      ],
      categoria: "Despensa", // Relacionado con la colección Categorías
      precioPieza: 20.50,
      precioCaja: 123.00,
      cantidadPiezasPorCaja: 6,
      proveedor: ["Proveedor A"], // Relacionado con la colección Proveedores
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
      imagenUrl: [
        "https://img.cocinarico.es/2020-08/galletas-oreo-caseras-1.jpg",
        "https://d2o812a6k13pkp.cloudfront.net/Productos/40417108_0120220722161850.jpg"
      ],
      categoria: "Dulces", // Relacionado con la colección Categorías
      precioPieza: 35.75,
      precioCaja: 214.50,
      cantidadPiezasPorCaja: 6,
      proveedor: ["Proveedor B"], // Relacionado con la colección Proveedores
      stockExhibe: 40,
      existenciaExhibida: 20,
      stockAlmacen: 150,
      cantidadAlmacen: 1120
    },
    {
      codigoBarras: "1122334455",
      nombreProducto: "Souvenir Taza",
      tamano: "Grande", // Relacionado con la colección Tamaños
      marca: "Souvenir Shop", // Relacionado con la colección Marcas
      imagenUrl: [
        "https://i.pinimg.com/originals/49/51/59/495159f1c98ba8089532252c1afbc81a.jpg",
        "https://i.pinimg.com/736x/ce/4e/5c/ce4e5c1588f5c143539bac03ea51986a.jpg"
      ],
      categoria: "Souvenirs", // Relacionado con la colección Categorías
      precioPieza: 50.00,
      precioCaja: 300.00,
      cantidadPiezasPorCaja: 6,
      proveedor: ["Proveedor C"], // Relacionado con la colección Proveedores
      stockExhibe: 30,
      existenciaExhibida: 20,
      stockAlmacen: 100,
      cantidadAlmacen: 70
    },
    {
      codigoBarras: "1122334456",
      nombreProducto: "Cereal",
      tamano: "Chico", // Relacionado con la colección Tamaños
      marca: "Marca1", // Relacionado con la colección Marcas
      imagenUrl: [
        "https://www.thedailymeal.com/img/gallery/11-healthy-cereals-that-are-actually-tasty/intro-1678891755.jpg",
        "https://i5.walmartimages.com/asr/a0c33060-4cc8-44a2-9861-e29728fc3cb7_1.90dd5aa7ce0204bee7c80641f11c8cfd.jpeg"
      ],
      categoria: "Categoria1", // Relacionado con la colección Categorías
      precioPieza: 50.00,
      precioCaja: 300.00,
      cantidadPiezasPorCaja: 6,
      proveedor: ["Proveedor C", "Proveedor A"], // Relacionado con la colección Proveedores
      stockExhibe: 30,
      existenciaExhibida: 20,
      stockAlmacen: 100,
      cantidadAlmacen: 170
    },
    {
      codigoBarras: "2233445566",
      nombreProducto: "Café Orgánico",
      tamano: "Mediano",
      marca: "Marca Orgánica",
      imagenUrl: [
        "https://th.bing.com/th/id/OIP.HNSbeAKl2HpufkB0KU2W4wHaE-?rs=1&pid=ImgDetMain",
        "https://saboresmexicanos.com.mx/wp-content/uploads/2023/09/IMG_5121.jpeg"
      ],
      categoria: "Despensa",
      precioPieza: 85.00,
      precioCaja: 510.00,
      cantidadPiezasPorCaja: 6,
      proveedor: ["Proveedor B"],
      stockExhibe: 50,
      existenciaExhibida: 25,
      stockAlmacen: 200,
      cantidadAlmacen: 150
    },
    {
      codigoBarras: "6677889900",
      nombreProducto: "Chocolate Amargo",
      tamano: "Pequeño",
      marca: "Dulce Art",
      imagenUrl: [
        "https://th.bing.com/th/id/OIP.S8bXcT7WsbDNm18lVzPpfAHaE8?rs=1&pid=ImgDetMain",
        "https://vitat.com.br/wp-content/uploads/2019/06/delicious-dark-chocolate-with-co.jpg",
        "https://dam.cocinafacil.com.mx/wp-content/uploads/2018/04/chocolate-amargo.jpg"
      ],
      categoria: "Dulces",
      precioPieza: 45.50,
      precioCaja: 273.00,
      cantidadPiezasPorCaja: 6,
      proveedor: ["Proveedor A"],
      stockExhibe: 40,
      existenciaExhibida: 20,
      stockAlmacen: 180,
      cantidadAlmacen: 120
    },
    {
      codigoBarras: "3344556677",
      nombreProducto: "Papel Higiénico",
      tamano: "Grande",
      marca: "Higiene Plus",
      imagenUrl: [
        "https://th.bing.com/th/id/OIP.SRPw49G5g9drtzk2DhRcsQHaHa?rs=1&pid=ImgDetMain",
        "https://www.horecahosteleria.es/wp-content/uploads/2018/05/papel-higienico-domestico-hosteleria-horeca-compra-online-oferta-1024x877.jpg",
        "https://res.cloudinary.com/walmart-labs/image/upload/w_960,dpr_auto,f_auto,q_auto:best/gr/images/product-images/img_large/00750642561353L.jpg"
      ],
      categoria: "Despensa",
      precioPieza: 15.75,
      precioCaja: 94.50,
      cantidadPiezasPorCaja: 6,
      proveedor: ["Proveedor C"],
      stockExhibe: 60,
      existenciaExhibida: 35,
      stockAlmacen: 250,
      cantidadAlmacen: 180
    },
    {
      codigoBarras: "4455667788",
      nombreProducto: "Cerveza Artesanal",
      tamano: "Mediano",
      marca: "BrewCraft",
      imagenUrl: [
        "https://th.bing.com/th/id/OIP.cm7k8KVwQDuFE8l_t-N7PQHaE8?rs=1&pid=ImgDetMain",
        "https://th.bing.com/th/id/R.b79d07c3e8634737b67a082cfe440626?rik=d5COwZiG39MpfA&riu=http%3a%2f%2fsevilla.abc.es%2fcontenidopromocionado%2fwp-content%2fuploads%2fsites%2f2%2f2018%2f05%2fportada-wp-artesanales.jpg&ehk=9yMxG8J011lb4E2sgplh5%2bf50oDaZcnjq4a7SInO%2b2c%3d&risl=&pid=ImgRaw&r=0"
      ],
      categoria: "Dulces",
      precioPieza: 70.00,
      precioCaja: 420.00,
      cantidadPiezasPorCaja: 6,
      proveedor: ["Proveedor A"],
      stockExhibe: 20,
      existenciaExhibida: 15,
      stockAlmacen: 100,
      cantidadAlmacen: 180
    },
    {
      codigoBarras: "5566778899",
      nombreProducto: "Mermelada de Fresa",
      tamano: "Pequeño",
      marca: "DulceMermelada",
      imagenUrl: [
        "https://th.bing.com/th/id/R.5e6ff8708029673a2ec344cd34a717b8?rik=AkmLwIDhGI7s3g&pid=ImgRaw&r=0",
        "https://www.annarecetasfaciles.com/files/mermelada-de-fresa-casera2.jpg"
      ],
      categoria: "Dulces",
      precioPieza: 30.00,
      precioCaja: 180.00,
      cantidadPiezasPorCaja: 6,
      proveedor: ["Proveedor C"],
      stockExhibe: 70,
      existenciaExhibida: 50,
      stockAlmacen: 180,
      cantidadAlmacen: 150
    },
    {
      codigoBarras: "1122334457",
      nombreProducto: "Aceite de Oliva",
      tamano: "Grande",
      marca: "Oliva Pure",
      imagenUrl: [
        "https://sietemil.es/wp-content/uploads/2020/07/500ml-PREMIUM-pack-de-6-1536x1536.jpg",
        "https://th.bing.com/th/id/R.459d9007c853b6d53c42909c3143e23e?rik=8nv9HF7nh9IREA&riu=http%3a%2f%2fwww.foodsfromspain.com%2fwp-content%2fuploads%2faceite-de-oliva-portada.jpg&ehk=roKC7166iaH%2fyeJvU84s%2bx0YFhVXqMPYnFvfMnsY0SI%3d&risl=&pid=ImgRaw&r=0",
        "https://th.bing.com/th/id/OIP._WBnZ_qvS3bMmp90kC1iDgHaE4?rs=1&pid=ImgDetMain"
      ],
      categoria: "Despensa",
      precioPieza: 120.00,
      precioCaja: 720.00,
      cantidadPiezasPorCaja: 6,
      proveedor: ["Proveedor B"],
      stockExhibe: 25,
      existenciaExhibida: 15,
      stockAlmacen: 80,
      cantidadAlmacen: 160
    }
  ];
  
  // Colección Lotes Por Compra
  var lotesPorCompra = [
    {
      codigoLote: "L001",
      codigoBarras: "1234567890",
      producto: "Leche Entera",
      fechaCaducidad: new Date("2025-03-20"),
      cantidadComprada: 50,
      fechaRegistro: new Date("2025-01-01")
    },
    {
      codigoLote: "L002",
      codigoBarras: "9876543210",
      producto: "Galletas Oreo",
      fechaCaducidad: new Date("2025-03-22"),
      cantidadComprada: 100,
      fechaRegistro: new Date("2025-02-01")
    },
    {
      codigoLote: "L003",
      codigoBarras: "1122334455",
      producto: "Souvenir Taza",
      fechaCaducidad: new Date("2025-03-25"),
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
    },
    {
      codigoBarras: "2233445566", // Producto: Café Orgánico
      producto: "Café Orgánico",
      historialPrecios: [
        { precio: 85.00, fechaCambio: new Date("2025-03-18T01:59:40.365Z") }
      ]
    },
    {
      codigoBarras: "6677889900", // Producto: Chocolate Amargo
      producto: "Chocolate Amargo",
      historialPrecios: [
        { precio: 45.50, fechaCambio: new Date("2025-03-18T01:59:40.365Z") }
      ]
    },
    {
      codigoBarras: "3344556677", // Producto: Papel Higiénico
      producto: "Papel Higiénico",
      historialPrecios: [
        { precio: 15.75, fechaCambio: new Date("2025-03-18T01:59:40.365Z") }
      ]
    },
    {
      codigoBarras: "4455667788", // Producto: Cerveza Artesanal
      producto: "Cerveza Artesanal",
      historialPrecios: [
        { precio: 70.00, fechaCambio: new Date("2025-03-18T01:59:40.365Z") }
      ]
    },
    {
      codigoBarras: "5566778899", // Producto: Mermelada de Fresa
      producto: "Mermelada de Fresa",
      historialPrecios: [
        { precio: 30.00, fechaCambio: new Date("2025-03-18T01:59:40.365Z") }
      ]
    },
    {
      codigoBarras: "1122334457", // Producto: Aceite de Oliva
      producto: "Aceite de Oliva",
      historialPrecios: [
        { precio: 120.00, fechaCambio: new Date("2025-03-18T01:59:40.365Z") }
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
  db.Lotes.insertMany(lotesPorCompra);
  db.historialPrecios.insertMany(historialPrecios);
  