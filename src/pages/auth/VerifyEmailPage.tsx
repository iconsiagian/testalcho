import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail, Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const VerifyEmailPage: React.FC = () => {
  const { user, resendVerificationEmail } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleResend = async () => {
    setIsLoading(true);
    try {
      const { error } = await resendVerificationEmail();

      if (error) {
        toast({
          title: 'Gagal Mengirim Email',
          description: error.message,
          variant: 'destructive'
        });
        return;
      }

      setEmailSent(true);
      toast({
        title: 'Email Terkirim',
        description: 'Link verifikasi telah dikirim ke email Anda.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Terjadi kesalahan. Silakan coba lagi.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Verifikasi Email - ALCHO Admin</title>
        <meta name="description" content="Verifikasi email untuk aktivasi akun ALCHO" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Link 
            to="/auth/login" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Login
          </Link>

          <Card className="border-border/50 shadow-elevated">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-display">Verifikasi Email</CardTitle>
              <CardDescription>
                Kami telah mengirimkan link verifikasi ke email Anda
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {user?.email && (
                <div className="bg-muted/50 rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground">Email dikirim ke:</p>
                  <p className="font-medium text-foreground">{user.email}</p>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p>Buka email Anda dan klik link verifikasi</p>
                </div>
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p>Setelah verifikasi, Anda dapat login ke akun Anda</p>
                </div>
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p>Cek folder spam jika tidak menemukan email</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Tidak menerima email?
                </p>
                <Button 
                  onClick={handleResend} 
                  variant="outline" 
                  className="w-full"
                  disabled={isLoading || emailSent}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Mengirim...
                    </>
                  ) : emailSent ? (
                    'Email Terkirim'
                  ) : (
                    'Kirim Ulang Email Verifikasi'
                  )}
                </Button>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                Sudah verifikasi?{' '}
                <Link to="/auth/login" className="text-primary hover:underline font-medium">
                  Login sekarang
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default VerifyEmailPage;
