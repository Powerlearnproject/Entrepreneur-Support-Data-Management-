import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  User, 
  Building, 
  Mail, 
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  Globe,
  Linkedin,
  Twitter,
  Instagram
} from 'lucide-react';
import type { User as UserType } from '../../App';

interface EntrepreneurProfileProps {
  user: UserType;
}

export function EntrepreneurProfile({ user }: EntrepreneurProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleSave = () => {
    // Here you would typically save the changes to the backend
    console.log('Saving user data:', editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBusinessInfoChange = (field: string, value: string | number) => {
    setEditedUser(prev => ({
      ...prev,
      businessInfo: {
        ...prev.businessInfo,
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Profile</h2>
          <p className="text-muted-foreground">Manage your personal and business information</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="relative inline-block">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user.profilePicture} alt={user.name} />
                  <AvatarFallback className="text-2xl">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-muted-foreground">{user.email}</p>
                <Badge className="mt-2" variant="secondary">
                  {user.role === 'entrepreneur' ? 'Entrepreneur' : user.role}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your basic personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedUser.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  ) : (
                    <p className="mt-1 text-sm">{user.name}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedUser.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  ) : (
                    <p className="mt-1 text-sm">{user.email}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedUser.phone || ''}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  ) : (
                    <p className="mt-1 text-sm">{user.phone || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedUser.location || ''}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  ) : (
                    <p className="mt-1 text-sm">{user.location || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Details about your business</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Business Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedUser.businessInfo?.businessName || ''}
                      onChange={(e) => handleBusinessInfoChange('businessName', e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  ) : (
                    <p className="mt-1 text-sm">{user.businessInfo?.businessName || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Value Chain</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedUser.businessInfo?.valueChain || ''}
                      onChange={(e) => handleBusinessInfoChange('valueChain', e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  ) : (
                    <p className="mt-1 text-sm">{user.businessInfo?.valueChain || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Registration Number</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedUser.businessInfo?.registrationNumber || ''}
                      onChange={(e) => handleBusinessInfoChange('registrationNumber', e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  ) : (
                    <p className="mt-1 text-sm">{user.businessInfo?.registrationNumber || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Number of Employees</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedUser.businessInfo?.employees || ''}
                      onChange={(e) => handleBusinessInfoChange('employees', parseInt(e.target.value))}
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  ) : (
                    <p className="mt-1 text-sm">{user.businessInfo?.employees || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Current Revenue (KES)</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedUser.businessInfo?.currentRevenue || ''}
                      onChange={(e) => handleBusinessInfoChange('currentRevenue', parseInt(e.target.value))}
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  ) : (
                    <p className="mt-1 text-sm">
                      {user.businessInfo?.currentRevenue 
                        ? `KES ${user.businessInfo.currentRevenue.toLocaleString()}` 
                        : 'Not provided'
                      }
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Established Year</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedUser.businessInfo?.establishedYear || ''}
                      onChange={(e) => handleBusinessInfoChange('establishedYear', parseInt(e.target.value))}
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  ) : (
                    <p className="mt-1 text-sm">{user.businessInfo?.establishedYear || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
              <CardDescription>Current status of your loan application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Application ID</p>
                    <p className="text-sm text-muted-foreground">
                      {user.applicationStatus?.applicationId || 'Not available'}
                    </p>
                  </div>
                  <Badge 
                    variant={
                      user.applicationStatus?.currentStage === 'Under Review' ? 'default' : 'secondary'
                    }
                  >
                    {user.applicationStatus?.currentStage || 'No active application'}
                  </Badge>
                </div>
                {user.applicationStatus?.lastUpdate && (
                  <div>
                    <p className="text-sm font-medium">Last Updated</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(user.applicationStatus.lastUpdate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Account details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Date Joined</label>
                  <p className="mt-1 text-sm">
                    {user.dateJoined ? new Date(user.dateJoined).toLocaleDateString() : 'Not available'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Last Active</label>
                  <p className="mt-1 text-sm">
                    {user.lastActive ? new Date(user.lastActive).toLocaleDateString() : 'Not available'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Theme Preference</label>
                  <p className="mt-1 text-sm capitalize">
                    {user.preferences?.theme || 'system'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Default Country</label>
                  <p className="mt-1 text-sm capitalize">
                    {user.preferences?.defaultCountry || 'Not set'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 