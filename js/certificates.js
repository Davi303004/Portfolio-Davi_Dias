import {loadPdfJs} from './utils/pdf_loader.js';

/* Renderizando a primeira página do PDF por meio da biblioteca PDF.JS */

async function renderPdf(pdfUrl, canvas){
       try {

        const pdfjs = await loadPdfJs();

        const pdf = await pdfjs.getDocument(pdfUrl).promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({
                scale: 1.5
            });


        const context = canvas.getContext('2d');

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
            canvasContext: context,
            viewport
        }).promise;


    } catch (error) {

        console.error(
            'Erro ao carregar certificado:',
            error
        );

    }
}

/* Carregando os certificados para que sejam usados nos cards */

async function loadCertificates(){
    const currentPath = window.location.pathname;

     const isHomePage =
        currentPath.endsWith('/') ||
        currentPath.endsWith('/index.html');

    const isCoursePage =
        currentPath.endsWith('/certificates.html');

    const dataPath =
        currentPath.includes('/pages/') ? '../data/certificates.json' : 'data/certificates.json';

    
    const response = await fetch(dataPath);

    if(!response.ok){
        throw new Error("Não foi possível carregar os certificados");
    }
    
    const data = await response.json();

    let certificates = data.certificates;

    if(isHomePage){
        certificates = certificates.filter(certificate => certificate.featured === true);
    }

    renderCertificates(certificates);
} 

/* Renderizando os cards com os certificados */
function renderCertificates(certificates){

    const container = document.getElementById( 'course-container' );

    container.innerHTML = '';

    certificates.forEach(certificate => {
        const card =
            document.createElement('article');

        card.classList.add('card');

        card.innerHTML = `

            <div class="certificate">

                <canvas></canvas>

            </div>


            <div class="card-content">
                <div class="card-tags">
                    ${certificate.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <h3>${certificate.title}</h3>

                <p class="certificate-institution">
                    ${certificate.institution}
                </p>
                
                <p class="certificate-date">
                    ${certificate.end_date}
                </p>

                
                
                <ul>
                    ${certificate.content.map(desc => `<li class="content">${desc}</li>`).join('')}
                </ul>
            </div>

        `;


        container.appendChild(card);


        const canvas =
            card.querySelector('canvas');


        renderPdf(
            certificate.pdf,
            canvas
        );

    });
}

loadCertificates().catch(error => {
    console.error(error);
})