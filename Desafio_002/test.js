const Container = require('./index');

const container = new Container();

const seed = async () => {
  try {
    const product1 = await container.save({
      title: 'Escuadra',
      price: 5.45,
      thumbnail:
        'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
    });
    console.log('id:', product1);

    const product2 = await container.save({
      title: 'Calculadora',
      price: 105.45,
      thumbnail:
        'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
    });
    console.log('id:', product2);

    const product3 = await container.save({
      title: 'Calculadora',
      price: 105.45,
      thumbnail:
        'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
    });
    console.log('id:', product3);

    const resp1 = await container.getById(1);
    console.log('Producto:', resp1);

    const resp2 = await container.getAll();
    console.log('productos:', resp2);

    const resp3 = await container.deleteById(1);
    console.log(resp3);

    const resp4 = await container.deleteAll();
    console.log(resp4);

    const resp5 = await container.getById(2);
    console.log(resp5);

    const resp6 = await container.save();
    console.log(resp6);
  } catch (error) {
    console.log(error.message);
  }
};

seed();
