// Función para obtener los datos (para el admin local)
const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // Verificar contraseña de admin si se proporciona
    const { password } = event.queryStringParameters || {};
    
    if (password) {
      const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
      const providedPassword = password.trim();
      const expectedPassword = ADMIN_PASSWORD.trim();
      
      if (providedPassword !== expectedPassword) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Contraseña incorrecta' }),
        };
      }
    }

    const store = getStore('participants');
    const DATA_KEY = 'data';
    
    const dataStr = await store.get(DATA_KEY);
    const data = dataStr ? JSON.parse(dataStr) : { participants: [] };
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Error interno del servidor' }),
    };
  }
};
