// Script de debug para ver qué está devolviendo el servidor
const NETLIFY_URL = 'https://necroporra2026.netlify.app';

async function testAPI() {
  try {
    const response = await fetch(`${NETLIFY_URL}/api/participants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
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
      })
    });

    const text = await response.text();
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    console.log('Headers:', Object.fromEntries(response.headers.entries()));
    console.log('\nResponse Body:');
    console.log(text);
    
    try {
      const json = JSON.parse(text);
      console.log('\nParsed JSON:');
      console.log(JSON.stringify(json, null, 2));
    } catch (e) {
      console.log('\nNo es JSON válido');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAPI();

