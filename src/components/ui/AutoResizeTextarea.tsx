"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";

interface AutoResizeTextareaProps {
  dayNumber: number;
  fieldKey: string;
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
}

export function AutoResizeTextarea({ 
  dayNumber, 
  fieldKey, 
  placeholder, 
  className = "",
  onChange 
}: AutoResizeTextareaProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const supabase = createClient();
  const [isHydrated, setIsHydrated] = useState(false);

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Load initial from local storage
  useEffect(() => {
    const local = localStorage.getItem(`lmdg_d${dayNumber}_${fieldKey}`);
    if (local) {
      setValue(local);
      if (onChangeRef.current) onChangeRef.current(local);
    }
    setIsHydrated(true);
  }, [dayNumber, fieldKey]);

  // Load from Supabase (sync down)
  useEffect(() => {
    if (!isHydrated) return;
    
    const fetchRemote = async () => {
      // Use getSession but avoid heavy concurrent refreshes if possible
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data } = await supabase
        .from("journal_entries")
        .select("content")
        .eq("user_id", session.user.id)
        .eq("day_number", dayNumber)
        .eq("field_key", fieldKey)
        .maybeSingle();
        
      if (data && data.content) {
        setValue(data.content);
        if (onChangeRef.current) onChangeRef.current(data.content);
        localStorage.setItem(`lmdg_d${dayNumber}_${fieldKey}`, data.content);
      }
    };
    fetchRemote();
  }, [dayNumber, fieldKey, isHydrated, supabase]);

  // Auto-resize logic
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  // Debounce sync to Supabase
  const syncToRemote = useCallback(async (content: string) => {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user) return;
    
    await supabase.rpc('sync_journal_entry', {
      p_day_number: dayNumber,
      p_field_key: fieldKey,
      p_content: content
    });
  }, [dayNumber, fieldKey, supabase]);

  useEffect(() => {
    if (!isHydrated) return;
    
    const timeoutId = setTimeout(() => {
      syncToRemote(value);
    }, 1000); // 1s debounce

    return () => clearTimeout(timeoutId);
  }, [value, isHydrated, syncToRemote]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setValue(val);
    if (onChangeRef.current) onChangeRef.current(val);
    localStorage.setItem(`lmdg_d${dayNumber}_${fieldKey}`, val);
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={`w-full bg-background-tertiary border border-border text-surface-white font-sans text-[0.95rem] leading-[1.7] p-4 resize-none overflow-hidden min-h-[80px] transition-colors duration-200 rounded-[2px] placeholder:text-surface-gray-dim focus:outline-none focus:border-border-brand focus:bg-background-quaternary ${className}`}
    />
  );
}
