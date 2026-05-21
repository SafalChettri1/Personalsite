import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, RefreshCw, Mail, MessageSquare, Briefcase, FileText } from 'lucide-react';
import { Message } from '../types';
import { PORTFOLIO_OWNER } from '../constants';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ name: string; email: string; message: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const apiUrl = (import.meta as any).env?.VITE_API_URL ?? 'http://localhost:3001';
  
  // Custom interactive mock messenger state
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Greetings! I'm Sudip's terminal helper. What are you looking to collaborate on today? Click one of the quick actions below to query my state directly.",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to end of mockup chat
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isTyping]);

  // Handle preset interactive triggers
  const triggerPresetResponses = (option: 'project' | 'hello' | 'resume') => {
    let userMsg = '';
    let replyMsg = '';

    if (option === 'project') {
      userMsg = "I'd like to talk about a new engineering project.";
      replyMsg = "Excellent! Sudip specializes in secure offline synchronization databases and mobile engineering. Please fill in the contact card on the right with your design criteria, budget scale, and schedule parameters so we can evaluate scope.";
    } else if (option === 'hello') {
      userMsg = "Just wanted to say hello!";
      replyMsg = "Hello back! Always glad to connect with fellow builders and founders in Kathmandu or globally. Leave your details across the panel and we will sync up for coffee soon!";
    } else if (option === 'resume') {
      userMsg = "Can I request Sudip's updated offline software engineering specsheet / CV?";
      replyMsg = "Certainly! I've flagged this request. Direct CV files, PDF indices, and specific secure references can be dispatched to your email immediately upon submitting the contact form on the right.";
    }

    // Append user message
    const userMsgObj: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userMsg,
      timestamp: new Date()
    };

    setChatMessages((prev) => [...prev, userMsgObj]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const assistantMsgObj: Message = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: replyMsg,
        timestamp: new Date()
      };
      setChatMessages((prev) => [...prev, assistantMsgObj]);
    }, 1200);
  };

  // Handle standard manual contact submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const submitted = { ...formData };
    const html = `
      <p>Hi Sudip,</p>
      <p>You have received a new contact submission through your portfolio website:</p>
      <ul>
        <li><strong>Sender Name:</strong> ${submitted.name}</li>
        <li><strong>Sender Email:</strong> ${submitted.email}</li>
      </ul>
      <p><strong>Message:</strong></p>
      <p>${submitted.message.replace(/\n/g, '<br/>')}</p>
      <p>Best regards,<br/>${submitted.name}</p>
    `;

    try {
      const response = await fetch(`${apiUrl}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: PORTFOLIO_OWNER.recipientEmails,
          subject: `Inquiry from ${submitted.name} via Portfolio`,
          html
        })
      });

     if (!response.ok) {
  const errorData = await response.json().catch(() => null);
  throw new Error(errorData?.error || `Email service failed with status ${response.status}`);
}

      const storedMails = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
      storedMails.push({
        ...submitted,
        id: `msg-${Date.now()}`,
        date: new Date().toISOString()
      });
      localStorage.setItem('portfolio_messages', JSON.stringify(storedMails));

      setSubmittedData(submitted);
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      setChatMessages((prev) => [
        ...prev,
        {
          id: `sys-${Date.now()}`,
          sender: 'system',
          text: `Secure email dispatch completed for client "${submitted.name}". Message stored locally and sent through the backend service.`,
          timestamp: new Date()
        }
      ]);
    } catch (error) {
  console.error('Frontend contact email error:', error);
  setErrorMessage(
    error instanceof Error
      ? error.message
      : 'Unable to send the message right now.'
  );
  setIsSubmitting(false);
}
  };

  return (
    <section id="contact" className="py-32 px-6 md:px-12 bg-[#0a0a0a] border-b border-white/5">
      <div className="mx-auto w-full max-w-7xl">
        
        {/* Banner Section Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-white/40 mb-3">
            ESTABLISH LINK
          </p>
          <h2 className="font-display text-4xl font-normal leading-none text-white md:text-5xl lg:text-5xl tracking-tight">
            Let's Build Something <span className="italic text-white/55 font-serif">incredible</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Side: Mock Messenger with Live preset logic */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-none border border-white/10 bg-[#0d0d0d] overflow-hidden p-6 md:p-8">
            <div>
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-none bg-white animate-pulse" />
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/70">
                    INTERACTIVE SYSTEM SIMULATOR
                  </span>
                </div>
                <button
                  onClick={() => {
                    setChatMessages([
                      {
                        id: 'welcome',
                        sender: 'assistant',
                        text: "Greetings! I'm Sudip's terminal helper. What are you looking to collaborate on today? Click one of the quick actions below to query my state directly.",
                        timestamp: new Date()
                      }
                    ]);
                  }}
                  className="rounded-none p-1.5 text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                  title="Reset dialog state"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Chat View Scrollable area */}
              <div className="h-80 overflow-y-auto pr-2 space-y-4 font-mono text-[10px]">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[85%] ${
                      msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                    }`}
                  >
                    <span className="text-[8px] text-white/30 mb-1 uppercase tracking-wider">
                      {msg.sender === 'user' ? 'Visitor' : msg.sender === 'system' ? 'Subsystem Log' : 'On-Device Agent'}
                    </span>
                    <div
                      className={`rounded-none px-4 py-2.5 leading-relaxed tracking-wide ${
                        msg.sender === 'user'
                          ? 'bg-white text-black font-semibold'
                          : msg.sender === 'system'
                          ? 'bg-black/50 text-white/40 border border-white/5'
                          : 'bg-[#121212] text-white/80 border border-white/10'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex flex-col items-start max-w-[80%]">
                    <span className="text-[8px] text-white/30 mb-1 uppercase tracking-reverse">System Typing...</span>
                    <div className="rounded-none border border-white/10 bg-[#121212] px-4 py-2.5 text-white/40">
                      <span className="inline-flex gap-1">
                        <span className="h-1 w-1 rounded-full bg-white opacity-45 animate-bounce" />
                        <span className="h-1 w-1 rounded-full bg-white opacity-45 animate-bounce [animation-delay:0.2s]" />
                        <span className="h-1 w-1 rounded-full bg-white opacity-45 animate-bounce [animation-delay:0.4s]" />
                      </span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Quick action preset clicks */}
            <div className="mt-8 border-t border-white/10 pt-6 space-y-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 mb-2">
                SELECT QUICK QUERY:
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => triggerPresetResponses('project')}
                  className="flex items-center gap-2 rounded-none border border-white/10 bg-[#141414] hover:bg-white hover:text-black hover:border-white px-3.5 py-2 font-mono text-[8px] font-bold uppercase tracking-wider text-white/75 transition-all cursor-pointer"
                >
                  <Briefcase className="h-3 w-3" /> Project Inquiry
                </button>
                <button
                  onClick={() => triggerPresetResponses('hello')}
                  className="flex items-center gap-2 rounded-none border border-white/10 bg-[#141414] hover:bg-white hover:text-black hover:border-white px-3.5 py-2 font-mono text-[8px] font-bold uppercase tracking-wider text-white/75 transition-all cursor-pointer"
                >
                  <MessageSquare className="h-3 w-3" /> Say Hello
                </button>
                <button
                  onClick={() => triggerPresetResponses('resume')}
                  className="flex items-center gap-2 rounded-none border border-white/10 bg-[#141414] hover:bg-white hover:text-black hover:border-white px-3.5 py-2 font-mono text-[8px] font-bold uppercase tracking-wider text-white/75 transition-all cursor-pointer"
                >
                  <FileText className="h-3 w-3" /> Request CV
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Secure Contact card Submission Card with transition success banner */}
          <div className="lg:col-span-6 rounded-none border border-white/10 bg-[#0d0d0d] p-8 md:p-10 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-white font-bold uppercase mb-4">
                    <Mail className="h-3.5 w-3.5" /> SECURE TRANSMISSION DISPATCH
                  </div>

                  {errorMessage && (
                    <p className="text-sm text-red-400 font-mono mb-2">
                      {errorMessage}
                    </p>
                  )}

                  {/* Name field */}
                  <div>
                    <label htmlFor="form-name" className="block font-mono text-[9px] uppercase text-white/40 mb-2 tracking-[0.2em]">
                      YOUR IDENTITY / NAME
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Founder, CEO, Lead Dev etc."
                      className="w-full rounded-none border border-white/10 bg-black/40 px-4 py-3 font-mono text-xs text-white focus:outline-none focus:border-white transition-colors placeholder-white/20"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label htmlFor="form-email" className="block font-mono text-[9px] uppercase text-white/40 mb-2 tracking-[0.2em]">
                      COMMUNICATION ENDPOINT (EMAIL)
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. partner@firm.com"
                      className="w-full rounded-none border border-white/10 bg-black/40 px-4 py-3 font-mono text-xs text-white focus:outline-none focus:border-white transition-colors placeholder-white/20"
                    />
                  </div>

                  {/* Message body field */}
                  <div>
                    <label htmlFor="form-message" className="block font-mono text-[9px] uppercase text-white/40 mb-2 tracking-[0.2em]">
                      DETAILED PROJECT CRITERIA / DISPATCH
                    </label>
                    <textarea
                      id="form-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline core objectives, budget scale parameters, schedule rules, etc."
                      className="w-full rounded-none border border-white/10 bg-black/40 px-4 py-3 font-mono text-xs text-white focus:outline-none focus:border-white transition-colors placeholder-white/20 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-3 rounded-none border border-white/20 bg-white hover:bg-gray-100 text-black py-4 font-mono text-[10px] font-bold uppercase tracking-[0.25em] transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? 'Securing transmission...' : 'Dispatch Message'} <Send className="h-3.5 w-3.5" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-card"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="text-center p-6 space-y-6"
                >
                  <div className="mx-auto h-12 w-12 rounded-none border border-white/20 bg-white/5 flex items-center justify-center text-white shadow-lg">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-sans text-xl font-bold uppercase text-white tracking-wide mb-2">
                      Handshake Accomplished
                    </h3>
                    <p className="font-mono text-xs text-white/50 leading-relaxed max-w-sm mx-auto tracking-wide">
                      Your transmission details have been saved securely to local cache logs. Sudip will reach out directly to your provided email endpoint inside 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/60 hover:text-white underline cursor-pointer"
                  >
                    Send Another Transmission
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

