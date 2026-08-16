async function loadProjects(){
    const currentPath = window.location.pathname;

     const isHomePage =
        currentPath.endsWith('/') ||
        currentPath.endsWith('/index.html');

    const isProjectsPage =
        currentPath.endsWith('/projects.html');

    const dataPath =
        currentPath.includes('/pages/') ? '../data/projects.json' : 'data/projects.json';

    
    const response = await fetch(dataPath);

    if(!response.ok){
        throw new Error("Não foi possível carregar os projetos");
    }
    
    const data = await response.json();

    let projects = data.projects

    if(isHomePage){
        projects = projects.filter(project => project.featured === true);
    }

    renderProjects(projects);
} 

function renderProjects(projects){
    const container = document.getElementById('project-container');

    container.innerHTML = ``;

    projects.forEach(project => {
        const card = document.createElement("article");

        card.classList.add('card');

        card.innerHTML = `
        <img
            src="${project.image}"
            alt="${project.title}"
            class="card-img">
            
        <div class="card-content">
            <div class="card-tags">
                ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
            </div>
            <h3 class="card-title">${project.title}</h3>
        
            <p>${project.description}</p>
        
            <div class="project-link">
                <a
                    href="${project.github}"
                    target="_blank"
                    rel="noopener noreferrer">
                    <img
                        src="assets/img/icons/github_icon.png"
                        alt="GitHub">
                </a>
            </div>
        </div>`;

        container.appendChild(card);
    });
}

loadProjects().catch(error => {
    console.error(error);
})