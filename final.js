class Nave {
  constructor(dolor, vida, nombre, precision, imagen, id) {
    this.dolor = dolor;
    this.vida = vida;
    this.nombre = nombre;
    this.precision = precision;
    this.imagen = imagen;
    this.id = id;
  }
  Disparar(dolor, equipo, tamaño, precision) {
    let objetivo = this.SeleccionarObjetivo(0, tamaño, precision);
    this.RecibirDisparo(dolor, objetivo, equipo);
  }

  SeleccionarObjetivo(min, max, precision) {
    let objetivo = Math.random() * (max - min) + min;
    if (Math.random() * (100 - 0) + 0 < precision) {
      return Math.floor(objetivo);
    } else {
      consola.insertAdjacentHTML('afterbegin', '<p> disparo fallado </p>');
      return -1;
    }
  }
  RecibirDisparo(dolor, objetivo, equipo) {
    if (objetivo == -1) {
      return;
    }
    if (equipo == 1) {
      equipo1.InformeDeSituacion1(naboo.sector1, naboo.sector2,objetivo);
      naboo.sector1[objetivo].vida -= dolor;
    } else {
      equipo2.InformeDeSituacion2(naboo.sector2, naboo.sector1,objetivo);
      naboo.sector2[objetivo].vida -= dolor;
    }
  }
}
class Nave_I extends Nave {
  constructor(nombre, imagen) {
    super(25, 50, nombre, 70, imagen);
  }
}
class Nave_II extends Nave {
  constructor(nombre, imagen) {
    super(40, 35, nombre, 80, imagen);
  }
}
class Nave_III extends Nave {
  constructor(nombre, imagen) {
    super(30, 40, nombre, 90, imagen);
  }
}

class Ejercito {
  constructor(nombre, id) {
    this.nombre = nombre;
    this.listaNaves = [];
    this.tacticas = [];
    this.id = id;
  } 
  InformeDeSituacion1(ataca,defiende,posicion) {
    consola.insertAdjacentHTML('afterbegin', '<p> ' +
      ataca[0].nombre +
        " con " +
        ataca[0].dolor +
        " de daño" +
        " de " +
        equipo1.nombre +
        " dispara al " +
        defiende[posicion].nombre +
        " con " +
        defiende[posicion].vida +
        " de vida" +
        " de " +
        equipo2.nombre + '</p>')    ;
  }
  InformeDeSituacion2(ataca, defiende,posicion) {
    consola.insertAdjacentHTML('afterbegin', '<p> '+
    ataca[0].nombre +
      " con " +
      ataca[0].dolor +
      " de daño" +
      " de " +
      equipo2.nombre +
      " dispara al " +
      defiende[posicion].nombre +
      " con " +
      defiende[posicion].vida +
      " de vida" +
      " de " +
      equipo1.nombre + '</p>'); 
    ;
  }
  CambiarDeTactica(tactica) {}
}
class Factorio {
  constructor() {
    this.listaEquipos = [];
    this.tacticas = [];
    this.listaNaves = [];
    this.turno = 0;
  }
  CrearEjercito(
    nombreEjercito,
    id,
    nombre1,
    n1,
    imagen1,
    nombre2,
    n2,
    imagen2,
    nombre3,
    n3,
    imagen3
  ) {
    const ejercito = new Ejercito(nombreEjercito, id);
    this.listaEquipos.push(ejercito);
    this.CrearNaves(
      ejercito,
      nombre1,
      n1,
      imagen1,
      nombre2,
      n2,
      imagen2,
      nombre3,
      n3,
      imagen3
    );
    return ejercito;
  }
  CrearNaves(
    ejercito,
    nombre1,
    n1,
    imagen1,
    nombre2,
    n2,
    imagen2,
    nombre3,
    n3,
    imagen3
  ) {
    let naves;
    while (n1 > 0) {
      naves = new Nave_I(nombre1, imagen1);
      n1--;
      ejercito.listaNaves.push(naves);
    }
    while (n2 > 0) {
      naves = new Nave_II(nombre2, imagen2);
      n2--;
      ejercito.listaNaves.push(naves);
    }
    while (n3 > 0) {
      naves = new Nave_III(nombre3, imagen3);
      n3--;
      ejercito.listaNaves.push(naves);
    }

    return naves;
  }
}
class CampoDeBatalla {
  constructor() {
    this.sector1 = [];
    this.sector2 = [];
    this.posicion1 = 0;
    this.posicion2 = 0;
  }
  ColocarNaves(ejercito) {
    for (let i = 0; i < ejercito.listaNaves.length; i++) {
      if (ejercito.nombre == equipo1.nombre) {
        this.sector1[i] = ejercito.listaNaves[i];
        this.sector1[i].id = ejercito.id + i;
      } else {
        this.sector2[i] = ejercito.listaNaves[i];
        this.sector2[i].id = ejercito.id + i;
      }
    }
  }
  InsertToHtml(ejercito1, ejercito2) {
    for (let index1 = 0; index1 < this.sector1.length; index1++) {
      let div1 = document.getElementById(ejercito1.id);
      let element1 = ejercito1.listaNaves[index1];
      div1.innerHTML +=
        '<li id="' +
        ejercito1.id +
        index1 +
        '"><img src="' +
        element1.imagen +
        '" alt="' +
        element1.nombre +
        '"></li>';
    }

    for (let index2 = 0; index2 < this.sector2.length; index2++) {
      let div2 = document.getElementById(ejercito2.id);
      let element2 = ejercito2.listaNaves[index2];
      /* const u = `
      <li id=${index2}>
        <img src=${index2} alt=${index2} />
      </li>
      ` */
      div2.innerHTML +=
        '<li id="' +
        /* sector2[index2].id  */ ejercito2.id +
        index2 +
        '"><img src="' +
        element2.imagen +
        '" alt="' +
        element2.nombre +
        '"></li>';
    }
  }

  BorrarNave(ejercito, posicion) {
    let d = document.getElementById(equipo1.id);
    let d2 = document.getElementById(equipo2.id);
    let d_nested = null;
    if (this.sector1[posicion] == undefined){
      d_nested = document.getElementById(this.sector1[0].id);
    } else {

      d_nested = document.getElementById(this.sector1[posicion].id); 
    }
    let d_nested2 = null;
    if (this.sector2[posicion] == undefined){
      d_nested2 = document.getElementById(this.sector2[0].id);
    } else {

      d_nested2 = document.getElementById(this.sector2[posicion].id); 
    }

    if (ejercito == this.sector1) {
      d_nested.innerHTML = '<img src="explosion.png" alt="Pum!">';
    } else {
      d_nested2.innerHTML = '<img src="explosion.png" alt="Pum!">';
    }
    let p = this.sector1
    setTimeout(function() {
      if (ejercito == p) {
        d.removeChild(d_nested);
      } else {
        d2.removeChild(d_nested2);
      }
    }, 200);

    if (ejercito == this.sector1) {
      this.sector1.splice(posicion, 1);
    } else {
      this.sector2.splice(posicion, 1);
    }
  }

  Turno() {
    if (this.turno == 0) {
      if (this.sector1[0] != undefined) {
        this.sector1[0].Disparar(
          this.sector1[0].dolor,
          0,
          this.sector2.length,
          this.sector1[0].precision
        );
        for (this.posicion1 = 0; this.posicion1 < this.sector1.length; this.posicion1++) {
          if (this.sector1[this.posicion1].vida < 1) {
            
            this.BorrarNave(this.sector1, this.posicion1);
          }
        }
      }  consola.insertAdjacentHTML('afterbegin',
  '<p>TURNO DE: '+ equipo2.nombre+' </p>');
      } else {
        if (this.sector2[0] != undefined) {
          this.sector2[0].Disparar(
            this.sector2[0].dolor,
            1,
            this.sector1.length,
            this.sector2[0].precision
            );
            for (this.posicion2 = 0; this.posicion2 < this.sector2.length; this.posicion2++) {
              if (this.sector2[this.posicion2].vida < 1) {
                
                this.BorrarNave(this.sector2, this.posicion2);
              }
            }
          } consola.insertAdjacentHTML('afterbegin',
          '<p>TURNO DE: '+ equipo1.nombre+' </p>');
    }
    if (this.turno == 0) {
      this.turno = 1;
      
    } else {
      this.turno = 0;
     
    }
    /* verdad=true;
      verdad=!verdad; */

    if (this.sector2.length < 1) {
      setTimeout(function() {
        const doc = document.querySelector('main');
        doc.children[0].remove();
        main.innerHTML += '<h1> VICTORIA DEL IMPERIO';
      }, 1000);
    }
    if (this.sector1.length < 1) {
      setTimeout(function() {
        const doc = document.querySelector('main');
        doc.children[0].remove();
        main.innerHTML += '<h1> VICTORIA DE LOS REBELDES';
        
      }, 1000);
    }
  }

  ObtenerElementosEnPosicion() {
    this.sector1.forEach(element => {
      consola.insertAdjacentHTML('afterbegin',
      '<p> Nombre: ' + element.nombre + '  Vida: ' + element.vida + '</p>');
    });
    consola.insertAdjacentHTML('afterbegin',
      '<p>'+ equipo1.nombre+' </p>');
      this.sector2.forEach(element => {
        /* console.log(element); */
        consola.insertAdjacentHTML('afterbegin',
        '<p> Nombre: ' + element.nombre + '  Vida: ' + element.vida + '</p>');
        
      });
      consola.insertAdjacentHTML('afterbegin',
      '<p>'+ equipo2.nombre+' </p>');
  }
}
const factorio = new Factorio();

function   crearEquipo1(nnaves1,nnaves2,nnaves3){
  
   equipo1 = factorio.CrearEjercito(
    "EL IMPERIO",
    "arriba",
    "Caza TIE",
    nnaves1,
    "images/2.png",
    "Bombardero TIE",
    nnaves2,
    "images/3.png",
    "Interceptor TIE",
    nnaves3,
    "images/4.ico"
    );
    return equipo1
  }
  function crearEquipo2(nnaves4,nnaves5,nnaves6){
         equipo2 = factorio.CrearEjercito(
          "LOS REBELDES",
          "abajo",
          "Caza Ala-X",
          nnaves4,
          "images/45.png",
          "Caza bombardero",
          nnaves5,
          "images/1.png",
          "Caza Ala-A",
          nnaves6,
          "images/4.png"
          );
          return equipo2
    }
    const naboo = new CampoDeBatalla();
    function Empezar() {
      const nnaves1 = document.empezar.uno.value
      const nnaves2 = document.empezar.dos.value
      const nnaves3 = document.empezar.tres.value
      const nnaves4 = document.empezar.cuatro.value
      const nnaves5 = document.empezar.cinco.value
      const nnaves6 = document.empezar.seis.value
      
      const equipo1 = crearEquipo1(nnaves1,nnaves2,nnaves3);
      const equipo2 = crearEquipo2(nnaves4,nnaves5,nnaves6);
      naboo.ColocarNaves(equipo2);
      naboo.ColocarNaves(equipo1);

  const doc = document.querySelector('main');
  doc.children[0].remove();
  main.innerHTML += ' <div class="container"> <div id="campodebatalla"> <!-- TABLA DEL EQUIPO 1 --> <div class="equipo1"> <ul id="arriba"> </ul> </div> <!-- TABLA DEL EQUIPO 2 --> <div class="equipo2"> <ul id="abajo"> </ul> </div> </div><!--campo de batalla--> <div class="consola"> <aside> <div id="consola"> </div> </aside> </div><!--consola--> </div><!--container--> <!-- BOTONES --> <div class="container"> <button id="disparar" onclick="disparar     ();">Disparar</button> <button onclick="Inf();">Estado de las naves</button> </div> ';
  naboo.InsertToHtml(equipo1, equipo2);
}


function disparar() {
  naboo.Turno(equipo1, equipo2);
}
function Inf() {
  naboo.ObtenerElementosEnPosicion();
}


