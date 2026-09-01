import { resolvePath } from '../utils/path_utils.js';


export async function loadFooter() {

    try {

        const response = await fetch( resolvePath('components/footer.html') );


        if (!response.ok) {
            throw new Error('Footer não encontrado.');
        }


        const html = await response.text();


        const container =
            document.getElementById( 'footer-container');

        container.innerHTML = html;
        
        resolveFooterLinks(container);
        updateFooterYear();


    } catch (error) {

        console.error(
            'Erro ao carregar footer:',
            error
        );

    }

}

function resolveFooterLinks(container) {

    const links =
        container.querySelectorAll(
            '[data-route]'
        );


    links.forEach(link => {

        const route =
            link.dataset.route;


        link.href =
            resolvePath(route);

    });

}


function updateFooterYear() {

    const yearElement =
        document.getElementById(
            'current-year'
        );


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }

}