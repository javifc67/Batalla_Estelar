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
   let objetivo = this.SeleccionarObjetivo(0, tamaño, precision)
    this.RecibirDisparo(dolor, objetivo, equipo)
  }

  SeleccionarObjetivo(min, max, precision) {
    let objetivo = Math.random() * (max - min) + min
    if((Math.random() * (100 - 0) + 0) < precision){
      return Math.floor(objetivo)
    } else {
      console.log("disparo fallado")
      return -1
    }
  }
  RecibirDisparo(dolor, objetivo, equipo) {
    if(objetivo == -1){return}
    if (equipo == 1){
      naboo.sector1[objetivo].vida -= dolor;
    } else{
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
    );}
  CambiarDeTactica(tactica) {}
}
class Factorio {
  constructor() {
    this.listaEquipos = [];
    this.tacticas = [];
    this.listaNaves = [];
  }
  CrearEjercito(nombreEjercito,id,nombre1, n1, imagen1,nombre2, n2,imagen2,nombre3, n3, imagen3) {
    const ejercito = new Ejercito(nombreEjercito, id);
    this.listaEquipos.push(ejercito);
    this.CrearNaves(ejercito,nombre1, n1, imagen1,nombre2, n2,imagen2,nombre3, n3, imagen3);
    return ejercito;
  }
  CrearNaves(ejercito,nombre1, n1, imagen1,nombre2, n2,imagen2,nombre3, n3, imagen3) {
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
    this.disparo = 0;
  }
  ColocarNaves(ejercito) {
    for (let i = 0; i < ejercito.listaNaves.length; i++) {
      if (ejercito.nombre == equipo1.nombre) {
        this.sector1[i] = ejercito.listaNaves[i];
        this.sector1[i].id = ejercito.nombre + i
      } else {
        this.sector2[i] = ejercito.listaNaves[i];
        this.sector2[i].id = ejercito.nombre + i
      }
    }

  }
  InsertToHtml(ejercito){
    for (let index = 0; index < this.sector1.length; index++) {
      let div = document.getElementById(ejercito.id);
      let element = ejercito.poscionNaves[index]
      div.innerHTML +=
        '<li id="' +
        ejercito.id +
        index +
        '"><img src="/' +
        element.imagen +
        '" alt="' +
        element.nombre +
        '"></li>';
    }
  }
  

  EmpezarPartida() {
    let turno = 0;
    
    while (this.sector1.length >= 1 && this.sector2.length >= 1) {
      if (turno == 0) {
        if (this.sector1[0] != undefined) {
        this.sector1[0].Disparar(this.sector1[0].dolor, 0, this.sector2.length, this.sector1[0].precision)
        
      }
         for (let x=0;x<this.sector1.length;x++){
          if(this.sector1[x].vida < 1)
          this.sector1.splice(x,1);
        }  
       
      } else {
        if (this.sector2[0] != undefined) {
          this.sector2[0].Disparar(this.sector2[0].dolor, 1, this.sector1.length, this.sector2[0].precision)
          
        }
           for (let x=0;x<this.sector2.length;x++){
            if(this.sector2[x].vida < 1)
            this.sector2.splice(x,1);
        }
          }  
      if (turno == 0) {
        turno = 1;
        console.log("TURNO DE "+ equipo1.nombre);
        this.ObtenerElementosEnPosicion();
        
      } else {
        turno = 0;
        console.log("TURNO DE "+ equipo2.nombre);
        this.ObtenerElementosEnPosicion();
      }
      /* verdad=true;
      verdad=!verdad; */
    }
    this.ObtenerElementosEnPosicion();
    if (this.sector1.length >= 1){
      console.log("Ganó " + equipo1.nombre)
    } else{
      console.log("Ganó " + equipo2.nombre)
    }
  }

  ObtenerElementosEnPosicion() {
    console.log(equipo1.nombre)
    this.sector1.forEach(element => {
      console.log(element);
    });
    console.log(equipo2.nombre)
    this.sector2.forEach(element => {
      console.log(element);
    });
  }
  

}
const factorio = new Factorio();

const equipo1 = factorio.CrearEjercito("EL IMPERIO","arriba","Caza TIE", 3,"1.png","Bombardero TIE", 2,"1.png","Interceptor TIE", 5,"1.png");
const equipo2 = factorio.CrearEjercito("LOS REBELDES","abajo","Caza estelar X-Wing T-65B", 2,"1.png","Caza estelar bombardero BTL-A4 Ala-Y", 5,"1.png","Caza estelar Ala-A", 3,"1.png");
let naboo = new CampoDeBatalla(
  equipo1.listaNaves.length,
  equipo2.listaNaves.length
);
naboo.ColocarNaves(equipo1);
naboo.ColocarNaves(equipo2);
naboo.InsertToHtml(equipo1);
naboo.InsertToHtml(equipo2);
naboo.EmpezarPartida();


/* naboo.sector1[0].vida = 0; 
console.log(naboo.sector1.length);
if (naboo.sector1[0].vida < 1) {
  naboo.sector1.shift();
}
console.log(naboo.sector1.length);

console.log(naboo.sector1[0].vida);*/
// 
