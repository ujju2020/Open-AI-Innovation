/**
 * CogniDeal AI — TrustVertex Security & Compliance Tab
 * Copyright (c) 2026 Ujjwal Kumar Bhowmick. All rights reserved.
 * Developer: Ujjwal Kumar Bhowmick (ujjwalkumarbhowmick30@gmail.com)
 */

import React, { useState } from 'react';
import { SecurityCompliance, SecurityQuestion } from '../../types/deal';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Send,
  Lock,
  FileCheck,
  Award,
} from 'lucide-react';

interface TrustVertexTabProps {
  securityData: SecurityCompliance;
}

export const TrustVertexTab: React.FC<TrustVertexTabProps> = ({
  securityData,
}) => {
  const [questions, setQuestions] = useState<SecurityQuestion[]>(
    securityData.questionnaire
  );
  const [customQuestion, setCustomQuestion] = useState('');
  const [isSolving, setIsSolving] = useState(false);

  const handleSolveQuestion = () => {
    if (!customQuestion.trim()) return;
    setIsSolving(true);

    setTimeout(() => {
      const newQ: SecurityQuestion = {
        id: `sq-${Date.now()}`,
        question: customQuestion.trim(),
        standard: 'SOC2 Type II',
        answer: 'Yes, platform enforces rate-limiting at 10,000 req/min per tenant, backed by automated IP throttling and WAF DDoS mitigation.',
        confidenceScore: 99.8,
        evidenceReference: 'Cloud Infrastructure SecOps Runbook Section 8.4'
      };
      setQuestions([newQ, ...questions]);
      setCustomQuestion('');
      setIsSolving(false);
    }, 650);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-cyan text-xs">Autonomous Security Attestation</span>
            <span className="text-xs font-mono text-slate-400">Zero Trust Framework</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            TrustVertex Security & Regulatory Compliance Suite
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Instantaneous verification of vendor security questionnaires against verified SOC2, ISO 27001, GDPR, and EU AI Act control libraries.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-white/10 shrink-0">
          <Award className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono text-emerald-400 font-bold">100% Audit Verified</span>
        </div>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {securityData.certifications.map((cert) => (
          <div key={cert.name} className="glass-card p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="badge badge-emerald text-[10px]">{cert.status}</span>
              </div>
              <h5 className="text-xs font-bold text-white mb-2 leading-tight">
                {cert.name}
              </h5>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                <span>Coverage</span>
                <span className="text-emerald-400 font-bold">{cert.coveragePercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
                <div
                  style={{ width: `${cert.coveragePercent}%` }}
                  className="h-full bg-emerald-500 rounded-full"
                />
              </div>
              <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" />
                <span>Audit Valid: {cert.validUntil}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Questionnaire Solver Sandbox */}
      <div className="glass-panel p-5 border-l-4 border-l-cyan-500">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Interactive TrustVertex Security Questionnaire Solver
          </h4>
        </div>
        <p className="text-xs text-slate-400 mb-3">
          Paste any security review question from an enterprise vendor onboarding questionnaire (e.g. SIG Lite, CAIQ, VSAQ) for instant citation-backed resolution.
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            placeholder="e.g. How are tenant cryptographic keys managed, and who has physical access to hardware HSMs?"
            onKeyDown={(e) => e.key === 'Enter' && handleSolveQuestion()}
            className="flex-1 bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
          />

          <button
            onClick={handleSolveQuestion}
            disabled={isSolving || !customQuestion.trim()}
            className="btn-primary text-xs shrink-0"
          >
            {isSolving ? (
              <span>Resolving...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Auto-Attest Question</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Verified Security Answers Table */}
      <div className="glass-panel p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-400" />
            <h4 className="text-sm font-bold text-white">
              Vendor Questionnaire Audit Matrix ({questions.length} Questions)
            </h4>
          </div>
          <span className="text-xs font-mono text-slate-400">SOC2 & ISO Certified</span>
        </div>

        <div className="space-y-3">
          {questions.map((q) => (
            <div
              key={q.id}
              className="p-4 rounded-xl bg-slate-900/60 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="badge badge-indigo text-[10px]">{q.standard}</span>
                  <span className="text-xs font-bold text-white">{q.question}</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{q.confidenceScore}% Confidence</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-black/30 p-2.5 rounded-lg border border-white/5 mb-2">
                {q.answer}
              </p>

              <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-cyan-400" />
                <span>Audit Evidence Reference: <strong className="text-slate-300">{q.evidenceReference}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
