import ProjectCard from "~/routes/components/CardList.jsx";

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
