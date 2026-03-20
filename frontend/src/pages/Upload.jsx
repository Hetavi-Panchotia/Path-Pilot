import React, { useState, useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload as UploadIcon, FileText, File, Loader2, ArrowRight, Image as ImageIcon, X, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [preview, setPreview] = useState(null);
  const [jdText, setJdText] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAnalysisResult, setRoadmap } = useContext(AppContext);

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    setFileError('');
    
    if (fileRejections.length > 0) {
      const error = fileRejections[0].errors[0];
      if (error.code === 'file-too-large') {
        setFileError('File size exceeds the 5MB limit.');
      } else if (error.code === 'file-invalid-type') {
        setFileError('Unsupported file format. Please upload a PDF, PNG, JPG, or WEBP.');
      } else {
        setFileError(error.message);
      }
      return;
    }

    if (acceptedFiles[0]) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      
      if (selectedFile.type.startsWith('image/')) {
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
      } else {
        setPreview(null);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxSize: 5 * 1024 * 1024, // 5MB limit
    maxFiles: 1
  });

  const clearFile = (e) => {
    e.stopPropagation(); // prevent opening dropzone
    setFile(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFileError('');
  };

  const handleAnalyze = async () => {
    if (!file || !jdText.trim()) return alert("Please provide both Resume and Job Description");
    
    setLoading(true);
    try {
      // 1. Upload and Parse
      const formData = new FormData();
      formData.append('resumeFile', file);
      formData.append('jdText', jdText);

      const uploadRes = await axios.post('http://localhost:5005/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const { resumeText } = uploadRes.data;

      // 2. Analyze Gap
      const analysisRes = await axios.post('http://localhost:5005/api/analyze', {
        resumeText,
        jdText
      });
      
      const analysisData = analysisRes.data;
      setAnalysisResult(analysisData);

      // 3. Generate Roadmap
      const roadmapRes = await axios.post('http://localhost:5005/api/roadmap', {
        analysis: analysisData
      });
      
      setRoadmap(roadmapRes.data);
      navigate('/results');
      
    } catch (error) {
      console.error(error);
      if (error.message === 'Network Error') {
        alert('Network Error: Cannot connect to the backend server. Please refresh your browser and ensure the backend is running on port 5005.');
      } else {
        alert(error.response?.data?.error || 'An error occurred during analysis.');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen pt-24 px-4 flex flex-col items-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary-900/20 to-transparent -z-10" />

      <motion.div className="max-w-3xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">Upload your profile</h1>
          <p className="text-gray-400">Provide your Resume and the Job Description you're aiming for.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Resume Upload */}
          <div className={`glass-card p-6 flex flex-col items-center justify-center min-h-[300px] border-2 transition-colors ${
            isDragActive ? 'border-primary-500 bg-primary-500/10' : fileError ? 'border-red-500/50' : 'border-transparent'
          }`}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            
            {file ? (
              <div className="flex flex-col items-center gap-4 w-full">
                {preview ? (
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-white/20 shadow-lg group">
                    <img src={preview} alt="Resume Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-white/50" />
                    </div>
                  </div>
                ) : (
                  <div className="w-32 h-32 bg-primary-500/20 rounded-lg flex items-center justify-center border border-primary-500/30">
                    <File className="w-16 h-16 text-primary-400" />
                  </div>
                )}
                
                <div className="text-center w-full px-2">
                  <p className="font-medium truncate text-sm text-gray-200" title={file.name}>{file.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{formatFileSize(file.size)}</p>
                </div>

                <button 
                  onClick={clearFile}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                >
                  <X className="w-3 h-3" /> Remove File
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 text-center cursor-pointer text-gray-400 hover:text-gray-200">
                <div className={`p-4 rounded-full bg-dark-700/50 ${isDragActive ? 'bg-primary-500/20 text-primary-400 font-bold shadow-lg shadow-primary-500/20' : ''}`}>
                  <UploadIcon className="w-10 h-10" />
                </div>
                <div>
                  <p className="font-semibold text-white">Drag & drop your Resume</p>
                  <p className="text-xs mt-2 text-gray-500">Supports PDF, PNG, JPG, WEBP (Max: 5MB)</p>
                </div>
              </div>
            )}
            
            {/* Error Message */}
            {fileError && (
              <div className="mt-4 flex items-center gap-2 text-red-400 text-xs text-center p-2 rounded-lg bg-red-500/10 border border-red-500/20 w-full">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {fileError}
              </div>
            )}
            
            {loading && !fileError && (
              <div className="mt-4 flex items-center gap-2 text-primary-400 text-xs font-medium">
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing document...
              </div>
            )}
          </div>

          {/* JD Input */}
          <div className="glass-card p-6 flex flex-col h-[300px]">
            <div className="flex items-center gap-2 mb-4 text-gray-300">
              <FileText className="w-5 h-5 text-accent-500" />
              <h3 className="font-medium">Job Description</h3>
            </div>
            <textarea 
              className="flex-1 w-full bg-dark-900/50 border border-white/5 rounded-xl p-4 text-sm focus:outline-none focus:border-primary-500/50 resize-none transition-colors"
              placeholder="Paste the target job description here..."
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAnalyze}
            disabled={!file || !jdText.trim() || loading}
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 disabled:from-dark-700 disabled:to-dark-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-medium shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all border border-transparent disabled:border-white/5"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                Generate Roadmap
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Upload;
