import puppeteer  from "puppeteer";

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
          
        
          return {
            texto: texto.innerText, 
            
            precio: precio.innerText
        
          };
        })
      });
  
      await navegador.close();
      return productos;
  
    } catch (error) {
      console.error('Error:', error);
    }
  }

  