/**
 * CogniDeal AI — LexiGuard Contract Risk & Redline Tab
 * Copyright (c) 2026 Ujjwal Kumar Bhowmick. All rights reserved.
 * Developer: Ujjwal Kumar Bhowmick (ujjwalkumarbhowmick30@gmail.com)
 */

import React, { useState } from 'react';
import { ContractClause, RiskLevel } from '../../types/deal';
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  FileCheck,
  AlertOctagon,
  Scale,
  Send,
  Loader2,
} from 'lucide-react';
import { analyzeContractClauseWithGemini } from '../../services/geminiService';

interface LexiGuardTabProps {
  clauses: ContractClause[];
  onToggleRedline: (clauseId: string) => void;
}

export const LexiGuardTab: React.FC<LexiGuardTabProps> = ({
  clauses,
  onToggleRedline,
}) => {
  // Custom clause analyzer state
  const [customClauseText, setCustomClauseText] = useState('');
  const [customCategory, setCustomCategory] = useState('Indemnification');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const getRiskBadge = (risk: RiskLevel) => {
    switch (risk) {
      case 'critical':
        return <span className="badge badge-rose text-xs uppercase font-mono">Critical Risk (90+)</span>;
      case 'high':
        return <span className="badge badge-amber text-xs uppercase font-mono">High Liability</span>;
      case 'medium':
        return <span className="badge badge-cyan text-xs uppercase font-mono">Guarded Review</span>;
      case 'low':
      default:
        return <span className="badge badge-emerald text-xs uppercase font-mono">Institutional Standard</span>;
    }
  };

  const handleAnalyzeCustomClause = async () => {
    if (!customClauseText.trim()) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const res = await analyzeContractClauseWithGemini(customClauseText, customCategory);
      setAnalysisResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Overview Banner */}
      <div className="glass-panel p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-rose text-xs">Autonomous Clause Redline Engine</span>
            <span className="text-xs font-mono text-slate-400">GC Benchmark v4.2</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            LexiGuard Contract Risk Scorecard & Redline Suite
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Autonomous multi-vector contract liability scan. Identified predatory indemnity, uncapped damages, and SLA penalty traps.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-slate-900/80 px-3.5 py-2 rounded-xl border border-white/10 shrink-0">
          <Scale className="w-4 h-4 text-indigo-400" />
          <span>
            Accepted:{' '}
            <strong className="text-emerald-400">
              {clauses.filter((c) => c.isRedlineAccepted).length}
            </strong>{' '}
            / {clauses.length} Redlines
          </span>
        </div>
      </div>

      {/* Interactive Clause Ingestion & Live Redline Sandbox */}
      <div className="glass-panel p-5 border-l-4 border-l-rose-500">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-rose-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Interactive LexiGuard Sandbox: Analyze Any Contract Clause
          </h4>
        </div>
        <p className="text-xs text-slate-400 mb-3">
          Paste an arbitrary contract clause from an inbound MSA, SOW, or SLA below to run an instant deep legal vulnerability scan and generate an institutional-grade redline.
        </p>

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              className="bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
            >
              <option value="Indemnification">Indemnification & Defense</option>
              <option value="Limitation of Liability">Limitation of Liability & Caps</option>
              <option value="SLA Penalties">SLA Uptime & Liquidated Damages</option>
              <option value="Termination">Termination for Convenience</option>
              <option value="IP & AI Model Rights">IP & Model Training Ownership</option>
              <option value="Escrow">Source Code Escrow Triggers</option>
            </select>

            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={customClauseText}
                onChange={(e) => setCustomClauseText(e.target.value)}
                placeholder="e.g. Vendor shall indemnify Customer without financial limitation against any indirect or consequential claims..."
                onKeyDown={(e) => e.key === 'Enter' && handleAnalyzeCustomClause()}
                className="flex-1 bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500 font-mono"
              />

              <button
                onClick={handleAnalyzeCustomClause}
                disabled={isAnalyzing || !customClauseText.trim()}
                className="btn-danger text-xs shrink-0"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Scan Clause</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Analysis Result Box */}
          {analysisResult && (
            <div className="p-4 rounded-xl bg-slate-950/90 border border-rose-500/30 animate-fadeIn">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertOctagon className="w-4 h-4 text-rose-400" />
                  <span className="text-xs font-bold text-white">
                    Scan Result ({analysisResult.source})
                  </span>
                </div>
                {getRiskBadge(analysisResult.riskLevel)}
              </div>

              <p className="text-xs text-rose-200/90 mb-3 bg-rose-950/30 p-2.5 rounded border border-rose-500/20">
                <strong>Vulnerability Analysis:</strong> {analysisResult.riskAnalysis}
              </p>

              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30">
                <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Proposed Balanced Redline
                </div>
                <div className="text-xs text-emerald-100 font-mono leading-relaxed mb-2">
                  "{analysisResult.proposedRedline}"
                </div>
                <div className="text-[11px] text-slate-400">
                  <strong className="text-slate-300">Strategic Rationale:</strong> {analysisResult.rationale}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Flagged Inbound Clauses List */}
      <div className="space-y-4">
        {clauses.map((clause) => (
          <div
            key={clause.id}
            className={`glass-panel p-5 transition-all ${
              clause.isRedlineAccepted
                ? 'border-emerald-500/40 bg-emerald-950/10'
                : 'border-white/10'
            }`}
          >
            {/* Clause Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-indigo-400">
                  {clause.section}
                </span>
                <span className="text-slate-600">•</span>
                <h4 className="text-sm font-bold text-white">{clause.title}</h4>
              </div>

              <div className="flex items-center gap-3">
                {getRiskBadge(clause.riskLevel)}
                <button
                  onClick={() => onToggleRedline(clause.id)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                    clause.isRedlineAccepted
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                      : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-500/20'
                  }`}
                >
                  {clause.isRedlineAccepted ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Redline Accepted</span>
                    </>
                  ) : (
                    <>
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Accept LexiGuard Redline</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Risk Explanation */}
            <div className="mb-4 text-xs text-rose-300/90 bg-rose-950/20 p-2.5 rounded-lg border border-rose-500/20 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong>Legal Exposure:</strong> {clause.riskAnalysis}
              </div>
            </div>

            {/* Comparison Grid: Inbound Draft vs Balanced Redline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Original Predatory Text */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/10">
                <div className="text-[11px] font-bold text-rose-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5" /> Inbound Customer Draft (High Exposure)
                </div>
                <p className="text-xs text-slate-300 font-mono leading-relaxed">
                  "{clause.originalText}"
                </p>
              </div>

              {/* Proposed Balanced Redline */}
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> LexiGuard Proposed Redline (Safe Harbor)
                </div>
                <p className="text-xs text-emerald-100 font-mono leading-relaxed mb-2">
                  "{clause.proposedRedline}"
                </p>
                <div className="text-[11px] text-slate-400 border-t border-emerald-500/20 pt-1.5">
                  <strong className="text-slate-300">Rationale:</strong> {clause.rationale}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
