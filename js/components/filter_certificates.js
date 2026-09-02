export function initializeCertificateFilters(certificates,renderCertificates) {

    const filtersContainer = document.getElementById('certificate-filters');

    if (!filtersContainer) {
        return;
    }

    const tags = getCertificateTags(certificates);


    renderCertificateFilters(filtersContainer,tags,certificates,renderCertificates);

}


function getCertificateTags(certificates) {

    const tags = new Set();


    certificates.forEach(certificate => {
        certificate.tags.forEach(tag => {
            tags.add(tag);
        });
    });


    return [...tags];

}


function countCertificateTags(certificates) {

    const tagCount = new Map();


    certificates.forEach(certificate => {
        certificate.tags.forEach(tag => {

            const currentCount = tagCount.get(tag) || 0;

            tagCount.set(tag,currentCount + 1);
        });
    });

    return tagCount;
}


function renderCertificateFilters(container,tags,certificates,renderCertificates) {

    const tagCount = countCertificateTags(certificates);


    container.innerHTML = '';


    createAllFilter(container,certificates,renderCertificates);

    tags.forEach(tag => {
        const count = tagCount.get(tag);

        const button = document.createElement('button');


        button.type = 'button';
        button.classList.add('filter-button');
        button.dataset.tag = tag;

        button.textContent = `${tag} (${count})`;


        button.addEventListener('click',() => {

                filterCertificatesByTag(tag,certificates,renderCertificates,container);
            }
        );

        container.appendChild(button);

    });

}


function createAllFilter(container,certificates,renderCertificates) {

    const button =document.createElement('button');

    button.type ='button';
    button.classList.add('filter-button','active');
    button.dataset.tag ='all';

    button.textContent = `Todos (${certificates.length})`;


    button.addEventListener('click',() => {

            renderCertificates(certificates);
            updateActiveFilter(container,button);
        }
    );

    container.appendChild(
        button
    );

}


function filterCertificatesByTag(selectedTag,certificates,renderCertificates,filtersContainer) {

    const filteredCertificates = certificates.filter(certificate =>
            certificate.tags.includes(selectedTag)
        );

    renderCertificates(filteredCertificates);

    const selectedButton = filtersContainer.querySelector(`[data-tag="${selectedTag}"]`);


    updateActiveFilter(filtersContainer,selectedButton);

}


function updateActiveFilter(container,activeButton) {

    const buttons = container.querySelectorAll('.filter-button');

    buttons.forEach(button => {
        button.classList.remove('active');
    });

    activeButton.classList.add('active');

}