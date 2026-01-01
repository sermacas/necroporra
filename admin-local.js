// Script para que el admin local pueda ver las listas desde Netlify
// Uso: node admin-local.js [NETLIFY_URL]

const NETLIFY_URL = process.argv[2] || 'https://necroporra2026.netlify.app';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

async function fetchDataFromNetlify() {
  try {
    const url = `${NETLIFY_URL}/api/data?password=${encodeURIComponent(ADMIN_PASSWORD)}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      const error = await response.json();
      console.error('❌ Error:', error.error || 'Error al obtener datos');
      process.exit(1);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    console.error(`Asegúrate de que la URL ${NETLIFY_URL} es correcta y está desplegada.`);
    process.exit(1);
  }
}

async function main() {
  console.log('📡 Obteniendo datos desde Netlify...');
  console.log(`URL: ${NETLIFY_URL}\n`);
  
  const data = await fetchDataFromNetlify();
  const participants = data.participants || [];
  
  console.log(`✅ Total de listas: ${participants.length}\n`);
  
  if (participants.length === 0) {
    console.log('📝 No hay listas todavía.\n');
    return;
  }
  
  participants.forEach((participant, index) => {
    console.log(`${index + 1}. ${participant.name} (${participant.email})`);
    console.log(`   Enviado: ${new Date(participant.createdAt).toLocaleString('es-ES')}`);
    console.log(`   Personajes: ${participant.characters.length}`);
    console.log('');
  });
}

main();

