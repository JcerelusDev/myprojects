/* eslint-disable react/prop-types */

const ClearTask = (props) => {
    return (
        <>
            <button className='clearTask-btn'
                onClick={props.clearAll}>Clear Tasks</button>
        </>
    )
}

export default ClearTask