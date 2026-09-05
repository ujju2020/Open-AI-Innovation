/**
 * CogniDeal AI — MarginPilot Pricing & Margin Guardrails Tab
 * Copyright (c) 2026 Ujjwal Kumar Bhowmick. All rights reserved.
 * Developer: Ujjwal Kumar Bhowmick (ujjwalkumarbhowmick30@gmail.com)
 */

import React, { useState } from 'react';
import { MarginFinancials } from '../../types/deal';
import {
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  CreditCard,
  Building,
} from 'lucide-react';

interface MarginPilotTabProps {
  initialFinancials: MarginFinancials;
}

export const MarginPilotTab: React.FC<MarginPilotTabProps> = ({
  initialFinancials,
}) => {
  const [discountPercent, setDiscountPercent] = useState<number>(
    initialFinancials.currentDiscountPercent
  );
  const [termYears, setTermYears] = useState<number>(
    initialFinancials.contractTermYears
  );
  const [paymentTerms, setPaymentTerms] = useState<MarginFinancials['paymentTerms']>(
    initialFinancials.paymentTerms
  );

  // Dynamic calculations
  const listPriceARR = initialFinancials.listPriceARR;
  const cogsPercent = initialFinancials.cogsPercent;
  const targetFloorMargin = initialFinancials.targetGrossMarginPercent;

  const netARR = listPriceARR * (1 - discountPercent / 100);
  const totalTCV = netARR * termYears;
  const projectedGrossMargin = 100 - discountPercent - cogsPercent;

  const isBelowFloor = projectedGrossMargin < targetFloorMargin;

  // Escalation Tier Logic
  const getApprovalTier = () => {
    if (projectedGrossMargin >= 75) {
      return {
        label: 'Autonomous Deal Desk (Instant Greenlight)',
        badge: 'badge-emerald',
        desc: 'Within pre-approved parameters. Sales can issue contract immediately.'
      };
    } else if (projectedGrossMargin >= targetFloorMargin) {
      return {
        label: 'VP of Commercial Sales Approval Required',
        badge: 'badge-amber',
        desc: 'Slight margin compression. Requires VP 1-click digital concurrence.'
      };
    } else {
      return {
        label: 'CFO & Board Exception Escalation',
        badge: 'badge-rose',
        desc: 'Margin breaches standard floor (70%). Strict CFO justification required.'
      };
    }
  };

  const approvalInfo = getApprovalTier();

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-emerald text-xs">Margin Leakage Firewall</span>
            <span className="text-xs font-mono text-slate-400">Dynamic Pricing Engine</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            MarginPilot Financial Modeling & Profit Guardrails
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Real-time sensitivity analysis between discount concessions, contract duration, payment velocity, and gross margin integrity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className={`badge ${approvalInfo.badge} text-xs py-1.5 px-3`}>
            {approvalInfo.label}
          </span>
        </div>
      </div>

      {/* Main Grid: Interactive Controls & Live Projections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Controls (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-5 space-y-5">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <h4 className="text-sm font-bold text-white">Deal Structuring Parameters</h4>
          </div>

          {/* Discount Slider */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="font-semibold text-slate-300">Discount Concession</span>
              <span className="font-mono font-bold text-indigo-400 text-sm">{discountPercent}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="1"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>0% (Full Price)</span>
              <span>15% (Target)</span>
              <span>30% (Escalation)</span>
              <span>40% (Max)</span>
            </div>
          </div>

          {/* Contract Duration */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Contract Term Commitment
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 5].map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setTermYears(yr)}
                  className={`py-2 rounded-lg text-xs font-bold font-mono transition-all ${
                    termYears === yr
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                      : 'bg-slate-900 border border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {yr} {yr === 1 ? 'Year' : 'Years'}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Terms */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Cash Flow & Payment Terms
            </label>
            <select
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value as any)}
              className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="Upfront Annual">Upfront Annual (Best Cash Flow)</option>
              <option value="Multi-year Prepaid">Multi-year Prepaid (Max Discount Justified)</option>
              <option value="Net 30">Net 30 Invoicing (Standard)</option>
              <option value="Net 60">Net 60 Invoicing</option>
              <option value="Net 90">Net 90 Invoicing (High Working Capital Cost)</option>
            </select>
          </div>

          {/* Guardrail Status Card */}
          <div
            className={`p-3.5 rounded-xl border text-xs ${
              isBelowFloor
                ? 'bg-rose-950/20 border-rose-500/40 text-rose-200'
                : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
            }`}
          >
            <div className="flex items-center gap-2 font-bold mb-1">
              {isBelowFloor ? (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              )}
              <span>{approvalInfo.label}</span>
            </div>
            <p className="text-[11px] opacity-90">{approvalInfo.desc}</p>
          </div>
        </div>

        {/* Live Projections & Financial Impact (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-5 space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <h4 className="text-sm font-bold text-white">Projected Financial Return</h4>
            </div>
            <span className="text-xs font-mono text-slate-400">Currency: USD</span>
          </div>

          {/* 3 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Net Effective ARR
              </span>
              <div className="text-xl font-bold font-mono text-white mt-1">
                ${(netARR / 1000000).toFixed(2)}M
              </div>
              <span className="text-[10px] text-slate-400">List: ${(listPriceARR / 1000000).toFixed(2)}M</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Total Contract Value (TCV)
              </span>
              <div className="text-xl font-bold font-mono text-cyan-400 mt-1">
                ${(totalTCV / 1000000).toFixed(2)}M
              </div>
              <span className="text-[10px] text-slate-400">{termYears}-Year Commitment</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Blended Gross Margin
              </span>
              <div
                className={`text-xl font-bold font-mono mt-1 ${
                  isBelowFloor ? 'text-rose-400' : 'text-emerald-400'
                }`}
              >
                {projectedGrossMargin.toFixed(1)}%
              </div>
              <span className="text-[10px] text-slate-400">Target Floor: {targetFloorMargin}%</span>
            </div>
          </div>

          {/* Visual Margin Breakdown Bar */}
          <div>
            <div className="flex justify-between text-xs mb-1 font-mono">
              <span className="text-emerald-400">Gross Margin ({projectedGrossMargin.toFixed(1)}%)</span>
              <span className="text-indigo-400">Discount ({discountPercent}%)</span>
              <span className="text-slate-400">COGS ({cogsPercent}%)</span>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${Math.max(0, projectedGrossMargin)}%` }}
                className={`h-full transition-all ${
                  isBelowFloor ? 'bg-rose-500' : 'bg-emerald-500'
                }`}
              />
              <div
                style={{ width: `${discountPercent}%` }}
                className="h-full bg-indigo-500 transition-all"
              />
              <div
                style={{ width: `${cogsPercent}%` }}
                className="h-full bg-slate-600 transition-all"
              />
            </div>
          </div>

          {/* Strategic Cash Flow Optimization Advice */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-white/10 text-xs space-y-2">
            <div className="font-bold text-white flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>MarginPilot Recommended Counter-Trade</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              If client requests an additional <strong>2% discount</strong> to close before quarter-end, insist on migrating payment terms from <em>Net 30</em> to <strong>Upfront Annual</strong>. This accelerates <strong>${(netARR).toLocaleString()}</strong> in immediate operating cash flow, offsetting the margin concession by +4.1% IRR.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
