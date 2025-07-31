import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Download,
  Eye,
  Edit
} from 'lucide-react';
import type { User } from '../../App';

interface MyApplicationProps {
  user: User;
}

export function MyApplication({ user }: MyApplicationProps) {
  const [application] = useState({
    id: 'APP-001',
    status: 'under_review',
    submissionDate: '2024-01-15',
    requestedAmount: 50000,
    businessName: 'Creative Solutions Ltd',
    valueChain: 'Technology',
    loanType: 'Working Capital',
    progress: 75,
    lastUpdate: '2024-01-20',
    reviewNotes: 'Application is under review. Additional documents may be required.',
    milestones: [
      { id: 1, title: 'Application Submitted', completed: true, date: '2024-01-15' },
      { id: 2, title: 'Initial Review', completed: true, date: '2024-01-17' },
      { id: 3, title: 'Document Verification', completed: false, date: null },
      { id: 4, title: 'Final Decision', completed: false, date: null }
    ]
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'under_review':
        return <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">My Application</h2>
          <p className="text-muted-foreground">Track your loan application progress</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Application Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Application ID</p>
                <p className="font-semibold">{application.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <div className="mt-1">{getStatusBadge(application.status)}</div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Business Name</p>
                <p className="font-semibold">{application.businessName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Value Chain</p>
                <p className="font-semibold">{application.valueChain}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Loan Type</p>
                <p className="font-semibold">{application.loanType}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Amount Requested</p>
                <p className="font-semibold">KES {application.requestedAmount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Application Progress</span>
                <span>{application.progress}%</span>
              </div>
              <Progress value={application.progress} className="h-2" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
              <p className="font-semibold">{new Date(application.lastUpdate).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application Timeline</CardTitle>
          <CardDescription>Track your application through each stage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {application.milestones.map((milestone, index) => (
              <div key={milestone.id} className="flex items-start gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  milestone.completed 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {milestone.completed ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{milestone.title}</p>
                  {milestone.date && (
                    <p className="text-sm text-muted-foreground">
                      {new Date(milestone.date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {application.reviewNotes && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Review Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{application.reviewNotes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 