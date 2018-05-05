import React from 'react';

function About(props) 
{
	return <div className="container about-col">
		<div>
			<h2>About</h2>
			<p> 
				Image Resizer Online was created for a simple reason, to make resizing images online as simple, secure and fast as possible. Image Resizer Online does all the image resizing in the browser which means that your images stay on your computer at all times, they never get sent to a server to be processed like many other services.
			</p>
			<p>
				Image Resizer Online is activeley being worked on to improve functionality and user experience. We want to make image resizing and conversion as fast and as simple as possible.
			</p>
		</div>
		
		<div>
			<h2>Why use Image Resizer Online</h2>
			<ul>
				<li>Pixel or percentage based image resizing</li>
				<li>Image Resizer Online can convert images to JPG, PNG, GIF, TIFF and WebP(Chrome only)</li>
				<li>Image Resizer Online can compress JPG and WebP images.</li>
				<li>Very fast. Because Image Resizer Online runs in your browser, it is extremely fast.</li>
				<li>Batch image processing. Image Resizer Online can batch process images which means that you can select multiple images and process them altogether.</li>
			</ul>
		</div>
	</div>;
}

export default About;