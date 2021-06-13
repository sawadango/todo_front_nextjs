import dayjs from "dayjs";
import Link from "next/link";
import router from "next/router";
import React from "react";
import useSystemMessage from "../../libs/hooks/useSystemMessage";
import { getAllIds } from "../../libs/paths/tasks";
import { Task, TasksApi } from "../api/typescript-axios/api";

interface Props {
  task: Task;
}

const Show = (props: Props) => {
  const task = props.task;
  const { success, danger } = useSystemMessage();

  const handleDelete = async (id: number) => {
    try {
      await TasksApi.prototype.deleteTask(id);
      await success("タスクの削除に成功しました。");
      router.push("/tasks");
    } catch {
      await danger("タスクの削除に失敗しました");
    }
  };

  return (
    <>
      <div className="container">
        <div className="m-6">
          <h6 className="subtitle is-6">
            {dayjs(task.created_at).format("YYYY-MM-DD HH:mm:ss")}
          </h6>
          <h1 className="title">{task.name}</h1>
          <h2 className="subtitle">{task.content}</h2>
          <div className="columns">
            <div className="column is-2">
              <Link href={`/tasks/update/${task.id}`}>
                <button className="button is-primary">タスクの更新</button>
              </Link>
            </div>
            <div className="column is-2">
              <button
                className="button is-danger is-outlined"
                onClick={() => handleDelete(task.id)}
              >
                削除
              </button>
            </div>
          </div>
        </div>
      </div>
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
