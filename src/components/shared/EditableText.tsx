'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import { useAppStore } from '@/context/AppStoreContext';
import { Locale } from '@/types/database';
import { Check, X, Edit3, Loader2 } from 'lucide-react';

interface EditableTextProps {
  translationKey: string;
  defaultText: string;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'div';
  className?: string;
  multiline?: boolean;
}

export function EditableText({
  translationKey,
  defaultText,
  as: Component = 'span',
  className = '',
  multiline = false
}: EditableTextProps) {
  const locale = useLocale() as Locale;
  const { isEditMode, updateTranslation } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(defaultText);
  const [tempText, setTempText] = useState(defaultText);
  const [isSaving, setIsSaving] = useState(false);

  // Sync with defaultText if it updates
  React.useEffect(() => {
    setText(defaultText);
    setTempText(defaultText);
  }, [defaultText]);

  if (!isEditMode) {
    return <Component className={className}>{text}</Component>;
  }

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaving(true);
    const success = await updateTranslation(locale, translationKey, tempText);
    if (success) {
      setText(tempText);
      setIsEditing(false);
    } else {
      alert('Error guardando traducción');
    }
    setIsSaving(false);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTempText(text);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <span className="inline-flex flex-col gap-1.5 p-1 rounded border border-[#C7A86A] bg-[#0A0D0B]/95 shadow-xl relative z-20">
        {multiline ? (
          <textarea
            rows={3}
            value={tempText}
            onChange={(e) => setTempText(e.target.value)}
            className="w-full text-xs text-[#F4F1E8] bg-[#0B1F1A] p-2 rounded border border-emerald-900 focus:outline-none focus:border-[#C7A86A]"
          />
        ) : (
          <input
            type="text"
            value={tempText}
            onChange={(e) => setTempText(e.target.value)}
            className="w-full text-xs text-[#F4F1E8] bg-[#0B1F1A] px-2 py-1 rounded border border-emerald-900 focus:outline-none focus:border-[#C7A86A]"
          />
        )}
        <div className="flex items-center gap-1 self-end text-[10px]">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="px-2 py-0.5 rounded bg-[#C7A86A] text-[#0A0D0B] font-bold flex items-center gap-1 hover:bg-[#d8b97c]"
          >
            {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
            <span>Guardar ({locale.toUpperCase()})</span>
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-2 py-0.5 rounded bg-[#161616] text-[#A8B0AA] hover:text-[#F4F1E8] flex items-center gap-0.5"
          >
            <X className="w-3 h-3" />
            <span>Cancelar</span>
          </button>
        </div>
      </span>
    );
  }

  return (
    <Component
      onClick={() => setIsEditing(true)}
      className={`group relative cursor-pointer outline outline-1 outline-dashed outline-[#C7A86A]/40 hover:outline-[#C7A86A] rounded px-1 -mx-1 transition-all ${className}`}
      title={`Click para editar texto de ${translationKey} (${locale.toUpperCase()})`}
    >
      {text}
      <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1.5 inline-flex items-center text-[10px] text-[#C7A86A] align-middle">
        <Edit3 className="w-3 h-3" />
      </span>
    </Component>
  );
}
