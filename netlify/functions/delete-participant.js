const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // El ID viene como query parameter o en el path
    const { id } = event.queryStringParameters || {};
    let participantId = id;
    
    // Si no está en query, intentar parsearlo del path
    if (!participantId) {
      const pathMatch = event.path.match(/participants\/([^\/]+)/);
      participantId = pathMatch ? pathMatch[1] : null;
    }
    
    if (!participantId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'ID requerido' }),
      };
    }

    const store = getStore('participants');
    const DATA_KEY = 'data';
    
    const dataStr = await store.get(DATA_KEY);
    const data = dataStr ? JSON.parse(dataStr) : { participants: [] };
    
    const initialLength = data.participants.length;
    data.participants = data.participants.filter(p => p.id !== participantId);
    
    // Verificar que se eliminó algo
    if (data.participants.length === initialLength) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Participante no encontrado' }),
      };
    }
    
    await store.set(DATA_KEY, JSON.stringify(data));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true }),
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
