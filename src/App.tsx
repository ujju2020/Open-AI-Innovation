/**
 * CogniDeal AI — Master Application Component
 * Copyright (c) 2026 Ujjwal Kumar Bhowmick. All rights reserved.
 * Developer: Ujjwal Kumar Bhowmick (ujjwalkumarbhowmick30@gmail.com)
 */

import React, { useState, useEffect } from 'react';
import { ENTERPRISE_PRESETS } from './data/enterprisePresets';
import { DealScenario } from './types/deal';
import { Header } from './components/Header';
import { TelemetryHero } from './components/TelemetryHero';
import { SwarmPipelineVisualizer } from './components/SwarmPipelineVisualizer';
import { ApiKeyModal } from './components/ApiKeyModal';
import { DealScoutTab } from './components/tabs/DealScoutTab';
import { LexiGuardTab } from './components/tabs/LexiGuardTab';
import { MarginPilotTab } from './components/tabs/MarginPilotTab';
import { TrustVertexTab } from './components/tabs/TrustVertexTab';
import { DealDeskCopilotTab } from './components/tabs/DealDeskCopilotTab';
import { getStoredGeminiConfig } from './services/geminiService';
import {
  FileText,
  ShieldAlert,
  DollarSign,
  CheckCircle2,
  BrainCircuit,
  Terminal,
} from 'lucide-react';

export const App: React.FC = () => {
  const [scenarios] = useState<DealScenario[]>(ENTERPRISE_PRESETS);
  const [activeScenario, setActiveScenario] = useState<DealScenario>(
    ENTERPRISE_PRESETS[0]
  );
  const [activeTab, setActiveTab] = useState<
    'rfp' | 'contract' | 'pricing' | 'compliance' | 'copilot'
  >('contract');

  // Interactive Redline State per Scenario
  const [clausesMap, setClausesMap] = useState<Record<string, any>>(() => {
    const map: Record<string, any> = {};
    ENTERPRISE_PRESETS.forEach((sc) => {
      map[sc.id] = sc.contractClauses;
    });
    return map;
  });

  // Swarm Execution State
  const [isSwarmRunning, setIsSwarmRunning] = useState(false);
  const [activeAgentIndex, setActiveAgentIndex] = useState(4); // Default: all finished

  // Gemini API Key Modal
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    const conf = getStoredGeminiConfig();
    setHasApiKey(Boolean(conf.apiKey.trim()));
  }, []);

  const handleTriggerSwarmRun = () => {
    setIsSwarmRunning(true);
    setActiveAgentIndex(0);

    const interval = setInterval(() => {
      setActiveAgentIndex((prev) => {
        if (prev >= 4) {
          clearInterval(interval);
          setIsSwarmRunning(false);
          return 4;
        }
        return prev + 1;
      });
    }, 900);
  };

  const handleToggleRedline = (clauseId: string) => {
    const currentClauses = clausesMap[activeScenario.id] || activeScenario.contractClauses;
    const updated = currentClauses.map((c: any) =>
      c.id === clauseId ? { ...c, isRedlineAccepted: !c.isRedlineAccepted } : c
    );
    setClausesMap({
      ...clausesMap,
      [activeScenario.id]: updated,
    });
  };

  const currentClauses =
    clausesMap[activeScenario.id] || activeScenario.contractClauses;
  const acceptedRedlinesCount = currentClauses.filter(
    (c: any) => c.isRedlineAccepted
  ).length;

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col relative selection:bg-indigo-500 selection:text-white">
      <div className="ambient-glow" />

      {/* Header */}
      <Header
        scenarios={scenarios}
        activeScenario={activeScenario}
        onSelectScenario={(sc) => setActiveScenario(sc)}
        onTriggerSwarmRun={handleTriggerSwarmRun}
        isSwarmRunning={isSwarmRunning}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasApiKey={hasApiKey}
      />

      {/* Telemetry Hero */}
      <TelemetryHero
        scenario={activeScenario}
        acceptedRedlinesCount={acceptedRedlinesCount}
      />

      {/* Swarm Pipeline Visualizer */}
      <SwarmPipelineVisualizer
        agents={activeScenario.agents}
        isSwarmRunning={isSwarmRunning}
        activeAgentIndex={activeAgentIndex}
      />

      {/* Main Tabs Navigation Bar */}
      <main className="max-w-7xl mx-auto px-6 py-4 flex-1 w-full space-y-6">
        <div className="border-b border-white/10 flex items-center justify-between overflow-x-auto">
          <div className="flex gap-2">
            {[
              { id: 'rfp', label: '1. DealScout (RFP)', icon: FileText, badge: 'Tender Matrix' },
              { id: 'contract', label: '2. LexiGuard (Contract)', icon: ShieldAlert, badge: `${currentClauses.length} Clauses` },
              { id: 'pricing', label: '3. MarginPilot (Financials)', icon: DollarSign, badge: 'Margin Floor' },
              { id: 'compliance', label: '4. TrustVertex (Security)', icon: CheckCircle2, badge: 'SOC2/ISO' },
              { id: 'copilot', label: '5. DealDesk Copilot', icon: BrainCircuit, badge: 'AI Concierge' },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                    isActive
                      ? 'border-indigo-500 text-white bg-white/[0.04]'
                      : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                      isActive
                        ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/30'
                        : 'bg-slate-900 text-slate-500'
                    }`}
                  >
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="animate-fadeIn">
          {activeTab === 'rfp' && (
            <DealScoutTab rfpData={activeScenario.rfpData} />
          )}

          {activeTab === 'contract' && (
            <LexiGuardTab
              clauses={currentClauses}
              onToggleRedline={handleToggleRedline}
            />
          )}

          {activeTab === 'pricing' && (
            <MarginPilotTab
              initialFinancials={activeScenario.financials}
            />
          )}

          {activeTab === 'compliance' && (
            <TrustVertexTab
              securityData={activeScenario.securityCompliance}
            />
          )}

          {activeTab === 'copilot' && (
            <DealDeskCopilotTab scenario={activeScenario} />
          )}
        </div>
      </main>

      {/* Footer & License Attribution */}
      <footer className="border-t border-white/10 bg-[#06090f] py-6 px-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span className="font-mono text-xs">
              CogniDeal AI v1.0.0 — Open-AI-Innovation Track | BITSom Vertex Fest
            </span>
          </div>

          <div className="text-slate-400 text-xs">
            <strong>Copyright (c) 2026 Ujjwal Kumar Bhowmick</strong> • Developer: Ujjwal Kumar Bhowmick (
            <a
              href="mailto:ujjwalkumarbhowmick30@gmail.com"
              className="text-indigo-400 hover:underline font-mono"
            >
              ujjwalkumarbhowmick30@gmail.com
            </a>
            ) • All rights reserved.
          </div>
        </div>
      </footer>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onConfigSaved={() => {
          const conf = getStoredGeminiConfig();
          setHasApiKey(Boolean(conf.apiKey.trim()));
        }}
      />
    </div>
  );
};
