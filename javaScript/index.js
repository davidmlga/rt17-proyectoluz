"use strict";

"use strict";

import getPrecios from "./getPrecios.js";
import {
  getPrecioActual,
  getPrecioMasBarato,
  getPrecioMasCaro,
} from "./tarifas.js";

const init = async () => {
  const precios = await getPrecios();
  console.log(precios);
  const precioActual = getPrecioActual(precios);
  const precioMasBarato = getPrecioMasBarato(precios);
  const precioMasCaro = getPrecioMasCaro(precios);

  const hour = precioActual.hora;
  const horaPrecioMasBarato = precioMasBarato.hora.split("-")[0];
  const horaPrecioMasCaro = precioMasCaro.hora.split("-")[0];
  console.log(precios, precioActual, precioMasCaro, precioMasBarato);
  console.log(precioActual.precio);
  const tarifaluz = [
    {
      nombre: "Precio máximo",
      valor: precioMasCaro.precio,
      hora: horaPrecioMasCaro,
      icono: "images/fotomax.png",
    },
    {
      nombre: "Precio actual",
      valor: precioActual.precio,
      hora: hour,
      icono: "images/fotomid.png",
    },
    {
      nombre: "Precio mínimo",
      valor: precioMasBarato.precio,
      hora: horaPrecioMasBarato,
      icono: "images/fotomin.png",
    },
  ];

  //Seleccionamos el main
  // creamos un ul
  const main = document.querySelector("main");

  const ulTarifaLuz = document.createElement("ul");

  for (let i = 0; i < tarifaluz.length; i++) {
    const tarifa = tarifaluz[i];

    // creamos el elemento  li e introducimos sus datos:
    const liTarifaLuz = document.createElement("li");

    //metemos nombre, icono y valor dentro de li
    const nombreP = document.createElement("p");
    nombreP.textContent = tarifa.nombre;
    liTarifaLuz.append(nombreP);
    const icono = document.createElement("img");
    icono.src = tarifa.icono;
    liTarifaLuz.append(icono);
    const valorP = document.createElement("p");
    valorP.textContent = tarifa.valor + " €/MWh";
    liTarifaLuz.append(valorP);
    const horaP = document.createElement("p");
    horaP.textContent = tarifa.hora + "h";
    liTarifaLuz.append(horaP);

    //  metemos   li dentro de ul
    ulTarifaLuz.append(liTarifaLuz);
  }

  //crea la section con la clase tarifaLuz
  const section = document.createElement("section");
  section.classList.add("tarifaLuz");

  // por ultimo metemos todos los valores de h2 y  ul en la section
  const titleTarifaLuz = document.createElement("h2");
  titleTarifaLuz.textContent = "TARIFA DE LA LUZ";
  section.append(titleTarifaLuz, ulTarifaLuz);

  // metemos la section dentro del main
  main.append(section);

  //creamos un array de objetos donde cada objeto es un electrodoméstico
  const electrodomesticos = [
    { nombre: "microondas", potenciakw: 1.5, img: "images/microondas.png" },
    { nombre: "Televisor", potenciakw: 0.4, img: "images/tv.png" },
    { nombre: "nevera", potenciakw: 0.35, img: "images/nevera.png" },
  ];

  // creamos un ul
  const ulElectro = document.createElement("ul");
  ulElectro.id = "lista-electrodomesticos";

  // recorremos el array de objetos para calcular el costo de luz de cada uno
  for (let i = 0; i < electrodomesticos.length; i++) {
    const electrodomestico = electrodomesticos[i];
    const costo = (electrodomestico.potenciakw / 1000) * precioActual.precio;
    console.log(
      `${electrodomestico.nombre}: ${costo.toFixed(2)} euros por hora`
    );

    // creamos un elemento li
    const liElectro = document.createElement("li");

    // metemos dentro de li la imagen del electrodoméstico
    const imagen = document.createElement("img");
    imagen.src = electrodomestico.img;
    liElectro.append(imagen);

    // metemos dentro de li el texto que corresponde a su costo

    const textoP = document.createElement("p");
    textoP.textContent = `${costo.toFixed(2)} euros por hora`;
    liElectro.append(textoP);

    // metemos el li dentro del ul
    ulElectro.append(liElectro);
  }
  // creamos un article
  const article = document.createElement("article");
  article.classList.add("electrodomesticos");

  //creamos el h2 para los electrodomesticos
  const titleElectro = document.createElement("h2");
  titleElectro.textContent = "Electrodomésticos";

  //metemos el h2 y la ul en el article
  article.append(titleElectro, ulElectro);

  // metemos el article dentro del main
  main.append(article);
};
init();
