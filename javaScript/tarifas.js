"use strict";
const now = new Date();

const getPrecioActual = (precios) => {
  const hour = now.getHours();
  const precioActual = precios[`${hour}-${hour + 1}`].price;
  console.log(
    `El precio de la luz a las ${hour}:00h es ${precioActual} euros/MWh`
  );

  return { precio: precioActual, hora: `${hour}` };
};

const getPrecioMasBarato = (precios) => {
  // Convertir el objeto de precios a un array de objetos con clave "hora" y valor "precio"
  const preciosArray = Object.entries(precios).map(([key, value]) => ({
    hora: key,
    precio: value.price,
  }));

  // Ordenar los precios de menor a mayor
  preciosArray.sort((a, b) => a.precio - b.precio);

  // Seleccionar el precio más bajo
  const precioMasBarato = preciosArray[0];

  // Obtener la hora más barata sin el guión y el rango horario
  const horaMasBarata = precioMasBarato.hora.split("-")[0];

  // Mostrar el mensaje con la hora más barata sin el guión y el rango horario
  console.log(
    `El precio más bajo de la luz es de ${precioMasBarato.precio} euros/MWh a las ${horaMasBarata}h`
  );

  return precioMasBarato;
};

const getPrecioMasCaro = (precios) => {
  // Convertir el objeto de precios a un array de objetos con clave "hora" y valor "precio"
  const preciosArray = Object.entries(precios).map(([key, value]) => ({
    hora: key,
    precio: value.price,
  }));

  // Ordenar los precios de mayor a menor
  preciosArray.sort((a, b) => b.precio - a.precio);

  // Seleccionar el precio más alto
  const precioMasCaro = preciosArray[0];
  // Obtener la hora más cara sin el guión y el rango horario
  const horaMasCara = precioMasCaro.hora.split("-")[0];

  console.log(
    `El precio más alto de la luz es de ${precioMasCaro.precio} euros/MWh a las ${horaMasCara}h`
  );

  return precioMasCaro;
};

export { getPrecioActual, getPrecioMasBarato, getPrecioMasCaro };
