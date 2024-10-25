let selectedTask = null;
let currentTasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderizaTasks()

function adicionarTask() {
    const taskName = document.getElementById("taskName");
    const taskValue = document.getElementById("taskValue");
    const taskObject = {
        id: Date.now(),
        name: taskName.value,
        value: taskValue.value
    };

    if (selectedTask) {
        taskObject.id = selectedTask;
        const index = currentTasks.findIndex(task => task.id === selectedTask);
        currentTasks[index] = taskObject;
    } else {
        currentTasks.push(taskObject)
    }

    atualizaLocalStorageTasks(currentTasks);
    renderizaTasks();
    taskName.value = "";
    taskValue.value = "";
}

function renderizaTasks() {
    if (currentTasks.length <= 0) return;

    const elementPai = document.getElementById("tasksContainer");

    const titulo = document.createElement("h1");
    titulo.innerText = "Suas Tarefas";
    elementPai.appendChild(titulo);

    const linkVoltarTopo = document.createElement("a");
    linkVoltarTopo.className = "link-opacity-100";
    linkVoltarTopo.href = "#baseFormCriarTarefa";
    linkVoltarTopo.innerText = "Voltar para o topo";

    elementPai.innerHTML = "";
    currentTasks.forEach(task => renderizaTaskEspecifica(task, elementPai));

    elementPai.appendChild(linkVoltarTopo);
}

function renderizaTaskEspecifica(task, elementPai) {
    const base = document.createElement("li");
    base.className = "list-unstyled my-3 d-flex align-items-center flex-column";
    const infoSection = document.createElement("div");
    const actionSection = document.createElement("div");

    const btnEditar = document.createElement("button");
    btnEditar.innerText = "Editar";
    btnEditar.className = "btn btn-warning mx-3";
    btnEditar.addEventListener("click", () => {
        atualizaTask(task.id);
    })

    const btnDeletar = document.createElement("button");
    btnDeletar.innerText = "Deletar";
    btnDeletar.className = "btn btn-danger mx-3";
    btnDeletar.addEventListener("click", () => {
        deletaTask(task.id);
    })

    actionSection.appendChild(btnEditar);
    actionSection.appendChild(btnDeletar);

    const nameHeader = document.createElement("h3");
    nameHeader.innerHTML = task.name;

    const valueText = document.createElement("p");
    valueText.innerHTML = task.value;

    infoSection.appendChild(nameHeader);
    infoSection.appendChild(valueText);

    base.appendChild(infoSection);
    base.appendChild(actionSection);

    elementPai.appendChild(base);

}

function atualizaTask(taskId) {
    selectedTask = taskId;
    const index = currentTasks.findIndex(task => task.id === taskId);

    document.getElementById("taskName").value = currentTasks[index].name;
    document.getElementById("taskValue").value = currentTasks[index].value;

}

function deletaTask(taskId) {
    const index = currentTasks.findIndex(task => task.id === taskId);
    currentTasks.splice(index, 1);
    atualizaLocalStorageTasks(currentTasks);
    renderizaTasks();
}

function atualizaLocalStorageTasks(newValue) {
    localStorage.setItem("tasks", JSON.stringify(newValue));
}