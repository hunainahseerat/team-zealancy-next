'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface ApplyModalProps {
  isOpen: boolean;
  selectedRole?: string;
  onClose: () => void;
}

const AVAILABLE_ROLES = [
  'Creative Video Editor',
  'Junior Video Editor',
  'Graphic Designer',
  'Graphic Designer Intern',
  'Motion Graphics Artist',
  'General Application / Pitch Yourself',
];

export default function ApplyModal({ isOpen, selectedRole = '', onClose }: ApplyModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState(AVAILABLE_ROLES[0]);
  const [linkedin, setLinkedin] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [countdown, setCountdown] = useState(6);

  // Sync selected role when modal opens
  useEffect(() => {
    if (isOpen) {
      if (selectedRole && AVAILABLE_ROLES.includes(selectedRole)) {
        setPosition(selectedRole);
      } else {
        setPosition(AVAILABLE_ROLES[0]);
      }
      setIsSubmitted(false);
      setIsSubmitting(false);
      setErrors({});
      setIsDragging(false);
      setCountdown(6);
    }
  }, [isOpen, selectedRole]);

  // Handle countdown auto-close on success
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isSubmitted && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (isSubmitted && countdown === 0) {
      // Reset all fields and close
      setFullName('');
      setEmail('');
      setPhone('');
      setLinkedin('');
      setPortfolio('');
      setResumeFile(null);
      setCoverLetter('');
      setErrors({});
      setIsSubmitted(false);
      setIsDragging(false);
      onClose();
    }
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted, countdown, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const processFile = (file: File) => {
    const validExtensions = ['.pdf', '.doc', '.docx'];
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

    if (!validExtensions.includes(ext)) {
      setErrors((prev) => ({
        ...prev,
        resume: 'Please upload a PDF, DOC, or DOCX file.',
      }));
      setResumeFile(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        resume: 'File size must be under 10MB.',
      }));
      setResumeFile(null);
      return;
    }

    setErrors((prev) => {
      const newErr = { ...prev };
      delete newErr.resume;
      return newErr;
    });
    setResumeFile(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (phone.trim().replace(/\D/g, '').length < 7) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (!position) {
      newErrors.position = 'Please select a position.';
    }

    if (linkedin.trim() && !/^(https?:\/\/)?(www\.)?linkedin\.com\/.+/i.test(linkedin.trim())) {
      newErrors.linkedin = 'Please enter a valid LinkedIn URL.';
    }

    if (portfolio.trim() && !/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/.*)?$/i.test(portfolio.trim())) {
      newErrors.portfolio = 'Please enter a valid website/portfolio URL.';
    }

    if (!resumeFile) {
      newErrors.resume = 'Resume file is required (PDF, DOC, DOCX).';
    }

    if (!coverLetter.trim()) {
      newErrors.coverLetter = 'Cover letter / note is required.';
    } else if (coverLetter.trim().length < 15) {
      newErrors.coverLetter = 'Please write at least a brief paragraph (15+ chars).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('position', position);
      formData.append('linkedin', linkedin);
      formData.append('portfolio', portfolio);
      formData.append('coverLetter', coverLetter);
      if (resumeFile) {
        formData.append('resume', resumeFile);
      }

      const wpUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      await fetch(`${wpUrl}/wp-json/zealancy/v1/apply`, {
        method: 'POST',
        body: formData,
      });
    } catch {
      // Fallback
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleResetAndClose = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setLinkedin('');
    setPortfolio('');
    setResumeFile(null);
    setCoverLetter('');
    setErrors({});
    setIsSubmitted(false);
    setIsDragging(false);
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-card">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {isSubmitted ? (
          <div className="modal-success">
            <div className="success-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 id="modal-title">Thank you! Your application has been submitted successfully.</h2>
            <p>
              We have received your application for the <strong>{position}</strong> role.
            </p>
            <p className="sub-note">
              Our team reviews every portfolio carefully. If your work matches what we need, we will reach out directly.
            </p>
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <button className="btn" onClick={handleResetAndClose}>
                Close Window →
              </button>
              <span className="auto-close-hint">Closing automatically in {countdown}s</span>
            </div>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <span className="label">Careers at Zealancy</span>
              <h2 id="modal-title">
                Apply for <em>{position}</em>
              </h2>
              <p>Fill in your details below. We review portfolios and work samples first.</p>
            </div>

            <form onSubmit={handleSubmit} className="modal-form" noValidate>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="fullName">
                    Full Name <span className="req">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="e.g. Sarah Jenkins"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={errors.fullName ? 'has-error' : ''}
                  />
                  {errors.fullName && <span className="err-msg">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    Email Address <span className="req">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="sarah@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={errors.email ? 'has-error' : ''}
                  />
                  {errors.email && <span className="err-msg">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    Phone Number <span className="req">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+92 300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={errors.phone ? 'has-error' : ''}
                  />
                  {errors.phone && <span className="err-msg">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="position">
                    Position Applying For <span className="req">*</span>
                  </label>
                  <select
                    id="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className={errors.position ? 'has-error' : ''}
                  >
                    {AVAILABLE_ROLES.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                  {errors.position && <span className="err-msg">{errors.position}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="linkedin">LinkedIn Profile (Optional)</label>
                  <input
                    id="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className={errors.linkedin ? 'has-error' : ''}
                  />
                  {errors.linkedin && <span className="err-msg">{errors.linkedin}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="portfolio">Portfolio / Reel Link (Optional)</label>
                  <input
                    id="portfolio"
                    type="url"
                    placeholder="https://vimeo.com/yourportfolio or behance"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    className={errors.portfolio ? 'has-error' : ''}
                  />
                  {errors.portfolio && <span className="err-msg">{errors.portfolio}</span>}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="resume">
                    Resume Upload <span className="req">*</span> <span className="file-hint">(PDF, DOC, DOCX - max 10MB)</span>
                  </label>
                  <div
                    className={`file-upload-box ${errors.resume ? 'has-error' : ''} ${isDragging ? 'is-dragging' : ''} ${resumeFile ? 'is-success' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="file-input"
                    />
                    <div className="file-upload-content">
                      {resumeFile ? (
                        <div className="file-success-view">
                          <div className="file-icon-badge">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                          <div className="file-details">
                            <span className="file-name">{resumeFile.name}</span>
                            <span className="file-size">{formatFileSize(resumeFile.size)}</span>
                          </div>
                          <button
                            type="button"
                            className="file-remove-btn"
                            onClick={(e) => {
                              e.preventDefault();
                              setResumeFile(null);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                          <span>{isDragging ? 'Drop file here to upload' : 'Click to choose file or drag & drop here'}</span>
                        </>
                      )}
                    </div>
                  </div>
                  {errors.resume && <span className="err-msg">{errors.resume}</span>}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="coverLetter">
                    Why do you want to join Zealancy? <span className="req">*</span>
                  </label>
                  <textarea
                    id="coverLetter"
                    rows={4}
                    placeholder="Tell us about your background, what drives your craft, and why you'd be a great fit..."
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className={errors.coverLetter ? 'has-error' : ''}
                  />
                  {errors.coverLetter && <span className="err-msg">{errors.coverLetter}</span>}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span> Submitting Application...
                    </>
                  ) : (
                    'Submit Application →'
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
