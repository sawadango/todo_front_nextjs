import router from "next/router";
import React from "react";
import useSystemMessage from "../../../libs/hooks/useSystemMessage";
import { getAllIds } from "../../../libs/paths/tasks";
import { TaskDto } from "../../../types/type";
import { Task, TasksApi } from "../../api/typescript-axios/api";

interface Props {
  task: Task;
}

const Update = (props: Props) => {
  const task = props.task;
  const { success } = useSystemMessage();
  const [taskDto, setTaskDto] = React.useState<TaskDto>({
    name: task.name,
    content: task.content,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await success("タスクの更新に成功しました。");
      TasksApi.prototype.putTask(task.id, taskDto);
      router.push("/tasks");
    } catch {
      console.error("タスクの更新に失敗しました");
    }
  };
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">タスク名</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="タスク名を入力してください"
                defaultValue={taskDto.name}
                onChange={(event) =>
                  setTaskDto((prevState) => ({
                    ...prevState,
                    name: event.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="field">
            <label className="label">タスク内容</label>
            <div className="control">
              <textarea
                className="textarea"
                placeholder="タスク内容を入力してください"
                defaultValue={taskDto.content}
                onChange={(event) =>
                  setTaskDto((prevState) => ({
                    ...prevState,
                    content: event.target.value,
                  }))
                }
              ></textarea>
            </div>
          </div>

          <div className="field">
            <p className="control">
              <input type="submit" className="button is-success" value="作成" />
            </p>
          </div>
        </form>
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

export default Update;
