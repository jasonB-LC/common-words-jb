import StyledLink from '../common/StyledLink';

const Header = () => {
	return (
		<header> 
			<div className="topnav">
				<div className="title">Common Words</div>
				<div>
					<StyledLink destination="/">{"Home"}</StyledLink>
					<StyledLink destination="/Read">{"Read"}</StyledLink>
					<StyledLink destination="/Study">{"Study"}</StyledLink>
				</div>
			</div> 
		</header>
	);
};

export default Header;
