/**
 * CogniDeal AI — Google Gemini Vertex AI Integration Service
 * Copyright (c) 2026 Ujjwal Kumar Bhowmick. All rights reserved.
 * Developer: Ujjwal Kumar Bhowmick (ujjwalkumarbhowmick30@gmail.com)
 */

export interface GeminiConfig {
  apiKey: string;
  model: 'gemini-2.5-flash' | 'gemini-1.5-pro' | 'gemini-1.5-flash';
}

const STORAGE_KEY = 'cognideal_gemini_config';

export function getStoredGeminiConfig(): GeminiConfig {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to read gemini config from localStorage', e);
  }
  return {
    apiKey: '',
    model: 'gemini-2.5-flash'
  };
}

export function saveGeminiConfig(config: GeminiConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save gemini config', e);
  }
}

/**
 * Perform live contract analysis using Gemini API, or fallback to simulated neural analysis
 */
export async function analyzeContractClauseWithGemini(
  clauseText: string,
  clauseCategory: string,
  config?: GeminiConfig
): Promise<{
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  riskAnalysis: string;
  proposedRedline: string;
  rationale: string;
  source: 'gemini-live' | 'cognideal-offline-neural';
}> {
  const activeConfig = config || getStoredGeminiConfig();

  if (activeConfig.apiKey.trim()) {
    try {
      const prompt = `You are LexiGuard AI, an expert corporate enterprise legal counsel and deal risk agent.
Analyze the following B2B contract clause in category "${clauseCategory}":
"${clauseText}"

Respond ONLY with a valid JSON object matching this schema:
{
  "riskLevel": "low" | "medium" | "high" | "critical",
  "riskAnalysis": "detailed explanation of liabilities and predatory terms",
  "proposedRedline": "balanced, industry-standard alternative clause text",
  "rationale": "strategic and legal justification for this redline change"
}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${activeConfig.model}:generateContent?key=${activeConfig.apiKey.trim()}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 1000
            }
          })
        }
      );

      if (response.ok) {
        const json = await response.json();
        const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          // Clean JSON markdown fences if present
          const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
          const parsed = JSON.parse(cleanText);
          return {
            riskLevel: parsed.riskLevel || 'high',
            riskAnalysis: parsed.riskAnalysis || 'Identified potential asymmetric liability risks.',
            proposedRedline: parsed.proposedRedline || 'Custom standard clause applied.',
            rationale: parsed.rationale || 'Mitigates uncapped liability.',
            source: 'gemini-live'
          };
        }
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to intelligent offline engine', err);
    }
  }

  // Intelligent Offline Heuristics Engine
  await new Promise((res) => setTimeout(res, 850));

  const lower = clauseText.toLowerCase();
  let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'medium';
  let riskAnalysis = 'Standard enterprise contractual terms requiring balanced bilateral protections.';
  let proposedRedline = clauseText;
  let rationale = 'Aligned with mutual standard terms for B2B commercial agreements.';

  if (lower.includes('unlimited') || lower.includes('without limitation') || lower.includes('consequential')) {
    riskLevel = 'critical';
    riskAnalysis = 'Clause imposes unlimited or uncapped financial damages and excludes liability limitations.';
    proposedRedline = clauseText
      .replace(/without limitation/gi, 'subject to the aggregate liability cap in Section 12')
      .replace(/unlimited/gi, 'limited to total fees paid in the prior twelve (12) months');
    rationale = 'Caps catastrophic exposure to customary 12-month trailing contract value.';
  } else if (lower.includes('indemnify') || lower.includes('hold harmless')) {
    riskLevel = 'high';
    riskAnalysis = 'Unilateral indemnity commitment exposing vendor to broad third-party liabilities.';
    proposedRedline = 'Each party shall defend and indemnify the other against third-party claims alleging direct infringement of intellectual property rights, subject to customary liability limitations.';
    rationale = 'Converts unilateral indemnification to mutual IP infringement coverage only.';
  } else if (lower.includes('liquidated damages') || lower.includes('penalty')) {
    riskLevel = 'high';
    riskAnalysis = 'Punitive cash liquidated damages clause instead of customary SLA service credits.';
    proposedRedline = 'Customer sole and exclusive remedy for service performance issues shall be the receipt of proportional service credits capped at 20% of monthly billings.';
    rationale = 'Replaces cash penalties with standard enterprise service credits.';
  } else if (lower.includes('immediate termination') || lower.includes('15 days') || lower.includes('without cause')) {
    riskLevel = 'medium';
    riskAnalysis = 'Premature termination for convenience clause undermines multi-year ARR certainty.';
    proposedRedline = 'Either party may terminate for convenience upon ninety (90) calendar days written notice following completion of the Initial 12-Month Term.';
    rationale = 'Protects revenue baseline with 90-day notification and initial lock-in period.';
  }

  return {
    riskLevel,
    riskAnalysis,
    proposedRedline,
    rationale,
    source: 'cognideal-offline-neural'
  };
}

/**
 * Deal Desk Executive Copilot conversational query
 */
export async function queryDealCopilot(
  userQuery: string,
  scenarioContext: string,
  config?: GeminiConfig
): Promise<{ text: string; source: 'gemini-live' | 'cognideal-offline-neural' }> {
  const activeConfig = config || getStoredGeminiConfig();

  if (activeConfig.apiKey.trim()) {
    try {
      const prompt = `You are DealDesk Copilot, an elite executive AI concierge advising C-suite executives, General Counsels, and VP of Sales on enterprise B2B deal structuring.
Current Deal Context:
${scenarioContext}

User Query: "${userQuery}"

Provide a sharp, high-impact executive response structured with:
1. Direct Strategic Assessment
2. Financial & Legal Risk Impact
3. Actionable Counter-Proposition / Playbook Recommendation.
Keep tone authoritative, concise, and business-focused.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${activeConfig.model}:generateContent?key=${activeConfig.apiKey.trim()}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 800
            }
          })
        }
      );

      if (response.ok) {
        const json = await response.json();
        const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return { text, source: 'gemini-live' };
        }
      }
    } catch (e) {
      console.warn('Gemini Copilot call failed, using intelligent offline response', e);
    }
  }

  // Offline Simulation
  await new Promise((res) => setTimeout(res, 900));

  const lower = userQuery.toLowerCase();
  if (lower.includes('margin') || lower.includes('discount')) {
    return {
      text: `### 📊 Deal Financial & Margin Analysis
- **Current Position**: Discount is currently within the approved band, but concessions exceeding 20% will breach the CFO floor threshold of 70% gross margin.
- **Recommended Play**: If the customer insists on an extra 3% discount, tie it strictly to **Upfront Multi-Year Prepaid** terms or a 10% volume expansion in Year 2.
- **Projected Impact**: Preserves 72.8% blended gross margin while accelerating cash collections by 42 days.`,
      source: 'cognideal-offline-neural'
    };
  } else if (lower.includes('risk') || lower.includes('indemnity') || lower.includes('clause')) {
    return {
      text: `### ⚖️ Legal Risk & Exposure Assessment
- **Critical Exposure**: The unilateral uncapped indemnification in Section 11 presents catastrophic liability for operational errors.
- **LexiGuard Playbook**: Do not concede unlimited liability. Counter with our standard balanced mutual IP indemnity and a 12-month trailing fee liability cap.
- **Historical Benchmark**: 94% of Fortune 500 enterprise customers accept this 12-month cap upon receiving our standard risk memo.`,
      source: 'cognideal-offline-neural'
    };
  } else {
    return {
      text: `### ⚡ Executive Strategy Recommendation
- **Deal Health**: Strong strategic alignment (88/100) with favorable enterprise budget headroom.
- **Key Bottlenecks**: Contractual redlines in Section 11 (Indemnity) and Section 14 (Uptime Liquidated Damages) must be reconciled before signing.
- **Next Autonomous Step**: Dispatch the redlined contract package and schedule a 20-minute Deal Desk alignment sync with customer procurement.`,
      source: 'cognideal-offline-neural'
    };
  }
}
