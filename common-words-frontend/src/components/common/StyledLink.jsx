import {Link} from 'react-router';

const StyledLink = ({children, styleClass, destination}) => {
    return (
        <Link className={styleClass} to={destination}>
            <span className='link'>{children}</span>
        </Link>
    )
}

export default StyledLink;

