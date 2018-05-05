const ImageFormats = Object.freeze({
	JPEG: "image/jpeg",
	PNG: "image/png",
	GIF: "image/gif",
	WEBP: "image/webp",
	TIFF: "image/tiff",
	formatForIndex: (index) => {
		switch (index) {
			case "JPG":
				return ImageFormats.JPEG
			case "PNG":
				return ImageFormats.PNG
			case "GIF":
				return ImageFormats.GIF
			case "WebP":
				return ImageFormats.WEBP
			case "TIFF":
				return ImageFormats.TIFF
			default: return
		}
	},
	extensionForFormat: (format) => {
		switch (format) {
			case ImageFormats.JPEG:
				return "jpg"
			case ImageFormats.PNG:
				return "png"
			case ImageFormats.GIF:
				return "gif"
			case ImageFormats.WEBP:
				return "webp"
			case ImageFormats.TIFF:
				return "tiff"
			default: return
		}
	}
})

export default ImageFormats;