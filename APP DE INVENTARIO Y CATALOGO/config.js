// ==============================================
// SISTEMA DE CONFIGURACIÓN - FIREBASE
// ==============================================

// Esperar a que Firebase esté listo
window.addEventListener('firebase-ready', function() {
    console.log('🚀 Inicializando sistema de configuración con Firebase...');
    initConfigSystem();
});

// Configuración por defecto
const defaultConfig = {
    // Información general
    general: {
        storeName: "Tienda Ejemplo",
        storeSlogan: "Catálogo Digital Profesional",
        storeType: "fisica", // fisica, online, mixta
        metaTitle: "Tienda Ejemplo | Catálogo Digital Pro",
        metaDescription: "Descubre productos de calidad con la mejor experiencia de compra online."
    },
    
    // Colores
    colors: {
        primary: "#2c3e50",
        secondary: "#e74c3c",
        accent: "#3498db",
        background: "#f8f9fa"
    },
    
    // Logo
    logo: {
        type: "icon", // icon, image
        image: null, // Firebase Storage URL
        width: 50,
        height: 50
    },
    
    // Textos
    texts: {
        // Hero Section
        hero: {
            slide1: {
                title: "Bienvenido a nuestra tienda",
                subtitle: "Descubre productos de calidad con la mejor experiencia de compra online. Tu satisfacción es nuestra prioridad."
            },
            slide2: {
                title: "Ofertas Especiales",
                subtitle: "Aprovecha nuestros descuentos exclusivos en productos seleccionados. ¡Solo por tiempo limitado!"
            },
            slide3: {
                title: "Catálogo Digital",
                subtitle: "Explora todos nuestros productos desde la comodidad de tu hogar. Pedidos por WhatsApp con un solo clic."
            }
        },
        
        // Sobre Nosotros
        about: {
            title: "Sobre Nuestra Tienda",
            subtitle: "Más de 10 años ofreciendo productos de calidad y un servicio excepcional a nuestros clientes.",
            contentTitle: "Tu tienda de confianza",
            content: "Fundada en 2013, hemos crecido de una pequeña tienda local a un negocio reconocido en la región. Nuestra misión es proporcionar productos de alta calidad a precios justos, combinando la tradición del comercio local con las ventajas de la tecnología moderna."
        },
        
        // Misión y Visión
        mission: {
            title: "Nuestra Filosofía",
            subtitle: "Los valores que nos guían en cada decisión y cada interacción con nuestros clientes.",
            missionContent: "Proveer productos de excelente calidad que mejoren la vida diaria de nuestros clientes, ofreciendo una experiencia de compra excepcional tanto en tienda física como en nuestro catálogo digital.",
            visionContent: "Ser la tienda de referencia en nuestra comunidad, reconocida por nuestra calidad, servicio y compromiso con la innovación digital para facilitar la vida de nuestros clientes."
        },
        
        // Productos
        products: {
            title: "Productos Destacados",
            subtitle: "Descubre nuestros productos más populares y las mejores ofertas de la temporada.",
            product1: {
                name: "Cámara DSLR Profesional",
                description: "Captura momentos inolvidables con esta cámara de alta resolución y múltiples lentes incluidos.",
                price: "$899.99",
                oldPrice: "$1,199.99",
                discount: "25% OFF"
            },
            product2: {
                name: "Smartwatch Deportivo",
                description: "Monitoriza tu salud, recibe notificaciones y controla tu música desde tu muñeca.",
                price: "$249.99",
                oldPrice: "",
                discount: "Nuevo"
            },
            product3: {
                name: "Zapatos Deportivos Premium",
                description: "Máxima comodidad y estilo para tus actividades diarias o entrenamientos.",
                price: "$129.99",
                oldPrice: "",
                discount: ""
            }
        },
        
        // Testimonios
        testimonials: {
            title: "Lo que dicen nuestros clientes",
            subtitle: "La satisfacción de nuestros clientes es nuestro mayor logro.",
            testimonial1: {
                text: "Excelente atención y productos de primera calidad. El catálogo digital me permitió hacer mi pedido desde casa y recibirlo al día siguiente.",
                author: "María González",
                position: "Cliente desde 2018"
            },
            testimonial2: {
                text: "La mejor tienda de la zona. Siempre encuentro lo que necesito y el servicio post-venta es excepcional. ¡Recomendado 100%!",
                author: "Carlos Rodríguez",
                position: "Cliente frecuente"
            },
            testimonial3: {
                text: "Me encanta poder ver todos los productos desde mi celular y hacer el pedido por WhatsApp. ¡Muy práctico y eficiente!",
                author: "Ana Martínez",
                position: "Cliente desde 2020"
            }
        },
        
        // Footer
        footer: {
            description: "Tu tienda de confianza con más de 10 años de experiencia. Calidad, servicio y innovación digital.",
            copyright: "© 2024 Tienda Ejemplo. Todos los derechos reservados."
        }
    },
    
    // Redes Sociales
    socialMedia: {
        facebook: { active: false, url: "" },
        instagram: { active: true, url: "" },
        whatsapp: { active: true, url: "584123456789" },
        tiktok: { active: false, url: "" },
        twitter: { active: false, url: "" },
        youtube: { active: false, url: "" }
    },
    
    // Contacto
    contact: {
        address: "Av. Principal 1234, Centro Comercial Plaza Mayor, Local 45",
        city: "Caracas",
        country: "Venezuela",
        phone: "581234567890",
        email: "info@tiendaejemplo.com",
        hours: {
            weekdays: "9:00 AM - 8:00 PM",
            saturday: "9:00 AM - 6:00 PM",
            sunday: "10:00 AM - 2:00 PM",
            holidays: "Cerrado"
        },
        whatsappMessage: "Hola, me interesa información sobre sus productos. ¿Podrían ayudarme?"
    },
    
    // Imágenes (URLs de Firebase Storage)
    images: {
        hero1: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        hero2: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        hero3: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        about: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        product1: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        product2: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        product3: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        testimonial1: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        testimonial2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        testimonial3: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    
    // Ubicación
    location: {
        type: "physical", // physical, online, both
        googleMapsLink: "https://goo.gl/maps/example",
        mapsEmbedCode: "",
        reference: "Ubicados en el Centro Comercial Plaza Mayor, local 45, frente a la fuente principal. Contamos con amplio estacionamiento gratuito.",
        coordinates: {
            lat: 10.4806,
            lng: -66.9036
        },
        delivery: {
            areas: "Entregamos a toda Caracas. Envíos a nivel nacional con costo adicional según la ubicación.",
            time: "24-48 horas",
            cost: "Gratis para órdenes mayores a $50"
        }
    }
};

// Variable global para la configuración actual
let currentConfig = { ...defaultConfig };
let currentStoreId = null;
let isFirebaseReady = false;

// Inicializar sistema de configuración
async function initConfigSystem() {
    try {
        console.log('🔧 Inicializando sistema de configuración...');
        
        // Obtener usuario actual
        const currentUser = window.firebaseAuth?.getCurrentUser?.();
        
        if (!currentUser) {
            console.warn('⚠️ No hay usuario autenticado, usando configuración local');
            loadConfigFromLocal();
            setupUI();
            return;
        }
        
        // El storeId será el ID del usuario (cada usuario tiene su tienda)
        currentStoreId = currentUser.uid;
        
        console.log(`🏪 Store ID: ${currentStoreId}`);
        
        // Verificar si la tienda existe
        const storeExists = await checkStoreExists(currentStoreId);
        
        if (storeExists) {
            console.log('✅ Tienda encontrada, cargando configuración...');
            await loadConfigFromFirebase();
        } else {
            console.log('🆕 Creando tienda nueva...');
            // Crear tienda por defecto
            await initializeStoreForUser(currentStoreId, currentUser);
            currentConfig = { ...defaultConfig };
            await saveConfigToFirebase();
        }
        
        isFirebaseReady = true;
        console.log('✅ Sistema de configuración listo para store:', currentStoreId);
        
        // Configurar interfaz de usuario
        setupUI();
        
    } catch (error) {
        console.error('❌ Error inicializando sistema de configuración:', error);
        loadConfigFromLocal();
        setupUI();
    }
}

// Verificar si la tienda existe en Firestore
async function checkStoreExists(storeId) {
    try {
        const { db, doc, getDoc } = window.firebaseServices;
        const storeRef = doc(db, "stores", storeId);
        const storeDoc = await getDoc(storeRef);
        return storeDoc.exists();
    } catch (error) {
        console.error('❌ Error verificando tienda:', error);
        return false;
    }
}

// Inicializar tienda para un usuario
async function initializeStoreForUser(storeId, userData) {
    try {
        const { db, doc, setDoc } = window.firebaseServices;
        const { serverTimestamp } = window.firebaseServices;
        
        const storeData = {
            ownerId: storeId,
            ownerEmail: userData.email,
            storeName: userData.name ? userData.name + "'s Store" : "Mi Tienda",
            storeSlogan: "Catálogo Digital Profesional",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            ...defaultConfig
        };
        
        const storeRef = doc(db, "stores", storeId);
        await setDoc(storeRef, storeData);
        
        console.log('✅ Tienda inicializada para usuario:', userData.email);
        return true;
    } catch (error) {
        console.error('❌ Error inicializando tienda:', error);
        return false;
    }
}

// Cargar configuración desde Firebase
async function loadConfigFromFirebase() {
    try {
        const { db, doc, getDoc } = window.firebaseServices;
        
        if (!currentStoreId) {
            throw new Error('No hay storeId definido');
        }
        
        const storeRef = doc(db, "stores", currentStoreId);
        const storeDoc = await getDoc(storeRef);
        
        if (storeDoc.exists()) {
            const storeData = storeDoc.data();
            
            // Filtrar solo los campos de configuración (excluir metadatos)
            const configData = {};
            Object.keys(defaultConfig).forEach(key => {
                if (storeData[key] !== undefined) {
                    configData[key] = storeData[key];
                }
            });
            
            currentConfig = { ...defaultConfig, ...configData };
            
            console.log('✅ Configuración cargada desde Firebase');
            
            return true;
        } else {
            console.warn('⚠️ No se encontró configuración en Firebase');
            return false;
        }
    } catch (error) {
        console.error('❌ Error al cargar configuración desde Firebase:', error);
        return false;
    }
}

// Cargar configuración desde localStorage (fallback)
function loadConfigFromLocal() {
    try {
        const savedConfig = localStorage.getItem('storeConfig');
        if (savedConfig) {
            const parsed = JSON.parse(savedConfig);
            currentConfig = { ...defaultConfig, ...parsed };
            console.log('✅ Configuración cargada desde localStorage');
            return true;
        }
    } catch (error) {
        console.error('❌ Error al cargar configuración local:', error);
    }
    return false;
}

// Guardar configuración en Firebase
async function saveConfigToFirebase() {
    try {
        if (!currentStoreId) {
            throw new Error('No hay storeId definido');
        }
        
        // Recolectar datos actuales del formulario
        collectFormData();
        
        const { db, doc, setDoc } = window.firebaseServices;
        const { serverTimestamp } = window.firebaseServices;
        
        // Preparar datos para Firebase (solo la configuración, sin metadatos duplicados)
        const saveData = {
            ...currentConfig,
            ownerId: currentStoreId,
            ownerEmail: window.firebaseAuth?.getCurrentUser()?.email || 'unknown',
            updatedAt: serverTimestamp()
        };
        
        // Si es la primera vez, agregar createdAt
        if (!currentConfig.createdAt) {
            saveData.createdAt = serverTimestamp();
        }
        
        // Guardar en Firestore
        const storeRef = doc(db, "stores", currentStoreId);
        await setDoc(storeRef, saveData, { merge: true });
        
        console.log('✅ Configuración guardada en Firebase');
        return true;
    } catch (error) {
        console.error('❌ Error al guardar configuración en Firebase:', error);
        return false;
    }
}

// Guardar configuración (usa Firebase si está disponible, si no localStorage)
async function saveConfig() {
    try {
        // Recolectar datos actuales del formulario
        collectFormData();
        
        let success = false;
        let message = '';
        
        if (currentStoreId && isFirebaseReady) {
            // Intentar guardar en Firebase
            success = await saveConfigToFirebase();
            message = success ? '✅ Configuración guardada en la nube' : '❌ Error al guardar en la nube';
        } else {
            // Guardar en localStorage
            success = saveConfigToLocal();
            message = success ? '✅ Configuración guardada localmente' : '❌ Error al guardar localmente';
        }
        
        if (success) {
            showNotification(message, 'success');
        } else {
            showNotification(message, 'error');
        }
        
        return success;
    } catch (error) {
        console.error('❌ Error al guardar configuración:', error);
        showNotification('Error al guardar configuración', 'error');
        return false;
    }
}

// Guardar en localStorage
function saveConfigToLocal() {
    try {
        localStorage.setItem('storeConfig', JSON.stringify(currentConfig));
        return true;
    } catch (error) {
        console.error('❌ Error al guardar configuración local:', error);
        return false;
    }
}

// Restaurar configuración por defecto
async function restoreDefaultConfig() {
    if (confirm('¿Estás seguro de restaurar la configuración por defecto? Se perderán todos los cambios no guardados.')) {
        currentConfig = { ...defaultConfig };
        
        if (currentStoreId && isFirebaseReady) {
            await saveConfigToFirebase();
        } else {
            localStorage.removeItem('storeConfig');
        }
        
        // Recargar la página para aplicar los cambios
        setTimeout(() => {
            location.reload();
        }, 500);
    }
}

// Exportar configuración como archivo JSON
function exportConfig() {
    collectFormData();
    
    const configStr = JSON.stringify(currentConfig, null, 2);
    const blob = new Blob([configStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `configuracion-tienda-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
    
    showNotification('Configuración exportada correctamente', 'success');
}

// Importar configuración desde archivo JSON
async function importConfig() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = async function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = async function(e) {
            try {
                const importedConfig = JSON.parse(e.target.result);
                
                // Validar estructura básica
                if (importedConfig.general && importedConfig.colors) {
                    currentConfig = { ...defaultConfig, ...importedConfig };
                    
                    // Guardar según el método actual
                    if (currentStoreId && isFirebaseReady) {
                        await saveConfigToFirebase();
                    } else {
                        localStorage.setItem('storeConfig', JSON.stringify(currentConfig));
                    }
                    
                    // Cargar datos en el formulario
                    loadFormData();
                    showNotification('Configuración importada correctamente', 'success');
                } else {
                    showNotification('El archivo no tiene un formato válido', 'error');
                }
            } catch (error) {
                showNotification('Error al leer el archivo de configuración', 'error');
                console.error(error);
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

// ==============================================
// FUNCIONES DE MANEJO DE IMÁGENES CON FIREBASE STORAGE
// ==============================================

// Subir imagen con Firebase Storage
async function uploadImageToFirebase(file, imageType, productId = null) {
    try {
        if (!currentStoreId) {
            throw new Error('No hay storeId definido');
        }
        
        // Usar la función de uploadImage del firebase-config.js
        let imageUrl;
        if (imageType === 'logo') {
            imageUrl = await window.uploadLogo(file, currentStoreId);
        } else {
            imageUrl = await window.uploadImage(file, currentStoreId, 'product', productId);
        }
        
        // Actualizar la configuración con la nueva URL
        if (imageType === 'logo') {
            currentConfig.logo = {
                type: 'image',
                image: imageUrl,
                width: 50,
                height: 50
            };
        } else {
            currentConfig.images[imageType] = imageUrl;
        }
        
        showNotification(`Imagen ${imageType} subida correctamente`, 'success');
        return imageUrl;
    } catch (error) {
        console.error('❌ Error subiendo imagen:', error);
        showNotification('Error subiendo imagen: ' + error.message, 'error');
        return null;
    }
}

// Eliminar imagen de Firebase Storage
async function deleteImageFromFirebase(imageUrl) {
    try {
        await window.deleteImage(imageUrl);
        return true;
    } catch (error) {
        console.error('❌ Error eliminando imagen:', error);
        return false;
    }
}

// ==============================================
// FUNCIONES DE INTERFAZ
// ==============================================

// Configurar interfaz de usuario
function setupUI() {
    console.log('🎨 Configurando interfaz de usuario...');
    
    // Cargar datos en el formulario
    loadFormData();
    
    // Configurar pestañas principales
    setupMainTabs();
    
    // Configurar sub-pestañas de textos
    setupTextTabs();
    
    // Configurar sub-pestañas de imágenes
    setupImageTabs();
    
    // Configurar selector de tipo de ubicación
    setupLocationType();
    
    // Configurar carga de logo
    setupLogoUpload();
    
    // Configurar carga de imágenes
    setupImageUploads();
    
    // Configurar selectores de color
    setupColorPickers();
    
    // Configurar botones de acción
    setupActionButtons();
    
    // Configurar eventos de guardado
    setupSaveEvents();
    
    // Configurar eventos en tiempo real para vista previa
    setupRealTimePreview();
    
    console.log('✅ Interfaz de usuario configurada');
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
    `;
    
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// ==============================================
// FUNCIONES DE RECOLECCIÓN DE DATOS DEL FORMULARIO
// ==============================================

// Recolectar todos los datos del formulario
function collectFormData() {
    // General
    currentConfig.general.storeName = document.getElementById('storeName').value;
    currentConfig.general.storeSlogan = document.getElementById('storeSlogan').value;
    currentConfig.general.storeType = document.getElementById('storeType').value;
    currentConfig.general.metaTitle = document.getElementById('metaTitle').value;
    currentConfig.general.metaDescription = document.getElementById('metaDescription').value;
    
    // Colores
    currentConfig.colors.primary = document.getElementById('primaryColor').value;
    currentConfig.colors.secondary = document.getElementById('secondaryColor').value;
    currentConfig.colors.accent = document.getElementById('accentColor').value;
    currentConfig.colors.background = document.getElementById('backgroundColor').value;
    
    // Logo (ya se guarda cuando se sube)
    
    // Textos - Hero
    currentConfig.texts.hero.slide1.title = document.getElementById('heroTitle1').value;
    currentConfig.texts.hero.slide1.subtitle = document.getElementById('heroSubtitle1').value;
    currentConfig.texts.hero.slide2.title = document.getElementById('heroTitle2').value;
    currentConfig.texts.hero.slide2.subtitle = document.getElementById('heroSubtitle2').value;
    currentConfig.texts.hero.slide3.title = document.getElementById('heroTitle3').value;
    currentConfig.texts.hero.slide3.subtitle = document.getElementById('heroSubtitle3').value;
    
    // Textos - About
    currentConfig.texts.about.title = document.getElementById('aboutTitle').value;
    currentConfig.texts.about.subtitle = document.getElementById('aboutSubtitle').value;
    currentConfig.texts.about.contentTitle = document.getElementById('aboutContentTitle').value;
    currentConfig.texts.about.content = document.getElementById('aboutContent').value;
    
    // Textos - Mission
    currentConfig.texts.mission.title = document.getElementById('missionTitle').value;
    currentConfig.texts.mission.subtitle = document.getElementById('missionSubtitle').value;
    currentConfig.texts.mission.missionContent = document.getElementById('missionContent').value;
    currentConfig.texts.mission.visionContent = document.getElementById('visionContent').value;
    
    // Textos - Products
    currentConfig.texts.products.title = document.getElementById('productsTitle').value;
    currentConfig.texts.products.subtitle = document.getElementById('productsSubtitle').value;
    currentConfig.texts.products.product1.name = document.getElementById('product1Name').value;
    currentConfig.texts.products.product1.description = document.getElementById('product1Description').value;
    currentConfig.texts.products.product1.price = document.getElementById('product1Price').value;
    currentConfig.texts.products.product2.name = document.getElementById('product2Name').value;
    currentConfig.texts.products.product2.description = document.getElementById('product2Description').value;
    currentConfig.texts.products.product2.price = document.getElementById('product2Price').value;
    currentConfig.texts.products.product3.name = document.getElementById('product3Name').value;
    currentConfig.texts.products.product3.description = document.getElementById('product3Description').value;
    currentConfig.texts.products.product3.price = document.getElementById('product3Price').value;
    
    // Textos - Testimonials
    currentConfig.texts.testimonials.title = document.getElementById('testimonialsTitle').value;
    currentConfig.texts.testimonials.subtitle = document.getElementById('testimonialsSubtitle').value;
    currentConfig.texts.testimonials.testimonial1.text = document.getElementById('testimonial1Text').value;
    currentConfig.texts.testimonials.testimonial1.author = document.getElementById('testimonial1Author').value;
    currentConfig.texts.testimonials.testimonial2.text = document.getElementById('testimonial2Text').value;
    currentConfig.texts.testimonials.testimonial2.author = document.getElementById('testimonial2Author').value;
    currentConfig.texts.testimonials.testimonial3.text = document.getElementById('testimonial3Text').value;
    currentConfig.texts.testimonials.testimonial3.author = document.getElementById('testimonial3Author').value;
    
    // Textos - Footer
    currentConfig.texts.footer.description = document.getElementById('footerDescription').value;
    currentConfig.texts.footer.copyright = document.getElementById('footerCopyright').value;
    
    // Redes Sociales
    currentConfig.socialMedia.facebook.active = document.getElementById('facebookActive').checked;
    currentConfig.socialMedia.facebook.url = document.getElementById('facebookUrl').value;
    currentConfig.socialMedia.instagram.active = document.getElementById('instagramActive').checked;
    currentConfig.socialMedia.instagram.url = document.getElementById('instagramUrl').value;
    currentConfig.socialMedia.whatsapp.active = document.getElementById('whatsappActive').checked;
    currentConfig.socialMedia.whatsapp.url = document.getElementById('whatsappUrl').value;
    currentConfig.socialMedia.tiktok.active = document.getElementById('tiktokActive').checked;
    currentConfig.socialMedia.tiktok.url = document.getElementById('tiktokUrl').value;
    currentConfig.socialMedia.twitter.active = document.getElementById('twitterActive').checked;
    currentConfig.socialMedia.twitter.url = document.getElementById('twitterUrl').value;
    currentConfig.socialMedia.youtube.active = document.getElementById('youtubeActive').checked;
    currentConfig.socialMedia.youtube.url = document.getElementById('youtubeUrl').value;
    
    // Contacto
    currentConfig.contact.address = document.getElementById('contactAddress').value;
    currentConfig.contact.city = document.getElementById('contactCity').value;
    currentConfig.contact.country = document.getElementById('contactCountry').value;
    currentConfig.contact.phone = document.getElementById('contactPhone').value;
    currentConfig.contact.email = document.getElementById('contactEmail').value;
    currentConfig.contact.hours.weekdays = document.getElementById('hoursWeekdays').value;
    currentConfig.contact.hours.saturday = document.getElementById('hoursSaturday').value;
    currentConfig.contact.hours.sunday = document.getElementById('hoursSunday').value;
    currentConfig.contact.hours.holidays = document.getElementById('hoursHolidays').value;
    currentConfig.contact.whatsappMessage = document.getElementById('whatsappMessage').value;
    
    // Ubicación
    const locationType = document.querySelector('input[name="locationType"]:checked');
    if (locationType) {
        currentConfig.location.type = locationType.value;
    }
    currentConfig.location.googleMapsLink = document.getElementById('googleMapsLink').value;
    currentConfig.location.mapsEmbedCode = document.getElementById('mapsEmbedCode').value;
    currentConfig.location.reference = document.getElementById('locationReference').value;
    currentConfig.location.coordinates.lat = parseFloat(document.getElementById('locationLat').value) || 10.4806;
    currentConfig.location.coordinates.lng = parseFloat(document.getElementById('locationLng').value) || -66.9036;
    currentConfig.location.delivery.areas = document.getElementById('deliveryAreas').value;
    currentConfig.location.delivery.time = document.getElementById('deliveryTime').value;
    currentConfig.location.delivery.cost = document.getElementById('shippingCost').value;
    
    // Las imágenes ya se guardan cuando se suben
}

// Cargar datos en el formulario
function loadFormData() {
    // General
    document.getElementById('storeName').value = currentConfig.general.storeName;
    document.getElementById('storeSlogan').value = currentConfig.general.storeSlogan;
    document.getElementById('storeType').value = currentConfig.general.storeType;
    document.getElementById('metaTitle').value = currentConfig.general.metaTitle;
    document.getElementById('metaDescription').value = currentConfig.general.metaDescription;
    
    // Colores
    document.getElementById('primaryColor').value = currentConfig.colors.primary;
    document.getElementById('primaryColorText').value = currentConfig.colors.primary;
    document.getElementById('secondaryColor').value = currentConfig.colors.secondary;
    document.getElementById('secondaryColorText').value = currentConfig.colors.secondary;
    document.getElementById('accentColor').value = currentConfig.colors.accent;
    document.getElementById('accentColorText').value = currentConfig.colors.accent;
    document.getElementById('backgroundColor').value = currentConfig.colors.background;
    document.getElementById('backgroundColorText').value = currentConfig.colors.background;
    
    // Logo
    if (currentConfig.logo.type === 'image' && currentConfig.logo.image) {
        const logoPreview = document.getElementById('logo-uploaded-preview');
        if (logoPreview) {
            logoPreview.src = currentConfig.logo.image;
            logoPreview.style.display = 'block';
            document.getElementById('logo-default-icon').style.display = 'none';
        }
        
        const customLogoPreview = document.getElementById('custom-logo-preview');
        if (customLogoPreview) {
            customLogoPreview.src = currentConfig.logo.image;
            customLogoPreview.style.display = 'block';
            document.getElementById('default-logo-icon').style.display = 'none';
        }
    }
    
    // Textos - Hero
    document.getElementById('heroTitle1').value = currentConfig.texts.hero.slide1.title;
    document.getElementById('heroSubtitle1').value = currentConfig.texts.hero.slide1.subtitle;
    document.getElementById('heroTitle2').value = currentConfig.texts.hero.slide2.title;
    document.getElementById('heroSubtitle2').value = currentConfig.texts.hero.slide2.subtitle;
    document.getElementById('heroTitle3').value = currentConfig.texts.hero.slide3.title;
    document.getElementById('heroSubtitle3').value = currentConfig.texts.hero.slide3.subtitle;
    
    // Textos - About
    document.getElementById('aboutTitle').value = currentConfig.texts.about.title;
    document.getElementById('aboutSubtitle').value = currentConfig.texts.about.subtitle;
    document.getElementById('aboutContentTitle').value = currentConfig.texts.about.contentTitle;
    document.getElementById('aboutContent').value = currentConfig.texts.about.content;
    
    // Textos - Mission
    document.getElementById('missionTitle').value = currentConfig.texts.mission.title;
    document.getElementById('missionSubtitle').value = currentConfig.texts.mission.subtitle;
    document.getElementById('missionContent').value = currentConfig.texts.mission.missionContent;
    document.getElementById('visionContent').value = currentConfig.texts.mission.visionContent;
    
    // Textos - Products
    document.getElementById('productsTitle').value = currentConfig.texts.products.title;
    document.getElementById('productsSubtitle').value = currentConfig.texts.products.subtitle;
    document.getElementById('product1Name').value = currentConfig.texts.products.product1.name;
    document.getElementById('product1Description').value = currentConfig.texts.products.product1.description;
    document.getElementById('product1Price').value = currentConfig.texts.products.product1.price;
    document.getElementById('product2Name').value = currentConfig.texts.products.product2.name;
    document.getElementById('product2Description').value = currentConfig.texts.products.product2.description;
    document.getElementById('product2Price').value = currentConfig.texts.products.product2.price;
    document.getElementById('product3Name').value = currentConfig.texts.products.product3.name;
    document.getElementById('product3Description').value = currentConfig.texts.products.product3.description;
    document.getElementById('product3Price').value = currentConfig.texts.products.product3.price;
    
    // Textos - Testimonials
    document.getElementById('testimonialsTitle').value = currentConfig.texts.testimonials.title;
    document.getElementById('testimonialsSubtitle').value = currentConfig.texts.testimonials.subtitle;
    document.getElementById('testimonial1Text').value = currentConfig.texts.testimonials.testimonial1.text;
    document.getElementById('testimonial1Author').value = currentConfig.texts.testimonials.testimonial1.author;
    document.getElementById('testimonial2Text').value = currentConfig.texts.testimonials.testimonial2.text;
    document.getElementById('testimonial2Author').value = currentConfig.texts.testimonials.testimonial2.author;
    document.getElementById('testimonial3Text').value = currentConfig.texts.testimonials.testimonial3.text;
    document.getElementById('testimonial3Author').value = currentConfig.texts.testimonials.testimonial3.author;
    
    // Textos - Footer
    document.getElementById('footerDescription').value = currentConfig.texts.footer.description;
    document.getElementById('footerCopyright').value = currentConfig.texts.footer.copyright;
    
    // Redes Sociales
    document.getElementById('facebookActive').checked = currentConfig.socialMedia.facebook.active;
    document.getElementById('facebookUrl').value = currentConfig.socialMedia.facebook.url;
    document.getElementById('instagramActive').checked = currentConfig.socialMedia.instagram.active;
    document.getElementById('instagramUrl').value = currentConfig.socialMedia.instagram.url;
    document.getElementById('whatsappActive').checked = currentConfig.socialMedia.whatsapp.active;
    document.getElementById('whatsappUrl').value = currentConfig.socialMedia.whatsapp.url;
    document.getElementById('tiktokActive').checked = currentConfig.socialMedia.tiktok.active;
    document.getElementById('tiktokUrl').value = currentConfig.socialMedia.tiktok.url;
    document.getElementById('twitterActive').checked = currentConfig.socialMedia.twitter.active;
    document.getElementById('twitterUrl').value = currentConfig.socialMedia.twitter.url;
    document.getElementById('youtubeActive').checked = currentConfig.socialMedia.youtube.active;
    document.getElementById('youtubeUrl').value = currentConfig.socialMedia.youtube.url;
    
    // Contacto
    document.getElementById('contactAddress').value = currentConfig.contact.address;
    document.getElementById('contactCity').value = currentConfig.contact.city;
    document.getElementById('contactCountry').value = currentConfig.contact.country;
    document.getElementById('contactPhone').value = currentConfig.contact.phone;
    document.getElementById('contactEmail').value = currentConfig.contact.email;
    document.getElementById('hoursWeekdays').value = currentConfig.contact.hours.weekdays;
    document.getElementById('hoursSaturday').value = currentConfig.contact.hours.saturday;
    document.getElementById('hoursSunday').value = currentConfig.contact.hours.sunday;
    document.getElementById('hoursHolidays').value = currentConfig.contact.hours.holidays;
    document.getElementById('whatsappMessage').value = currentConfig.contact.whatsappMessage;
    
    // Ubicación
    const locationTypeRadio = document.querySelector(`input[name="locationType"][value="${currentConfig.location.type}"]`);
    if (locationTypeRadio) {
        locationTypeRadio.checked = true;
    }
    document.getElementById('googleMapsLink').value = currentConfig.location.googleMapsLink;
    document.getElementById('mapsEmbedCode').value = currentConfig.location.mapsEmbedCode;
    document.getElementById('locationReference').value = currentConfig.location.reference;
    document.getElementById('locationLat').value = currentConfig.location.coordinates.lat;
    document.getElementById('locationLng').value = currentConfig.location.coordinates.lng;
    document.getElementById('deliveryAreas').value = currentConfig.location.delivery.areas;
    document.getElementById('deliveryTime').value = currentConfig.location.delivery.time;
    document.getElementById('shippingCost').value = currentConfig.location.delivery.cost;
    
    // Imágenes (cargar vistas previas)
    loadImagePreviews();
    
    // Actualizar vistas previas
    updateColorPreview();
    updateSocialPreview();
    updateContactPreview();
    updateStoreNamePreview();
    
    // Actualizar secciones de ubicación
    toggleLocationSections();
}

// Cargar vistas previas de imágenes
function loadImagePreviews() {
    const imageTypes = ['hero1', 'hero2', 'hero3', 'about', 'product1', 'product2', 'product3', 'testimonial1', 'testimonial2', 'testimonial3'];
    
    imageTypes.forEach(type => {
        const previewElement = document.getElementById(`${type}ImagePreview`);
        if (previewElement && currentConfig.images[type]) {
            previewElement.src = currentConfig.images[type];
        }
    });
}

// ==============================================
// FUNCIONES DE INTERFAZ - PESTAÑAS
// ==============================================

function setupMainTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            
            // Remover active de todos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Agregar active al actual
            this.classList.add('active');
            
            // Mostrar panel correspondiente
            const targetPanel = document.getElementById(tabId + '-tab');
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

function setupTextTabs() {
    const textTabButtons = document.querySelectorAll('.text-tab-btn');
    const textTabPanes = document.querySelectorAll('.text-tab-pane');
    
    textTabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-text-tab');
            
            // Remover active de todos
            textTabButtons.forEach(btn => btn.classList.remove('active'));
            textTabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Agregar active al actual
            this.classList.add('active');
            
            // Mostrar panel correspondiente
            const targetPanel = document.getElementById(tabId + '-texts');
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

function setupImageTabs() {
    const imageTabButtons = document.querySelectorAll('.image-tab-btn');
    const imageTabPanes = document.querySelectorAll('.image-tab-pane');
    
    imageTabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-image-tab');
            
            // Remover active de todos
            imageTabButtons.forEach(btn => btn.classList.remove('active'));
            imageTabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Agregar active al actual
            this.classList.add('active');
            
            // Mostrar panel correspondiente
            const targetPanel = document.getElementById(tabId + '-images');
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

function toggleLocationSections() {
    const locationType = document.querySelector('input[name="locationType"]:checked');
    if (!locationType) return;
    
    const physicalSettings = document.getElementById('physicalLocationSettings');
    const onlineSettings = document.getElementById('onlineStoreSettings');
    
    if (locationType.value === 'physical') {
        if (physicalSettings) physicalSettings.style.display = 'block';
        if (onlineSettings) onlineSettings.style.display = 'none';
    } else if (locationType.value === 'online') {
        if (physicalSettings) physicalSettings.style.display = 'none';
        if (onlineSettings) onlineSettings.style.display = 'block';
    } else {
        if (physicalSettings) physicalSettings.style.display = 'block';
        if (onlineSettings) onlineSettings.style.display = 'block';
    }
}

function setupLocationType() {
    const locationTypeRadios = document.querySelectorAll('input[name="locationType"]');
    
    locationTypeRadios.forEach(radio => {
        radio.addEventListener('change', toggleLocationSections);
    });
    
    // Inicializar
    toggleLocationSections();
}

function setupLogoUpload() {
    const logoUploadZone = document.getElementById('logoUploadZone');
    const logoFileInput = document.getElementById('logoFile');
    const removeLogoBtn = document.getElementById('removeLogoBtn');
    const logoPreview = document.getElementById('logo-uploaded-preview');
    const defaultLogoIcon = document.getElementById('logo-default-icon');
    const customLogoPreview = document.getElementById('custom-logo-preview');
    const defaultLogoIconConfig = document.getElementById('default-logo-icon');
    
    if (logoUploadZone && logoFileInput) {
        logoUploadZone.addEventListener('click', () => logoFileInput.click());
        
        logoFileInput.addEventListener('change', async function(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            // Validar tamaño (2MB)
            if (file.size > 2 * 1024 * 1024) {
                showNotification('El archivo es demasiado grande. Máximo 2MB.', 'error');
                return;
            }
            
            // Validar tipo
            if (!file.type.match('image.*')) {
                showNotification('Solo se permiten archivos de imagen.', 'error');
                return;
            }
            
            // Mostrar loader
            showNotification('Subiendo logo...', 'info');
            
            // Subir a Firebase Storage
            const imageUrl = await uploadImageToFirebase(file, 'logo');
            
            if (imageUrl) {
                // Actualizar vista previa
                if (logoPreview) {
                    logoPreview.src = imageUrl;
                    logoPreview.style.display = 'block';
                    if (defaultLogoIcon) defaultLogoIcon.style.display = 'none';
                }
                
                if (customLogoPreview) {
                    customLogoPreview.src = imageUrl;
                    customLogoPreview.style.display = 'block';
                    if (defaultLogoIconConfig) defaultLogoIconConfig.style.display = 'none';
                }
                
                // Guardar configuración
                await saveConfig();
            }
        });
    }
    
    if (removeLogoBtn) {
        removeLogoBtn.addEventListener('click', async function() {
            // Eliminar imagen de Storage si existe
            if (currentConfig.logo && currentConfig.logo.image) {
                await deleteImageFromFirebase(currentConfig.logo.image);
            }
            
            currentConfig.logo = {
                type: 'icon',
                image: null,
                width: 50,
                height: 50
            };
            
            // Restaurar icono por defecto
            if (logoPreview) {
                logoPreview.src = '';
                logoPreview.style.display = 'none';
                if (defaultLogoIcon) defaultLogoIcon.style.display = 'block';
            }
            
            if (customLogoPreview) {
                customLogoPreview.src = '';
                customLogoPreview.style.display = 'none';
                if (defaultLogoIconConfig) defaultLogoIconConfig.style.display = 'block';
            }
            
            // Guardar configuración
            await saveConfig();
            
            showNotification('Logo restaurado al valor por defecto', 'info');
        });
    }
}

function setupImageUploads() {
    // Configurar uploads para cada imagen
    const imageUploadButtons = document.querySelectorAll('.btn-upload');
    
    imageUploadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const imageType = this.getAttribute('data-image');
            const fileInput = document.getElementById(`${imageType}Image`);
            if (fileInput) {
                fileInput.click();
                
                fileInput.onchange = async function(e) {
                    const file = e.target.files[0];
                    if (!file) return;
                    
                    // Validaciones
                    if (file.size > 2 * 1024 * 1024) {
                        showNotification('El archivo es demasiado grande. Máximo 2MB.', 'error');
                        return;
                    }
                    
                    if (!file.type.match('image.*')) {
                        showNotification('Solo se permiten archivos de imagen.', 'error');
                        return;
                    }
                    
                    // Mostrar loader
                    showNotification(`Subiendo imagen ${imageType}...`, 'info');
                    
                    // Subir a Firebase Storage
                    const imageUrl = await uploadImageToFirebase(file, imageType);
                    
                    if (imageUrl) {
                        // Actualizar vista previa
                        const previewId = `${imageType}ImagePreview`;
                        const previewElement = document.getElementById(previewId);
                        if (previewElement) {
                            previewElement.src = imageUrl;
                        }
                        
                        // Guardar configuración
                        await saveConfig();
                    }
                };
            }
        });
    });
    
    // Configurar botones de eliminar
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async function() {
            const imageType = this.getAttribute('data-image');
            
            // Eliminar imagen de Storage si existe
            if (currentConfig.images && currentConfig.images[imageType]) {
                await deleteImageFromFirebase(currentConfig.images[imageType]);
            }
            
            // Restaurar imagen por defecto
            const defaultImages = {
                hero1: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                hero2: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                hero3: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                about: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                product1: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                product2: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                product3: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                testimonial1: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
                testimonial2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
                testimonial3: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
            };
            
            currentConfig.images[imageType] = defaultImages[imageType];
            
            // Actualizar vista previa
            const previewId = `${imageType}ImagePreview`;
            const previewElement = document.getElementById(previewId);
            if (previewElement) {
                previewElement.src = defaultImages[imageType];
            }
            
            // Guardar configuración
            await saveConfig();
            
            showNotification(`Imagen ${imageType} restaurada`, 'info');
        });
    });
}

function setupColorPickers() {
    // Configurar pickers de color
    const colorPickers = {
        primaryColor: 'primaryColorText',
        secondaryColor: 'secondaryColorText',
        accentColor: 'accentColorText',
        backgroundColor: 'backgroundColorText'
    };
    
    Object.keys(colorPickers).forEach(colorId => {
        const picker = document.getElementById(colorId);
        const textInput = document.getElementById(colorPickers[colorId]);
        
        if (picker && textInput) {
            picker.addEventListener('input', function() {
                textInput.value = this.value;
                updateColorPreview();
            });
            
            textInput.addEventListener('input', function() {
                if (this.value.match(/^#[0-9A-F]{6}$/i)) {
                    picker.value = this.value;
                    updateColorPreview();
                }
            });
            
            textInput.addEventListener('change', function() {
                if (!this.value.startsWith('#')) {
                    this.value = '#' + this.value;
                }
                if (this.value.match(/^#[0-9A-F]{6}$/i)) {
                    picker.value = this.value;
                    updateColorPreview();
                }
            });
        }
    });
}

function setupActionButtons() {
    // Esta función ya está implementada en setupSaveEvents()
    console.log('Botones de acción configurados');
}

// ==============================================
// FUNCIONES DE VISTA PREVIA
// ==============================================

function updateColorPreview() {
    const primaryColor = document.getElementById('primaryColor').value;
    const secondaryColor = document.getElementById('secondaryColor').value;
    const accentColor = document.getElementById('accentColor').value;
    const backgroundColor = document.getElementById('backgroundColor').value;
    
    // Actualizar elementos de vista previa
    const previewElements = {
        'primary-preview': primaryColor,
        'secondary-preview': secondaryColor,
        'accent-preview': accentColor,
        'background-preview': backgroundColor
    };
    
    Object.keys(previewElements).forEach(previewClass => {
        const element = document.querySelector('.' + previewClass);
        if (element) {
            element.style.backgroundColor = previewElements[previewClass];
            if (previewClass === 'background-preview') {
                element.style.color = '#333';
            }
        }
    });
}

function updateSocialPreview() {
    const socialLinksPreview = document.querySelector('.social-links-preview');
    if (!socialLinksPreview) return;
    
    socialLinksPreview.innerHTML = '';
    
    const socialPlatforms = [
        { id: 'facebook', icon: 'facebook-f', class: 'fab' },
        { id: 'instagram', icon: 'instagram', class: 'fab' },
        { id: 'whatsapp', icon: 'whatsapp', class: 'fab' },
        { id: 'tiktok', icon: 'tiktok', class: 'fab' },
        { id: 'twitter', icon: 'twitter', class: 'fab' },
        { id: 'youtube', icon: 'youtube', class: 'fab' }
    ];
    
    socialPlatforms.forEach(platform => {
        const checkbox = document.getElementById(`${platform.id}Active`);
        if (checkbox && checkbox.checked) {
            const link = document.createElement('a');
            link.href = '#';
            link.innerHTML = `<i class="${platform.class} fa-${platform.icon}"></i>`;
            socialLinksPreview.appendChild(link);
        }
    });
}

function updateContactPreview() {
    const address = document.getElementById('contactAddress').value;
    const city = document.getElementById('contactCity').value;
    const country = document.getElementById('contactCountry').value;
    const phone = document.getElementById('contactPhone').value;
    const email = document.getElementById('contactEmail').value;
    const hours = document.getElementById('hoursWeekdays').value;
    
    // Formatear teléfono
    let formattedPhone = phone;
    if (phone) {
        formattedPhone = phone.replace(/\D/g, '');
    }
    
    // Actualizar elementos de vista previa
    const previewAddress = document.getElementById('preview-address');
    const previewPhone = document.getElementById('preview-phone');
    const previewEmail = document.getElementById('preview-email');
    const previewHours = document.getElementById('preview-hours');
    
    if (previewAddress) previewAddress.textContent = `${address}, ${city}, ${country}`;
    if (previewPhone) previewPhone.textContent = `+${formattedPhone}`;
    if (previewEmail) previewEmail.textContent = email;
    if (previewHours) previewHours.textContent = `Lunes a Viernes: ${hours}`;
}

function updateStoreNamePreview() {
    const storeName = document.getElementById('storeName').value;
    const storeNameElement = document.getElementById('config-store-name');
    if (storeNameElement) {
        storeNameElement.textContent = storeName;
    }
}

// ==============================================
// CONFIGURACIÓN DE EVENTOS DE GUARDADO
// ==============================================

function setupSaveEvents() {
    // Botón Guardar Cambios
    const saveBtn = document.getElementById('saveConfigBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', async function() {
            const success = await saveConfig();
            if (success) {
                // Aplicar cambios a la vista previa del header
                updateStoreNamePreview();
            }
        });
    }
    
    // Botón Restaurar Valores
    const resetBtn = document.getElementById('resetConfigBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', restoreDefaultConfig);
    }
    
    // Botón Exportar
    const exportBtn = document.getElementById('exportConfigBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportConfig);
    }
    
    // Botón Importar
    const importBtn = document.getElementById('importConfigBtn');
    if (importBtn) {
        importBtn.addEventListener('click', importConfig);
    }
    
    // Botón Vista Previa
    const previewBtn = document.getElementById('previewBtn');
    if (previewBtn) {
        previewBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Guardar antes de ver vista previa
            saveConfig();
            window.open('index.html', '_blank');
        });
    }
}

function setupRealTimePreview() {
    // Actualizar vista previa de redes sociales cuando cambien
    const socialCheckboxes = document.querySelectorAll('.social-toggle input[type="checkbox"]');
    socialCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSocialPreview);
    });
    
    // Actualizar vista previa de contacto cuando cambien los campos
    const contactFields = ['contactAddress', 'contactCity', 'contactCountry', 'contactPhone', 'contactEmail', 'hoursWeekdays'];
    contactFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', updateContactPreview);
        }
    });
    
    // Actualizar nombre de tienda en vista previa
    const storeNameField = document.getElementById('storeName');
    if (storeNameField) {
        storeNameField.addEventListener('input', updateStoreNamePreview);
    }
    
    // Actualizar colores en vista previa
    const colorFields = ['primaryColor', 'secondaryColor', 'accentColor', 'backgroundColor'];
    colorFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', updateColorPreview);
        }
    });
}

// ==============================================
// INICIALIZACIÓN
// ==============================================

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Cargando sistema de configuración...');
    // La inicialización completa se hará cuando Firebase esté listo
});