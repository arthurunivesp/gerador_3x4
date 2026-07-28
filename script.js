const imageInput = document.getElementById('imageInput');
const printArea = document.getElementById('printArea');

// Configurações (devem bater com o CSS)
// A4 (210x297mm) - Margens (20mm cada lado) = 170x257mm úteis
// Foto (30x40mm) + Gap (2mm)
// Colunas: floor(170 / 32) = 5 fotos por linha (sobra 10mm)
// Linhas: floor(257 / 42) = 6 linhas por página (sobra 5mm)
const MAX_PHOTOS_PER_PAGE = 30; 

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
    // Limpa o input para permitir selecionar os mesmos arquivos novamente se necessário
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

    // Verifica se precisa de uma nova página
    if (!lastPage || lastPage.querySelectorAll('.photo-container').length >= MAX_PHOTOS_PER_PAGE) {
        lastPage = createNewPage();
    }

    const container = document.createElement('div');
    container.className = 'photo-container';
    
    const img = document.createElement('img');
    img.src = imageSrc;
    
    container.appendChild(img);
    lastPage.appendChild(container);
}

function clearImages() {
    if (confirm('Tem certeza que deseja limpar todas as fotos?')) {
        printArea.innerHTML = '';
        imageInput.value = '';
    }
}
