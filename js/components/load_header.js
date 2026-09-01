import { resolvePath } from '../utils/path_utils.js';


export async function loadHeader() {

    try {

        const response = await fetch( resolvePath('components/header.html') );


        if (!response.ok) {
            throw new Error('Header não encontrado.');
        }


        const html = await response.text();


        const container =
            document.getElementById( 'header-container');

        container.innerHTML = html;
        resolveHeaderLinks(container);

    } catch (error) {

        console.error(
            'Erro ao carregar header:',
            error
        );

    }

}

function resolveHeaderLinks(container) {

    const links =
        container.querySelectorAll(
            '[data-route]'
        );

    const assets =
        container.querySelectorAll(
            '[data-src]'
        );

    links.forEach(link => {

        const route =
            link.dataset.route;

        link.href = resolvePath(route);

    });

    assets.forEach(asset => {

        const src =
            asset.dataset.src;

        asset.src = resolvePath(src);

    });

}