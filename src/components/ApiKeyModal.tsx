/**
 * CogniDeal AI — Gemini API Key & Model Configuration Modal
 * Copyright (c) 2026 Ujjwal Kumar Bhowmick. All rights reserved.
 * Developer: Ujjwal Kumar Bhowmick (ujjwalkumarbhowmick30@gmail.com)
 */

import React, { useState } from 'react';
import {
  GeminiConfig,
  getStoredGeminiConfig,
  saveGeminiConfig,
} from '../services/geminiService';
import { X, Key, Sparkles, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigSaved: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  onConfigSaved,
}) => {
  const [config, setConfig] = useState<GeminiConfig>(getStoredGeminiConfig());
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'failed'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    saveGeminiConfig(config);
    onConfigSaved();
    onClose();
  };

  const handleTestConnection = async () => {
    if (!config.apiKey.trim()) {
      setTestStatus('failed');
      setErrorMessage('Please enter an API key first.');
      return;
    }

    setTestStatus('testing');
    setErrorMessage('');

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${config.model}?key=${config.apiKey.trim()}`
      );
      if (res.ok) {
        setTestStatus('success');
      } else {
        const data = await res.json();
        setTestStatus('failed');
        setErrorMessage(data?.error?.message || 'Invalid API key or model access.');
      }
    } catch (e: any) {
      setTestStatus('failed');
      setErrorMessage(e?.message || 'Network error connecting to Gemini API.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg glass-panel-elevated bg-[#0e1524] border border-white/20 p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Google Gemini Vertex AI Credentials</h3>
            <p className="text-xs text-slate-400">
              Configure real-time generative intelligence for LexiGuard & Copilot
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mb-4 p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-xs text-slate-300 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <strong>Zero-Setup Simulation Included:</strong> Even without an API key, CogniDeal AI features high-precision offline neural heuristics across all 4 enterprise B2B deal scenarios. Adding an API key enables live arbitrary contract clause analysis.
          </div>
        </div>

        {/* API Key Input */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Gemini API Key
          </label>
          <input
            type="password"
            value={config.apiKey}
            onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
            placeholder="AIzaSy..."
            className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-mono placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Model Selection */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Gemini Model Tier
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash', badge: 'Ultra-Fast' },
              { id: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro', badge: 'Deep Reasoning' },
              { id: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash', badge: 'Standard' },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setConfig({ ...config, model: m.id as any })}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  config.model === m.id
                    ? 'bg-indigo-600/20 border-indigo-500 text-white'
                    : 'bg-slate-900/60 border-white/10 text-slate-400 hover:border-white/20'
                }`}
              >
                <div className="text-xs font-bold leading-tight">{m.label}</div>
                <span className="text-[10px] text-cyan-400 font-mono">{m.badge}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Test Connection Feedback */}
        {testStatus === 'success' && (
          <div className="mb-4 p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Connection verified successfully with Google Gemini API!</span>
          </div>
        )}

        {testStatus === 'failed' && (
          <div className="mb-4 p-2.5 rounded-lg bg-rose-950/30 border border-rose-500/30 flex items-center gap-2 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="truncate">{errorMessage || 'Connection failed.'}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={handleTestConnection}
            disabled={testStatus === 'testing'}
            className="btn-secondary text-xs"
          >
            {testStatus === 'testing' ? 'Testing...' : 'Test Connection'}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="btn-primary text-xs"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
