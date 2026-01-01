const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Inicializar archivo de datos si no existe
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ participants: [] }, null, 2));
}

// Leer datos
function readData() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { participants: [] };
  }
}

// Guardar datos
function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Validar reglas de la necroporra
function validateList(characters) {
  if (characters.length !== 10) {
    return { valid: false, error: 'Debe haber exactamente 10 personajes' };
  }

  // Validar que todos sean menores de 100 años
  const allUnder100 = characters.every(char => {
    if (!char.age) return false;
    const age = parseInt(char.age);
    return !isNaN(age) && age < 100;
  });

  if (!allUnder100) {
    return { valid: false, error: 'Todos los personajes deben ser menores de 100 años' };
  }

  // Separar por categorías
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

// Validar email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// API: Obtener participantes (solo admin)
app.get('/api/admin/participants', (req, res) => {
  const { password } = req.query;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
  
  // Comparar sin espacios en blanco
  const providedPassword = password ? password.trim() : '';
  const expectedPassword = ADMIN_PASSWORD.trim();
  
  if (providedPassword !== expectedPassword) {
    return res.status(401).json({ error: 'Contraseña incorrecta' });
  }

  const data = readData();
  res.json(data.participants);
});

// API: Verificar si email existe (sin exponer datos)
app.get('/api/check-email/:email', (req, res) => {
  const { email } = req.params;
  const data = readData();
  const exists = data.participants.some(p => p.email.toLowerCase() === email.toLowerCase());
  res.json({ exists });
});

// API: Crear nuevo participante
app.post('/api/participants', (req, res) => {
  const { name, email, characters } = req.body;

  if (!name || !email || !characters) {
    return res.status(400).json({ error: 'Nombre, email y personajes son requeridos' });
  }

  // Validar formato de email
  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  const data = readData();
  
  // Verificar si el email ya existe
  const emailExists = data.participants.some(p => p.email.toLowerCase() === email.toLowerCase().trim());
  if (emailExists) {
    return res.status(400).json({ error: 'Este email ya ha enviado una lista' });
  }

  const validation = validateList(characters);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  const newParticipant = {
    id: Date.now().toString(),
    name: name.trim(),
    email: email.toLowerCase().trim(),
    characters: characters,
    createdAt: new Date().toISOString()
  };

  data.participants.push(newParticipant);
  saveData(data);

  res.json({ success: true, participant: newParticipant });
});

// API: Eliminar participante
app.delete('/api/participants/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  data.participants = data.participants.filter(p => p.id !== id);
  saveData(data);
  res.json({ success: true });
});

const server = app.listen(PORT, '0.0.0.0', () => {
  const os = require('os');
  const networkInterfaces = os.networkInterfaces();
  let localIP = 'localhost';
  
  // Buscar la IP local
  for (const interfaceName in networkInterfaces) {
    const addresses = networkInterfaces[interfaceName];
    for (const address of addresses) {
      if (address.family === 'IPv4' && !address.internal) {
        localIP = address.address;
        break;
      }
    }
    if (localIP !== 'localhost') break;
  }
  
  console.log('\n========================================');
  console.log('🚀 Servidor Necroporra 2026 iniciado');
  console.log('========================================');
  console.log(`📍 Local:     http://localhost:${PORT}`);
  console.log(`🌐 Red local: http://${localIP}:${PORT}`);
  console.log(`🔐 Admin:     http://${localIP}:${PORT}/admin.html`);
  console.log('========================================\n');
});

