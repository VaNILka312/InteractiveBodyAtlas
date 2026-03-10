import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { anatomyCategories } from './anatomy-categories.js';

// --- Инициализация сцены ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111122);

// --- Инициализация камеры ---
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(5, 5, 10);
camera.lookAt(0, 0, 0);

// --- Инициализация рендерера ---
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// --- Управление камерой ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.screenSpacePanning = true;

// --- Освещение ---
const ambientLight = new THREE.AmbientLight(0x404060);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(2, 5, 3);
scene.add(directionalLight);

const backLight = new THREE.PointLight(0x4466ff, 0.5);
backLight.position.set(-2, 1, -3);
scene.add(backLight);

// --- Глобальная переменная для хранения категорий ---
// (определяем здесь, чтобы быть доступной для всех функций)
let categorizedElements = {};

// --- Тестовый куб ---
function addTestCube() {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({
        color: 0x44aa88,
        emissive: 0x112233,
        roughness: 0.3,
        metalness: 0.1
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.position.set(0, 1, 0);
    scene.add(cube);
    console.log('Тестовый куб добавлен на сцену');
    return cube;
}

const testCube = addTestCube();

// --- Функция определения категории ---
function getCategory(elementName) {
    const name = elementName.toLowerCase();
    
    // Специальная обработка для анатомических поверхностей
    if (name.includes('surface') || 
        name.includes('dorsal') || 
        name.includes('palmar') || 
        name.includes('plantar') ||
        name.includes('region') ||
        name.includes('border')) {
        return 'surfaces';
    }
    
    // Специальная обработка для анатомических ориентиров
    if (name.includes('triangle') || 
        name.includes('fossa') || 
        name.includes('sulcus') || 
        name.includes('gyrus') ||
        name.includes('foramen') ||
        name.includes('canal') ||
        name.includes('process')) {
        return 'landmarks';
    }

    for (const [category, config] of Object.entries(anatomyCategories)) {
        const matches = config.keywords.some(keyword =>
            name.includes(keyword.toLowerCase())
        );
        if (matches) {
            return category;
        }
    }

    return 'other';
}

// --- Функция переключения категории (теперь работает с глобальной переменной) ---
function toggleCategory(categoryName, isVisible) {
    if (categorizedElements[categoryName]) {
        categorizedElements[categoryName].forEach(item => {
            if (item.node) {
                item.node.visible = isVisible;
            }
        });
        console.log(`Категория ${categoryName} теперь ${isVisible ? 'видима' : 'скрыта'}`);
    } else {
        console.warn(`Категория ${categoryName} не найдена`);
    }
}

// --- Функция создания интерфейса ---
function createCategoryControls() {
    // Проверяем, есть ли уже контейнер
    let container = document.getElementById('category-panel');
    
    // Если нет — создаём
    if (!container) {
        container = document.createElement('div');
        container.id = 'category-panel';
        container.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(30, 30, 40, 0.95);
            color: white;
            padding: 15px;
            border-radius: 8px;
            max-height: 90vh;
            overflow-y: auto;
            z-index: 1000;
            width: 280px;
            font-family: Arial, sans-serif;
            box-shadow: 0 4px 15px rgba(0,0,0,0.5);
            border: 1px solid #444;
        `;
        
        const title = document.createElement('h3');
        title.textContent = 'Категории анатомии';
        title.style.cssText = `
            margin-top: 0;
            margin-bottom: 15px;
            text-align: center;
            color: #aaccff;
            border-bottom: 1px solid #555;
            padding-bottom: 8px;
        `;
        container.appendChild(title);
        
        const controlsDiv = document.createElement('div');
        controlsDiv.id = 'category-controls';
        container.appendChild(controlsDiv);
        
        document.body.appendChild(container);
    }
    
    const controlsContainer = document.getElementById('category-controls');
    if (!controlsContainer) return;
    
    // Очищаем контейнер
    controlsContainer.innerHTML = '';
    
    // Добавляем кнопки для всех/никаких
    const buttonDiv = document.createElement('div');
    buttonDiv.style.cssText = `
        display: flex;
        gap: 10px;
        margin-bottom: 15px;
        justify-content: space-between;
    `;
    
    const showAllBtn = document.createElement('button');
    showAllBtn.textContent = 'Показать все';
    showAllBtn.style.cssText = `
        background: #2a6f97;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
        flex: 1;
    `;
    showAllBtn.onclick = () => {
        Object.keys(anatomyCategories).forEach(cat => {
            toggleCategory(cat, true);
            const checkbox = document.getElementById(`cat-${cat}`);
            if (checkbox) checkbox.checked = true;
        });
        // Также включаем other
        toggleCategory('other', true);
        const otherCheckbox = document.getElementById('cat-other');
        if (otherCheckbox) otherCheckbox.checked = true;
    };
    
    const hideAllBtn = document.createElement('button');
    hideAllBtn.textContent = 'Скрыть все';
    hideAllBtn.style.cssText = `
        background: #972a2a;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
        flex: 1;
    `;
    hideAllBtn.onclick = () => {
        Object.keys(anatomyCategories).forEach(cat => {
            toggleCategory(cat, false);
            const checkbox = document.getElementById(`cat-${cat}`);
            if (checkbox) checkbox.checked = false;
        });
        toggleCategory('other', false);
        const otherCheckbox = document.getElementById('cat-other');
        if (otherCheckbox) otherCheckbox.checked = false;
    };
    
    buttonDiv.appendChild(showAllBtn);
    buttonDiv.appendChild(hideAllBtn);
    controlsContainer.appendChild(buttonDiv);
    
    // Добавляем разделитель
    const separator = document.createElement('hr');
    separator.style.cssText = `
        border: none;
        border-top: 1px solid #555;
        margin: 10px 0;
    `;
    controlsContainer.appendChild(separator);
    
    // Добавляем чекбоксы для каждой категории
    const allCategories = { ...anatomyCategories, other: { visible: true } };
    
    Object.entries(allCategories).forEach(([cat, config]) => {
        const itemCount = categorizedElements[cat]?.length || 0;
        
        const div = document.createElement('div');
        div.style.cssText = `
            margin: 8px 0;
            display: flex;
            align-items: center;
            padding: 4px;
            border-radius: 4px;
            background: ${cat === 'auxiliary' ? 'rgba(100, 50, 50, 0.3)' : 'transparent'};
        `;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `cat-${cat}`;
        // По умолчанию включаем все, кроме auxiliary
        checkbox.checked = cat !== 'auxiliary';
        checkbox.style.marginRight = '8px';
        
        checkbox.addEventListener('change', (e) => {
            toggleCategory(cat, e.target.checked);
        });
        
        const label = document.createElement('label');
        label.htmlFor = `cat-${cat}`;
        label.style.cssText = `
            cursor: pointer;
            flex: 1;
            display: flex;
            justify-content: space-between;
        `;
        
        const nameSpan = document.createElement('span');
        nameSpan.textContent = cat;
        
        const countSpan = document.createElement('span');
        countSpan.textContent = `(${itemCount})`;
        countSpan.style.cssText = `
            color: #aaa;
            font-size: 0.9em;
            margin-left: 8px;
        `;
        
        label.appendChild(nameSpan);
        label.appendChild(countSpan);
        
        div.appendChild(checkbox);
        div.appendChild(label);
        controlsContainer.appendChild(div);
    });
    
    // Добавляем информацию о загрузке
    const infoDiv = document.createElement('div');
    infoDiv.style.cssText = `
        margin-top: 15px;
        font-size: 0.8em;
        color: #888;
        text-align: center;
        border-top: 1px solid #555;
        padding-top: 8px;
    `;
    infoDiv.textContent = 'Всего элементов: ' + 
        Object.values(categorizedElements).reduce((sum, arr) => sum + arr.length, 0);
    controlsContainer.appendChild(infoDiv);
}

// --- Функция загрузки модели ---
function loadGLBModel() {
    const loader = new GLTFLoader();
    const modelPath = 'models/man_model_test_no_labels.glb';

    console.log('Начинаем загрузку модели:', modelPath);

    loader.load(
        modelPath,
        (gltf) => {
            const model = gltf.scene;
            model.scale.set(5, 5, 5);
            model.position.set(0, -5, 0);

            model.traverse((node) => {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });

            scene.add(model);
            scene.remove(testCube);
            console.log('Модель успешно загружена!');

            // Инициализируем структуру категорий
            categorizedElements = {};
            
            // Инициализируем все категории из anatomyCategories
            Object.keys(anatomyCategories).forEach(cat => {
                categorizedElements[cat] = [];
            });
            // Добавляем категорию для остальных элементов
            categorizedElements['other'] = [];

            // Распределяем элементы по категориям
            model.traverse((node) => {
                if (node.isMesh) {
                    const name = node.name || 'unnamed';
                    console.log('Найден элемент:', name);

                    const category = getCategory(name);

                    if (!categorizedElements[category]) {
                        categorizedElements[category] = [];
                    }
                    
                    categorizedElements[category].push({
                        node: node,
                        name: name,
                        category: category
                    });

                    // Устанавливаем видимость на основе категории
                    // По умолчанию скрываем только auxiliary
                    node.visible = category !== 'auxiliary';
                }
            });

            // Выводим статистику
            console.log('Распределение по категориям:');
            Object.entries(categorizedElements).forEach(([cat, items]) => {
                console.log(`${cat}: ${items.length} элементов`);
            });

            // Создаём интерфейс ПОСЛЕ того, как категории заполнены
            createCategoryControls();
        },
        (xhr) => {
            const percent = (xhr.loaded / xhr.total * 100);
            console.log(`Загрузка: ${percent.toFixed(2)}%`);
            
            // Показываем прогресс на странице
            let infoDiv = document.getElementById('info');
            if (!infoDiv) {
                infoDiv = document.createElement('div');
                infoDiv.id = 'info';
                infoDiv.style.cssText = `
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    color: white;
                    background: rgba(0,0,0,0.7);
                    padding: 10px;
                    border-radius: 5px;
                    z-index: 1000;
                `;
                document.body.appendChild(infoDiv);
            }
            infoDiv.innerHTML = `Загрузка модели: ${percent.toFixed(0)}%`;
        },
        (error) => {
            console.error('Ошибка загрузки модели:', error);
            const infoDiv = document.getElementById('info') || document.createElement('div');
            infoDiv.id = 'info';
            infoDiv.style.cssText = `
                position: absolute;
                top: 20px;
                left: 20px;
                color: white;
                background: rgba(200,0,0,0.7);
                padding: 10px;
                border-radius: 5px;
                z-index: 1000;
            `;
            infoDiv.innerHTML = 'Ошибка загрузки модели. Смотри консоль.';
            document.body.appendChild(infoDiv);
        }
    );
}

// Загружаем модель
loadGLBModel();

// --- Анимация ---
function animate() {
    requestAnimationFrame(animate);

    if (testCube && testCube.parent) {
        testCube.rotation.y += 0.01;
        testCube.rotation.x += 0.005;
    }

    controls.update();
    renderer.render(scene, camera);
}

animate();

// --- Обработка изменения размера окна ---
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}