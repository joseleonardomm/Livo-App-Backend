// ==============================================
// SISTEMA DE AUTENTICACIÓN CON FIREBASE
// ==============================================

// Esperar a que Firebase esté listo
window.addEventListener('firebase-ready', function() {
    console.log('🔐 Inicializando sistema de autenticación Firebase...');
    initAuthSystem();
});

// Usuario administrador por defecto
const DEFAULT_ADMIN = {
    email: 'admin@tienda.com',
    password: 'admin123',
    name: 'Administrador',
    phone: '+58 123 456 7890',
    address: 'Av. Principal 1234, Caracas',
    role: 'admin',
    isActive: true,
    createdAt: new Date().toISOString()
};

// Inicializar sistema de autenticación
async function initAuthSystem() {
    try {
        // Configurar observador de autenticación
        const { auth, onAuthStateChanged } = window.firebaseServices;
        
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log('✅ Usuario autenticado:', user.email);
                
                // Obtener datos adicionales del usuario desde Firestore
                const userData = await getUserData(user.uid);
                
                // Guardar en localStorage para uso rápido
                localStorage.setItem('currentUser', JSON.stringify({
                    uid: user.uid,
                    email: user.email,
                    ...userData
                }));
            } else {
                console.log('❌ No hay usuario autenticado');
                localStorage.removeItem('currentUser');
            }
            
            // Actualizar enlace de autenticación
            updateAuthLink();
        });
        
        // Verificar si existe el usuario admin, si no, crearlo
        await checkAndCreateAdmin();
        
        console.log('✅ Sistema de autenticación Firebase listo');
    } catch (error) {
        console.error('❌ Error inicializando autenticación:', error);
    }
}

// Verificar y crear usuario administrador
async function checkAndCreateAdmin() {
    try {
        const { auth, createUserWithEmailAndPassword } = window.firebaseServices;
        const { db, doc, setDoc } = window.firebaseServices;
        
        // Intentar iniciar sesión con credenciales de admin
        try {
            await signInWithEmailAndPassword(auth, DEFAULT_ADMIN.email, DEFAULT_ADMIN.password);
            console.log('✅ Admin ya existe');
        } catch (error) {
            // Si falla, crear el usuario admin
            console.log('👤 Creando usuario administrador...');
            
            const userCredential = await createUserWithEmailAndPassword(
                auth, 
                DEFAULT_ADMIN.email, 
                DEFAULT_ADMIN.password
            );
            
            // Guardar datos adicionales en Firestore
            const userDocRef = doc(db, "users", userCredential.user.uid);
            await setDoc(userDocRef, {
                ...DEFAULT_ADMIN,
                uid: userCredential.user.uid,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
            
            // Cerrar sesión para que el usuario inicie normalmente
            await signOut(auth);
            
            console.log('✅ Usuario administrador creado');
        }
    } catch (error) {
        console.error('❌ Error verificando/creando admin:', error);
    }
}

// Obtener datos adicionales del usuario desde Firestore
async function getUserData(userId) {
    try {
        const { db, doc, getDoc } = window.firebaseServices;
        
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
            return userDoc.data();
        }
        
        // Si no existe el documento, crear uno básico
        const basicUserData = {
            name: userId.split('@')[0] || 'Usuario',
            role: 'customer',
            isActive: true,
            createdAt: new Date().toISOString()
        };
        
        await setDoc(userDocRef, basicUserData);
        return basicUserData;
        
    } catch (error) {
        console.error('❌ Error obteniendo datos de usuario:', error);
        return {
            name: 'Usuario',
            role: 'customer',
            isActive: true
        };
    }
}

// ==============================================
// OPERACIONES DE AUTENTICACIÓN
// ==============================================

// Registrar nuevo usuario
async function registerUser(userData) {
    try {
        const { email, password, confirmPassword, name, phone, address } = userData;
        
        // Validaciones
        if (!email || !password || !confirmPassword || !name) {
            return { success: false, message: 'Por favor, complete todos los campos obligatorios.' };
        }
        
        if (password !== confirmPassword) {
            return { success: false, message: 'Las contraseñas no coinciden.' };
        }
        
        const { auth, createUserWithEmailAndPassword } = window.firebaseServices;
        const { db, doc, setDoc } = window.firebaseServices;
        
        // Crear usuario en Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Guardar datos adicionales en Firestore
        const userDocRef = doc(db, "users", userCredential.user.uid);
        await setDoc(userDocRef, {
            email: email.toLowerCase().trim(),
            name: name.trim(),
            phone: phone ? phone.trim() : '',
            address: address ? address.trim() : '',
            role: 'customer',
            isActive: true,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            preferences: {
                newsletter: true,
                notifications: true
            }
        });
        
        return { 
            success: true, 
            message: '¡Registro exitoso! Bienvenido/a ' + name,
            user: userCredential.user
        };
    } catch (error) {
        console.error('❌ Error registrando usuario:', error);
        
        let message = 'Error al registrar usuario. ';
        switch (error.code) {
            case 'auth/email-already-in-use':
                message += 'Este correo ya está registrado.';
                break;
            case 'auth/invalid-email':
                message += 'Correo electrónico inválido.';
                break;
            case 'auth/weak-password':
                message += 'La contraseña es demasiado débil.';
                break;
            default:
                message += error.message;
        }
        
        return { success: false, message };
    }
}

// Iniciar sesión
async function loginUser(email, password) {
    try {
        if (!email || !password) {
            return { success: false, message: 'Por favor, ingrese correo y contraseña.' };
        }
        
        const { auth, signInWithEmailAndPassword } = window.firebaseServices;
        const { db, doc, updateDoc } = window.firebaseServices;
        
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Actualizar último inicio de sesión en Firestore
        const userDocRef = doc(db, "users", userCredential.user.uid);
        await updateDoc(userDocRef, {
            lastLogin: new Date().toISOString()
        });
        
        // Obtener datos completos del usuario
        const userData = await getUserData(userCredential.user.uid);
        
        return { 
            success: true, 
            message: '¡Inicio de sesión exitoso!',
            user: { 
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                ...userData
            }
        };
    } catch (error) {
        console.error('❌ Error iniciando sesión:', error);
        
        let message = 'Error al iniciar sesión. ';
        switch (error.code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                message += 'Correo o contraseña incorrectos.';
                break;
            case 'auth/user-disabled':
                message += 'Esta cuenta ha sido desactivada.';
                break;
            default:
                message += error.message;
        }
        
        return { success: false, message };
    }
}

// Cerrar sesión
async function logoutUser() {
    try {
        const { auth, signOut } = window.firebaseServices;
        await signOut(auth);
        
        localStorage.removeItem('currentUser');
        return { success: true, message: 'Sesión cerrada exitosamente.' };
    } catch (error) {
        console.error('❌ Error cerrando sesión:', error);
        return { success: false, message: 'Error al cerrar sesión.' };
    }
}

// Obtener usuario actual
function getCurrentUser() {
    try {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    } catch (error) {
        console.error('❌ Error obteniendo usuario actual:', error);
        return null;
    }
}

// Verificar si el usuario está autenticado
function isAuthenticated() {
    return getCurrentUser() !== null;
}

// Verificar si el usuario es administrador
function isAdmin() {
    const user = getCurrentUser();
    return user && user.role === 'admin';
}

// Solicitar recuperación de contraseña
async function requestPasswordReset(email) {
    try {
        if (!email) {
            return { success: false, message: 'Por favor, ingrese su correo electrónico.' };
        }
        
        const { auth, sendPasswordResetEmail } = window.firebaseServices;
        await sendPasswordResetEmail(auth, email);
        
        return { 
            success: true, 
            message: 'Se han enviado instrucciones a su correo electrónico.'
        };
    } catch (error) {
        console.error('❌ Error solicitando recuperación:', error);
        
        let message = 'Error al solicitar recuperación. ';
        switch (error.code) {
            case 'auth/user-not-found':
                message += 'No hay cuenta asociada a este correo.';
                break;
            case 'auth/invalid-email':
                message += 'Correo electrónico inválido.';
                break;
            default:
                message += error.message;
        }
        
        return { success: false, message };
    }
}

// Actualizar perfil de usuario
async function updateUserProfile(userId, updates) {
    try {
        const { db, doc, updateDoc } = window.firebaseServices;
        
        // Actualizar datos en Firestore
        const userDocRef = doc(db, "users", userId);
        await updateDoc(userDocRef, {
            ...updates,
            updatedAt: new Date().toISOString()
        });
        
        // Actualizar localStorage si es el usuario actual
        const currentUser = getCurrentUser();
        if (currentUser && currentUser.uid === userId) {
            const updatedUser = { ...currentUser, ...updates };
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        }
        
        return { 
            success: true, 
            message: 'Perfil actualizado exitosamente.'
        };
    } catch (error) {
        console.error('❌ Error actualizando perfil:', error);
        return { success: false, message: 'Error al actualizar el perfil.' };
    }
}

// ==============================================
// FUNCIONES DE INTERFAZ
// ==============================================

// Mostrar notificación de autenticación
function showAuthNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `auth-message ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Agregar a la página si hay un contenedor
    const container = document.querySelector('.auth-container') || document.querySelector('.config-container') || document.body;
    
    if (container.querySelector('.auth-message')) {
        container.querySelector('.auth-message').remove();
    }
    
    if (container === document.body) {
        notification.style.position = 'fixed';
        notification.style.top = '100px';
        notification.style.right = '20px';
        notification.style.zIndex = '10000';
        notification.style.maxWidth = '400px';
        document.body.appendChild(notification);
    } else {
        container.insertBefore(notification, container.firstChild);
    }
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Actualizar enlace de autenticación en el header
function updateAuthLink() {
    const authLink = document.getElementById('authLink');
    const authText = document.getElementById('authText');
    const configLink = document.getElementById('configLink');
    
    if (!authLink) return;
    
    const currentUser = getCurrentUser();
    
    if (currentUser) {
        // Usuario autenticado
        authLink.href = '#';
        authLink.onclick = async function(e) {
            e.preventDefault();
            if (confirm(`¿Desea cerrar sesión, ${currentUser.name}?`)) {
                await logoutUser();
                showAuthNotification('Sesión cerrada exitosamente.', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            }
        };
        authText.textContent = currentUser.name.split(' ')[0]; // Mostrar solo primer nombre
        
        // Mostrar enlace de configuración solo para administradores
        if (configLink) {
            if (currentUser.role === 'admin') {
                configLink.style.display = 'inline-flex';
            } else {
                configLink.style.display = 'none';
            }
        }
    } else {
        // No autenticado
        authLink.href = 'login.html';
        authLink.onclick = null;
        authText.textContent = 'Iniciar Sesión';
        
        if (configLink) {
            configLink.style.display = 'none';
        }
    }
}

// Proteger ruta (requiere autenticación)
function protectRoute(requireAdmin = false) {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
        showAuthNotification('Debe iniciar sesión para acceder a esta página.', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return false;
    }
    
    if (requireAdmin && currentUser.role !== 'admin') {
        showAuthNotification('No tiene permisos para acceder a esta página.', 'error');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
        return false;
    }
    
    return true;
}

// Configurar formularios de autenticación
function setupAuthForms() {
    // Formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            const result = await loginUser(email, password);
            
            if (result.success) {
                showAuthNotification(result.message, 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                showAuthNotification(result.message, 'error');
            }
        });
    }
    
    // Formulario de registro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const userData = {
                email: document.getElementById('registerEmail').value,
                password: document.getElementById('registerPassword').value,
                confirmPassword: document.getElementById('registerConfirmPassword').value,
                name: document.getElementById('registerName').value,
                phone: document.getElementById('registerPhone').value,
                address: document.getElementById('registerAddress').value
            };
            
            const result = await registerUser(userData);
            
            if (result.success) {
                showAuthNotification(result.message, 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                showAuthNotification(result.message, 'error');
            }
        });
    }
    
    // Formulario de recuperación
    const recoverForm = document.getElementById('recoverForm');
    if (recoverForm) {
        recoverForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('recoverEmail').value;
            const result = await requestPasswordReset(email);
            
            if (result.success) {
                showAuthNotification(result.message, 'success');
            } else {
                showAuthNotification(result.message, 'error');
            }
        });
    }
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Configurar eventos para formularios de autenticación si existen
    setupAuthForms();
    
    // Actualizar enlace de autenticación si existe
    if (typeof updateAuthLink === 'function') {
        updateAuthLink();
    }
});

// Exportar funciones para uso global
window.firebaseAuth = {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    isAuthenticated,
    isAdmin,
    requestPasswordReset,
    updateUserProfile,
    protectRoute,
    showAuthNotification,
    updateAuthLink
};