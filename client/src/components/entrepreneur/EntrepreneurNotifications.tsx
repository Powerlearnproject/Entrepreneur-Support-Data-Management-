import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Info,
  Clock,
  Trash2,
  Settings
} from 'lucide-react';
import type { User } from '../../App';

interface EntrepreneurNotificationsProps {
  user: User;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  category: 'application' | 'document' | 'education' | 'system';
}

export function EntrepreneurNotifications({ user }: EntrepreneurNotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Application Status Updated',
      message: 'Your loan application has been moved to the review stage.',
      type: 'success',
      timestamp: '2024-01-20T10:30:00Z',
      read: false,
      priority: 'high',
      category: 'application'
    },
    {
      id: '2',
      title: 'Document Required',
      message: 'Please upload your latest bank statements to complete your application.',
      type: 'warning',
      timestamp: '2024-01-19T14:15:00Z',
      read: false,
      priority: 'high',
      category: 'document'
    },
    {
      id: '3',
      title: 'New Course Available',
      message: 'Financial Management Fundamentals course is now available for enrollment.',
      type: 'info',
      timestamp: '2024-01-18T09:45:00Z',
      read: true,
      priority: 'medium',
      category: 'education'
    },
    {
      id: '4',
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur on January 25th from 2-4 AM.',
      type: 'info',
      timestamp: '2024-01-17T16:20:00Z',
      read: true,
      priority: 'low',
      category: 'system'
    },
    {
      id: '5',
      title: 'Application Rejected',
      message: 'Your application has been rejected. Please review the feedback and resubmit.',
      type: 'error',
      timestamp: '2024-01-16T11:30:00Z',
      read: false,
      priority: 'high',
      category: 'application'
    },
    {
      id: '6',
      title: 'Document Approved',
      message: 'Your business registration certificate has been approved.',
      type: 'success',
      timestamp: '2024-01-15T13:45:00Z',
      read: true,
      priority: 'medium',
      category: 'document'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showRead, setShowRead] = useState<boolean>(true);

  const categories = [
    { id: 'all', name: 'All', count: notifications.length },
    { id: 'application', name: 'Application', count: notifications.filter(n => n.category === 'application').length },
    { id: 'document', name: 'Documents', count: notifications.filter(n => n.category === 'document').length },
    { id: 'education', name: 'Education', count: notifications.filter(n => n.category === 'education').length },
    { id: 'system', name: 'System', count: notifications.filter(n => n.category === 'system').length }
  ];

  const filteredNotifications = notifications.filter(notification => {
    const categoryMatch = selectedCategory === 'all' || notification.category === selectedCategory;
    const readMatch = showRead || !notification.read;
    return categoryMatch && readMatch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-600" />;
      default:
        return <Info className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true }
        : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Notifications</h2>
          <p className="text-muted-foreground">Stay updated with your application progress</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark All Read
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bell className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{notifications.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Unread</p>
                <p className="text-2xl font-bold">{unreadCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold">{notifications.filter(n => n.priority === 'high').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today</p>
                <p className="text-2xl font-bold">{notifications.filter(n => {
                  const today = new Date();
                  const notificationDate = new Date(n.timestamp);
                  return notificationDate.toDateString() === today.toDateString();
                }).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
              <Badge variant="secondary" className="ml-2">{category.count}</Badge>
            </Button>
          ))}
        </div>
        <Button
          variant={showRead ? "default" : "outline"}
          size="sm"
          onClick={() => setShowRead(!showRead)}
        >
          {showRead ? 'Hide Read' : 'Show Read'}
        </Button>
      </div>

      <div className="space-y-3">
        {filteredNotifications.map((notification) => (
          <Card key={notification.id} className={`${!notification.read ? 'border-blue-200 bg-blue-50' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {getTypeIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{notification.title}</p>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTimestamp(notification.timestamp)}
                        </span>
                        {getPriorityBadge(notification.priority)}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {!notification.read && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No notifications</h3>
            <p className="text-muted-foreground">
              You're all caught up! Check back later for new updates.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 