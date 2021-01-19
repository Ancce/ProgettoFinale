$(document).ready(function() {

    function getNotizie() {
        $.get("notizie", function(res) {

            for(let i= 0; i < res.length; i++) {
                $(`<div class='notizia'>
                        <div class='image'>
                        <a href=''><img src="" alt=""></a>
                        </div>
                        <div class='testo'>
                        <h1 class='read-notizia' data-id='${res[i].id}'>${res[i].titolo}<h1>
                        <p class='incipit'>${res[i].descrizione}</p>
                        </div>
                    </div>
                `).appendTo('#lista-notizie')
            }
        })
    }
    getNotizie()

    function getRecensioni() {
        $.get("notizie", function(res) {

            for(let i= 0; i < res.length; i++) {
                $(`<div class='notizia'>
                        <div class='image'>
                        <a href=''><img src="" alt=""></a>
                        </div>
                        <div class='testo'>
                        <div class='valutazione'>
                        <p>${res[i].valutazione()}</p>
                        </div>
                        <h1 class='read-notizia' data-id='${res[i].id}'>${res[i].titolo}<h1>
                        <p class='incipit'>${res[i].descrizione}</p>
                        </div>
                    </div>
                `).appendTo('#lista-recensioni')
            }
        })
    }
    getRecensioni()




})