import { fetchRepos } from "@/lib/github";
import ProjectsView from "./ProjectsView";

export default async function Projects() {
  const repos = await fetchRepos();
  return <ProjectsView repos={repos} />;
}
