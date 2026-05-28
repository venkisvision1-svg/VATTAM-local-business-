'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Smartphone, Copy, CheckCircle, ArrowRight, Shield, Clock } from 'lucide-react';

type PayStep = 'select' | 'upi' | 'qr' | 'processing' | 'success';

interface UPIPayProps {
  amount: number;
  bookingId: string;
  onComplete: () => void;
  onBack: () => void;
}

export default function UPIPaymentFlow({ amount, bookingId, onComplete, onBack }: UPIPayProps) {
  const [step, setStep] = useState<PayStep>('select');
  const [upiId, setUpiId] = useState('');
  const [copied, setCopied] = useState(false);

  const handleUpiPay = async () => {
    if (!upiId.includes('@')) return;
    setStep('processing');
    await new Promise(r => setTimeout(r, 2000));
    setStep('success');
  };

  const handleQrPay = async () => {
    setStep('processing');
    await new Promise(r => setTimeout(r, 2500));
    setStep('success');
  };

  const copyUpiId = () => {
    navigator.clipboard?.writeText('vattam@razorpay');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (step === 'success') {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="text-center py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 rounded-3xl bg-green-500/15 border border-green-500/25 flex items-center justify-center mx-auto mb-5 glow-green"
        >
          <CheckCircle size={36} className="text-green-500" />
        </motion.div>
        <motion.h2
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl font-black text-white mb-1"
        >
          Payment Successful!
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-white/35 text-sm mb-1">
          ₹{amount} paid for booking #{bookingId}
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-white/20 text-xs mb-6">
          Transaction ID: TXN{Date.now().toString().slice(-7)}
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onComplete}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold px-6 py-3 rounded-2xl text-sm glow-orange-sm"
        >
          Done <ArrowRight size={16} />
        </motion.button>
      </motion.div>
    );
  }

  if (step === 'processing') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center mx-auto mb-4 glow-orange"
        >
          <div className="w-8 h-8 border-[3px] border-orange-500/30 border-t-orange-500 rounded-full" />
        </motion.div>
        <h2 className="text-lg font-bold text-white mb-1">Processing Payment</h2>
        <p className="text-white/35 text-sm">Please wait while we confirm your payment...</p>
        <p className="text-white/15 text-xs mt-2">Do not close this page</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {step === 'select' && (
          <motion.div key="select" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="space-y-4">
            <div className="glass rounded-2xl p-4 text-center glass-card">
              <p className="text-[10px] text-white/25 uppercase tracking-wider font-semibold mb-1">Amount to Pay</p>
              <p className="text-3xl font-black text-gradient">₹{amount}</p>
              <p className="text-[10px] text-white/20 mt-1">Booking #{bookingId}</p>
            </div>

            <h3 className="text-sm font-bold text-white/70 relative">
              Choose Payment Method
              <div className="absolute -bottom-1 left-0 w-6 h-0.5 bg-orange-500/50 rounded-full" />
            </h3>

            <motion.button whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }} onClick={() => setStep('upi')}
              className="w-full flex items-center gap-4 glass rounded-2xl p-4 glass-card text-left hover:border-orange-500/20 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/15 flex items-center justify-center shrink-0">
                <Smartphone size={22} className="text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">Pay via UPI</p>
                <p className="text-[11px] text-white/30">GPay, PhonePe, Paytm, BHIM</p>
              </div>
              <ArrowRight size={16} className="text-white/15 group-hover:text-orange-500/50 transition-colors" />
            </motion.button>

            <motion.button whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }} onClick={() => setStep('qr')}
              className="w-full flex items-center gap-4 glass rounded-2xl p-4 glass-card text-left hover:border-orange-500/20 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/15 flex items-center justify-center shrink-0">
                <QrCode size={22} className="text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">Scan QR Code</p>
                <p className="text-[11px] text-white/30">Use any UPI app to scan</p>
              </div>
              <ArrowRight size={16} className="text-white/15 group-hover:text-orange-500/50 transition-colors" />
            </motion.button>

            <div className="flex items-center gap-2 glass rounded-xl p-3">
              <Shield size={12} className="text-green-400 shrink-0" />
              <p className="text-[10px] text-white/30">Secured by <span className="text-blue-400 font-bold">Razorpay</span> • 256-bit SSL</p>
            </div>

            <button onClick={onBack} className="w-full py-3 rounded-2xl glass text-white/30 text-sm font-medium">Back</button>
          </motion.div>
        )}

        {step === 'upi' && (
          <motion.div key="upi" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="space-y-4">
            <div className="glass rounded-2xl p-4 text-center glass-card">
              <p className="text-[10px] text-white/25 uppercase tracking-wider font-semibold">Pay</p>
              <p className="text-2xl font-black text-gradient">₹{amount}</p>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-white/40 mb-2 block uppercase tracking-wider">Enter UPI ID</label>
              <input type="text" placeholder="yourname@upi" value={upiId} onChange={e => setUpiId(e.target.value)}
                className="w-full glass rounded-2xl px-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-orange-500/40 transition-all font-mono" />
            </div>

            <div className="glass rounded-xl p-3.5">
              <p className="text-[10px] text-white/25 mb-1.5">Or pay directly to VATTAM UPI:</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white font-mono">vattam@razorpay</span>
                <motion.button whileTap={{ scale: 0.9 }} onClick={copyUpiId} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  {copied ? <CheckCircle size={12} className="text-green-400" /> : <Copy size={12} className="text-white/30" />}
                </motion.button>
              </div>
            </div>

            <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={handleUpiPay} disabled={!upiId.includes('@')}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 disabled:opacity-40 text-black font-bold py-3.5 rounded-2xl transition-all glow-orange-sm">
              Pay ₹{amount}
            </motion.button>

            <button onClick={() => setStep('select')} className="w-full py-2 rounded-xl text-white/25 text-sm">Change method</button>
          </motion.div>
        )}

        {step === 'qr' && (
          <motion.div key="qr" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="space-y-4">
            <div className="glass rounded-2xl p-4 text-center glass-card">
              <p className="text-[10px] text-white/25 uppercase tracking-wider font-semibold">Pay</p>
              <p className="text-2xl font-black text-gradient">₹{amount}</p>
            </div>

            <div className="glass rounded-2xl p-6 text-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: 'spring' }}
                className="w-48 h-48 mx-auto bg-white rounded-2xl p-4 mb-4 flex items-center justify-center"
              >
                <div className="grid grid-cols-8 gap-0.5 w-full h-full">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className={`rounded-sm ${(i + Math.floor(i / 8)) % 2 === 0 ? 'bg-black' : 'bg-white'}`} />
                  ))}
                </div>
              </motion.div>
              <p className="text-sm font-bold text-white mb-1">Scan with any UPI app</p>
              <p className="text-[11px] text-white/30">GPay, PhonePe, Paytm, BHIM UPI</p>
            </div>

            <div className="flex items-center gap-2 glass rounded-xl p-3">
              <Clock size={12} className="text-yellow-400 shrink-0" />
              <p className="text-[10px] text-white/30">Waiting for payment confirmation...</p>
            </div>

            <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={handleQrPay}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold py-3.5 rounded-2xl transition-all glow-orange-sm">
              I&apos;ve Completed Payment
            </motion.button>

            <button onClick={() => setStep('select')} className="w-full py-2 rounded-xl text-white/25 text-sm">Change method</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
