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


app.get("/api/scrapGame", async (req, res) => {

  try {
    let { url } = req.query;
    const producto = await scrapearGame(url);
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al realizar el scraping." });
  }
});


app.get("/api/scrapInstantGaming", async (req, res) => {
  try {
    let { name } = req.query;
    const producto = await scrapearInstantGaming(name);
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al realizar el scraping." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});