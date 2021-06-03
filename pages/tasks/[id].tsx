import Link from "next/link";
import React from "react";
import { getAllIds } from "../../libs/paths/tasks";
import { Task, TasksApi } from "../api/typescript-axios/api";

interface Props {
  task: Task;
}

const Show = (props: Props) => {
  const task = props.task;

  return (
    <>
      <h1>hello</h1>
      <p>{task.name}</p>
      <Link href={`/tasks/update/${task.id}`}>
        <a>タスクの更新</a>
      </Link>
    </>
  );
};

export const getStaticPaths = async () => {
  const paths = await getAllIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const res = await TasksApi.prototype.getTask(params.id);
  return {
    props: {
      task: res.data,
    },
  };
};

export default Show;
