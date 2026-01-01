const fs = require('fs');

function getDataPath() {
  return '/tmp/data.json';
}

function readData() {
  try {
    const dataPath = getDataPath();
    if (fs.existsSync(dataPath)) {
      const data = fs.readFileSync(dataPath, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading data:', error);
  }
  return { participants: [] };
}

function saveData(data) {
  try {
    const dataPath = getDataPath();
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
}

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

    const data = readData();
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
    
    saveData(data);

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

