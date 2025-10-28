"use client";

import { ResizeSettings, OUTPUT_FORMATS, ROTATION_OPTIONS } from "@/lib/types";

interface SettingsPanelProps {
  settings: ResizeSettings;
  onSettingsChange: (settings: ResizeSettings) => void;
  onResize: () => void;
  isProcessing: boolean;
}

const DEFAULT_SETTINGS: ResizeSettings = {
  width: 0,
  height: 0,
  usePercentage: false,
  percentage: 0,
  rotation: 0,
  outputFormat: "image/jpeg",
  quality: 80,
  outputName: "",
};

export default function SettingsPanel({
  settings,
  onSettingsChange,
  onResize,
  isProcessing,
}: SettingsPanelProps) {
  const handleChange = (field: keyof ResizeSettings, value: any) => {
    onSettingsChange({ ...settings, [field]: value });
  };

  const handleReset = () => {
    onSettingsChange(DEFAULT_SETTINGS);
  };

  // Check if current format supports quality adjustment
  const supportsQuality = 
    settings.outputFormat === "image/jpeg" || 
    settings.outputFormat === "image/webp";

  return (
    <div className="space-y-6">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            title="Reset to default settings"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reset
          </button>
        </div>

        {/* Resize Mode Toggle */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Resize Mode
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => handleChange("usePercentage", false)}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                !settings.usePercentage
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg transform scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Dimensions
            </button>
            <button
              onClick={() => handleChange("usePercentage", true)}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                settings.usePercentage
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg transform scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Percentage
            </button>
          </div>
        </div>

        {/* Dimensions or Percentage */}
        {settings.usePercentage ? (
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Percentage
            </label>
            <input
              type="number"
              min="1"
              max="200"
              value={settings.percentage || ""}
              onChange={(e) =>
                handleChange("percentage", parseInt(e.target.value) || 0)
              }
              placeholder="100"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
            <p className="text-xs text-gray-500 mt-2">
              Enter a percentage (e.g., 50 for half size)
            </p>
          </div>
        ) : (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm font-semibold text-gray-700">
                Dimensions
              </label>
              <div className="group relative">
                <div className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs cursor-help">
                  i
                </div>
                <div className="absolute left-0 top-6 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <p className="font-semibold mb-1">Tip: Maintain Aspect Ratio</p>
                  <p>Leave width or height empty to automatically maintain the original aspect ratio.</p>
                  <div className="absolute -top-1 left-3 w-2 h-2 bg-gray-900 transform rotate-45"></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  min="0"
                  value={settings.width || ""}
                  onChange={(e) =>
                    handleChange("width", parseInt(e.target.value) || 0)
                  }
                  placeholder="Width (auto)"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>
              <div>
                <input
                  type="number"
                  min="0"
                  value={settings.height || ""}
                  onChange={(e) =>
                    handleChange("height", parseInt(e.target.value) || 0)
                  }
                  placeholder="Height (auto)"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        )}

        {/* Rotation */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Rotation
          </label>
          <div className="grid grid-cols-2 gap-2">
            {ROTATION_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleChange("rotation", option.value)}
                className={`py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                  settings.rotation === option.value
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Output Format */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Output Format
          </label>
          <div className="grid grid-cols-3 gap-2">
            {OUTPUT_FORMATS.map((format) => (
              <button
                key={format.value}
                onClick={() => handleChange("outputFormat", format.value)}
                className={`py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                  settings.outputFormat === format.value
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {format.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quality */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <label className="block text-sm font-semibold text-gray-700">
              Quality: {settings.quality}%
            </label>
            {!supportsQuality && (
              <span className="text-xs text-gray-500 italic">
                (not applicable to this format)
              </span>
            )}
          </div>
          <input
            type="range"
            min="1"
            max="100"
            value={settings.quality}
            onChange={(e) => handleChange("quality", parseInt(e.target.value))}
            disabled={!supportsQuality}
            className={`w-full h-2 rounded-lg appearance-none ${
              supportsQuality
                ? "bg-gray-200 cursor-pointer accent-blue-500"
                : "bg-gray-100 cursor-not-allowed opacity-50"
            }`}
          />
          <div className={`flex justify-between text-xs mt-1 ${
            supportsQuality ? "text-gray-500" : "text-gray-400"
          }`}>
            <span>Lower size</span>
            <span>Higher quality</span>
          </div>
        </div>

        {/* Output Name */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Output Name (optional)
          </label>
          <input
            type="text"
            value={settings.outputName}
            onChange={(e) => handleChange("outputName", e.target.value)}
            placeholder="Leave empty to keep original names"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          />
        </div>

        {/* Resize Button */}
        <button
          onClick={onResize}
          disabled={isProcessing}
          className="w-full py-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Resize Images"
          )}
        </button>
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl p-4 border-2 border-blue-200">
        <div className="flex items-start gap-3">
          <span className="text-2xl">📦</span>
          <div className="text-sm">
            <p className="font-semibold text-blue-900 mb-1">
              Multiple Images = ZIP Download
            </p>
            <p className="text-blue-700">
              When resizing multiple images, they'll automatically download as a single ZIP file!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

