import React from 'react';

class Modal extends React.Component
{
	hasShown = false;

	constructor(props)
	{
		super(props)
		this.hide = this.hide.bind(this);
	}

	hide()
	{
		let element = document.getElementById("modal-holder");
		element.style.display = "none";
		this.hasShown = true;
	}

	render()
	{
		if (!this.hasShown)
		{
			return( 
				<div id="modal-holder" className="modal-background"  onClick={ this.hide }>
					<div className="modal-holder">
						<label className="modal-header">
							Add or Share!
						</label>
						<div className="extension-button base-modal-button">
							<a href="https://chrome.google.com/webstore/detail/image-resizer-online/hfinnicagfidbecbocafipohnaaljknn" className="bookmark-label" target="_blank" rel="noopener noreferrer">
								ImageResizer.Online Chrome Extension
							</a>
						</div>
						<div className="social-holder">
							<div className="fb-holder">
								<div className="fb-share-button" data-href="https://imageresizer.online" data-layout="button" data-size="large" data-mobile-iframe="true"><a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fimageresizer.online%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore">Share</a></div>
							</div>
							<a href="https://twitter.com/intent/tweet?text=Just used https://imageresizer.online to resize my images quickly&hashtags=graphicdesign,imageresizeronline" className="twitter-button">Tweet</a>
						</div>
						<div className="close-modal" onClick={ this.hide }>
							Close
						</div>
					</div>
				</div>
			)
		}

		return false;
	}
}

export default Modal;