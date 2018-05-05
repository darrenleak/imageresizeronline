import React from 'react';
import FormatEnum from '../Enums/FormatEnum';

class SettingsInput extends React.Component
{
	constructor(props) 
	{
		super(props);
		this.state = {
			width: 0,
			height: 0,
			usePercentage: "false",
			percentage: 0,
			rotation: 0,
			outputName: "",
			outputFormat: "JPG",
			quality: 80,
			downloadAutomatically: true
		}

		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleDownloadAutomaticallyClicked = this.handleDownloadAutomaticallyClicked.bind(this);
		this.handleResize = this.handleResize.bind(this);
	}

	handleOnChange(event) 
	{
		let eventChange = { [event.target.name] : event.target.value };
		this.setState(eventChange);
	}

	handleDownloadAutomaticallyClicked() 
	{
		this.setState((prevState, props) => ({
			downloadAutomatically: !prevState.downloadAutomatically
		}));
	}

	handleResize() 
	{
		this.props.handleSettings(this.state);
	}

	render()
	{
		return <div className="container-width">
			<div className="container">
				<div className="settingsSection">
					<h2>
						Resize
					</h2>
					<div className="radio-group">
						<div className="base-flex input-label">
							Width
						</div>
						<input type="text"
										className="base-flex" 
										value={ this.state.width === 0 ? "" : this.state.width } 
										name="width" 
										placeholder="Width" 
										onChange={ this.handleOnChange }/><br/>
						<div className="base-flex input-label">
							Height
						</div>
						<input type="text" 
										className="base-flex" 
										value={ this.state.height === 0 ? "" : this.state.height } 
										name="height" 
										placeholder="Height" 
										onChange={ this.handleOnChange }/><br/>
						<button className={this.state.usePercentage === "false" ? "highlighted-button base-button radio-button" : "grey-button base-button radio-button"} 
										name="usePercentage" 
										onClick={ this.handleOnChange } 
										value="false">
							Use Size
						</button>
						<button className={this.state.usePercentage === "true" ? "highlighted-button base-button radio-button" : "grey-button base-button radio-button"} 
										name="usePercentage" 
										onClick={ this.handleOnChange } 
										value="true">
							Use Percentage
						</button>
						<input type="text" placeholder="Percentage"  name="percentage" onChange={ this.handleOnChange }/>
					</div>
				</div>
				<div className="settingsSection">
					<h2>
						Rotation
					</h2>
					<div className="radio-group">
						<button className={this.state.rotation === 0 ? "highlighted-button base-button radio-button" : "grey-button base-button radio-button"}
										name="rotation" 
										onClick={ this.handleOnChange } 
										value="0">
							No rotation
						</button>
						<button className={this.state.rotation === 90 ? "highlighted-button base-button radio-button" : "grey-button base-button radio-button"}
										 name="rotation" 
										 onClick={ this.handleOnChange } 
										 value="90">
							90 CW
						</button>
						<button className={this.state.rotation === 180 ? "highlighted-button base-button radio-button" : "grey-button base-button radio-button"} 
										name="rotation" 
										onClick={ this.handleOnChange } 
										value="180">
							180
						</button>
						<button className={this.state.rotation === 270 ? "highlighted-button base-button radio-button" : "grey-button base-button radio-button"} 
										name="rotation" 
										onClick={ this.handleOnChange } 
										value="270">
							90 CCW
						</button>
					</div>
				</div>
				<div className="settingsSection">
					<h2>
						Output
					</h2>
					<div className="simple-flex margin-bottom-15">
						<div className="base-flex input-label">
							Output Name
						</div>
						<input type="text" className="base-flex" placeholder="Output Name" name="outputName" onChange={ this.handleOnChange }/><br/>
						<div className="base-flex input-label">
							File Type
						</div>
					</div>
					<div className="radio-group-row">
						<button className={this.state.outputFormat === "JPG" ? "highlighted-button base-button file-output-buttons radio-button" : "grey-button base-button file-output-buttons radio-button"}
										name="outputFormat" 
										onClick={ this.handleOnChange } 
										value="JPG">
							JPG
						</button>
						<button className={this.state.outputFormat === "PNG" ? "highlighted-button base-button file-output-buttons radio-button" : "grey-button base-button file-output-buttons radio-button"}
										name="outputFormat" 
										onClick={ this.handleOnChange } 
										value="PNG">
							PNG
						</button>
						<button className={this.state.outputFormat === "GIF" ? "highlighted-button base-button file-output-buttons radio-button" : "grey-button base-button file-output-buttons radio-button"}
										name="outputFormat" 
										onClick={ this.handleOnChange } 
										value="GIF">
							GIF
						</button>
						<button className={this.state.outputFormat === "WebP" ? "highlighted-button base-button file-output-buttons radio-button" : "grey-button base-button file-output-buttons radio-button"}
										name="outputFormat" 
										onClick={ this.handleOnChange } 
										value="WebP">
							WebP
						</button>
						<button className={this.state.outputFormat === "TIFF" ? "highlighted-button base-button file-output-buttons radio-button" : "grey-button base-button file-output-buttons radio-button"}
										name="outputFormat" 
										onClick={ this.handleOnChange } 
										value="TIFF">
							TIFF
						</button>
					</div>
					<div className="simple-flex">
						<div className="base-flex input-label">
							Quality
						</div>
						<input type="number" className="base-flex" value={ this.state.quality } name="quality" onChange={ this.handleOnChange }/>
					</div>
				</div>
			</div>
			<div className="container">
				<button className="resize-button highlighted-button base-button" onClick={ this.handleResize }>
					RESIZE
				</button>
			</div>
		</div>;
	}
}

export default SettingsInput;