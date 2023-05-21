import React, { useState } from 'react'
import DoneIcon from '../assets/done-icon.svg'
import EditIcon from '../assets/edit-icon.svg'
import DeleteIcon from '../assets/delete-icon.svg'
import PropTypes from 'prop-types';
import { doneList, editList, removeList } from '../redux/action/todoAction'
import { useDispatch } from 'react-redux'

const List = (props) => {

    // toggle pop up untuk edit list
    const [isEditPopUp, setEditPopUp] = useState(false);

    const toggleEdit = () => {
        setEditPopUp(!isEditPopUp)
    }

    // memanggil action done, remove, dan edit list dari redux
    const dispatch = useDispatch();

    const handleDone = (index) => {
        dispatch(doneList(index))
    }

    const handleRemove = (index) => {
        dispatch(removeList(index))
    }

    const handleEdit = (index, input) => {
        dispatch(editList(index, input.target[0].value))
        input.preventDefault()
        input.target[0].value = null
        toggleEdit()
    }

    return ( <
        >

        <
        div className = 'list-container' >
        <
        div className = 'left-list' > {
            props.button &&
            <
            img src = { DoneIcon }
            alt = ""
            onClick = {
                () => handleDone(props.urutan) }
            />
        } <
        p > { props.value } < /p> <
        /div>

        {
            props.button &&
                <
                div className = 'right-list' >
                <
                img src = { EditIcon }
            alt = ""
            onClick = {
                () => toggleEdit(props.urutan) }
            /> <
            img src = { DeleteIcon }
            alt = ""
            onClick = {
                () => handleRemove(props.urutan) }
            /> <
            /div>
        }

        <
        /div>

        { /* pop up edit */ } {
            isEditPopUp &&
                <
                div className = 'edit-popup' >
                <
                form action = ""
            onSubmit = {
                    (e) => handleEdit(props.urutan, e) } >
                <
                label htmlFor = "" > Edit Task < /label> <
                input type = "text"
            placeholder = { props.value }
            /> <
            div className = 'button' >
                <
                p onClick = {
                    () => toggleEdit(props.urutan) } > Batalkan Edit < /p> <
                button type = 'submit' > Edit To Do < /button> <
                /div> <
                /form> <
                /div>
        }

        { /* overlay dari pop up */ } {
            isEditPopUp &&
                <
                div className = 'overlay' > < /div>
        } <
        />
    )
}

// Cek tipe data prop dengan prop types
List.propTypes = {
    button: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    urutan: PropTypes.number.isRequired
}

export default List