import {faEdit,faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const DepartmentsRow = (props) =>{
    return(        
        <tr key={props.item.id}>
        <td>{props.item.id}</td>
        <td>{props.item.name}</td>
        <td>
            <FontAwesomeIcon icon={faEdit}  color="green" title="Editar" cursor="hand" onClick={() => props.handleEdit(props.item)} />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <FontAwesomeIcon icon={faTrash} color="red" title="Borrar" />
        </td>
        </tr>
    );
}

export default DepartmentsRow;