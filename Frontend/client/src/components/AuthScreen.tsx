import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Building2, 
  MapPin, 
  Phone, 
  Globe,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface AuthScreenProps {
  onLogin: (userData: any) => void;
}

export default function AuthScreen({ onLogin }: AuthScreenProps) {
  const [activeTab, setActiveTab] = useState('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEntrepreneurLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/entrepreneur/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtpSent(true);
        setError('');
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data);
      } else {
        setError(data.error || 'Invalid OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setError('');
        alert('Password reset OTP sent to your email');
      } else {
        setError(data.error || 'Failed to send reset OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white p-12 flex-col justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold">HEVA CreativeHub</h1>
          </div>
          
          <div className="max-w-md">
            <h2 className="text-4xl font-bold mb-6">
              Empowering Entrepreneurs Through Data-Driven Support
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Join our comprehensive platform for entrepreneurial success. 
              Access funding, track progress, and grow your business with 
              our analytical tools and support network.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-300" />
            <span>AI-Powered Loan Analysis</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-300" />
            <span>Real-time Progress Tracking</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-300" />
            <span>Comprehensive Analytics Dashboard</span>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">HEVA CreativeHub</h1>
            </div>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-600">
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="admin" className="text-sm font-medium">
                    Admin Login
                  </TabsTrigger>
                  <TabsTrigger value="entrepreneur" className="text-sm font-medium">
                    Entrepreneur Login
                  </TabsTrigger>
                </TabsList>

                {/* Admin Login Tab */}
                <TabsContent value="admin" className="space-y-4">
                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="admin-email" className="text-sm font-medium text-gray-700">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="admin-email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="admin-password" className="text-sm font-medium text-gray-700">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="admin-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10 h-12"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Forgot password?
                      </button>
                    </div>

                    {error && (
                      <div className="flex items-center space-x-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{error}</span>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Signing in...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span>Sign In</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                {/* Entrepreneur Login Tab */}
                <TabsContent value="entrepreneur" className="space-y-4">
                  {!otpSent ? (
                    <form onSubmit={handleEntrepreneurLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="entrepreneur-email" className="text-sm font-medium text-gray-700">
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            id="entrepreneur-email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 h-12"
                            required
                          />
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                            <Globe className="w-3 h-3 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-blue-800 font-medium mb-1">
                              OTP Verification
                            </p>
                            <p className="text-xs text-blue-700">
                              We'll send a one-time password to your email for secure login.
                            </p>
                          </div>
                        </div>
                      </div>

                      {error && (
                        <div className="flex items-center space-x-2 text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          <span>{error}</span>
                        </div>
                      )}

                      <Button
                        type="submit"
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Sending OTP...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span>Send OTP</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        )}
                      </Button>
                    </form>
                  ) : (
                    <form onSubmit={handleOTPVerification} className="space-y-4">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Check Your Email
                        </h3>
                        <p className="text-sm text-gray-600">
                          We've sent a 6-digit code to <span className="font-medium">{email}</span>
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="otp" className="text-sm font-medium text-gray-700">
                          Enter OTP Code
                        </Label>
                        <Input
                          id="otp"
                          type="text"
                          placeholder="Enter 6-digit code"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className="h-12 text-center text-lg font-mono tracking-widest"
                          maxLength={6}
                          required
                        />
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Didn't receive the code?</span>
                        <button
                          type="button"
                          onClick={() => setOtpSent(false)}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Resend
                        </button>
                      </div>

                      {error && (
                        <div className="flex items-center space-x-2 text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          <span>{error}</span>
                        </div>
                      )}

                      <Button
                        type="submit"
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                        disabled={loading || otp.length !== 6}
                      >
                        {loading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Verifying...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span>Verify & Sign In</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        )}
                      </Button>
                    </form>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              © 2024 HEVA CreativeHub. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}