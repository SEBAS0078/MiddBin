import { useState } from "react";
import { updateProfile } from "@/lib/db_functions";

type Props = {
  userId: string;
  username: string;
  email: string;
  onSave: (updated: { username?: string; email?: string }) => void;
  onCancel: () => void;
};

export default function ProfileEditor({
  userId,
  username,
  email,
  onSave,
  onCancel,
}: Props) {
  const [name, setName] = useState(username);
  const [mail, setMail] = useState(email);

  const canSave = name.trim().length > 0 && mail.trim().length > 0;

  const save = async () => {
    if (!canSave) return;
    const updates = { username: name.trim(), email: mail.trim() };
    const updated = await updateProfile(userId, updates);
    onSave(updated);
  };
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <label>
        Username
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>

      <label>
        Email
        <input
          type="email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
      </label>

      <div style={{ display: "flex", gap: 8 }}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="button" disabled={!canSave} onClick={save}>
          Save
        </button>
      </div>
    </div>
  );
}
