import { LoaderFunctionArgs } from "react-router-dom";
import { getExamById, getExamTemplateById } from "../apis/Setter";
import { getSolverExamById } from "../apis/Solver";

export async function loaderTemplateDetail({ params }: LoaderFunctionArgs) {
  if (!params.id) throw new Response("Not Found", { status: 404 });
  return getExamTemplateById(params.id);
}

export async function loaderExamDetail({ params }: LoaderFunctionArgs) {
  if (!params.id) throw new Response("Not Found", { status: 404 });
  return getExamById(params.id);
}

export async function loaderSolver({ params }: LoaderFunctionArgs) {
  if (!params.id) throw new Response("Not Found", { status: 404 });
  return getSolverExamById(params.id);
}
