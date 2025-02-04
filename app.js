/**
 * Funcion principal de la app, la cual gestiona el envio del formulario(html) y realiza peticiones a las apis de scraping para
 * obtener informacion de productos de GAME y instant Gaming
 * Se ejecuta cuando el dom esta completamente cargado
 */
function app(){
    /**
     * Manejador de evento para el envio del formulario (#formularioIndex)
     * Prevenimos el comportamiento predeterminado del formulario mediante evento.preventDefault()
     * Validamos la url proporcionada para saber si proviene de game o no 
     * Realizamos dos fetch, uno a la api de GAME y el segundo a instant gaming buscando el nombre que hayamos buscado en el primer scraping
     * @param {Event} evento -> El evento qeu se lanza cuando lanzamos el formulario
     */

    $('#formularioIndex').submit(function(evento){
        evento.preventDefault();
        let texto = '';
        let plataforma = '';
        let urlProducto = $('#url').val();
        let precio = '';
        
        if(!urlProducto.includes("www.game.es")){
            $('#resultadoGame').append("<span>Error, esa url no viene de game león</span><hr>")
            return;
        }



        //primera peticion a GAME
        fetch(`http://localhost:3000/api/scrapGame?url=${urlProducto}`)
        .then(response=>response.json())
        .then(datos=>{
            texto = datos[0].texto
            precio = datos[0].precio
            plataforma = datos[0].plataforma
            imagen = datos[0].imagen
            


            $('#resultadoGame').append("<span> Nombre del producto: "+texto+"</span>" +"<br>");
            $('#resultadoGame').append("<span> Precio: "+precio+"€</span>" +"<br>");
            $('#resultadoGame').append("<span> Plataforma: "+plataforma+"</span>" +"<br>");
            $('#resultadoGame').append(`<img src='${imagen}'><br>`);
            $('#resultadoGame').append("<hr>")
        


            //Segunda peticion fetch, buscando el mismo producto en instant gaming
            fetch(`http://localhost:3000/api/scrapInstantGaming?name=${texto}`)
            .then(response=>response.json())
            .then(datos=>{
                precio = datos[0].precio
                texto = datos[0].texto
                imagen = datos[0].imagen

                
                $('#resultadoInstantGaming').append("<span> Nombre del producto: "+texto+"</span>" +"<br>")
                $('#resultadoInstantGaming').append("<span> Precio producto: "+precio+"</span>" +"<br>")
                $('#resultadoInstantGaming').append(`<img width=300px height=200px src='${imagen}'><br>`);
                $('#resultadoInstantGaming').append("<hr>")
                
            })
        })
    })
}
//Se inicia la app cuando el dom esté cargado
$(document).ready(app);