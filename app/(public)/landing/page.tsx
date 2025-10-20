import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Home, 
  Shield, 
  Smartphone, 
  Clock, 
  Users, 
  CheckCircle, 
  Star,
  ArrowRight,
  Heart,
  MapPin,
  Phone
} from 'lucide-react';
import { generateMetadata, generateOrganizationJsonLd } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: 'MedAid - Professional Home Healthcare Coordination',
  description: 'Streamline home healthcare delivery with our comprehensive platform for nurses, coordinators, and patients. Schedule visits, manage care plans, and ensure quality care.',
  keywords: ['home healthcare', 'nursing coordination', 'patient care', 'healthcare management', 'medical scheduling'],
});

const services = [
  {
    name: 'General Checkup',
    price: 120,
    duration: '30-60 min',
    description: 'Comprehensive health assessment and monitoring',
  },
  {
    name: 'Medication Management',
    price: 70,
    duration: '20-40 min',
    description: 'Medication administration and monitoring',
  },
  {
    name: 'Physical Therapy',
    price: 140,
    duration: '45-60 min',
    description: 'Therapeutic exercises and mobility assistance',
  },
  {
    name: 'Elder Care',
    price: 110,
    duration: '60-90 min',
    description: 'Comprehensive elder care services',
  },
  {
    name: 'Blood Test',
    price: 100,
    duration: '50-60 min',
    description: 'Blood sample collection and processing',
  },
];

const features = [
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'Efficiently coordinate visits with real-time availability and automated routing',
  },
  {
    icon: Home,
    title: 'Home Visits',
    description: 'Seamless in-home care delivery with location tracking and check-in/out',
  },
  {
    icon: Shield,
    title: 'Secure Records',
    description: 'HIPAA-compliant patient records with encrypted data transmission',
  },
  {
    icon: Smartphone,
    title: 'Mobile App',
    description: 'Nurse-friendly mobile interface for on-the-go care management',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Care Coordinator',
    content: 'MedAid has revolutionized how we manage our home care services. The scheduling system is intuitive and our nurses love the mobile app.',
    rating: 5,
  },
  {
    name: 'Dr. Michael Chen',
    role: 'Medical Director',
    content: 'The comprehensive care planning tools help us deliver better patient outcomes. The real-time updates keep everyone informed.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Registered Nurse',
    content: 'The mobile interface makes it so easy to check in, record vitals, and update care plans. It saves me hours every week.',
    rating: 5,
  },
];

const faqs = [
  {
    question: 'How does MedAid ensure patient privacy and data security?',
    answer: 'MedAid is built with HIPAA compliance in mind, featuring end-to-end encryption, secure data transmission, and comprehensive audit trails. All patient data is stored securely and access is strictly controlled.',
  },
  {
    question: 'Can nurses use MedAid on their mobile devices?',
    answer: 'Yes! MedAid includes a fully responsive mobile app optimized for nurses. Features include GPS check-in/out, quick vitals entry, care task management, and real-time communication.',
  },
  {
    question: 'How does the scheduling system work?',
    answer: 'Our smart scheduling system considers nurse availability, patient needs, location optimization, and care requirements to automatically suggest the best visit times and routes.',
  },
  {
    question: 'What types of care services can be managed through MedAid?',
    answer: 'MedAid supports a wide range of home healthcare services including general checkups, medication management, physical therapy, elder care, blood testing, and specialized care programs.',
  },
  {
    question: 'Is there training available for new users?',
    answer: 'Yes, we provide comprehensive onboarding and training for all users. This includes video tutorials, documentation, and live training sessions to ensure smooth adoption.',
  },
  {
    question: 'How does billing and payment processing work?',
    answer: 'MedAid includes built-in billing management with automated invoice generation, payment tracking, and insurance integration. We support multiple payment methods and provide detailed financial reporting.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-neutral-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-neutral-900">MedAid</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-neutral-600 hover:text-primary-600 transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-neutral-600 hover:text-primary-600 transition-colors">
                Pricing
              </a>
              <a href="#faq" className="text-neutral-600 hover:text-primary-600 transition-colors">
                FAQ
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/sign-in">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/sign-in">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Trusted by 500+ Healthcare Providers
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
              Streamline Home Healthcare
              <span className="text-primary-600 block">Coordination</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
              Empower your nursing team with intelligent scheduling, real-time care coordination, 
              and comprehensive patient management tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-in">
                <Button size="lg" className="text-lg px-8">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Everything You Need for Home Healthcare
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Our comprehensive platform streamlines every aspect of home healthcare delivery
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Transparent Pricing
            </h2>
            <p className="text-xl text-neutral-600">
              Clear, competitive rates for all our healthcare services
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary-600">
                    ${service.price}
                  </div>
                  <Badge variant="outline" className="w-fit mx-auto">
                    {service.duration}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600 text-sm text-center">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-neutral-600">
              Trusted by healthcare professionals across Canada
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-neutral-600 mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-neutral-900">{testimonial.name}</p>
                    <p className="text-sm text-neutral-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-neutral-600">
              Everything you need to know about MedAid
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Home Healthcare?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of healthcare providers who trust MedAid for their home care coordination
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-in">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 text-white border-white hover:bg-white hover:text-primary-600">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-primary-400" />
                <span className="text-xl font-bold">MedAid</span>
              </div>
              <p className="text-neutral-400 mb-4">
                Professional home healthcare coordination platform for nurses and care teams.
              </p>
              <div className="flex space-x-4">
                <MapPin className="h-5 w-5 text-neutral-400" />
                <span className="text-sm text-neutral-400">Toronto, ON, Canada</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Training</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+1 (416) 555-0000</span>
                </li>
                <li>support@medaid.ca</li>
                <li>sales@medaid.ca</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-sm text-neutral-400">
            <p>&copy; 2024 MedAid. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateOrganizationJsonLd()),
        }}
      />
    </div>
  );
}








