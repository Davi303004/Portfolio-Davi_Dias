async function loadSkills(){
    const currentPath = window.location.pathname;

    const dataPath =
        currentPath.includes('/pages/') ? '../data/skills.json' : 'data/skills.json';

    const response = await fetch(dataPath);

    if(!response.ok){
        throw new Error("Não foi possível carregar as Skills");
    }
    
    const data = await response.json();

    let skills = data.categories;


    renderSkills(skills);
} 

function renderSkills(categories) {

    const container = document.getElementById('skills-container');

    categories.forEach(category => {

        const categoryElement = document.createElement('details');

        categoryElement.classList.add('skill-category');

        categoryElement.innerHTML = `

            <summary>

                <span>
                    ${category.title}
                </span>

                <span
                    class="skill-indicator"
                    aria-hidden="true">
                    +
                </span>

            </summary>


            <div class="skills-list">

                ${category.skill_set.map(skill => `

                    <div class="skill-item">
                        <span class="skill-name">
                                ${skill.skill}
                        </span>
                        
                        <div class="progress-bar" style="width:${skill.proficiency}%;">
                            <span class="skill-level">
                                ${skill.nivel}
                            </span>
                        </div>

                    </div>

                `).join('')}

            </div>

        `;


        container.appendChild(
            categoryElement
        );

    });

}

loadSkills().catch(error => {
    console.error(error);
})