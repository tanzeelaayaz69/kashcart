import { useState } from 'react';
import { User as UserIcon, CreditCard, Settings, LogOut, ChevronRight, X, Camera, Save, Phone, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [editForm, setEditForm] = useState({ name: user?.name || '', phone: user?.phone || '', email: 'tanzeela@example.com' });



  const menuItems = [
    { icon: CreditCard, label: 'Payment Methods', sub: 'UPI, Cards, Wallet', path: '/payment-methods', color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400' },
    { icon: Mail, label: 'Support & Help', sub: 'Contact our team', path: '/support', color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' },
    { icon: UserIcon, label: 'Live Chat', sub: 'Chat with Mir', path: '/chat', color: 'bg-kash-green-50 text-kash-green-600 dark:bg-kash-green-900/20 dark:text-kash-green-400' },
    { icon: Settings, label: 'Settings', sub: 'Theme, Notifications, Privacy', path: '/settings', color: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' },
  ];

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  const handleSaveProfile = () => {
    // Simulate save
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-kash-dark-bg pb-24 transition-colors duration-300">
      {/* Premium Header */}
      <div className="bg-white dark:bg-kash-dark-card p-6 pt-10 pb-16 transition-colors duration-300 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-kash-green-500/10 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-kash-walnut-DEFAULT/10 rounded-full -ml-20 -mb-20 blur-3xl" />

        <h1 className="text-2xl font-black mb-8 text-gray-900 dark:text-white tracking-tight">My Profile</h1>

        <div className="relative flex items-center gap-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-gradient-to-tr from-kash-green-100 to-kash-green-50 dark:from-kash-green-900/40 dark:to-kash-green-800/20 rounded-[2rem] flex items-center justify-center text-kash-green-700 dark:text-kash-green-400 shadow-inner border border-kash-green-200/50 dark:border-kash-green-700/30"
          >
            <UserIcon size={40} strokeWidth={1.5} />
          </motion.div>
          <div>
            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-1 uppercase tracking-tight">{user?.name}</h2>
            <p className="text-sm font-bold text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-kash-green-500 rounded-full animate-pulse" />
              +91 {user?.phone}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-full font-bold mt-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
            >
              Edit Account
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-8 -mt-6 relative z-10">
        {/* Menu Section */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-2">Preferences</h3>
          <div className="bg-white dark:bg-kash-dark-card rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-kash-dark-border overflow-hidden p-2">
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleMenuClick(item.path)}
                className="w-full flex items-center justify-between p-4 rounded-[1.5rem] hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", item.color)}>
                    <item.icon size={22} strokeWidth={1.5} />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">{item.label}</h4>
                    <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-1">{item.sub}</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-gray-300 group-hover:text-kash-green-600 transition-colors">
                  <ChevronRight size={18} />
                </div>
              </button>
            ))}
          </div>
        </div>



        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full bg-red-50/50 dark:bg-red-900/5 hover:bg-red-50 dark:hover:bg-red-900/10 text-red-600 dark:text-red-400 py-6 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 mt-4 transition-all active:scale-95 border border-red-100 dark:border-red-900/20 shadow-sm"
        >
          <LogOut size={16} />
          Sign Out Securely
        </button>
      </div>

      {/* Edit Profile Bottom Sheet */}
      <AnimatePresence>
        {isEditing && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditing(false)}
              className="fixed inset-0 bg-black/60 z-[70] backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[80] bg-white dark:bg-kash-dark-card rounded-t-[3rem] max-w-[430px] mx-auto shadow-2xl max-h-[90vh] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-8 pb-4">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Edit Profile</h3>
                <button onClick={() => setIsEditing(false)} className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-2xl">
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-8">
                {/* Profile Pic Placeholder */}
                <div className="flex flex-col items-center pt-2">
                  <div className="relative group">
                    <div className="w-24 h-24 bg-kash-green-50 dark:bg-gray-800 rounded-[2rem] flex items-center justify-center text-kash-green-600 border-2 border-dashed border-kash-green-200 dark:border-gray-700 overflow-hidden">
                      <UserIcon size={40} className="opacity-50" />
                    </div>
                    <button className="absolute -bottom-2 -right-2 bg-kash-green-600 text-white p-2.5 rounded-2xl shadow-lg border-2 border-white dark:border-kash-dark-card">
                      <Camera size={16} />
                    </button>
                  </div>
                  <p className="text-[10px] font-black text-gray-400 uppercase mt-4 tracking-widest">Change Photo</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-4 tracking-widest">Full Name</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <UserIcon size={18} />
                      </div>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full bg-gray-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-kash-green-600 rounded-[1.5rem] py-4 pl-12 pr-4 text-sm font-bold text-gray-900 dark:text-white outline-none transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-4 tracking-widest">Phone Number</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <Phone size={18} />
                      </div>
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="w-full bg-gray-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-kash-green-600 rounded-[1.5rem] py-4 pl-12 pr-4 text-sm font-bold text-gray-900 dark:text-white outline-none transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-4 tracking-widest">Email Address</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <Mail size={18} />
                      </div>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full bg-gray-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-kash-green-600 rounded-[1.5rem] py-4 pl-12 pr-4 text-sm font-bold text-gray-900 dark:text-white outline-none transition-all shadow-inner"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Fixed Footer */}
              <div className="p-8 pt-4 bg-white dark:bg-kash-dark-card border-t border-gray-50 dark:border-gray-800">
                <button
                  onClick={handleSaveProfile}
                  className="w-full bg-gradient-to-r from-kash-green-600 to-kash-green-700 text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-kash-green-900/20 dark:shadow-none hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  Save Changes
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Bottom Sheet */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutConfirm(false)}
              className="fixed inset-0 bg-black/60 z-[90] backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[100] bg-white dark:bg-kash-dark-card rounded-t-[3rem] max-w-[430px] mx-auto shadow-2xl overflow-hidden p-8 pb-12"
            >
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-500 mb-2">
                  <LogOut size={32} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Logging Out?</h3>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">
                    Are you sure you want to sign out of your account?
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full pt-4">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white py-4 rounded-[1.5rem] font-bold text-sm tracking-wide hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      await logout();
                      setShowLogoutConfirm(false);
                    }}
                    className="w-full bg-red-500 text-white py-4 rounded-[1.5rem] font-bold text-sm tracking-wide shadow-lg shadow-red-500/30 hover:bg-red-600 transition-colors"
                  >
                    Yes, Logout
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
