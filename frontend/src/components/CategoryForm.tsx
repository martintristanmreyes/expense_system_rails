/**
 * Form component for adding a new category
 */

import React, { useState } from "react";
import { TextField, Button } from "../vibes";

interface CategoryFormProps {
  onSubmit: (name: string, emoji?: string) => Promise<void>;
  onCancel?: () => void;
}

const EMOJI_OPTIONS = [
  "🍔", "🍕", "🍜", "🍱", "☕", "🍺",
  "🚗", "🚌", "✈️", "🚢", "🚲", "🛵",
  "🎬", "🎮", "🎵", "🎨", "📚", "⚽",
  "🛍️", "👗", "👟", "💄", "🧴", "🛒",
  "📄", "💡", "💧", "🔌", "📱", "🏠",
  "🏥", "💊", "🩺", "🧘", "🏋️", "🚑",
  "📦", "🔧", "🖥️", "🖨️", "📎", "✏️",
  "💰", "💳", "🏦", "📈", "🎁", "🌟",
];

export function CategoryForm({ onSubmit, onCancel }: CategoryFormProps) {
  const [name, setName] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Category name is required");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(name.trim(), selectedEmoji);
      setName("");
      setSelectedEmoji(undefined);
      setError(undefined);
    } catch (err: any) {
      setError(err.message || "Failed to create category");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  const emojiRowStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  };

  const emojiLabelStyle: React.CSSProperties = {
    fontSize: "14px",
    fontWeight: 500,
    color: "#374151",
  };

  const emojiTriggerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 0.75rem",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    background: "white",
    cursor: "pointer",
    fontSize: "14px",
    color: "#374151",
    width: "fit-content",
  };

  const pickerStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(8, 1fr)",
    gap: "4px",
    padding: "0.75rem",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    background: "white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    marginTop: "4px",
  };

  const emojiButtonStyle = (emoji: string): React.CSSProperties => ({
    fontSize: "20px",
    padding: "4px",
    border: selectedEmoji === emoji ? "2px solid #6366f1" : "2px solid transparent",
    borderRadius: "6px",
    background: selectedEmoji === emoji ? "#eef2ff" : "transparent",
    cursor: "pointer",
    lineHeight: 1,
  });

  const clearButtonStyle: React.CSSProperties = {
    fontSize: "12px",
    color: "#6b7280",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0",
    textDecoration: "underline",
  };

  const buttonGroupStyle: React.CSSProperties = {
    display: "flex",
    gap: "0.5rem",
    marginTop: "0.5rem",
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <TextField
        label="Category Name"
        type="text"
        placeholder="Enter category name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (error) setError(undefined);
        }}
        error={error}
        fullWidth
        required
      />

      <div style={emojiRowStyle}>
        <span style={emojiLabelStyle}>Emoji (optional)</span>
        <button
          type="button"
          style={emojiTriggerStyle}
          onClick={() => setIsPickerOpen(!isPickerOpen)}
        >
          {selectedEmoji ? (
            <span style={{ fontSize: "20px" }}>{selectedEmoji}</span>
          ) : (
            <span style={{ color: "#9ca3af" }}>Choose an emoji</span>
          )}
          <span style={{ marginLeft: "auto", color: "#9ca3af" }}>▾</span>
        </button>

        {selectedEmoji && (
          <button
            type="button"
            style={clearButtonStyle}
            onClick={() => setSelectedEmoji(undefined)}
          >
            Clear emoji
          </button>
        )}

        {isPickerOpen && (
          <div style={pickerStyle}>
            {EMOJI_OPTIONS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                style={emojiButtonStyle(emoji)}
                onClick={() => {
                  setSelectedEmoji(emoji);
                  setIsPickerOpen(false);
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={buttonGroupStyle}>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          fullWidth
        >
          {isSubmitting ? "Saving..." : "Add Category"}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
