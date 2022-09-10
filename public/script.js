const taskList = document.querySelector(".tasks");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");

/**
 * タスクの読み込み
 */
const showTasks = async () => {
    try {
        const { data: tasks } = await axios.get("/api/v1/tasks");

        // タスクがひとつもないとき
        if (tasks.length < 1) {
            taskList.innerHTML = `<h5 class="empty-list">全てのタスクを完了しました</h5>`;
            reuturn;
        }

        const allTasks = tasks
            .map((task) => {
                const { copleted, _id, name } = task;

                return `<li class="single-task">
                            <h5>
                                <span><i class="far fa-check-circle"></i></span>${name}
                            </h5>
                            <div class="task-links">
                                <!-- 編集リンク -->
                                <a href="#" class="edit-link">
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
    } catch (error) {
        console.log(error);
    }
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
