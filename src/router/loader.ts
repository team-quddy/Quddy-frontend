import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { getExamById, getExamTemplateById } from "../apis/Setter";
import { getSolverExamById, getSolverExamResultById } from "../apis/Solver";

export async function loaderTemplateDetail({ params }: LoaderFunctionArgs) {
  if (!params.id) throw new Response("Not Found", { status: 404 });
  return getExamTemplateById(params.id);
}

export async function loaderExamDetail({ params }: LoaderFunctionArgs) {
  if (!params.id) throw new Response("Not Found", { status: 404 });
  return getExamById(params.id);
}

export async function loaderSolverExam({ params }: LoaderFunctionArgs) {
  if (!params.id) throw new Response("Not Found", { status: 404 });
  const data = await getSolverExamById(params.id);
  console.log(data.id);
  if (data.id) return redirect(`/solver/result/${data.id}`);
  return data;
}

export async function loaderSolverResult({ params }: LoaderFunctionArgs) {
  if (!params.id) throw new Response("Not Found", { status: 404 });
  return getSolverExamResultById(params.id);
}
