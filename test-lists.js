// Script para probar el envío de múltiples listas
const NETLIFY_URL = process.env.NETLIFY_URL || 'https://necroporra2026.netlify.app';

const testLists = [
  {
    name: 'Juan Pérez',
    email: 'juan.perez@test.com',
    characters: [
      { name: 'Personaje 1', age: 85, terminal: false },
      { name: 'Personaje 2', age: 87, terminal: false },
      { name: 'Personaje 3', age: 88, terminal: true },
      { name: 'Personaje 4', age: 90, terminal: false },
      { name: 'Personaje 5', age: 86, terminal: false },
      { name: 'Personaje 6', age: 45, terminal: false },
      { name: 'Personaje 7', age: 50, terminal: false },
      { name: 'Personaje 8', age: 35, terminal: false },
      { name: 'Personaje 9', age: 60, terminal: false },
      { name: 'Personaje 10', age: 55, terminal: false }
    ]
  },
  {
    name: 'María García',
    email: 'maria.garcia@test.com',
    characters: [
      { name: 'Famoso 1', age: 92, terminal: false },
      { name: 'Famoso 2', age: 89, terminal: false },
      { name: 'Famoso 3', age: 84, terminal: false },
      { name: 'Famoso 4', age: 86, terminal: true },
      { name: 'Famoso 5', age: 91, terminal: false },
      { name: 'Famoso 6', age: 30, terminal: false },
      { name: 'Famoso 7', age: 40, terminal: false },
      { name: 'Famoso 8', age: 25, terminal: false },
      { name: 'Famoso 9', age: 55, terminal: false },
      { name: 'Famoso 10', age: 48, terminal: false }
    ]
  },
  {
    name: 'Carlos López',
    email: 'carlos.lopez@test.com',
    characters: [
      { name: 'Celebridad 1', age: 88, terminal: false },
      { name: 'Celebridad 2', age: 85, terminal: true },
      { name: 'Celebridad 3', age: 93, terminal: false },
      { name: 'Celebridad 4', age: 87, terminal: false },
      { name: 'Celebridad 5', age: 84, terminal: true },
      { name: 'Celebridad 6', age: 42, terminal: false },
      { name: 'Celebridad 7', age: 38, terminal: false },
      { name: 'Celebridad 8', age: 52, terminal: false },
      { name: 'Celebridad 9', age: 33, terminal: false },
      { name: 'Celebridad 10', age: 47, terminal: false }
    ]
  },
  {
    name: 'Ana Martínez',
    email: 'ana.martinez@test.com',
    characters: [
      { name: 'Personalidad 1', age: 90, terminal: false },
      { name: 'Personalidad 2', age: 86, terminal: false },
      { name: 'Personalidad 3', age: 89, terminal: false },
      { name: 'Personalidad 4', age: 91, terminal: false },
      { name: 'Personalidad 5', age: 85, terminal: true },
      { name: 'Personalidad 6', age: 28, terminal: false },
      { name: 'Personalidad 7', age: 36, terminal: false },
      { name: 'Personalidad 8', age: 44, terminal: false },
      { name: 'Personalidad 9', age: 57, terminal: false },
      { name: 'Personalidad 10', age: 39, terminal: false }
    ]
  },
  {
    name: 'Luis Rodríguez',
    email: 'luis.rodriguez@test.com',
    characters: [
      { name: 'Artista 1', age: 87, terminal: false },
      { name: 'Artista 2', age: 84, terminal: false },
      { name: 'Artista 3', age: 92, terminal: true },
      { name: 'Artista 4', age: 88, terminal: false },
      { name: 'Artista 5', age: 86, terminal: false },
      { name: 'Artista 6', age: 31, terminal: false },
      { name: 'Artista 7', age: 43, terminal: false },
      { name: 'Artista 8', age: 49, terminal: false },
      { name: 'Artista 9', age: 27, terminal: false },
      { name: 'Artista 10', age: 56, terminal: false }
    ]
  }
];

async function sendList(list) {
  try {
    const response = await fetch(`${NETLIFY_URL}/api/participants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(list)
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log(`✅ ${list.name} (${list.email}) - Lista enviada correctamente`);
      return true;
    } else {
      console.log(`❌ ${list.name} (${list.email}) - Error: ${data.error || 'Error desconocido'}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${list.name} (${list.email}) - Error de conexión: ${error.message}`);
    return false;
  }
}

async function verifyLists() {
  try {
    const response = await fetch(`${NETLIFY_URL}/api/admin/participants?password=admin123`);
    const participants = await response.json();
    
    console.log(`\n📊 Total de listas guardadas: ${participants.length}\n`);
    
    if (participants.length > 0) {
      console.log('Listas guardadas:');
      participants.forEach((p, index) => {
        console.log(`  ${index + 1}. ${p.name} (${p.email}) - ${p.characters.length} personajes`);
      });
    }
  } catch (error) {
    console.log(`\n❌ Error al verificar listas: ${error.message}`);
  }
}

async function main() {
  console.log(`🚀 Enviando ${testLists.length} listas de prueba a ${NETLIFY_URL}\n`);
  
  let successCount = 0;
  let failCount = 0;

  for (const list of testLists) {
    const success = await sendList(list);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
    // Esperar un poco entre envíos para evitar rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n📈 Resultados:`);
  console.log(`   ✅ Exitosas: ${successCount}`);
  console.log(`   ❌ Fallidas: ${failCount}`);

  // Verificar que se guardaron correctamente
  console.log('\n🔍 Verificando listas guardadas...');
  await verifyLists();
}

main().catch(console.error);

