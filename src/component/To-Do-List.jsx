import ToDoItem from "./To-Do-Item";

const ToDoList = ({
  data,
  ondelete,
  ontoggel,
  onUpdate,
  filterFirst,
  filterupdtae,
}) => {
  const CountAllTasks = data.length;
  const CountCompleteTask = data.filter((item) => item.check === true).length;
  const CountPendingTask = data.filter((item) => !item.check).length;

  const completed = data.filter((item) => item.check === true);
  const pending = data.filter((item) => item.check === false);
  let filterresult;
  if (filterFirst === "pending") {
    filterresult = pending;
  } else if (filterFirst === "completed") {
    filterresult = completed;
  } else {
    filterresult = data;
  }



  return (
    <>
      <div className="stat-card">
        <span>Total Tasks </span>
        <h2>{CountAllTasks}</h2>
      </div>

      <section className="todo-app">
        <div className="stats">
          <div className="stat-card completed">
            <span>Completed</span>
            <h2>{CountCompleteTask}</h2>
          </div>
          <div className="stat-card pending">
            <span>Pending</span>
            <h2>{CountPendingTask}</h2>
          </div>
        </div>

        <div className="tasks-header">
          <div>
            <h2>My Tasks</h2>
            <p>Your daily activities</p>
          </div>
          <span className="task-count">{CountAllTasks} Tasks</span>
        </div>
      </section>
      <section className="filter">
        <button className="btn" onClick={() => filterupdtae("all")}>
          All{" "}
        </button>
        <button className="btn" onClick={() => filterupdtae("completed")}>
          Completed{" "}
        </button>
        <button className="btn" onClick={() => filterupdtae("pending")}>
          Pending{" "}
        </button>
      </section>
      {filterresult.map((data) => {
        return (
          <ToDoItem
            data={data}
            key={data.id}
            ondelete={ondelete}
            ontoggel={ontoggel}
            onUpdate={onUpdate}
          />
        );
      })}
    </>
  );
};

export default ToDoList;
