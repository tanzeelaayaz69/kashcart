import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const Login = () => {
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otp, setOtp] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e: FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setStep('otp');
      setLoading(false);
    }, 1000);
  };

  const handleVerifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await login(phone);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-kash-dark-bg flex flex-col items-center justify-center p-6 transition-colors">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-kash-green-100 dark:bg-kash-green-900/30 text-kash-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            KC
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome to KashCart</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Groceries delivered in minutes</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-kash-dark-card p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-kash-dark-border"
        >
          {step === 'phone' ? (
            <form onSubmit={handleSendOtp}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
              <div className="relative mb-6">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">+91</div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-kash-green-500 dark:text-white transition-all"
                  placeholder="9906XXXXXX"
                  maxLength={10}
                  autoFocus
                />
              </div>
              <button
                disabled={phone.length < 10 || loading}
                className="w-full bg-kash-green-600 text-white py-3.5 rounded-xl font-bold hover:bg-kash-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
              >
                {loading ? 'Sending...' : <>Continue <ArrowRight size={18} /></>}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Enter OTP</label>
              <p className="text-xs text-gray-500 mb-4">Sent to +91 {phone}</p>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-3 px-4 text-center text-2xl tracking-widest font-bold focus:outline-none focus:ring-2 focus:ring-kash-green-500 dark:text-white mb-6 transition-all"
                placeholder="••••"
                maxLength={4}
                autoFocus
              />
              <button
                disabled={otp.length < 4 || loading}
                className="w-full bg-kash-green-600 text-white py-3.5 rounded-xl font-bold hover:bg-kash-green-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors"
              >
                {loading ? 'Verifying...' : 'Login'}
              </button>
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="w-full text-center text-sm text-gray-500 mt-4 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Change Number
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};
