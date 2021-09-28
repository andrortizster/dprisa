
const ProductRow = (props) =>{
    return(        
        <tr>
        <td>{props.item.id}</td>
        <td>{props.item.name}</td>
        <td>{props.item.price}</td>
        <td>{props.item.um_name}</td>
        <td> </td>
        </tr>
    );
}

export default ProductRow;