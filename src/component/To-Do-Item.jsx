const ToDoItem = ({ data, ondelete, ontoggel, onUpdate }) => {
  return (
    <div className="todo-item">
      <div className="todo-info">
        <span
          className={`todo-status ${data.check ? "complete" : "pending"}`}
          onClick={() => ontoggel(data.id)}
        >
          {data.check ? "Completed" : "Pending"}
        </span>

        <h3>{data.title}</h3>
        <p>{data.des}</p>
      </div>

      <div className="todo-actions">
        <button
          className="edit-btn"
          onClick={() => {
            onUpdate(data.id);
          }}
        >
          Edit
        </button>
        <button className="delete-btn" onClick={() => ondelete(data.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ToDoItem;
