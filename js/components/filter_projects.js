export function initializeProjectFilters(projects,renderProjects) {

    const filtersContainer = document.getElementById('project-filters');

    if (!filtersContainer) {
        return;
    }

    const tags = getProjectTags(projects);


    renderProjectFilters(filtersContainer,tags,projects,renderProjects);

}


function getProjectTags(projects) {

    const tags = new Set();


    projects.forEach(project => {
        project.technologies.forEach(tag => {
            tags.add(tag);
        });
    });


    return [...tags];

}


function countProjectTags(projects) {

    const tagCount = new Map();


    projects.forEach(project => {
        project.technologies.forEach(tag => {

            const currentCount = tagCount.get(tag) || 0;

            tagCount.set(tag,currentCount + 1);
        });
    });

    return tagCount;
}


function renderProjectFilters(container,tags,projects,renderProjects) {

    const tagCount = countProjectTags(projects);


    container.innerHTML = '';


    createAllFilter(container,projects,renderProjects);

    tags.forEach(tag => {
        const count = tagCount.get(tag);

        const button = document.createElement('button');


        button.type = 'button';
        button.classList.add('filter-button');
        button.dataset.tag = tag;

        button.textContent = `${tag} (${count})`;


        button.addEventListener('click',() => {

                filterProjectsByTag(tag,projects,renderProjects,container);
            }
        );

        container.appendChild(button);

    });

}


function createAllFilter(container,projects,renderProjects) {

    const button =document.createElement('button');

    button.type ='button';
    button.classList.add('filter-button','active');
    button.dataset.tag ='all';

    button.textContent = `Todos (${projects.length})`;


    button.addEventListener('click',() => {

            renderProjects(projects);
            updateActiveFilter(container,button);
        }
    );

    container.appendChild(
        button
    );

}


function filterProjectsByTag(selectedTag,projects,renderProjects,filtersContainer) {

    const filteredProjects = projects.filter(project =>
            project.technologies.includes(selectedTag)
        );

    renderProjects(filteredProjects);

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