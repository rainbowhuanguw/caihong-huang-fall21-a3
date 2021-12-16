import { useNavigate } from "react-router-dom"
import { APIs } from "../apis/frontend";
import '../Button.css';

export default function DeleteButton(props) {
    const id = props.id;
    const navigate = useNavigate();
    const deletePageLink = APIs.deleteJob + id;

    return <button onClick={() => {
            console.log(deletePageLink);
            navigate(deletePageLink)
        }} class='button'> Delete
    </button>
}