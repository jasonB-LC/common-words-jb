import StyledLink from '../common/StyledLink';

const NavBar = () => {
	return (
        <div className="topnav">
            <StyledLink destination="/">{"Home"}</StyledLink>
            <StyledLink destination="/Read">{"Read"}</StyledLink>
            <StyledLink destination="/Study">{"Study"}</StyledLink>
        </div> 

	);
};

export default NavBar;
