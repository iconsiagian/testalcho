import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Auth callback error:', error);
        navigate('/auth/login?error=verification_failed');
        return;
      }

      if (data.session) {
        navigate('/auth/login?verified=true');
      } else {
        navigate('/auth/login');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Memverifikasi akun...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
