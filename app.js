function app(){

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


            $('#resultadoGame').append("<span> Nombre del producto: "+texto+"</span>" +"<br>");
            $('#resultadoGame').append("<span> Precio: "+precio+"</span>" +"<br>");
            $('#resultadoGame').append("<span> Plataforma: "+plataforma+"</span>" +"<br>");
            $('#resultadoGame').append("<hr>")
        



            fetch(`http://localhost:3000/api/scrapInstantGaming?name=${texto}`)
            .then(response=>response.json())
            .then(datos=>{
                precio = datos[0].precio
                texto = datos[0].texto

                
                $('#resultadoInstantGaming').append("<span> Nombre del producto: "+texto+"</span>" +"<br>")
                $('#resultadoInstantGaming').append("<span> Precio producto: "+precio+"</span>" +"<br>")
                $('#resultadoInstantGaming').append("<hr>")
                
            })
        })
    })
}

$(document).ready(app);