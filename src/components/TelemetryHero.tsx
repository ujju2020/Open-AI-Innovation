/**
 * CogniDeal AI — Telemetry Hero KPI Strip
 * Copyright (c) 2026 Ujjwal Kumar Bhowmick. All rights reserved.
 * Developer: Ujjwal Kumar Bhowmick (ujjwalkumarbhowmick30@gmail.com)
 */

import React from 'react';
import { DealScenario } from '../types/deal';
import { Zap, ShieldAlert, TrendingUp, CheckCircle, ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface TelemetryHeroProps {
  scenario: DealScenario;
  acceptedRedlinesCount: number;
}

export const TelemetryHero: React.FC<TelemetryHeroProps> = ({
  scenario,
  acceptedRedlinesCount,
}) => {
  // Dynamically reduce risk score as redlines get accepted
  const adjustedRiskScore = Math.max(
    18,
    Math.round(scenario.riskScore - acceptedRedlinesCount * 14)
  );

  const riskStatusText =
    adjustedRiskScore > 60
      ? 'High Liability Exposure'
      : adjustedRiskScore > 35
      ? 'Moderate Guarded Risk'
      : 'Institutional Safe Harbor';

  const riskBadgeClass =
    adjustedRiskScore > 60
      ? 'badge-rose'
      : adjustedRiskScore > 35
      ? 'badge-amber'
      : 'badge-emerald';

  return (
    <div className="max-w-7xl mx-auto px-6 pt-6 pb-2">
      {/* Title & Client Status Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 p-5 glass-panel-elevated">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-cyan text-xs">{scenario.industry}</span>
            <span className="badge badge-indigo text-xs">{scenario.contractType}</span>
            <span className="text-xs font-mono text-slate-400">Target: {scenario.dealValue}</span>
          </div>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            {scenario.title}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Client Counterparty: <strong className="text-white">{scenario.clientName}</strong> — {scenario.summary}
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-900/80 px-4 py-2.5 rounded-xl border border-white/10 shrink-0">
          <div className="text-right">
            <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Deal Health</div>
            <div className="text-2xl font-black text-emerald-400 font-mono">
              {scenario.overallDealHealth}%
            </div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-right">
            <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Risk Grade</div>
            <span className={`badge ${riskBadgeClass} text-xs`}>{riskStatusText}</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Deal Velocity Card */}
        <div className="glass-card p-4 flex flex-col justify-between border-l-4 border-l-indigo-500">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Deal Cycle Velocity</span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white font-mono">1.8 Days</div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-1">
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span>91.4% faster vs 21-day manual RFP</span>
            </div>
          </div>
        </div>

        {/* Contract Risk Index Card */}
        <div className="glass-card p-4 flex flex-col justify-between border-l-4 border-l-rose-500">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Contract Risk Index</span>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white font-mono">
              {adjustedRiskScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-cyan-400 mt-1">
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span>{acceptedRedlinesCount} Redlines Accepted ({scenario.contractClauses.length} Total)</span>
            </div>
          </div>
        </div>

        {/* Margin Guardrail Card */}
        <div className="glass-card p-4 flex flex-col justify-between border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Gross Margin Health</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white font-mono">
              {(100 - scenario.financials.currentDiscountPercent - scenario.financials.cogsPercent).toFixed(1)}%
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+{(100 - scenario.financials.currentDiscountPercent - scenario.financials.cogsPercent - scenario.financials.targetGrossMarginPercent).toFixed(1)}% over CFO floor ({scenario.financials.targetGrossMarginPercent}%)</span>
            </div>
          </div>
        </div>

        {/* Auto Redline Precision Card */}
        <div className="glass-card p-4 flex flex-col justify-between border-l-4 border-l-cyan-500">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Swarm Redline Precision</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white font-mono">97.6%</div>
            <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-1">
              <span>Counsel & GC alignment rate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
