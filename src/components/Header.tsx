/**
 * CogniDeal AI — Enterprise Header & Navigation
 * Copyright (c) 2026 Ujjwal Kumar Bhowmick. All rights reserved.
 * Developer: Ujjwal Kumar Bhowmick (ujjwalkumarbhowmick30@gmail.com)
 */

import React from 'react';
import { DealScenario } from '../types/deal';
import { BrainCircuit, Play, Sparkles, Key, CheckCircle2, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  scenarios: DealScenario[];
  activeScenario: DealScenario;
  onSelectScenario: (scenario: DealScenario) => void;
  onTriggerSwarmRun: () => void;
  isSwarmRunning: boolean;
  onOpenApiKeyModal: () => void;
  hasApiKey: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  scenarios,
  activeScenario,
  onSelectScenario,
  onTriggerSwarmRun,
  isSwarmRunning,
  onOpenApiKeyModal,
  hasApiKey,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080c14]/90 backdrop-blur-xl px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Platform Identity */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                CogniDeal <span className="text-cyan-400 font-mono text-sm uppercase px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">AI</span>
              </h1>
              <span className="badge badge-indigo text-xs">BITSom Vertex Fest</span>
            </div>
            <p className="text-xs text-slate-400">
              Autonomous B2B Deal Desk & Contract Risk Intelligence Swarm
            </p>
          </div>
        </div>

        {/* Action Controls & Scenario Switcher */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {/* Scenario Selector */}
          <div className="flex items-center gap-2 bg-slate-900/90 border border-white/10 rounded-xl px-3 py-1.5">
            <span className="text-xs font-semibold text-slate-400">Deal:</span>
            <select
              value={activeScenario.id}
              onChange={(e) => {
                const found = scenarios.find((s) => s.id === e.target.value);
                if (found) onSelectScenario(found);
              }}
              className="bg-transparent text-xs font-medium text-slate-200 focus:outline-none cursor-pointer pr-1"
            >
              {scenarios.map((sc) => (
                <option key={sc.id} value={sc.id} className="bg-slate-900 text-white">
                  {sc.clientName} ({sc.dealValue})
                </option>
              ))}
            </select>
          </div>

          {/* Trigger Swarm Run Button */}
          <button
            onClick={onTriggerSwarmRun}
            disabled={isSwarmRunning}
            className={`btn-primary text-xs ${isSwarmRunning ? 'opacity-70 cursor-not-allowed' : ''}`}
            title="Execute 5-Agent Autonomous Deal Swarm"
          >
            {isSwarmRunning ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-cyan-300" />
                <span>Swarm Orchestrating...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Trigger Swarm Run</span>
              </>
            )}
          </button>

          {/* Gemini API Key Configuration Button */}
          <button
            onClick={onOpenApiKeyModal}
            className={`btn-secondary text-xs flex items-center gap-1.5 ${
              hasApiKey ? 'border-emerald-500/40 text-emerald-300 bg-emerald-950/20' : ''
            }`}
            title="Configure Google Gemini Vertex AI Key"
          >
            <Key className="w-3.5 h-3.5" />
            <span>{hasApiKey ? 'Gemini Live Active' : 'Gemini API Key'}</span>
            {hasApiKey && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
          </button>
        </div>
      </div>
    </header>
  );
};
