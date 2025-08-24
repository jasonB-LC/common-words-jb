import { Link } from "react-router-dom";


const LinkButton = ({linkPath, type, text, styleClass}) => {
    return (
        <Link to={linkPath}>
            <button className={styleClass} type={type}>{text}</button>
        </Link>
    );
}

export default LinkButton;