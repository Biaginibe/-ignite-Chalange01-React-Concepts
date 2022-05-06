import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(newTaskTitle !== '' && newTaskTitle !== null){
      // Gerando o ID aleatório
      let id = Math.floor(Math.random() * (50 - 0 + 1)) + 0;
      
      // Incluindo a nova tarefa na lista
      let listOfTasks = tasks
      listOfTasks.push({
        id: id,
        title: newTaskTitle,
        isComplete: false
      })
      setTasks(listOfTasks)
      console.log(tasks)
      
      // Limpando o campo onde foi informado o título da tarefa adicionada
      setNewTaskTitle('')
    }else{
      window.alert('Informe o título da tarefa para adiciona-la.')
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    
    // Função que faz o update
    let result = tasks.map((elem) => {
      if(elem.id === id) {
        elem.isComplete = !elem.isComplete;
      }
      return elem;
    })

    // Setando o novo array
    setTasks(result);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    // Função que devolve um array sem o item do ID selecionado para a remoção
    let filter = tasks.filter((elem) => {
      return elem.id !== id;
    })
    // Setando o estado para nosso novo array
    setTasks(filter);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}