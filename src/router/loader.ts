import { LoaderFunctionArgs } from "react-router-dom";
import { getExamById, getExamTemplateById } from "../apis/Setter";

export async function loaderTemplateDetail({ params }: LoaderFunctionArgs) {
  if (!params.id) throw new Response("Not Found", { status: 404 });
  return getExamTemplateById(params.id);
}

export async function loaderExamDetail({ params }: LoaderFunctionArgs) {
  if (!params.id) throw new Response("Not Found", { status: 404 });
  return getExamById(params.id);
}
