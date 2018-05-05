import React from 'react';

class SelectedFiles extends React.Component
{
	render() {
		return(
			<div className={ this.props.files.length > 0 ? "image-container-small image-container" : "image-container" }>
				{this.props.files.map((file, i) => 
					<div className="image-flex" key={ i }>
						<div className="delete-button icon-cancel-circle" onClick={ () => this.props.deleteFile(i) }></div>
						<img src={ window.URL.createObjectURL(file.file) } width="300" alt=""/>
						<div>{ file.fileName }</div>
					</div>
				)}
			</div>
		)
	}
}

export default SelectedFiles;