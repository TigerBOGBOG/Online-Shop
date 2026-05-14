"use client"
import { useState } from "react";

type PasswordStrength = 0 | 1 | 2 | 3 | 4;

interface FormData {
  name: string;
  username: string;
  email: string;
  password: string;
  agree: boolean;
}

function getPasswordStrength(password: string): PasswordStrength {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score as PasswordStrength;
}

const strengthColors: Record<PasswordStrength, string> = {
  0: "transparent",
  1: "#ef4444",
  2: "#f97316",
  3: "#eab308",
  4: "#22c55e",
};

const strengthLabels: Record<PasswordStrength, string> = {
  0: "",
  1: "อ่อนมาก",
  2: "พอใช้",
  3: "ดี",
  4: "แข็งแกร่ง",
};

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    username: "",
    email: "",
    password: "",
    agree: false,
  });
  const [showPass, setShowPass] = useState(false);

  const strength = getPasswordStrength(form.password);
  const strengthColor = strengthColors[strength];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
  e.preventDefault();
  setError("");

  if (!form.agree) {
    setError("กรุณายอมรับข้อกำหนดการใช้งานก่อน");
    return;
  }

  if (form.username.length < 6) {
    setError("Username ต้องมีอย่างน้อย 6 ตัวอักษร");
    return;
  }

  setLoading(true);
  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        username: form.username,
        email: form.email,
        password: form.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "เกิดข้อผิดพลาด กรุณาลองใหม่");
      return;
    }

      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/signin";
      }, 2000);
    } catch (err) {
      setError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    } finally {
      setLoading(false);
    }
};

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

        {/* Header */}
        <div className="mb-7">
          <h1 className="text-xl font-semibold text-gray-900 mb-1">สร้างบัญชีใหม่</h1>
          <p className="text-sm text-gray-400">
            มีบัญชีอยู่แล้ว?{" "}
            <a href="/signin" className="text-gray-900 font-medium hover:underline underline-offset-2">
              เข้าสู่ระบบ
            </a>
          </p>
        </div>

        <form className="flex flex-col gap-4">

          {/* Name + Username */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-medium text-gray-500">
                ชื่อ
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="สมชาย ใจดี"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="username" className="text-xs font-medium text-gray-500">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="somchai99"
                value={form.username}
                onChange={handleChange}
                autoComplete="username"
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-medium text-gray-500">
              อีเมล
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="somchai@email.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-xs font-medium text-gray-500">
              รหัสผ่าน
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="อย่างน้อย 8 ตัวอักษร"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 pr-10 text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                aria-label={showPass ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors text-sm"
              >
                {showPass ? "○" : "●"}
              </button>
            </div>

            {/* Strength bar */}
            {form.password.length > 0 && (
              <div className="flex items-center gap-2 mt-1">
                <div className="flex gap-1 flex-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex-1 h-1 rounded-full bg-gray-100 transition-all duration-300"
                      style={{ background: i <= strength ? strengthColor : undefined }}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-gray-400 min-w-[48px] text-right" style={{ color: strength > 0 ? strengthColor : undefined }}>
                  {strengthLabels[strength]}
                </span>
              </div>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2.5 text-xs text-gray-400">
            <input
              id="agree"
              name="agree"
              type="checkbox"
              checked={form.agree}
              onChange={handleChange}
              className="mt-0.5 flex-shrink-0 accent-gray-900 cursor-pointer"
            />
            <label htmlFor="agree" className="leading-relaxed cursor-pointer">
              ฉันยอมรับ{" "}
              <a href="/terms" className="text-gray-900 font-medium hover:underline underline-offset-2">ข้อกำหนดการใช้งาน</a>
              {" "}และ{" "}
              <a href="/privacy" className="text-gray-900 font-medium hover:underline underline-offset-2">นโยบายความเป็นส่วนตัว</a>
            </label>
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-2.5 bg-gray-900 hover:bg-gray-700 disabled:bg-gray-400 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {loading ? "กำลังสร้างบัญชี..." : "สร้างบัญชี →"}
        </button>
            {error && (
            <div className="flex items-center gap-2 px-3.5 py-2.5 bg-red-50 border border-red-100 rounded-lg text-xs text-red-500">
              <span>⚠</span>
              <span>{error}</span>
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="flex items-center gap-2 px-3.5 py-2.5 bg-green-50 border border-green-100 rounded-lg text-xs text-green-600">
              <span>✓</span>
              <span>สร้างบัญชีสำเร็จ! กำลังพาไปหน้าเข้าสู่ระบบ...</span>
            </div>
          )}
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-300">หรือ</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Google */}
        {/* <button
          type="button"
          className="w-full flex items-center justify-center gap-2.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z"/>
            <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987z"/>
            <path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21z"/>
            <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067z"/>
          </svg>
          สมัครด้วย Google
        </button> */}
        {/* Error */}
          


          
      </div>
    </div>
  );
}
