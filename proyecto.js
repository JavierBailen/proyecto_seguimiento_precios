import puppeteer  from "puppeteer";

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
          

         
        
          return {
            texto: elemento.innerText, 
            plataforma: plataforma.innerText,
            precio: precio.innerHTML.trim(),
        
        
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

  

