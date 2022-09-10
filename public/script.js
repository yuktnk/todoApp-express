/**
 * api/v1/tasksからタスクを読み込む
 */

const tasksDOM = document.querySelector(".tasks");

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
        tasksDOM.innerHTML = allTasks;
    } catch (err) {
        console.log(err);
    }
};

showTasks();
