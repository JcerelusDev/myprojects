/* eslint-disable */

const List = (props) => {

    return (
        <div className="lists">
            <p className="list">{props.taskName.toUpperCase()}
                <button className="delete " onClick={() => props.deleteTask(props.id)}>X</button>
                <button className="update " onClick={() => props.editTask(props.id)}>&#9998;</button>

            </p>

        </div>
    )
}

export default List