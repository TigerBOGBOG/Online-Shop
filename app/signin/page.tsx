'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (!result) return
      if (result.error) {
        setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
      } else {
        router.push('/profile')
      }
    } catch (err) {
      console.error('error', err)
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

        {/* Logo / Brand */}
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-gray-900 mb-1">
            ยินดีต้อนรับกลับ
          </h1>
          <p className="text-sm text-gray-400">
            ยังไม่มีบัญชี?{' '}
            <a href="/signup" className="text-gray-900 font-medium hover:underline underline-offset-2">
              สมัครสมาชิก
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-medium text-gray-500">
              อีเมล
            </label>
            <input
              id="email"
              type="email"
              value={email}
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-xs font-medium text-gray-500">
                รหัสผ่าน
              </label>
              <a href="/forgot-password" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                ลืมรหัสผ่าน?
              </a>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPass ? 'text' : 'password'}
                value={password}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 pr-10 text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                aria-label={showPass ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors text-sm"
              >
                {showPass ? '○' : '●'}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-gray-900 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors mt-1"
          >
            {loading ? 'กำลังเข้าสู่ระบบ…' : 'เข้าสู่ระบบ'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-300">หรือ</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={() => signIn('google')}
          className="w-full flex items-center justify-center gap-2.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z"/>
            <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987z"/>
            <path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21z"/>
            <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067z"/>
          </svg>
          เข้าสู่ระบบด้วย Google
        </button>

      </div>
    </div>
  )
}
