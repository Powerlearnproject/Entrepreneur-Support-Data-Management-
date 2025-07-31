import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Eye,
  Calendar,
  DollarSign,
  Users,
  Target
} from 'lucide-react';
import type { User } from '../../App';

interface TrackReportsProps {
  user: User;
}

interface Report {
  id: string;
  title: string;
  type: 'financial' | 'performance' | 'impact' | 'compliance';
  period: string;
  status: 'generated' | 'pending' | 'processing';
  generatedAt: string;
  size: string;
}

export function TrackReports({ user }: TrackReportsProps) {
  const [reports] = useState<Report[]>([
    {
      id: '1',
      title: 'Monthly Financial Performance Report',
      type: 'financial',
      period: 'January 2024',
      status: 'generated',
      generatedAt: '2024-01-31',
      size: '2.1 MB'
    },
    {
      id: '2',
      title: 'Business Impact Assessment',
      type: 'impact',
      period: 'Q4 2023',
      status: 'generated',
      generatedAt: '2024-01-15',
      size: '1.8 MB'
    },
    {
      id: '3',
      title: 'Employment Growth Report',
      type: 'performance',
      period: 'December 2023',
      status: 'generated',
      generatedAt: '2024-01-10',
      size: '1.5 MB'
    },
    {
      id: '4',
      title: 'Compliance Report',
      type: 'compliance',
      period: 'January 2024',
      status: 'processing',
      generatedAt: '',
      size: '0 MB'
    },
    {
      id: '5',
      title: 'Revenue Growth Analysis',
      type: 'financial',
      period: 'Q1 2024',
      status: 'pending',
      generatedAt: '',
      size: '0 MB'
    }
  ]);

  const [metrics] = useState({
    totalReports: 12,
    thisMonth: 3,
    averageGrowth: 15.2,
    employmentGrowth: 8.5,
    revenueGrowth: 22.1,
    complianceScore: 95
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'generated':
        return <Badge className="bg-green-100 text-green-800">Generated</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>;
      case 'pending':
        return <Badge className="bg-blue-100 text-blue-800">Pending</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'financial':
        return <DollarSign className="w-4 h-4" />;
      case 'performance':
        return <TrendingUp className="w-4 h-4" />;
      case 'impact':
        return <Target className="w-4 h-4" />;
      case 'compliance':
        return <BarChart3 className="w-4 h-4" />;
      default:
        return <BarChart3 className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'financial':
        return 'bg-green-100 text-green-600';
      case 'performance':
        return 'bg-blue-100 text-blue-600';
      case 'impact':
        return 'bg-purple-100 text-purple-600';
      case 'compliance':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Track Reports</h2>
          <p className="text-muted-foreground">Monitor your business performance and compliance reports</p>
        </div>
        <Button>
          <BarChart3 className="w-4 h-4 mr-2" />
          Generate New Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-bold">{metrics.totalReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue Growth</p>
                <p className="text-2xl font-bold">{metrics.revenueGrowth}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Employment Growth</p>
                <p className="text-2xl font-bold">{metrics.employmentGrowth}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Compliance Score</p>
                <p className="text-2xl font-bold">{metrics.complianceScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>
            Your latest business performance and compliance reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(report.type)}`}>
                    {getTypeIcon(report.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{report.title}</p>
                      {getStatusBadge(report.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {report.period}
                      </span>
                      {report.generatedAt && (
                        <span>Generated {new Date(report.generatedAt).toLocaleDateString()}</span>
                      )}
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  {report.status === 'generated' && (
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Report Types</CardTitle>
            <CardDescription>Available report categories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                  <DollarSign className="w-3 h-3 text-green-600" />
                </div>
                <span className="font-medium">Financial Reports</span>
              </div>
              <Badge variant="outline">Monthly</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                  <TrendingUp className="w-3 h-3 text-blue-600" />
                </div>
                <span className="font-medium">Performance Reports</span>
              </div>
              <Badge variant="outline">Quarterly</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                  <Target className="w-3 h-3 text-purple-600" />
                </div>
                <span className="font-medium">Impact Reports</span>
              </div>
              <Badge variant="outline">Annually</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
                  <BarChart3 className="w-3 h-3 text-orange-600" />
                </div>
                <span className="font-medium">Compliance Reports</span>
              </div>
              <Badge variant="outline">Monthly</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Generate reports and manage data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Generate Financial Report
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              Create Performance Report
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Target className="w-4 h-4 mr-2" />
              Generate Impact Report
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export All Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 