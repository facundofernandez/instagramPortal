


window.Instagram = {
  config: {},

  BASE_URL: 'https://api.instagram.com/v1',

  init: function( opt = {} ) {
    this.config.client_id = opt.client_id;
  },

  popular: function(){
    let endPoint = `${this.BASE_URL}/tags/${name}/media/recent?cliente_id=${this.config.client_id}`;
    this.getJSON( endPoint, callback );
  },

  tagsByName: function( name, callback) {
    let endPoint = `${this.BASE_URL}/tags/${name}/media/recent?access_token=${this.config.client_id}`;
    this.getJSON( endPoint, callback );
  },

  user: function( user_id, callback) {
    let endPoint = `${this.BASE_URL}/users/search?q=${user_id}&access_token=${this.config.client_id}`;
    this.getJSON( endPoint, callback );
  },

  getJSON: function( url, callback ) {
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'jsonp',
      success: callback
    })

    /*
    fetch( url, {
      method: 'get'
    }).then(callback).catch(function(err) {
        // Error :(
          console.error("Error en get")
    });
    */
  }


};


Instagram.init({client_id:'2263791091.1b7b806.c94f83caaa1741beb3b11b2fce4830f2'})
//let arr_post =  JSON.parse(localStorage.getItem("post")).datos;
let setPost = new Set();
let arr_post = [];
obtenerTags();
mostrarPost();
setInterval( obtenerTags, 60000)


function obtenerTags(){
  console.info('%cLLamada API INSTAGRAM', "color: green;" )
  // Instagram.tagsByName('apiFacu', response => console.log(response.data) )
  Instagram.tagsByName('apifacu', response => {

    let datos = response.data;
    //let datos = JSON.parse(localStorage.getItem("datos"));

    for(dato of datos) {

      if(!setPost.has(dato.id)){
        let elem = {
          id: dato.id,
          images: dato.images,
          user: dato.caption.from,
          text: dato.caption.text

        };
        arr_post.push(elem);
        setPost.add(dato.id);
        insertarHtml(elem);
      }
    }



  });

}

function insertarHtml(dato){

  let template = `
  <div class="contenedor">
  <div id="id${dato.id}" class="post">

    <div class="post__user">
      <h3 class="post__user-name">${dato.user.full_name}</h3>
      <span class="post__user-username">${dato.user.username}</span>
      <img src="${dato.user.profile_picture}" alt="" class="post__user-img">
    </div>

    <h3 class="post__text">${dato.text}</h3>
    <img src="${dato.images.standard_resolution.url}" alt="" class="post__img">

  </div>
  </div>
  `;

  let html = template + document.getElementById("app").innerHTML;
  document.getElementById("app").innerHTML = html;

}

function mostrarPost(){

  let eTime = 8 * 1000;

  setInterval(function(){

    let eMostrarCurrent = (document.getElementsByClassName('mostrar').length) ? document.getElementsByClassName('mostrar')[0].id : null;

    let elem = arr_post.shift();

    if(eMostrarCurrent !== null)
      document.getElementById(eMostrarCurrent).classList.toggle('mostrar');


    arr_post.push(elem);

    document.getElementById('id'+elem.id).classList.toggle('mostrar');
  },eTime)

};

function cambiarFondo(){
  console.log("click")
}
