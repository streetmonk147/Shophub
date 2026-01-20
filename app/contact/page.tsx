"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In a real app, this would send to an API
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-64 w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9e?w=1920&h=1080&fit=crop"
          alt="Contact Us"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container relative z-10 mx-auto flex h-full items-center px-4">
          <h1 className="text-4xl font-bold text-white">Contact Us</h1>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="rounded-md bg-green-50 p-4 text-green-800">
                  Thank you for your message! We'll get back to you soon.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold">Email</h3>
                  <p className="text-muted-foreground">support@shophub.com</p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Phone</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Address</h3>
                  <p className="text-muted-foreground">
                    123 Commerce Street
                    <br />
                    New York, NY 10001
                    <br />
                    United States
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Business Hours</h3>
                  <p className="text-muted-foreground">
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="relative h-64 overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                alt="Office Location"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
