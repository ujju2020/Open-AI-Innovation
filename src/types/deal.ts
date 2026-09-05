/**
 * CogniDeal AI — Enterprise B2B Deal Desk Data Models
 * Copyright (c) 2026 Ujjwal Kumar Bhowmick. All rights reserved.
 * Developer: Ujjwal Kumar Bhowmick (ujjwalkumarbhowmick30@gmail.com)
 */

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface AgentTelemetry {
  id: string;
  name: string;
  codename: string;
  role: string;
  status: 'idle' | 'running' | 'completed' | 'flagged';
  confidence: number;
  tokensProcessed: number;
  latencyMs: number;
  outputSummary: string;
  iconName: string;
}

export interface RfpRequirement {
  id: string;
  category: 'Technical' | 'Security & Compliance' | 'SLA & Support' | 'Commercial' | 'Integration';
  requirement: string;
  complianceStatus: 'Compliant' | 'Partial' | 'Needs Exception' | 'Non-Compliant';
  matchScore: number;
  winningStrategy: string;
}

export interface ProposalDraft {
  executiveSummary: string;
  technicalArchitecture: string;
  slaCommitment: string;
  differentiationFactor: string;
}

export interface RfpDecomposition {
  id: string;
  tenderTitle: string;
  client: string;
  submissionDeadline: string;
  targetBudget: string;
  requirements: RfpRequirement[];
  proposalDraft: ProposalDraft;
}

export interface ContractClause {
  id: string;
  section: string;
  title: string;
  originalText: string;
  riskLevel: RiskLevel;
  riskAnalysis: string;
  proposedRedline: string;
  rationale: string;
  isRedlineAccepted: boolean;
}

export interface MarginFinancials {
  listPriceARR: number;
  currentDiscountPercent: number;
  contractTermYears: number;
  targetGrossMarginPercent: number;
  cogsPercent: number;
  paymentTerms: 'Net 30' | 'Net 60' | 'Net 90' | 'Upfront Annual' | 'Multi-year Prepaid';
  approvalRequiredTier: 'Autonomous Deal Desk' | 'VP of Sales Approval' | 'CFO / Board Escalation';
}

export interface SecurityQuestion {
  id: string;
  question: string;
  standard: 'SOC2 Type II' | 'ISO 27001' | 'GDPR' | 'HIPAA' | 'EU AI Act' | 'PCI-DSS' | 'ISO 20022' | 'Maritime Cyber';
  answer: string;
  confidenceScore: number;
  evidenceReference: string;
}

export interface SecurityCompliance {
  certifications: Array<{
    name: string;
    coveragePercent: number;
    status: 'Verified' | 'Audit in Progress' | 'Exempt';
    validUntil: string;
  }>;
  questionnaire: SecurityQuestion[];
}

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
}

export interface DealScenario {
  id: string;
  title: string;
  clientName: string;
  industry: 'Cloud Infrastructure' | 'FinTech & Banking' | 'HealthTech' | 'Global Supply Chain';
  dealValue: string;
  contractType: string;
  overallDealHealth: number; // 0-100
  riskScore: number; // 0-100
  summary: string;
  agents: AgentTelemetry[];
  rfpData: RfpDecomposition;
  contractClauses: ContractClause[];
  financials: MarginFinancials;
  securityCompliance: SecurityCompliance;
  copilotSuggestions: string[];
}
