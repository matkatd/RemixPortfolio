import ProjectCard from "~/routes/components/ProjectCard.jsx";
import AdminCard from "./AdminCard";

function CardList({ data, admin }) {
  return (
    <div id="card-grid">
      {data?.map((project) => {
        return !admin ? (
          <ProjectCard project={project} key={project?.slug} />
        ) : (
          <AdminCard project={project} key={project?.slug} />
        );
      })}
    </div>
  );
}

export default CardList;
