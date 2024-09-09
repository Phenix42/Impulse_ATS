import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ScanScreen.css';

const CompareForm = () => {
  const [files, setFiles] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(1); // Step to track progress
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { getRootProps, getInputProps } = useDropzone({
    accept: '.pdf',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const handleTextInputChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleScan = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('textInput', textInput);
    formData.append('pdfFile', files[0]);

    try {
      const response = await axios.post('http://localhost:4000/compare', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      navigate('/dashboard', { state: { matchPercentage: response.data.matchPercentage } });
    } catch (err) {
      console.error(err); // Log error for debugging
      setError('An error occurred while comparing texts.');
      setLoading(false);
    }
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop();
    switch (extension) {
      case 'pdf':
        return <i className="fas fa-file-pdf"></i>;
      default:
        return <i className="fas fa-file"></i>;
    }
  };

  const handleRemoveFile = (fileName) => {
    setFiles(files.filter(file => file.name !== fileName));
  };

  const thumbs = files.map(file => (
    <div key={file.name} className="thumb">
      <div className="thumb-inner">
        {getFileIcon(file.name)}
        <p>{file.name}</p>
        <button className="remove-button" onClick={() => handleRemoveFile(file.name)}>X</button>
      </div>
    </div>
  ));

  return (
    <div className="scan-screen">
      <h1 className='Heading'></h1>
      <div className="card">
        <div className="input-container">
          {step === 1 && (
            <>
              <section className="container dropzone-container">
                <div {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop your PDF here, or click to select files</p>
                </div>
                <aside className="thumbs-container">
                  {thumbs}
                </aside>
              </section>
              {files.length > 0 && (
                <button className="next-button" onClick={handleNext}>Next</button>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <textarea
                value={textInput}
                onChange={handleTextInputChange}
                placeholder="Enter text input here"
                className="text-input"
              />
              <button className="scan-button" onClick={handleScan}>Scan</button>
            </>
          )}
        </div>
        {loading && (
          <div className="progress-section">
            <h2>Loading...</h2>
            <ProgressBar now={progress} label={`${progress}%`} animated striped variant="info" className="mt-3" />
          </div>
        )}
        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareForm;