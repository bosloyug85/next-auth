import React from 'react';
import Button from '@mui/material/Button';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { API_BASE_URL } from '@/app/config/constants';

const FileDownloadButton = ({ label, languageId, fileUrl }: { label: string, languageId: number, fileUrl: string }) => {
  // Function to fetch data from the API
  const handleDownload = async () => {
    try {
      const response = await fetch(
        `https://employeecertificates/employeecertificates/api/v1${fileUrl}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        }
      );

      if (response.ok) {
        // Get the filename from the response headers
        const contentDisposition = response.headers.get('content-disposition');
        const fileNameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/);
        console.log('contentDisposition ', contentDisposition);
        const fileName = fileNameMatch ? fileNameMatch[1] : 'downloaded_file.jpeg';

        // Create a Blob from the response data
        const blob = await response.blob();

        // Create a blob URL
        const blobUrl = URL.createObjectURL(blob);

        // Create a temporary anchor element
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = fileName;

        // Append the link to the body and trigger a click event
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // Remove the link from the body
        document.body.removeChild(downloadLink);

        // Revoke the blob URL to release resources
        URL.revokeObjectURL(blobUrl);
      } else {
        console.error('Failed to download file. Status:', response.status);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <Button startIcon={<FileDownloadOutlinedIcon />} onClick={handleDownload}>
      <span style={{ color: "#666666", textTransform: 'none', fontSize: 10 }}>
        {label}
        ({languageId === 1 ? 'English' : 'Serbian' })
      </span>
    </Button>
  );
};

export default FileDownloadButton;