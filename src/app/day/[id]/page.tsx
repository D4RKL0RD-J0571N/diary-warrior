"use client";

import React, { useEffect, use, useState, useMemo } from "react";
import { DAYS } from "@/data/days";
import { AutoResizeTextarea } from "@/components/ui/AutoResizeTextarea";
import { SignatureRow } from "@/components/ui/SignatureRow";
import { useJournal } from "@/context/JournalContext";
import { useRouter } from "next/navigation";
import { UI_CONTENT } from "@/data/ui-content";

export default function DayPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { state, markDayCompleted } = useJournal();
  const { id } = use(params);
  const dayNumber = parseInt(id, 10);
  
  const dayData = DAYS.find(d => d.day === dayNumber);
  const isCompleted = state.completedDays.includes(dayNumber);

  // Paywall: Redirect unpaid users trying to access Day 2+
  useEffect(() => {
    if (dayNumber > 1 && !state.isPaid) {
      router.replace("/pricing");
    }
  }, [dayNumber, state.isPaid, router]);

  const steps = useMemo(() => {
    if (!dayData) return [];
    const arr: any[] = [
      { type: 'intro', id: 'intro' }
    ];
    dayData.questions.forEach((q, i) => {
      arr.push({ type: 'question', id: `q${i}`, data: q, index: i });
    });
    arr.push({ type: 'exercise', id: 'exercise' });
    arr.push({ type: 'commitment', id: 'commitment' });
    return arr;
  }, [dayData]);

  const [activeStep, setActiveStep] = useState(0);

  // Validation state
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [sigName, setSigName] = useState("");

  const handleFieldChange = React.useCallback((key: string, val: string) => {
    setFieldValues(prev => {
      if (prev[key] === val) return prev;
      return { ...prev, [key]: val };
    });
  }, []);

  const handleSigChange = React.useCallback((vals: { name: string }) => {
    setSigName(prev => {
      if (prev === vals.name) return prev;
      return vals.name;
    });
  }, []);

  const isStepValid = (stepIndex: number) => {
    if (isCompleted) return true; // If day is completed, all steps are valid
    const step = steps[stepIndex];
    if (!step) return false;
    if (step.type === 'intro') return true;
    if (step.type === 'question' || step.type === 'exercise') {
      return (fieldValues[step.id] || "").trim().length > 0;
    }
    if (step.type === 'commitment') {
      return (fieldValues.commitment || "").trim().length > 0 && sigName.trim().length > 0;
    }
    return false;
  };

  const advanceStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
      // Optional: scroll down smoothly after a short delay to allow render
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 100);
    }
  };

  // If completed previously, show all steps at once
  useEffect(() => {
    if (isCompleted && steps.length > 0) {
      setActiveStep(steps.length - 1);
    }
  }, [isCompleted, steps.length]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setFieldValues({});
    setSigName("");
    setActiveStep(isCompleted ? steps.length - 1 : 0);
  }, [dayNumber, isCompleted, steps.length]);

  if (!dayData) return <div className="text-surface-white p-8">Day not found</div>;

  const handleComplete = async () => {
    if (!isStepValid(steps.length - 1) && !isCompleted) return;
    
    await markDayCompleted(dayNumber);
    if (dayNumber < 21) {
      router.push(`/day/${dayNumber + 1}`);
    } else {
      router.push("/celebration");
    }
  };

  const renderStep = (step: any, index: number) => {
    const isVisible = index <= activeStep;
    const isCurrent = index === activeStep;
    if (!isVisible) return null;

    const showContinue = isCurrent && index < steps.length - 1;

    return (
      <div key={step.id} className="animate-in slide-in-from-bottom-4 fade-in duration-700 mb-10">
        {step.type === 'intro' && (
          <>
            <div className="bg-background-tertiary border-l-4 border-brand p-7 md:p-8 mb-8 relative shadow-lg">
              <span className="font-display text-5xl md:text-[5rem] text-brand-dim leading-none absolute top-4 left-6 italic opacity-50">"</span>
              <p className="font-display text-[1.15rem] italic text-surface-white leading-[1.7] pl-4 md:pl-6 relative z-10">
                {dayData.quote}
              </p>
              <p className="text-[0.8rem] text-brand tracking-[0.1em] uppercase font-medium mt-4 pl-4 md:pl-6 relative z-10">
                — {dayData.quoteAuthor}
              </p>
            </div>
            <p className="text-base text-surface-gray leading-[1.85] mb-8">
              {dayData.context}
            </p>
          </>
        )}

        {step.type === 'question' && (
          <div className="bg-background-tertiary border border-border p-6 md:p-8 rounded-[4px] shadow-md transition-all duration-300 hover:border-border-brand focus-within:border-brand focus-within:shadow-[0_0_15px_rgba(34,184,133,0.1)]">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-6 h-6 rounded-full border border-brand flex items-center justify-center text-[0.65rem] text-brand font-semibold shrink-0">
                Q{step.index + 1}
              </span>
              <h3 className="font-medium text-surface-white text-[1rem] leading-[1.4]">{step.data.q}</h3>
            </div>
            <p className="text-[0.85rem] italic text-surface-gray mb-4 ml-9">{step.data.hint}</p>
            <div className="ml-9">
              <AutoResizeTextarea 
                dayNumber={dayNumber} 
                fieldKey={`q${step.index}`} 
                placeholder={UI_CONTENT.dayPage.reflectionPlaceholder} 
                onChange={(val) => handleFieldChange(`q${step.index}`, val)}
                className="bg-background border-none focus:bg-background shadow-inner"
              />
            </div>
          </div>
        )}

        {step.type === 'exercise' && (
          <div className="bg-background-tertiary border border-border p-6 md:p-8 rounded-[4px] shadow-md transition-all duration-300 hover:border-border-brand focus-within:border-brand focus-within:shadow-[0_0_15px_rgba(34,184,133,0.1)]">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-brand/10 border border-brand flex items-center justify-center text-[0.8rem] text-brand font-bold shrink-0">
                II
              </span>
              <h2 className="font-display text-[1.2rem] font-semibold text-surface-white">
                {dayData.exerciseTitle}
              </h2>
            </div>
            
            <ul className="list-none mb-6 ml-2">
              {dayData.exerciseSteps.map((s: string, i: number) => (
                <li key={i} className="flex gap-4 mb-4 items-start">
                  <span className="w-5 h-5 min-w-[20px] rounded-full bg-background-quaternary border border-border-brand flex items-center justify-center text-[0.65rem] text-brand font-bold shrink-0 mt-[3px]">
                    {i + 1}
                  </span>
                  <span className="text-[0.95rem] text-surface-gray leading-[1.6]">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-[0.95rem] text-surface-white font-medium mb-3">{dayData.exerciseLabel}</p>
              <AutoResizeTextarea 
                dayNumber={dayNumber} 
                fieldKey="exercise" 
                placeholder={UI_CONTENT.dayPage.exercisePlaceholder} 
                onChange={(val) => handleFieldChange("exercise", val)}
                className="bg-background border-none shadow-inner"
              />
            </div>
          </div>
        )}

        {step.type === 'commitment' && (
          <div className="bg-background-tertiary border-2 border-border-brand p-6 md:p-8 rounded-[4px] shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-brand"></div>
            <h2 className="font-display text-[1.3rem] font-semibold text-surface-white mb-6">
              {UI_CONTENT.dayPage.commitmentTitle}
            </h2>
            <p className="font-display italic text-surface-white mb-8 text-base leading-[1.7] bg-background p-4 rounded border border-border">
              "{dayData.commitment}"
            </p>
            <div className="mb-8">
              <p className="text-[0.95rem] text-surface-white font-medium mb-3">{UI_CONTENT.dayPage.commitmentActionLabel}</p>
              <AutoResizeTextarea 
                dayNumber={dayNumber} 
                fieldKey="commitment" 
                placeholder={UI_CONTENT.dayPage.commitmentPlaceholder} 
                onChange={(val) => handleFieldChange("commitment", val)}
                className="bg-background border-none shadow-inner"
              />
            </div>
            <div className="pt-6 border-t border-border-brand">
              <SignatureRow dayNumber={dayNumber} onChange={handleSigChange} />
            </div>
          </div>
        )}

        {showContinue && (
          <div className="flex justify-end mt-4">
            <button 
              onClick={advanceStep}
              disabled={!isStepValid(index)}
              className={`py-2.5 px-8 font-sans text-[0.85rem] font-bold tracking-[0.1em] uppercase transition-all duration-300 rounded-[2px]
                ${isStepValid(index) 
                  ? 'bg-brand text-black hover:bg-[#22b885] hover:shadow-[0_0_15px_rgba(34,184,133,0.3)] hover:-translate-y-0.5 cursor-pointer' 
                  : 'bg-background-quaternary text-surface-gray opacity-50 cursor-not-allowed'}`}
            >
              Continuar
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="pb-24">
      {/* Fixed Header */}
      <div className="mb-10 border-b border-border pb-6 sticky top-[60px] md:top-0 bg-background/95 backdrop-blur-md z-40 pt-6 md:pt-8 -mt-6 md:-mt-8 px-2 md:px-0">
        <p className="text-[0.65rem] tracking-[0.2em] uppercase text-brand font-semibold mb-2">
          {dayData.weekName}
        </p>
        <h1 className="font-display text-[1.5rem] md:text-[2.2rem] font-bold text-surface-white leading-[1.1] flex items-center gap-3">
          <span className="text-surface-gray-dim font-normal">{String(dayNumber).padStart(2, "0")}</span>
          {dayData.title}
        </h1>
      </div>

      {/* Progressive Steps */}
      <div className="max-w-[700px] mx-auto px-2 md:px-0">
        {steps.map((step, index) => renderStep(step, index))}

        {/* Final Completion Section */}
        {activeStep === steps.length - 1 && (
          <div className="animate-in fade-in zoom-in-95 duration-700 mt-12">
            <div className="bg-brand/5 border border-brand/20 p-6 md:p-8 mb-8 rounded-[4px] text-[0.9rem] text-surface-white leading-[1.7] text-center">
              {dayNumber < 21 ? (
                <p>La mente ha sido grabada. <strong className="text-brand font-semibold block mt-2 text-lg">Mañana: {dayData.nextDay}</strong></p>
              ) : (
                <p>{UI_CONTENT.dayPage.day21Closing}</p>
              )}
            </div>

            <button 
              onClick={handleComplete}
              disabled={!isStepValid(steps.length - 1) && !isCompleted}
              className={`w-full py-4 px-8 font-sans text-[0.95rem] font-bold tracking-[0.15em] uppercase transition-all duration-500 rounded-[2px]
                ${isCompleted ? 'bg-brand text-black cursor-pointer' : ''}
                ${!isStepValid(steps.length - 1) && !isCompleted 
                  ? 'opacity-30 grayscale cursor-not-allowed border-2 border-surface-gray text-surface-gray' 
                  : 'bg-transparent border-2 border-brand text-brand hover:bg-brand hover:text-black hover:shadow-[0_0_20px_rgba(34,184,133,0.4)] hover:-translate-y-1 cursor-pointer'}`}
            >
              {isCompleted ? UI_CONTENT.dayPage.continueButton : UI_CONTENT.dayPage.completeButton(dayNumber)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
