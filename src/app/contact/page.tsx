'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ArcadeButton from '@/components/arcade/ArcadeButton';
import { useAudio } from '@/hooks/useAudio';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  const { playSound } = useAudio();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Player name required!';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email required!';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format!';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message cannot be empty!';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      playSound('back');
      return;
    }

    setIsSubmitting(true);
    playSound('confirm');

    try {
      const response = await fetch('https://formspree.io/f/xdaeoqjp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        playSound('start');
      } else {
        throw new Error('Failed to send');
      }
    } catch {
      alert('Failed to send message. Please try again!');
      playSound('back');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="h-screen w-screen overflow-hidden gradient-bg flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card p-8 md:p-12 text-center max-w-lg"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, repeat: 3 }}
            className="text-6xl mb-6"
          >
            📨
          </motion.div>
          <h2 className="font-arcade text-2xl text-green-400 mb-4">
            MESSAGE SENT!
          </h2>
          <p className="font-readable text-gray-300 mb-6">
            Thanks for reaching out! I&apos;ll get back to you as soon as possible.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/">
              <ArcadeButton variant="secondary">
                🏠 HOME
              </ArcadeButton>
            </Link>
            <Link href="/select">
              <ArcadeButton variant="primary">
                🎮 PROJECTS
              </ArcadeButton>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-arcade text-3xl md:text-4xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            CONTACT
          </h1>
          <p className="font-readable text-lg text-gray-300 mt-3">
            Send me a message • Let&apos;s connect!
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="glass-card p-6 md:p-8 space-y-6 flex-1"
        >
          {/* Name Field */}
          <div>
            <label className="font-arcade text-sm text-cyan-400 mb-2 block">
              PLAYER NAME
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name..."
              className={`w-full bg-white/5 border-2 ${
                errors.name ? 'border-red-500' : 'border-white/10 focus:border-cyan-500'
              } rounded-lg px-4 py-3 font-readable text-white placeholder-gray-500 
                outline-none transition-colors`}
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-arcade text-xs text-red-400 mt-1"
              >
                ⚠ {errors.name}
              </motion.p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="font-arcade text-sm text-cyan-400 mb-2 block">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className={`w-full bg-white/5 border-2 ${
                errors.email ? 'border-red-500' : 'border-white/10 focus:border-cyan-500'
              } rounded-lg px-4 py-3 font-readable text-white placeholder-gray-500 
                outline-none transition-colors`}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-arcade text-xs text-red-400 mt-1"
              >
                ⚠ {errors.email}
              </motion.p>
            )}
          </div>

          {/* Subject Field */}
          <div>
            <label className="font-arcade text-sm text-cyan-400 mb-2 block">
              SUBJECT <span className="text-gray-500">(optional)</span>
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What's this about?"
              className="w-full bg-white/5 border-2 border-white/10 focus:border-cyan-500 
                rounded-lg px-4 py-3 font-readable text-white placeholder-gray-500 
                outline-none transition-colors"
            />
          </div>

          {/* Message Field */}
          <div>
            <label className="font-arcade text-sm text-cyan-400 mb-2 block">
              YOUR MESSAGE
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here..."
              rows={5}
              className={`w-full bg-white/5 border-2 ${
                errors.message ? 'border-red-500' : 'border-white/10 focus:border-cyan-500'
              } rounded-lg px-4 py-3 font-readable text-white placeholder-gray-500 
                outline-none transition-colors resize-none`}
            />
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-arcade text-xs text-red-400 mt-1"
              >
                ⚠ {errors.message}
              </motion.p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <ArcadeButton
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
              glowing={!isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    ⏳
                  </motion.span>
                  SENDING...
                </span>
              ) : (
                '📤 SEND MESSAGE'
              )}
            </ArcadeButton>
          </div>
        </motion.form>

        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex justify-center gap-4"
        >
          <Link href="/">
            <ArcadeButton variant="secondary" size="sm">
              🏠 HOME
            </ArcadeButton>
          </Link>
          <Link href="/profile">
            <ArcadeButton variant="secondary" size="sm">
              👤 PROFILE
            </ArcadeButton>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
