# Cómo editar rebebcr.com (desde GitHub)

Todo el contenido del sitio está en la carpeta **`content/`**. Cuando usted guarda un cambio en GitHub, el sitio se publica solo en 1–2 minutos.

| Archivo | Qué contiene |
|---|---|
| `content/inicio.json` | La página principal, sección por sección, en el mismo orden en que se ven. |
| `content/ajustes.json` | Menú, botón «Contacto», logo, redes sociales, pie de página y códigos de seguimiento. |
| `content/paginas/` | Páginas nuevas. Cada archivo es una página: `talleres.json` → rebebcr.com/talleres/ |
| `assets/` | Fotos y videos. |

## Cambiar un texto
1. Entre a **github.com/Rebebcr/rebe-site** (con su cuenta de GitHub).
2. Abra la carpeta `content` y el archivo (por ejemplo `inicio.json`).
3. Toque el **lápiz** ✏️ (arriba a la derecha, «Edit this file»).
4. Busque el texto con **Ctrl + F** y cámbielo. **Solo cambie lo que está entre comillas** después de los dos puntos:
   `"titulo": "Agendemos una conversación",` → cambie solo *Agendemos una conversación*.
5. Toque **Commit changes…** (botón verde) y luego **Commit changes** otra vez.

**Reglas para no romper nada**
- No borre las comillas `"`, las comas `,`, las llaves `{ }` ni los corchetes `[ ]`.
- Si necesita comillas dentro de un texto, use las angulares «así» (no `"`).
- En los títulos, `*entre asteriscos*` pone palabras en cursiva dorada.
- Los textos largos tienen etiquetas como `<p>…</p>` (párrafo), `<strong>…</strong>` (negrita), `<em>…</em>` (cursiva), `<a href="https://…">…</a>` (enlace). Escriba dentro de ellas.

**¿Cómo sé que se publicó?** En la página principal del proyecto en GitHub, al lado de su cambio aparece un ✅ verde (publicado) o una ❌ roja (hubo un error). Si hay error, **el sitio publicado no cambia**: toque la ❌ → *Details* y verá un mensaje que dice en qué archivo y en qué línea revisar. Arréglelo y guarde de nuevo.

## Cambiar o agregar una foto o video
1. Abra la carpeta `assets` → **Add file** → **Upload files** → arrastre la foto → **Commit changes**.
   Use nombres simples sin espacios ni tildes: `rebe-conferencia-2027.jpg`.
2. En el archivo de contenido, cambie la ruta: `"imagen": "/assets/rebe-conferencia-2027.jpg",`
- Fotos: JPG de menos de 1 MB. Videos: MP4 de menos de 20 MB (para videos largos, mejor YouTube).

## Ocultar una sección sin borrarla
Dentro de la sección, agregue `"visible": false,` justo después de la línea `"_block": "…",`.

## Agregar una sección
Copie uno de los modelos de abajo y péguelo dentro de `"secciones": [ … ]`, **entre dos secciones**, con una coma después de la llave de cierre `},` de la sección anterior. Las secciones se ven en el orden en que están en el archivo.

**Texto libre**
```json
{
  "_block": "texto",
  "etiqueta": "Texto pequeño dorado",
  "titulo": "Título de la sección",
  "texto": "<p>Primer párrafo.</p><p>Segundo párrafo.</p>",
  "alineacion": "izquierda",
  "fondo": "normal"
},
```

**Botones (para llevar a otras páginas)**
```json
{
  "_block": "botones",
  "titulo": "Conozca más",
  "botones": [
    { "texto": "Talleres", "enlace": "/talleres/", "estilo": "dorado" },
    { "texto": "Instagram", "enlace": "https://www.instagram.com/rebe_b_g/", "estilo": "contorno" }
  ],
  "alineacion": "centro"
},
```
Enlaces: `/talleres/` (página del sitio) · `#contacto` (sección de inicio) · `https://…` (otro sitio).

**Formulario** (las respuestas llegan por correo)
```json
{
  "_block": "formulario",
  "ancla": "inscripcion",
  "titulo": "Reserve su lugar",
  "intro": "Déjenos sus datos y le escribimos.",
  "nombre_formulario": "inscripcion-taller",
  "campos": [
    { "etiqueta": "Nombre completo", "tipo": "texto", "obligatorio": true },
    { "etiqueta": "Correo electrónico", "tipo": "correo", "obligatorio": true },
    { "etiqueta": "Teléfono", "tipo": "telefono", "obligatorio": false },
    { "etiqueta": "Taller de interés", "tipo": "opciones", "opciones": "Liderazgo consciente\nCultura organizacional", "obligatorio": true },
    { "etiqueta": "Mensaje", "tipo": "mensaje", "obligatorio": false }
  ],
  "boton_texto": "Enviar",
  "mensaje_exito": "¡Gracias! Le escribiremos pronto.",
  "fondo": "alterno"
},
```
Tipos de campo: `texto`, `correo`, `telefono`, `mensaje`, `opciones` (una opción por línea, separadas con `\n`), `fecha`, `numero`, `casilla`. Cada formulario necesita un `nombre_formulario` distinto.

**Calendly, Google Maps, Google Forms…**
```json
{
  "_block": "codigo_externo",
  "titulo": "Agende una cita",
  "codigo": "PEGUE AQUÍ EL CÓDIGO"
},
```
Al pegar el código, cambie cada `"` del código por `'` (comilla simple), o pídale ayuda a Mateo.

**Video de YouTube**
```json
{
  "_block": "video",
  "titulo": "Conferencia 2027",
  "enlace": "https://www.youtube.com/watch?v=XXXXXXXXXXX",
  "alineacion": "centro"
},
```

**Testimonios escritos** — dentro de la sección `"testimonios"`, en `"escritos": [ ]`:
```json
{ "texto": "Una experiencia transformadora.", "nombre": "María Pérez", "cargo": "Gerente de RRHH, Empresa X" },
```
(Si es el último de la lista, sin coma al final.)

## Crear una página nueva
1. Abra `content/paginas` → **Add file** → **Create new file**.
2. Nombre: `talleres.json` (minúsculas, sin espacios ni tildes). La dirección será rebebcr.com/talleres/
3. Pegue esto y cambie los textos:
```json
{
  "titulo": "Talleres",
  "descripcion": "Una frase que describe la página para Google.",
  "secciones": [
    {
      "_block": "encabezado",
      "etiqueta": "Programas",
      "titulo": "Talleres *para líderes*",
      "subtitulo": "Texto debajo del título.",
      "imagen": "/assets/atmos-navy.jpg",
      "botones": [ { "texto": "Inscribirme", "enlace": "#inscripcion", "estilo": "dorado" } ]
    },
    {
      "_block": "texto",
      "titulo": "Qué incluye",
      "texto": "<p>Descripción del taller.</p>"
    }
  ]
}
```
4. **Commit changes**. Para que aparezca en el menú: en `content/ajustes.json`, dentro de `"menu": [ ]`, agregue `{ "texto": "Talleres", "enlace": "/talleres/" }`.

## Dar acceso a otra persona
La persona necesita una cuenta gratis de GitHub (github.com/signup).
1. Entre a **github.com/Rebebcr/rebe-site** → **Settings** (arriba) → **Collaborators and teams** (menú izquierdo).
2. Toque **Add people**, escriba el usuario o correo de GitHub de la persona.
3. Elija el permiso **Write** (puede editar) → **Add**.
4. A la persona le llega una invitación por correo (o en github.com/notifications). Cuando la acepta, ya puede editar como usted. Envíele esta guía.

**Quitar el acceso:** mismo lugar → al lado del nombre, **Remove**.

> Dé **Write**, no **Admin**: con Admin la persona podría borrar el proyecto o quitarle el acceso a otros.

## Si algo sale mal
Nada se pierde: GitHub guarda todas las versiones. Avísele a Mateo y se vuelve a la anterior en un minuto.
