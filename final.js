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
      console.log("disparo fallado");
      return -1;
    }
  }
  RecibirDisparo(dolor, objetivo, equipo) {
    if (objetivo == -1) {
      return;
    }
    if (equipo == 1) {
      naboo.sector1[objetivo].vida -= dolor;
    } else {
      naboo.sector2[objetivo].vida -= dolor;
    }
  }
}
class Nave_I extends Nave {
  constructor(nombre, imagen) {
    super(25, 50, nombre, 60, imagen);
  }
}
class Nave_II extends Nave {
  constructor(nombre, imagen) {
    super(40, 35, nombre, 70, imagen);
  }
}
class Nave_III extends Nave {
  constructor(nombre, imagen) {
    super(30, 40, nombre, 80, imagen);
  }
}

class Ejercito {
  constructor(nombre, id) {
    this.nombre = nombre;
    this.listaNaves = [];
    this.tacticas = [];
    this.id = id;
  }
  InformeDeSituacion(atacante, defensor, posicion1, posicion2) {
    console.log(
      atacante.listadoNaves[posicion1].nombre +
        " con " +
        atacante.listadoNaves[posicion1].dolor +
        " de daño" +
        " de " +
        atacante.nombre +
        " dispara a la " +
        defensor.sector.poscionNaves[posicion2].nombre +
        " con " +
        defensor.sector.poscionNaves[posicion2].escudo +
        " de vida" +
        " de " +
        defensor.nombre
    );
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
  constructor(nNaves, nNaves2) {
    this.sector1 = [nNaves];
    this.sector2 = [nNaves2];
  }
  ColocarNaves(ejercito) {
    for (let i = 0; i < ejercito.listaNaves.length; i++) {
      if (ejercito.nombre == equipo1.nombre) {
        this.sector1[i] = ejercito.listaNaves[i];
        this.sector1[i].id = ejercito.nombre + i;
      } else {
        this.sector2[i] = ejercito.listaNaves[i];
        this.sector2[i].id = ejercito.nombre + i;
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
        for (let x = 0; x < this.sector1.length; x++) {
          if (this.sector1[x].vida < 1) this.sector1.splice(x, 1);

          
        }
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
        for (let x = 0; x < this.sector2.length; x++) {
          if (this.sector2[x].vida < 1) this.sector2.splice(x, 1);
          
        }
      }
    }
  
  BorrarNave(ejercito, posicion) {
    let d = document.getElementById(ejercito.id);
    let d_nested = document.getElementById(this.sector1[posicion].id);
    let d_nested2 = document.getElementById(this.sector2[posicion].id);

    // if (ejercito.id == "arriba") {
    //   d_nested.innerHTML = '<img src="explosion.png" alt="Pum!">';
    // } else {
    //   d_nested2.innerHTML = '<img src="explosion.png" alt="Pum!">';
    // }

    setTimeout(function() {
      if (ejercito.id == "arriba") {
      d.removeChild(d_nested);} else {
        d.removeChild(d_nested2);
      }
    }, 1000);

    // Borra 1 elemento desde la posicion
    if (ejercito.id == "arriba") {
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
        for (let x = 0; x < this.sector1.length; x++) {
          if (this.sector1[x].vida < 1){
            this.BorrarNave(this.sector1, x)
          }
        }
      }
    } else {
      if (this.sector2[0] != undefined) {
        this.sector2[0].Disparar(
          this.sector2[0].dolor,
          1,
          this.sector1.length,
          this.sector2[0].precision
        );
        for (let x = 0; x < this.sector2.length; x++) {
          if (this.sector2[x].vida < 1) {
            this.BorrarNave(this.sector2, x)
          }
        }
      }
    }
    if (this.turno == 0) {
      this.turno = 1;
      console.log("TURNO DE " + equipo1.nombre);
      this.ObtenerElementosEnPosicion();
    } else {
      this.turno = 0;
      console.log("TURNO DE " + equipo2.nombre);
      this.ObtenerElementosEnPosicion();
    }
    /* verdad=true;
      verdad=!verdad; */

    if (this.sector2.length < 1) {
      console.log("Ganó " + equipo1.nombre);
    }
    if (this.sector1.length < 1) {
      console.log("Ganó " + equipo2.nombre);
    }
  }

  ObtenerElementosEnPosicion() {
    console.log(equipo1.nombre);
    this.sector1.forEach(element => {
      console.log(element);
    });
    console.log(equipo2.nombre);
    this.sector2.forEach(element => {
      console.log(element);
    });
  }
}
const factorio = new Factorio();

const equipo1 = factorio.CrearEjercito(
  "EL IMPERIO",
  "arriba",
  "Caza TIE",
  3,
  "1.png",
  "Bombardero TIE",
  2,
  "1.png",
  "Interceptor TIE",
  5,
  "1.png"
);
const equipo2 = factorio.CrearEjercito(
  "LOS REBELDES",
  "abajo",
  "Caza estelar X-Wing T-65B",
  2,
  "1.png",
  "Caza estelar bombardero BTL-A4 Ala-Y",
  5,
  "1.png",
  "Caza estelar Ala-A",
  3,
  "1.png"
);
let naboo = new CampoDeBatalla(
  equipo1.listaNaves.length,
  equipo2.listaNaves.length
);
naboo.ColocarNaves(equipo1);
naboo.ColocarNaves(equipo2);
function Empezar() {
  naboo.InsertToHtml(equipo1, equipo2);
}

/* naboo.sector1[0].vida = 0; 
console.log(naboo.sector1.length);
if (naboo.sector1[0].vida < 1) {
  naboo.sector1.shift();
}
console.log(naboo.sector1.length);

console.log(naboo.sector1[0].vida);*/
//
function disparar(){
  naboo.Turno(equipo1, equipo2)
}
function Inf(){
  naboo.ObtenerElementosEnPosicion();
}