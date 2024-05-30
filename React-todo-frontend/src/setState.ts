import api from "./api";

const setCompleted = async (title: string) => {
    try {
        await api.post('/tasks/complete', {
            title: title
        });
    } catch (error) {
        console.error(error);
    }
}

const setRelevance = async (title: string) => {
    try {
        await api.post('/tasks/relevance', {
            title: title
        });
    } catch (error) {
        console.error(error);
    }
}

export { setCompleted, setRelevance };
