import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal as TerminalIcon, 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  Layers
} from 'lucide-react';

interface SimulationScenario {
  id: string;
  name: string;
  file: string;
  icon: typeof TerminalIcon;
  color: string;
  badge: string;
  codeSnippet: string;
  logs: Array<{ text: string; type: 'info' | 'pass' | 'patch' | 'warn' | 'metric'; delay: number }>;
}

const SCENARIOS: SimulationScenario[] = [
  {
    id: 'lemonx',
    name: 'LemonX Agentic QA',
    file: 'lemonx-orchestrator.ts',
    icon: Sparkles,
    color: 'from-violet-500 to-indigo-500',
    badge: 'Multi-Agent CI/CD',
    codeSnippet: `// LemonX Multi-Agent Test Repair Loop
const agent = new LemonXOrchestrator({ model: 'workers-ai/deepseek' });
const failure = await vitest.runRegression('./src/billing.spec.ts');
if (failure.hasError) {
  const ast = parseTypeScriptAST(failure.trace);
  const patch = await agent.synthesizePatch(ast, failure.expected);
  await vitest.verifyPatch(patch); // Zero Regression Guarantee
}`,
    logs: [
      { text: '[INIT] LemonX Agentic Test Orchestrator v2.4 initialized', type: 'info', delay: 150 },
      { text: '[AST] Parsing AST nodes for src/billing.spec.ts: found 14 assertion points', type: 'info', delay: 350 },
      { text: '[EXEC] Vitest container spawned in isolated sub-process sandbox', type: 'info', delay: 600 },
      { text: '[FAIL] billing.spec.ts:42 -> Expected HTTP 200, received 429 RateLimit', type: 'warn', delay: 900 },
      { text: '[DIAG] Root Cause Localized: exponential backoff missing retry budget', type: 'info', delay: 1200 },
      { text: '[AGENT] Synthesizing atomic patch using AST token replacement...', type: 'info', delay: 1500 },
      { text: '[PATCH] Applied: + const timeout = Math.max(1000, opts.retries * 500);', type: 'patch', delay: 1800 },
      { text: '[VERIFY] Running full regression test suite (18 test files)...', type: 'info', delay: 2100 },
      { text: '[PASS] All 42 unit and integration tests passing (100% coverage)', type: 'pass', delay: 2400 },
      { text: '[PR_READY] Automated pull request generated with zero-regression diff', type: 'metric', delay: 2700 },
    ],
  },
  {
    id: 'sam',
    name: 'SAM Glioma Segmentation',
    file: 'inference_sam_vit_b.py',
    icon: Cpu,
    color: 'from-cyan-500 to-blue-500',
    badge: 'Springer CVR 2026',
    codeSnippet: `# SAM-ViT-B Medical Domain Adaptation
model = SAMViTBMedicalAdapter.load_pretrained('weights/sam_glioma_cvr26.pth')
mri_tensor = preprocess_axial_flair(image_path, target_size=(1024, 1024))
prompt_box = generate_prompt_from_t1ce(mri_tensor)
with torch.no_grad():
    mask_logits = model(mri_tensor, prompt_box)
    dice_score = compute_dice_metric(mask_logits, ground_truth)`,
    logs: [
      { text: '[LOAD] Loading fine-tuned SAM-ViT-B weights (1024x1024 prompt adapter)', type: 'info', delay: 150 },
      { text: '[PREPROCESS] BraTS 2021 Multi-Modal MRI: Axial T1ce + FLAIR normalized', type: 'info', delay: 400 },
      { text: '[CUDA] Device: NVIDIA RTX | Memory allocated: 3.42 GB / 8.00 GB', type: 'info', delay: 650 },
      { text: '[ENCODER] Generating 256-dim image embeddings via Vision Transformer', type: 'info', delay: 950 },
      { text: '[PROMPT] Geometric bounding prompt injected at coordinates [142, 280, 290, 420]', type: 'info', delay: 1250 },
      { text: '[DECODER] Lightweight 3-layer mask decoder synthesizing tumor contour...', type: 'info', delay: 1600 },
      { text: '[METRIC] Evaluating prediction vs annotated neurosurgeon ground truth', type: 'info', delay: 1950 },
      { text: '[BENCHMARK] Dice Coefficient: 0.9864 (+14.6% improvement over baseline U-Net++)', type: 'metric', delay: 2300 },
      { text: '[BENCHMARK] IoU (Jaccard Index): 0.9733 | Pixel Accuracy: 99.93%', type: 'pass', delay: 2600 },
    ],
  },
  {
    id: 'zkp',
    name: 'Noir ZK-SNARK Verifier',
    file: 'ballot_verifier.nr',
    icon: ShieldCheck,
    color: 'from-emerald-500 to-cyan-500',
    badge: 'Zero-Knowledge Proof',
    codeSnippet: `// Noir Zero-Knowledge Circuit for Anonymous Voting
fn main(
    secret_voter_key: Field,
    ballot_hash: pub Field,
    merkle_root: pub Field,
    merkle_proof: [Field; 8]
) {
    let voter_commitment = std::hash::poseidon([secret_voter_key]);
    assert(compute_merkle_root(voter_commitment, merkle_proof) == merkle_root);
}`,
    logs: [
      { text: '[NOIR] Compiling ZK circuit constraint system (R1CS)', type: 'info', delay: 150 },
      { text: '[CIRCUIT] 1,420 non-linear constraints verified across 8 Merkle tree levels', type: 'info', delay: 450 },
      { text: '[WITNESS] Generating Poseidon hash secret commitment witness...', type: 'info', delay: 800 },
      { text: '[PROVER] UltraPlonk proving backend initialized (CRS loaded)', type: 'info', delay: 1200 },
      { text: '[PROOF] Zero-knowledge proof generated: 2.1 KB payload in 842ms', type: 'pass', delay: 1600 },
      { text: '[SOLIDITY] Dispatching verification transaction to Sepolia EVM contract...', type: 'info', delay: 2000 },
      { text: '[GAS] Verification gas consumed: 184,210 gas (ultra-lightweight)', type: 'metric', delay: 2350 },
      { text: '[CONFIRMED] Voter anonymity preserved: Nullifier successfully recorded', type: 'pass', delay: 2700 },
    ],
  },
];

export const InteractiveTerminal = () => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [activeLogs, setActiveLogs] = useState<SimulationScenario['logs']>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const terminalLogsRef = useRef<HTMLDivElement>(null);

  const scenario = SCENARIOS[selectedScenarioIndex];

  // Auto-scroll terminal logs to bottom
  useEffect(() => {
    if (terminalLogsRef.current) {
      terminalLogsRef.current.scrollTop = terminalLogsRef.current.scrollHeight;
    }
  }, [activeLogs]);

  // Run simulation sequence
  const startSimulation = () => {
    setIsRunning(true);
    setActiveLogs([]);

    const timers: ReturnType<typeof setTimeout>[] = [];
    scenario.logs.forEach((logItem, index) => {
      const timer = setTimeout(() => {
        setActiveLogs((prev) => [...prev, logItem]);
        if (index === scenario.logs.length - 1) {
          setIsRunning(false);
        }
      }, logItem.delay);
      timers.push(timer);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  };

  // Run initial simulation on scenario change
  useEffect(() => {
    const cleanup = startSimulation();
    return cleanup;
  }, [selectedScenarioIndex]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(scenario.codeSnippet);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section className="relative py-20 overflow-hidden bg-slate-950/60 border-y border-slate-800/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-80 w-80 rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 h-80 w-80 rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-950/30 px-3 py-1 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-3 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <TerminalIcon className="h-3.5 w-3.5 text-cyan-400" />
            Interactive Code Simulator
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Live Architecture Execution Console
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl">
            Simulate Nikhil's core engineering workflows in real time: from agentic automated test repair to medical image segmentation and ZK cryptography.
          </p>
          <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {SCENARIOS.map((sc, idx) => {
            const Icon = sc.icon;
            const isSelected = selectedScenarioIndex === idx;
            return (
              <button
                key={sc.id}
                onClick={() => setSelectedScenarioIndex(idx)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-xs transition-all duration-200 border ${
                  isSelected
                    ? 'bg-slate-900 border-violet-500/60 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] scale-[1.02]'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <Icon className={`h-4 w-4 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span className="font-semibold">{sc.name}</span>
                <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-slate-800/80 text-cyan-300 font-mono">
                  {sc.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Console Container */}
        <div className="terminal-window relative rounded-3xl border border-violet-500/30 bg-[#070a14] shadow-[0_0_50px_rgba(139,92,246,0.15)] overflow-hidden">
          
          {/* Top Window Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-slate-950/90 px-4 py-3 gap-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block border border-rose-400/40" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block border border-amber-400/40" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-400/40" />
              <span className="ml-3 font-mono text-xs text-slate-400 flex items-center gap-1.5">
                <span className="text-violet-400 font-semibold">nikhil@core-ai:</span>
                <span className="text-cyan-300">~/{scenario.file}</span>
              </span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs font-mono">
                <span className={`h-2 w-2 rounded-full ${isRunning ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                <span className={isRunning ? 'text-amber-300' : 'text-emerald-300'}>
                  {isRunning ? 'EXECUTING...' : 'READY'}
                </span>
              </div>

              <button
                onClick={startSimulation}
                disabled={isRunning}
                className="flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/40 px-3 py-1 text-xs font-mono text-cyan-200 hover:bg-cyan-900/50 hover:text-white transition-all disabled:opacity-50"
                title="Restart Simulation"
              >
                {isRunning ? (
                  <RotateCcw className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Play className="h-3.5 w-3.5 text-cyan-400" />
                )}
                <span>{isRunning ? 'Running' : 'Run Simulation'}</span>
              </button>

              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                title="Copy Code Snippet"
              >
                {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{isCopied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Console Grid: Code Preview + Live Output Stream */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            
            {/* Left Column: Code Snippet */}
            <div className="lg:col-span-5 p-5 bg-[#050811] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                  <span className="flex items-center gap-1.5 text-cyan-300">
                    <Layers className="h-3.5 w-3.5" />
                    <span>Implementation Source</span>
                  </span>
                  <span className="text-[10px] text-slate-500">TypeScript / Python</span>
                </div>
                <pre className="font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <code>{scenario.codeSnippet}</code>
                </pre>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between font-mono text-[11px] text-slate-500">
                <span>Architecture Target</span>
                <span className="text-violet-400 font-semibold">{scenario.name}</span>
              </div>
            </div>

            {/* Right Column: Dynamic Terminal Logs */}
            <div className="lg:col-span-7 p-5 bg-[#03060c] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <TerminalIcon className="h-3.5 w-3.5" />
                    <span>Subprocess stdout / stderr</span>
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">
                    {activeLogs.length} / {scenario.logs.length} events
                  </span>
                </div>

                <div 
                  ref={terminalLogsRef}
                  className="h-64 overflow-y-auto space-y-2 font-mono text-xs p-3 rounded-xl bg-slate-950 border border-slate-800/60 scrollbar-thin"
                >
                  <AnimatePresence>
                    {activeLogs.map((log, i) => {
                      let textColor = 'text-slate-300';
                      if (log.type === 'pass') textColor = 'text-emerald-400 font-semibold';
                      if (log.type === 'metric') textColor = 'text-cyan-300 font-bold';
                      if (log.type === 'warn') textColor = 'text-amber-400';
                      if (log.type === 'patch') textColor = 'text-violet-300 font-semibold';

                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                          className={`flex items-start gap-2 leading-relaxed ${textColor}`}
                        >
                          <span className="text-slate-600 select-none text-[10px] pt-0.5">
                            {(i + 1).toString().padStart(2, '0')}
                          </span>
                          <span>{log.text}</span>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                  {isRunning && (
                    <div className="flex items-center gap-2 text-cyan-400">
                      <span className="text-slate-600 text-[10px]">..</span>
                      <span className="h-3.5 w-2 bg-cyan-400 animate-pulse inline-block" />
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Console Status */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-violet-400" />
                  <span>Production Pipeline Status</span>
                </span>
                <span className={isRunning ? 'text-amber-400' : 'text-emerald-400 font-bold'}>
                  {isRunning ? 'Processing Stream...' : '✓ Pipeline Verified'}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
