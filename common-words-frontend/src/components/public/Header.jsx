import StyledLink from '../common/StyledLink';

const Header = () => {
	return (
		<header> 
			<div className="topnav">
				<div className="title">Common Words</div>
				<div className="top-nav-button-container">
					<span>     </span>
					<StyledLink styleClass="top-nav-button" destination="/">{"About"}</StyledLink>
					<span>  </span>
					<StyledLink styleClass="top-nav-button" destination="/Read">{"Read"}</StyledLink>
					<span>  </span>
					<StyledLink styleClass="top-nav-button" destination="/Study">{"Study"}</StyledLink>
				</div>
			</div> 
		</header>
	);
};

export default Header;
