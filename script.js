const imageInput = document.getElementById('imageInput');
const printArea = document.getElementById('printArea');

// Configurações
const MAX_PHOTOS_PER_PAGE = 30;

// Controle global de arraste (evita múltiplos listeners)
let currentDrag = null;

imageInput.addEventListener('change', function(e) {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    processFiles(files);
});

async function processFiles(files) {
    for (const file of files) {
        const imageSrc = await readFileAsDataURL(file);
        addPhotoToGrid(imageSrc);
    }
    imageInput.value = '';
}

function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file);
    });
}

function createNewPage() {
    const page = document.createElement('div');
    page.className = 'page';
    printArea.appendChild(page);
    return page;
}

function addPhotoToGrid(imageSrc) {
    let pages = document.querySelectorAll('.page');
    let lastPage = pages[pages.length - 1];

    if (!lastPage || lastPage.querySelectorAll('.photo-container').length >= MAX_PHOTOS_PER_PAGE) {
        lastPage = createNewPage();
    }

    const container = document.createElement('div');
    container.className = 'photo-container';
    container.title = 'Arraste para mover • Scroll para zoom • Duplo clique para resetar';

    const img = document.createElement('img');
    img.src = imageSrc;
    img.draggable = false;

    // Estado individual da foto
    const state = {
        scale: 1,
        x: 0,
        y: 0
    };

    const updateTransform = () => {
        img.style.transform = `translate(${state.x}px, ${state.y}px) scale(${state.scale})`;
    };

    // ===== ARRASTAR =====
    container.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        e.preventDefault();

        currentDrag = {
            state,
            startMouseX: e.clientX,
            startMouseY: e.clientY,
            startX: state.x,
            startY: state.y,
            container
        };

        container.style.cursor = 'grabbing';
    });

    // ===== ZOOM (scroll) =====
    container.addEventListener('wheel', (e) => {
        e.preventDefault();

        const delta = e.deltaY > 0 ? -0.12 : 0.12;
        const newScale = Math.min(Math.max(1, state.scale + delta), 4);

        state.scale = newScale;
        updateTransform();
    }, { passive: false });

    // ===== RESET (duplo clique) =====
    container.addEventListener('dblclick', () => {
        state.scale = 1;
        state.x = 0;
        state.y = 0;
        updateTransform();
    });

    container.appendChild(img);
    lastPage.appendChild(container);
    updateTransform();
}

// Listeners globais de mouse (só uma vez)
window.addEventListener('mousemove', (e) => {
    if (!currentDrag) return;

    const dx = e.clientX - currentDrag.startMouseX;
    const dy = e.clientY - currentDrag.startMouseY;

    currentDrag.state.x = currentDrag.startX + dx;
    currentDrag.state.y = currentDrag.startY + dy;

    currentDrag.container.querySelector('img').style.transform =
        `translate(${currentDrag.state.x}px, ${currentDrag.state.y}px) scale(${currentDrag.state.scale})`;
});

window.addEventListener('mouseup', () => {
    if (currentDrag) {
        currentDrag.container.style.cursor = 'grab';
        currentDrag = null;
    }
});

// Suporte básico a touch (celular/tablet)
window.addEventListener('touchmove', (e) => {
    if (!currentDrag || e.touches.length !== 1) return;
    e.preventDefault();

    const touch = e.touches[0];
    const dx = touch.clientX - currentDrag.startMouseX;
    const dy = touch.clientY - currentDrag.startMouseY;

    currentDrag.state.x = currentDrag.startX + dx;
    currentDrag.state.y = currentDrag.startY + dy;

    currentDrag.container.querySelector('img').style.transform =
        `translate(${currentDrag.state.x}px, ${currentDrag.state.y}px) scale(${currentDrag.state.scale})`;
}, { passive: false });

window.addEventListener('touchend', () => {
    if (currentDrag) {
        currentDrag.container.style.cursor = 'grab';
        currentDrag = null;
    }
});

function clearImages() {
    if (confirm('Tem certeza que deseja limpar todas as fotos?')) {
        printArea.innerHTML = '';
        imageInput.value = '';
        currentDrag = null;
    }
}