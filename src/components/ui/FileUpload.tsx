import { motion } from "framer-motion";
import { AlertCircle, FileText, Upload, X } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";

interface FileUploadProps {
  onFileSelected: (file: File) => void;
  isProcessing?: boolean;
  maxSizeMB?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelected,
  isProcessing = false,
  maxSizeMB = 5,
}) => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null);
      const file = acceptedFiles[0];

      // Check file size
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(t("errors.fileSize"));
        return;
      }

      setSelectedFile(file);
      onFileSelected(file);
    },
    [maxSizeMB, onFileSelected, t]
  );

  const removeFile = () => {
    setSelectedFile(null);
    setError(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
    disabled: isProcessing || !!selectedFile,
  });

  return (
    <div className="w-full">
      {selectedFile ? (
        <div className="card p-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <div className="flex-shrink-0 mr-3">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="flex-grow min-w-0">
              <p className="font-medium truncate text-gray-800 dark:text-gray-200">
                {selectedFile.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            {!isProcessing && (
              <button
                type="button"
                onClick={removeFile}
                className="ml-2 p-1.5 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                aria-label="Remove file"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </motion.div>
        </div>
      ) : (
        <div className="w-full">
          <div
            {...getRootProps()}
            className={`card border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 transition-colors p-8 text-center cursor-pointer ${
              isDragActive
                ? "border-blue-500 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : ""
            }`}
          >
            <input {...getInputProps()} />
            <motion.div
              animate={{ y: isDragActive ? -5 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 p-1 shadow-lg">
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">
                {t("home.dropzoneText")}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("home.dropzoneHint")}
              </p>
            </motion.div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 flex items-start text-red-600 dark:text-red-400 text-sm"
            >
              <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
