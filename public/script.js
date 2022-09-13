const taskList = document.querySelector(".tasks");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");

/**
 * タスクの読み込み
 */
const showTasks = async () => {
    try {
        const { data: tasks } = await axios.get("/api/v1/tasks");

        // タスクがひとつもないとき
        if (tasks.length < 1) {
            taskList.innerHTML = `<h5 class="empty-list">全てのタスクを完了しました</h5>`;
            return;
        }

        const allTasks = tasks
            .map((task) => {
                const { completed, _id, name } = task;

                return `<li class="single-task ${completed && "task-completed"}">
                            <h5>
                                <span><i class="far fa-check-circle"></i></span>${name}
                            </h5>
                            <div class="task-links">
                                <!-- 編集リンク -->
                                <a href="/edit.html?id=${_id}" class="edit-link">
                                    <i class="fas fa-edit"></i>
                                </a>
                                <!-- ゴミ箱リンク -->
                                <button type="button" class="delete-btn" data-id="${_id}">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </li>`;
            })
            .join("");
        taskList.innerHTML = allTasks;
    } catch (err) {
        console.log(err);
    }
};

showTasks();

/**
 * タスクの作成
 */
formDOM.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = taskInputDOM.value;

    try {
        await axios.post("/api/v1/tasks", { name: name });
        showTasks();
        taskInputDOM.value = "";
        formAlertDOM.style.display = "block";
        formAlertDOM.innerHTML = "タスクを追加しました";
        formAlertDOM.classList.add("text-success");
    } catch (error) {
        console.log(error);
        formAlertDOM.style.display = "block";
        formAlertDOM.classList.remove("text-success");
        formAlertDOM.innerHTML = "20文字以内で入力してください";
    }
    setTimeout(() => {
        formAlertDOM.style.display = "none";
        formAlertDOM.innerHTML = "";
    }, 3000);
});

/**
 * タスクの削除、編集
 */
taskList.addEventListener("click", async (e) => {
    const element = e.target;

    // タスクの削除
    if (element.parentElement.classList.contains("delete-btn")) {
        const id = element.parentElement.dataset.id;
        try {
            await axios.delete(`/api/v1/tasks/${id}`);
            showTasks();
        } catch (error) {
            console.log(error);
        }
    }
});
