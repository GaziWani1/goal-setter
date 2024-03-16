/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux'
import { deleteGoal, updateGoal } from '../features/goal/goalSlice'
import { useState } from 'react'
import { FaPenAlt } from 'react-icons/fa'

function GoalItem({ goal }) {

    const [edit, setEdit] = useState(false)
    const [text, setText] = useState(goal.text)

    const dispatch = useDispatch()

    const handleEdit = () => {
        setEdit(!edit)
    }

    const update = () => {
        dispatch(updateGoal({ id: goal._id, text }))
    }

    return (
        <div className='goal'>
            <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
            <div className='form-group'>
                <input
                    type='text'
                    value={text}
                    readOnly={!edit ? 'readyOnly' : ''}
                    onChange={(e) => setText(e.target.value)}
                    className={`${!edit ? 'not-update' : 'update'} `}
                />
            </div>

            {
                !edit ? ' ' : <button onClick={update} className='btn-block btn'>
                    update
                </button>
            }
            {/* <h2>{goal.text}</h2> */}
            <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
                X
            </button>

            <button onClick={handleEdit} className='edit'>
                <FaPenAlt />
            </button>
        </div>
    )
}

export default GoalItem