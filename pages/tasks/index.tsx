import React from "react";
import { Task, TasksApi } from "../api/typescript-axios/api";
import dayjs from "dayjs";
import Link from "next/link";
import useSystemMessage from "../../libs/hooks/useSystemMessage";
import router from "next/router";

interface Props {
  tasks: Task[];
}

const Index = (props: Props) => {
  const tasks = props.tasks;
  const { success, danger } = useSystemMessage();

  const handleChange = async (checked: boolean, taskId: number) => {
    try {
      await TasksApi.prototype.putTask(taskId, { isDone: checked });
    } catch {
      console.log("失敗しました。");
    }
  };

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
        {tasks.map((t) => (
          <div key={t.id} className="columns">
            <div className="column is-one-third">
              <div className="card">
                <Link href={`/tasks/${String(t.id)}`}>
                  <a>
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img
                          src="https://bulma.io/images/placeholders/1280x960.png"
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                  </a>
                </Link>
                <div className="card-content">
                  <div className="media">
                    <div className="media-left">
                      <figure className="image is-48x48">
                        <img
                          src="https://bulma.io/images/placeholders/96x96.png"
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <div className="media-content">
                      <div className="columns">
                        <div className="column is-four-fifths">
                          <p className="title is-4">{t.name}</p>
                          <p className="subtitle is-6">サブタイトル</p>
                        </div>
                        <div className="column">
                          <label className="checkbox">
                            <input
                              type="checkbox"
                              onChange={(event) =>
                                handleChange(event.target.checked, t.id)
                              }
                            />
                            Done
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="content">
                    {t.content}
                    <br />
                    {dayjs(t.created_at).format("YYYY-MM-DD HH:mm:ss")}
                  </div>
                  <div className="columns">
                    <div className="column">
                      <Link href={`/tasks/update/${t.id}`}>
                        <button className="button is-primary">
                          タスクの更新
                        </button>
                      </Link>
                    </div>
                    <div className="column">
                      <button
                        className="button is-danger is-outlined"
                        onClick={() => handleDelete(t.id)}
                      >
                        削除
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const res = await TasksApi.prototype.getTasks();
  return {
    props: {
      tasks: res.data.tasks,
    },
  };
};

export default Index;
