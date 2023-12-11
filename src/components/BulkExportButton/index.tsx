import React from 'react';
import Button from '@mui/material/Button';

interface IFilterWithoutIncludingInactive {
    localizationId: number;
    keywords: string[];
    searchType: number;
}

const BulkExportButton = ({ icon, label, languageId, documentIds, style, fileType, url }: { icon: JSX.Element, label: string, languageId?: number, documentIds: string[] | IFilterWithoutIncludingInactive, style: any, fileType: string, url: string }) => {
  // Function to fetch data from the API
  const handleDownload = async () => {
    try {
        const response = await fetch(
            url,
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(documentIds),
            }
          );
          
          if (response.ok) {
            // Get the filename from the content-disposition header
            const contentDisposition = response.headers.get('content-disposition');
            const fileNameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/);
            const fileName = fileNameMatch ? fileNameMatch[1] : 'downloaded_file.' + fileType; // Default to 'downloaded_file.pdf'
          
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
    <Button startIcon={icon} style={style} onClick={handleDownload}>
        {label}
    </Button>
  );
};

export default BulkExportButton;