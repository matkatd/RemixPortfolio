import ProjectCard from "./projectcard";

function CardList({ data }) {
  return (
    <div id="card-grid">
      {data?.map((project) => (
        <ProjectCard project={project} key={project?.slug} />
      ))}
    </div>
  );
}

export default CardList;
