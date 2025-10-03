import Header from "./Header";
import Footer from "./Footer";
import { AdSlot } from "@/components/AdSlot";
import { useState, useEffect } from "react";

export default function Layout({ children, showAds = true }: { children: React.ReactNode; showAds?: boolean }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background">
      <Header />
      <main className="mx-auto max-w-[1400px] px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(640px,760px)_1fr] gap-4">
          {showAds ? (
            <aside className="hidden lg:flex flex-col items-center gap-4 py-6">
          {/* <AdSlot id="ad-top-banner" size="728x90" adKey="3c58265904ccbe16932fa2180466ce4e" /> */}
          {/* <AdSlot id="ad-left-1" size="160x600" adKey="3c58265904ccbe16932fa2180466ce4e" />
          <AdSlot id="ad-right-1" size="160x600" adKey="3c58265904ccbe16932fa2180466ce4e" /> */}

              <AdSlot id="ad-left-4" />
              <AdSlot id="ad-left-5" size="160x600" />
            </aside>
          ) : (
            <div className="hidden lg:block" />
          )}
          <section className="py-6 px-2 md:px-0">{children}</section>
          {showAds ? (
            <aside className="hidden lg:flex flex-col items-center gap-4 py-6">
              <AdSlot id="ad-right-1" />
              <AdSlot id="ad-right-2" size="160x600" />
              <AdSlot id="ad-right-3" />
              <AdSlot id="ad-right-4" />
              <AdSlot id="ad-right-5" size="160x600" />
            </aside>
          ) : (
            <div className="hidden lg:block" />
          )}
        </div>
      </main>
      <Footer />
      
      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </div>
  );
}

function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = "+250 791 762 918";
  const message = "Hello! I'm interested in PulseSurvey. Can you help me?";

  useEffect(() => {
    // Show button after a short delay for better UX
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = async () => {
    const encodedMessage = encodeURIComponent(message);
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
    
    // Try native app URLs first
    const nativeUrls = [
      `whatsapp://send?phone=${cleanPhoneNumber}&text=${encodedMessage}`, // Mobile app
      `whatsapp://send/?phone=${cleanPhoneNumber}&text=${encodedMessage}`, // Alternative mobile format
      `whatsapp-desktop://send?phone=${cleanPhoneNumber}&text=${encodedMessage}`, // Desktop app (Windows/Mac)
    ];
    
    // Web fallback URL
    const webUrl = `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`;
    
    // Function to attempt opening a URL
    const tryOpenUrl = (url: string): Promise<boolean> => {
      return new Promise((resolve) => {
        // Create a hidden iframe to test if the protocol is supported
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = url;
        document.body.appendChild(iframe);
        
        // Set a timeout to check if the app opened
        const timeout = setTimeout(() => {
          document.body.removeChild(iframe);
          resolve(false);
        }, 2000);
        
        // If we're still here after a short time, the app likely didn't open
        setTimeout(() => {
          clearTimeout(timeout);
          document.body.removeChild(iframe);
          resolve(false);
        }, 500);
        
        // For better browser support, also try window.location
        try {
          const newWindow = window.open(url, '_blank');
          if (!newWindow) {
            resolve(false);
            return;
          }
          
          // Check if the window was closed (indicating app opened)
          setTimeout(() => {
            try {
              if (newWindow.closed) {
                clearTimeout(timeout);
                resolve(true);
              } else {
                newWindow.close();
                resolve(false);
              }
            } catch (e) {
              // Cross-origin error means app likely opened
              clearTimeout(timeout);
              resolve(true);
            }
          }, 100);
        } catch (e) {
          resolve(false);
        }
      });
    };
    
    // Enhanced method for mobile devices
    const tryNativeApp = async (): Promise<boolean> => {
      // Detect if it's a mobile device
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        // For mobile, try the primary WhatsApp URL
        try {
          const startTime = Date.now();
          window.location.href = nativeUrls[0];
          
          // If we're still here after 2 seconds, app probably didn't open
          return new Promise((resolve) => {
            const checkTime = setTimeout(() => {
              const timeElapsed = Date.now() - startTime;
              resolve(timeElapsed > 2000);
            }, 2500);
            
            // Listen for page visibility change (app opening changes visibility)
            const handleVisibilityChange = () => {
              if (document.hidden) {
                clearTimeout(checkTime);
                document.removeEventListener('visibilitychange', handleVisibilityChange);
                resolve(true);
              }
            };
            
            document.addEventListener('visibilitychange', handleVisibilityChange);
            
            // Also listen for blur event (when user switches to app)
            const handleBlur = () => {
              clearTimeout(checkTime);
              window.removeEventListener('blur', handleBlur);
              document.removeEventListener('visibilitychange', handleVisibilityChange);
              resolve(true);
            };
            
            window.addEventListener('blur', handleBlur);
          });
        } catch (e) {
          return false;
        }
      } else {
        // For desktop, try desktop app URLs
        for (const url of nativeUrls.slice(2)) {
          const success = await tryOpenUrl(url);
          if (success) return true;
        }
        return false;
      }
    };
    
    // Try to open native app first
    const nativeSuccess = await tryNativeApp();
    
    // If native app didn't open, fall back to web URL
    if (!nativeSuccess) {
      setTimeout(() => {
        window.open(webUrl, '_blank', 'noopener,noreferrer');
      }, 100);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          fixed bottom-6 right-6 z-50
          w-14 h-14 md:w-16 md:h-16
          bg-green-500 hover:bg-green-600
          rounded-full shadow-lg hover:shadow-xl
          flex items-center justify-center
          transition-all duration-800 ease-out
          transform hover:scale-100
          ${isHovered ? 'animate-none' : ''}
        `}
        aria-label="Contact us on WhatsApp"
      >
        {/* WhatsApp Icon */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="white"
          className="md:w-7 md:h-7"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
        </svg>
      </button>

      {/* Tooltip */}
      {isHovered && (
        <div className="fixed bottom-20 right-6 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
            Chat with us on WhatsApp
            <div className="absolute -bottom-1 right-6 w-2 h-2 bg-gray-900 transform rotate-45"></div>
          </div>
        </div>
      )}

      {/* Ripple Effect */}
      <div className="fixed bottom-6 right-6 z-40 w-14 h-14 md:w-16 md:h-16 rounded-full bg-green-400 opacity-30 animate-ping pointer-events-none"></div>
    </>
  );
}