\# PROOFPATH v18.0 — UNIFIED MASTER PROMPT



\## Product Evolution, Learning Intelligence, Verified Competency, Career Readiness \& Token-Efficient Engineering



\## 0. Operating Rules



This is the single authoritative master prompt for ProofPath. Follow it as one coherent product and engineering plan, not as disconnected feature requests.



\* Work directly in the repository. Inspect, implement, test, document, and report; do not deliver only advice, mock-ups, or a roadmap.

\* Use concise English internally where appropriate to reduce token consumption. Preserve every requirement, acceptance criterion, security constraint, and existing working capability.

\* The user and assistant communicate in Turkish. Keep normal conversation and final reports in Turkish. Preserve the existing learner-facing language and conventions, including Turkish UI where currently used.

\* Do not assume the repository structure, framework, database, feature status, deployment configuration, or prior audit findings are correct. Verify them against the actual code and available runtime.

\* Never claim implementation, testing, security, integration, deployment, or credential verification that has not actually occurred.

\* Prefer minimal, maintainable, backward-compatible changes. Do not rewrite functioning systems merely to use a preferred framework or architecture.

\* Continue through the roadmap as far as the available execution environment and session permit. Do not stop after discovery, documentation, or the first improvement.

\* If execution limits interrupt the work, save an accurate checkpoint so the next session can resume without repeating completed discovery.

\* Do not remove or weaken requirements to save tokens. Save tokens by avoiding redundant exploration, duplicate implementations, repeated explanations, and unnecessary code generation.



\### Project



\* Name: ProofPath

\* Repository: https://github.com/yusufydegirmenci/proofpath

\* Live application: https://yusufydegirmenci.github.io/proofpath/#proje



Inspect these references when accessible. If a resource cannot be accessed, state that limitation and continue using verifiable repository evidence.



\---



\## 1. Product Mission and Definition of Success



Evolve ProofPath into a coherent, accessible, secure, high-quality technical learning platform that can take a complete beginner from foundational knowledge to independently demonstrated, job-relevant competence.



ProofPath must connect five things:



1\. \*\*Learn:\*\* Complete, sequenced teaching that assumes no unexplained prior knowledge.

2\. \*\*Practice:\*\* Guided exercises, independent tasks, realistic labs, debugging, and simulations.

3\. \*\*Prove:\*\* Assessments and unfamiliar challenges that demonstrate what the learner can actually do.

4\. \*\*Recover:\*\* Targeted remediation, mistake analysis, and repeated practice until gaps are resolved.

5\. \*\*Advance:\*\* Evidence-based progression, portfolio development, technical interview readiness, and career guidance.



The platform must distinguish:



\* Content viewed from content understood.

\* Quiz performance from practical competence.

\* Guided performance from independent performance.

\* Simulated activity from real execution.

\* Self-reported skills from verified evidence.

\* Course completion from job readiness.

\* Exam preparation from an actually earned external certification.



Every important competency claim must have a clear definition, assessment method, status, and supporting evidence.



The product should answer:



\* What has the learner studied?

\* What can they independently accomplish?

\* Which skills have been demonstrated, partially demonstrated, or not assessed?

\* Can they solve a new problem, diagnose a failure, and adapt to changed requirements?

\* Can they explain and defend their decisions?

\* Why is a learning stage available or blocked?

\* What should they do next, and why?

\* What evidence supports a portfolio or employer-facing claim?

\* What limitations remain in the evidence?



The primary objective is \*\*comprehensive learning, real professional skills, and career preparation\*\*. Visual novelty, gamification, content volume, and feature count are secondary to these outcomes.



\---



\## 2. Mandatory Engineering Strategy: Inspect Once, Record, Reuse



Token efficiency and preservation of existing functionality are architectural requirements.



\### 2.1 Initial discovery



Before changing code:



1\. Inspect the current Git branch, working tree, uncommitted changes, and available project scripts.

2\. Map entry points, routes, files, components, styles, scripts, dependencies, data models, authentication, APIs, persistence, tests, and deployment.

3\. Identify the real behavior of existing features rather than inferring functionality from filenames, menus, screenshots, or documentation.

4\. Identify security risks, data-integrity risks, regressions, dead controls, duplicated logic, and incomplete implementations.

5\. Record which findings are verified, inferred, untested, or blocked by missing access.

6\. Establish a baseline of available tests, build results, runtime errors, and existing user-facing flows.



Do not perform an exhaustive repeated analysis if a reliable, current record already exists. Inspect the relevant recorded information and verify only the code affected by the next task.



\### 2.2 Persistent engineering records



Create or update existing equivalent documentation rather than creating redundant files. Maintain these records, using the existing naming conventions when appropriate:



\* `AUDIT.md`: verified findings, risks, unknowns, and baseline status.

\* `ARCHITECTURE.md`: system structure, module responsibilities, interfaces, and data flows.

\* `ROADMAP.md`: prioritized work, dependencies, phases, and acceptance criteria.

\* `FEATURE\_INVENTORY.md`: existing features, implementation status, ownership, and evidence.

\* `REFACTOR\_MAP.md`: file extraction and migration ledger.

\* `DATA\_MODEL.md`: entities, relations, ownership, versions, and persistence.

\* `SECURITY.md`: threat model, authorization, privacy, security controls, and unresolved risks.

\* `TESTING.md`: test strategy, commands, actual results, and coverage gaps.

\* `IMPLEMENTATION\_STATUS.md`: feature-level progress and verification status.

\* `CHANGELOG.md`: meaningful changes and compatibility notes.

\* `NEXT\_STEPS.md`: concise, resumable execution checkpoint.



If equivalent files already exist, update them rather than creating copies. Consolidate overlapping documentation where practical.



Keep records concise, structured, and useful to future sessions. Do not dump the same audit into multiple documents.



\### 2.3 Feature inventory: one source of truth



For every major capability, record:



`Requirement → Existing implementation → Files/modules → Dependencies → Gaps → Planned change → Verification evidence → Status`



Use these statuses consistently:



\* `EXISTS AND VERIFIED`

\* `EXISTS — NEEDS IMPROVEMENT`

\* `PARTIALLY IMPLEMENTED`

\* `MISSING`

\* `IMPLEMENTED — NOT VERIFIED`

\* `BLOCKED`

\* `REGRESSION FOUND`



Before building any requested feature, check the inventory and relevant code for equivalent functionality, including capabilities with different names.



Rules:



\* If it exists and works, reuse it.

\* If it exists but is defective, repair it.

\* If it partially exists, extend it.

\* If overlapping implementations exist, consolidate them safely.

\* If it is genuinely missing, implement it.

\* If a new design is necessary, explain the concrete limitation of the existing architecture.

\* Never recreate a feature solely because this prompt mentions it.



Once a finding is established, do not repeat the discovery process without new evidence that the finding is stale or incorrect.



\---



\## 3. Mandatory Incremental Refactoring of `index.html`



If `index.html` contains a large monolithic implementation, split it incrementally and safely. Verify its actual structure and size first; do not assume any previously reported measurements are accurate.



Do not replace the monolith wholesale or generate a new application that imitates the old one. Preserve real behavior, existing integrations, routes, data, and working user flows.



\### 3.1 Extract one coherent unit at a time



For each component, feature, script, style block, service, or data-access unit extracted from `index.html`:



1\. Identify the original code range and its responsibility.

2\. Trace event handlers, global state, initialization order, dependencies, side effects, route assumptions, storage operations, API calls, and database interactions.

3\. Search the existing codebase and feature inventory for equivalent functionality.

4\. Record the planned destination and module interface in `REFACTOR\_MAP.md` before or as the extraction begins.

5\. Extract the smallest coherent unit into the appropriate existing or new module.

6\. Update imports, exports, references, initialization, and callers.

7\. Immediately verify that the old and new paths do not both execute the same behavior unintentionally.

8\. Check that event listeners are not duplicated, state is not split incorrectly, and initialization is not repeated.

9\. Run the smallest relevant automated tests and available runtime checks.

10\. Compare the extracted implementation with the original behavior.

11\. Record the exact files, dependencies, checks, results, remaining risks, and next action.

12\. Proceed only after the checkpoint is recorded.



The ledger must record at least:



\* Original location and purpose.

\* New file path and public interface.

\* Dependencies and consumers.

\* State, events, APIs, and side effects.

\* Feature inventory entry.

\* Tests performed and observed results.

\* Status: `NOT STARTED`, `IN PROGRESS`, `EXTRACTED`, `VERIFIED`, `VERIFICATION BLOCKED`, or `REGRESSION FOUND`.



\*\*Extraction is not verification.\*\* Mark a unit `VERIFIED` only when its required behavior has been checked successfully. If verification cannot be performed, record the blocker explicitly.



\### 3.2 Preserve compatibility



\* Preserve existing routes, URL fragments, direct navigation, browser back/forward behavior, and deployed asset paths.

\* Preserve storage keys and data formats unless a documented, backward-compatible migration is required.

\* Do not rename or remove public interfaces without tracing every consumer.

\* Avoid simultaneous large-scale file extraction, visual redesign, data migration, and feature replacement.

\* Keep changes small enough to diagnose regressions.

\* After each meaningful extraction, verify the affected user flow before continuing.



\### 3.3 Avoid token waste during refactoring



Do not repeatedly print or reread the entire `index.html`. Use targeted searches, focused code ranges, dependency tracing, diffs, and the persistent ledger.



When a later change touches an extracted module, read its recorded responsibilities and inspect only the relevant code. Revisit broader areas only when an actual dependency, regression, or contradiction requires it.



At session boundaries, update `NEXT\_STEPS.md` with the last verified checkpoint. A new session must resume from that record, not restart the repository audit.



\---



\## 4. Priorities, Dependencies, and Execution Order



Use the following priority system:



\* \*\*P0 — Critical:\*\* data loss, credential exposure, cross-user data access, serious authorization failures, destructive migrations.

\* \*\*P1 — Core reliability:\*\* broken authentication, persistence, navigation, progress, assessment, or primary user journeys.

\* \*\*P2 — Learning foundations:\*\* competency model, curriculum, prerequisites, assessment quality, remediation, and evidence.

\* \*\*P3 — Product intelligence:\*\* adaptive guidance, labs, coaching, spaced repetition, learner modeling, and career readiness.

\* \*\*P4 — Refinement:\*\* visual polish, secondary interactions, performance optimization, and nonessential enhancements.



Fix P0/P1 issues before adding cosmetic features or building on unsafe foundations.



Follow this dependency order, adapting it to the actual codebase without abandoning the objectives:



1\. Discover the repository, establish the baseline, and record existing features.

2\. Fix critical security, data-integrity, and core-flow defects.

3\. Establish a reliable modular architecture, data ownership, persistence, and shared competency model.

4\. Design and validate curriculum, prerequisites, assessment, evidence, and progression.

5\. Audit and improve existing features instead of recreating them.

6\. Build missing or incomplete learning capabilities on shared infrastructure.

7\. Integrate the personal AI Coach and adaptive planning with actual learner data and permissions.

8\. Develop domain-specific teaching content and matching labs in dependency order.

9\. Strengthen projects, assessment, remediation, portfolio evidence, and career preparation.

10\. Implement or improve the learning twin, offline continuity, and trust/transparency controls.

11\. Complete accessibility, performance, regression, security, and end-to-end validation.

12\. Deploy only when authorized and safe; verify the actual deployed result where access permits.



Plan the full roadmap early, but implement in small, testable increments. Continue beyond planning until execution limits or a real blocker intervene.



\---



\## 5. Preserve and Integrate Existing Features



The following capabilities may already exist wholly or partially. Verify each one before deciding what to build.



Examples include:



\* Knowledge maps, prerequisite relationships, and spaced repetition.

\* Incident-response simulations.

\* Fail-Forward or mistake-recovery journals.

\* Multiple explanation modes.

\* Projects, capstones, and portfolios.

\* Technical interview practice.

\* Peer Review.

\* Daily lessons, progress dashboards, quizzes, exams, notes, glossary, learning games, leagues, achievements, and other gamification.

\* Authentication, profiles, personalization, and existing coaching.

\* Existing learning paths, navigation, responsive layouts, and accessibility controls.



Do not assume all listed examples are currently functional. They are audit targets, not claims about the current repository.



For each feature, establish its real status and then repair, extend, integrate, or implement it accordingly.



Avoid duplicate menus, overlapping data models, competing progress calculations, parallel AI coaches, duplicate assessment engines, and multiple incompatible definitions of mastery.



All relevant modules should share the same authoritative learner, competency, progress, assessment, and evidence model.



\---



\## 6. Curriculum and Competency Graph



Build a real prerequisite and competency graph rather than a decorative roadmap.



Represent relevant entities such as:



\* Learning paths, tiers, modules, lessons, and content versions.

\* Competencies and prerequisite relationships.

\* Guided exercises, independent tasks, labs, projects, and capstones.

\* Assessment objectives, questions, variants, rubrics, and attempts.

\* Remediation tasks, mistake records, and spaced-repetition items.

\* Evidence artifacts, competency reports, portfolios, and sharing permissions.

\* Learner preferences, study plans, and progress history.



Reuse existing data structures when suitable. Avoid creating a second model for the same concept.



\### 6.1 Learning progression



Adapt this progression to each domain:



\* \*\*L0 — Preparation:\*\* prerequisites, setup, diagnostic assessment, and gap identification.

\* \*\*L1 — Knowledge:\*\* concepts, terminology, accurate mental models, and understanding checks.

\* \*\*L2 — Guided practice:\*\* worked examples, scaffolding, and explanatory feedback.

\* \*\*L3 — Independent practice:\*\* unfamiliar tasks, debugging, and reduced assistance.

\* \*\*L4 — Main project:\*\* realistic requirements, working output, testing, documentation, and explanation.

\* \*\*L5 — Tier Golden Shot:\*\* a new integrated task unlocked only after the required four core projects and critical evaluations for that tier pass.

\* \*\*L6 — Integrated Golden Shot:\*\* a meaningful cross-tier task unlocked only after its defined prerequisites pass.

\* \*\*L7 — Joker capstone:\*\* an original, demanding task requiring requirements analysis, design, implementation, testing, security, debugging, and defense.

\* \*\*L8 — Portfolio and career evidence:\*\* credible, traceable demonstrations of competence.



Keep the four-core-projects-per-tier requirement where applicable. Projects must be genuinely distinct, not renamed copies.



The Golden Shot must apply learned skills in a new context. The Integrated Golden Shot must meaningfully combine relevant competencies across tiers and/or domains. The Joker must require independent decisions and a defensible solution, not merely completion of a template.



\### 6.2 Progression rules



\* Opening a page or clicking a button must not unlock mastery.

\* Each gate must define prerequisites, assessment rules, critical competencies, and required evidence.

\* A high average score must not hide a failed critical skill.

\* Use server-side validation when available and necessary.

\* Never represent frontend-only gating as secure authorization.

\* Preserve curriculum versions and historical assessment evidence.

\* Shared skills can transfer between paths only when the evidence and critical requirements genuinely match.

\* A passing result in one path must not automatically satisfy every requirement in another.



\*\*Acceptance criteria:\*\* prerequisites are inspectable; each lock explains why it exists; valid completion unlocks the next stage; failed critical requirements remain blocking; progress survives refresh and reauthentication where persistence is supported; and unauthorized users cannot forge trusted mastery records.



\---



\## 7. Complete Beginner-to-Professional Teaching



The curriculum must be understandable to a complete beginner. Do not assume a learner already knows how to open a computer case, use a terminal, interpret an error, configure an environment, or understand common technical vocabulary unless prerequisites have been verified.



Each substantial lesson should include:



1\. Learning objectives and prerequisites.

2\. A plain-language explanation.

3\. Correct technical terminology and mental models.

4\. A practical, step-by-step example.

5\. An everyday analogy where useful.

6\. An explicit explanation of where the analogy stops being accurate.

7\. A visual, diagram, animation, or interactive representation when it materially improves understanding.

8\. A guided exercise.

9\. An independent task.

10\. Common mistakes and debugging guidance.

11\. A knowledge check tied to the lesson objectives.

12\. Pass criteria and critical misconceptions.

13\. Links to relevant labs, projects, and later lessons.

14\. Reliable external references where appropriate.

15\. A clear next step and targeted remediation when needed.



Do not substitute lesson titles, short summaries, generic AI text, or decorative media for complete teaching.



\### 7.1 Instructional media



Media must teach the exact concept being studied.



\* Diagrams should expose meaningful relationships, data flow, system structure, or decision logic.

\* Animations should explain a process or state transition.

\* Interactive visualizations should let learners manipulate relevant variables and observe accurate consequences.

\* Code examples must be correct, runnable where claimed, and explained line by line when appropriate.

\* Audio and text-to-speech should support comprehension and accessibility, not simply decorate the page.

\* Videos and external resources must match the specific lesson objective and current tool/version.

\* Do not invent URLs, sources, prices, ratings, or claims of official endorsement.

\* Distinguish external links from content hosted or executed by ProofPath.

\* Use generated media only where it adds genuine instructional value; do not replace functional diagrams or simulations with static artwork.



Provide fallback explanations when a media asset fails to load.



\### 7.2 External learning resources



Recommend relevant official documentation, trustworthy written guides, tutorials, and videos that match the learner's current level.



When possible, record the resource title, provider, URL, topic coverage, relevant lesson, and last verification date. Verify links when the available tools permit it.



Do not claim a resource is free, current, official, or accessible unless that status is supported. Provide a useful in-product explanation so that external resources are supplementary rather than prerequisites to understanding the lesson.



\---



\## 8. The Ten Explicit Product Capabilities



Audit each capability below against existing code and the feature inventory. Reuse, repair, or extend existing functionality before building anything new.



\### 8.1 Knowledge Graph and Prerequisite Intelligence



Build an actionable graph of skills, lessons, assessments, labs, and projects.



Required behavior:



\* Show meaningful prerequisites and downstream dependencies.

\* Identify missing foundational skills.

\* Explain why a learner is blocked and what action will resolve the block.

\* Recommend the smallest useful next learning step.

\* Recalculate readiness when valid new evidence arrives.

\* Detect conflicting or stale competency records.

\* Support shared foundational skills without erasing path-specific requirements.



Acceptance: graph relationships affect real progression and recommendations; the visualization is not merely decorative.



\### 8.2 Playable Technical World — Real Interactive Labs



Provide a practical technical environment in which learners can experiment with the systems they are learning.



This must be more than static illustrations, animations, or multiple-choice questions.



Depending on the domain and actual technical feasibility, support interactive environments such as:



\* Networking topologies, addressing, routing concepts, packet-flow visualization, and troubleshooting.

\* Terminal and command-line practice.

\* Git workflows, branches, merges, and conflict resolution.

\* Backend/API request and response inspection.

\* SQL query writing, result inspection, and database reasoning.

\* Python or other code execution in an appropriately isolated environment.

\* Data cleaning, transformations, and visualization.

\* CI/CD pipelines, deployment workflows, logs, and failure diagnosis.

\* QA test cases, assertions, and reproducible defects.

\* Defensive security analysis in bounded, safe environments.



Each lab must have:



1\. A clear objective and prerequisites.

2\. A defined initial state and available actions.

3\. A realistic task or problem.

4\. Observable state changes and meaningful feedback.

5\. Validation of the learner's actions and results.

6\. Safe reset/retry behavior.

7\. Relevant hints and explanation without automatically solving every task.

8\. A record of demonstrated competencies.

9\. An explicit indication of whether execution is real, locally/external-tool based, or simulated.



Do not pretend browser visualization is real infrastructure execution. If the current hosting stack cannot safely execute code or commands, implement an honest simulator or provide a supported local-run workflow. Do not expose server secrets or run untrusted code without appropriate isolation and resource limits.



Acceptance: at least one representative lab in each implemented domain supports meaningful learner interaction, validates an outcome, and records evidence. Mark broader domain coverage according to actual implementation status rather than claiming every possible lab is complete.



\### 8.3 Incident-Response Simulations



Audit the existing incident simulation module and improve it instead of creating a competing system.



Scenarios may include HTTP 504 errors, database connection-pool exhaustion, DNS failures, full disks, failed deployments, CI pipeline errors, elevated latency, service outages, and similar domain-relevant incidents.



Each scenario should provide:



\* A realistic initial symptom.

\* Relevant logs, metrics, topology, configuration, or error evidence.

\* A safe, bounded environment.

\* A diagnostic workflow and available investigative actions.

\* Plausible alternative causes.

\* Consequences or state changes from learner decisions.

\* An explanation of root cause and remediation after the attempt.

\* A competency rubric and evidence record.

\* Optional altered scenarios to test transfer rather than memorization.



Do not expose production systems, attack third parties, or execute unsafe operations. Security scenarios must focus on authorized defensive learning.



Acceptance: learners must investigate evidence and make decisions; merely clicking a predefined answer should not establish practical incident-response competence.



\### 8.4 Spaced Repetition and Retention



Audit the existing review system and integrate it with assessment evidence and the competency graph.



Required behavior:



\* Schedule review based on prior performance, errors, confidence when collected, and time since review.

\* Prioritize weak and critical skills without endlessly repeating mastered material.

\* Use fresh question or task variants where feasible.

\* Support concepts, commands, syntax, troubleshooting decisions, and practical procedures.

\* Update review priority after a successful or failed attempt.

\* Explain why an item is due.

\* Respect user-defined availability and sustainable workload.

\* Persist review state and handle missed sessions without punitive streak logic.



Use a transparent, maintainable scheduling method. Avoid claiming scientifically precise retention predictions without supporting data.



Acceptance: a completed review changes scheduling appropriately, failed items return for targeted review, and the review queue survives supported persistence boundaries.



\### 8.5 Adaptive Explanation Modes



Audit and reuse existing explanation modes.



Support relevant approaches such as:



\* Beginner-friendly plain language.

\* Step-by-step technical explanation.

\* Everyday analogy plus its limitations.

\* Visual or process-oriented explanation.

\* Code/configuration walkthrough.

\* Troubleshooting and root-cause reasoning.

\* Concise expert reference.

\* Socratic questions and guided discovery.



Let the learner select a preferred approach and remember it when consent and storage allow. Adapt explanations to demonstrated prerequisites and observed misunderstandings, not to unsupported assumptions about intelligence or ability.



The same concept must remain technically accurate across modes. Explanations should not contradict one another or omit essential caveats for the sake of simplicity.



Acceptance: changing modes changes the explanation meaningfully; preferences persist where supported; and all modes refer to the same lesson objective and correct technical model.



\### 8.6 Projects, Portfolio, and Evidence



Audit existing project and portfolio features before changing them.



Each relevant tier must contain four genuinely distinct core projects. For each project, define:



\* Problem and intended user/business scenario.

\* Prerequisites and learning outcomes.

\* Functional and nonfunctional requirements.

\* Required and optional functionality.

\* Acceptance criteria and test cases.

\* Rubric and project-specific assessment.

\* Required artifacts and documentation.

\* Explanation or defense requirements.

\* Evidence references and competency mapping.

\* Targeted remediation and next-stage unlock rules.



Require credible README/setup instructions, tests, error handling, documentation, outputs, limitations, and clear ownership.



Integrate Git/GitHub evidence only when actual authorization and integration are available. Do not claim repository synchronization from a pasted URL alone.



Portfolio sharing must be permission-controlled and revocable. Employer-facing claims must link to the evidence supporting them without exposing private learner data.



Acceptance: project completion produces an evidence-based record, not merely a completion badge; sharing and revocation work where implemented and are tested.



\### 8.7 Technical Interviewer and Project Defense



Audit the existing technical interview feature and improve it rather than duplicating it.



The interviewer should:



\* Ask questions appropriate to the learner's demonstrated level and target role.

\* Use project artifacts and actual learning history when authorized.

\* Ask follow-up questions about design decisions, trade-offs, debugging, testing, and security.

\* Introduce changed requirements and unfamiliar scenarios.

\* Distinguish memorized definitions from applied understanding.

\* Provide criterion-based feedback, examples, and a targeted practice plan.

\* Track repeated weaknesses across interviews and relevant assessments.

\* Support technical English practice where useful.



Do not grade based on accent, verbosity, confidence, or superficial stylistic preferences unrelated to the competency. State evaluation limitations and avoid pretending that AI feedback is equivalent to a guaranteed hiring outcome.



Acceptance: interviews adapt to the learner's actual evidence, record defensible rubric-based results, and lead to actionable remediation.



\### 8.8 Digital Learning Twin — Evidence-Based Learner Model



Implement a learner model that helps the learner and Coach understand current competence, learning friction, and plausible future study scenarios.



This is a decision-support model, not a claim of a scientifically complete digital replica.



Use only relevant, authorized evidence such as:



\* Demonstrated competencies and prerequisite gaps.

\* Assessment and task history.

\* Error patterns and remediation outcomes.

\* Review history and retention checks.

\* Available study time and stated goals.

\* Observed task duration where reliably measured.

\* Preferred explanation modes and learner feedback.

\* Completed projects and demonstrated independence.



Required behavior:



1\. Present the current learning state and its supporting evidence.

2\. Identify strengths, weaknesses, bottlenecks, and uncertain estimates.

3\. Compare alternative study plans, such as different weekly workloads or learning sequences.

4\. Estimate likely workload, dependencies, and possible completion windows when enough data exists.

5\. Show assumptions, uncertainty, and factors that could change the estimate.

6\. Update estimates when meaningful new evidence arrives.

7\. Explain which additional evidence would improve a weak estimate.

8\. Allow the learner to correct inaccurate preferences or circumstances.



Do not invent predictive accuracy, guaranteed job-readiness dates, exact probabilities of success, or precise completion dates unsupported by sufficient evidence. If data is sparse, say so and use transparent ranges or qualitative estimates.



Acceptance: learners can compare at least two meaningful plans using visible assumptions and can understand why the recommendations differ. Every prediction or estimate is clearly distinguished from measured fact.



\### 8.9 Multi-Device and Offline Learning Continuity



Audit the actual deployment, storage, authentication, service-worker support, and synchronization architecture before implementing offline capabilities.



Support responsive use across mobile, tablet, and desktop, with consistent navigation, accessible controls, and usable learning workflows.



Where technically feasible, provide:



\* Installable application behavior through an appropriate PWA architecture.

\* Offline access to explicitly cached, eligible lessons and learning resources.

\* Local storage of permitted progress and queued changes.

\* Reliable synchronization when connectivity returns.

\* Visible offline, pending-sync, success, and failure states.

\* Conflict handling that does not silently overwrite newer or important work.

\* Version checks for cached curriculum and stale content.

\* Recovery from interrupted synchronization.

\* Safe logout and user separation on shared devices.



Never claim that a task or assessment requiring a server has been fully validated while offline. Clearly identify which features work offline, which are read-only, and which require reconnection.



Protect locally stored information. Avoid caching sensitive data unnecessarily, and ensure that one user's cached private information is not exposed to another user on a shared device.



If GitHub Pages or the current architecture imposes limits, implement the feasible subset and document the remaining dependency. Do not add a complex offline system that endangers data integrity or breaks the existing application.



Acceptance: verify offline lesson access, queued changes where supported, reconnection and synchronization, interrupted requests, conflicts, cache updates, logout behavior, and cross-user isolation to the extent implemented. Report any untested behavior honestly.



\### 8.10 Trust and Transparency Center



Create or integrate a dedicated trust/privacy area if the existing product lacks equivalent functionality.



It should give learners understandable controls and explanations for:



\* Personalization preferences and explanation-mode preferences.

\* What learning data is stored and why.

\* Which evidence informs a recommendation.

\* Whether an assessment result is measured, inferred, or unverified.

\* AI/provider usage and the categories of data sent externally, where applicable.

\* Data export and account/data deletion where supported.

\* Portfolio visibility, sharing permissions, and revocation.

\* Learning history and personalization reset.

\* Retention limitations and the effects of resetting or deleting data.



A reset must clearly explain what will be removed and whether it affects progress, assessment evidence, or shared reports. Destructive actions require appropriate confirmation.



Do not promise deletion, export, or privacy guarantees that the architecture cannot deliver. Implement actual controls with appropriate server-side authorization and verify their behavior.



Acceptance: users can inspect relevant preferences and data explanations, change supported settings, and exercise implemented export, reset, deletion, and sharing controls without unauthorized access or silent data loss.



\---



\## 9. Personal AI Guidance Coach



The Coach is a central learning companion with its own clear workspace, not a generic chatbot disconnected from ProofPath.



Audit and reuse any existing coach before implementing additional interfaces or services.



\### 9.1 Context-aware guidance



Within the permissions granted by the learner, the Coach may use:



\* Current learning path, lesson, lab, or project.

\* Competency graph and prerequisite status.

\* Assessment results, mistake journal, and remediation history.

\* Progress, available study time, and current plan.

\* Preferred explanation modes.

\* Current project artifacts and authorized evidence.

\* Relevant interview and incident-simulation history.



The Coach must use actual retrieved context, not fabricated learner history. Clearly state when context is missing, stale, or unavailable.



\### 9.2 Teaching and navigation



The Coach should:



\* Explain concepts at an appropriate level.

\* Use accurate analogies and explain their limitations.

\* Break difficult tasks into manageable steps.

\* Ask diagnostic questions when a misunderstanding is unclear.

\* Guide learners to the relevant lesson, lab, diagram, simulation, project, review item, or interview exercise.

\* Navigate to internal destinations using existing routing conventions where technically supported.

\* Explain why the destination is relevant.

\* Avoid sending learners into unexplained advanced material.



Do not reveal complete solutions by default when guided discovery or an independent assessment is intended. Respect the learner's chosen level of assistance.



\### 9.3 Personalization and continuity



Remember relevant preferences and learning context only through supported, authorized persistence.



\* Let the learner inspect and change personalization settings.

\* Keep preferences separate from verified competency claims.

\* Do not turn a temporary mistake into a permanent judgment about ability.

\* Update the model when the learner demonstrates improvement.

\* Make it possible to reset personalization without silently destroying essential assessment records.

\* Do not infer sensitive personal characteristics or use them to make educational decisions.



\### 9.4 Proactive guidance



The Coach should make proactive suggestions when there is a meaningful reason, such as:



\* A repeated misconception.

\* A prerequisite gap blocking progress.

\* A review item becoming due.

\* A project bottleneck.

\* A mismatch between the learner's plan and available study time.

\* An opportunity to consolidate related skills.

\* An upcoming learner-defined deadline.



Do not interrupt constantly, generate empty motivational messages, create unhealthy pressure, or recommend endless work.



Every important recommendation should state the reason, the proposed action, and the expected benefit. Allow the learner to dismiss or adjust suggestions.



\### 9.5 Controlled autonomy



The Coach may manage routine learning steps within prior authorization, such as:



\* Reordering low-risk practice tasks.

\* Scheduling ordinary review items within the approved plan.

\* Suggesting targeted remediation.

\* Navigating to relevant learning resources.

\* Updating non-destructive recommendations based on new evidence.



Seek explicit confirmation before important decisions such as materially changing a study schedule, deleting records, resetting significant progress, sharing private evidence externally, connecting an external account, or taking an irreversible action.



Do not claim the Coach autonomously performed an action unless the operation actually succeeded.



\### 9.6 AI reliability and safety



\* Distinguish model-generated suggestions from measured assessment evidence.

\* Do not let an LLM unilaterally grant trusted mastery, certification, or secure progression without validated rules and evidence.

\* Handle provider failures, timeouts, rate limits, and missing context gracefully.

\* Protect private learner data and credentials.

\* Avoid exposing hidden answers during protected assessments.

\* Record relevant provenance where useful and lawful.

\* Do not fabricate internal navigation, external integrations, or tool execution.



Acceptance: the Coach can provide a contextually relevant explanation or recommendation from real learner state, navigate to a valid relevant destination where supported, and explain the evidence behind its recommendation. Important actions remain subject to the stated authorization rules.



\---



\## 10. Fail-Forward Mistake and Recovery Journal



Audit and extend the existing Fail-Forward feature.



A meaningful error record should capture, where available:



\* The task, lesson, lab, or assessment.

\* The relevant competency.

\* The learner's answer or action.

\* The observed failure or misconception.

\* The likely root cause, clearly distinguished from a verified cause.

\* The explanation or hint provided.

\* The remediation task.

\* Subsequent attempts and outcomes.

\* Whether the competency was later demonstrated independently.



The system should:



1\. Detect meaningful errors without labeling every harmless mistake as a failure.

2\. Map errors to actual learning objectives.

3\. Provide an explanation and a useful next step.

4\. Offer guided practice followed by a new independent variant.

5\. Reassess the relevant competency.

6\. Update review scheduling and the Coach's recommendations.

7\. Preserve a useful history without permanently penalizing recovered mistakes.



The journal should reveal recurring patterns and improvements over time. Avoid shaming language, arbitrary failure counts, or claims of root-cause certainty without evidence.



Acceptance: a failed competency leads to targeted recovery, a new assessment can verify improvement, and the original failure does not permanently block progression after valid recovery.



\---



\## 11. Assessment, Remediation, and Authentic Understanding



Every course and project requires assessments tied to the actual skills taught.



Use a combination of:



\* Conceptual questions and scenario reasoning.

\* Code, query, command, or configuration tasks.

\* Debugging deliberately introduced defects.

\* Interpretation of outputs, logs, metrics, and datasets.

\* Explanation of design choices and trade-offs.

\* Adaptation to changed requirements.

\* Independent tasks and unseen variants.

\* Project defense and interview questions.

\* Hidden or variant tests where technically feasible.



Do not rely on AI-detection tools as definitive proof that a learner did or did not understand a task. Verify understanding with follow-up questions, changed requirements, debugging, and independent work.



\### 11.1 Targeted remediation



When a learner fails:



1\. Identify the exact failed objective.

2\. Explain the misconception or error using available evidence.

3\. Re-teach the relevant concept.

4\. Provide a worked example.

5\. Offer a guided task.

6\. Offer a fresh independent task.

7\. Retest the skill with a different variant where feasible.

8\. Update competency and review state based on the observed outcome.



A default threshold of 80% may be used when appropriate, but critical objectives must pass individually. Retakes must not merely expose hidden answers or repeat the same memorized question.



\### 11.2 Assessment integrity



\* Define what help, reference material, or AI assistance is allowed.

\* Record assistance only when reliable evidence exists.

\* Do not infer independence from completion alone.

\* Use reproducible scoring and transparent rubrics.

\* Keep protected answer keys out of publicly accessible client code where the architecture permits.

\* Use server-side validation for trusted outcomes where available.

\* Explain assessment limitations when secure evaluation cannot be guaranteed.



Acceptance: scores, critical-skill gates, remediation, variant retests, and competency status behave consistently and have automated tests for relevant rules.



\---



\## 12. Evidence-Based Competency Reports and Employer Readiness



Generate a project competency report using recorded evidence, not generic AI-generated praise.



Each report should include:



\* Project identity and version.

\* Assessment date and method.

\* Competencies assessed.

\* Status: demonstrated, partially demonstrated, failed, or not assessed.

\* Relevant artifacts, test results, task attempts, rubric criteria, and explanations.

\* Tools or environments actually used.

\* Known strengths and gaps.

\* Assistance level only when reliably recorded.

\* Recommended next steps.

\* Unverified claims and limitations.



Do not infer SQL competence from a chart, security competence from a multiple-choice quiz, or independent work from a task marked complete.



Provide a learner-facing report and, where authorized, an employer-facing portfolio view. Control sharing and make revocation effective.



\### 12.1 Competency evidence model



Distinguish at least:



\* Knowledge understood.

\* Guided practice completed.

\* Independent task demonstrated.

\* Practical output validated.

\* Unfamiliar task solved.

\* Decision explained and defended.

\* Competency partially demonstrated.

\* Competency not assessed or unverified.



Use only statuses that the actual assessment model can substantiate.



\### 12.2 Career readiness



Help learners translate verified skills into practical job preparation:



\* Role-relevant skill-gap analysis.

\* Portfolio improvements.

\* Technical interview practice.

\* Project explanation and defense.

\* Technical English where relevant.

\* CV and evidence presentation.

\* Suggested learning priorities for a target role.



Do not promise employment, salary, or hiring success. Separate verified competence from readiness estimates and market-dependent advice.



Acceptance: each significant report claim can be traced to evidence or is explicitly marked as unverified; unauthorized users cannot view private reports; revoked shares no longer grant access.



\---



\## 13. Peer Review



Audit and preserve the existing Peer Review feature if present.



Support meaningful review of projects, code, technical explanations, or other suitable artifacts.



Include:



\* A review rubric tied to project requirements.

\* Specific evidence-based feedback.

\* Clear distinction between AI-generated feedback and human feedback.

\* Appropriate permissions and visibility.

\* Helpful, respectful feedback guidance.

\* Review history and resolution of actionable issues.

\* A way to challenge or contextualize inaccurate feedback where practical.



Do not treat unverified peer opinions as definitive proof of mastery. Incorporate feedback into the learning workflow without automatically changing trusted competency status unless a valid assessment confirms the change.



Acceptance: review permissions, rubric submission, feedback visibility, and review status work as intended and do not expose private artifacts without authorization.



\---



\## 14. Domain-Specific Learning Paths and Real Labs



Maintain each domain's professional identity. Reuse shared learning, assessment, evidence, and persistence infrastructure, but do not force every subject into the same generic code editor or exercise template.



Preserve and extend relevant existing paths, including:



\* \*\*Computer and IT foundations:\*\* hardware, operating systems, files, troubleshooting, command line, and networking fundamentals.

\* \*\*Networking/CCNA:\*\* topology, addressing, subnetting, packet flow, network CLI/configuration, and troubleshooting.

\* \*\*Cybersecurity:\*\* logs, event correlation, threat models, defensive detection, access controls, and isolated safe labs.

\* \*\*Backend:\*\* HTTP, APIs, JSON, SQL/database design, validation, errors, tests, and implementation tasks.

\* \*\*DevOps:\*\* terminal, Git, YAML, CI/CD, containers, deployments, logs, and pipeline troubleshooting.

\* \*\*QA/test automation:\*\* test plans, test runners, assertions, automation, regression, and defect reproduction.

\* \*\*Technical English:\*\* technical reading, writing, listening, speaking, documentation, interviews, and project defense.

\* \*\*Data Analytics:\*\* the full curriculum in Section 15.

\* \*\*Other relevant paths:\*\* preserve and expand existing domains without breaking the shared architecture.



For every lab, clearly distinguish real execution, controlled execution, external/local execution, and simulation.



Acceptance: each implemented path has prerequisites, substantive teaching, appropriate exercises, competency-linked assessment, and truthful execution labels. Do not claim all listed paths are complete merely because their names appear in navigation.



\---



\## 15. Required Specialty: Complete Data Analytics Path



Data Analytics is a first-class learning path integrated with the competency graph, labs, projects, assessments, evidence reports, and career readiness.



A menu item, several SQL lessons, or a static dashboard does not constitute a complete path.



Assume no prior SQL, Python, statistics, spreadsheet, or visualization knowledge.



\### 15.1 Build in the correct sequence



1\. Define the curriculum and prerequisite graph.

2\. Write complete teaching content.

3\. Build the lab matching each taught skill.

4\. Test the lesson and lab.

5\. Add independent assessments and remediation.

6\. Combine tools only after their individual prerequisites are demonstrated.

7\. Build progressive projects and capstones.

8\. Map relevant skills to current certification objectives.

9\. Generate evidence-based reports and career recommendations.



Do not create advanced labs that require unexplained skills. Do not attempt to build every lab and capstone in one uncontrolled change.



\### 15.2 Curriculum



\*\*Level 0 — Foundations\*\*



\* Analyst versus data engineer, data scientist, and business analyst.

\* Translating a business problem into analytical questions.

\* Rows, columns, records, variables, data types, and structured versus unstructured data.

\* CSV, JSON, XLSX, and SQL sources.

\* Data dictionaries, data quality, privacy, and ethical interpretation.

\* Essential mathematical and statistical prerequisites.



Exercise: inspect a synthetic sales dataset, identify useful questions and required columns, and explain conclusions the available data cannot support.



\*\*Level 1 — Spreadsheets\*\*



\* Cells, data types, formulas, conditional functions, lookups, dates, and text.

\* Sorting, filtering, duplicates, missing values, and validation.

\* Pivot tables, charts, and simple reports.



Require learners to clean inconsistent data and explain their transformations.



\*\*Level 2 — SQL\*\*



Teach in order:



\* Databases, tables, relationships, and schema.

\* `SELECT`, `WHERE`, `ORDER BY`, `LIMIT`, `DISTINCT`, and `NULL`.

\* `CASE WHEN`.

\* `COUNT`, `SUM`, `AVG`, `MIN`, and `MAX`.

\* `GROUP BY` and `HAVING`.

\* `INNER JOIN`, `LEFT JOIN`, and other relevant joins.

\* Multi-table analysis.

\* Subqueries and CTEs.

\* Date and text functions.

\* Window functions such as `ROW\_NUMBER`, `RANK`, `LAG`, and `LEAD`.

\* Conditional aggregation and data-quality checks.

\* Query plans, performance fundamentals, and analytical data modeling.

\* Translating business questions into accurate queries.



For each major concept: explanation → worked example → guided exercise → independent task → assessment.



Use real analytical questions such as monthly revenue, product profitability, and average order value, not definition-only quizzes.



\*\*Level 3 — Statistics and analytical thinking\*\*



\* Mean, median, mode, percentiles, variance, and standard deviation.

\* Distributions, outliers, probability, and sampling.

\* Population versus sample.

\* Correlation versus causation.

\* Hypothesis-testing concepts and confidence intervals.

\* Missing-data and sampling bias.

\* Time trends, KPI design, and metric selection.



Teach interpretation, assumptions, and limitations rather than formula memorization alone.



\*\*Level 4 — Python for analytics\*\*



\* Environment setup and notebooks.

\* Variables, types, collections, conditions, loops, and functions.

\* Exceptions, files, CSV, and JSON.

\* NumPy and Pandas.

\* Series, DataFrames, inspection, filtering, sorting, and type conversion.

\* Missing/duplicate values, dates, text, grouping, merging, and pivots.

\* Data validation, visualization, exploratory analysis, and reproducibility.

\* Clean code, debugging, and SQL-to-Python workflows.



Require learners to modify code, diagnose errors, and complete independent variants. Do not claim Python execution if the environment is only simulated.



\*\*Level 5 — Data preparation and ETL\*\*



\* Extract, transform, and load.

\* Multiple data sources.

\* Standardizing columns and data types.

\* Missing, duplicate, and inconsistent records.

\* Date/time normalization.

\* Validation, reconciliation, and reproducible transformations.

\* Error logs and data-quality reports.



Where appropriate, have learners solve comparable tasks in SQL, Pandas, and Power Query and justify tool choice.



\*\*Level 6 — Power Query, Power BI, and DAX\*\*



\* Data sources and Power Query transformations.

\* Merge, append, types, parameters, refresh, errors, and query folding.

\* Fact/dimension tables, star schema, relationships, and cardinality.

\* Filter context and row context.

\* Calculated columns versus measures.

\* DAX fundamentals through advanced patterns and time intelligence.

\* KPIs, filters, slicers, drill-through, tooltips, and accessible visualizations.

\* Report versus dashboard distinctions.

\* Performance, workspaces, sharing, row-level security, refresh, deployment, and governance.



Explain why DAX results change with context, not merely which functions exist.



Do not imply Power BI Desktop runs in a browser. Use actual supported tools or honest simulations. A mock dashboard does not prove that a real Power BI model or report was created.



\*\*Level 7 — Storytelling and business decisions\*\*



\* Stakeholder questions and analytical objectives.

\* KPI selection and metric validity.

\* Chart choice and misleading visualizations.

\* Facts versus assumptions.

\* Executive summaries and recommendations.

\* Uncertainty, limitations, and communication to nontechnical stakeholders.



Projects must include a decision-oriented report, not charts alone.



\*\*Level 8 — PL-300 certification preparation\*\*



Primary target: Microsoft Certified: Power BI Data Analyst Associate (PL-300).



Official references:



\* https://learn.microsoft.com/en-us/credentials/certifications/exams/PL-300

\* https://learn.microsoft.com/en-us/certifications/resources/study-guides/PL-300



Re-check the current official exam scope during implementation. Do not hard-code domain weights or objectives as immutable.



Map current exam objectives to lessons, exercises, labs, project tasks, and original practice questions. Never reproduce protected or live exam questions.



Keep these distinct:



1\. Practical data-analyst competence.

2\. Readiness against the current exam objectives.

3\. Actual credential status.



ProofPath cannot award Microsoft certification. Completing the path or passing an internal mock exam must never be represented as earning the credential.



The current Google Data Analytics Certificate curriculum may also be used as a reference where useful: https://www.skills.google/paths/2267. Keep its curriculum and credential separate from PL-300.



\### 15.3 Domain-specific labs



Build each lab after its corresponding teaching content is ready.



\* \*\*SQL lab:\*\* editable queries, real or controlled sandbox database, result grid, useful errors, joins, aggregations, window functions, and hidden tests where feasible.

\* \*\*Python lab:\*\* isolated real Python execution where feasible, DataFrame previews, readable errors, bounded files/time/resources, and cross-user isolation. Otherwise provide a clearly labeled simulator or local-run instructions.

\* \*\*Data-cleaning lab:\*\* deliberately flawed synthetic data; identify, repair, and validate issues; compare before/after; produce a quality report.

\* \*\*Visualization lab:\*\* chart selection, axes, metrics, filters, grouping, KPI cards, interactions, readability, and misleading-chart detection.

\* \*\*Power Query/Power BI/DAX tasks:\*\* real supported tools or honest simulations with explicit limitations.



Lab interaction alone is not proof of success. Validate outputs against criteria and map results to competencies.



\### 15.4 Integrated analytics workflows



Implement these progressively, after their individual prerequisites are met:



1\. SQL → inspect and clean with Pandas → validate → calculate metrics → visualize → report and explain.

2\. SQL → Power Query → star schema → DAX measures → report → refresh and access controls.

3\. Python → exploratory analysis → distributions/outliers → appropriate statistics → visualizations → limitations.

4\. Excel + SQL + Power BI → solve a business problem and justify each tool's role.

5\. Python + API + SQL → retrieve synthetic/public sample JSON → validate and transform → persist safely → handle errors and idempotency → analyze.

6\. Statistics + business analysis + storytelling → define the question and KPIs → evaluate data sufficiency → analyze → consider alternatives → recommend a decision and state limitations.



\### 15.5 Cross-domain integration



Connect Data Analytics meaningfully to other paths:



\* \*\*Backend:\*\* APIs, JSON, SQL design, validation, analytical endpoints, pagination, tests, and data security.

\* \*\*DevOps:\*\* Git, environments, dependencies, tests/CI, environment variables, logging, scheduled jobs, and safe deployment.

\* \*\*QA:\*\* data-quality tests, SQL assertions, Python unit tests, schema changes, regression, and report correctness.

\* \*\*Cybersecurity:\*\* data minimization, PII protection, SQL injection awareness, access controls, audit logs, masking, and safe sharing.

\* \*\*Networking/infrastructure:\*\* logs, metrics, availability, latency, error rates, time series, resource use, and incident correlation.

\* \*\*Technical English:\*\* documentation, README files, analytical reports, presentations, and interviews.



Use the shared competency graph while retaining each path's critical prerequisites.



\### 15.6 Analytics projects and reporting



Create four distinct core projects per relevant tier, with increasing complexity. Example starting patterns:



1\. Sales/revenue analysis using synthetic data, cleaning, SQL, KPIs, monthly/product analysis, visuals, and an executive summary.

2\. Customer behavior analysis with segmentation, order frequency/value, repeat behavior, quality checks, SQL + Python, and limitations.

3\. Operations/performance analysis with process metrics, errors/delays, time series, KPIs, a Power BI report, and validated measures.

4\. End-to-end analytics combining multiple sources, SQL, Pandas, preparation, modeling, visualization, tests, documentation, and a business report.



These patterns are not permission to create shallow duplicates. Each project must have distinct learning outcomes, requirements, evidence, and assessment criteria.



Require README, setup instructions, data dictionary, methodology, tests, results, and limitations. Golden Shot, Integrated Golden Shot, and Joker tasks must introduce meaningful new contexts.



Assess and report SQL filtering/aggregation/joins, Python processing, cleaning, statistical interpretation, modeling, DAX, dashboards, data quality, testing, business-question framing, communication, and documentation separately where appropriate.



A chart proves only the competency actually assessed. Do not infer SQL, DAX, or statistical mastery from a finished visualization.



\---



\## 16. Adaptive Study Planning



Create or improve a sustainable study planner connected to real learning state.



It should consider:



\* Learner-defined goals and target roles.

\* Available time and schedule preferences.

\* Prerequisite gaps.

\* Due reviews and upcoming assessments.

\* Project complexity and current blockers.

\* Observed task duration where reliable.

\* Progress and recent remediation needs.



Provide:



\* A realistic weekly plan.

\* Small daily next steps.

\* Estimated workload with stated assumptions.

\* Buffer time for difficult topics.

\* A recovery plan when sessions are missed.

\* Alternative schedules when available time changes.

\* Clear reasons for each significant recommendation.



Do not punish missed sessions, manufacture urgency, or silently replace the learner's preferred schedule.



The Coach may make routine low-risk adjustments within prior authorization. Material schedule changes require confirmation.



Acceptance: plans use actual prerequisite and workload data, respond to relevant changes, and explain estimates and uncertainty. The learner can inspect and adjust the plan.



\---



\## 17. Architecture, Data Integrity, Security, and Privacy



Choose implementation details based on the verified repository and deployment constraints.



GitHub Pages is static hosting; it cannot securely host secret-bearing backend logic. If a backend or database already exists, inspect its actual configuration and use. If additional backend capabilities are necessary, document the minimum secure architecture and implement only what is feasible and authorized.



\### 17.1 Data model and migrations



Support the necessary relationships among users, paths, content versions, competencies, prerequisites, labs, projects, assessments, attempts, remediation, evidence, reports, portfolios, plans, preferences, and sharing permissions.



Reuse appropriate existing models. Avoid duplicate sources of truth for progress, mastery, or learner identity.



For changes:



\* Define ownership and relationships.

\* Validate data and constraints.

\* Preserve historical evidence where appropriate.

\* Use backward-compatible migrations when feasible.

\* Provide rollback/recovery guidance for risky changes.

\* Do not destructively reset user data as a shortcut.

\* Do not run irreversible operations without authorization.



\### 17.2 Authentication and account integrity



Inspect and test:



\* Email normalization and uniqueness.

\* Registration and concurrent signup.

\* Email verification where required.

\* Password reset and subsequent login.

\* Profile creation and auth/profile mapping.

\* Session refresh and logout.

\* Account deletion and re-registration.

\* Cross-user isolation.



If duplicate registrations or password-reset issues have been reported, reproduce them before declaring them confirmed. Enforce uniqueness and authorization at the server/provider/database layer as applicable; client-side validation alone is insufficient.



Never delete existing accounts or user records merely to make a test pass.



\### 17.3 Authorization and security



\* Enforce ownership and access rules server-side or through correctly configured RLS where applicable.

\* Keep secrets out of frontend code and public repositories.

\* Validate inputs and secure database/API operations.

\* Prevent cross-user access to progress, notes, attempts, files, reports, and private portfolios.

\* Isolate executable user code and SQL with appropriate permissions, resource limits, timeouts, dataset limits, and network restrictions.

\* Use synthetic or anonymized data in labs.

\* Log safely without exposing credentials or sensitive information.

\* Never record a failed operation as successful.

\* Protect share links and verify revocation.

\* Test concurrent operations, data integrity, authorization, and migration behavior.



If the current architecture cannot provide a security guarantee, explain the limitation and do not pretend client-side checks are equivalent.



\### 17.4 Reliability and performance



Handle asynchronous failures, network loss, retries, stale states, and partial updates. Preserve progress safely and avoid silently discarding user work.



Inspect expensive queries, oversized data, repeated rendering, event-listener duplication, memory issues, and avoidable network requests. Optimize measured problems without unnecessary rewrites.



Acceptance: the implemented system has explicit ownership rules, no known unresolved critical data-exposure issue left silently unreported, and documented verification gaps.



\---



\## 18. User Experience, Accessibility, and Quality



Build a coherent, premium-quality interface that prioritizes clarity, focus, and practical learning.



Audit existing visual and accessibility features before redesigning them.



Required behavior:



\* Consistent typography, spacing, components, colors, and navigation.

\* A dashboard that communicates current path, demonstrated skills, next action, blockers, and progress.

\* Clear reasons for locked content and visible pass criteria.

\* Functional controls with loading, success, empty, failure, and offline states.

\* Responsive mobile, tablet, and desktop layouts.

\* No accidental horizontal overflow.

\* Semantic structure, keyboard navigation, visible focus, adequate contrast, scalable text, and understandable errors.

\* Respect for reduced-motion preferences.

\* Preservation of useful existing contrast, font-size, or simplified-mode controls.

\* No unnecessary animation, intrusive pop-ups, decorative clutter, or misleading progress indicators.



Every button, link, form, modal, menu, tab, and clickable surface must perform its advertised action.



Test direct URLs, navigation, browser back/forward, form validation, empty states, interrupted requests, and route recovery.



Acceptance: the primary learning journeys remain usable across supported viewport sizes; accessibility checks identify and resolve material regressions; and no known dead controls are presented as functional.



\---



\## 19. Content Quality and External Integrity



All teaching content, technical instructions, labs, and assessments must be accurate, sequenced, and appropriate to the learner's level.



\* Use official documentation and reliable references for version-sensitive technical claims.

\* Recheck external certification objectives when implementing certification preparation.

\* Respect copyright and licenses.

\* Do not copy protected courses, proprietary content, or live exam questions.

\* Do not fabricate external resources or claim a link was checked when it was not.

\* Distinguish a planned feature from a working feature.

\* Distinguish simulated data and execution from real tools.

\* Explain technical limitations and common failure modes.

\* Use synthetic datasets for training when real personal or sensitive data is unnecessary.



Before declaring a lesson or project complete, ask:



\* Were the required concepts actually taught?

\* Are prerequisites satisfied?

\* Can a beginner understand the explanation?

\* Is the example technically correct?

\* Does the exercise assess the stated objective?

\* Can a learner pass by copying a template without understanding?

\* Is the lab's execution status represented honestly?

\* Is there a meaningful remediation route?

\* What evidence supports the claimed competency?



\---



\## 20. Testing and Acceptance Strategy



Use the tests supported by the real project: unit, integration, end-to-end, regression, security, accessibility, and performance checks as appropriate.



Do not test only whether a screen renders. Test real behavior and data transitions.



\### 20.1 Required test coverage



Where applicable, cover:



\* Authentication, password reset, sessions, and profile mapping.

\* Data ownership, RLS/authorization, and cross-user isolation.

\* Persistence, migrations, offline state, and synchronization.

\* Curriculum prerequisites and progression.

\* Assessment scoring, critical-skill gates, and variant retesting.

\* Remediation and Fail-Forward behavior.

\* Spaced-repetition scheduling.

\* Coach context retrieval, permissions, and error handling.

\* Lab validation and truthful execution labels.

\* Incident simulation state and scoring.

\* Project rubrics, competency evidence, and report generation.

\* Portfolio sharing and revocation.

\* Peer Review permissions and feedback.

\* Study planning and learner-model estimates.

\* Trust-center controls and data operations.

\* Responsive UI, accessibility, error states, and route handling.

\* Analytics curriculum sequencing, labs, integrated workflows, and current certification mapping.

\* Refactored modules and preservation of the original behavior.



Use synthetic fixtures for tests and avoid exposing production user data.



\### 20.2 End-to-end learner journey



Verify the following flow where supported by the architecture:



1\. Register, authenticate, reset the password, and sign in again.

2\. Start a learning path and complete its diagnostic.

3\. Study a lesson and use its matching guided exercise or lab.

4\. Attempt an independent task and record its result.

5\. Fail a critical competency and receive targeted remediation.

6\. Complete a fresh variant and verify that the competency status changes correctly.

7\. Confirm that the mistake journal and review schedule reflect the outcome.

8\. Complete a project, its assessment, and its defense.

9\. Verify the generated competency report against actual evidence.

10\. Confirm that Golden Shot, Integrated Golden Shot, and Joker gates follow their defined prerequisites.

11\. Complete or inspect an incident simulation and validate the evidence record.

12\. Practice an interview and inspect the rubric-based feedback.

13\. Create a portfolio and verify authorized sharing and revocation.

14\. Inspect the study plan and compare learning scenarios where implemented.

15\. Test offline behavior, reconnection, synchronization, and user separation where supported.

16\. Inspect trust/privacy settings and test implemented controls.

17\. Confirm that progress persists across refresh and reauthentication where expected.

18\. Verify that one user cannot access another user's private records.

19\. Complete the relevant Data Analytics path prerequisites, labs, project evidence, and current PL-300 mapping.

20\. Revisit refactored areas to verify that extraction introduced no regression.



Do not mark a step complete if it was not actually tested. Record the blocker and the available evidence.



\### 20.3 Honest status reporting



Use precise implementation statuses:



\* `Implemented and Verified`

\* `Implemented — Verification Incomplete`

\* `Partially Implemented`

\* `Not Implemented`

\* `Blocked`



Distinguish local tests, integration tests, simulations, and live-production checks. Never fabricate test results, coverage, completion percentages, or security guarantees.



\---



\## 21. Phased Implementation and Continuous Execution



Execute the roadmap in dependency order. Adjust implementation details to the actual repository while preserving the outcomes below.



\### Phase 1 — Discovery and stabilization



\* Inspect the repository, deployment, Git state, and current behavior.

\* Create/update the feature inventory and engineering records.

\* Establish a baseline of available tests.

\* Resolve critical security, data-integrity, and core-flow defects.

\* Identify the safest next implementation increment.



\### Phase 2 — Modular architecture and refactoring



\* Refactor the monolith incrementally if justified by the actual code.

\* Follow the mandatory extraction ledger for every unit.

\* Preserve behavior and validate each extraction immediately.

\* Establish shared, maintainable interfaces and avoid duplicated implementations.



\### Phase 3 — Learning foundations



\* Audit and consolidate the competency graph, progress model, assessments, and persistence.

\* Establish prerequisites, critical-skill gates, evidence records, and curriculum versioning.

\* Verify that existing progress and user data remain intact.



\### Phase 4 — Existing module integration



\* Improve existing incident simulations, Fail-Forward, explanation modes, spaced repetition, projects, portfolios, interviews, Peer Review, and other relevant features.

\* Remove duplication through safe consolidation.

\* Add missing acceptance criteria and tests.



\### Phase 5 — Teaching and interactive practice



\* Improve the curriculum from foundational to advanced.

\* Build complete lessons before their dependent labs.

\* Implement meaningful interactive technical environments.

\* Integrate practical assessment, targeted remediation, and evidence capture.



\### Phase 6 — Coach and personalization



\* Integrate context-aware explanations, internal navigation, preferences, proactive suggestions, and controlled autonomy.

\* Connect recommendations to verified learner state.

\* Test permissions, failures, and provenance.



\### Phase 7 — Planning and learner intelligence



\* Integrate adaptive study planning, spaced repetition, and the evidence-based learning twin.

\* Present assumptions and uncertainty.

\* Verify that estimates respond to real learner evidence.



\### Phase 8 — Competency and career readiness



\* Strengthen project rubrics, reports, portfolio evidence, interview practice, Peer Review, and career recommendations.

\* Verify sharing permissions and evidence provenance.



\### Phase 9 — Continuity and trust



\* Implement feasible offline/PWA and synchronization capabilities.

\* Add or improve trust/transparency controls.

\* Test privacy, data operations, conflict handling, and cross-user isolation.



\### Phase 10 — Domain completion



\* Complete Data Analytics teaching, labs, assessments, projects, and certification mapping in the specified sequence.

\* Extend other learning paths according to the shared architecture.

\* Verify domain-specific learning rather than creating shallow menus or generic templates.



\### Phase 11 — Final quality and release



\* Run available regression, integration, end-to-end, security, accessibility, and performance checks.

\* Fix verified regressions.

\* Update all engineering records.

\* Deploy only when authorized and safe.

\* Verify the live site separately from local test results.

\* Produce the final implementation and verification report.



\*\*Do not wait until the final phase to test.\*\* Every meaningful change requires an appropriate checkpoint before dependent work continues.



\*\*Do not stop after Phase 1 or after implementing one impressive feature.\*\* Continue with the highest-priority feasible work until the execution budget or a genuine blocker prevents further progress.



If a phase is too large, split it into small verifiable increments. Preserve the overall dependency order and record the next action.



\---



\## 22. Token-Efficient Session and Context Management



The persistent repository records are the source of continuity across sessions.



\* Inspect once and record findings.

\* Reuse recorded findings when they remain valid.

\* Read only relevant files and focused ranges.

\* Prefer targeted searches, diffs, and focused tests over repeatedly dumping entire files.

\* Update existing documentation instead of producing redundant copies.

\* Avoid repeating settled analysis without new evidence.

\* Do not regenerate functioning features or unchanged curriculum unnecessarily.

\* Batch related safe changes while retaining verification checkpoints.

\* Do not sacrifice security, correctness, or essential tests for token savings.



Before context or execution limits become a risk, update `NEXT\_STEPS.md` with:



\* The current task and repository state.

\* Completed and verified changes.

\* Incomplete work and known regressions.

\* Relevant files and dependencies.

\* Tests run and their actual results.

\* Unresolved risks, assumptions, and blockers.

\* The exact next action.



On resumption, read the checkpoint and the relevant feature/refactoring ledger entries first. Continue from the last verified state.



Never restart the entire audit merely because a new session begins.



\---



\## 23. Final Reporting Requirements



Communicate with the user in Turkish.



At meaningful milestones, report concisely:



\* What changed and which files were affected.

\* Which existing feature was reused, repaired, extended, or newly implemented.

\* What behavior was verified.

\* Which commands and tests actually ran, with their results.

\* Which security and data-integrity checks were performed.

\* Which changes are only locally tested.

\* What remains incomplete, blocked, or unverified.

\* The next concrete action.



At final delivery, provide:



1\. A summary of implemented improvements.

2\. A feature-by-feature status against the inventory.

3\. The main architectural and refactoring changes.

4\. Test commands and observed results.

5\. Known defects, limitations, and unverified requirements.

6\. Security and privacy status, including unresolved risks.

7\. Deployment status and any required manual steps.

8\. Updated roadmap and resumable checkpoint.



Do not present planned features as implemented. Do not report a deployment as successful without verifying it. Do not claim all requirements are complete simply because the available session ended.



\## FINAL DIRECTIVE



Begin by inspecting the actual ProofPath repository and accessible live application. Establish a reliable baseline, identify existing features, and create or update the persistent engineering records.



Then implement the highest-priority concrete improvements and verify them. Continue through the dependency-ordered roadmap without repeatedly rediscovering the same facts or rebuilding existing functionality.



When refactoring `index.html`, record and verify every extracted unit immediately. When implementing a capability, consult the feature inventory first. When making a prediction or competency claim, show the evidence and limitations. When a task cannot be completed, document the exact blocker and leave a resumable checkpoint.



\*\*The goal is not to maximize the number of files, modules, features, or lines of code. The goal is to evolve the existing ProofPath into a secure, coherent, beginner-to-professional learning platform that teaches deeply, enables realistic practice, verifies independent competence, recovers learning gaps, and provides credible career evidence—with minimal redundant work and no false claims of completion.\*\*



