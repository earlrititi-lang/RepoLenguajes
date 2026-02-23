# Prácticas de Manipulación del DOM con JavaScript
## De lo básico al Tres en Raya

---

## 📚 Introducción Teórica

### ¿Qué es el DOM?

El **DOM (Document Object Model)** es la representación en forma de árbol de tu página HTML que JavaScript puede leer y modificar. Imagina que tu HTML es un árbol: el `<html>` es la raíz, `<head>` y `<body>` son ramas principales, y cada elemento dentro es una rama o hoja más pequeña.

#### 🌳 Visualización del árbol DOM

Cuando escribes este HTML:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Mi Página</title>
  </head>
  <body>
    <h1 id="titulo">Bienvenido</h1>
    <div class="contenedor">
      <p>Primer párrafo</p>
      <p>Segundo párrafo</p>
    </div>
  </body>
</html>
```

El navegador lo convierte en esta estructura de árbol:

```
Document
  └─ html
      ├─ head
      │   └─ title
      │       └─ "Mi Página" (texto)
      └─ body
          ├─ h1 (id="titulo")
          │   └─ "Bienvenido" (texto)
          └─ div (class="contenedor")
              ├─ p
              │   └─ "Primer párrafo" (texto)
              └─ p
                  └─ "Segundo párrafo" (texto)
```

#### 🔑 Conceptos clave del DOM

**1. Nodos (Nodes)**: Cada elemento del árbol es un "nodo"
- **Element nodes** (nodos de elemento): `<div>`, `<p>`, `<h1>`
- **Text nodes** (nodos de texto): El contenido dentro de los elementos
- **Attribute nodes** (nodos de atributo): `id="titulo"`, `class="contenedor"`

**2. Relaciones entre nodos:**
```html
<div id="padre">
  <p id="hijo1">Texto 1</p>
  <p id="hijo2">Texto 2</p>
</div>
```

```javascript
const padre = document.querySelector('#padre');
const hijo1 = document.querySelector('#hijo1');
const hijo2 = document.querySelector('#hijo2');

// Relaciones familiares
console.log(hijo1.parentElement);     // <div id="padre">
console.log(padre.children);          // [<p id="hijo1">, <p id="hijo2">]
console.log(hijo1.nextElementSibling); // <p id="hijo2">
console.log(hijo2.previousElementSibling); // <p id="hijo1">
```

#### 🎯 ¿Por qué es importante entender el DOM?

El DOM es la **interfaz** entre HTML y JavaScript. Cuando haces:

```javascript
document.querySelector('#titulo').textContent = "Nuevo título";
```

Lo que realmente está pasando es:
1. JavaScript busca en el árbol DOM el nodo con `id="titulo"`
2. Accede a su propiedad `textContent`
3. Modifica ese nodo
4. El navegador detecta el cambio y actualiza lo que ves en pantalla

**Sin el DOM:** JavaScript y HTML no podrían comunicarse
**Con el DOM:** JavaScript puede manipular dinámicamente la página

#### 📝 Ejemplo práctico completo

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Entendiendo el DOM</title>
  <style>
    .destacado {
      background-color: yellow;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1 id="titulo">Lista de Tareas</h1>
  <ul id="lista">
    <li>Comprar pan</li>
    <li>Estudiar JavaScript</li>
  </ul>
  <button id="btnAgregar">Agregar tarea</button>

  <script>
    // Acceder al DOM
    const titulo = document.querySelector('#titulo');
    const lista = document.querySelector('#lista');
    const boton = document.querySelector('#btnAgregar');

    // Modificar elementos existentes
    titulo.textContent = "Mis Tareas Importantes";
    titulo.classList.add('destacado');

    // Crear nuevos elementos
    boton.addEventListener('click', () => {
      const nuevaTarea = document.createElement('li');
      nuevaTarea.textContent = "Nueva tarea";
      lista.appendChild(nuevaTarea);
    });
  </script>
</body>
</html>
```

**Lo que hace este código:**
1. **Líneas 20-22**: Selecciona elementos del DOM (acceder al árbol)
2. **Líneas 25-26**: Modifica un elemento existente (cambiar el árbol)
3. **Líneas 29-32**: Crea un nuevo elemento y lo añade (añadir al árbol)

---

### Métodos de Selección de Elementos

Seleccionar elementos es el **primer paso** para manipular el DOM. Es como decirle a JavaScript: "busca este elemento en el árbol para que pueda trabajar con él".

#### `getElementById()` - El método clásico

```javascript
const elemento = document.getElementById('miId');
```

**Características:**
- ✅ Rápido y específico
- ✅ Devuelve directamente el elemento o `null`
- ❌ Solo funciona con IDs
- ❌ Sintaxis más verbosa
- ❌ Menos flexible

**Ejemplo práctico:**

```html
<div id="resultado">Cargando...</div>
<button id="btnCargar">Cargar datos</button>

<script>
  // Seleccionar elementos
  const resultado = document.getElementById('resultado');
  const boton = document.getElementById('btnCargar');
  
  boton.onclick = function() {
    resultado.textContent = "Datos cargados!";
  };
</script>
```

**Limitaciones:**
```javascript
// ❌ No puedes hacer esto
document.getElementById('.miClase');  // No funciona con clases
document.getElementById('button');    // No funciona con etiquetas

// Solo funciona con IDs exactos
document.getElementById('miId');  // ✅ Funciona
```

#### `querySelector()` - El método moderno (⭐ RECOMENDADO)

```javascript
const elemento = document.querySelector('#miId');
const clase = document.querySelector('.miClase');
const tag = document.querySelector('button');
```

**Características:**
- ✅ Usa selectores CSS (más flexible)
- ✅ Sintaxis consistente
- ✅ Estándar de la industria
- ⚠️ Solo devuelve el primer elemento encontrado

**🎓 Entendiendo los selectores CSS:**

Los selectores en `querySelector()` funcionan **exactamente igual** que en CSS. Necesitas conocer cómo declarar cada tipo en HTML:

##### **1️⃣ Selector de ID (`#`)**

**En HTML declaras el ID con el atributo "id":**
```html
<div id="miId">Contenido</div>
<button id="btnEnviar">Enviar</button>
<section id="seccionPrincipal">
  <p>Texto dentro de la sección</p>
</section>
```

**En JavaScript lo seleccionas con `#`:**
```javascript
const elemento = document.querySelector('#miId');
const boton = document.querySelector('#btnEnviar');
const seccion = document.querySelector('#seccionPrincipal');

console.log(elemento);  // <div id="miId">Contenido</div>
console.log(boton);     // <button id="btnEnviar">Enviar</button>
```

**Reglas importantes de los IDs:**
- Los IDs deben ser **únicos** en la página (solo uno por página)
- Un elemento solo puede tener **un ID**
- Se usa `#` como prefijo en querySelector (igual que en CSS)
- Sensible a mayúsculas/minúsculas: `#miId` ≠ `#MIID`

**Ejemplo práctico completo:**
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <style>
    #alerta {
      padding: 10px;
      background-color: #ffcccc;
      border: 2px solid red;
      display: none; /* Oculto por defecto */
    }
  </style>
</head>
<body>
  <div id="alerta">¡Error! Por favor revisa los datos.</div>
  <button id="btnMostrar">Mostrar Alerta</button>

  <script>
    const alerta = document.querySelector('#alerta');
    const boton = document.querySelector('#btnMostrar');

    boton.addEventListener('click', () => {
      alerta.style.display = 'block';
    });
  </script>
</body>
</html>
```

##### **2️⃣ Selector de Clase (`.`)**

**En HTML declaras la clase con el atributo "class":**
```html
<!-- Un elemento puede tener UNA clase -->
<div class="miClase">Contenido 1</div>

<!-- Un elemento puede tener MÚLTIPLES clases (separadas por espacios) -->
<div class="miClase destacado">Contenido 2</div>
<p class="texto grande rojo">Párrafo</p>

<!-- La misma clase puede repetirse en varios elementos -->
<div class="tarjeta">Tarjeta 1</div>
<div class="tarjeta">Tarjeta 2</div>
<div class="tarjeta">Tarjeta 3</div>
```

**En JavaScript lo seleccionas con `.`:**
```javascript
// querySelector solo devuelve el PRIMERO que encuentra
const elemento = document.querySelector('.miClase');  
console.log(elemento);  // <div class="miClase">Contenido 1</div>

// Aunque hay 3 tarjetas, solo obtiene la primera
const tarjeta = document.querySelector('.tarjeta');
console.log(tarjeta);  // <div class="tarjeta">Tarjeta 1</div>
```

**Para obtener TODOS los elementos con una clase:**
```javascript
const todasLasTarjetas = document.querySelectorAll('.tarjeta');
console.log(todasLasTarjetas);  // NodeList(3) [div.tarjeta, div.tarjeta, div.tarjeta]

// Ahora puedes iterar sobre todas
todasLasTarjetas.forEach(tarjeta => {
  console.log(tarjeta.textContent);
});
// Output:
// Tarjeta 1
// Tarjeta 2
// Tarjeta 3
```

**Características de las clases:**
- Las clases pueden **repetirse** en múltiples elementos
- Un elemento puede tener **múltiples clases** (separadas por espacios)
- Se usa `.` como prefijo en querySelector
- Si hay varios elementos con la misma clase, querySelector devuelve **solo el primero**

**Ejemplo práctico - Sistema de pestañas:**
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <style>
    .tab {
      padding: 10px 20px;
      background-color: #ddd;
      cursor: pointer;
    }
    
    .tab.active {
      background-color: #4CAF50;
      color: white;
    }
    
    .content {
      display: none;
      padding: 20px;
      border: 1px solid #ddd;
    }
    
    .content.active {
      display: block;
    }
  </style>
</head>
<body>
  <div class="tab active" data-target="tab1">Pestaña 1</div>
  <div class="tab" data-target="tab2">Pestaña 2</div>
  <div class="tab" data-target="tab3">Pestaña 3</div>

  <div id="tab1" class="content active">Contenido de pestaña 1</div>
  <div id="tab2" class="content">Contenido de pestaña 2</div>
  <div id="tab3" class="content">Contenido de pestaña 3</div>

  <script>
    const tabs = document.querySelectorAll('.tab');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remover 'active' de todas las pestañas
        document.querySelectorAll('.tab').forEach(t => {
          t.classList.remove('active');
        });
        
        // Remover 'active' de todos los contenidos
        document.querySelectorAll('.content').forEach(c => {
          c.classList.remove('active');
        });
        
        // Añadir 'active' a la pestaña clickeada
        tab.classList.add('active');
        
        // Mostrar el contenido correspondiente
        const targetId = tab.dataset.target;
        document.querySelector('#' + targetId).classList.add('active');
      });
    });
  </script>
</body>
</html>
```

##### **3️⃣ Selector de Etiqueta (sin prefijo)**

**Las etiquetas HTML no necesitan atributos especiales:**
```html
<button>Botón 1</button>
<button>Botón 2</button>
<button>Botón 3</button>
<p>Primer párrafo</p>
<p>Segundo párrafo</p>
<div>Una división</div>
```

**En JavaScript lo seleccionas sin ningún prefijo:**
```javascript
// querySelector devuelve solo el PRIMERO
const boton = document.querySelector('button');
console.log(boton);  // <button>Botón 1</button>

const parrafo = document.querySelector('p');
console.log(parrafo);  // <p>Primer párrafo</p>

// Para obtener TODOS
const todosLosBotones = document.querySelectorAll('button');
console.log(todosLosBotones);  // NodeList(3) [button, button, button]
```

**Características:**
- Selecciona por el nombre de la etiqueta HTML
- Si hay varios elementos de la misma etiqueta, querySelector devuelve **solo el primero**
- No necesita prefijo especial
- Útil cuando quieres seleccionar todos los elementos de un tipo

**Ejemplo práctico - Resaltar todos los párrafos:**
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <style>
    .resaltado {
      background-color: yellow;
      padding: 5px;
      border-left: 4px solid orange;
    }
  </style>
</head>
<body>
  <h1>Mi Artículo</h1>
  <p>Este es el primer párrafo del artículo.</p>
  <p>Este es el segundo párrafo con más información.</p>
  <p>Y este es el tercer y último párrafo.</p>
  
  <button id="btnResaltar">Resaltar Párrafos</button>

  <script>
    const boton = document.querySelector('#btnResaltar');

    boton.addEventListener('click', () => {
      // Seleccionar TODOS los párrafos
      const parrafos = document.querySelectorAll('p');
      
      // Iterar sobre cada uno
      parrafos.forEach(parrafo => {
        parrafo.classList.toggle('resaltado');
      });
    });
  </script>
</body>
</html>
```

##### **🔍 Selectores avanzados (los mismos que en CSS)**

Una vez que dominas los selectores básicos, puedes combinarlos de formas muy potentes:

**1. Selector de elemento con clase:**
```html
<div class="destacado">Div destacado</div>
<p class="destacado">Párrafo destacado</p>
<span class="destacado">Span destacado</span>
```

```javascript
// Solo divs que tengan la clase 'destacado'
const divDestacado = document.querySelector('div.destacado');
console.log(divDestacado);  // <div class="destacado">

// Solo párrafos con clase 'destacado'
const pDestacado = document.querySelector('p.destacado');
console.log(pDestacado);  // <p class="destacado">
```

**2. Selector descendiente (espacio):**
```html
<div id="contenedor">
  <p class="texto">Dentro del contenedor</p>
</div>
<p class="texto">Fuera del contenedor</p>
```

```javascript
// Solo el .texto que está DENTRO de #contenedor
const textoDentro = document.querySelector('#contenedor .texto');
console.log(textoDentro);  // <p class="texto">Dentro del contenedor</p>
```

**3. Selector de atributos:**
```html
<button type="submit">Enviar</button>
<button type="button">Cancelar</button>
<input type="email" name="correo">
<input type="password" name="clave">
```

```javascript
// Solo el botón con type="submit"
const btnSubmit = document.querySelector('button[type="submit"]');
console.log(btnSubmit);  // <button type="submit">Enviar</button>

// Solo el input de tipo email
const inputEmail = document.querySelector('input[type="email"]');
console.log(inputEmail);  // <input type="email" name="correo">
```

**4. Selector de hijo directo (`>`):**
```html
<div id="padre">
  <p>Hijo directo</p>
  <div>
    <p>Nieto (NO es hijo directo)</p>
  </div>
</div>
```

```javascript
// Solo los p que son hijos DIRECTOS de #padre
const hijoDirecto = document.querySelector('#padre > p');
console.log(hijoDirecto);  // <p>Hijo directo</p>
```

**5. Pseudo-clases:**
```html
<ul>
  <li>Primero</li>
  <li>Segundo</li>
  <li>Tercero</li>
</ul>
```

```javascript
// El primer li
const primero = document.querySelector('li:first-child');
console.log(primero);  // <li>Primero</li>

// El último li
const ultimo = document.querySelector('li:last-child');
console.log(ultimo);  // <li>Tercero</li>

// El segundo li (índice empieza en 1, no en 0)
const segundo = document.querySelector('li:nth-child(2)');
console.log(segundo);  // <li>Segundo</li>
```

**6. Atributos data-* (muy usados en JavaScript):**
```html
<div class="producto" data-id="123" data-precio="29.99">Producto A</div>
<div class="producto" data-id="456" data-precio="49.99">Producto B</div>
```

```javascript
// Elemento con data-id="123"
const producto = document.querySelector('[data-id="123"]');
console.log(producto);  // <div class="producto" data-id="123"...>

// Acceder a los valores de data
console.log(producto.dataset.id);     // "123"
console.log(producto.dataset.precio); // "29.99"
```

**7. Múltiples selectores (coma):**
```html
<h1>Título</h1>
<h2>Subtítulo</h2>
<p>Párrafo</p>
```

```javascript
// Primer elemento que sea h1, h2 O p
const encabezado = document.querySelector('h1, h2, h3');
console.log(encabezado);  // <h1>Título</h1>
```

**Ejemplo práctico completo - Filtro de productos:**
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <style>
    .producto {
      padding: 10px;
      margin: 5px;
      border: 1px solid #ddd;
    }
    
    .producto.oculto {
      display: none;
    }
    
    .producto[data-categoria="electronica"] {
      border-left: 4px solid blue;
    }
    
    .producto[data-categoria="ropa"] {
      border-left: 4px solid green;
    }
  </style>
</head>
<body>
  <h1>Tienda Online</h1>
  
  <div>
    <button class="filtro" data-categoria="todos">Todos</button>
    <button class="filtro" data-categoria="electronica">Electrónica</button>
    <button class="filtro" data-categoria="ropa">Ropa</button>
  </div>

  <div id="productos">
    <div class="producto" data-categoria="electronica" data-precio="599">
      Laptop - $599
    </div>
    <div class="producto" data-categoria="ropa" data-precio="29">
      Camiseta - $29
    </div>
    <div class="producto" data-categoria="electronica" data-precio="199">
      Auriculares - $199
    </div>
    <div class="producto" data-categoria="ropa" data-precio="79">
      Pantalón - $79
    </div>
  </div>

  <script>
    const botonesFiltro = document.querySelectorAll('.filtro');
    
    botonesFiltro.forEach(boton => {
      boton.addEventListener('click', () => {
        const categoria = boton.dataset.categoria;
        
        // Obtener todos los productos
        const productos = document.querySelectorAll('.producto');
        
        productos.forEach(producto => {
          if (categoria === 'todos') {
            // Mostrar todos
            producto.classList.remove('oculto');
          } else if (producto.dataset.categoria === categoria) {
            // Mostrar solo los de esta categoría
            producto.classList.remove('oculto');
          } else {
            // Ocultar los demás
            producto.classList.add('oculto');
          }
        });
      });
    });
  </script>
</body>
</html>
```

##### **📊 Tabla comparativa de selectores**

| Selector | HTML | JavaScript | Qué selecciona |
|----------|------|------------|----------------|
| ID | `<div id="menu">` | `querySelector('#menu')` | Elemento único por ID |
| Clase | `<div class="card">` | `querySelector('.card')` | Primer elemento con esa clase |
| Etiqueta | `<button>` | `querySelector('button')` | Primer elemento de ese tipo |
| Combinado | `<div class="card">` | `querySelector('div.card')` | Primer div con clase card |
| Descendiente | Ver estructura HTML | `querySelector('#padre .hijo')` | .hijo dentro de #padre |
| Hijo directo | Ver estructura HTML | `querySelector('#padre > .hijo')` | .hijo hijo directo de #padre |
| Atributo | `<input type="email">` | `querySelector('[type="email"]')` | Elemento con ese atributo |
| Data | `<div data-id="5">` | `querySelector('[data-id="5"]')` | Elemento con ese data-* |
| Pseudo-clase | `<li>` (varios) | `querySelector('li:first-child')` | Primer hijo li |

#### `querySelectorAll()` - Para múltiples elementos

```javascript
const elementos = document.querySelectorAll('.miClase');
// Devuelve una NodeList (similar a un array)
```

**Diferencia clave con `querySelector()`:**
```html
<div class="caja">Caja 1</div>
<div class="caja">Caja 2</div>
<div class="caja">Caja 3</div>
```

```javascript
// querySelector - solo devuelve el PRIMERO
const primeraCaja = document.querySelector('.caja');
console.log(primeraCaja);  // <div class="caja">Caja 1</div>

// querySelectorAll - devuelve TODOS
const todasLasCajas = document.querySelectorAll('.caja');
console.log(todasLasCajas);  // NodeList(3) [div.caja, div.caja, div.caja]

// Iterar sobre todos
todasLasCajas.forEach((caja, index) => {
  console.log(`Caja ${index + 1}: ${caja.textContent}`);
});
// Output:
// Caja 1: Caja 1
// Caja 2: Caja 2
// Caja 3: Caja 3
```

**Características importantes de NodeList:**
```javascript
const cajas = document.querySelectorAll('.caja');

// Tiene propiedad length
console.log(cajas.length);  // 3

// Puedes usar forEach
cajas.forEach(caja => {
  caja.style.backgroundColor = 'lightblue';
});

// Puedes convertirlo a array verdadero
const arrayDeCajas = Array.from(cajas);
// O con spread operator
const arrayDeCajas2 = [...cajas];

// ⚠️ NodeList NO es un array completo, no tiene map, filter, reduce
// Pero puedes convertirlo:
const textos = [...cajas].map(caja => caja.textContent);
console.log(textos);  // ["Caja 1", "Caja 2", "Caja 3"]
```

**Ejemplo práctico - Validar formulario:**
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <style>
    .error {
      border: 2px solid red;
    }
    .correcto {
      border: 2px solid green;
    }
  </style>
</head>
<body>
  <form id="formulario">
    <input type="text" class="campo" placeholder="Nombre" required>
    <input type="email" class="campo" placeholder="Email" required>
    <input type="tel" class="campo" placeholder="Teléfono" required>
    <button type="submit">Enviar</button>
  </form>

  <script>
    const formulario = document.querySelector('#formulario');
    
    formulario.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Seleccionar TODOS los campos
      const campos = document.querySelectorAll('.campo');
      let formularioValido = true;
      
      // Validar cada campo
      campos.forEach(campo => {
        if (campo.value.trim() === '') {
          campo.classList.add('error');
          campo.classList.remove('correcto');
          formularioValido = false;
        } else {
          campo.classList.add('correcto');
          campo.classList.remove('error');
        }
      });
      
      if (formularioValido) {
        alert('¡Formulario válido!');
      } else {
        alert('Por favor completa todos los campos');
      }
    });
  </script>
</body>
</html>
```

---
```javascript
const elemento = document.querySelector('#miId');
const clase = document.querySelector('.miClase');
const tag = document.querySelector('button');
```
- ✅ Usa selectores CSS (más flexible)
- ✅ Sintaxis consistente
- ✅ Estándar de la industria
- ⚠️ Solo devuelve el primer elemento encontrado

**🎓 Entendiendo los selectores CSS:**

Los selectores en `querySelector()` funcionan igual que en CSS. Necesitas conocer cómo declarar cada tipo en HTML:

**1️⃣ Selector de ID (`#`)**
```html
<!-- En HTML declaras el ID con el atributo "id" -->
<div id="miId">Contenido</div>
<button id="btnEnviar">Enviar</button>
```
```javascript
// En JavaScript lo seleccionas con #
const elemento = document.querySelector('#miId');
const boton = document.querySelector('#btnEnviar');
```
- Los IDs deben ser **únicos** en la página
- Un elemento solo puede tener **un ID**
- Se usa `#` como prefijo en querySelector

**2️⃣ Selector de Clase (`.`)**
```html
<!-- En HTML declaras la clase con el atributo "class" -->
<div class="miClase">Contenido 1</div>
<div class="miClase destacado">Contenido 2</div>
<p class="texto">Párrafo</p>
```
```javascript
// En JavaScript lo seleccionas con .
const elemento = document.querySelector('.miClase');  // Solo el PRIMERO
const texto = document.querySelector('.texto');
```
- Las clases pueden **repetirse** en múltiples elementos
- Un elemento puede tener **múltiples clases** (separadas por espacios)
- Se usa `.` como prefijo en querySelector
- Si hay varios elementos con la misma clase, querySelector devuelve **solo el primero**

**3️⃣ Selector de Etiqueta (sin prefijo)**
```html
<!-- Las etiquetas HTML no necesitan atributos especiales -->
<button>Botón 1</button>
<button>Botón 2</button>
<p>Párrafo</p>
```
```javascript
// En JavaScript lo seleccionas sin ningún prefijo
const boton = document.querySelector('button');  // Solo el PRIMERO
const parrafo = document.querySelector('p');
```
- Selecciona por el nombre de la etiqueta HTML
- Si hay varios elementos de la misma etiqueta, devuelve **solo el primero**
- No necesita prefijo especial

**🔍 Selectores avanzados (los mismos que en CSS):**
```javascript
// Combinaciones
document.querySelector('div.miClase');        // div que tenga clase miClase
document.querySelector('#contenedor .item'); // .item dentro de #contenedor
document.querySelector('button[type="submit"]'); // button con atributo type="submit"
document.querySelector('.activo:first-child'); // primer hijo con clase activo

// Atributos data-*
document.querySelector('[data-id="123"]');   // elemento con data-id="123"
```

#### `querySelectorAll()` - Para múltiples elementos
```javascript
const elementos = document.querySelectorAll('.miClase');
// Devuelve una NodeList (similar a un array)
```

### Event Listeners - La forma profesional

**❌ NO USES:**
```javascript
boton.onclick = function() { ... }
```

**✅ USA:**
```javascript
boton.addEventListener('click', function() { ... });
// O mejor aún, con arrow functions:
boton.addEventListener('click', () => { ... });
```

**¿Por qué addEventListener es superior?**

**1️⃣ Puedes añadir múltiples listeners al mismo evento**

```javascript
const boton = document.querySelector('#miBoton');

// ❌ Con onclick: solo se ejecuta el ÚLTIMO
boton.onclick = function() {
  console.log('Primera función');
};
boton.onclick = function() {
  console.log('Segunda función'); // ¡Esto SOBRESCRIBE la primera!
};
// Resultado: solo se muestra "Segunda función"

// ✅ Con addEventListener: se ejecutan TODOS
boton.addEventListener('click', function() {
  console.log('Primera función');
});
boton.addEventListener('click', function() {
  console.log('Segunda función');
});
boton.addEventListener('click', function() {
  console.log('Tercera función');
});
// Resultado: se muestran los tres mensajes en orden
```

**Caso práctico de múltiples listeners:**
```javascript
const boton = document.querySelector('#btnComprar');

// Listener 1: Validar stock
boton.addEventListener('click', () => {
  if (stock > 0) {
    console.log('Stock disponible');
  } else {
    alert('Sin stock');
  }
});

// Listener 2: Analytics
boton.addEventListener('click', () => {
  registrarEvento('click_comprar');
});

// Listener 3: Actualizar UI
boton.addEventListener('click', () => {
  actualizarCarrito();
});

// Los 3 se ejecutan cuando haces click
```

**2️⃣ Puedes remover listeners cuando quieras**

```javascript
function manejarClick() {
  console.log('Click!');
}

// Añadir
boton.addEventListener('click', manejarClick);

// Remover cuando ya no lo necesites
boton.removeEventListener('click', manejarClick);

// ❌ Con onclick no puedes hacer esto fácilmente
```

**3️⃣ Es el estándar de la industria**
- Todas las librerías modernas lo usan
- Mejor separación de responsabilidades
- Más control sobre el comportamiento

---

### 🎯 Arrow Functions explicadas

Las **arrow functions** (`=>`) son una forma más corta de escribir funciones en JavaScript moderno.

**Sintaxis tradicional:**
```javascript
// Función tradicional
boton.addEventListener('click', function() {
  console.log('Click!');
});
```

**Arrow function:**
```javascript
// Arrow function
boton.addEventListener('click', () => {
  console.log('Click!');
});
```

**📚 Comparación paso a paso:**

```javascript
// 1. Función tradicional completa
function miFuncion() {
  console.log('Hola');
}

// 2. Función anónima tradicional
boton.addEventListener('click', function() {
  console.log('Hola');
});

// 3. Arrow function (quitamos 'function' y añadimos '=>')
boton.addEventListener('click', () => {
  console.log('Hola');
});

// 4. Si solo hay una línea, puedes omitir las llaves (opcional)
boton.addEventListener('click', () => console.log('Hola'));
```

**Con parámetros:**
```javascript
// Sin parámetros
const saludar = () => {
  console.log('Hola');
};

// Un parámetro (paréntesis opcionales)
const saludar = nombre => {
  console.log(`Hola ${nombre}`);
};

// Múltiples parámetros (paréntesis obligatorios)
const sumar = (a, b) => {
  return a + b;
};

// Return implícito (sin llaves, automáticamente devuelve)
const sumar = (a, b) => a + b;
```

**En event listeners con event object:**

Cuando trabajas con eventos, JavaScript automáticamente crea un **objeto event** (generalmente llamado `e` o `event`) que contiene información sobre lo que acaba de pasar.

```javascript
// Función tradicional
boton.addEventListener('click', function(e) {
  console.log(e.target);
});

// Arrow function equivalente
boton.addEventListener('click', (e) => {
  console.log(e.target);
});

// Con un parámetro puedes omitir paréntesis
boton.addEventListener('click', e => {
  console.log(e.target);
});
```

### 🎓 ¿Qué es el objeto `e` (event)?

El parámetro `e` es un **objeto automático** que JavaScript crea cuando ocurre un evento. Contiene toda la información sobre ese evento.

```javascript
boton.addEventListener('click', (e) => {
  console.log(e); // Event {type: "click", target: button, ...}
});
```

**Propiedades más importantes del objeto event:**

| Propiedad | Descripción | Ejemplo de uso |
|-----------|-------------|----------------|
| `e.target` | El elemento que **recibió el evento** | Saber en qué casilla hiciste click |
| `e.currentTarget` | El elemento que **tiene el listener** | Útil con event delegation |
| `e.type` | Tipo de evento | "click", "keydown", "submit" |
| `e.preventDefault()` | Previene la acción por defecto | Evitar que un form se envíe |
| `e.stopPropagation()` | Detiene la propagación del evento | Evitar que el evento suba al padre |
| `e.key` | Tecla presionada (en eventos de teclado) | "Enter", "Escape", "a" |
| `e.clientX` / `e.clientY` | Posición del mouse | Coordenadas del click |

### 🎯 `e.target` explicado en detalle

`e.target` es **el elemento específico donde ocurrió el evento**.

**Ejemplo visual:**

```html
<div id="contenedor">
  <button id="miBoton">Click aquí</button>
</div>
```

```javascript
const contenedor = document.querySelector('#contenedor');
const boton = document.querySelector('#miBoton');

// Listener en el contenedor
contenedor.addEventListener('click', (e) => {
  console.log('currentTarget:', e.currentTarget); // Siempre: <div id="contenedor">
  console.log('target:', e.target);                // Variable: lo que clickeaste
});

// Si haces click en el botón:
// currentTarget: <div id="contenedor">  (donde está el listener)
// target: <button id="miBoton">         (lo que clickeaste)

// Si haces click en el div (fuera del botón):
// currentTarget: <div id="contenedor">  (donde está el listener)
// target: <div id="contenedor">         (lo que clickeaste)
```

### 📝 Casos prácticos de uso

**1️⃣ Obtener información del elemento clickeado:**

```javascript
const casillas = document.querySelectorAll('.casilla');

casillas.forEach(casilla => {
  casilla.addEventListener('click', (e) => {
    // e.target es la casilla específica que clickeaste
    console.log(e.target.textContent);      // Contenido de la casilla
    console.log(e.target.id);               // ID de la casilla
    console.log(e.target.dataset.index);    // Atributo data-index
  });
});
```

**2️⃣ Prevenir comportamiento por defecto:**

```javascript
const formulario = document.querySelector('form');

formulario.addEventListener('submit', (e) => {
  e.preventDefault(); // ¡Evita que la página se recargue!
  
  // Ahora puedes manejar el envío con JavaScript
  const datos = new FormData(e.target);
  console.log('Formulario enviado:', datos);
});
```

**3️⃣ Detectar teclas presionadas:**

```javascript
const input = document.querySelector('input');

input.addEventListener('keydown', (e) => {
  console.log('Tecla presionada:', e.key);
  
  if (e.key === 'Enter') {
    console.log('¡Presionaste Enter!');
  }
  
  if (e.key === 'Escape') {
    input.value = ''; // Limpiar input
  }
});
```

**4️⃣ Obtener posición del mouse:**

```javascript
document.addEventListener('mousemove', (e) => {
  console.log(`Posición: X=${e.clientX}, Y=${e.clientY}`);
});
```

**5️⃣ Usar e.target vs this:**

```javascript
const botones = document.querySelectorAll('button');

// Con función tradicional: 'this' es el elemento
botones.forEach(boton => {
  boton.addEventListener('click', function(e) {
    console.log(this);       // <button> (el elemento)
    console.log(e.target);   // <button> (el elemento)
    // Ambos son lo mismo en este caso
  });
});

// Con arrow function: 'this' NO es el elemento
botones.forEach(boton => {
  boton.addEventListener('click', (e) => {
    console.log(this);       // Window o el contexto exterior ❌
    console.log(e.target);   // <button> (el elemento) ✅
    // Solo e.target funciona correctamente
  });
});
```

### 🎮 Ejemplo completo: Tres en raya

```javascript
const tablero = document.querySelector('#tablero');
let turno = "X";

tablero.addEventListener('click', (e) => {
  // e.target es el elemento específico que clickeaste
  
  // Verificar que clickeaste una casilla
  if (e.target.classList.contains('casilla')) {
    console.log('Clickeaste en:', e.target);
    console.log('Índice:', e.target.dataset.index);
    console.log('Contenido actual:', e.target.textContent);
    
    // Validar que esté vacía
    if (e.target.textContent === "") {
      e.target.textContent = turno;
      turno = turno === "X" ? "O" : "X";
    }
  }
});
```

### 🔍 e.target vs e.currentTarget - La diferencia clave

**Ejemplo con event delegation:**

```html
<div id="tablero">
  <div class="casilla">X</div>
  <div class="casilla">O</div>
  <div class="casilla"></div>
</div>
```

```javascript
const tablero = document.querySelector('#tablero');

tablero.addEventListener('click', (e) => {
  console.log('currentTarget:', e.currentTarget.id);  // Siempre: "tablero"
  console.log('target:', e.target.className);          // Variable: "casilla"
  
  // currentTarget = donde pusiste el listener (el tablero)
  // target = donde realmente ocurrió el click (la casilla específica)
});
```

**Cuándo usar cada uno:**

- **`e.target`** ✅ - Lo usas casi siempre. Es el elemento específico que fue clickeado/interactuado.
- **`e.currentTarget`** ⚠️ - Lo usas raramente. Solo cuando necesitas acceder al elemento que tiene el listener (útil en event delegation avanzado).

### ⚡ Event listener con múltiples parámetros personalizados

Si necesitas pasar **tus propios parámetros** además del evento:

```javascript
// ❌ ESTO NO FUNCIONA:
boton.addEventListener('click', miFuncion(parametro1, parametro2));
// Se ejecuta inmediatamente, no espera el click

// ✅ SOLUCIÓN 1: Arrow function que llama a tu función
boton.addEventListener('click', (e) => {
  miFuncion(parametro1, parametro2, e);
});

// ✅ SOLUCIÓN 2: Función que retorna otra función (currying)
function crearHandler(parametro1, parametro2) {
  return function(e) {
    console.log(parametro1, parametro2, e);
  };
}
boton.addEventListener('click', crearHandler(valor1, valor2));
```

**Ejemplo práctico:**

```javascript
// Tenemos varios botones que hacen cosas similares pero con diferentes valores
const botones = document.querySelectorAll('.boton-producto');

botones.forEach(boton => {
  const productoId = boton.dataset.productId;
  const precio = boton.dataset.precio;
  
  // Pasamos parámetros personalizados + el evento
  boton.addEventListener('click', (e) => {
    agregarAlCarrito(productoId, precio, e);
  });
});

function agregarAlCarrito(id, precio, evento) {
  console.log(`Producto ${id} agregado por $${precio}`);
  console.log('Botón clickeado:', evento.target);
  evento.target.textContent = '✓ Agregado';
}
```

### 📌 Resumen

- **`e`** (o `event`) es un objeto automático que JavaScript crea con info del evento
- **`e.target`** es el elemento específico donde ocurrió el evento (MUY USADO)
- **`e.currentTarget`** es el elemento que tiene el listener (raramente usado)
- **`e.preventDefault()`** previene la acción por defecto del navegador
- Con **arrow functions** siempre usa `e.target`, nunca `this`
- Para **parámetros personalizados**, envuelve tu función en una arrow function

**⚠️ Diferencia importante: el `this`**

Las arrow functions **NO tienen su propio `this`**, heredan el `this` del contexto donde fueron creadas:

```javascript
// Función tradicional: 'this' es el botón
boton.addEventListener('click', function() {
  console.log(this); // <button>
});

// Arrow function: 'this' es el contexto exterior
boton.addEventListener('click', () => {
  console.log(this); // Window o el objeto padre
});

// Por eso, si necesitas acceder al elemento, usa 'e.target':
boton.addEventListener('click', (e) => {
  console.log(e.target); // <button> ✅
});
```

**🎯 Cuándo usar cada una:**

**Usa arrow functions cuando:**
- ✅ No necesitas acceder a `this` del elemento
- ✅ Quieres código más corto y limpio
- ✅ Es el estándar moderno

**Usa funciones tradicionales cuando:**
- ⚠️ Necesitas acceder a `this` del elemento
- ⚠️ Trabajas con código muy antiguo

**Recomendación:** En este curso usaremos **arrow functions** porque son el estándar actual de JavaScript.

---

## 🎯 EJERCICIO 1 — Cambiar una imagen al hacer clic

### Objetivo
Aprender a seleccionar elementos con `querySelector` y modificar atributos.

### Lo que tienes que conseguir
- Se ve una imagen
- Al pulsar el botón, la imagen cambia a otra

### Conceptos clave
- **Selección de elementos**: `querySelector()`
- **Modificación de atributos**: `elemento.src`
- **Event Listeners**: `addEventListener('click', ...)`

### Código Base

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Ejercicio 1 - Cambiar Imagen</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      text-align: center;
    }
    
    img {
      border: 2px solid #333;
      border-radius: 8px;
      margin: 20px 0;
    }
    
    button {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
    }
    
    button:hover {
      background-color: #45a049;
    }
  </style>
</head>
<body>

  <h1>Ejercicio 1 - Cambiar Imagen</h1>
  
  <!-- Placeholder de imagen: usamos picsum.photos para imágenes aleatorias -->
  <img id="foto" 
       src="https://picsum.photos/300/200?random=1" 
       alt="Imagen inicial" 
       width="300">

  <br>
  <button id="btnCambiar">Cambiar Imagen</button>

  <script>
    // 1) Seleccionar elementos con querySelector
    // COMPLETA AQUÍ:
    // const img = ...
    // const btn = ...

    // 2) Añadir event listener
    // COMPLETA AQUÍ:
    // btn.addEventListener('click', () => {
    //   img.src = "https://picsum.photos/300/200?random=2";
    // });
  </script>

</body>
</html>
```

### 💡 Pistas
1. Usa `document.querySelector('#foto')` para seleccionar la imagen
2. Usa `document.querySelector('#btnCambiar')` para seleccionar el botón
3. Añade un `addEventListener` al botón
4. Dentro del listener, cambia `img.src` a una nueva URL

---

## 🎯 EJERCICIO 2 — Caja que muestra "X" al hacer clic

### Objetivo
Aprender a modificar el contenido de texto con `textContent`.

### Lo que tienes que conseguir
- Una caja vacía
- Al hacer clic en la caja, aparece una X centrada

### Conceptos clave
- **textContent vs innerText vs innerHTML**:
  - `textContent`: ✅ Más rápido, seguro, estándar moderno
  - `innerText`: Respeta el CSS, más lento
  - `innerHTML`: ⚠️ Puede ser peligroso (XSS), solo para HTML

### Código Base

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Ejercicio 2 - Caja X</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }
    
    .caja {
      width: 100px;
      height: 100px;
      border: 2px solid #333;
      border-radius: 8px;
      
      /* Centrar texto */
      display: flex;
      justify-content: center;
      align-items: center;
      
      font-size: 40px;
      font-weight: bold;
      cursor: pointer;
      user-select: none;
      transition: background-color 0.3s;
    }
    
    .caja:hover {
      background-color: #f0f0f0;
    }
  </style>
</head>
<body>

  <h1>Ejercicio 2 - Caja que muestra X</h1>
  <p>Haz clic en la caja</p>
  
  <div id="caja" class="caja"></div>

  <script>
    // 1) Seleccionar la caja
    // COMPLETA AQUÍ:
    // const caja = ...

    // 2) Añadir event listener
    // COMPLETA AQUÍ:
    // caja.addEventListener('click', () => {
    //   caja.textContent = "X";
    // });
  </script>

</body>
</html>
```

### 💡 Pistas
1. Usa `querySelector` con la clase `.caja` o el id `#caja`
2. Usa `textContent` en lugar de `innerText` (mejor práctica)
3. Añade un `addEventListener` con el evento 'click'

---

## 🎯 EJERCICIO 3 — Alternar X y O (turnos)

### Objetivo
Aprender a mantener estado con variables y usar condicionales.

### Lo que tienes que conseguir
- Primer clic → X
- Segundo clic → O
- Tercero → X, etc.

### Conceptos clave
- **Variables de estado**: Mantener información entre clicks
- **Operador ternario**: `condición ? valorSi : valorNo`
- **Toggle de valores**: Alternar entre dos estados

### Código Base

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Ejercicio 3 - Alternar X y O</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }
    
    .caja {
      width: 100px;
      height: 100px;
      border: 2px solid #333;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 40px;
      font-weight: bold;
      cursor: pointer;
      user-select: none;
      transition: all 0.3s;
    }
    
    .caja:hover {
      background-color: #f0f0f0;
      transform: scale(1.05);
    }
    
    .info {
      margin-top: 20px;
      padding: 10px;
      background-color: #e3f2fd;
      border-radius: 4px;
    }
  </style>
</head>
<body>

  <h1>Ejercicio 3 - Alternar Turnos</h1>
  <div class="info">Turno actual: <strong id="turnoActual">X</strong></div>
  
  <div id="caja" class="caja"></div>

  <script>
    // 1) Variable de estado para el turno
    // COMPLETA AQUÍ:
    // let turno = "X";

    // 2) Seleccionar elementos
    // const caja = ...
    // const turnoActual = document.querySelector('#turnoActual');

    // 3) Añadir event listener
    // caja.addEventListener('click', () => {
    //   // Escribir el turno actual
    //   caja.textContent = turno;
    //   
    //   // Cambiar turno (usando operador ternario)
    //   turno = turno === "X" ? "O" : "X";
    //   
    //   // Actualizar indicador de turno
    //   turnoActual.textContent = turno;
    // });
  </script>

</body>
</html>
```

### 💡 Pistas
1. Declara una variable `let turno = "X"` fuera del event listener
2. Dentro del listener: primero escribe el turno actual
3. Luego cambia el turno: `turno = turno === "X" ? "O" : "X"`
4. Bonus: actualiza el indicador de turno en la UI

---

## 🎯 EJERCICIO 4 — Bloquear la casilla (validación)

### Objetivo
Aprender a validar estados antes de modificar el DOM.

### Lo que tienes que conseguir
- Si la caja está vacía → permite poner X/O
- Si ya tiene algo → NO deja cambiarlo

### Conceptos clave
- **Validación de estado**: Comprobar antes de actuar
- **Guard clauses**: Usar `return` para salir temprano
- **Manejo de clases CSS**: `classList.add()`, `classList.remove()`

### Código Base

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Ejercicio 4 - Bloquear Casilla</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }
    
    .caja {
      width: 100px;
      height: 100px;
      border: 2px solid #333;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 40px;
      font-weight: bold;
      cursor: pointer;
      user-select: none;
      transition: all 0.3s;
    }
    
    .caja:hover {
      background-color: #f0f0f0;
      transform: scale(1.05);
    }
    
    /* Clase para casillas bloqueadas */
    .bloqueada {
      cursor: not-allowed;
      opacity: 0.6;
    }
    
    .bloqueada:hover {
      background-color: transparent;
      transform: none;
    }
    
    .info {
      margin-top: 20px;
      padding: 10px;
      background-color: #e3f2fd;
      border-radius: 4px;
    }
  </style>
</head>
<body>

  <h1>Ejercicio 4 - Validación</h1>
  <div class="info">Turno: <strong id="turnoActual">X</strong></div>
  
  <div id="caja" class="caja"></div>

  <script>
    // COMPLETA AQUÍ:
    // let turno = "X";
    // const caja = document.querySelector('#caja');
    // const turnoActual = document.querySelector('#turnoActual');

    // caja.addEventListener('click', () => {
    //   // Guard clause: si está ocupada, salir
    //   if (caja.textContent !== "") {
    //     return; // Sale de la función
    //   }
    //   
    //   // Si llegamos aquí, la casilla está vacía
    //   caja.textContent = turno;
    //   caja.classList.add('bloqueada'); // Añadir clase visual
    //   
    //   // Cambiar turno
    //   turno = turno === "X" ? "O" : "X";
    //   turnoActual.textContent = turno;
    // });
  </script>

</body>
</html>
```

### 💡 Pistas
1. Usa una **guard clause**: `if (caja.textContent !== "") return;`
2. Si la casilla está vacía, ejecuta el código normal
3. Añade la clase `bloqueada` con `classList.add('bloqueada')`
4. Las guard clauses hacen el código más legible

---

## 🎯 EJERCICIO 5 — Tablero 1×3 (Paso intermedio)

### Objetivo
Crear un mini-tablero con 3 casillas en fila antes de hacer el tablero completo 3×3.

### Lo que tienes que conseguir
- 3 casillas en línea horizontal
- Turnos alternos X y O
- Cada casilla se bloquea al usarse
- **Novedad**: Usar una función reutilizable para todas las casillas

### Conceptos clave
- **Funciones reutilizables**: Crear una función que sirva para múltiples elementos
- **Pasar parámetros a funciones**: `jugar(elemento)`
- **DRY (Don't Repeat Yourself)**: No repetir código

### Teoría: ¿Por qué usar funciones reutilizables?

**❌ Código repetitivo (malo):**
```javascript
const casilla1 = document.querySelector('#c1');
const casilla2 = document.querySelector('#c2');
const casilla3 = document.querySelector('#c3');

casilla1.addEventListener('click', () => {
  if (casilla1.textContent === "") {
    casilla1.textContent = turno;
    turno = turno === "X" ? "O" : "X";
  }
});

casilla2.addEventListener('click', () => {
  if (casilla2.textContent === "") {
    casilla2.textContent = turno;
    turno = turno === "X" ? "O" : "X";
  }
});

casilla3.addEventListener('click', () => {
  if (casilla3.textContent === "") {
    casilla3.textContent = turno;
    turno = turno === "X" ? "O" : "X";
  }
});
// ¡Estamos repitiendo el mismo código 3 veces! 😱
```

**✅ Con función reutilizable (bueno):**
```javascript
function jugar(casilla) {
  if (casilla.textContent === "") {
    casilla.textContent = turno;
    turno = turno === "X" ? "O" : "X";
  }
}

const casilla1 = document.querySelector('#c1');
const casilla2 = document.querySelector('#c2');
const casilla3 = document.querySelector('#c3');

casilla1.addEventListener('click', () => jugar(casilla1));
casilla2.addEventListener('click', () => jugar(casilla2));
casilla3.addEventListener('click', () => jugar(casilla3));
// ¡Mucho más limpio! El código de jugar está en UN solo lugar
```

### Código Base

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Ejercicio 5 - Tablero 1x3</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }
    
    h1 {
      color: white;
      margin-bottom: 20px;
    }
    
    .info {
      background: white;
      padding: 15px 30px;
      border-radius: 8px;
      margin-bottom: 20px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .tablero {
      display: flex;
      gap: 5px;
      background-color: #333;
      padding: 5px;
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    
    .casilla {
      width: 100px;
      height: 100px;
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 48px;
      font-weight: bold;
      cursor: pointer;
      user-select: none;
      transition: all 0.3s;
      border-radius: 4px;
    }
    
    .casilla:hover:not(.ocupada) {
      background-color: #f0f0f0;
      transform: scale(1.05);
    }
    
    .casilla.ocupada {
      cursor: not-allowed;
    }
    
    .x {
      color: #e74c3c;
    }
    
    .o {
      color: #3498db;
    }
    
    button {
      margin-top: 20px;
      padding: 10px 30px;
      font-size: 16px;
      background: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: all 0.3s;
    }
    
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    }
  </style>
</head>
<body>

  <h1>🎮 Mini Tres en Raya - 1×3</h1>
  
  <div class="info">
    Turno: <strong id="turnoActual">X</strong>
  </div>

  <div class="tablero">
    <div id="c0" class="casilla"></div>
    <div id="c1" class="casilla"></div>
    <div id="c2" class="casilla"></div>
  </div>

  <button id="btnReiniciar">Reiniciar</button>

  <script>
    // COMPLETA AQUÍ:
    
    // 1) Variable de turno global
    // let turno = "X";

    // 2) Seleccionar elementos
    // const turnoActual = document.querySelector('#turnoActual');
    // const btnReiniciar = document.querySelector('#btnReiniciar');

    // 3) Función reutilizable para jugar
    // Esta función puede usarse con CUALQUIER casilla
    // function jugar(casilla) {
    //   // Guard clause: si está ocupada, salir
    //   if (casilla.textContent !== "") {
    //     return;
    //   }
    //   
    //   // Escribir turno
    //   casilla.textContent = turno;
    //   casilla.classList.add('ocupada');
    //   casilla.classList.add(turno.toLowerCase()); // clase x u o
    //   
    //   // Cambiar turno
    //   turno = turno === "X" ? "O" : "X";
    //   turnoActual.textContent = turno;
    // }

    // 4) Seleccionar las 3 casillas y añadir listeners
    // const casilla0 = document.querySelector('#c0');
    // const casilla1 = document.querySelector('#c1');
    // const casilla2 = document.querySelector('#c2');

    // casilla0.addEventListener('click', () => jugar(casilla0));
    // casilla1.addEventListener('click', () => jugar(casilla1));
    // casilla2.addEventListener('click', () => jugar(casilla2));

    // 5) Función para reiniciar
    // function reiniciar() {
    //   const casillas = document.querySelectorAll('.casilla');
    //   casillas.forEach(casilla => {
    //     casilla.textContent = "";
    //     casilla.classList.remove('ocupada', 'x', 'o');
    //   });
    //   turno = "X";
    //   turnoActual.textContent = turno;
    // }

    // btnReiniciar.addEventListener('click', reiniciar);
  </script>

</body>
</html>
```

### 💡 Pistas

1. **Función reutilizable**: La función `jugar()` recibe una casilla como parámetro y funciona con cualquiera

2. **Arrow function en el listener**: 
   ```javascript
   casilla0.addEventListener('click', () => jugar(casilla0));
   ```
   - La arrow function `() => jugar(casilla0)` crea una función que **llama a jugar()** pasándole la casilla
   - Es como decir: "cuando hagas click, ejecuta jugar con casilla0"

3. **querySelectorAll y forEach**: Para reiniciar, usamos `querySelectorAll` que devuelve TODAS las casillas, y luego `forEach` para iterar sobre ellas

4. **classList.remove con múltiples clases**: Puedes pasar varias clases separadas por comas

### 🎓 Ventajas de este enfoque

- ✅ **Menos código**: La lógica de jugar está en un solo lugar
- ✅ **Más fácil de mantener**: Si necesitas cambiar algo, lo cambias en un solo sitio
- ✅ **Escalable**: Fácil de expandir a 9 casillas (siguiente ejercicio)
- ✅ **Reutilizable**: La función `jugar()` puede usarse con cualquier casilla

---

## 🎯 EJERCICIO 6 — Tablero 3×3 con Event Delegation

### Objetivo
Crear un tablero completo de tres en raya usando event delegation (un solo listener para todas las casillas).

### Lo que tienes que conseguir
- Tablero 3×3 visible
- Turnos alternos entre X y O
- Las casillas se bloquean al usarse
- **Novedad**: Usar event delegation en lugar de 9 listeners

### Conceptos clave
- **Event Delegation**: Técnica avanzada de usar un solo listener en el padre
- **e.target**: Identificar qué elemento específico fue clickeado
- **Escalabilidad**: Código que funciona sin importar cuántas casillas haya

### Teoría: Event Delegation

**Event delegation** es una técnica donde en lugar de poner un listener en cada elemento hijo, pones UN SOLO listener en el elemento padre.

**❌ Sin event delegation (9 listeners):**
```javascript
const casilla0 = document.querySelector('#c0');
const casilla1 = document.querySelector('#c1');
// ... 7 más

casilla0.addEventListener('click', () => jugar(casilla0));
casilla1.addEventListener('click', () => jugar(casilla1));
// ... 7 más
// Total: 9 event listeners en memoria
```

**✅ Con event delegation (1 listener):**
```javascript
const tablero = document.querySelector('#tablero');

tablero.addEventListener('click', (e) => {
  // e.target es el elemento que fue clickeado
  if (e.target.classList.contains('casilla')) {
    jugar(e.target);
  }
});
// Total: 1 solo event listener en memoria
```

**¿Cómo funciona?**

Cuando haces click en una casilla, el evento "burbujea" hacia arriba:
```
Casilla (donde clickeas)
   ↓
Tablero (donde está el listener) ← Aquí lo capturamos
   ↓
Body
   ↓
HTML
```

**Ventajas del event delegation:**
- ⚡ **Más eficiente**: Menos memoria (1 listener vs muchos)
- 🔧 **Más fácil de mantener**: Código centralizado
- 📈 **Escalable**: Funciona igual con 9 o 900 casillas
- 🎯 **Dinámico**: Funciona con elementos añadidos después

### Código Base

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Ejercicio 6 - Tablero 3x3</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }
    
    h1 {
      color: white;
      margin-bottom: 20px;
    }
    
    .info {
      background: white;
      padding: 15px 30px;
      border-radius: 8px;
      margin-bottom: 20px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .tablero {
      display: grid;
      grid-template-columns: repeat(3, 100px);
      grid-template-rows: repeat(3, 100px);
      gap: 5px;
      background-color: #333;
      padding: 5px;
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    
    .casilla {
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 48px;
      font-weight: bold;
      cursor: pointer;
      user-select: none;
      transition: all 0.3s;
    }
    
    .casilla:hover:not(.ocupada) {
      background-color: #f0f0f0;
      transform: scale(1.05);
    }
    
    .casilla.ocupada {
      cursor: not-allowed;
    }
    
    .x {
      color: #e74c3c;
    }
    
    .o {
      color: #3498db;
    }
    
    button {
      margin-top: 20px;
      padding: 10px 30px;
      font-size: 16px;
      background: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: all 0.3s;
    }
    
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    }
  </style>
</head>
<body>

  <h1>🎮 Tres en Raya - Tablero Base</h1>
  
  <div class="info">
    Turno: <strong id="turnoActual">X</strong>
  </div>

  <div class="tablero" id="tablero">
    <!-- Usamos data-index para identificar cada casilla -->
    <div class="casilla" data-index="0"></div>
    <div class="casilla" data-index="1"></div>
    <div class="casilla" data-index="2"></div>
    <div class="casilla" data-index="3"></div>
    <div class="casilla" data-index="4"></div>
    <div class="casilla" data-index="5"></div>
    <div class="casilla" data-index="6"></div>
    <div class="casilla" data-index="7"></div>
    <div class="casilla" data-index="8"></div>
  </div>

  <button id="btnReiniciar">Reiniciar Juego</button>

  <script>
    // COMPLETA AQUÍ:
    
    // 1) Estado del juego
    // let turno = "X";
    // const tablero = document.querySelector('#tablero');
    // const turnoActual = document.querySelector('#turnoActual');
    // const btnReiniciar = document.querySelector('#btnReiniciar');

    // 2) Función para jugar en una casilla
    // function jugar(casilla) {
    //   // Guard clause: si está ocupada, salir
    //   if (casilla.textContent !== "") {
    //     return;
    //   }
    //   
    //   // Escribir turno
    //   casilla.textContent = turno;
    //   casilla.classList.add('ocupada');
    //   casilla.classList.add(turno.toLowerCase()); // Añadir clase x u o
    //   
    //   // Cambiar turno
    //   turno = turno === "X" ? "O" : "X";
    //   turnoActual.textContent = turno;
    // }

    // 3) Event delegation: un solo listener en el tablero
    // tablero.addEventListener('click', (e) => {
    //   // Verificar que se hizo clic en una casilla
    //   if (e.target.classList.contains('casilla')) {
    //     jugar(e.target);
    //   }
    // });

    // 4) Función para reiniciar
    // function reiniciar() {
    //   const casillas = document.querySelectorAll('.casilla');
    //   casillas.forEach(casilla => {
    //     casilla.textContent = "";
    //     casilla.classList.remove('ocupada', 'x', 'o');
    //   });
    //   turno = "X";
    //   turnoActual.textContent = turno;
    // }

    // btnReiniciar.addEventListener('click', reiniciar);
  </script>

</body>
</html>
```

### 💡 Pistas

1. **Event delegation**: Un solo listener en `#tablero` en lugar de 9 listeners
2. **e.target**: Es el elemento que recibió el click (la casilla específica)
3. **classList.contains('casilla')**: Verifica que clickeaste una casilla y no el tablero
4. **data-index**: Atributo útil si necesitas identificar cada casilla por su posición
5. **forEach()**: Perfecto para iterar sobre querySelectorAll en la función reiniciar

### 🎓 Event Delegation explicado en detalle

**Flujo del evento:**

```javascript
tablero.addEventListener('click', (e) => {
  // 1. El usuario hace click en una casilla
  // 2. El evento "burbujea" hasta el tablero
  // 3. e.target contiene la casilla específica que fue clickeada
  // 4. e.currentTarget contiene el tablero (donde está el listener)
  
  console.log('Clickeaste en:', e.target);           // <div class="casilla">
  console.log('El listener está en:', e.currentTarget); // <div id="tablero">
  
  // Verificamos que sea una casilla
  if (e.target.classList.contains('casilla')) {
    // Ahora sabemos con seguridad que es una casilla
    jugar(e.target);
  }
});
```

**¿Qué pasa si clickeas el espacio entre casillas?**

```javascript
tablero.addEventListener('click', (e) => {
  if (e.target.classList.contains('casilla')) {
    console.log('✅ Casilla clickeada');
  } else {
    console.log('❌ Clickeaste el tablero, no una casilla');
    // No hacemos nada
  }
});
```

### 🔄 Comparación completa

**Sin event delegation:**
```javascript
// Muchas líneas de código repetitivo
const c0 = document.querySelector('[data-index="0"]');
const c1 = document.querySelector('[data-index="1"]');
const c2 = document.querySelector('[data-index="2"]');
const c3 = document.querySelector('[data-index="3"]');
const c4 = document.querySelector('[data-index="4"]');
const c5 = document.querySelector('[data-index="5"]');
const c6 = document.querySelector('[data-index="6"]');
const c7 = document.querySelector('[data-index="7"]');
const c8 = document.querySelector('[data-index="8"]');

c0.addEventListener('click', () => jugar(c0));
c1.addEventListener('click', () => jugar(c1));
c2.addEventListener('click', () => jugar(c2));
c3.addEventListener('click', () => jugar(c3));
c4.addEventListener('click', () => jugar(c4));
c5.addEventListener('click', () => jugar(c5));
c6.addEventListener('click', () => jugar(c6));
c7.addEventListener('click', () => jugar(c7));
c8.addEventListener('click', () => jugar(c8));
// 9 event listeners en memoria
```

**Con event delegation:**
```javascript
const tablero = document.querySelector('#tablero');

tablero.addEventListener('click', (e) => {
  if (e.target.classList.contains('casilla')) {
    jugar(e.target);
  }
});
// 1 solo event listener en memoria
```

### 🎯 Ventajas en el mundo real

**1. Listas dinámicas:**
```javascript
// Funciona con elementos que añades después
const lista = document.querySelector('#lista');

lista.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    e.target.remove(); // Eliminar elemento de la lista
  }
});

// Añadir nuevos elementos - ¡el listener ya funciona con ellos!
const nuevoItem = document.createElement('li');
nuevoItem.textContent = 'Nuevo item';
lista.appendChild(nuevoItem);
```

**2. Tablas grandes:**
```javascript
// Una tabla con 1000 filas - solo necesitas 1 listener
const tabla = document.querySelector('table');

tabla.addEventListener('click', (e) => {
  if (e.target.tagName === 'TD') {
    console.log('Celda clickeada:', e.target.textContent);
  }
});
```

**3. Menús con submenús:**
```javascript
const menu = document.querySelector('#menu');

menu.addEventListener('click', (e) => {
  // Detectar diferentes tipos de elementos
  if (e.target.matches('.menu-item')) {
    // Manejar item normal
  } else if (e.target.matches('.submenu-toggle')) {
    // Manejar toggle de submenú
  }
});
```

---




## 🎯 EJERCICIO 7 — Tres en Raya Completo (CON LÓGICA DE VICTORIA)

### Objetivo
Implementar la lógica completa de victoria del tres en raya.

### Lo que tienes que conseguir
- Todo lo del ejercicio 6
- Detectar cuando hay un ganador
- Mostrar mensaje de victoria
- Bloquear el juego cuando termine
- Bonus: Detectar empates

### Conceptos clave
- **Arrays de combinaciones ganadoras**
- **Algoritmos de verificación**
- **Gestión de estados del juego**

### Código Base

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Tres en Raya Completo</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }
    
    h1 {
      color: white;
      margin-bottom: 20px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    
    .info {
      background: white;
      padding: 15px 30px;
      border-radius: 8px;
      margin-bottom: 20px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      min-width: 250px;
      text-align: center;
    }
    
    .tablero {
      display: grid;
      grid-template-columns: repeat(3, 120px);
      grid-template-rows: repeat(3, 120px);
      gap: 8px;
      background-color: #2c3e50;
      padding: 8px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    
    .casilla {
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 64px;
      font-weight: bold;
      cursor: pointer;
      user-select: none;
      transition: all 0.3s;
      border-radius: 4px;
    }
    
    .casilla:hover:not(.ocupada) {
      background-color: #ecf0f1;
      transform: scale(1.05);
    }
    
    .casilla.ocupada {
      cursor: not-allowed;
    }
    
    .x {
      color: #e74c3c;
      animation: aparece 0.3s ease-out;
    }
    
    .o {
      color: #3498db;
      animation: aparece 0.3s ease-out;
    }
    
    @keyframes aparece {
      from {
        transform: scale(0);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }
    
    .ganadora {
      background-color: #2ecc71 !important;
      animation: victoria 0.6s ease-in-out;
    }
    
    @keyframes victoria {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    
    .controles {
      margin-top: 20px;
      display: flex;
      gap: 10px;
    }
    
    button {
      padding: 12px 24px;
      font-size: 16px;
      background: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: all 0.3s;
      font-weight: 600;
    }
    
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    }
    
    button:active {
      transform: translateY(0);
    }
    
    .mensaje {
      background: white;
      padding: 20px 40px;
      border-radius: 8px;
      margin-top: 20px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      font-size: 20px;
      font-weight: bold;
      display: none;
    }
    
    .mensaje.visible {
      display: block;
      animation: aparece 0.5s ease-out;
    }
    
    .mensaje.victoria {
      color: #27ae60;
    }
    
    .mensaje.empate {
      color: #f39c12;
    }
  </style>
</head>
<body>

  <h1>🎮 Tres en Raya</h1>
  
  <div class="info">
    Turno: <strong id="turnoActual">X</strong>
  </div>

  <div class="tablero" id="tablero">
    <div class="casilla" data-index="0"></div>
    <div class="casilla" data-index="1"></div>
    <div class="casilla" data-index="2"></div>
    <div class="casilla" data-index="3"></div>
    <div class="casilla" data-index="4"></div>
    <div class="casilla" data-index="5"></div>
    <div class="casilla" data-index="6"></div>
    <div class="casilla" data-index="7"></div>
    <div class="casilla" data-index="8"></div>
  </div>

  <div class="controles">
    <button id="btnReiniciar">🔄 Reiniciar</button>
  </div>

  <div id="mensaje" class="mensaje"></div>

  <script>
    // COMPLETA AQUÍ:
    
    // ========== CONFIGURACIÓN ==========
    // Todas las combinaciones ganadoras posibles
    const COMBINACIONES_GANADORAS = [
      [0, 1, 2], // Fila superior
      [3, 4, 5], // Fila media
      [6, 7, 8], // Fila inferior
      [0, 3, 6], // Columna izquierda
      [1, 4, 7], // Columna media
      [2, 5, 8], // Columna derecha
      [0, 4, 8], // Diagonal \
      [2, 4, 6]  // Diagonal /
    ];

    // ========== ESTADO DEL JUEGO ==========
    // let turno = "X";
    // let juegoActivo = true;
    // const casillas = document.querySelectorAll('.casilla');
    // const tablero = document.querySelector('#tablero');
    // const turnoActual = document.querySelector('#turnoActual');
    // const btnReiniciar = document.querySelector('#btnReiniciar');
    // const mensaje = document.querySelector('#mensaje');

    // ========== FUNCIONES PRINCIPALES ==========

    // Función para verificar si hay un ganador
    // function verificarVictoria() {
    //   for (const combinacion of COMBINACIONES_GANADORAS) {
    //     const [a, b, c] = combinacion;
    //     const casilla1 = casillas[a].textContent;
    //     const casilla2 = casillas[b].textContent;
    //     const casilla3 = casillas[c].textContent;
    //     
    //     // Si las 3 casillas tienen el mismo símbolo y no están vacías
    //     if (casilla1 && casilla1 === casilla2 && casilla1 === casilla3) {
    //       return {
    //         ganador: casilla1,
    //         combinacion: combinacion
    //       };
    //     }
    //   }
    //   return null;
    // }

    // Función para verificar empate
    // function verificarEmpate() {
    //   return Array.from(casillas).every(casilla => casilla.textContent !== "");
    // }

    // Función para mostrar ganador
    // function mostrarGanador(ganador, combinacion) {
    //   juegoActivo = false;
    //   
    //   // Resaltar casillas ganadoras
    //   combinacion.forEach(index => {
    //     casillas[index].classList.add('ganadora');
    //   });
    //   
    //   // Mostrar mensaje
    //   mensaje.textContent = `🎉 ¡${ganador} ha ganado!`;
    //   mensaje.classList.add('visible', 'victoria');
    // }

    // Función para mostrar empate
    // function mostrarEmpate() {
    //   juegoActivo = false;
    //   mensaje.textContent = "😐 ¡Empate!";
    //   mensaje.classList.add('visible', 'empate');
    // }

    // Función para jugar
    // function jugar(casilla) {
    //   // Guard clauses
    //   if (!juegoActivo) return;
    //   if (casilla.textContent !== "") return;
    //   
    //   // Escribir turno
    //   casilla.textContent = turno;
    //   casilla.classList.add('ocupada', turno.toLowerCase());
    //   
    //   // Verificar victoria
    //   const resultado = verificarVictoria();
    //   if (resultado) {
    //     mostrarGanador(resultado.ganador, resultado.combinacion);
    //     return;
    //   }
    //   
    //   // Verificar empate
    //   if (verificarEmpate()) {
    //     mostrarEmpate();
    //     return;
    //   }
    //   
    //   // Cambiar turno
    //   turno = turno === "X" ? "O" : "X";
    //   turnoActual.textContent = turno;
    // }

    // Función para reiniciar
    // function reiniciar() {
    //   casillas.forEach(casilla => {
    //     casilla.textContent = "";
    //     casilla.classList.remove('ocupada', 'x', 'o', 'ganadora');
    //   });
    //   
    //   turno = "X";
    //   juegoActivo = true;
    //   turnoActual.textContent = turno;
    //   mensaje.classList.remove('visible', 'victoria', 'empate');
    // }

    // ========== EVENT LISTENERS ==========
    // tablero.addEventListener('click', (e) => {
    //   if (e.target.classList.contains('casilla')) {
    //     jugar(e.target);
    //   }
    // });

    // btnReiniciar.addEventListener('click', reiniciar);
  </script>

</body>
</html>
```

### 💡 Pistas

1. **Verificar victoria**: Itera sobre `COMBINACIONES_GANADORAS` y comprueba si las 3 casillas de cada combinación tienen el mismo valor

2. **Verificar empate**: Usa `Array.from(casillas).every()` para verificar que todas las casillas están ocupadas

3. **Estado del juego**: La variable `juegoActivo` previene movimientos después de terminar

4. **Destructuring**: `const [a, b, c] = combinacion` es más limpio que `combinacion[0], combinacion[1], combinacion[2]`

5. **Early returns**: Usa `return` después de detectar victoria o empate para salir de la función

---

## 📝 Resumen de Conceptos Aprendidos

### Selección de elementos
- ✅ `querySelector()` - Elemento único con selectores CSS
- ✅ `querySelectorAll()` - Múltiples elementos
- ✅ Selectores por ID (`#`), clase (`.`), y etiqueta
- ✅ Selectores avanzados y combinaciones

### Manipulación del DOM
- ✅ `textContent` - Modificar texto de forma segura
- ✅ `classList.add/remove/toggle` - Gestionar clases CSS
- ✅ `dataset` - Atributos data-* para metadatos
- ✅ Modificar atributos (src, href, etc.)

### Eventos
- ✅ `addEventListener()` - La forma profesional de manejar eventos
- ✅ Múltiples listeners en el mismo evento
- ✅ Event delegation - Un listener para muchos elementos
- ✅ Event object (`e.target`) - Información del evento
- ✅ Arrow functions (`=>`) - Sintaxis moderna

### Animaciones y transiciones
- ✅ Transiciones CSS con `transition`
- ✅ Animaciones con `@keyframes`
- ✅ Intersection Observer API - Detectar visibilidad eficientemente
- ✅ Manipular clases para activar animaciones

### Buenas prácticas
- ✅ Guard clauses - Validar antes de actuar
- ✅ Funciones reutilizables - DRY (Don't Repeat Yourself)
- ✅ Separación de responsabilidades
- ✅ Código limpio y legible
- ✅ Usar const para selectores que no cambian
- ✅ Arrow functions como estándar moderno

### Estructura de un proyecto
- ✅ HTML semántico y bien estructurado
- ✅ CSS con Flexbox y Grid
- ✅ JavaScript modular con funciones
- ✅ Comentarios claros y descriptivos

---

## 🚀 Siguientes pasos

Ahora que dominas los fundamentos, puedes:

1. **Añadir IA al tres en raya**: Implementar un oponente automático
2. **Mejorar la UI**: Añadir más animaciones y efectos
3. **Guardar puntuaciones**: Usar `localStorage`
4. **Modo multijugador**: WebSockets para jugar online
5. **Responsive design**: Adaptar a móviles

---

## 📚 Recursos adicionales

- [MDN - Document Object Model](https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model)
- [MDN - Introduction to events](https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Events)
- [MDN - Intersection Observer API](https://developer.mozilla.org/es/docs/Web/API/Intersection_Observer_API)
- [JavaScript.info - Browser environment](https://javascript.info/browser-environment)

---

**¡Felicidades por completar las prácticas! 🎉**
