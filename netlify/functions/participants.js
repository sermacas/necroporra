// Netlify Function para gestionar participantes
const fs = require('fs');
const path = require('path');

// Nota: Netlify Functions no pueden escribir archivos persistentes
// Para producción, deberías usar una base de datos (FaunaDB, MongoDB Atlas, etc.)
// Por ahora, esto funcionará pero los datos se perderán al reiniciar

// Función auxiliar para obtener ruta del archivo
function getDataPath() {
  // En Netlify, usar /tmp que es el único directorio escribible
  return '/tmp/data.json';
}

// Leer datos
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

// Guardar datos
function saveData(data) {
  try {
    const dataPath = getDataPath();
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
}

// Validar email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validar reglas de la necroporra
function validateList(characters) {
  if (characters.length !== 10) {
    return { valid: false, error: 'Debe haber exactamente 10 personajes' };
  }

  const allUnder100 = characters.every(char => {
    if (!char.age) return false;
    const age = parseInt(char.age);
    return !isNaN(age) && age < 100;
  });

  if (!allUnder100) {
    return { valid: false, error: 'Todos los personajes deben ser menores de 100 años' };
  }

  const category1 = characters.filter(char => {
    const age = parseInt(char.age);
    return !isNaN(age) && (age >= 84 || char.terminal === true);
  });

  const category2 = characters.filter(char => {
    const age = parseInt(char.age);
    return !isNaN(age) && age < 84 && char.terminal !== true;
  });

  if (category1.length !== 5) {
    return { valid: false, error: `Debe haber exactamente 5 personajes con 84+ años o terminales (tienes ${category1.length})` };
  }

  if (category2.length !== 5) {
    return { valid: false, error: `Debe haber exactamente 5 personajes menores de 84 años y no terminales (tienes ${category2.length})` };
  }

  return { valid: true };
}

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // POST: Crear participante
    if (event.httpMethod === 'POST') {
      const { name, email, characters } = JSON.parse(event.body || '{}');

      if (!name || !email || !characters) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Nombre, email y personajes son requeridos' }),
        };
      }

      if (!validateEmail(email)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Email inválido' }),
        };
      }

      const data = readData();
      const emailExists = data.participants.some(p => p.email.toLowerCase() === email.toLowerCase().trim());
      
      if (emailExists) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Este email ya ha enviado una lista' }),
        };
      }

      const validation = validateList(characters);
      if (!validation.valid) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: validation.error }),
        };
      }

      const newParticipant = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        characters: characters,
        createdAt: new Date().toISOString(),
      };

      data.participants.push(newParticipant);
      saveData(data);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, participant: newParticipant }),
      };
    }

    // GET: Obtener participantes (no se usa, pero por compatibilidad)
    if (event.httpMethod === 'GET') {
      const data = readData();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data.participants),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método no permitido' }),
    };

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método no permitido' }),
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

