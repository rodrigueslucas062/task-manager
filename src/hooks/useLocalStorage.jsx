import { useState } from 'react';

export function useLocalStorage(string) {
  const [tasks, setTasks] = useState([])

  const newTasks = {
    id: crypto.randomUUID(),
    content: string,
  }
  const tasksArray = [newTasks, ...tasks]
  setTasks(tasksArray)
  localStorage.setItem('tasks', JSON.stringify(tasksArray))

  // useEffect(() => {
  //   const tasksOnStorage = localStorage.getItem('taks')
  //   if (tasksOnStorage) {
  //     setTasks(JSON.parse(tasksOnStorage))
  //   }
  // }, [])
}