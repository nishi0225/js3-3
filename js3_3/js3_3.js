'use strict'
//入力値,追加Button,表示場所を取得
const input = document.getElementById('inputValue');
const addTaskButton = document.getElementById('addTaskButton');
const addTaskTarget = document.getElementById('addTaskTarget');

//入力値を格納する配列を作成
const taskList = [];
//追加Buttonクリック時の処理
addTaskButton.addEventListener('click', () => {
  const todos = {
    id: taskList.length,
    task: input.value,
    status: '作業中'
  }
  taskList.push(todos);
  addShowTask()
})

//入力されたtaskを追加し表示する関数
const addShowTask = () => {
  //表示箇所を初期化
  addTaskTarget.textContent = '';

  //オブジェクトに追加されたtask,idを順に表示
  taskList.forEach((todos, index) => {
    //taskを追加する行を作成
    const newTr = document.createElement('tr');
    addTaskTarget.appendChild(newTr);
    //tr要素へ追加するtdを作成
    const tdTaskElement = document.createElement('td');
    const tdIdElement = document.createElement('td');
    const tdStatusButton = document.createElement('td');
    const tdDeleteButton = document.createElement('td');

    //id.taskを作成
    tdIdElement.textContent = index;
    tdTaskElement.textContent = todos.task;
    //td要素へButtonを追加
    tdStatusButton.appendChild(createStatusButton());
    tdDeleteButton.appendChild(createDeleteButton(index));
    //td要素をtr要素へ追加
    addTaskTarget.appendChild(tdIdElement);
    addTaskTarget.appendChild(tdTaskElement);
    addTaskTarget.appendChild(tdStatusButton);
    addTaskTarget.appendChild(tdDeleteButton);

    input.value = '';
    input.focus();
  });
}
//状態Buttonを作成する関数
const createStatusButton = () => {
  const statusButton = document.createElement('button');
  statusButton.textContent = '作業中';
  statusButton.addEventListener('click', () => {
    if (statusButton.textContent === '作業中') {
      statusButton.textContent = '完了';
    } else if (statusButton.textContent === '完了') {
      statusButton.textContent = '作業中';
    }
  })
  return statusButton;
}
//削除Buttonを作成する関数
const createDeleteButton = (index) => {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '削除'; 

  deleteButton.addEventListener('click', () => {
    taskList.splice(index, 1);
    for (let i = index; i < taskList.length; i++) {
      taskList[i].id = i;
    }
    addShowTask();
  })
  return deleteButton;
}
