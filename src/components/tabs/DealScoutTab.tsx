/**
 * CogniDeal AI — DealScout RFP Architect Tab
 * Copyright (c) 2026 Ujjwal Kumar Bhowmick. All rights reserved.
 * Developer: Ujjwal Kumar Bhowmick (ujjwalkumarbhowmick30@gmail.com)
 */

import React, { useState } from 'react';
import { RfpDecomposition, RfpRequirement } from '../../types/deal';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Send,
  Copy,
  Check,
  Target,
  Layers,
  Sparkles,
  Calendar,
  DollarSign,
} from 'lucide-react';

interface DealScoutTabProps {
  rfpData: RfpDecomposition;
}

export const DealScoutTab: React.FC<DealScoutTabProps> = ({ rfpData }) => {
  const [requirements, setRequirements] = useState<RfpRequirement[]>(rfpData.requirements);
  const [copiedProposal, setCopiedProposal] = useState(false);

  // Interactive Requirement Sandbox
  const [customReqInput, setCustomReqInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<RfpRequirement['category']>('Technical');
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleCopyProposal = () => {
    const text = `# Winning Proposal Draft for ${rfpData.client}\n\n## Executive Summary\n${rfpData.proposalDraft.executiveSummary}\n\n## Technical Architecture\n${rfpData.proposalDraft.technicalArchitecture}\n\n## SLA Commitment\n${rfpData.proposalDraft.slaCommitment}\n\n## Differentiation Factor\n${rfpData.proposalDraft.differentiationFactor}`;
    navigator.clipboard.writeText(text);
    setCopiedProposal(true);
    setTimeout(() => setCopiedProposal(false), 2000);
  };

  const handleEvaluateCustomRequirement = () => {
    if (!customReqInput.trim()) return;
    setIsEvaluating(true);

    setTimeout(() => {
      const newReq: RfpRequirement = {
        id: `req-custom-${Date.now()}`,
        category: selectedCategory,
        requirement: customReqInput.trim(),
        complianceStatus: 'Compliant',
        matchScore: 95,
        winningStrategy: 'Verified native compatibility with existing enterprise module framework.'
      };
      setRequirements([newReq, ...requirements]);
      setCustomReqInput('');
      setIsEvaluating(false);
    }, 700);
  };

  const getStatusBadge = (status: RfpRequirement['complianceStatus']) => {
    switch (status) {
      case 'Compliant':
        return <span className="badge badge-emerald text-[11px]">Compliant (100%)</span>;
      case 'Partial':
        return <span className="badge badge-cyan text-[11px]">Partial Support</span>;
      case 'Needs Exception':
        return <span className="badge badge-amber text-[11px]">Exception Needed</span>;
      case 'Non-Compliant':
      default:
        return <span className="badge badge-rose text-[11px]">Non-Compliant</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="glass-panel p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-indigo text-xs">Autonomous RFP Decomposition</span>
            <span className="text-xs font-mono text-slate-400">Tender ID: {rfpData.id}</span>
          </div>
          <h3 className="text-lg font-bold text-white">{rfpData.tenderTitle}</h3>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 font-mono">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>Deadline: {rfpData.submissionDeadline}</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>Client Target Budget: {rfpData.targetBudget}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleCopyProposal}
          className="btn-secondary text-xs self-start md:self-auto shrink-0"
        >
          {copiedProposal ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Proposal Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Proposal Draft</span>
            </>
          )}
        </button>
      </div>

      {/* Interactive Sandbox: Ingest Arbitrary RFP Requirement */}
      <div className="glass-panel p-5 border-l-4 border-l-indigo-500">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            DealScout Interactive Tender Requirement Parser
          </h4>
        </div>
        <p className="text-xs text-slate-400 mb-3">
          Paste any complex RFP specification or vendor requirement below to simulate immediate compliance classification and winning win-rate positioning strategy.
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="Technical">Technical</option>
            <option value="Security & Compliance">Security & Compliance</option>
            <option value="SLA & Support">SLA & Support</option>
            <option value="Commercial">Commercial</option>
            <option value="Integration">Integration</option>
          </select>

          <input
            type="text"
            value={customReqInput}
            onChange={(e) => setCustomReqInput(e.target.value)}
            placeholder="e.g. Must support ISO 20022 message orchestration with sub-10ms batch settlement..."
            onKeyDown={(e) => e.key === 'Enter' && handleEvaluateCustomRequirement()}
            className="flex-1 bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
          />

          <button
            onClick={handleEvaluateCustomRequirement}
            disabled={isEvaluating || !customReqInput.trim()}
            className="btn-primary text-xs shrink-0"
          >
            {isEvaluating ? (
              <span>Evaluating...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Parse Requirement</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Structured Requirements Matrix */}
      <div className="glass-panel p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm font-bold text-white">
              Decomposed RFP Requirements Matrix ({requirements.length})
            </h4>
          </div>
          <span className="text-xs text-slate-400 font-mono">Automated Win Strategy Tagged</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="pb-3 pr-4">Category</th>
                <th className="pb-3 pr-4">Tender Requirement</th>
                <th className="pb-3 pr-4">Compliance</th>
                <th className="pb-3 pr-4">Match</th>
                <th className="pb-3">DealScout Winning Strategy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {requirements.map((req) => (
                <tr key={req.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 pr-4 align-top">
                    <span className="font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded text-[10px] border border-white/5">
                      {req.category}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 align-top text-white font-medium max-w-sm">
                    {req.requirement}
                  </td>
                  <td className="py-3.5 pr-4 align-top">
                    {getStatusBadge(req.complianceStatus)}
                  </td>
                  <td className="py-3.5 pr-4 align-top font-mono font-bold text-emerald-400">
                    {req.matchScore}%
                  </td>
                  <td className="py-3.5 align-top text-slate-300 text-xs bg-indigo-950/10 p-2 rounded border border-indigo-500/10">
                    {req.winningStrategy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Auto-Generated Proposal Draft */}
      <div className="glass-panel p-5">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-4 h-4 text-indigo-400" />
          <h4 className="text-sm font-bold text-white">
            Auto-Synthesized Winning Proposal Draft
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10">
            <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" /> Executive Pitch Summary
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {rfpData.proposalDraft.executiveSummary}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10">
            <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3 h-3" /> Technical Architecture
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {rfpData.proposalDraft.technicalArchitecture}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10">
            <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3" /> SLA & Operational Commitment
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {rfpData.proposalDraft.slaCommitment}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10">
            <div className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Target className="w-3 h-3" /> Key Competitive Differentiator
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {rfpData.proposalDraft.differentiationFactor}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
