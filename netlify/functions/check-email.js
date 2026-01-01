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
    const { email } = event.pathParameters || {};
    if (!email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Email requerido' }),
      };
    }

    const store = getStore('participants');
    const DATA_KEY = 'data';
    
    const dataStr = await store.get(DATA_KEY);
    const data = dataStr ? JSON.parse(dataStr) : { participants: [] };
    
    const exists = data.participants.some(p => p.email.toLowerCase() === decodeURIComponent(email).toLowerCase());

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ exists }),
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
