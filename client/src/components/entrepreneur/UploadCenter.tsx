import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Download,
  Trash2,
  Eye
} from 'lucide-react';
import type { User } from '../../App';

interface UploadCenterProps {
  user: User;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  status: 'uploaded' | 'pending' | 'rejected';
  uploadedAt: string;
  required: boolean;
}

export function UploadCenter({ user }: UploadCenterProps) {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Business Registration Certificate',
      type: 'PDF',
      size: '2.5 MB',
      status: 'uploaded',
      uploadedAt: '2024-01-15',
      required: true
    },
    {
      id: '2',
      name: 'Financial Statements (2023)',
      type: 'PDF',
      size: '1.8 MB',
      status: 'uploaded',
      uploadedAt: '2024-01-15',
      required: true
    },
    {
      id: '3',
      name: 'Business Plan',
      type: 'PDF',
      size: '3.2 MB',
      status: 'uploaded',
      uploadedAt: '2024-01-16',
      required: true
    },
    {
      id: '4',
      name: 'Bank Statements (Last 6 months)',
      type: 'PDF',
      size: '4.1 MB',
      status: 'pending',
      uploadedAt: '',
      required: true
    },
    {
      id: '5',
      name: 'Tax Compliance Certificate',
      type: 'PDF',
      size: '1.2 MB',
      status: 'rejected',
      uploadedAt: '2024-01-17',
      required: true
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'uploaded':
        return <Badge className="bg-green-100 text-green-800">Uploaded</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Handle file upload logic here
      console.log('Files selected:', files);
    }
  };

  const handleDeleteDocument = (documentId: string) => {
    setDocuments(docs => docs.filter(doc => doc.id !== documentId));
  };

  const uploadedCount = documents.filter(doc => doc.status === 'uploaded').length;
  const totalRequired = documents.filter(doc => doc.required).length;
  const progress = (uploadedCount / totalRequired) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Document Upload Center</h2>
          <p className="text-muted-foreground">Upload and manage your application documents</p>
        </div>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload Documents
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Progress</CardTitle>
          <CardDescription>
            {uploadedCount} of {totalRequired} required documents uploaded
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Document Completion</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>{uploadedCount} Uploaded</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <span>{documents.filter(doc => doc.status === 'pending').length} Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span>{documents.filter(doc => doc.status === 'rejected').length} Rejected</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Required Documents</h3>
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          <label htmlFor="file-upload">
            <Button variant="outline" size="sm" asChild>
              <span>
                <Upload className="w-4 h-4 mr-2" />
                Add Files
              </span>
            </Button>
          </label>
        </div>

        <div className="space-y-3">
          {documents.map((document) => (
            <Card key={document.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{document.name}</p>
                        {document.required && (
                          <Badge variant="outline" className="text-xs">Required</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{document.type}</span>
                        <span>{document.size}</span>
                        {document.uploadedAt && (
                          <span>Uploaded {new Date(document.uploadedAt).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(document.status)}
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteDocument(document.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            <p className="text-sm text-muted-foreground">
              Supported file formats: PDF, DOC, DOCX, JPG, JPEG, PNG
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            <p className="text-sm text-muted-foreground">
              Maximum file size: 10 MB per document
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            <p className="text-sm text-muted-foreground">
              Ensure all documents are clear and legible
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            <p className="text-sm text-muted-foreground">
              Documents must be current and valid
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 