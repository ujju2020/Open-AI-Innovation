import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN

def create_deck():
    template_path = r"C:\Users\Administration\Downloads\Idea Submission Deck _ Builders Pitch Fest 2026.pptx"
    output_pptx = r"c:\Users\Administration\Desktop\VibeCoding\BITSom Vertex Fest\Open-AI-Innovation\BPF2026_IdeaSubmission_PitchDeck_CogniDeal.pptx"
    output_pptx_dl = r"C:\Users\Administration\Downloads\BPF2026_IdeaSubmission_PitchDeck_CogniDeal.pptx"

    prs = Presentation(template_path)

    # Color Palette (Enterprise Deal Desk & Legal Intelligence)
    DARK_NAVY = RGBColor(15, 23, 42)      # #0F172A - Headers
    TEAL_DEAL = RGBColor(13, 148, 136)    # #0D9488 - Question headers / Accents
    SLATE_BODY = RGBColor(51, 65, 85)     # #334155 - Body text
    MUTED_TEXT = RGBColor(100, 116, 139)  # #64748B - Sub-meta
    ACCENT_BLUE = RGBColor(37, 99, 235)   # #2563EB - Metrics / highlights

    # -------------------------------------------------------------
    # SLIDE 1: Title Slide (Cover)
    # -------------------------------------------------------------
    slide1 = prs.slides[0]
    tb1 = slide1.shapes.add_textbox(Inches(0.8), Inches(1.2), Inches(8.4), Inches(3.2))
    tf1 = tb1.text_frame
    tf1.word_wrap = True

    p0 = tf1.paragraphs[0]
    p0.text = "CogniDeal AI"
    p0.font.name = "Arial"
    p0.font.size = Pt(36)
    p0.font.bold = True
    p0.font.color.rgb = TEAL_DEAL
    p0.space_after = Pt(6)

    p1 = tf1.add_paragraph()
    p1.text = "Autonomous B2B Deal Desk & Contract Risk Intelligence Swarm"
    p1.font.name = "Arial"
    p1.font.size = Pt(17)
    p1.font.bold = True
    p1.font.color.rgb = DARK_NAVY
    p1.space_after = Pt(12)

    p2 = tf1.add_paragraph()
    p2.text = "5-Agent Enterprise Swarm • Contract Liability Redlining • Gross Margin Guardrails"
    p2.font.name = "Arial"
    p2.font.size = Pt(11.5)
    p2.font.color.rgb = SLATE_BODY
    p2.space_after = Pt(20)

    p3 = tf1.add_paragraph()
    p3.text = "BITSoM Vertex Pitch Fest 2026 (BPF 2026) | Idea Submission Deck"
    p3.font.name = "Arial"
    p3.font.size = Pt(12)
    p3.font.bold = True
    p3.font.color.rgb = ACCENT_BLUE
    p3.space_after = Pt(4)

    p4 = tf1.add_paragraph()
    p4.text = "Founder: Ujjwal Kumar Bhowmick  |  Email: ujjwalkumarbhowmick30@gmail.com"
    p4.font.name = "Arial"
    p4.font.size = Pt(11)
    p4.font.color.rgb = MUTED_TEXT

    # -------------------------------------------------------------
    # Helper to populate Q&A content into Shape on slides 3-13
    # -------------------------------------------------------------
    def populate_qa_slide(slide_idx, qa_list):
        slide = prs.slides[slide_idx - 1]
        target_shape = None
        for s in slide.shapes:
            if s.has_text_frame and s.top > 1000000:
                target_shape = s
                break
        
        if not target_shape:
            target_shape = slide.shapes.add_textbox(Inches(0.4), Inches(1.3), Inches(9.2), Inches(3.6))

        tf = target_shape.text_frame
        tf.word_wrap = True
        tf.clear()

        first = True
        for item in qa_list:
            if "q" in item:
                pq = tf.paragraphs[0] if first else tf.add_paragraph()
                first = False
                pq.text = item["q"]
                pq.font.name = "Arial"
                pq.font.size = Pt(11)
                pq.font.bold = True
                pq.font.color.rgb = TEAL_DEAL
                pq.space_before = Pt(6) if not first else Pt(0)
                pq.space_after = Pt(3)

            for b in item.get("bullets", []):
                pb = tf.add_paragraph()
                pb.text = "•  " + b
                pb.font.name = "Arial"
                pb.font.size = Pt(9.5)
                pb.font.color.rgb = SLATE_BODY
                pb.space_after = Pt(2.5)

    # -------------------------------------------------------------
    # SLIDE 3: Startup Snapshot
    # -------------------------------------------------------------
    populate_qa_slide(3, [
        {
            "q": "What problem are you trying to solve?",
            "bullets": [
                "The 3-Week Enterprise Deal Chokehold: B2B enterprise deals take weeks to close due to grueling manual RFP analysis, protracted legal redlining cycles, rogue sales discounting, and repetitive 200-question security assessments.",
                "Catastrophic Contractual Liabilities: Over 42% of corporate legal disputes originate from uncapped indemnity, IP transfer, or punitive SLA damages that slipped past overworked legal teams."
            ]
        },
        {
            "q": "What inspired you to work on this problem?",
            "bullets": [
                "The Deal Desk Disconnect: Sales wants to close fast; Legal and Finance must protect risk and margin. We built CogniDeal AI to unite legal, pricing, compliance, and sales into a synchronized autonomous intelligence swarm that compresses deal cycles from 21 days to under 48 hours.",
                "The Solution: CogniDeal AI coordinates 5 specialized agents across RFP bid drafting, contract redlining, margin guardrails, security questionnaires, and C-suite deal briefs."
            ]
        }
    ])

    # -------------------------------------------------------------
    # SLIDE 4: Problem Understanding
    # -------------------------------------------------------------
    populate_qa_slide(4, [
        {
            "q": "What problem are you solving, and who experiences it most acutely?",
            "bullets": [
                "Acutely experienced by Chief Revenue Officers (CROs), General Counsels (GCs), Heads of Deal Desk, and Sales Operations leaders at enterprise software and services firms.",
                "Revenue Drag: Prolonged deal cycles lead to 28% quarter-end deal slippage. Sales reps spend up to 35 hours per month on non-selling redlining tasks.",
                "Margin Bleed: Uncontrolled discounting erodes corporate gross margins by 400–800 basis points per deal."
            ]
        },
        {
            "q": "What research, observations, or evidence validate this opportunity?",
            "bullets": [
                "World Commerce & Contracting (WorldCC) data shows poor contract management erodes 9.2% of a typical enterprise's annual bottom line.",
                "Corporate legal teams spend over 70% of their bandwidth reviewing low-to-medium risk boilerplate clauses rather than high-stakes strategic negotiations.",
                "Enterprise vendor onboarding security audits stall deals for an average of 45 days."
            ]
        }
    ])

    # -------------------------------------------------------------
    # SLIDE 5: Customer & Opportunity
    # -------------------------------------------------------------
    populate_qa_slide(5, [
        {
            "q": "Who is your ideal customer, and who would make the buying decision?",
            "bullets": [
                "Ideal Customers: Mid-to-Large B2B Enterprise Companies (SaaS, Cloud Infrastructure, IT Services, Consulting) selling six-figure and seven-figure annual contracts.",
                "Economic Buyers: Chief Revenue Officers, General Counsels, VP of Sales Operations, and Chief Financial Officers.",
                "End Users: Account Executives, Deal Desk Analysts, In-House Corporate Lawyers, and Compliance Officers."
            ]
        },
        {
            "q": "How large is the opportunity if your assumptions prove correct?",
            "bullets": [
                "Global TAM: $26.4 Billion Enterprise Contract Lifecycle Management (CLM) and Deal Desk Software market (growing at 13.8% CAGR).",
                "Global SAM: $3.1 Billion addressable spend in B2B contract risk automation, RFP intelligence, and deal desk optimization.",
                "Immediate SOM: ₹190 Crores ($23M ARR) targeting top 300 Indian and US enterprise software/IT vendors."
            ]
        }
    ])

    # -------------------------------------------------------------
    # SLIDE 6: Proposed Solution
    # -------------------------------------------------------------
    populate_qa_slide(6, [
        {
            "q": "What is your proposed solution, and how does it address the identified problem?",
            "bullets": [
                "CogniDeal AI is an autonomous deal desk intelligence swarm that unites RFP digestion, contract liability redlining, pricing guardrails, security questionnaire automation, and executive deal synthesis into a single cockpit."
            ]
        },
        {
            "q": "What are the key capabilities you envision?",
            "bullets": [
                "DealScout (RFP Architect): Ingests multi-page RFPs, generates compliance matrices, and produces tailored competitive bid drafts.",
                "LexiGuard (Contract Risk & Redline): Scans contracts for predatory terms (uncapped liabilities, IP loss) and generates balanced substitute clauses.",
                "MarginPilot (Pricing Guardrails): Real-time margin waterfall modeling, volume discount boundaries, and automated CFO escalation routing.",
                "TrustVertex (Security Auditor): Instantly auto-fills enterprise security questionnaires (SOC2, ISO 27001, GDPR) with exact knowledge citations.",
                "DealDesk Copilot: Multi-turn strategic negotiation copilot and 1-click executive deal brief generator."
            ]
        },
        {
            "q": "What measurable value do you expect the solution to deliver?",
            "bullets": [
                "80% Reduction in enterprise deal turnaround time (from 3 weeks down to under 48 hours).",
                "95% Faster Contract Redlining and liability auditing  |  350 bps Gross Margin Protection through discount boundaries."
            ]
        }
    ])

    # -------------------------------------------------------------
    # SLIDE 7: Technology & AI Approach
    # -------------------------------------------------------------
    populate_qa_slide(7, [
        {
            "q": "What role will AI play in your proposed solution, and why is it essential?",
            "bullets": [
                "AI operates as an autonomous multi-agent deal team: parsing dense legal syntax, balancing conflicting corporate clauses, calculating pricing elasticities, and formulating strategic negotiation talk tracks."
            ]
        },
        {
            "q": "What technologies, AI models, or frameworks do you plan to use, and why?",
            "bullets": [
                "Reasoning & Legal Intelligence Core: Google Gemini 2.5 Flash / Vertex AI for massive 1M+ token context windows capable of digesting entire 100-page enterprise contracts in a single pass.",
                "Modern Stack: React 18, Vite, TypeScript, Tailwind CSS, Lucide system icons, and full offline simulation resilience."
            ]
        },
        {
            "q": "What makes you feel your product is a genuine AI product, and not an AI wrapper?",
            "bullets": [
                "CogniDeal AI coordinates a multi-agent state graph where each agent validates legal risk thresholds, pricing floors, and compliance requirements through formal rule engines before prompting AI for synthesis."
            ]
        }
    ])

    # -------------------------------------------------------------
    # SLIDE 8: Competitive Landscape
    # -------------------------------------------------------------
    populate_qa_slide(8, [
        {
            "q": "What alternatives currently exist?",
            "bullets": [
                "Legacy CLM Software (Ironclad, Icertis, DocuSign CLM): Monolithic document repositories requiring 6-month setups that lack autonomous multi-agent deal desk orchestration.",
                "Point RFP Tools (Loopio, Responsive): Isolated Q&A databases that cannot evaluate contract liability, margin impact, or security questionnaires.",
                "Manual Spreadsheets & Email Chains: Fragmented, error-prone communication between Sales, Legal, and Finance."
            ]
        },
        {
            "q": "Why do you believe your approach is better suited to solving this problem?",
            "bullets": [
                "CogniDeal AI is the only unified platform orchestrating Legal, Finance, Security, and Sales agents simultaneously to close deals securely at record speed."
            ]
        }
    ])

    # -------------------------------------------------------------
    # SLIDE 9: Business Model & Go-To-Market
    # -------------------------------------------------------------
    populate_qa_slide(9, [
        {
            "q": "Who do you expect will pay for your solution?",
            "bullets": [
                "B2B SaaS Tiered Platform Licensing:",
                "Growth Deal Desk: $1,500 / month for up to 10 active sales and legal seats.",
                "Enterprise Swarm: $4,500 / month for unlimited seats, dedicated custom contract playbook fine-tuning, and private VPC security.",
                "Annual Enterprise Contract: $50,000–$120,000 / year for global enterprise deployments."
            ]
        },
        {
            "q": "How do you plan to acquire your first customers?",
            "bullets": [
                "High-Velocity Sales Ops Outreach: Target B2B SaaS companies experiencing rapid hiring and contract bottlenecks.",
                "Free Contract Risk Audit: Offer enterprise prospects a free 1-click liability scan of their standard MSA to demonstrate immediate value.",
                "BITSoM Vertex Ecosystem: Leverage BITSoM corporate partnerships and alumni networks across enterprise B2B companies in Mumbai."
            ]
        }
    ])

    # -------------------------------------------------------------
    # SLIDE 10: Development Roadmap
    # -------------------------------------------------------------
    populate_qa_slide(10, [
        {
            "q": "What are the next major milestones toward building your MVP?",
            "bullets": [
                "Current Status (Phase 0): Fully functional, interactive production prototype with 5 agents, live RFP parser, redline engine, margin calculator, and deal dossier export (Completed & Verified).",
                "Phase 1 (Months 1–3): Native Salesforce, HubSpot CRM, and DocuSign bi-directional API integrations.",
                "Phase 2 (Months 4–6): Microsoft Word and Google Docs redlining add-in for real-time in-line contract edits.",
                "Phase 3 (Months 7–12): Enterprise SOC2 Type II compliance and multi-jurisdictional legal playbook libraries (US, UK, India, EU)."
            ]
        },
        {
            "q": "What resources or support will be most critical during this journey?",
            "bullets": [
                "Corporate Legal Advisory: Access to senior general counsels to calibrate standard balanced redline playbooks.",
                "Enterprise Sales Pilots: B2B SaaS partner cohorts to test deal velocity improvements in live quarterly cycles.",
                "Cloud Infrastructure Credits: Vertex AI credits for processing high volumes of multi-page PDF documents."
            ]
        }
    ])

    # -------------------------------------------------------------
    # SLIDE 11: Team
    # -------------------------------------------------------------
    populate_qa_slide(11, [
        {
            "q": "Why is your team uniquely positioned to solve this problem?",
            "bullets": [
                "Deep technical expertise in multi-agent LLM systems combined with a rigorous understanding of enterprise sales mechanics, contract law fundamentals, and SaaS unit economics.",
                "Demonstrated ability to ship production-grade, highly intuitive enterprise software within accelerated timeframes."
            ]
        },
        {
            "q": "What relevant domain or technical expertise does the team possess?",
            "bullets": [
                "Ujjwal Kumar Bhowmick (Founder & Lead AI Engineer):",
                "Extensive expertise in full-stack TypeScript, React 18, Tailwind, and Google Gemini / Vertex AI multi-agent architectures.",
                "Specialized in structured contract data parsing, financial margin modeling, and enterprise compliance systems."
            ]
        }
    ])

    # -------------------------------------------------------------
    # SLIDE 12: Why BITSoM Vertex?
    # -------------------------------------------------------------
    populate_qa_slide(12, [
        {
            "q": "Why have you applied to the BITSoM Vertex programme?",
            "bullets": [
                "Premier B2B Enterprise Launchpad: BITSoM's Mumbai campus is situated at the epicenter of India's corporate headquarters, providing direct access to enterprise revenue and legal leaders.",
                "Commercialization Mentorship: Guidance from top business strategists on enterprise sales compensation, customer acquisition, and enterprise pricing models."
            ]
        },
        {
            "q": "What is the biggest challenge preventing you from building your MVP?",
            "bullets": [
                "The MVP is built, polished, and operational! The primary objective now is enterprise pilot validation: deploying CogniDeal AI in live deal desks, measuring cycle compression, and securing commercial contracts. BITSoM Vertex provides the ideal network."
            ]
        }
    ])

    # -------------------------------------------------------------
    # SLIDE 13: Supporting Material
    # -------------------------------------------------------------
    populate_qa_slide(13, [
        {
            "q": "Key Links & Prototype Validation:",
            "bullets": [
                "Working Prototype: Fully functional local environment (React 18 / TypeScript on :5173 with RFP breakdown, contract liability redlines, margin calculator, and C-suite deal dossier export).",
                "GitHub Repository: https://github.com/ujju2020/Open-AI-Innovation (Complete source code, multi-agent schemas, and setup instructions).",
                "Demo Explainer Video: 2-minute walkthrough showing DealScout, LexiGuard, MarginPilot, TrustVertex, and DealDesk Copilot in action.",
                "Contact: Ujjwal Kumar Bhowmick | ujjwalkumarbhowmick30@gmail.com | India"
            ]
        }
    ])

    # -------------------------------------------------------------
    # SLIDE 14: Conclusion / Closing Slide
    # -------------------------------------------------------------
    slide14 = prs.slides[13]
    tb14 = slide14.shapes.add_textbox(Inches(0.8), Inches(1.3), Inches(8.4), Inches(3.0))
    tf14 = tb14.text_frame
    tf14.word_wrap = True

    c0 = tf14.paragraphs[0]
    c0.text = "CogniDeal AI"
    c0.font.name = "Arial"
    c0.font.size = Pt(36)
    c0.font.bold = True
    c0.font.color.rgb = TEAL_DEAL
    c0.space_after = Pt(8)

    c1 = tf14.add_paragraph()
    c1.text = "Transforming Enterprise B2B Commerce Through Autonomous Deal Desk Intelligence"
    c1.font.name = "Arial"
    c1.font.size = Pt(17)
    c1.font.bold = True
    c1.font.color.rgb = DARK_NAVY
    c1.space_after = Pt(14)

    c2 = tf14.add_paragraph()
    c2.text = "Thank You! Open for Questions & Evaluation."
    c2.font.name = "Arial"
    c2.font.size = Pt(14)
    c2.font.bold = True
    c2.font.color.rgb = ACCENT_BLUE
    c2.space_after = Pt(16)

    c3 = tf14.add_paragraph()
    c3.text = "Founder: Ujjwal Kumar Bhowmick  |  ujjwalkumarbhowmick30@gmail.com"
    c3.font.name = "Arial"
    c3.font.size = Pt(11)
    c3.font.color.rgb = MUTED_TEXT

    # Save PPTX
    prs.save(output_pptx)
    prs.save(output_pptx_dl)
    print(f"PPTX successfully created at:\n  - {output_pptx}\n  - {output_pptx_dl}")

if __name__ == "__main__":
    create_deck()
