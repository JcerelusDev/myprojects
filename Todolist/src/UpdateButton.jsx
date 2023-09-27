/* eslint-disable react/prop-types */

const UpdateButton = (props) => {
    return (
        <>
            <button ref={props.updateBtnRef} className='updateTask-btn'
                onClick={props.handleUpdate}>Update Task</button>
        </>
    )
}

export default UpdateButton