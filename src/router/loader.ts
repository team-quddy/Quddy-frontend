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
  // 이미 응시 내역이 있다면 응시결과 페이지로 이동합니다
  if (data.id) return redirect(`/solver/result/${data.id}`);
  if (data.exam) return data.exam;
  throw new Response("Bad Request", { status: 400 });
}

export async function loaderSolverResult({ params }: LoaderFunctionArgs) {
  if (!params.id) throw new Response("Not Found", { status: 404 });
  return getSolverExamResultById(params.id);
}
