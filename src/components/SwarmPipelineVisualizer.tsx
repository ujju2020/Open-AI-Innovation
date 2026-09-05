/**
 * CogniDeal AI — Autonomous Swarm Pipeline Visualizer
 * Copyright (c) 2026 Ujjwal Kumar Bhowmick. All rights reserved.
 * Developer: Ujjwal Kumar Bhowmick (ujjwalkumarbhowmick30@gmail.com)
 */

import React from 'react';
import { AgentTelemetry } from '../types/deal';
import {
  FileText,
  ShieldAlert,
  DollarSign,
  CheckCircle2,
  BrainCircuit,
  Cpu,
  Clock,
  Check,
  Loader2,
} from 'lucide-react';

interface SwarmPipelineVisualizerProps {
  agents: AgentTelemetry[];
  isSwarmRunning: boolean;
  activeAgentIndex: number;
}

export const SwarmPipelineVisualizer: React.FC<SwarmPipelineVisualizerProps> = ({
  agents,
  isSwarmRunning,
  activeAgentIndex,
}) => {
  const getAgentIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText':
        return <FileText className="w-4 h-4" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-4 h-4" />;
      case 'DollarSign':
        return <DollarSign className="w-4 h-4" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'BrainCircuit':
      default:
        return <BrainCircuit className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="glass-panel p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Autonomous Swarm Orchestration Pipeline
            </h3>
            <span className="badge badge-indigo text-[10px]">5 Coordinated Agents</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Gemini 2.5 Vertex Swarm Active</span>
            </div>
          </div>
        </div>

        {/* 5-Agent Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {agents.map((agent, index) => {
            const isCurrentlyRunning = isSwarmRunning && activeAgentIndex === index;
            const isFinished = !isSwarmRunning || activeAgentIndex > index;

            return (
              <div
                key={agent.id}
                className={`relative p-3.5 rounded-xl border transition-all duration-300 ${
                  isCurrentlyRunning
                    ? 'bg-indigo-950/40 border-indigo-500 shadow-lg shadow-indigo-500/20 scale-[1.02]'
                    : isFinished
                    ? 'bg-slate-900/60 border-white/10 hover:border-white/20'
                    : 'bg-slate-900/30 border-white/5 opacity-50'
                }`}
              >
                {/* Agent Header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-1.5 rounded-lg ${
                        isCurrentlyRunning
                          ? 'bg-indigo-500 text-white animate-pulse'
                          : 'bg-slate-800 text-cyan-400 border border-white/10'
                      }`}
                    >
                      {getAgentIcon(agent.iconName)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white leading-tight">
                        {agent.name}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        {agent.codename}
                      </div>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div>
                    {isCurrentlyRunning ? (
                      <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                    ) : isFinished ? (
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-emerald-400" />
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-600">Pending</span>
                    )}
                  </div>
                </div>

                {/* Role description */}
                <p className="text-[11px] text-slate-300 line-clamp-2 min-h-[30px] mb-3">
                  {agent.role}
                </p>

                {/* Telemetry Metrics */}
                <div className="border-t border-white/10 pt-2 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <div className="flex items-center gap-1">
                    <span className="text-slate-500">Conf:</span>
                    <span className="text-emerald-400 font-semibold">{agent.confidence}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5 text-slate-500" />
                    <span>{(agent.latencyMs / 1000).toFixed(2)}s</span>
                  </div>
                </div>

                {/* Output Snippet */}
                <div className="mt-2 text-[10px] text-slate-400 bg-black/40 p-1.5 rounded border border-white/5 line-clamp-2">
                  {agent.outputSummary}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
