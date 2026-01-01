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
    const { password } = event.queryStringParameters || {};
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
    
    const providedPassword = password ? password.trim() : '';
    const expectedPassword = ADMIN_PASSWORD.trim();
    
    if (providedPassword !== expectedPassword) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Contraseña incorrecta' }),
      };
    }

    const data = readData();
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data.participants),
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

