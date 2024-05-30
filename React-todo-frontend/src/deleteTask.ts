import api from "./api";

const deleteTask = async (title: string) => {
    try {
        await api.delete('/tasks/delete', {
            data: {
                title: title
            }
        });
    } catch (error) {
        console.error(error);
    }
};

export { deleteTask };
