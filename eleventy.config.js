import fs from "node:fs";
import path from "node:path";

const leerJSON = (archivo) => JSON.parse(fs.readFileSync(archivo, "utf8"));

const escapar = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy({ "src/styles.css": "styles.css", "src/script.js": "script.js" });
  eleventyConfig.addWatchTarget("content/");

  // Contenido editable desde Pages CMS (carpeta content/)
  eleventyConfig.addGlobalData("ajustes", () => leerJSON("content/ajustes.json"));
  eleventyConfig.addGlobalData("paginas", () => {
    const paginas = [{ ...leerJSON("content/inicio.json"), slug: "", url: "/", esInicio: true }];
    const carpeta = "content/paginas";
    if (fs.existsSync(carpeta)) {
      for (const archivo of fs.readdirSync(carpeta).filter((f) => f.endsWith(".json")).sort()) {
        const slug = path.basename(archivo, ".json");
        paginas.push({ ...leerJSON(path.join(carpeta, archivo)), slug, url: `/${slug}/`, esInicio: false });
      }
    }
    return paginas;
  });

  // Títulos: *texto* = cursiva dorada, salto de línea = <br>
  eleventyConfig.addFilter("titulo", (s) =>
    s ? escapar(s).replace(/\*([^*]+)\*/g, "<em>$1</em>").replace(/\r?\n/g, "<br>") : ""
  );

  // Enlaces del menú: "#contacto" apunta a la sección de inicio cuando se está en otra página
  eleventyConfig.addFilter("enlace", (url, esInicio) => {
    if (!url) return "#";
    return url.startsWith("#") && !esInicio ? "/" + url : url;
  });
  eleventyConfig.addFilter("esExterno", (url) => /^https?:\/\//i.test(url || ""));

  // Solo dígitos (para wa.me)
  eleventyConfig.addFilter("digitos", (s) => String(s || "").replace(/\D/g, ""));

  // Convierte un enlace de YouTube o Vimeo en su dirección para insertar
  eleventyConfig.addFilter("videoEmbed", (url) => {
    if (!url) return "";
    const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/i);
    if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
    const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
    if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
    return "";
  });

  // Opciones de un campo de formulario: una por línea
  eleventyConfig.addFilter("lineas", (s) =>
    String(s || "").split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
  );

  eleventyConfig.addFilter("anio", () => new Date().getFullYear());

  return {
    dir: { input: "src", output: "_site", includes: "_includes" },
    templateFormats: ["njk"],
    htmlTemplateEngine: "njk",
  };
}
