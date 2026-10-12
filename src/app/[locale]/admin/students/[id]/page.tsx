'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useAppStore } from '@/context/AppStoreContext';
import { getCurriculumDay } from '@/data/curriculumData';
import { Locale } from '@/types/database';
import {
  ArrowLeft,
  User,
  Send,
  Lock,
  BookOpen,
  CheckCircle2,
  Clock,
  MessageSquare
} from 'lucide-react';

export default function StudentInspectionPage() {
  const params = useParams();
  const studentId = params.id as string;
  const t = useTranslations('admin');
  const locale = useLocale() as Locale;

  const {
    allStudents,
    journalEntries,
    mentorFeedback,
    addMentorFeedback,
    addPrivateNote
  } = useAppStore();

  const student = allStudents.find(s => s.id === studentId) || allStudents[0];

  const [selectedDay, setSelectedDay] = useState<number>(student ? student.progress.currentDay : 1);
  const [feedbackInput, setFeedbackInput] = useState('');
  const [privateNoteInput, setPrivateNoteInput] = useState('');
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [submittingNote, setSubmittingNote] = useState(false);

  const selectedDayData = getCurriculumDay(selectedDay, student?.preferredLanguage || 'es');
  const studentEntry = journalEntries[selectedDay];

  // Notes and feedback for this student
  const studentNotes = mentorFeedback.filter(f => f.userId === student?.id);

  const handleSendFeedback = async () => {
    if (!feedbackInput.trim()) return;
    setSubmittingFeedback(true);
    await addMentorFeedback(student.id, selectedDay, feedbackInput);
    setFeedbackInput('');
    setSubmittingFeedback(false);
    alert(t('feedbackSentAlert'));
  };

  const handleSavePrivateNote = async () => {
    if (!privateNoteInput.trim()) return;
    setSubmittingNote(true);
    await addPrivateNote(student.id, privateNoteInput);
    setPrivateNoteInput('');
    setSubmittingNote(false);
    alert(t('noteSavedAlert'));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Top Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/admin/students"
          className="inline-flex items-center gap-1.5 text-xs text-[#A8B0AA] hover:text-[#C7A86A] transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('tabsStudents')}</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#064E3B] border border-[#C7A86A]/40 flex items-center justify-center">
              <User className="w-6 h-6 text-[#C7A86A]" />
            </div>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#F4F1E8]">
                {student.name}
              </h1>
              <p className="text-xs text-[#A8B0AA]">
                {student.email} · {t('colLang')}: <span className="text-[#C7A86A] font-bold">{student.preferredLanguage.toUpperCase()}</span> · {t('colCurrentDay')}: {student.progress.currentDay}/21
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: 21-Day Inspection Timeline & Entry Answers Viewer */}
        <div className="lg:col-span-2 space-y-6">
          {/* Day Selector Buttons */}
          <div className="rounded-xl border border-emerald-950/80 bg-[#0B1F1A]/60 p-4">
            <span className="text-xs font-semibold uppercase text-[#A8B0AA] block mb-3">
              {t('selectDayInspect')}
            </span>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 21 }, (_, i) => i + 1).map(dayNum => {
                const isCompleted = student.progress.completedDays.includes(dayNum);
                const isSelected = selectedDay === dayNum;
                return (
                  <button
                    key={dayNum}
                    type="button"
                    onClick={() => setSelectedDay(dayNum)}
                    className={`w-9 h-9 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                      isSelected
                        ? 'bg-[#C7A86A] text-[#0A0D0B] shadow-md'
                        : isCompleted
                        ? 'bg-[#064E3B] text-[#F4F1E8] border border-emerald-700/60'
                        : 'bg-[#0A0D0B] text-[#A8B0AA] border border-emerald-950/60'
                    }`}
                  >
                    {dayNum}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Student Entry Inspection Details */}
          <div className="rounded-xl border border-emerald-950/80 bg-[#0B1F1A]/80 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-emerald-950/80 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C7A86A]">
                  {t('inspectDayTitle', { day: selectedDay })}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#F4F1E8] mt-1">
                  {selectedDayData.title}
                </h3>
              </div>
              {student.progress.completedDays.includes(selectedDay) ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {t('statusCompleted')}
                </span>
              ) : (
                <span className="text-xs text-[#A8B0AA] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {t('statusPending')}
                </span>
              )}
            </div>

            {/* Questions & Student Raw Answers */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-bold text-[#A8B0AA] tracking-wider">
                {t('answersTitle')}
              </h4>

              {selectedDayData.questions.map((qObj, idx) => {
                const key = `q${idx}`;
                const ans = studentEntry?.responses?.[key] || t('noAnswerYet');
                return (
                  <div key={idx} className="rounded-lg border border-emerald-950 bg-[#0A0D0B] p-4">
                    <p className="text-xs font-semibold text-[#C7A86A] mb-1">
                      {idx + 1}. {qObj.q}
                    </p>
                    <p className="text-xs text-[#F4F1E8] leading-relaxed italic">
                      "{ans}"
                    </p>
                  </div>
                );
              })}

              {/* Exercise Drill Output */}
              <div className="rounded-lg border border-emerald-950 bg-[#0A0D0B] p-4">
                <p className="text-xs font-semibold text-[#C7A86A] mb-1">
                  {selectedDayData.exerciseTitle}
                </p>
                <p className="text-xs text-[#F4F1E8] leading-relaxed italic">
                  "{studentEntry?.responses?.exercise || t('exerciseNoDoc')}"
                </p>
              </div>

              {/* Daily Commitment */}
              <div className="rounded-lg border border-emerald-950 bg-[#0A0D0B] p-4">
                <p className="text-xs font-semibold text-[#C7A86A] mb-1">
                  {t('commitmentNone')}:
                </p>
                <p className="text-xs text-[#F4F1E8] leading-relaxed italic">
                  "{studentEntry?.responses?.commitment || t('commitmentNone')}"
                </p>
                {studentEntry?.responses?.sig_name && (
                  <p className="text-[10px] text-[#A8B0AA] mt-2">
                    {t('signedBy', { name: studentEntry.responses.sig_name, date: studentEntry.responses.sig_date })}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Coaching Dispatcher & Private Notes */}
        <div className="space-y-6">
          {/* 1. Direct Feedback Dispatcher */}
          <div className="rounded-xl border border-[#C7A86A]/40 bg-[#064E3B]/20 p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-[#C7A86A]" />
              <h3 className="font-serif text-lg font-bold text-[#F4F1E8]">
                {t('sendFeedbackTitle')}
              </h3>
            </div>
            <p className="text-xs text-[#A8B0AA] mb-4">
              {t('sendFeedbackDesc')} (Día {selectedDay})
            </p>

            <textarea
              rows={4}
              value={feedbackInput}
              onChange={(e) => setFeedbackInput(e.target.value)}
              placeholder={t('feedbackPlaceholder')}
              className="w-full rounded-lg border border-emerald-950 bg-[#0A0D0B] p-3 text-xs text-[#F4F1E8] focus:border-[#C7A86A] focus:outline-none mb-3"
            />

            <button
              type="button"
              onClick={handleSendFeedback}
              disabled={submittingFeedback}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#C7A86A] text-[#0A0D0B] font-bold text-xs uppercase tracking-wider hover:bg-[#d8b97c] transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submittingFeedback ? 'Enviando...' : t('saveFeedback')}</span>
            </button>
          </div>

          {/* 2. Internal Mentor Notes (Private) */}
          <div className="rounded-xl border border-emerald-950/80 bg-[#0B1F1A]/80 p-6">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4 text-[#A8B0AA]" />
              <h3 className="font-serif text-lg font-bold text-[#F4F1E8]">
                {t('mentorPrivateNotes')}
              </h3>
            </div>
            <p className="text-xs text-[#A8B0AA] mb-4">
              {t('mentorPrivateNotesDesc')}
            </p>

            <textarea
              rows={3}
              value={privateNoteInput}
              onChange={(e) => setPrivateNoteInput(e.target.value)}
              placeholder={t('privateNotePlaceholder')}
              className="w-full rounded-lg border border-emerald-950 bg-[#0A0D0B] p-3 text-xs text-[#F4F1E8] focus:border-[#C7A86A] focus:outline-none mb-3"
            />

            <button
              type="button"
              onClick={handleSavePrivateNote}
              disabled={submittingNote}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#064E3B] hover:bg-[#064E3B]/80 text-[#F4F1E8] text-xs font-semibold border border-emerald-700/40 transition-colors disabled:opacity-50 mb-6"
            >
              <span>{submittingNote ? 'Guardando...' : t('saveNote')}</span>
            </button>

            {/* History of notes */}
            <div className="border-t border-emerald-950/80 pt-4 space-y-3">
              <span className="text-[11px] font-bold uppercase text-[#A8B0AA] block">
                Historial de Notas del Mentor:
              </span>
              {studentNotes.map(n => (
                <div key={n.id} className="rounded border border-emerald-950 bg-[#0A0D0B]/60 p-2.5 text-xs text-[#A8B0AA]">
                  {n.privateNote && (
                    <p className="text-[#F4F1E8] font-medium mb-1">
                      🔒 [Privada]: {n.privateNote}
                    </p>
                  )}
                  {n.mentorFeedback && (
                    <p className="text-[#C7A86A]">
                      📢 [Al Alumno D{n.dayNumber}]: {n.mentorFeedback}
                    </p>
                  )}
                  <span className="text-[10px] text-[#A8B0AA]/60 block mt-1">
                    {new Date(n.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
