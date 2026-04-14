import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@/app/styles/main.css'
import { ThemeProvider } from 'next-themes'
import AppRouter from './router'
import { Toaster } from '@/shared/components/ui/sonner'
import { TooltipProvider } from '@/shared/components/ui/tooltip'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

const root = document.getElementById('root')!



// 👇 欢迎弹窗（已按你的逻辑修改）
function WelcomeTip() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const copied = localStorage.getItem('copied_subscription')
    if (!copied) {
      setTimeout(() => setShow(true), 800)
    }
  }, [])

  const close = () => {
    setShow(false)
  }

  const copyMain = () => {
    const url = "https://raw.githubusercontent.com/magic-fss/TV/refs/heads/main/sources.json"
    navigator.clipboard.writeText(url)
    alert("✅ 主订阅地址已复制！")
    setShow(false)
    localStorage.setItem('copied_subscription', 'true')
  }

  const copy4K = () => {
    const url = "https://raw.githubusercontent.com/magic-fss/TV/refs/heads/main/source_4K.json"
    navigator.clipboard.writeText(url)
    alert("✅ 4K 高清订阅地址已复制！")
    setShow(false)
    localStorage.setItem('copied_subscription', 'true')
  }

  if (!show) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999999
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '14px',
        width: '90%',
        maxWidth: '480px',
        padding: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{ margin: '0 0 12px 0', fontSize: '18px' }}>📺 欢迎使用 FSS 视频库</h2>
        <p style={{ margin: '0 0 16px 0', color: '#555' }}>
          一键订阅，同步所有视频源：
        </p>

        {/* 主订阅源 */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '14px', fontWeight: 500, marginBottom: '6px', display: 'block' }}>
            📡 主订阅地址
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              readOnly
              value="https://raw.githubusercontent.com/magic-fss/TV/refs/heads/main/sources.json"
              style={{
                flex: 1,
                padding: '10px 12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                background: '#f9f9f9',
                fontSize: '13px'
              }}
            />
            <button
              onClick={copyMain}
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                border: 'none',
                background: '#0071e3',
                color: '#fff',
                fontWeight: 500,
                whiteSpace: 'nowrap'
              }}
            >
              复制
            </button>
          </div>
        </div>

        {/* 4K 高清专用源 */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '14px', fontWeight: 500, marginBottom: '6px', display: 'block' }}>
            🎬 4K 高清专用订阅
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              readOnly
              value="https://raw.githubusercontent.com/magic-fss/TV/refs/heads/main/source_4K.json"
              style={{
                flex: 1,
                padding: '10px 12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                background: '#f9f9f9',
                fontSize: '13px'
              }}
            />
            <button
              onClick={copy4K}
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                border: 'none',
                background: '#e37400',
                color: '#fff',
                fontWeight: 500,
                whiteSpace: 'nowrap'
              }}
            >
              复制
            </button>
          </div>
        </div>

        <p style={{ fontSize: '12px', color: '#888', marginBottom: '20px' }}>
          使用方法：菜单 → 设置 → 视频源管理 → 添加订阅
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            onClick={close}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              background: '#fff'
            }}
          >
            知道了
          </button>
        </div>
      </div>
    </div>
  )
}


const app = (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
    <TooltipProvider>
      <AppRouter />
      <Toaster richColors position="top-center" />
      
      <WelcomeTip />

      {import.meta.env.OKI_DISABLE_ANALYTICS !== 'true' && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}
    </TooltipProvider>
  </ThemeProvider>
)

createRoot(root).render(import.meta.env.DEVELOPMENT ? <StrictMode>{app}</StrictMode> : app)
