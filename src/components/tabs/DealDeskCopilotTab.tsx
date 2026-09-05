/**
 * CogniDeal AI — DealDesk Executive Copilot & Decision Concierge Tab
 * Copyright (c) 2026 Ujjwal Kumar Bhowmick. All rights reserved.
 * Developer: Ujjwal Kumar Bhowmick (ujjwalkumarbhowmick30@gmail.com)
 */

import React, { useState } from 'react';
import { DealScenario, CopilotMessage } from '../../types/deal';
import {
  BrainCircuit,
  Send,
  Sparkles,
  Copy,
  Check,
  User,
  Bot,
  Loader2,
  FileCheck2,
  Layers,
} from 'lucide-react';
import { queryDealCopilot } from '../../services/geminiService';

interface DealDeskCopilotTabProps {
  scenario: DealScenario;
}

export const DealDeskCopilotTab: React.FC<DealDeskCopilotTabProps> = ({
  scenario,
}) => {
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'm-1',
      sender: 'agent',
      text: `Welcome to **DealDesk Executive Copilot**. I have synthesized all multi-agent telemetry for **${scenario.clientName}** (${scenario.dealValue}). How can I assist you with negotiation strategy, margin guardrails, or legal counter-propositions?`,
      timestamp: 'Just now'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedDossier, setCopiedDossier] = useState(false);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg: CopilotMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    const scenarioContext = `Deal Title: ${scenario.title}
Client: ${scenario.clientName}
Value: ${scenario.dealValue}
Contract Type: ${scenario.contractType}
Health: ${scenario.overallDealHealth}/100, Risk Score: ${scenario.riskScore}/100
Summary: ${scenario.summary}`;

    try {
      const res = await queryDealCopilot(textToSend, scenarioContext);
      const agentMsg: CopilotMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: res.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, agentMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyDossier = () => {
    const dossier = `# Executive Deal Approval Dossier — CogniDeal AI
## Deal: ${scenario.title}
- **Client**: ${scenario.clientName}
- **Value**: ${scenario.dealValue}
- **Contract Type**: ${scenario.contractType}
- **Deal Health**: ${scenario.overallDealHealth}/100
- **Contract Risk**: ${scenario.riskScore}/100

### Financial Structuring
- **List ARR**: $${(scenario.financials.listPriceARR / 1000000).toFixed(2)}M
- **Approved Discount**: ${scenario.financials.currentDiscountPercent}%
- **Term**: ${scenario.financials.contractTermYears} Years
- **Payment Terms**: ${scenario.financials.paymentTerms}
- **Approval Level**: ${scenario.financials.approvalRequiredTier}

### Legal Redline Strategy
${scenario.contractClauses
  .map(
    (c) => `- **${c.section} (${c.title})**: ${c.isRedlineAccepted ? 'REPLACED WITH BALANCED REDLINE' : 'PENDING ACCEPTANCE'}`
  )
  .join('\n')}

### Autonomous Swarm Recommendation
Recommended for executive signature conditional upon acceptance of proposed indemnity cap and payment terms.`;

    navigator.clipboard.writeText(dossier);
    setCopiedDossier(true);
    setTimeout(() => setCopiedDossier(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-violet text-xs">C-Suite & GC Intelligence</span>
            <span className="text-xs font-mono text-slate-400">Autonomous Concierge</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            DealDesk Executive Copilot & Decision Concierge
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Interactive multi-turn strategic advisor synthesizing legal, pricing, and compliance vectors for C-suite decision velocity.
          </p>
        </div>

        <button
          onClick={handleCopyDossier}
          className="btn-primary text-xs self-start md:self-auto shrink-0 flex items-center gap-1.5"
        >
          {copiedDossier ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-300" />
              <span>Dossier Copied!</span>
            </>
          ) : (
            <>
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Export Executive Deal Dossier</span>
            </>
          )}
        </button>
      </div>

      {/* Suggested Quick Queries Strip */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Quick Inquiries:
        </span>
        {scenario.copilotSuggestions.map((sug, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(sug)}
            className="text-xs px-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white hover:border-indigo-500/50 transition-all text-left"
          >
            "{sug}"
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="glass-panel p-5 flex flex-col h-[520px]">
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'agent' && (
                <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0">
                  <BrainCircuit className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-slate-900/90 text-slate-200 border border-white/10 rounded-bl-none'
                }`}
              >
                <div className="prose prose-invert prose-xs max-w-none space-y-2 whitespace-pre-line">
                  {m.text}
                </div>
                <div
                  className={`text-[10px] mt-2 font-mono ${
                    m.sender === 'user' ? 'text-indigo-200' : 'text-slate-500'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300 shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center text-slate-400 text-xs">
              <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <span>DealDesk Copilot synthesizing multi-agent strategic position...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="border-t border-white/10 pt-3 flex gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask DealDesk Copilot regarding risk exposure, counter-proposals, or margin compromises..."
            className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !inputQuery.trim()}
            className="btn-primary text-xs px-5"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
