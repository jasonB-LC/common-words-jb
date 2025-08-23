import StyledLink from '../common/StyledLink';

const ReaderNavBar = () => {
	return (
        <div className="topnav">
            <StyledLink destination="/">{"Home"}</StyledLink>
            <StyledLink destination="/Read">{"Read"}</StyledLink>
            <StyledLink destination="/Study">{"Study"}</StyledLink>
        </div> 

	);
};

export default ReaderNavBar;
