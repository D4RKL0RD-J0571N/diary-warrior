"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { UI_CONTENT } from "@/data/ui-content";

interface SignatureRowProps {
  dayNumber: number;
  onChange?: (values: { name: string; date: string; time: string }) => void;
}

export function SignatureRow({ dayNumber, onChange }: SignatureRowProps) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const supabase = createClient();
  const [isHydrated, setIsHydrated] = useState(false);

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const savedName = localStorage.getItem(`lmdg_d${dayNumber}_sig_name`) || "";
    const savedDate = localStorage.getItem(`lmdg_d${dayNumber}_sig_date`) || "";
    const savedTime = localStorage.getItem(`lmdg_d${dayNumber}_sig_time`) || "";
    setName(savedName);
    setDate(savedDate);
    setTime(savedTime);
    if (onChangeRef.current) onChangeRef.current({ name: savedName, date: savedDate, time: savedTime });
    setIsHydrated(true);
  }, [dayNumber]);

  useEffect(() => {
    if (!isHydrated) return;
    const fetchRemote = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;
      
      const fetchField = async (key: string, setter: (val: string) => void) => {
        const { data } = await supabase
          .from("journal_entries")
          .select("content")
          .eq("user_id", session.user.id)
          .eq("day_number", dayNumber)
          .eq("field_key", key)
          .maybeSingle();
        if (data?.content) {
          setter(data.content);
          localStorage.setItem(`lmdg_d${dayNumber}_${key}`, data.content);
          return data.content;
        }
        return "";
      };
      
      const [n, d, t] = await Promise.all([
        fetchField('sig_name', setName),
        fetchField('sig_date', setDate),
        fetchField('sig_time', setTime),
      ]);

      if (onChangeRef.current) onChangeRef.current({ name: n, date: d, time: t });
    };
    fetchRemote();
  }, [dayNumber, isHydrated, supabase]);

  const syncToRemote = useCallback(async (key: string, content: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;
    await supabase.rpc('sync_journal_entry', {
      p_day_number: dayNumber,
      p_field_key: key,
      p_content: content
    });
  }, [dayNumber, supabase]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (onChangeRef.current) onChangeRef.current({ name: val, date, time });
    localStorage.setItem(`lmdg_d${dayNumber}_sig_name`, val);
    setTimeout(() => syncToRemote('sig_name', val), 1000);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDate(val);
    if (onChangeRef.current) onChangeRef.current({ name, date: val, time });
    localStorage.setItem(`lmdg_d${dayNumber}_sig_date`, val);
    setTimeout(() => syncToRemote('sig_date', val), 1000);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTime(val);
    if (onChangeRef.current) onChangeRef.current({ name, date, time: val });
    localStorage.setItem(`lmdg_d${dayNumber}_sig_time`, val);
    setTimeout(() => syncToRemote('sig_time', val), 1000);
  };

  if (!isHydrated) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <div className="flex flex-col">
        <label className="block text-[0.7rem] tracking-[0.15em] uppercase text-surface-gray mb-1.5">{UI_CONTENT.signature.name}</label>
        <input 
          type="text" 
          placeholder={UI_CONTENT.signature.namePlaceholder} 
          value={name}
          onChange={handleNameChange}
          className="w-full bg-transparent border-b border-border text-surface-white font-display italic text-base py-1.5 outline-none transition-colors duration-200 focus:border-brand"
        />
      </div>
      <div className="flex flex-col">
        <label className="block text-[0.7rem] tracking-[0.15em] uppercase text-surface-gray mb-1.5">{UI_CONTENT.signature.date}</label>
        <input 
          type="text" 
          placeholder={new Date().toLocaleDateString('es-CR')} 
          value={date}
          onChange={handleDateChange}
          className="w-full bg-transparent border-b border-border text-surface-white font-display italic text-base py-1.5 outline-none transition-colors duration-200 focus:border-brand"
        />
      </div>
      <div className="flex flex-col">
        <label className="block text-[0.7rem] tracking-[0.15em] uppercase text-surface-gray mb-1.5">{UI_CONTENT.signature.time}</label>
        <input 
          type="text" 
          placeholder={new Date().toLocaleTimeString('es-CR', {hour:'2-digit',minute:'2-digit'})} 
          value={time}
          onChange={handleTimeChange}
          className="w-full bg-transparent border-b border-border text-surface-white font-display italic text-base py-1.5 outline-none transition-colors duration-200 focus:border-brand"
        />
      </div>
    </div>
  );
}
