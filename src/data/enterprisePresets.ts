/**
 * CogniDeal AI — Pre-Computed Enterprise B2B Scenarios
 * Copyright (c) 2026 Ujjwal Kumar Bhowmick. All rights reserved.
 * Developer: Ujjwal Kumar Bhowmick (ujjwalkumarbhowmick30@gmail.com)
 */

import { DealScenario } from '../types/deal';

export const ENTERPRISE_PRESETS: DealScenario[] = [
  {
    id: 'scenario-cloud',
    title: 'Fortune 500 Hybrid Cloud Migration & Autonomous FinOps',
    clientName: 'ApexGlobal Financial Services',
    industry: 'Cloud Infrastructure',
    dealValue: '$4,800,000 TCV',
    contractType: 'Master Cloud Services Agreement (MCSA)',
    overallDealHealth: 88,
    riskScore: 68,
    summary: 'Multi-year enterprise cloud modernization contract across 14 global data centers. High-risk unlimited indemnification clause and 99.995% uptime penalty detected.',
    agents: [
      {
        id: 'agent-1',
        name: 'DealScout',
        codename: 'RFP Architect',
        role: 'Ingests RFPs & Generates Proposal Matrices',
        status: 'completed',
        confidence: 96.4,
        tokensProcessed: 14200,
        latencyMs: 1420,
        outputSummary: 'Extracted 12 mandatory technical requirements; 100% compliant with automated bid architecture.',
        iconName: 'FileText'
      },
      {
        id: 'agent-2',
        name: 'LexiGuard',
        codename: 'Contract Risk & Redline',
        role: 'Audits Clauses & Flags Legal Liabilities',
        status: 'completed',
        confidence: 94.8,
        tokensProcessed: 28400,
        latencyMs: 2150,
        outputSummary: 'Flagged 2 high-risk clauses (uncapped indemnity & liquidated damages). Generated balanced substitute redlines.',
        iconName: 'ShieldAlert'
      },
      {
        id: 'agent-3',
        name: 'MarginPilot',
        codename: 'Pricing & Financial Guardrails',
        role: 'Models Margins & Prevents Margin Leakage',
        status: 'completed',
        confidence: 98.1,
        tokensProcessed: 9100,
        latencyMs: 890,
        outputSummary: 'Modeled 18% volume discount; projected gross margin is 72.4% with Net 30 upfront annual payment.',
        iconName: 'DollarSign'
      },
      {
        id: 'agent-4',
        name: 'TrustVertex',
        codename: 'Security & Compliance Auditor',
        role: 'Automates Security Questionnaire & Reg Audits',
        status: 'completed',
        confidence: 99.2,
        tokensProcessed: 18900,
        latencyMs: 1650,
        outputSummary: 'Auto-certified 150/150 security questions across SOC2 Type II, ISO 27001, and GDPR controls.',
        iconName: 'CheckCircle2'
      },
      {
        id: 'agent-5',
        name: 'DealDesk Copilot',
        codename: 'Executive Decision Concierge',
        role: 'Synthesizes C-Suite Strategy & Approval Dossiers',
        status: 'completed',
        confidence: 97.5,
        tokensProcessed: 12500,
        latencyMs: 1100,
        outputSummary: 'Compiled Executive Approval Dossier. Win probability estimated at 84% post-redline agreement.',
        iconName: 'BrainCircuit'
      }
    ],
    rfpData: {
      id: 'rfp-apex-01',
      tenderTitle: 'RFP #2026-CLOUD-099: Global Core Cloud Migration',
      client: 'ApexGlobal Financial Services',
      submissionDeadline: 'September 28, 2026',
      targetBudget: '$5,200,000',
      requirements: [
        {
          id: 'req-1',
          category: 'Technical',
          requirement: 'Zero-downtime database live replication across US-East, EU-Central, and APAC-Tokyo.',
          complianceStatus: 'Compliant',
          matchScore: 98,
          winningStrategy: 'Highlight multi-master active-active mesh architecture with sub-50ms sync latency.'
        },
        {
          id: 'req-2',
          category: 'Security & Compliance',
          requirement: 'Hardware Security Module (HSM) dedicated key management with BYOK encryption.',
          complianceStatus: 'Compliant',
          matchScore: 100,
          winningStrategy: 'Reference FIPS 140-3 Level 4 validation and client-held KMS integration.'
        },
        {
          id: 'req-3',
          category: 'SLA & Support',
          requirement: '99.995% monthly service uptime backed by 50% monthly fee credit penalty on breach.',
          complianceStatus: 'Needs Exception',
          matchScore: 74,
          winningStrategy: 'Counter with 99.99% tier standard and cap SLA credit penalty at 20% of monthly fee.'
        },
        {
          id: 'req-4',
          category: 'Commercial',
          requirement: '3-year price lock with optional 2-year extension at no greater than 2% CPI indexing.',
          complianceStatus: 'Compliant',
          matchScore: 92,
          winningStrategy: 'Agree to price freeze contingent on upfront annual payment term structure.'
        }
      ],
      proposalDraft: {
        executiveSummary: 'CogniDeal Autonomous Cloud Mesh delivers zero-downtime global modernization for ApexGlobal, pairing enterprise-grade resilience with proactive FinOps automation.',
        technicalArchitecture: 'Microservices container fabric deployed on Kubernetes with automated telemetry routing, Geo-DNS failover, and hardware-backed KMS encryption.',
        slaCommitment: '99.99% availability backed by 24/7/365 dedicated Tier-3 TAM support with 15-minute P1 response window.',
        differentiationFactor: 'Self-healing infrastructure swarm reducing manual incident remediation time by 78%.'
      }
    },
    contractClauses: [
      {
        id: 'cl-1',
        section: 'Section 11.2',
        title: 'Mutual vs. Asymmetric Indemnification Trap',
        originalText: 'Vendor shall defend, indemnify, and hold harmless ApexGlobal and its affiliates against any and all claims, liabilities, losses, damages, costs, and expenses (including attorneys fees) arising out of or related to this Agreement, without financial limitation.',
        riskLevel: 'critical',
        riskAnalysis: 'Unlimited unilateral indemnification exposes the vendor to catastrophic liabilities far exceeding the total contract value (TCV).',
        proposedRedline: 'Vendor shall defend and indemnify Customer against third-party claims alleging direct infringement of intellectual property by Vendor services, provided Vendor liability shall not exceed the fees paid by Customer during the prior 12 months.',
        rationale: 'Limits indemnification strictly to IP infringement and binds liability to a customary 12-month trailing revenue cap.',
        isRedlineAccepted: false
      },
      {
        id: 'cl-2',
        section: 'Section 14.4',
        title: 'Liquidated Damages for SLA Downtime',
        originalText: 'Failure to maintain 99.995% uptime shall result in liquidated damages payable to Customer at a rate of $25,000 per downtime hour, up to 100% of quarterly invoice.',
        riskLevel: 'high',
        riskAnalysis: 'Unrealistic 99.995% uptime metric combined with punitive hourly cash penalties rather than standard service credits.',
        proposedRedline: 'In the event Vendor fails to maintain 99.99% uptime in any calendar month, Customer sole remedy shall be a service credit equal to 5% of monthly fees for each 0.05% downtime, capped at 20% total monthly billings.',
        rationale: 'Restores industry standard service credits in lieu of punitive cash liquidated damages.',
        isRedlineAccepted: false
      },
      {
        id: 'cl-3',
        section: 'Section 8.1',
        title: 'Customer Data Ownership & Derived Telemetry',
        originalText: 'All data, analytics, logs, models, and derivative insights generated during the term shall be the exclusive property of Customer.',
        riskLevel: 'medium',
        riskAnalysis: 'Overly broad definition would strip Vendor of rights to general aggregate platform heuristics and machine learning weights.',
        proposedRedline: 'Customer retains sole ownership of raw Customer Confidential Data. Vendor retains ownership of anonymized, aggregated platform telemetry and generalized AI model weights that do not identify Customer.',
        rationale: 'Protects proprietary model training rights and general product operational telemetry.',
        isRedlineAccepted: true
      },
      {
        id: 'cl-4',
        section: 'Section 19.3',
        title: 'Termination for Convenience & Penalty-Free Exit',
        originalText: 'Customer may terminate this Agreement at any time without cause upon 15 calendar days written notice and receive a full prorated refund of any unearned fees.',
        riskLevel: 'high',
        riskAnalysis: '15-day termination without cause destroys multi-year contract ARR predictability and upfront hardware provisioning investments.',
        proposedRedline: 'Customer may terminate for convenience only after the initial 12-month period upon 90 days written notice and payment of an early termination fee equal to 50% of remaining contract term value.',
        rationale: 'Establishes a 12-month lock-in and reciprocal early exit buyout protection.',
        isRedlineAccepted: false
      }
    ],
    financials: {
      listPriceARR: 1600000,
      currentDiscountPercent: 18,
      contractTermYears: 3,
      targetGrossMarginPercent: 70,
      cogsPercent: 22,
      paymentTerms: 'Upfront Annual',
      approvalRequiredTier: 'VP of Sales Approval'
    },
    securityCompliance: {
      certifications: [
        { name: 'SOC2 Type II (Security, Availability, Confidentiality)', coveragePercent: 100, status: 'Verified', validUntil: 'Dec 2027' },
        { name: 'ISO/IEC 27001:2022', coveragePercent: 100, status: 'Verified', validUntil: 'Aug 2027' },
        { name: 'GDPR Data Processing Addendum (Standard Contractual Clauses)', coveragePercent: 96, status: 'Verified', validUntil: 'Active' },
        { name: 'EU AI Act Risk Class II Conformity', coveragePercent: 92, status: 'Audit in Progress', validUntil: 'Nov 2026' }
      ],
      questionnaire: [
        {
          id: 'q-1',
          question: 'Are all customer data stores encrypted at rest using AES-256 and in transit using TLS 1.3?',
          standard: 'SOC2 Type II',
          answer: 'Yes. All persistent storage volumes utilize hardware-accelerated AES-256-GCM encryption, and inter-service communications enforce TLS 1.3 with mTLS.',
          confidenceScore: 99.4,
          evidenceReference: 'SecOps Policy 4.2 & SOC2 Audit Report Section 3.12'
        },
        {
          id: 'q-2',
          question: 'What is your maximum Recovery Time Objective (RTO) and Recovery Point Objective (RPO)?',
          standard: 'ISO 27001',
          answer: 'Verified production RTO is under 15 minutes, with continuous log streaming achieving an RPO under 60 seconds.',
          confidenceScore: 98.7,
          evidenceReference: 'BCP/DR Drill Results Q2 2026'
        },
        {
          id: 'q-3',
          question: 'Does customer data ever get used to train foundation models without explicit contractual consent?',
          standard: 'EU AI Act',
          answer: 'No. Customer confidential data is strictly isolated within zero-retention tenant containers and never ingested into base model training.',
          confidenceScore: 100.0,
          evidenceReference: 'AI Ethics & Governance Framework Doc v3.0'
        }
      ]
    },
    copilotSuggestions: [
      'Simulate impact on margin if customer accepts 2-year upfront payment in exchange for 20% discount',
      'Generate executive 1-page counter-offer memo summarizing redlines for ApexGeneral Counsel',
      'What are our top 3 risk exposures in Section 11 and Section 14?',
      'Check if current discount violates CFO margin floor threshold'
    ]
  },
  {
    id: 'scenario-health',
    title: 'Enterprise HealthTech Patient Intelligence Platform',
    clientName: 'Vanguard Health Systems',
    industry: 'HealthTech',
    dealValue: '$2,400,000 TCV',
    contractType: 'Business Associate Agreement (BAA) & SaaS Order',
    overallDealHealth: 92,
    riskScore: 54,
    summary: 'Clinical EHR data integration supporting 12 hospital networks. Strict HIPAA BAA liability rules and patient record breach notification requirements.',
    agents: [
      {
        id: 'agent-1',
        name: 'DealScout',
        codename: 'RFP Architect',
        role: 'Ingests RFPs & Generates Proposal Matrices',
        status: 'completed',
        confidence: 97.2,
        tokensProcessed: 11800,
        latencyMs: 1200,
        outputSummary: 'Parsed 18 clinical integration requirements; mapped HL7/FHIR v4 endpoint compatibility.',
        iconName: 'FileText'
      },
      {
        id: 'agent-2',
        name: 'LexiGuard',
        codename: 'Contract Risk & Redline',
        role: 'Audits Clauses & Flags Legal Liabilities',
        status: 'completed',
        confidence: 95.9,
        tokensProcessed: 22100,
        latencyMs: 1890,
        outputSummary: 'Audited HIPAA Business Associate Agreement; revised 24-hour breach notice clause to 72 hours.',
        iconName: 'ShieldAlert'
      },
      {
        id: 'agent-3',
        name: 'MarginPilot',
        codename: 'Pricing & Financial Guardrails',
        role: 'Models Margins & Prevents Margin Leakage',
        status: 'completed',
        confidence: 99.0,
        tokensProcessed: 7800,
        latencyMs: 760,
        outputSummary: 'Approved 12% hospital alliance discount. Target gross margin preserved at 76.5%.',
        iconName: 'DollarSign'
      },
      {
        id: 'agent-4',
        name: 'TrustVertex',
        codename: 'Security & Compliance Auditor',
        role: 'Automates Security Questionnaire & Reg Audits',
        status: 'completed',
        confidence: 99.8,
        tokensProcessed: 16400,
        latencyMs: 1450,
        outputSummary: 'HIPAA Security Rule and HITRUST compliance fully validated with zero non-conformances.',
        iconName: 'CheckCircle2'
      },
      {
        id: 'agent-5',
        name: 'DealDesk Copilot',
        codename: 'Executive Decision Concierge',
        role: 'Synthesizes C-Suite Strategy & Approval Dossiers',
        status: 'completed',
        confidence: 98.0,
        tokensProcessed: 10400,
        latencyMs: 980,
        outputSummary: 'BAA liability negotiated within safe limits. Recommended for immediate VP signature.',
        iconName: 'BrainCircuit'
      }
    ],
    rfpData: {
      id: 'rfp-van-02',
      tenderTitle: 'RFP #HEALTH-2026: Clinical Decision & Diagnostics Swarm',
      client: 'Vanguard Health Systems',
      submissionDeadline: 'October 14, 2026',
      targetBudget: '$2,600,000',
      requirements: [
        {
          id: 'req-h1',
          category: 'Integration',
          requirement: 'Native bidirectional EHR sync with Epic Systems and Cerner via FHIR REST API.',
          complianceStatus: 'Compliant',
          matchScore: 99,
          winningStrategy: 'Provide pre-certified Epic App Orchard integration connectors with sub-second sync.'
        },
        {
          id: 'req-h2',
          category: 'Security & Compliance',
          requirement: 'Full HIPAA Business Associate Agreement with dedicated tenant data segregation.',
          complianceStatus: 'Compliant',
          matchScore: 100,
          winningStrategy: 'Execute standard enterprise BAA with dedicated isolated tenant databases.'
        }
      ],
      proposalDraft: {
        executiveSummary: 'CogniDeal Clinical Copilot delivers HIPAA-certified real-time patient triage and clinical diagnostic support across Vanguard medical facilities.',
        technicalArchitecture: 'Zero-trust microservices running on HIPAA-compliant Kubernetes with end-to-end PHI tokenization.',
        slaCommitment: '99.95% uptime with 24/7 dedicated clinical informatics engineering hotline.',
        differentiationFactor: 'Patented differential privacy architecture eliminating re-identification risks in clinical analytics.'
      }
    },
    contractClauses: [
      {
        id: 'cl-h1',
        section: 'BAA Section 4.1',
        title: 'Breach Notification Window Liability',
        originalText: 'Business Associate shall report any suspected or confirmed breach of Unsecured PHI to Covered Entity within 24 hours of first detection, subject to statutory penalties.',
        riskLevel: 'high',
        riskAnalysis: '24 hours is an unreasonably narrow window for forensic investigation of false positives before formal reporting.',
        proposedRedline: 'Business Associate shall report confirmed Security Incidents resulting in unauthorized disclosure of PHI without unreasonable delay and in no event later than seventy-two (72) hours following forensic confirmation.',
        rationale: 'Aligns with HIPAA statutory guidelines and allows necessary forensic confirmation.',
        isRedlineAccepted: false
      }
    ],
    financials: {
      listPriceARR: 1200000,
      currentDiscountPercent: 12,
      contractTermYears: 2,
      targetGrossMarginPercent: 75,
      cogsPercent: 18,
      paymentTerms: 'Upfront Annual',
      approvalRequiredTier: 'Autonomous Deal Desk'
    },
    securityCompliance: {
      certifications: [
        { name: 'HIPAA Security & Privacy Rule Compliance', coveragePercent: 100, status: 'Verified', validUntil: 'Annual' },
        { name: 'HITRUST CSF Certified v11', coveragePercent: 98, status: 'Verified', validUntil: 'May 2027' },
        { name: 'SOC2 Type II + HITRUST Mapping', coveragePercent: 100, status: 'Verified', validUntil: 'Jan 2027' }
      ],
      questionnaire: [
        {
          id: 'qh-1',
          question: 'Are all PHI identifiers masked or tokenized during clinical dashboard rendering?',
          standard: 'HIPAA',
          answer: 'Yes, role-based redaction dynamically masks Patient Identifiers (MRN, SSN, DOB) based on clinician role tier.',
          confidenceScore: 99.6,
          evidenceReference: 'Clinical Privacy Guard Policy 2.4'
        }
      ]
    },
    copilotSuggestions: [
      'Compare BAA liability terms against standard vendor risk policies',
      'Verify if Epic App Orchard connector licensing fee is factored into COGS'
    ]
  },
  {
    id: 'scenario-fintech',
    title: 'Core Banking Microservices & Real-Time Settlement Engine',
    clientName: 'Sovereign Capital Bank',
    industry: 'FinTech & Banking',
    dealValue: '$6,200,000 TCV',
    contractType: 'Enterprise Master Software Licensing & Maintenance',
    overallDealHealth: 84,
    riskScore: 72,
    summary: 'High-frequency transaction processing engine across 35 international subsidiaries. Severe regulatory penalties under Basel III and strict escrow demands.',
    agents: [
      {
        id: 'agent-1',
        name: 'DealScout',
        codename: 'RFP Architect',
        role: 'Ingests RFPs & Generates Proposal Matrices',
        status: 'completed',
        confidence: 95.1,
        tokensProcessed: 16500,
        latencyMs: 1540,
        outputSummary: 'Parsed ISO 20022 messaging requirements; guaranteed sub-5ms transaction latency.',
        iconName: 'FileText'
      },
      {
        id: 'agent-2',
        name: 'LexiGuard',
        codename: 'Contract Risk & Redline',
        role: 'Audits Clauses & Flags Legal Liabilities',
        status: 'completed',
        confidence: 93.7,
        tokensProcessed: 31200,
        latencyMs: 2400,
        outputSummary: 'Neutralized source code escrow clause and replaced unlimited consequential damages clause.',
        iconName: 'ShieldAlert'
      },
      {
        id: 'agent-3',
        name: 'MarginPilot',
        codename: 'Pricing & Financial Guardrails',
        role: 'Models Margins & Prevents Margin Leakage',
        status: 'completed',
        confidence: 97.4,
        tokensProcessed: 8900,
        latencyMs: 820,
        outputSummary: 'Discount requested: 22%. Escalated to CFO approval due to custom deployment services.',
        iconName: 'DollarSign'
      },
      {
        id: 'agent-4',
        name: 'TrustVertex',
        codename: 'Security & Compliance Auditor',
        role: 'Automates Security Questionnaire & Reg Audits',
        status: 'completed',
        confidence: 99.1,
        tokensProcessed: 19800,
        latencyMs: 1720,
        outputSummary: 'PCI-DSS v4.0 and ISO 27001 verified with full penetration test attestation.',
        iconName: 'CheckCircle2'
      },
      {
        id: 'agent-5',
        name: 'DealDesk Copilot',
        codename: 'Executive Decision Concierge',
        role: 'Synthesizes C-Suite Strategy & Approval Dossiers',
        status: 'completed',
        confidence: 96.0,
        tokensProcessed: 13800,
        latencyMs: 1190,
        outputSummary: 'Executive Brief prepared. Advise securing 4-year commit prior to conceding 20% discount.',
        iconName: 'BrainCircuit'
      }
    ],
    rfpData: {
      id: 'rfp-sov-03',
      tenderTitle: 'RFP #BANK-2026-X: High-Throughput Settlement Infrastructure',
      client: 'Sovereign Capital Bank',
      submissionDeadline: 'October 30, 2026',
      targetBudget: '$6,500,000',
      requirements: [
        {
          id: 'req-f1',
          category: 'Technical',
          requirement: '50,000 transactions per second (TPS) peak throughput with sub-5ms P99 latency.',
          complianceStatus: 'Compliant',
          matchScore: 97,
          winningStrategy: 'Showcase distributed in-memory actor model benchmarks with automated load balancing.'
        }
      ],
      proposalDraft: {
        executiveSummary: 'CogniDeal Settlement Engine brings mission-critical resiliency and ISO 20022 compliance to Sovereign Capital global rails.',
        technicalArchitecture: 'High-speed distributed Raft consensus engine with hardware network offload.',
        slaCommitment: '99.999% tier availability with automated multi-region active replication.',
        differentiationFactor: 'Zero-loss disaster recovery failover under 3 seconds.'
      }
    },
    contractClauses: [
      {
        id: 'cl-f1',
        section: 'Section 16.2',
        title: 'Source Code Escrow Release Triggers',
        originalText: 'Vendor shall deposit full source code into escrow, to be released to Customer upon any service interruption lasting greater than 4 continuous hours.',
        riskLevel: 'critical',
        riskAnalysis: 'A temporary 4-hour outage triggering source code release poses extreme proprietary intellectual property risk.',
        proposedRedline: 'Escrow release shall occur solely upon formal judicial liquidation or bankruptcy of Vendor without assumption by an acquiring successor entity.',
        rationale: 'Restricts escrow release strictly to insolvency, safeguarding IP assets against operational glitches.',
        isRedlineAccepted: false
      }
    ],
    financials: {
      listPriceARR: 1550000,
      currentDiscountPercent: 22,
      contractTermYears: 4,
      targetGrossMarginPercent: 72,
      cogsPercent: 24,
      paymentTerms: 'Multi-year Prepaid',
      approvalRequiredTier: 'CFO / Board Escalation'
    },
    securityCompliance: {
      certifications: [
        { name: 'PCI-DSS Level 1 Service Provider v4.0', coveragePercent: 100, status: 'Verified', validUntil: 'Feb 2027' },
        { name: 'ISO/IEC 27001:2022', coveragePercent: 100, status: 'Verified', validUntil: 'Nov 2027' }
      ],
      questionnaire: [
        {
          id: 'qf-1',
          question: 'Are cryptographic keys rotated at minimum every 90 days or immediately upon suspected breach?',
          standard: 'PCI-DSS',
          answer: 'Keys are managed via AWS KMS with automated 90-day rotation and instant manual re-keying capability.',
          confidenceScore: 99.8,
          evidenceReference: 'Key Management Architecture Spec v2.1'
        }
      ]
    },
    copilotSuggestions: [
      'Draft CFO approval briefing on 22% discount for 4-year upfront commitment',
      'Assess potential financial exposure of the 4-hour escrow release clause'
    ]
  },
  {
    id: 'scenario-logistics',
    title: 'Global Maritime & Fleet IoT Intelligence Swarm',
    clientName: 'TransOceanic Freight Group',
    industry: 'Global Supply Chain',
    dealValue: '$3,100,000 TCV',
    contractType: 'Enterprise IoT Telematics & Analytics Agreement',
    overallDealHealth: 90,
    riskScore: 48,
    summary: 'Container tracking and maritime route optimization across 450 cargo vessels. International maritime law and cross-border telecommunications regulations.',
    agents: [
      {
        id: 'agent-1',
        name: 'DealScout',
        codename: 'RFP Architect',
        role: 'Ingests RFPs & Generates Proposal Matrices',
        status: 'completed',
        confidence: 96.7,
        tokensProcessed: 13100,
        latencyMs: 1310,
        outputSummary: 'Satellite telemetry requirements parsed; offline edge sync protocols confirmed.',
        iconName: 'FileText'
      },
      {
        id: 'agent-2',
        name: 'LexiGuard',
        codename: 'Contract Risk & Redline',
        role: 'Audits Clauses & Flags Legal Liabilities',
        status: 'completed',
        confidence: 95.2,
        tokensProcessed: 24300,
        latencyMs: 1980,
        outputSummary: 'Clarified satellite latency force majeure exemptions in maritime transit zones.',
        iconName: 'ShieldAlert'
      },
      {
        id: 'agent-3',
        name: 'MarginPilot',
        codename: 'Pricing & Financial Guardrails',
        role: 'Models Margins & Prevents Margin Leakage',
        status: 'completed',
        confidence: 98.6,
        tokensProcessed: 8100,
        latencyMs: 780,
        outputSummary: '15% volume discount applied. Healthy 74.2% projected gross margin.',
        iconName: 'DollarSign'
      },
      {
        id: 'agent-4',
        name: 'TrustVertex',
        codename: 'Security & Compliance Auditor',
        role: 'Automates Security Questionnaire & Reg Audits',
        status: 'completed',
        confidence: 99.3,
        tokensProcessed: 17200,
        latencyMs: 1510,
        outputSummary: 'IMO Maritime Cybersecurity guidelines and ISO 27001 verified.',
        iconName: 'CheckCircle2'
      },
      {
        id: 'agent-5',
        name: 'DealDesk Copilot',
        codename: 'Executive Decision Concierge',
        role: 'Synthesizes C-Suite Strategy & Approval Dossiers',
        status: 'completed',
        confidence: 97.8,
        tokensProcessed: 11200,
        latencyMs: 1040,
        outputSummary: 'Low risk deal profile. Standard sales VP sign-off enabled.',
        iconName: 'BrainCircuit'
      }
    ],
    rfpData: {
      id: 'rfp-tra-04',
      tenderTitle: 'RFP #LOG-2026: Maritime Predictive Fleet Telematics',
      client: 'TransOceanic Freight Group',
      submissionDeadline: 'November 15, 2026',
      targetBudget: '$3,300,000',
      requirements: [
        {
          id: 'req-l1',
          category: 'Technical',
          requirement: 'Edge AI processing aboard vessels with low-bandwidth L-band satellite synchronization.',
          complianceStatus: 'Compliant',
          matchScore: 98,
          winningStrategy: 'Highlight delta-compression telemetry protocol consuming under 12kbps bandwidth.'
        }
      ],
      proposalDraft: {
        executiveSummary: 'CogniDeal Maritime IoT Swarm equips 450 TransOceanic vessels with intelligent route optimization and fuel efficiency analytics.',
        technicalArchitecture: 'Edge Docker runtime deploying on marine compute with store-and-forward satellite sync.',
        slaCommitment: '99.9% platform availability with global 24/7 port support.',
        differentiationFactor: 'Proven 8.4% bunker fuel reduction per trans-Pacific voyage.'
      }
    },
    contractClauses: [
      {
        id: 'cl-l1',
        section: 'Section 9.4',
        title: 'Maritime Route Delay Consequential Damages',
        originalText: 'Vendor shall be liable for cargo spoilage or demurrage fees incurred by Customer in the event of software routing anomalies.',
        riskLevel: 'high',
        riskAnalysis: 'Demurrage and cargo spoilage liabilities in international shipping can reach millions per ship voyage.',
        proposedRedline: 'In no event shall Vendor be liable for indirect, consequential, or punitive damages, including cargo delay, spoilage, or port demurrage fees.',
        rationale: 'Enforces standard waiver of indirect and consequential supply chain losses.',
        isRedlineAccepted: false
      }
    ],
    financials: {
      listPriceARR: 1033333,
      currentDiscountPercent: 15,
      contractTermYears: 3,
      targetGrossMarginPercent: 70,
      cogsPercent: 20,
      paymentTerms: 'Net 30',
      approvalRequiredTier: 'Autonomous Deal Desk'
    },
    securityCompliance: {
      certifications: [
        { name: 'IMO MSC.428(98) Maritime Cyber Risk Management', coveragePercent: 100, status: 'Verified', validUntil: 'Dec 2027' },
        { name: 'ISO/IEC 27001:2022', coveragePercent: 96, status: 'Verified', validUntil: 'Aug 2027' }
      ],
      questionnaire: [
        {
          id: 'ql-1',
          question: 'Does the shipboard software support complete air-gapped offline autonomy for up to 30 days?',
          standard: 'ISO 27001',
          answer: 'Yes, vessel edge nodes cache telemetry and route algorithms locally, operating fully autonomously during satellite blackout.',
          confidenceScore: 99.5,
          evidenceReference: 'Marine Edge Architecture Specification 1.8'
        }
      ]
    },
    copilotSuggestions: [
      'Show fuel saving ROI breakdown across 450 container vessels',
      'Verify satellite bandwidth quota limits under Section 6'
    ]
  }
];
