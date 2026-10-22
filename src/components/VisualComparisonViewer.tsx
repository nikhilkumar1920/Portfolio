import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, AlertCircle } from 'lucide-react';

export const VisualComparisonViewer = () => {
  const [activeView, setActiveView] = useState<'original' | 'groundtruth' | 'predicted'>('predicted');

  const views = [
    {
      id: 'original' as const,
      label: '1. Original MRI',
      description: 'Axial multi-modal input scan (T1ce / FLAIR sequence)',
      src: '/images/projects/mri-original.svg',
      badgeColor: 'border-cyan-500/40 text-cyan-300',
    },
    {
      id: 'groundtruth' as const,
      label: '2. Ground-Truth Mask',
      description: 'Radiologist annotated tumor contour (Reference baseline)',
      src: '/images/projects/mri-groundtruth.svg',
      badgeColor: 'border-emerald-500/40 text-emerald-300',
    },
    {
      id: 'predicted' as const,
      label: '3. SAM-ViT-B Prediction',
      description: 'Fine-tuned model output (Dice: 0.9864, IoU: 0.9733)',
      src: '/images/projects/mri-predicted.svg',
      badgeColor: 'border-violet-500/40 text-violet-300',
    },
  ];

  const current = views.find((v) => v.id === activeView)!;

  return (
    <div className="rounded-2xl border border-violet-500/30 bg-slate-900/90 p-5 backdrop-blur-xl">
      {/* Header and View Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-cyan-400" />
            <h4 className="font-heading text-sm font-bold text-white">
              Medical Image Segmentation Visual Comparison
            </h4>
          </div>
          <p className="font-sans text-xs text-slate-400 mt-0.5">
            Compare anatomical inputs, ground-truth labels, and fine-tuned SAM predictions.
          </p>
        </div>

        {/* View Switcher Pills */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {views.map((v) => (
            <button
              key={v.id}
              onClick={() => setActiveView(v.id)}
              className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                activeView === v.id
                  ? 'bg-violet-600 text-white font-semibold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Image Display Area */}
      <div className="relative aspect-[4/3] max-h-[360px] w-full rounded-xl overflow-hidden border border-slate-800 bg-[#070a13] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={current.id}
            src={current.src}
            alt={current.description}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="h-full w-full object-contain"
          />
        </AnimatePresence>

        {/* Floating current description tag */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-between glass-card rounded-lg px-3 py-2 text-xs backdrop-blur-md">
          <span className="font-mono text-[11px] text-slate-300">
            {current.description}
          </span>
          <span className={`font-mono text-[10px] px-2 py-0.5 rounded border ${current.badgeColor} bg-slate-950/80`}>
            {activeView.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Academic Disclaimer & Metrics Summary */}
      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] font-sans text-slate-400">
        <div className="flex items-center gap-1.5 text-amber-300/90">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>
            Experimental evaluation results on research split; not a clinical guarantee.
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-cyan-300">
          <span>Dice: 0.9864</span>
          <span>•</span>
          <span>IoU: 0.9733</span>
          <span>•</span>
          <span>Pixel Acc: 99.93%</span>
        </div>
      </div>
    </div>
  );
};
