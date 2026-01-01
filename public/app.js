const API_URL = window.location.origin;

let currentCharacters = Array(10).fill(null).map((_, i) => ({
    name: '',
    age: '',
    terminal: false
}));

// Inicializar formulario
function initForm() {
    const container = document.getElementById('characters-list');
    
    currentCharacters.forEach((char, index) => {
        const charDiv = document.createElement('div');
        charDiv.className = 'character-item';
        charDiv.innerHTML = `
            <h4>Personaje ${index + 1}</h4>
            <div class="character-fields">
                <div class="character-field">
                    <label>Nombre completo:</label>
                    <input type="text" 
                           class="char-name" 
                           data-index="${index}"
                           placeholder="Ej: Juan Pérez"
                           value="${char.name}">
                </div>
                <div class="character-field">
                    <label>Edad:</label>
                    <input type="number" 
                           class="char-age" 
                           data-index="${index}"
                           placeholder="Ej: 85"
                           min="0" 
                           max="99"
                           value="${char.age}">
                </div>
                <div class="character-field">
                    <div class="checkbox-group">
                        <input type="checkbox" 
                               class="char-terminal" 
                               data-index="${index}"
                               ${char.terminal ? 'checked' : ''}>
                        <label>Enfermedad terminal</label>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(charDiv);
    });

    // Event listeners para inputs
    container.addEventListener('input', (e) => {
        if (e.target.classList.contains('char-name')) {
            const index = parseInt(e.target.dataset.index);
            currentCharacters[index].name = e.target.value;
        } else if (e.target.classList.contains('char-age')) {
            const index = parseInt(e.target.dataset.index);
            currentCharacters[index].age = e.target.value;
        }
    });

    container.addEventListener('change', (e) => {
        if (e.target.classList.contains('char-terminal')) {
            const index = parseInt(e.target.dataset.index);
            currentCharacters[index].terminal = e.target.checked;
        }
    });
}

// Validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Verificar si el email ya existe
async function checkEmailExists(email) {
    try {
        const response = await fetch(`${API_URL}/api/check-email/${encodeURIComponent(email)}`);
        const data = await response.json();
        return data.exists;
    } catch (error) {
        console.error('Error al verificar email:', error);
        return false;
    }
}

// Validar formulario
async function validateForm() {
    const messageDiv = document.getElementById('validation-message');
    messageDiv.className = 'validation-message';
    messageDiv.textContent = '';

    // Validar nombre
    const name = document.getElementById('participant-name').value.trim();
    if (!name) {
        showError('Por favor, ingresa tu nombre');
        return false;
    }

    // Validar email
    const email = document.getElementById('participant-email').value.trim();
    if (!email) {
        showError('Por favor, ingresa tu correo electrónico');
        return false;
    }

    if (!validateEmail(email)) {
        showError('Por favor, ingresa un correo electrónico válido');
        return false;
    }

    // Verificar si el email ya existe
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
        showError('Este correo electrónico ya ha enviado una lista. Solo puedes enviar una lista por correo.');
        return false;
    }

    // Validar que todos los personajes tengan nombre y edad
    for (let i = 0; i < currentCharacters.length; i++) {
        const char = currentCharacters[i];
        if (!char.name.trim()) {
            showError(`El personaje ${i + 1} debe tener un nombre`);
            return false;
        }
        if (!char.age || isNaN(parseInt(char.age))) {
            showError(`El personaje ${i + 1} debe tener una edad válida`);
            return false;
        }
        const age = parseInt(char.age);
        if (age < 0 || age >= 100) {
            showError(`El personaje ${i + 1} debe tener entre 0 y 99 años`);
            return false;
        }
    }

    // Validar reglas de categorías
    const category1 = currentCharacters.filter(char => {
        const age = parseInt(char.age);
        return age >= 84 || char.terminal === true;
    });

    const category2 = currentCharacters.filter(char => {
        const age = parseInt(char.age);
        return age < 84 && char.terminal !== true;
    });

    if (category1.length !== 5) {
        showError(`Debe haber exactamente 5 personajes con 84+ años o terminales. Tienes ${category1.length}`);
        return false;
    }

    if (category2.length !== 5) {
        showError(`Debe haber exactamente 5 personajes menores de 84 años y no terminales. Tienes ${category2.length}`);
        return false;
    }

    return true;
}

function showError(message) {
    const messageDiv = document.getElementById('validation-message');
    messageDiv.className = 'validation-message error';
    messageDiv.textContent = message;
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showSuccess(message) {
    const messageDiv = document.getElementById('validation-message');
    messageDiv.className = 'validation-message success';
    messageDiv.textContent = message;
}

// Enviar formulario
document.getElementById('participant-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    const isValid = await validateForm();
    if (!isValid) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Guardar Lista';
        return;
    }

    const name = document.getElementById('participant-name').value.trim();
    const email = document.getElementById('participant-email').value.trim();
    
    try {
        const response = await fetch(`${API_URL}/api/participants`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                characters: currentCharacters.map(char => ({
                    name: char.name.trim(),
                    age: parseInt(char.age),
                    terminal: char.terminal
                }))
            })
        });

        const data = await response.json();

        if (!response.ok) {
            showError(data.error || 'Error al guardar la lista');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Guardar Lista';
            return;
        }

        // Guardar los datos enviados antes de resetear
        const submittedData = {
            name: name,
            email: email,
            characters: currentCharacters.map(char => ({
                name: char.name.trim(),
                age: parseInt(char.age),
                terminal: char.terminal
            }))
        };

        // Mostrar pantalla de éxito con la lista
        document.getElementById('participant-form').style.display = 'none';
        document.getElementById('success-screen').style.display = 'block';
        document.getElementById('validation-message').style.display = 'none';
        
        // Mostrar la lista enviada
        displaySubmittedList(submittedData);

        // Resetear formulario
        document.getElementById('participant-form').reset();
        currentCharacters = Array(10).fill(null).map(() => ({
            name: '',
            age: '',
            terminal: false
        }));
        
        // Resetear inputs del formulario
        document.querySelectorAll('.char-name, .char-age').forEach(input => {
            input.value = '';
        });
        document.querySelectorAll('.char-terminal').forEach(checkbox => {
            checkbox.checked = false;
        });

    } catch (error) {
        showError('Error de conexión. Por favor, intenta de nuevo.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Guardar Lista';
        console.error(error);
    }
});

// Mostrar la lista enviada en la pantalla de éxito
function displaySubmittedList(data) {
    const reviewContainer = document.getElementById('review-list');
    
    // Separar personajes por categoría
    const category1 = data.characters.filter(char => {
        return char.age >= 84 || char.terminal === true;
    });
    
    const category2 = data.characters.filter(char => {
        return char.age < 84 && char.terminal !== true;
    });

    reviewContainer.innerHTML = `
        <div class="participant-card" style="max-width: 100%; margin: 0 auto;">
            <div class="participant-header" style="border-bottom: 2px solid #e8e8e8; padding-bottom: 15px; margin-bottom: 20px;">
                <div>
                    <div class="participant-name">${escapeHtml(data.name)}</div>
                    <div style="color: #666; font-size: 0.9rem; margin-top: 5px;">${escapeHtml(data.email)}</div>
                </div>
            </div>
            <div style="margin-bottom: 20px;">
                <h4 style="color: #667eea; margin-bottom: 15px; font-size: 1.1rem;">5 Personajes (84+ años o Terminales)</h4>
                <div class="characters-grid">
                    ${category1.map(char => `
                        <div class="character-card">
                            <div class="character-info">
                                <div class="character-name">${escapeHtml(char.name)}</div>
                                <div class="character-details">
                                    ${char.age} años${char.terminal ? ' • Terminal' : ''}
                                </div>
                            </div>
                            <span class="character-badge badge-category1">84+ o Terminal</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div>
                <h4 style="color: #667eea; margin-bottom: 15px; font-size: 1.1rem;">5 Personajes (<84 años, No terminales)</h4>
                <div class="characters-grid">
                    ${category2.map(char => `
                        <div class="character-card">
                            <div class="character-info">
                                <div class="character-name">${escapeHtml(char.name)}</div>
                                <div class="character-details">
                                    ${char.age} años • No terminal
                                </div>
                            </div>
                            <span class="character-badge badge-category2"><84 años</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// Escapar HTML para prevenir XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Inicializar
initForm();
