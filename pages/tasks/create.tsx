import { useRouter } from "next/router";
import React from "react";
import { TasksApi } from "../api/typescript-axios/api";
import useSystemMessage from "../../libs/hooks/useSystemMessage";
import { TaskDto } from "../../types/type";

const Create = () => {
  const router = useRouter();
  const { success } = useSystemMessage();
  const [taskDto, setTaskDto] = React.useState<TaskDto>({
    name: "",
    content: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await success("タスクの作成に成功しました。");
      TasksApi.prototype.postTasks(taskDto);
      router.push("/tasks");
    } catch {
      console.error("タスクの作成に失敗しました");
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

export default Create;
