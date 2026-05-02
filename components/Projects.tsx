import { fetchRepos } from "@/lib/github";
import ProjectsClient from "./ProjectsClient";

export default async function Projects() {
  const repos = await fetchRepos();
  return <ProjectsClient repos={repos} />;
}
