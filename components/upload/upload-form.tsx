"use client";

import { useState } from 'react';
import { FileText, Upload, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export function UploadForm() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.type === 'application/pdf'
    );
    
    if (droppedFiles.length === 0) {
      toast({
        title: "Invalid file type",
        description: "Please upload PDF files only",
        variant: "destructive",
      });
      return;
    }
    
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const selectedFiles = Array.from(e.target.files).filter(
      file => file.type === 'application/pdf'
    );
    
    if (selectedFiles.length === 0) {
      toast({
        title: "Invalid file type",
        description: "Please upload PDF files only",
        variant: "destructive",
      });
      return;
    }
    
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const handleFileRemove = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleProcess = async () => {
    if (files.length === 0) return;
    
    setProcessing(true);
    setProgress(0);
    
    // Simulate processing with progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
    
    // Simulate API call for processing
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      
      setTimeout(() => {
        setProcessing(false);
        setFiles([]);
        toast({
          title: "Processing complete",
          description: `Successfully processed ${files.length} document${files.length > 1 ? 's' : ''}`,
        });
      }, 1000);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors",
              isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="rounded-full bg-primary/10 p-4">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Upload Lease Documents</h3>
                <p className="text-sm text-muted-foreground">
                  Drag and drop PDF files or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  Only PDF files are supported
                </p>
              </div>
            </div>
            <input
              id="file-upload"
              type="file"
              accept=".pdf"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Selected Documents ({files.length})</h2>
            <Button
              onClick={handleProcess}
              disabled={processing}
            >
              {processing ? 'Processing...' : 'Process Documents'}
            </Button>
          </div>

          {processing && (
            <div className="space-y-2 mb-4">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground text-right">
                {progress === 100 ? 'Complete!' : `Processing ${progress}%`}
              </p>
            </div>
          )}

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {files.map((file, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="p-4 flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  {!processing && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFileRemove(index);
                      }}
                    >
                      Remove
                    </Button>
                  )}
                  {processing && progress === 100 && (
                    <div className="rounded-full bg-green-100 dark:bg-green-900 p-1">
                      <Check className="h-4 w-4 text-green-600 dark:text-green-300" />
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4 border border-blue-200 dark:border-blue-900">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400">How it works</h3>
            <div className="mt-2 text-sm text-blue-700 dark:text-blue-300 space-y-2">
              <p>
                1. Upload your lease documents in PDF format
              </p>
              <p>
                2. LeaseLight will extract key data using OCR technology
              </p>
              <p>
                3. Our system automatically classifies the lease type
              </p>
              <p>
                4. Review the extracted data and make any necessary adjustments
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}