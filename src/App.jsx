import { useEffect, useState } from "react";
import "./App.css";
import Header from "./component/Header";
import ToDoList from "./component/To-Do-List";

function App() {
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterTask, setFiltertask] = useState("all");
  const [task, setTask] = useState(()=>{
    const savaData  = localStorage.getItem('task');
    return savaData?  JSON.parse(savaData) : []
  });

  

  console.log(filterTask);

  function AddData(e) {
    e.preventDefault();

    if (!title.trim() || !des.trim()) {
      alert("Please add value");
      return;
    }

    if (editId !== null) {
      const updatedTasks = task.map((item) => {
        return item.id === editId ? { ...item, title: title, des: des } : item;
      });

      setTask(updatedTasks);
      setEditId(null);
    } else {
      let all = {
        id: task.length + 1,
        title: title,
        des: des,
        check: false,
      };

      setTask([...task, all]);
    }

    setTitle("");
    setDes("");
  }
  function deleteItem(id) {
    const deletetask = task.filter((item) => {
      return item.id !== id;
    });

    setTask(deletetask);
  }
  function toggelComplete(id) {
    const updataComplete = task.map((item) => {
      return item.id === id ? { ...item, check: !item.check } : item;
    });

    setTask(updataComplete);
  }
  function updateValue(id) {
    const updataInput = task.find((item) => item.id === id);

    setTitle(updataInput.title);
    setDes(updataInput.des);
    setEditId(id);
  }

  const targetsearch = task.filter((item) => {
    return item.title.toLowerCase().includes(search.toLowerCase());
  });


  useEffect(()=>{
    localStorage.setItem('task',JSON.stringify(task))
  },[task])

  return (
    <>
      <Header />

      <form className="form-search">
        <input
          type="text"
          placeholder="Search ...."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </form>
      <form className="add-task-form" onSubmit={AddData}>
        <div className="form-header">
          <div>
            <h2>Add New Task</h2>
            <p>What do you want to accomplish?</p>
          </div>
          <span className="form-icon">+</span>
        </div>

        <div className="form-group">
          <label htmlFor="task-title">Task Title</label>
          <input
            type="text"
            id="task-title"
            placeholder="e.g. Complete React Project"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-details">Task Details</label>
          <textarea
            id="task-details"
            placeholder="Write some details about your task..."
            rows="4"
            onChange={(e) => setDes(e.target.value)}
            value={des}
          />
        </div>

        <button className="add-task-btn">+ Add Task</button>
      </form>

      <ToDoList
        data={!search ? task : targetsearch}
        ondelete={deleteItem}
        ontoggel={toggelComplete}
        onUpdate={updateValue}
        filterFirst={filterTask}
        filterupdtae={setFiltertask}
      />
    </>
  );
}

export default App;
