import React from 'react';

function Header(props) 
{
	return <div className="container header-container">
		<div className="header">
			<div className="header-item">
				Image Resizer Online
			</div>
			<div className="header-item">
				<a href="https://medium.com/@imageresizeronline">Blog</a>
			</div>
			<div className="header-item">
				<a href="https://chrome.google.com/webstore/detail/image-resizer-online/hfinnicagfidbecbocafipohnaaljknn">Chrome Extension</a>
			</div>
			<div className="header-item">
				<iframe
					src="https://platform.twitter.com/widgets/tweet_button.html?size=l&url=https%3A%2F%2Fimageresizer.online%2Fweb%2Ftweet-button&related=twitterapi%2Ctwitter&text=Checkout%20Image%20Resizer%20Online&hashtags=graphicdesign%2Cwebdesign"
					className="twitter-share pull-right"
					scrolling="no"
					title="Twitter Tweet Button">
				</iframe>
			</div>
		</div>
	</div>;
}

export default Header;