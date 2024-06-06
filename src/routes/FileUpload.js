// React component to upload a file to AWS S3
import React, { useState } from 'react';
import AWS from 'aws-sdk';
import URL2PPT from '../component/URL2PPT';

const s3 = new AWS.S3({
  accessKeyId: 'your-access-key',
  secretAccessKey: 'your-secret-access-key',
});

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = () => {
    const params = {
      Bucket: 'your-bucket-name',
      Key: 'folder/' + selectedFile.name,
      Body: selectedFile,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('File uploaded successfully:', data.Location);
    });
  };

  return (
    <>
      <div>
        <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
        <button onClick={handleFileUpload}>Upload File</button>
      </div>
      <h3>Download MS PPT for Youtube Videos</h3>
      <div>
        </URL2PPT>
      </div>
    </>
  );
}

export default FileUpload;
