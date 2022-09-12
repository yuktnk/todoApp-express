const params = window.location.search;
const id = new URLSearchParams(params).get("id");

const taskIDDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const editFormDOM = document.querySelector(".single-task-form");
const formAlertDOM = document.querySelector(".form-alert");
const taskEditCompletedDOM = document.querySelector(".task-edit-completed");

/**
 * 特定のタスクの取得
 */
const showTask = async () => {
    try {
        const { data: task } = await axios.get(`/api/v1/tasks/${id}`);
        const { _id, completed, name } = task;
        taskIDDOM.textContent = _id;
        taskNameDOM.value = name;
        if (completed) {
            taskEditCompletedDOM.checked = true;
        }
    } catch (error) {
        console.log(error);
    }
};

/**
 * タスクの編集
 */
editFormDOM.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const taskName = taskNameDOM.value;
        const taskCompleted = taskEditCompletedDOM.checked;
        const { data: task } = await axios.patch(`/api/v1/tasks/${id}`, {
            name: taskName,
            completed: taskCompleted,
        });
        formAlertDOM.style.diaplay = "block";
        formAlertDOM.textContent = "編集しました";
        formAlertDOM.classList.add("text-success");
    } catch (error) {
        console.log(error);
    }
    setTimeout(() => {
        formAlertDOM.style.display = "none";
        formAlertDOM.classList.remove("text-success");
        formAlertDOM.innerHTML = "";
    }, 3000);
});

showTask();
