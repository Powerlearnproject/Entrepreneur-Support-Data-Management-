import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  BookOpen, 
  PlayCircle, 
  FileText, 
  Download,
  Clock,
  CheckCircle,
  Star
} from 'lucide-react';
import type { User } from '../../App';

interface LoanEducationProps {
  user: User;
}

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: 'financial' | 'business' | 'compliance' | 'technology';
  progress: number;
  completed: boolean;
  rating: number;
  instructor: string;
  thumbnail: string;
}

export function LoanEducation({ user }: LoanEducationProps) {
  const [courses] = useState<Course[]>([
    {
      id: '1',
      title: 'Financial Management Fundamentals',
      description: 'Learn the basics of financial management for small businesses',
      duration: '2 hours',
      level: 'beginner',
      category: 'financial',
      progress: 75,
      completed: false,
      rating: 4.8,
      instructor: 'Dr. Sarah Johnson',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: '2',
      title: 'Business Plan Development',
      description: 'Create comprehensive business plans that attract investors',
      duration: '3 hours',
      level: 'intermediate',
      category: 'business',
      progress: 100,
      completed: true,
      rating: 4.9,
      instructor: 'Prof. Michael Chen',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: '3',
      title: 'Loan Application Best Practices',
      description: 'Master the art of preparing successful loan applications',
      duration: '1.5 hours',
      level: 'beginner',
      category: 'financial',
      progress: 0,
      completed: false,
      rating: 4.7,
      instructor: 'Jane Smith',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: '4',
      title: 'Digital Marketing for Entrepreneurs',
      description: 'Leverage digital tools to grow your business',
      duration: '4 hours',
      level: 'intermediate',
      category: 'technology',
      progress: 25,
      completed: false,
      rating: 4.6,
      instructor: 'Alex Rodriguez',
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: '5',
      title: 'Compliance and Legal Requirements',
      description: 'Understand legal obligations for small businesses',
      duration: '2.5 hours',
      level: 'advanced',
      category: 'compliance',
      progress: 0,
      completed: false,
      rating: 4.5,
      instructor: 'Attorney Lisa Wang',
      thumbnail: '/api/placeholder/300/200'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Courses', icon: BookOpen },
    { id: 'financial', name: 'Financial', icon: FileText },
    { id: 'business', name: 'Business', icon: BookOpen },
    { id: 'compliance', name: 'Compliance', icon: FileText },
    { id: 'technology', name: 'Technology', icon: PlayCircle }
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'beginner':
        return <Badge className="bg-green-100 text-green-800">Beginner</Badge>;
      case 'intermediate':
        return <Badge className="bg-yellow-100 text-yellow-800">Intermediate</Badge>;
      case 'advanced':
        return <Badge className="bg-red-100 text-red-800">Advanced</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'financial':
        return <FileText className="w-4 h-4" />;
      case 'business':
        return <BookOpen className="w-4 h-4" />;
      case 'compliance':
        return <FileText className="w-4 h-4" />;
      case 'technology':
        return <PlayCircle className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const completedCourses = courses.filter(course => course.completed).length;
  const totalCourses = courses.length;
  const averageProgress = courses.reduce((acc, course) => acc + course.progress, 0) / courses.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Loan Education Center</h2>
          <p className="text-muted-foreground">Enhance your business knowledge and skills</p>
        </div>
        <Button>
          <BookOpen className="w-4 h-4 mr-2" />
          Browse All Courses
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
                <p className="text-2xl font-bold">{totalCourses}</p>
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
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedCourses}</p>
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
                <p className="text-sm font-medium text-muted-foreground">Avg Progress</p>
                <p className="text-2xl font-bold">{Math.round(averageProgress)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Categories</CardTitle>
          <CardDescription>Filter courses by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <PlayCircle className="w-12 h-12 text-blue-600" />
            </div>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription className="mt-1">{course.description}</CardDescription>
                </div>
                {course.completed && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
              </div>
              <div className="flex items-center gap-2 mt-2">
                {getLevelBadge(course.level)}
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{course.duration}</span>
                  <span>{course.instructor}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    {course.completed ? 'Review' : 'Continue'}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Learning Path</CardTitle>
          <CardDescription>Recommended course sequence for optimal learning</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-green-600">1</span>
              </div>
              <div className="flex-1">
                <p className="font-medium">Financial Management Fundamentals</p>
                <p className="text-sm text-muted-foreground">Build a strong financial foundation</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Completed</Badge>
            </div>
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">2</span>
              </div>
              <div className="flex-1">
                <p className="font-medium">Business Plan Development</p>
                <p className="text-sm text-muted-foreground">Create compelling business plans</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
            </div>
            <div className="flex items-center gap-4 p-4 border rounded-lg opacity-60">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-gray-600">3</span>
              </div>
              <div className="flex-1">
                <p className="font-medium">Loan Application Best Practices</p>
                <p className="text-sm text-muted-foreground">Master loan application process</p>
              </div>
              <Badge variant="secondary">Locked</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 