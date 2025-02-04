import express from "express";
import cors from "cors";
import { scrapearGame } from "./proyecto.js";
import { scrapearInstantGaming } from "./scrapeo2.js";

const app = express();
const PORT = 3000;
app.use(cors());

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' http://localhost:5173;"
  );
  next();
});

/**
 * Ruta que se utiliza para hacer el scraping a la pagina de GAME
 * Esta "api" recibe una url, realiza el scraping utilizando la funcion scrapearGame y devuelve los datos obtenidos en formato json
 * @route GET/api/scrapGame
 * @queryparam {string} url -> Hace referencia a la url de la pagina de GAME que se va a scrapear
 * @returns {Object[]} -> Lista de productos obtenidos del scraping
 */
app.get("/api/scrapGame", async (req, res) => {

  try {
    let { url } = req.query;
    const producto = await scrapearGame(url);
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al realizar el scraping." });
  }
});

/**
 * Ruta que se utilza para hacer scraping a la pagina de Instant Gaming
 * Se recibe un nombre de producto a traves del parametro de consulta "name", realizando un scraping a instant gaming a ese producto
 * Devuelve los datos en formato json
 * 
 * @route GET/api/scrapInstantGaming
 * @queryparam {string} name -> el nombre del producto que se va a buscar en instant gaming
 * @returns {Object[]} Lista de productos obtenidos del scraping
 */
app.get("/api/scrapInstantGaming", async (req, res) => {
  try {
    let { name } = req.query;
    const producto = await scrapearInstantGaming(name);
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al realizar el scraping." });
  }
});

/**
 * Aquí se inicia el servidor en el puerto especificado
 * por defecto lo tenemos como http://localhost:3000
 */

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});