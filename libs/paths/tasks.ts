import { TasksApi } from "../../pages/api/typescript-axios/api";

export const getAllIds = async () => {
  const res = await TasksApi.prototype.getTasks();
  return res.data.tasks.map((t) => ({
    params: {
      id: String(t.id),
    },
  }));
};
