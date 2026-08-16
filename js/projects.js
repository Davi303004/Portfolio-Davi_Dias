async function loadProjects(){

    const response = await fetch('data/projects.json');

    if(!response.ok){
        throw new Error("Não foi possível carregar os projetos");
    }

    const data = await response.json();

    const currentPage = window.location.pathname.split('/').pop();

    let projects = data.projects

    if( currentPage === "index.html"){
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
            <h3 class="card-title">${project.title}</h3>
        
            <p>${project.description}</p>
        
            <div class="card-tags">
                ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
            </div>

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