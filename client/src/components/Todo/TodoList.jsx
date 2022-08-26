
import { faCheck, faCross, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import "./style.css";

const TodoList = () => {
  const initialList = [
    {
      id: "d3ba288d-12a0-4c4a-9679-072d511dd8fd",
      task: "Take Bath",
      isdone: false
    },

    {
      id: "d3ba288d-12a0-4c4a-9679-072d511dd8te",
      task: "BreakFast",
      isdone: false
    }
  ];
  const [newTask, setNewTask] = useState("");
  const [formShow, setFormShow] = useState(false);
  const [myList, setMyList] = useState(initialList);

  // add new task
  const handleAddTask = (e) => {
    e.preventDefault();
    console.log(newTask);
    let newData = {
      id: uuid(),
      task: newTask,
      isdone: false
    };
    setMyList((prevState) => [...prevState, newData]);
    setFormShow(false);
  };

  // check mylist update
  useEffect(() => {
    console.log("new task change", myList);
  }, [myList]);

  // update task in my list
  const handleTaskDone = (e, id) => {
    e.preventDefault();
    myList.filter((item) => {
      if (item.id === id) {
        if (item.isdone !== true) {
          item.isdone = true;
        } else {
          item.isdone = false;
        }
      }
    });
    setMyList((prev) => [...prev]);
  };
  return (
    <div className="container">
      <div className="headerTodo">
        <h2>My To-do List</h2>
        <button onClick={() => setFormShow(true)} className="btn btn-primary">
          Add New
        </button>
      </div>

      {/* add list form */}
      {formShow ? (
        <div className="mt-4">
          <h2>Add New Task</h2>
          <div className="tFrm">
            <input
              type="text"
              placeholder="new to-do"
              className="form-control mx-3"
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button className="btn btn-success" onClick={handleAddTask}>
              Add
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* show to-do list */}
      {myList.length ? (
        myList.map((item) => (
          <div className="todoList mt-5" key={item.id}>
            <h2 className={item.isdone ? "taskDone" : "notD"}>{item.task}</h2>
            <button
              className={item.isdone ? "btn btn-success" : "btn btn-danger"}
              onClick={(e) => handleTaskDone(e, item.id)}
            >
              {item.isdone ? (
                <FontAwesomeIcon icon={faCheck} />
              ) : (
                <FontAwesomeIcon icon={faXmark} />
              )}
            </button>
          </div>
        ))
      ) : (
        <div className="mt-5">There is no list yet (:</div>
      )}
    </div>
  );
};
export default TodoList;
