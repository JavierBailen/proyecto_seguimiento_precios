import puppeteer  from "puppeteer";
/**
 * Hace un scraping a la pagina oficial de GAME para obtener informacion de algun producto
 * 
 * utilizaremos puppeter para abrir el navegador y acceder a la direccion proporcionada para extraer la informacion que queramos
 * @async
 * @param {string} url ->se refiere a la url de la pagina desde la que vamos a obtener la informacion
 * @returns {Promise<Array<{texto:string, plataforma: string, precio: string, imagen: string}>>}
 * Nos devuelve un array que contiene la iformación del producto tales como: 
 * -texto: Nombre del producto
 * -plataforma: Plataforma a la que pertenece el producto buscado
 * -precio: Precio del producto buscado
 * -imagen: Url de la imagen del producto
 */
export async function scrapearGame(url) {

  
  
    try {
      const navegador = await puppeteer.launch({
        headless: "new",
      });
   
  
      const pagina = await navegador.newPage();
  
      await pagina.goto(url);
      await pagina.waitForSelector('.product-title span');
  
  
  
      const productos = await pagina.evaluate(() => {

        const elementos = document.querySelectorAll('.product-title span');
        

        return Array.from(elementos).map(elemento => {
          
          const plataforma = document.querySelector('.dd a span');
          const precio = document.querySelector('.int');
          const imagen = document.querySelector('.u-100.u-relative img')
          

         
        
          return {
            texto: elemento.innerText, 
            plataforma: plataforma.innerText,
            precio: precio.innerHTML.trim(),
            imagen:  imagen.src 

        
        
          };
          
        });
      });
      console.log(`Buscando ${productos[0].texto} en GAME`)
      await navegador.close();
      return productos;
  
    } catch (error) {
      console.error('Error:', error);
    }
  }

  

