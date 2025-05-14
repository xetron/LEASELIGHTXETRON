import { Metadata } from 'next';
import { UploadForm } from '@/components/upload/upload-form';

export const metadata: Metadata = {
  title: 'Upload Leases - LeaseLight',
  description: 'Upload and process lease documents',
};

export default function UploadPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload Documents</h1>
        <p className="text-muted-foreground">
          Upload lease documents for automatic data extraction and processing
        </p>
      </div>
      
      <UploadForm />
    </div>
  );
}