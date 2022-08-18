const fs = require("fs");

class Contenedor {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async save(obj) {
    try {
      let data = await fs.promises.readFile(this.ruta, "utf-8");
      let dataParse = JSON.parse(data);
      if (dataParse.length) {
        await fs.promises.writeFile(
          this.ruta,
          JSON.stringify(
            [...dataParse, { ...obj, id: dataParse.length + 1 }],
            null,
            2
          )
        );
      } else {
        await fs.promises.writeFile(
          this.ruta,
          JSON.stringify([{ ...obj, id: dataParse.length + 1 }], null, 2)
        );
      }
      return dataParse.length + 1;
    } catch (error) {
      console.log(error);
    }
  }

  ///// SOBREESCRIBIR ARCHIVO PARA METODO PUT //////////////

  async savePUT(obj) {
    try {
      let data = await fs.promises.readFile(this.ruta, "utf-8");
      let dataParse = JSON.parse(data);
  
      await fs.promises.writeFile( this.ruta, JSON.stringify(
            [...dataParse, { ...obj}], null, 2));              ///// GUARDA EL ARCHIVO PERO SIN GENERAR ID
      
      return dataParse;
    } catch (error) {
      console.log(error);
    }
  }

////////////////////////////////////////////////////////////////////

  async getById(id) {
    try {
      let data = await fs.promises.readFile(this.ruta, "utf-8");
      let dataParse = JSON.parse(data);
      let producto = dataParse.find((producto) => producto.id === id);
      if (producto) {
        console.log(producto)
        return producto;
      } else {
        console.log('No existe el ID')
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      let data = await fs.promises.readFile(this.ruta, "utf-8");
      let dataParse = JSON.parse(data);
      let arrayCompleto = dataParse;
      // console.log(arrayCompleto);
      return arrayCompleto;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      let data = await fs.promises.readFile(this.ruta, "utf-8");
      let dataParse = JSON.parse(data);
      let producto = dataParse.find((producto) => producto.id === id);
      if (producto) {
        let dataParseFiltrado = dataParse.filter((prod) => prod.id !== id);
        await fs.promises.writeFile(
          this.ruta,
          JSON.stringify(dataParseFiltrado, null, 2),
          "utf-8"
        );
        console.log("Producto Eliminado");
      } else {
        console.log("Id inexistente");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      fs.promises.writeFile(this.ruta, "[]", "utf-8");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Contenedor;
