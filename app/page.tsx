import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, BarChart3, FileText, Clock, Shield } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">LeaseLight</span>
          </div>
          <div className="space-x-4">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-gradient-to-b from-background to-muted py-24">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Simplify Your Lease Accounting
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              LeaseLight automates your lease accounting process with intelligent classification, compliance reporting, and seamless integration with your accounting systems.
            </p>
            <div className="mt-10">
              <Link href="/signup">
                <Button size="lg" className="mr-4">
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline" size="lg">
                  Book a Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">PDF Processing</h3>
                  <p className="text-muted-foreground">
                    Extract lease data automatically with our OCR technology
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Classification Engine</h3>
                  <p className="text-muted-foreground">
                    Automatically classify leases with full decision trail
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Accounting Automation</h3>
                  <p className="text-muted-foreground">
                    Streamline journal entries and integrate with QuickBooks
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Audit & Compliance</h3>
                  <p className="text-muted-foreground">
                    Generate ASC 842-compliant reports with full audit trail
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">LeaseLight</span>
              </div>
              <p className="text-muted-foreground max-w-md">
                Simplifying lease accounting and compliance for businesses of all sizes.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-medium mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><Link href="/features" className="text-muted-foreground hover:text-foreground">Features</Link></li>
                  <li><Link href="/pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
                  <li><Link href="/demo" className="text-muted-foreground hover:text-foreground">Request Demo</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li><Link href="/docs" className="text-muted-foreground hover:text-foreground">Documentation</Link></li>
                  <li><Link href="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
                  <li><Link href="/support" className="text-muted-foreground hover:text-foreground">Support</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
                  <li><Link href="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
                  <li><Link href="/legal" className="text-muted-foreground hover:text-foreground">Legal</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} LeaseLight. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}