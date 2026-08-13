'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  getFaq, updateFaq, createFaqItem, deleteFaqItem,
  getHiringSteps, updateHiringStep,
  getBenefits, updateBenefit,
  getHeroWords, updateHeroWords,
} from '@/services/contentService';
import type { FaqItem, HiringStep, Benefit, HeroRotatorWord } from '@/types';
import { AdminLoadingState, AdminErrorState } from '@/components/admin/AdminStates';

type Tab = 'hero' | 'faq' | 'hiring' | 'benefits';

export default function AdminContentPage() {
  const [tab, setTab] = useState<Tab>('faq');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState<string | null>(null);
  const [toast, setToast] = useState('');

  const [faq, setFaq] = useState<FaqItem[]>([]);
  const [steps, setSteps] = useState<HiringStep[]>([]);
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [heroWords, setHeroWords] = useState<HeroRotatorWord[]>([]);

  const [addingFaq, setAddingFaq] = useState(false);
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2800); };

  const load = useCallback(async () => {
    try {
      const [f, s, b, h] = await Promise.all([getFaq(), getHiringSteps(), getBenefits(), getHeroWords()]);
      setFaq(f); setSteps(s); setBenefits(b); setHeroWords(h);
    } catch { setError('Failed to load content.'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const saveFaqItem = async (item: FaqItem) => {
    setSaving(item.id);
    await updateFaq(item.id, item);
    await load();
    setSaving(null);
    showToast('FAQ item saved.');
  };

  const handleAddFaq = async () => {
    if (!newFaqQ.trim() || !newFaqA.trim()) return;
    await createFaqItem({ question: newFaqQ, answer: newFaqA, order: faq.length + 1, isVisible: true });
    setNewFaqQ(''); setNewFaqA(''); setAddingFaq(false);
    await load();
    showToast('FAQ item added.');
  };

  const handleDeleteFaq = async (id: string) => {
    await deleteFaqItem(id);
    await load();
    showToast('FAQ item deleted.');
  };

  const saveStep = async (step: HiringStep) => {
    setSaving(step.id);
    await updateHiringStep(step.id, step);
    await load();
    setSaving(null);
    showToast('Step saved.');
  };

  const saveBenefit = async (b: Benefit) => {
    setSaving(b.id);
    await updateBenefit(b.id, b);
    await load();
    setSaving(null);
    showToast('Benefit saved.');
  };

  const saveHeroWord = async (id: string, word: string) => {
    const updated = heroWords.map((w) => (w.id === id ? { ...w, word } : w));
    await updateHeroWords(updated);
    await load();
    showToast('Hero words saved.');
  };

  const TABS: { key: Tab; label: string }[] = [
    { key: 'faq', label: 'FAQ' },
    { key: 'hiring', label: 'Hiring Steps' },
    { key: 'benefits', label: 'Benefits' },
    { key: 'hero', label: 'Hero Rotator' },
  ];

  if (loading) return <AdminLoadingState message="Loading content..." />;
  if (error) return <AdminErrorState message={error} />;

  return (
    <div className="adm-page">
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Website Content</h1>
          <p className="adm-page-sub">Edit site copy, FAQ, hiring steps and benefits.</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 28, borderBottom: '1px solid rgba(255,255,255,.07)', paddingBottom: 0 }}>
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              padding: '10px 18px', fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
              background: 'transparent', border: 'none', borderBottom: tab === t.key ? '2px solid #7b4fd6' : '2px solid transparent',
              color: tab === t.key ? '#c4a8ff' : '#6c6480',
              marginBottom: -1, transition: 'color .2s, border-color .2s',
            }}
          >{t.label}</button>
        ))}
      </div>

      {/* FAQ */}
      {tab === 'faq' && (
        <div>
          {faq.map((item) => (
            <div key={item.id} className="adm-content-item">
              <div className="adm-content-item-head">
                <span className="adm-content-item-label" style={{ fontSize: 12, color: '#4a4460' }}>#{item.order}</span>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <label className="adm-switch" style={{ width: 36, height: 20 }}>
                    <input type="checkbox" checked={item.isVisible} onChange={() => saveFaqItem({ ...item, isVisible: !item.isVisible })} />
                    <span className="adm-switch-slider" />
                  </label>
                  <span style={{ fontSize: 12, color: '#4a4460' }}>Visible</span>
                  <button className="adm-btn-icon" style={{ color: '#fca5a5' }} onClick={() => handleDeleteFaq(item.id)}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
                  </button>
                </div>
              </div>
              <div className="adm-form-group">
                <label className="adm-label">Question</label>
                <input className="adm-input" value={item.question} onChange={(e) => setFaq(faq.map(f => f.id === item.id ? { ...f, question: e.target.value } : f))} />
              </div>
              <div className="adm-form-group">
                <label className="adm-label">Answer</label>
                <textarea className="adm-textarea" value={item.answer} onChange={(e) => setFaq(faq.map(f => f.id === item.id ? { ...f, answer: e.target.value } : f))} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button className="adm-btn adm-btn-primary adm-btn-sm" onClick={() => saveFaqItem(item)} disabled={saving === item.id}>
                  {saving === item.id ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          ))}
          {addingFaq ? (
            <div className="adm-content-item">
              <div className="adm-form-group">
                <label className="adm-label">Question</label>
                <input className="adm-input" value={newFaqQ} onChange={(e) => setNewFaqQ(e.target.value)} placeholder="New question..." />
              </div>
              <div className="adm-form-group">
                <label className="adm-label">Answer</label>
                <textarea className="adm-textarea" value={newFaqA} onChange={(e) => setNewFaqA(e.target.value)} placeholder="Answer..." />
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => setAddingFaq(false)}>Cancel</button>
                <button className="adm-btn adm-btn-primary adm-btn-sm" onClick={handleAddFaq}>Add FAQ</button>
              </div>
            </div>
          ) : (
            <button className="adm-btn adm-btn-ghost" style={{ marginTop: 8 }} onClick={() => setAddingFaq(true)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add FAQ Item
            </button>
          )}
        </div>
      )}

      {/* Hiring Steps */}
      {tab === 'hiring' && (
        <div>
          {steps.map((step) => (
            <div key={step.id} className="adm-content-item">
              <div className="adm-content-item-head">
                <span className="adm-content-item-label">Step {step.number}</span>
              </div>
              <div className="adm-form-row">
                <div className="adm-form-group">
                  <label className="adm-label">Title</label>
                  <input className="adm-input" value={step.title} onChange={(e) => setSteps(steps.map(s => s.id === step.id ? { ...s, title: e.target.value } : s))} />
                </div>
                <div className="adm-form-group full">
                  <label className="adm-label">Description</label>
                  <textarea className="adm-textarea" value={step.description} onChange={(e) => setSteps(steps.map(s => s.id === step.id ? { ...s, description: e.target.value } : s))} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button className="adm-btn adm-btn-primary adm-btn-sm" onClick={() => saveStep(step)} disabled={saving === step.id}>
                  {saving === step.id ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Benefits */}
      {tab === 'benefits' && (
        <div>
          {benefits.map((b) => (
            <div key={b.id} className="adm-content-item">
              <div className="adm-form-row">
                <div className="adm-form-group">
                  <label className="adm-label">Title</label>
                  <input className="adm-input" value={b.title} onChange={(e) => setBenefits(benefits.map(x => x.id === b.id ? { ...x, title: e.target.value } : x))} />
                </div>
                <div className="adm-form-group full">
                  <label className="adm-label">Description</label>
                  <textarea className="adm-textarea" value={b.description} onChange={(e) => setBenefits(benefits.map(x => x.id === b.id ? { ...x, description: e.target.value } : x))} style={{ minHeight: 72 }} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button className="adm-btn adm-btn-primary adm-btn-sm" onClick={() => saveBenefit(b)} disabled={saving === b.id}>
                  {saving === b.id ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hero Rotator */}
      {tab === 'hero' && (
        <div>
          <p style={{ fontSize: 13.5, color: '#6c6480', marginBottom: 18 }}>
            These words rotate in the hero headline: &ldquo;We hire the best <strong style={{ color: '#9b6ff5' }}>editors</strong> in the creator economy.&rdquo;
          </p>
          {heroWords.map((w) => (
            <div key={w.id} className="adm-content-item" style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 12, color: '#4a4460', minWidth: 24 }}>#{w.order}</span>
              <input
                className="adm-input"
                style={{ flex: 1 }}
                value={w.word}
                onChange={(e) => setHeroWords(heroWords.map(x => x.id === w.id ? { ...x, word: e.target.value } : x))}
              />
              <button className="adm-btn adm-btn-primary adm-btn-sm" onClick={() => saveHeroWord(w.id, heroWords.find(x => x.id === w.id)?.word ?? w.word)}>Save</button>
            </div>
          ))}
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 28, right: 28, background: '#1a1626',
          border: '1px solid rgba(123,79,214,.5)', borderRadius: 10, padding: '12px 20px',
          fontSize: 13.5, color: '#c4a8ff', zIndex: 100, boxShadow: '0 8px 30px rgba(0,0,0,.4)',
          animation: 'admFadeIn .2s ease',
        }}>
          ✓ {toast}
        </div>
      )}
    </div>
  );
}
