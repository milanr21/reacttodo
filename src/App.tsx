import React, { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { todoActions } from "./features/Todos/store";
import { useSelector } from "react-redux";
import { saveToLocalStorage } from "./utils/localStorage";

interface ToDoProps {
  text: string;
  completed: boolean;
  id: number;
}

interface ToDoStateProps {
  todos: ToDoProps[];
  loading: boolean;
  success: boolean;
}

interface RootState {
  getTodos: ToDoStateProps;
}

function App() {
  const dispatch = useDispatch();
  const [newToDo, setNewToDo] = useState("");

  const {
    todos: todosResponse,
    loading: isToDoLoading,
    success: isToDoSuccess,
  } = useSelector((state: RootState) => state.getTodos);

  console.log("The get response is", todosResponse);

  useEffect(() => {
    if (isToDoSuccess) {
      setNewToDo("");
    }
  }, [isToDoSuccess]);

  const handleNewTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newToDo.trim()) return;
    dispatch(
      todoActions.add_todos({
        text: newToDo,
        completed: false,
        id: Date.now(),
      })
    );
  };

  if (isToDoLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <form onSubmit={handleNewTodo}>
        <label>Input Value</label>
        <input
          type="text"
          value={newToDo}
          onChange={(e) => setNewToDo(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>

      <div>
        {todosResponse?.map((item: ToDoProps) => (
          <React.Fragment key={item.id}>
            <h3>{item.text}</h3>
            {/* <button
              onClick={() => dispatch(todoActions.toggle_completed(item.id))}
            >
              {item.completed ? "Completed" : "Uncompleted"}
            </button>
            <button onClick={() => dispatch(todoActions.delete_todo(item.id))}>
              Delete
            </button> */}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default App;
