import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDeviceVerification } from '@/hooks/useDeviceVerification';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import { Shield, Loader2, Monitor, RefreshCw } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const DeviceVerifyPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, userRole, loading: authLoading } = useAuth();
  const { deviceInfo, isVerified, loading: deviceLoading, requestOTP, verifyOTP } = useDeviceVerification();
  const { toast } = useToast();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [demoOtp, setDemoOtp] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!deviceLoading && isVerified && userRole) {
      navigate('/admin');
    }
  }, [isVerified, deviceLoading, userRole, navigate]);

  const handleRequestOTP = async () => {
    setIsLoading(true);
    try {
      const result = await requestOTP();
      
      if (result.error) {
        toast({
          title: 'Gagal Mengirim OTP',
          description: result.error.message,
          variant: 'destructive'
        });
        return;
      }

      setOtpSent(true);
      // For demo, show the OTP (remove in production)
      if (result.data?.demo_otp) {
        setDemoOtp(result.data.demo_otp);
      }
      
      toast({
        title: 'OTP Terkirim',
        description: 'Kode verifikasi telah dikirim ke email Anda.',
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

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: 'Kode Tidak Lengkap',
        description: 'Masukkan 6 digit kode verifikasi.',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await verifyOTP(otp);
      
      if (result.error) {
        toast({
          title: 'Verifikasi Gagal',
          description: result.error.message,
          variant: 'destructive'
        });
        return;
      }

      toast({
        title: 'Perangkat Terverifikasi',
        description: 'Perangkat ini telah ditambahkan sebagai perangkat terpercaya.',
      });

      navigate('/admin');
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

  if (authLoading || deviceLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Check if user has admin role
  if (!userRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-destructive/50">
          <CardHeader className="text-center">
            <CardTitle className="text-destructive">Akses Ditolak</CardTitle>
            <CardDescription>
              Akun Anda belum memiliki akses ke panel admin. Hubungi administrator untuk mendapatkan akses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate('/')} 
              variant="outline" 
              className="w-full"
            >
              Kembali ke Beranda
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Verifikasi Perangkat - ALCHO Admin</title>
        <meta name="description" content="Verifikasi perangkat untuk keamanan akun" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="border-border/50 shadow-elevated">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-display">Perangkat Baru Terdeteksi</CardTitle>
              <CardDescription>
                Untuk keamanan, verifikasi perangkat ini sebelum melanjutkan
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {deviceInfo && (
                <div className="bg-muted/50 rounded-lg p-4 flex items-center gap-4">
                  <Monitor className="w-10 h-10 text-muted-foreground shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">{deviceInfo.deviceName}</p>
                    <p className="text-sm text-muted-foreground">
                      {deviceInfo.browser} • {deviceInfo.os}
                    </p>
                  </div>
                </div>
              )}

              {!otpSent ? (
                <Button 
                  onClick={handleRequestOTP} 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    'Kirim Kode Verifikasi'
                  )}
                </Button>
              ) : (
                <>
                  {demoOtp && (
                    <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Demo OTP (akan dikirim via email di production):</p>
                      <p className="font-mono text-2xl font-bold text-accent">{demoOtp}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground text-center">
                      Masukkan 6 digit kode yang dikirim ke email Anda
                    </p>
                    
                    <div className="flex justify-center">
                      <InputOTP
                        value={otp}
                        onChange={setOtp}
                        maxLength={6}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    <Button 
                      onClick={handleVerifyOTP} 
                      className="w-full"
                      disabled={isLoading || otp.length !== 6}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Memverifikasi...
                        </>
                      ) : (
                        'Verifikasi Perangkat'
                      )}
                    </Button>

                    <Button 
                      onClick={handleRequestOTP} 
                      variant="ghost" 
                      className="w-full"
                      disabled={isLoading}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Kirim Ulang Kode
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default DeviceVerifyPage;
