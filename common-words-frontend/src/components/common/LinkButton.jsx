import { Link } from "react-router-dom";


const LinkButton = ({linkPath, type, text}) => {
    return (
        <Link to={linkPath}>
            <button type={type}>{text}</button>
        </Link>
    );
}

export default LinkButton;