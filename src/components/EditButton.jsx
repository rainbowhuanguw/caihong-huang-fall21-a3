import { useNavigate } from "react-router-dom";
import { APIs } from "../apis/frontend";
import "../Button.css";

export default function EditButton(props) {
    
    const id = props.id;
    const nevigate = useNavigate();
    const editPageLink = APIs.editJob + id;

    return <button onClick={() => {
        nevigate(editPageLink);
    }} class="button">Edit</button>
    
}