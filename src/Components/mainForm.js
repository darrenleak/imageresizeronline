import React from 'react';
import Header from './header';
import About from './about';
import ImageInput from './imageInput';
import SelectedFiles from './selectedFiles';
import SettingsInput from './settingsInput';
import Canvas from './canvas';
import '../css/main.css';
import '../css/icons.css';
import ReactGA from 'react-ga';

class MainForm extends React.Component
{
	constructor(props) 
	{
		super(props);
		this.state = {
			settings: {},
			images: []
		}

		this.imageUploadOnChange = this.imageUploadOnChange.bind(this);
		this.removeImages = this.removeImages.bind(this);
		this.handleSettings = this.handleSettings.bind(this);
		this.deleteFile = this.deleteFile.bind(this);

		ReactGA.initialize('UA-98784571-1');
		ReactGA.pageview(window.location.pathname + window.location.search);
	}

	imageUploadOnChange(event)
	{
		let files = event.target.files;
		let fileArray = this.state.images;

		for (let key in files)
		{
			let file = files[key]

			if (file.name !== undefined && typeof file === "object") 
			{
				let fileStruct = {
					fileName: file.name,
					file: file
				}
				fileArray.push(fileStruct);
			}
		}
		
		this.setState({
			images: fileArray
		});
	}

	removeImages()
	{
		this.setState({
			images: []
		});
	}

	handleSettings(settings)
	{
		this.setState({
			settings: settings
		});
	}

	deleteFile(index) 
	{
		let newImages = this.state.images;
		newImages.splice(index, 1);

		this.setState({
			images: newImages
		});
	}

	render()
	{
		return (
			<div className="component-holder">
				<Header />
				<ImageInput imageUploadOnChange={ this.imageUploadOnChange }/>
				<SelectedFiles className="container" files={ this.state.images } deleteFile={ this.deleteFile }/>
				<SettingsInput className="container" handleSettings={ this.handleSettings }/>
				<Canvas settings={ this.state.settings } images={ this.state.images }/>
				<About />
			</div>
		);
	}
}

export default MainForm;