import ProjectCard from "./ProjectCard";

function CardList({ projects }, category) {
    return (
        <main>
            <h2 className="grid-page img-page">{category}</h2>
            <div id="card-grid">
                {projects.map((project) => (
                    <ProjectCard project={project} key={project.slug}/>
                ))}
            </div>
        </main>
    );
}

export default CardList;