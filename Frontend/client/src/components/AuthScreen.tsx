import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import type { User } from '../App';
import { BarChart3, Shield, Users, Database, TrendingUp, AlertCircle, Mail, Lock, Eye, EyeOff, Building2, MapPin, Phone, Globe } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (user: User) => void;
  isAnalyticalPlatform?: boolean;
}

export function AuthScreen({ onLogin, isAnalyticalPlatform = false }: AuthScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [activeTab, setActiveTab] = useState('admin');

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Demo authentication logic
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Demo users for the analytical platform
    const demoUsers = {
      'admin@heva.org': {
        id: 'admin-1',
        name: 'Sarah Mwangi',
        role: 'admin' as const,
        email: 'admin@heva.org',
        department: 'Administration',
        location: 'Nairobi, Kenya'
      },
      'analyst@heva.org': {
        id: 'analyst-1',
        name: 'James Kiprotich',
        role: 'analyst' as const,
        email: 'analyst@heva.org',
        department: 'Data Analytics',
        location: 'Kampala, Uganda'
      },
      'program@heva.org': {
        id: 'program-1',
        name: 'Grace Njeri',
        role: 'program_officer' as const,
        email: 'program@heva.org',
        department: 'Program Management',
        location: 'Kigali, Rwanda'
      }
    };

    const user = demoUsers[email as keyof typeof demoUsers];
    
    if (user && password === 'demo123') {
      onLogin(user);
    } else {
      setError('Invalid credentials. Try admin@heva.org, analyst@heva.org, or program@heva.org with password: demo123');
    }

    setLoading(false);
  };

  const handleEntrepreneurLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!otpSent) {
      // Send OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOtpSent(true);
      setError('');
    } else {
      // Verify OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (otp === '123456') {
        const entrepreneurUser = {
          id: 'entrepreneur-1',
          name: 'John Doe',
          role: 'entrepreneur' as const,
          email: email,
          phone: '+254700000000',
          businessInfo: {
            businessName: 'Creative Solutions Ltd',
            valueChain: 'Technology',
            employees: 5,
            establishedYear: 2022
          },
          applicationStatus: {
            hasActiveApplication: true,
            currentStage: 'Under Review',
            lastUpdate: new Date().toISOString(),
            applicationId: 'APP-001'
          }
        };
        onLogin(entrepreneurUser);
      } else {
        setError('Invalid OTP. Use 123456 for demo.');
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 text-white p-12 flex-col justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">HEVA CreativeHub</h1>
              <p className="text-blue-100 text-sm">Entrepreneur Support Platform</p>
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">Empowering Creative Entrepreneurs</h2>
              <p className="text-xl text-blue-100 leading-relaxed">
                Comprehensive data management and funding support for creative businesses across East Africa
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="font-semibold">Smart Data Collection</h3>
                <p className="text-blue-100 text-sm">Streamlined application process with intelligent forms</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="font-semibold">Real-time Analytics</h3>
                <p className="text-blue-100 text-sm">Live insights and performance tracking</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-semibold">Secure Platform</h3>
                <p className="text-blue-100 text-sm">GDPR compliant with enterprise security</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="font-semibold">Multi-Country</h3>
                <p className="text-blue-100 text-sm">Supporting Kenya, Uganda, Rwanda & more</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-blue-100">
          <p className="text-sm">Built with ❤️ by the HEVA CreativeHub Team</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
                  HEVA CreativeHub
                </h1>
                <p className="text-sm text-muted-foreground">Entrepreneur Support Platform</p>
              </div>
            </div>
          </div>

          {/* Login Tabs */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to your account to continue</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="admin" className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4" />
                  <span>Admin</span>
                </TabsTrigger>
                <TabsTrigger value="entrepreneur" className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Entrepreneur</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="admin" className="space-y-4">
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email" className="text-sm font-medium">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="admin-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="admin-password" className="text-sm font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="admin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800"
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>

                {/* Demo Credentials */}
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <h4 className="font-medium text-sm mb-3 flex items-center text-gray-700">
                    <Shield className="w-4 h-4 mr-2" />
                    Demo Credentials
                  </h4>
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>Admin:</span>
                      <Badge variant="outline">admin@heva.org</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Analyst:</span>
                      <Badge variant="outline">analyst@heva.org</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Program Officer:</span>
                      <Badge variant="outline">program@heva.org</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Password:</span>
                      <Badge variant="outline">demo123</Badge>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="entrepreneur" className="space-y-4">
                <form onSubmit={handleEntrepreneurLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="entrepreneur-email" className="text-sm font-medium">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="entrepreneur-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                        disabled={otpSent}
                      />
                    </div>
                  </div>
                  
                  {otpSent && (
                    <div className="space-y-2">
                      <Label htmlFor="otp" className="text-sm font-medium">OTP Code</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="otp"
                          type="text"
                          placeholder="Enter 6-digit OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className="pl-10"
                          maxLength={6}
                          required
                        />
                      </div>
                      <p className="text-xs text-gray-500">We've sent a 6-digit code to your email</p>
                    </div>
                  )}

                  {error && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800"
                    disabled={loading}
                  >
                    {loading ? (otpSent ? 'Verifying...' : 'Sending OTP...') : (otpSent ? 'Verify OTP' : 'Send OTP')}
                  </Button>
                </form>

                {/* Demo OTP */}
                {otpSent && (
                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <h4 className="font-medium text-sm mb-3 flex items-center text-gray-700">
                      <Shield className="w-4 h-4 mr-2" />
                      Demo OTP
                    </h4>
                    <div className="text-xs text-gray-600">
                      <div className="flex items-center justify-between">
                        <span>OTP Code:</span>
                        <Badge variant="outline">123456</Badge>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500">
            <p>HEVA CreativeHub - Supporting entrepreneurship across East Africa</p>
            <p className="mt-1">© 2024 HEVA CreativeHub. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}