import React from 'react';

function ImageInput(props) 
{
	return <div className="container">
		<div className="file-selector">
			<input type="file" className="file-selector-size" onChange={ props.imageUploadOnChange } multiple />
			<div className="select-file file-selector-size centered-container">
				<div className="file-selector-icon icon-folder-upload"></div>
				<div className="drag-drop">
					Drag and Drop files
				</div>
				<div className="drag-drop-files">
					Or click to select files
				</div>
			</div>
		</div>
	</div>;
}

export default ImageInput;