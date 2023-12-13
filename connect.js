const { MongoClient } = require('mongodb');
const config = require('./config');

const { dbUrl } = config;

async function connect() {
  try {
    const client = new MongoClient(dbUrl);
    await client.connect();
    const db = client.db('burger-queen');
    console.log('Successful connection to the database');

    // Estas son las operaciones en la base de datos
    const collection = db.collection('users');

    // Insertamos un documento de prueba
    const result = await collection.insertOne({
      email: 'aleolalde@gmail.com',
      password: '12345asdfg',
    });
    console.log(`Document inserted with ID: ${result.insertedId}`);

    // Indicamos que todas las operaciones se han completado con éxito antes de cerrar la conexión
    console.log('Operations completed');

    // Cerramos la conexión
    await client.close();
    console.log('Closed connection');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

connect();

module.exports = connect;
