$(document).ready(function () {
  //homepage
  
 
  
  change = true
  getNotizie();
  $("#lista-sinistra").css("display", "block");
//   var titoloIns
//   $("#form-ricerca").on('click' , "#btn-cerca", function() {
    
//     $("#pagina-singola").hide();
//     $('.showcase').hide();
//      $("#form").html("");
//     $("#lista-sinistra").html("");

//     titoloIns = $("#ricerca-videogioco-titolo").val()
    
//     ricercaVideogioco(titoloIns)
//   })
 
//   function ricercaVideogioco(titoloIns) {
// $.get(`videogiochi/${titoloIns}/1`, function(res) {
//   if(res != null) {
//   for(let i = 0; i < res.length; i++) {
// $(`<section class="showcase2">
//       <div class="container grid-for-add">
//             <div class="showcase2-add card3">
//                 <img src="${res.immagine}"></img>
//                 <p>Titolo: ${res.titolo}</p>
//                 <p>Genere: ${res.genere}</p>
//                 <p>Piattaforma: ${res.piattaforma}</p>
//                 <p>Editor: ${res.editor}</p>
//                 <p>Data di pubblicazione: ${res.dataPubblicazione}</p>
//                 <p class="detail-notizia" data-id="${res.notizia.id}">Notizia: ${res.notizia.titolo}</p>
//                 <p class="punteggio${id}"></p>
               
//                 <div id="opzioni-admin" style="display:none">
//                 <button class="update btn btn-primary button separate" data-id="${res.id}">Modifica videogioco</button>
//                 <button class="delete-videogioco btn btn-primary button separate" data-id="${res.id}">Elimina videogioco</button>
//                 </div>
//                 <div id="opzioni-utente" style="display:none">
//                 <button class="separate btn btn-primary" id="sezione-aggiungi-recensione" data-id="${res.id}">Aggiungi recensione</button>
//                 </div>
//             </div>
//             <div id="lista-recensioni-videogioco" class="container grid-3 grid-for-add">
//             </div>
//      </div>
//      </section>
      
// `).prependTo("#lista-sinistra");

//   }
//   }
// })
// }

  $('#ricerca').click(function() {
    $('.showcase').show();
    $('.showcase2').hide();
    $('.showcase-text').toggle();
  })

  $(".btn-sign-up").click(function () {
    $('.showcase').show();
    $(".login-modal").css("display", "none");
    $(".sign-up-modal").css("display", "block");
    
    form = "sign-up";
  });

  $(".btn-accesso").click(function () {
    $('.showcase').show(); 
   
    $(".login-modal").css("display", "block");
    $(".sign-up-modal").css("display", "none");
    form = "login";
  });

  $(".btn-login").click(function () {
    $('.showcase').show(); 
   
    $(".login-modal").css("display", "block");
    $(".sign-up-modal").css("display", "none");
    form = "login";
  });

  $("#btn-logout").click(function () {
    $("#spazio").css("width", "220px")
    $(` 
        <li><a class='btn-login'>Login</a></li>
        <li><a class='btn-sign-up'>Sign up</a></li>
    `).prependTo(".login-profile");
    $("<p>arrivederci</p>").prependTo("#autenticazione");
    $(".login-modal").css("display", "block");
    $(".sign-up-modal").css("display", "none");
    form = "login";
  });

  

  function getUtente() {
    $.get("secured", function (res) {
     
      if (res != null) {
        
        $(`
                <li><a id="btn-logout" class='logout' href="/logout">Logout</a></li>
                <li><p style='text-transform:lowercase;'>${res.ruolo} : ${res.username}</li>
                <li><a><i class="fas fa-user"></i></a></li>
                `).prependTo(".login-profile");
        $("#non-loggato").css("display", "none");
        $(".login-modal").css("display", "none");
        $(".sign-up-modal").css("display", "none");
        if(res.ruolo ==="ADMIN"){
          $("#operazioni-crud-admin").css("display", "block");
        } else {
           $("#operazioni-crud-admin").css("display", "none");
        }
      }
    });
  }

  getUtente();
 
  
  // fa in modo che alla chiusura del form di modifica apre la lista giusta
  var form;
  var usernameEditor
  var recensioniAdmin 
  var change = false
  $("#form").on("click", ".close-add", function () {
    if (form == "recensione") {
      getRecensioni();
      $("#form").html("");
    } else if (form == "videogioco") {
      getVideogiochi();

      $("#form").html("");
    } else if (form == "notizia") {
      getNotizie();
      $("#form").html("");
    } 
  });

  $("#autenticazione").on("click", ".close-add", function () {
    if (form == "sign-up") {
      $(".sign-up-modal").css("display", "none");
    } else if (form == "login") {
      $(".login-modal").css("display", "none");
    } else {
      $("#form").html("");
      $(".showcase").show()
    }
  });

  ///registrazione ajax
  //sign up prende i valori daglio input
  $("#btn-registrazione").click(function () {
    // const u = {
    //   email: $("#email-sign-up").val(),
    //   username: $("#username-sign-up").val(),
    //   password: $("#password-sign-up").val()
    // };
    let email = $("#email-sign-up").val();
    let username = $("#username-sign-up").val();
    let password = $("#password-sign-up").val();

    // li assegna al nuovo oggetto
    aggiungiUtente(email, username, password);

    //svuota le caselle

    $("#email-sign-up").val("");
    $("#username-sign-up").val("");
    $("#password-sign-up").val("");
  });

  // aggiungi recensione success
  function aggiungiUtente(email, username, password) {
    //  $.post("/signup", JSON.stringify(u), function(res){
    //     console.log(res)
    //  })   // console.log(u);
    $.ajax({
      type: "POST",
      url: `/signup`,
      data: {
        email,
        username,
        password,
      },
      // contentType: "application/json",
      // dataType: "json",
      success: function (res) {
        alert(res);
      },
      error: function (res) {
        alert("utente non registrato" + res);
      },
    });
  }

  function accessoCrud() {
    $.get("secured", function (res) {
      if (res != null) {
        // se l'admin è loggato tutte le operazioni crud sono possibili
        if(res.ruolo === "ADMIN"){
          $("#opzioni-admin").css("display", "block");
          $("#opzioni-utente").css("display", "block");
          // se un utente è loggato sono disponibili le opzioni delle recensioni
        } else {
          $("#opzioni-admin").css("display", "none");
        $("#opzioni-utente").css("display", "block");
        }
        
      }
    });
}
  // ===================================================VIDEOGIOCHI==============================================================
  // ===================================================VIDEOGIOCHI==============================================================
  // ===================================================VIDEOGIOCHI==============================================================
  //videogiochi
  $("#sezione-videogiochi").click(function () {
    $("#form").html("");
    $("#pagina-singola").hide();
    $("#lista-sinistra").show();
    $('.showcase').hide();
    getVideogiochi();
  });

  // lista di videogiochi

  function getVideogiochi() {
    $("#lista-sinistra").html(`<section class="cli">
    <div class="container grid grid-3 cli-form" id="lista-videogiochi">
    </div>
    </section>`);

    $.get(`videogiochi`, function (res) {
      for (let i = res.length - 1; i >= 0; i--) {
        $(` 
        <div class="card2 fade" id='videogioco-${res[i].id}'>
        <img class="image" src="${res[i].immagine}" alt="">
        <div class="link-titolo"><a class='detail-videogioco testo middle' data-id='${res[i].id}'>${res[i].titolo}</a> </div> 
      </div>
 `).appendTo("#lista-videogiochi");
      }
    });
  
  }
  //videogiochi

  $("#lista-sinistra").on("click", ".detail-videogioco", function () {
    $('.showcase').hide();
    const id = +$(this).attr("data-id");
    $("#lista-sinistra").show();
    getVideogioco(id);
  });

  function paginaHTMLVideogioco(id){
    $.get(`videogiochi/${id}`, function (res) {
      $(`<section class="showcase2">
      <div class="container grid-for-add">
            <div class="showcase2-add card3">
                <img src="${res.immagine}"></img>
                <p>Titolo: ${res.titolo}</p>
                <p>Genere: ${res.genere}</p>
                <p>Piattaforma: ${res.piattaforma}</p>
                <p>Editor: ${res.editor}</p>
                <p>Data di pubblicazione: ${res.dataPubblicazione}</p>
                <p class="detail-notizia" data-id="${res.notizia.id}">Notizia: ${res.notizia.titolo}</p>
                <p class="punteggio${id}"></p>
               
                <div id="opzioni-admin" style="display:none">
                <button class="update btn btn-primary button separate" data-id="${res.id}">Modifica videogioco</button>
                <button class="delete-videogioco btn btn-primary button separate" data-id="${res.id}">Elimina videogioco</button>
                </div>
                <div id="opzioni-utente" style="display:none">
                <button class="separate btn btn-primary" id="sezione-aggiungi-recensione" data-id="${res.id}">Aggiungi recensione</button>
                </div>
            </div>
            <div id="lista-recensioni-videogioco" class="container grid-3 grid-for-add">
            </div>
     </div>
     </section>
      
`).prependTo("#lista-sinistra");

var pt = res.punteggioMedio/2
for(let j = 0; j < pt; j++){
               
  $('<span class="fa fa-star checked" ></span>').appendTo(`.punteggio${id}`)
 }
 if(pt % 2 === 1) {
  $('<span class="fa fa-star-half checked" ></span>').appendTo(`.punteggio${id}`)

 }


    });
    accessoCrud()
    
}
  // singolo videogioco
  function getVideogioco(id) {
    
    $("#lista-sinistra").html("");
    paginaHTMLVideogioco(id)
    // accesso admin ai crud
    

    $.get("recensioni", function (res) {
      for (let j = res.length - 1; j >= 0; j--) {
        const i = res[j].id;

        $.get(`recensioni/${i}`, function (res) {
          let autoreRecensione = res.autore;
         

          $(`
          
                <div  id="table-recensione-${i}" class="showcase2-add card4">
                
          <p>${res.dataPubblicazione}</p>
          <p>${res.contenuto}</p>
          <p class="detail-recensione" data-id="${res.id}">Autore: ${res.autore}</p>
          <p>Videogioco: ${res.videogioco.titolo}</p>
          <p class="punteggio${i}-recensioni"></p>
            
          <div id="autore-recensione-${i}" style="display:none">          
              <button class=" separate btn btn-primary recensione-update" data-id="${res.id}">Modifica recensione</button>
              <button class=" separate btn btn-primary delete-recensione" data-id="${res.id}">Elimina recensione</button>
              </div>
          
      </div>
      
      `).appendTo("#lista-recensioni-videogioco")
      var ptRec = res.punteggio/2
      while(ptRec > 0){
        ptRec--        
        $('<span class="fa fa-star checked" ></span>').appendTo(`.punteggio${i}-recensioni`)
       }
       if(ptRec%2 == 1) {
        $('<span class="fa fa-star-half checked" ></span>').appendTo(`.punteggio${i}-recensioni`)
  
       }


// se le recensioni sono quelle del videogioco, sono visibili
          if (id === res.videogioco.id) {
            $(`#table-recensione-${i}`).show()

            
// l'username deve essere univoco
  $.get("secured", function (res) {
    if (res.ruolo === "USER"){
                
// se è collegato l'utente sono visibili solo quelle che sono state create dall'utente
    if (res.username === autoreRecensione) {
      $(`#autore-recensione-${i}`).show()
    }
    
    // se è collegato l'admin sono tutte visibili
  } else if (res.ruolo === "ADMIN"){
    $(`#autore-recensione-${i}`).show()
            }
            
            });
// altrimenti le recensioni non sono visibili
          } else {
            $(`#table-recensione-${i}`).hide()
          }
        })
      }
     
     
    })
  }

  // aggiungere un videogioco
  $("#sezione-aggiungi-videogioco").click(function () {
    $(".showcase").hide()
    form = "videogioco";
    $("#lista-sinistra").html("");
    $("#form").html("");
  
   
    $.get("secured", function(res) {

      if(res != null){
        if(res.ruolo === 'USER'){
      usernameEditor = res.username
        } else if (res.ruolo === 'ADMIN'){
          usernameEditor = res.ruolo
        } 
      }
      var titoloVideogioco
       var idVideogiocoNotizia 
      var idLastVideogioco
     $.get("notizie", function(res) {
      for (let i = 0; i < res.length; i++) {
        titoloVideogioco = res[i].titolo
      
        idVideogiocoNotizia = res[i].id
      }
      $.get("videogiochi", function(res){
        for (let i = 0; i < res.length; i++) {
          idLastVideogioco = res[i].id
        }
      
   if(idLastVideogioco ==   idVideogiocoNotizia) {
     getNotizie();
     alert("devi prima aggiungere la notizia")
    $("#form").html("")
   }else{
    $(`
    <section class="showcase2">
    <div class="container grid-for-add">
        <div class="showcase2-add card3">              
                        <h3>Aggiungi Videogioco</h3>
                        <form class="margine">
                
                        <div class="add-control">	
                            <input type="text" data-id="${idVideogiocoNotizia}" value="${titoloVideogioco}" readonly>
                        </div>

                        <div class="add-control">
                            <input type="text" placeholder="Titolo" id="titolo-add" required>
                        </div>
                        
                        <div class="add-control">					
                            <input type="text" id="genere-add" placeholder="Genere" required>
                        </div>

                        <div class="add-control">	
                            <input type="text" placeholder="Piattaforma" id="piattaforma-add"  required>
                        </div>
                        
                        <div class="add-control">					
                            <input type="text" placeholder="Editor" id="editor-add" value="${usernameEditor}" data-id="${res.id}" readonly>
                        </div>
                        
                        <div class="add-control">              
                        <input type="date" placeholder="Data di pubblicazione" id="dataPubblicazione-add" required>
                        </div>
                        
                        <div>
                        <div><strong>Immagine:</strong></div>
                        </div>
                        
                        <div>
                        <div class="container upload-immagine-container add-control">
                            <form method="post" action="" enctype="multipart/form-data" id="myform">
                            
                                <div >
                                    <input type="file" placeholder="Percorso file" class=" add-control" id="file" name="file" />
                                    <input type="button" class="button btn btn-primary" value="Carica" id="but_upload">
                                </div>

                            </form>
                        </div>

                        <div><input type="text" placeholder="Immagine" id="immagine-add" class="img" value="" required></div>
                    
                        </div>
                        
                        <button class=" separate btn btn-primary" id="add-videogioco">Aggiungi</button>
                        <button class="separate close-add btn btn-primary">Annulla</button>
                    </form>
                </div>
             </div>
        </section>
            `).appendTo("#form");

    $("#form").show();
   }
   // selectNotizia();
  })
  })
})
})
  //aggiungi notizia ad aggiungi videogioco
  // trovare l'id della notizia aggiunta nel metodo di aggiungi
  // notizia legarla ad un bottone

  // add videogioco prende i valori dagli input
  $("#form").on("click", "#add-videogioco", function () {
    const v = {
      //devo assegnare l'id di notizia per poterlo creare
      //l'id non è auto-increment
      // va creata prima la notizia
      //dovrei aggiungere il videogioco in notizia
      id: $("#titolo-videogioco-selected").val(),
      titolo: $("#titolo-add").val(),
      genere: $("#genere-add").val(),
      piattaforma: $("#piattaforma-add").val(),
      editor: $("#editor-add").val(),
      dataPubblicazione: $("#dataPubblicazione-add").val(),
      punteggioMedio: 0,
      notizia: {
        id: $("#titolo-videogioco-selected").val(),
      },
      recensione: [
        {
          id: 0,
          dataPubblicazione: "",
          contenuto: "",
          autore: "",
          videogioco: null,
          immagine: "",
          punteggio: 0,
        },
      ],
      immagine: $("#immagine-add").val(),
    };

    aggiungiVideogioco(v);

    $("#titolo-add").val("");
    $("#genere-add").val("");
    $("#piattaforma-add").val("");
    $("#editor-add").val("");
    $("#dataPubblicazione-add").val("");
    $("#immagine-add").val("");
    $("#lista-sinistra").html("");
    $("#form").html("");
  });

  //aggiungi videogioco success
  function aggiungiVideogioco(v) {
    $.ajax({
      type: "POST",
      url: "/videogiochi",
      data: JSON.stringify(v),
      contentType: "application/json",
      dataType: "json",
      success: function (res) {},
      statusCode: {
        200: function () {
          $("#lista-sinistra").html("");
          getVideogiochi();
          $("#form").html("");
        },
      },
    });
  }

  //modificare il videogioco
  $("#lista-sinistra").on("click", ".update", function () {
    $(".showcase").hide()
    $("#lista-sinistra").html("");
    $("#form").html("");
    form = "videogioco";
    // aspetto della pagina html
    $("#form").html(`
    <section class="showcase2">
        <div class="container grid-for-add">
            <div class="showcase2-add card3">  
              <h2>Modifica Videogioco</h2>
              <form class="margine">
                  <input id="id" type="hidden">
                  
                  <input id="notizia-videogioco" type="hidden">
                  <input id="recensione-videogioco" type="hidden">
                  <div class="add-control">
                    <input type="text" id="titolo" required>
                  </div>
                  <div class="add-control">
                    <input type="text" id="genere" required>
                  </div>
                  <div class="add-control">
                    <input type="text" id="piattaforma"  required>
                  </div>
                  <div class="add-control">
                   <input type="text" id="editor" readonly></td>
                  </div>  
                  <div class="add-control">         
                   <input type="date" id="dataPubblicazione" required>
                  </div> 
                  <div class="add-control"> 
                    <div class="container upload-immagine-container">
                      <form method="post" action="" enctype="multipart/form-data" id="myform">              
                        <div>
                        <img src="" alt="">
                          <input type="file" id="file" name="file" />
                          <input type="button" class="button" value="Carica" id="but_upload">
                        </div>
                      </form>
                    </div>
                  </div> 
                  <div class="add-control"> 
                    <td><input type="text" id="immagine-add" class="img" value="" required></td>
                  </div>
                                  
                              </div>
                              <br><br>
                              <button id="update-videogioco" class="separate btn btn-primary">Modifica</button>
                              <button class="separate close-add btn btn-primary">Annulla</button>
              </form>
              </div>
             </div>
      </section>`);

    const id = +$(this).attr("data-id");
    $("#form").css("display", "block");
    modificaVideogioco(id);
  });

  // carica i dati originali da modificare
  function modificaVideogioco(id) {
    $.get(`/videogiochi/${id}`, function (res) {
      $("#id").val(res.id);
      $("#titolo").val(res.titolo);
      $("#genere").val(res.genere);
      $("#piattaforma").val(res.piattaforma);
      $("#editor").val(res.editor);
      $("#dataPubblicazione").val(res.dataPubblicazione);
      $("#notizia-videogioco").val(res.notizia.id);
      $("#recensione-videogioco").val(res.recensioni[0].id);
      $("#immagine-add").val(res.immagine);
    });
  }

  $("#form").on("click", "#update-videogioco", function () {
    const v = {
      id: $("#id").val(),
      titolo: $("#titolo").val(),
      genere: $("#genere").val(),
      piattaforma: $("#piattaforma").val(),
      editor: $("#editor").val(),
      dataPubblicazione: $("#dataPubblicazione").val(),
      notizia: {
        id: $("#notizia-videogioco").val(),
        // dataPubblicazione: "",
        // contenuto: "",
        // autore: "",
        // videogioco: null,
        // immagine:"",
        // titolo: "",
        // categoria: ""
      },
      recensione: {
        id: $("#recensione-videogioco").val(),
        // dataPubblicazione: "",
        // contenuto: "",
        // autore: "",
        // videogioco: null,
        // immagine:"",
        // punteggio: 0
      },
      immagine: $("#immagine-add").val()
    };

    modificaV(v);

    $("#titolo").val("");
    $("#genere").val("");
    $("#piattaforma").val("");
    $("#editor").val("");
    $("#dataPubblicazione").val("");
    $("#form").css("display", "none");
  });

  function modificaV(v) {
    $.ajax({
      type: "PUT",
      url: "/videogiochi",
      data: JSON.stringify(v),
      contentType: "application/json",
      dataType: "json",
      success: function (res) {},
      statusCode: {
        200: function () {
          $("#lista-sinistra").html("");
          getVideogiochi();
          $("#form").html("");
        },
      },
    });
  }

  $("#form").on("click", ".close-add", function () {
    $("#lista-sinistra").html("");
    $("#form").css("display", "none");
  });

  // elimina videogioco
  $("#lista-sinistra").on("click", ".delete-videogioco", function () {
    const id = $(this).attr("data-id");
    eliminaVideogioco(id, $(this).parent().parent());
  });

  function eliminaVideogioco(id, htmlRow) {
    $.ajax({
      url: `videogiochi/${id}`,
      type: "DELETE",
      success: function () {
        htmlRow.remove();
      },
    });
  }

  // ======================================================notizie==========================================================
  // ======================================================notizie==========================================================
  // ======================================================notizie==========================================================

  // ===================================================NOTIZIE==============================================================
  // ===================================================NOTIZIE==============================================================
  // ===================================================NOTIZIE==============================================================
  // click sulle sezioni della barra di navigazione
  //notizie
  $("#sezione-news").click(function () {
    $("#form").html("");
    $("#pagina-singola").hide();
    $("#lista-sinistra").show();
    $('.showcase').hide();
    getNotizie();
  
  });
  // div di destra
  //liste
  //var lastId;

  // lista di notizie
  function getNotizie() {
   
    change = true
    $("#lista-sinistra").html("");
    $.get(`notizie`, function (res) {
      for (let i = res.length - 1; i >= 0; i--) {
        $(`
      <section class="cli">
        <div class="container grid cli-form">
        
          <div class="card" id='notizia-${res[i].id}'>
            <img class="image image-home" src="${res[i].immagine}" alt="">                          
            <div class="link-titolo"><a class='detail-notizia btn-title' data-id='${res[i].id}'>${res[i].titolo}</a> 
            <p class='data'>Data di pubblicazione${res[i].dataPubblicazione}</p>
            <p class='contenuto'>${res[i].contenuto}</p></div>
          </div>
          <div id="lista-destra">
          </div>
        </div>
      </section>`).appendTo("#lista-sinistra");
      
      }
    


      accessoCrud()

      $.get('recensioni', function(res) {
        for (let i = res.length - 1; i >= 0; i--) {
          recensioneId = res[i].id;
          recensioniAdmin = res[i].autore
          var punteggioMedio=res[i].punteggio/2
          
        
          $(`
            <div id="table-recensione-${i}">
                <div>
                <div class='detail-recensione' data-id='${res[i].id}'><img src="${res[i].immagine}" alt=""></div>
                    <div class="punteggio${i}"></div>
                    <div>  
                    <div id="autore-recensione-${i}" style="display:none">          
                        <button class="recensione-update" data-id="${res[i].id}">Modifica recensione</button>
                        <button class="delete-recensione" data-id="${res[i].id}">Elimina recensione</button>
                        </div>
                    </div>
                </div>
            </div>`).appendTo("#lista-destra")

          
             for(let j = punteggioMedio - 1; j >= 0; j--){
               
               $('<span class="fa fa-star checked" ></span>').appendTo(`.punteggio${i}`)
              }
              if(punteggioMedio%2 == 1) {
               $('<span class="fa fa-star-half checked" ></span>').appendTo(`.punteggio${i}`)

              }
             
              
            
           
          if( recensioniAdmin === 'ADMIN') {
            $(`#table-recensione-${i}`).show()
          } else {
            $(`#table-recensione-${i}`).hide()
          }
        
        }
      })
    


      // $(`<button class="${lastId++}" id="sezione-aggiungi-notizia">Aggiungi notizia</button> `).prependTo('#lista-sinistra');
    });
  }

  // click per i singoli oggetti
  // ===============================================================================================
  //notizie
  $("#lista-sinistra").on("click", ".detail-notizia", function () {
    $(".showcase").hide()
    const id = +$(this).attr("data-id");
    $("#dettaglio-sinistra").show();
    getNotizia(id);
  });
  // singola notizia
  function getNotizia(id) {
    
    $("#lista-sinistra").html("");

    $.get(`notizie/${id}`, function (res) {
      
      $(`
      <section class="showcase2">
      <div class="container grid-for-add">
            <div class="showcase2-add card3">
      <div id="table-notizia">
         <div>
         <div>Titolo: ${res.titolo} </div>
            <div>Data di pubblicazione: ${res.dataPubblicazione}</div>
            <div>Contenuto: ${res.contenuto} </div>
            <div>Autore: ${res.autore} </div>
            
            <div class="detail-videogioco" data-id="${res.id}"><img src="${res.immagine}" alt=""> </div>
           
            <div id="opzioni-admin" style="display:none">
            <button class="notizia-update btn btn-primary separate" data-id="${res.id}">Modifica notizia</button>
            <button class="delete-notizia btn btn-primary separate" data-id="${res.id}">Elimina notizia</button>
            </div>
            <div id="opzioni-utente" style="display:none">
            <button id="sezione-aggiungi-recensione" class="btn btn-primary separate" data-id="${res.id}">Aggiungi recensione</button></div>
            </div>
            
            </div>
            
     </div>
     </section>`).appendTo("#lista-sinistra");
    
    
     

     
    });
    
    accessoCrud()
   
}
    
  
  //  <!-- inserire un icona al posto del testo modifica notizia matita di edit
  //              e un cestiono al posto del modifica-->
  // function selectNotizia() {
  //   $.get(`notizie`, function (res) {
  //     for (let i = 0; i < res.length; i++) {
  //       $(`<option value='${res[i].id}'>${res[i].titolo}</option>
  //     `).appendTo("#titolo-videogioco-selected");
  //     }
  //   });
  // }

  // aggiungi Notizia

  $("#sezione-aggiungi-notizia").click(function () {
    form = "notizia";
    $("#lista-sinistra").html("");
    $("#form").html("");
    $(".showcase").hide();


    $.get("secured", function(res) {
            if(res != null){
              if(res.ruolo === 'USER'){
            usernameEditor = res.username
              } else if (res.ruolo === 'ADMIN'){
                usernameEditor = res.ruolo
              } 
            }

            
    $(`
    <section class="showcase2">
    <div class="container grid-for-add">
   <div class="showcase2-add card4">              
    <h3>Aggiungi Notizia</h3>
    <form class="margine">

                <div class="add-control">
                     <input type="date" placeholder="Data di pubblicazione" id="dataPubblicazione-notizia-add" required>
                </div>

                <div class="add-control">                    
                    <textarea type="text" placeholder="Contenuto" id="contenuto-notizia-add" required></textarea>
                </div>

                <div class="add-control">                   
                    <input type="text" placeholder="Autore" id="autore-notizia-add"  value="${usernameEditor}" data-id="${res.id}" readonly>
                </div>
            
                <div class="container upload-immagine-container">
                    <form method="post" action="" enctype="multipart/form-data" id="myform">

                        <div class="add-control" >
                            <input type="file" placeholder="Percorso immagine" class=" add-control2" id="file" name="file" />
                            <input type="button" class="button btn btn-primary" value="Carica" id="but_upload">
                        </div>

                    </form>
                </div>

                <div class="add-control">
                    <input type="text" id="immagine-notizia-add" class="img" value="" required>
                </div>
                <div class="add-control">                   
                    <input type="text" placeholder="Titolo" id="titolo-notizia-add" required>
                </div>
                <div class="add-control">       
                     <input type="text" placeholder="categoria" id="categoria-notizia-add" required></td>
                </div>
                <div class="add-control">     
        <button class=" separate btn btn-primary" id="add-notizia">Aggiungi</button>
        <button class="separate close-add btn btn-primary">Annulla</button>
        </div>
        </form>
    </div>
    </div>
    </section>
  
            `).appendTo("#form");

    $("#form").show();
          })
  });

  // add notizia prende i valori dagli input
  $("#form").on("click", "#add-notizia", function () {
    const n = {
      dataPubblicazione: $("#dataPubblicazione-notizia-add").val(),
      contenuto: $("#contenuto-notizia-add").val(),
      autore: $("#autore-notizia-add").val(),
      immagine: $("#immagine-notizia-add").val(),
      titolo: $("#titolo-notizia-add").val(),
      categoria: $("#categoria-notizia-add").val(),
    };

    aggiungiNotizia(n);
    //ho bisogno dell'id della notizia per creare il videogioco

    $("#dataPubblicazione-notizia-add").val("");
    $("#contenuto-notizia-add").val("");
    $("#autore-notizia-add").val("");
    $("#immagine-notizia-add").val("");
    $("#titolo-notizia-add").val("");
    $("#form").hide();
  });

  // aggiungi notizia success
  function aggiungiNotizia(n) {
    //		$.post('prodotti', JSON.stringify(p), function(res) {
    //			$('#lista-prodotti').html('')
    //			getProdotti()
    //		})
    $.ajax({
      type: "POST",
      url: "/notizie",
      data: JSON.stringify(n),
      contentType: "application/json",
      dataType: "json",
      success: function (res) {},
      statusCode: {
        // Per effettuare la pulizia della lista e la renderizzazione in sicurezza
        // possiamo aggiungere alla chiamata ajax statusCode in cui vado ad assegnare
        // allo stato 200 (la chiamata ha avuto successo) in cui vado a definire
        // ciò che dovrà essere eseguito solo all'avvenuta aggiunta.
        // In questa maniera rirenderizzerà la lista solamente se e quando
        // riceverà una conferma positiva dell'aggiunta, mai prima.
        // Grazie a questo riusciamo ad aggirare il problema del pc lento.
        200: function () {
          $("#form").html("");
          goToAggiungiVideogioco();
        },
      },
    });
  }
  function goToAggiungiVideogioco() {
    $(
      `<li><button class="button" id="sezione-aggiungi-videogioco">Aggiungi videogioco</button></li>`
    ).appendTo("#form");
  }

  // Elimina la notizia

  $("#lista-sinistra").on("click", ".delete-notizia", function () {
    const id = $(this).attr("data-id");
    eliminaNotizia(id, $(this).parent().parent());
  });

  function eliminaNotizia(id, htmlRow) {
    $.ajax({
      url: `notizie/${id}`,
      type: "DELETE",
      success: function () {
        htmlRow.remove();
      },
    });
  }

  $("#lista-sinistra").on("click", ".notizia-update", function () {
    $(".showcase").hide()
    formModificaNotizia();
    const id = +$(this).attr("data-id");
    $("#lista-sinistra").html("");
    modificaNotizia(id);
    $("#form").show();
  });

  // aspetto della pagina html
  function formModificaNotizia() {
    form = "notizia";
    $(`
    <section class="showcase2">
    <div class="container grid-for-add">
         <div class="showcase2-add card4">              
             <h3>Modifica Notizia</h3>
   
             <form class="margine">
                
             <input id="id" type="hidden">
             <input id="videogioco" type="hidden">

                <div class="add-control">
                     <input type="date" placeholder="Data di pubblicazione" id="dataPubblicazione" required>
                </div>

                <div class="add-control">                    
                    <textarea type="text" placeholder="Contenuto" id="contenuto" required></textarea>
                </div>

                <div class="add-control">                   
                    <input type="text" placeholder="Autore" id="autore"  value="${usernameEditor}" readonly>
                </div>
            
                <div class="container upload-immagine-container">
                    <form method="post" action="" enctype="multipart/form-data" id="myform">

                        <div class="add-control" >
                            <input type="file" placeholder="Percorso immagine" class=" add-control2" id="file" name="file" />
                            <input type="button" class="button" value="Carica" id="but_upload">
                        </div>

                    </form>
                </div>

                <div>
                    <input type="text" id="immagine-notizia-add" class="img" value="" required>
                </div>
                <div>                   
                    <input type="text" placeholder="Videogioco" id="videogioco-titolo" required>
                </div>
                <div>       
                     <input type="text" placeholder="Titolo" id="titolo" required></td>
                </div>
            
        <button class="separate btn btn-primary" id="update-notizia">Modifica</button>
        <button class="separate close-add btn btn-primary">Annulla</button>
        </form>
    </div>
  </div>
</section>
  
              `).appendTo("#form");
  }
  // carica i dati originali da modificare
  function modificaNotizia(id) {
    $.get(`/notizie/${id}`, function (res) {
      $("#id").val(res.id);
      $("#dataPubblicazione").val(res.dataPubblicazione);
      $("#contenuto").val(res.contenuto);
      $("#autore").val(res.autore);
      $("#videogioco").val(res.videogioco.id);
      $("#videogioco-titolo").val(res.videogioco.titolo);
      $("#immagine-notizia-update").val(res.immagine);
      $("#titolo").val(res.titolo);
    });
  }
  // al click sul pulsante aggiunta aggiunge il videogioco

  $("#form").on("click", "#update-notizia", function () {
    const n = {
      id: $("#id").val(),
      dataPubblicazione: $("#dataPubblicazione").val(),
      contenuto: $("#contenuto").val(),
      autore: $("#autore").val(),
      videogioco: $("#videogioco").val(),
      immagine: $("#immagine-notizia-update").val(),
      titolo: $("#titolo").val(),
      videogioco: {
        id: $("#id").val(),
      },
    };

    updateNotizia(n);

    $("#titolo").val("");
    $("#autore").val("");
    $("#contenuto").val("");
    $("#dataPubblicazione").val("");
    $("#videogioco-titolo").val("");
    $("#form").css("display", "none");
  });

  function updateNotizia(n) {
    //		$.post('prodotti', JSON.stringify(p), function(res) {
    //			$('#lista-prodotti').html('')
    //			getProdotti()
    //		})
    $.ajax({
      type: "PUT",
      url: "/notizie",
      data: JSON.stringify(n),
      contentType: "application/json",
      dataType: "json",
      success: function (res) {},
      statusCode: {
        // Per effettuare la pulizia della lista e la renderizzazione in sicurezza
        // possiamo aggiungere alla chiamata ajax statusCode in cui vado ad assegnare
        // allo stato 200 (la chiamata ha avuto successo) in cui vado a definire
        // ciò che dovrà essere eseguito solo all'avvenuta aggiunta.
        // In questa maniera rirenderizzerà la lista solamente se e quando
        // riceverà una conferma positiva dell'aggiunta, mai prima.
        // Grazie a questo riusciamo ad aggirare il problema del pc lento.
        200: function () {
          $("#lista-sinistra").html("");
          getNotizie();
          $("#form").hide();
        },
      },
    });
  }

  // ===================================================RECENSIONI==============================================================
  // ===================================================RECENSIONI==============================================================
  // ===================================================RECENSIONI==============================================================
  //recensioni

  $("#sezione-recensioni").click(function () {
    change = false
    $(".griglia").show()
    $("#form").html("");
    $("#pagina-singola").hide();
    $("#lista-sinistra").show();
    $("#lista-sinistra").html("");
    $('.showcase').hide();
    getRecensioni();
  });
  var recensioneId;

  function getRecensioni() {
    $.get("recensioni", function (res) {
      
      
                     
        
      // o faccio vedere le recensioni solo con i videogiochi e quindi richiamo questo metodo nella pagina del singolo videogioco
      // oppure lo faccio vedere a se pero almeno del titolo del videogioco ne ho bisogno
      for (let i = res.length - 1; i >= 0; i--) {
        recensioneId = res[i].id;
        punteggioMedio=res[i].punteggio/2

   $(`
    <section class="cli table-recensione-${res[i].id}">
      <div class="container grid cli-form2" id="recensioni">
      
        <div id='table-recensione' class='card'>
          <div>
            <div><img class="image-${res[i].id} image image-home" src="${res[i].immagine}" alt=""></div>
                  <div> Videogioco : <a class='detail-recensione titolo-videogioco-${i}' data-id='${res[i].id}'></a></div>
                  <div class='punteggio${i}'>Punteggio :</div>
                  <div class='incipit-${res[i].id}'>${res[i].contenuto}</div>
            </div>
          </div>
          <div id='table-recensione${res[i].id}'></div>
        </div>
      </div>
         
     
    </section>`).appendTo("#lista-sinistra");
    for(let j = punteggioMedio - 1; j >= 0; j--){
               
      $('<span class="fa fa-star checked" ></span>').appendTo(`.punteggio${i}`)
     }
     if(punteggioMedio%2 == 1) {
      $('<span class="fa fa-star-half checked" ></span>').appendTo(`.punteggio${i}`)

     }

   
       
    $.get(`recensioni/${recensioneId}`, function (res) {
      $(`.titolo-videogioco-${i}`).html(`
                    ${res.videogioco.titolo}`);
                  });
                  
       
                  if (res[i].contenuto != null) {
                    $(`.incipit-${res[i].id}`).show();
                  } else {
                    $(`.incipit-${res[i].id}`).hide();
                  }
                  
                  if(res[i].immagine != null) {
                    $(`.image-${res[i].id}`).show();
                  } else {
                    $(`.image-${res[i].id}`).hide();
                    
                    
                  }
                  
                  if(res[i].autore != 'ADMIN') {
                    $(`.table-recensione-${res[i].id}`).css("display", "none");
                    
                  }
                }

                
                $.get('notizie', function(res) {
                  for (let j = 4 - 1; j >= 0; j--) {
                    
                   $(`
                   <div id="table-notizie-${j}" class="card2 fade">
                   <img class="image" src="${res[j].immagine}" alt="">                   
                    <div class="link-titolo"><a class='detail-notizia testo middle' data-id='${res[j].id}'>${res[j].titolo}</a></div> 
              </div>
                    `).appendTo("#table-recensione10")
                }
              })
                
    });
  }

  //recensioni dettagli
  $("#lista-sinistra").on("click", ".detail-recensione", function () {
    const id = +$(this).attr("data-id");
    $("#lista-sinistra").show();
$(".showcase").hide()
    getRecensione(id);
  });

  //singola recensione
  function getRecensione(id) {
    $("#lista-sinistra").html("");
    $.get(`recensioni/${id}`, function (res) {
      punteggioMedio=res.punteggio/2
      $(` 
  <section class="showcase2">
    <div class="container grid-for-add">
      <div class="showcase2-add card3">
        <div id="table-recensione">
            <div>
                <div><img class="image" src="${res.immagine}" style="display:none"></div>
                <div>Data di pubblicazione: ${res.dataPubblicazione}</div>
                <div>Contenuto: ${res.contenuto}</div>
                <div>Autore: ${res.autore}</div>
                <div>Videogioco: ${res.videogioco.titolo}</div>
                <div class="punteggio${id}">Punteggio:</div>
                <div> 
                    <div id="opzioni-admin" style="display:none">
                      <div id="opzioni-utente" style="display:none">
                        <button class="recensione-update btn btn-primary separate" data-id="${res.id}">Modifica recensione</button>
                        <button class="delete-recensione btn btn-primary separate" data-id="${res.id}">Elimina recensione</button>
                        <button id="sezione-aggiungi-recensione" class="btn btn-primary separate" data-id="${res.id}">Aggiungi recensione</button>
                      </div>
                  </div>
                </div>
            </div>
        </div>
              
     </div>
     </section>`).appendTo("#lista-sinistra");
     for(let j = punteggioMedio - 1; j >= 0; j--){
               
      $('<span class="fa fa-star checked" ></span>').appendTo(`.punteggio${id}`)
     }
     if(punteggioMedio%2 == 1) {
      $('<span class="fa fa-star-half checked" ></span>').appendTo(`.punteggio${id}`)

     }
       
        if(res.immagine = null || $(".image").attr("src") == "") {
          $(".image").css("display","none");
        }else {
          $(".image").css("display","block");
        }
        $.get("secured", function(res) {
          if(res != null){
            if(res.ruolo === 'USER'){
          usernameEditor = res.username
            } 
          }
        if( res.autore === 'ADMIN' || res.autore === usernameEditor) {
          $(`#opzioni-update`).show()
        } else {
          $(`#opzione-update`).hide()
        }
      })
      
    });
    accessoCrud()

      
   
  }


  function selectVideogioco() {
    $.get(`videogiochi`, function (res) {
      for (let i = 0; i < res.length; i++) {
        $(`<option value='${res[i].id}'>${res[i].titolo}</option>
      `).appendTo("#titolo-videogioco-selected");
      }
    });
  }
  //aggiungere una recensione
  $("#lista-sinistra").on("click", "#sezione-aggiungi-recensione", function () {
    $(".showcase").hide()
    form = "recensione";
    $("#lista-sinistra").html("");
    $("#form").html(
      $(`
         
      <section class="showcase2">
      <div class="container grid-for-add">

          <div class="showcase2-add card4">
              <h3>Aggiungi Recensione</h3>
              <form class="margine">

              <div class="add-control">
                  <input type="date" name="name" placeholder="Data di pubblicazione" id="dataPubblicazione-recensione-add" required>
              </div>

              <div class="add-control">
                  <input type="text" name="name" placeholder="Contenuto" id="contenuto-recensione-add" required>
              </div>

              <div class="add-control">
                  <input type="text" name="name" placeholder="Autore" id="autore-recensione-add" required>
              </div>


              <div class="add-control">
                  <input type="file" class=" add-control2" name="image-upload" placeholder="Immagine" id="immagine-recensione-add" required>
              </div>

              <div class="add-control">
                  <input type="number" name="name" placeholder="Punteggio" id="punteggio-recensione-add" required>
              </div>

                  <div>
                      <select id="titolo-videogioco-selected"> 
                          <option value="">Seleziona il videogioco</option>
                          </select>
                      </div>


              <button id="add-recensione" class="separate btn btn-primary">Aggiungi</button>
              <button class="close-add separate btn btn-primary">Annulla</button>
              </form>
          </div>
      </div>
  </section>
            `)
    );

    $("#form").show();
    selectVideogioco();
  });

  //add recensione prende i valori daglio input
  $("#form").on("click", "#add-recensione", function () {
    const r = {
      dataPubblicazione: $("#dataPubblicazione-recensione-add").val(),
      contenuto: $("#contenuto-recensione-add").val(),
      autore: $("#autore-recensione-add").val(),
      videogioco: {
        id: $("#titolo-videogioco-selected").val(),
      },
      immagine: $("#immagine-recensione-add").val(),
      punteggio: $("#punteggio-recensione-add").val(),
    };
    // li assegna al nuovo oggetto
    aggiungiRecensione(r);

    //svuota le caselle

    $("#dataPubblicazione").val("");
    $("#contenuto").val("");
    $("#autore").val("");
    $("#immagine").val("");
    $("#punteggio").val("");
    $("#form-aggiungi").hide();
  });

  // aggiungi recensione success
  function aggiungiRecensione(r) {
    $.ajax({
      type: "POST",
      url: "/recensioni",
      data: JSON.stringify(r),
      contentType: "application/json",
      dataType: "json",
      success: function (res) {},
      statusCode: {
        200: function () {
          $("#lista-sinistra").html("");
          getRecensioni();
          $("#form").html("");
        },
      },
    });
  }

  // Elimina la Recensione

  //modifica

  $("#lista-sinistra").on("click", ".recensione-update", function () {
    form = "recensione";
    $(".showcase2").hide()
    $("#lista-sinistra").html("");
    formModificaRecensione();
    const id = +$(this).attr("data-id");
    $("#form").css("display", "block");
    modificaRecensione(id);
  });
  // aspetto della pagina html
  var form;
  function formModificaRecensione() {
    form = "recensione";
    $("#form").html("");
    $(`
    <section class="showcase2">
        <div class="container grid-for-add">

            <div class="showcase2-add card4">
                <h3>Modifica recensione</h3>
                <form class="margine">
                    <input type="hidden" id="id">
                    <input type="hidden" id="videogioco">

                <div class="add-control">
                    <input type="date" id="dataPubblicazione" required>
                </div>

                <div class="add-control">
                    <textarea type="text" id="contenuto" required></textarea>
                </div>

                <div class="add-control">
                    <input type="text" id="autore" required>
                </div>


                <div class="add-control"> 
                    <div class="container upload-immagine-container">
                      <form method="post" action="" enctype="multipart/form-data" id="myform">              
                        <div>
                        <img src="" alt="">
                          <input type="file" id="file" name="file" />
                          <input type="button" class="button" value="Carica" id="but_upload">
                        </div>
                      </form>
                    </div>
                  </div> 
                  <div class="add-control"> 
                    <td><input type="text" id="immagine-upload" class="img" value="" required></td>
                  </div>

                <div class="add-control">
                    <input type="number" id="punteggio" required>
                </div>

                <button id="update-recensione" class="separate btn btn-primary">Modifica</button>
                <button id="close-modifica-recensione" class="separate btn btn-primary close-add">Annulla</button>
                </form>
            </div>
        </div>
    </section> `).appendTo("#form");
  }
  // carica i dati originali da modificare
  function modificaRecensione(id) {
    $.get(`/recensioni/${id}`, function (res) {
      $("#id").val(res.id);
      $("#dataPubblicazione").val(res.dataPubblicazione);
      $("#contenuto").val(res.contenuto);
      $("#autore").val(res.autore);
      $("#videogioco").val(res.videogioco.id);
      $("#immagine-upload").val(res.immagine);
      $("#punteggio").val(res.punteggio);
    });
  }
  // al click sul pulsante aggiunta aggiunge il videogioco

  $("#form").on("click", "#update-recensione", function () {
    const r = {
      id: $("#id").val(),
      dataPubblicazione: $("#dataPubblicazione").val(),
      contenuto: $("#contenuto").val(),
      autore: $("#autore").val(),
      videogioco: $("#videogioco").val(),
      immagine: $("#immagine-upload").val(),
      punteggio: $("#punteggio").val(),
      videogioco: {
        id: $("#videogioco").val(),
      },
    };

    updateRecensione(r);

    $("#titolo").val("");
    $("#autore").val("");
    $("#contenuto").val("");
    $("#dataPubblicazione").val("");
    $("#punteggio").val("");
    $("#form").css("display", "none");
  });

  function updateRecensione(r) {
    $.ajax({
      type: "PUT",
      url: "/recensioni",
      data: JSON.stringify(r),
      contentType: "application/json",
      dataType: "json",
      success: function (res) {},
      statusCode: {
        200: function () {
          $("#lista-sinistra").html("");
          getRecensioni();
          $("#form").hide();
        },
      },
    });
  }

  // eliminaRecensione
  $("#lista-sinistra").on("click", ".delete-recensione", function () {
    const id = $(this).attr("data-id");
    eliminaRecensione(id, $(this).parent().parent());
  });

  function eliminaRecensione(id, htmlRow) {
    $.ajax({
      url: `recensioni/${id}`,
      type: "DELETE",
      success: function () {
        htmlRow.remove();
      },
    });
  }

  //contatti
  $("#sezione-contatti").click(function () {
    $("form").hide();
    $("#lista-sinistra").hide();
    $("#pagina-singola").show();
    Contatti();
  });

  //chi siamo
  $("#sezione-info").click(function () {
    $("form").hide();
    $("#lista-sinistra").hide();
    $("#pagina-singola").show();
    ChiSiamo();
  });

  //==================================================

  // pagine singole
  // contatti
  function Contatti() {
    $("#container").hide();
    $("#container").hide();
    $(".showcase").hide()
    $("#pagina-singola").html("");
    $(`
    <section class="showcase2">
    <div class="container grid-for-add">
          <div class="showcase2-add card3">
          <div id='mail'></div>
                <img src="iconmail.jpg" alt="">
                <p>Scrivici all'email</p>
                <a href="mailto:universogames@gmail.com" class='send-email'>universogames@gmail.com</a>
                
                </div>
               </div>
               </div> 
               </section>`).appendTo("#pagina-singola");
  }
  // chi siamo
  function ChiSiamo() {
    $("#container").hide();
    $(".showcase").hide()
    $("#pagina-singola").html("");
    $(`
    <section class="showcase2">
      <div class="container grid-for-add">
            <div class="showcase2-add card3">
            <div id='info' >
                <img src="iconazienda.jpg" alt="">
                
               <p><h2> UniversoGames </h2>è il portale dedicato agli appassionati del gaming su PC, tutte le 
                ultime novità, videogiochi e hardware, con guide all’acquisto, forum di supporto e molto altro. 
                Dopo tutti questi anni abbiamo ottenuto diversi riconoscimenti, inoltre lavoriamo con le più 
                importanti aziende al mondo per offrire i migliori contenuti rimanendo sempre imparziali.</p>
               </div>
               </div>
               </div> 
               </section>`).appendTo("#pagina-singola");
  }

  // caricamento immagine
  var contatore = 0;

  $("#form").on("click", "#but_upload", function () {
    var fd = new FormData();
    var files = $("#file")[0].files[0];

  

    
    if(files.type != 'image/jpeg' && files.type != 'image/png' && files.type != 'image/jpg') {
    alert("Caricare solo file jpeg, jpg o png")

    } else {
    fd.append("file", files);

    $.ajax({
      url: "/file/carica",
      type: "POST",
      data: fd,
      contentType: false,
      processData: false,
      success: function (response) {
        if (response != 0) {
          var srcUpload = "/img/" + response;
          console.log(srcUpload)
          $(".img").attr("value", srcUpload);
          $("#but_upload").val("immagine caricata");

          $(".preview").show(); // Display image element
        } else {
          alert("file non caricato");
        }
      },
    });
  }
  });
});
