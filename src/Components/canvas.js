import React from 'react';
import ImageFormat from '../Enums/FormatEnum';
import ReactGA from 'react-ga';

class Canvas extends React.Component
{
	constructor(props)
	{
		super(props);
		this.images = {};
		this.settings = {};
		this.process = this.process.bind(this);
		this.getDownloadButton = this.getDownloadButton.bind(this);
		this.reset = this.reset.bind(this);
		this.processing = this.processing.bind(this);
	}

	componentDidUpdate()
	{
		this.images = this.props.images;
		this.settings = this.props.settings;

		let hasKeys = Object.keys(this.settings).length > 0 ? true : false;

		if (hasKeys) {
			this.process();
		}

		ReactGA.event({
			category: 'FileCount',
			action: '',
			value: this.images.length,
			label: "file count"
		});
	}

	getDownloadButton(e)
	{
		this.downloadButton = e;
	}

	reset()
	{
		this.props.reset();
	}
	
	process()
	{
		let self = this;
		let index = 0;
		this.images.forEach(function(fileStruct) {
			let reader = new FileReader();
			reader.onload = (readerObject) => {
				let cvs2 = document.getElementById('resizerCanvas');
				let context = cvs2.getContext('2d');
				let image64 = new Image();
				image64.onload = () => {
					let imageSize = self.calculateImageSize(self.settings, image64);
					image64.width = imageSize.imageWidth;
					image64.height = imageSize.imageHeight;
					cvs2.width = imageSize.imageWidth;
					cvs2.height = imageSize.imageHeight;

					let outputFormat = ImageFormat.formatForIndex(self.settings.outputFormat);
					let quality = self.settings.quality / 100;

					self.applyRotation(self.settings.rotation, cvs2, context, image64)
					self.applyNewSize(imageSize, context, image64);

					let fileName = fileStruct.fileName;

					if (self.settings.outputName !== "") {
						fileName = self.settings.outputName;
					}

					cvs2.toBlob(function (blob) {
						let newFileName = fileName.split(".");
						newFileName[newFileName.length - 1] = ImageFormat.extensionForFormat(outputFormat);
						newFileName = newFileName.join(".");

						self.downloadButton.target = "_blank";
						self.downloadButton.download = newFileName;
						self.downloadButton.href = window.URL.createObjectURL(blob);
						self.downloadButton.click();
						index++;
						self.processing(index);

						ReactGA.event({
							category: 'Resizing',
							value: "resize",
							label: "resize images",
							action: ''
						});

						ReactGA.event({
							category: 'OutputType',
							value: self.settings.outputFormat,
							label: "output type",
							action: ''
						});

						ReactGA.event({
							category: 'Rotation',
							value: self.settings.rotation,
							label: "rotation type",
							action: ''
						});

						ReactGA.event({
							category: 'UsingOutputFileName',
							value: self.settings.outputName,
							label: "UsingOutputFileName",
							action: ''
						});

						ReactGA.event({
							category: 'Width',
							value: self.settings.width,
							label: "Width",
							action: ''
						});

						ReactGA.event({
							category: 'Height',
							value: self.settings.height,
							label: "Height",
							action: ''
						});

						ReactGA.event({
							category: 'UsingPercentage',
							value: self.settings.usePercentage,
							label: "UsingPercentage",
							action: ''
						});
					}, outputFormat, quality);
				}
				image64.src = readerObject.target.result;
			};
			reader.readAsDataURL(fileStruct.file);
		});
	}

	processing(currentIndex) 
	{
		if (currentIndex === this.images.length) 
		{
			if (document.cookie.indexOf("username=shown") === -1)
			{
				let prompt = document.getElementById("modal-holder")
				
				if (prompt !== null && prompt !== undefined)
				{
					prompt.style.display = "block"
				}
			}
			
			this.reset()
			this.markShareAsShown()
		}
	}

	markShareAsShown()
	{
		document.cookie = "username=shown; expires=Mon, 30 Dec 2030 12:00:00 UTC;"
		console.log("set cookie")
	}

	calculateImageSize(settings, image)
	{
		if (settings.percentage === 0)
		{
			return this.calculatePercentage(settings, image);
		}
		else 
		{
			return this.calculateSizeForPercentage(settings.percentage, image);
		}
	}

	calculateSizeForPercentage(percentage, image)
	{
		let newImageWidth = image.width * (percentage / 100);
		let newImageHeight = image.height * (percentage / 100);

		return {imageWidth: newImageWidth, imageHeight: newImageHeight};
	}

	calculatePercentage(settings, image) 
	{
		let imageWidth = image.width;
		let imageHeight = image.height;
		let imageRatio = 0;
		let settingsWidth = settings.width;
		let settingsHeight = settings.height;

		if (settings.width === 0) 
		{
			imageRatio = settings.height / imageHeight;
			settingsWidth = imageRatio < 1 ? imageWidth * imageRatio : imageWidth / imageRatio;
		}
		else if (settings.height === 0)
		{
			imageRatio = settings.width / imageWidth;
			settingsHeight = imageRatio < 1 ? imageHeight * imageRatio : imageHeight / imageRatio;
		}

		let imageSize = {imageWidth: settingsWidth, imageHeight: settingsHeight};

		if (imageSize.imageWidth === 0) {
			imageSize.imageWidth = image.width;
		}

		if (imageSize.imageHeight === 0) {
			imageSize.imageHeight = image.height;
		}

		return imageSize;
	}

	applyNewSize(imageSize, context, image) 
	{
		context.drawImage(image, 0, 0, imageSize.imageWidth, imageSize.imageHeight);
	}

	applyRotation(rotation, canvas, context, image)
	{
		context.clearRect(0, 0, canvas.width, canvas.height);
	
		switch(rotation)
		{
			case "90":
				canvas.width = image.height;
				canvas.height = image.width;
				context.rotate(90 * Math.PI / 180);
				context.drawImage(image, 0, -image.height, image.width, image.height);
				break;
			case "180":
				canvas.width = image.width;
				canvas.height = image.height;
				context.rotate(180 * Math.PI / 180);
				context.drawImage(image, -image.width, -image.height, image.width, image.height);
				break;
			case "270":
				canvas.width = image.height;
				canvas.height = image.width;
				context.rotate(270 * Math.PI / 180);
				context.drawImage(image, -image.width, 0, image.width, image.height);
				break;
			default: 
				break;
		}
	}

	render()
	{
		return(
			<div className="canvas-holder">
				<canvas id="resizerCanvas"></canvas>
				<a href="" ref={ this.getDownloadButton } target="_blank" download="testFile"></a>
			</div>
		);
	}
}

export default Canvas;