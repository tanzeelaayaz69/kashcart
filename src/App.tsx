import { ReactNode } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';

const basename = import.meta.env.BASE_URL === '/kashcart/' ? '/kashcart' : '';
import { Home } from './pages/Home';
import { MartDetails } from './pages/MartDetails';
import { Cart } from './pages/Cart';
import { TrackOrder } from './pages/TrackOrder';
import { Profile } from './pages/Profile';
import { Search } from './pages/Search';
import { Marts } from './pages/Marts';
import { Category } from './pages/Category';
import { Login } from './pages/Login';
import { Notifications } from './pages/Notifications';
import { PaymentSelection } from './pages/PaymentSelection';
import { Settings } from './pages/Settings';
import { Addresses } from './pages/Addresses';
import { PaymentMethods } from './pages/PaymentMethods';
import { BottomNav } from './components/BottomNav';
import { CartProvider } from './context/CartContext';
import { LocationProvider } from './context/LocationContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';



const Layout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const hideNav = ['/login', '/payment'].includes(location.pathname);

  return (
    <div className="w-full max-w-[430px] mx-auto bg-white dark:bg-kash-dark-bg min-h-[100dvh] shadow-2xl relative transition-colors duration-300 overflow-x-hidden">
      {children}
      {!hideNav && (
        <>
          <BottomNav />
        </>
      )}
    </div>
  );
};

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-white dark:bg-kash-dark-bg"><div className="w-8 h-8 border-4 border-kash-green-500 border-t-transparent rounded-full animate-spin"></div></div>;

  if (!isAuthenticated) return <Navigate to="/login" />;
  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <LocationProvider>
            <BrowserRouter basename={basename}>
              <Layout>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                  <Route path="/mart/:id" element={<ProtectedRoute><MartDetails /></ProtectedRoute>} />
                  <Route path="/category/:id" element={<ProtectedRoute><Category /></ProtectedRoute>} />
                  <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                  <Route path="/track" element={<ProtectedRoute><TrackOrder /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
                  <Route path="/marts" element={<ProtectedRoute><Marts /></ProtectedRoute>} />
                  <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
                  <Route path="/payment" element={<ProtectedRoute><PaymentSelection /></ProtectedRoute>} />
                  <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                  <Route path="/addresses" element={<ProtectedRoute><Addresses /></ProtectedRoute>} />
                  <Route path="/payment-methods" element={<ProtectedRoute><PaymentMethods /></ProtectedRoute>} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </LocationProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
