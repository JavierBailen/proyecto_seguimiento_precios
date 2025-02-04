import puppeteer  from "puppeteer";
/**
 * Esta función asyncrona hace un scraping a la pagina de Instant Gaming para obtener informacion del producto que se buscó en el primer scraping
 * La función abre el navegador usando Puppeter, realiza una busqueda en instant gaming y extrae la información relevante como el titulo, precio e imagen del producto
 * @async
 * @param {string} nombreProducto -Es el nombre del producto que se desea buscar que nos viene dado del primer scraping
 * @returns {Promise<Array<{texto:string, precio: string, imagen: string}>>}
 * Nos devuelve  un array de objetos que contiene la información de los productos:
 * -texto: Nombre del producto
 * -precio: Precio del producto
 * -imagen: Url de la imagen del producto
 */

export async function scrapearInstantGaming(nombreProducto) {
  
    try {

      const navegador = await puppeteer.launch({
        headless: "new",
      });
      
      
      const pagina = await navegador.newPage();
  
      await pagina.goto(`https://www.instant-gaming.com/es/busquedas/?query=${nombreProducto}`);
      await pagina.waitForSelector('.force-badge');
  
  
  
      const productos = await pagina.evaluate(() => {

        const elementos = document.querySelectorAll('.force-badge');
        return Array.from(elementos).map(elemento => {
          
          const precio = document.querySelector('.information .price')
          const texto = document.querySelector('.name');
          const imagen = document.querySelector('.picture')
          
        
          return {
            texto: texto.innerText, 
            
            precio: precio.innerText,
            imagen: imagen.src
        
          };
        })
      });
  
      await navegador.close();
      return productos;
  
    } catch (error) {
      console.error('Error:', error);
    }
  }

  