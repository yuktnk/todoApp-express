/**
 * タスクの読み込み
 */

const taskList = document.querySelector(".tasks");
const showTasks = async () => {
    try {
        const { data: tasks } = await axios.get("/api/v1/tasks");

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
                                <button type="button" class="delete-btn">
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
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
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
