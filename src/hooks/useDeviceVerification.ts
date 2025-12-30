import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface DeviceInfo {
  fingerprint: string;
  deviceName: string;
  browser: string;
  os: string;
}

export const useDeviceVerification = () => {
  const { user } = useAuth();
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const generateDeviceFingerprint = (): DeviceInfo => {
    const ua = navigator.userAgent;
    const screen = `${window.screen.width}x${window.screen.height}`;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const language = navigator.language;
    
    // Create a simple fingerprint
    const fingerprint = btoa(`${ua}-${screen}-${timezone}-${language}`).slice(0, 32);
    
    // Parse browser and OS
    let browser = 'Unknown';
    let os = 'Unknown';
    
    if (ua.includes('Chrome')) browser = 'Chrome';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari')) browser = 'Safari';
    else if (ua.includes('Edge')) browser = 'Edge';
    
    if (ua.includes('Windows')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'macOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iOS') || ua.includes('iPhone')) os = 'iOS';

    const deviceName = `${browser} on ${os}`;

    return { fingerprint, deviceName, browser, os };
  };

  const checkDeviceVerification = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const device = generateDeviceFingerprint();
    setDeviceInfo(device);

    try {
      const { data, error } = await supabase
        .from('trusted_devices')
        .select('*')
        .eq('user_id', user.id)
        .eq('device_fingerprint', device.fingerprint)
        .eq('is_verified', true)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking device:', error);
      }

      setIsVerified(!!data);

      // Update last active if verified
      if (data) {
        await supabase
          .from('trusted_devices')
          .update({ last_active: new Date().toISOString() })
          .eq('id', data.id);
      }
    } catch (error) {
      console.error('Error in checkDeviceVerification:', error);
      setIsVerified(false);
    } finally {
      setLoading(false);
    }
  };

  const requestOTP = async () => {
    if (!user || !deviceInfo) {
      return { error: new Error('User or device info not available') };
    }

    try {
      const { data, error } = await supabase.functions.invoke('send-device-otp', {
        body: {
          userId: user.id,
          email: user.email,
          deviceFingerprint: deviceInfo.fingerprint,
          deviceName: deviceInfo.deviceName,
          browser: deviceInfo.browser,
          os: deviceInfo.os
        }
      });

      if (error) throw error;
      return { error: null, data };
    } catch (error) {
      console.error('Error requesting OTP:', error);
      return { error: error as Error };
    }
  };

  const verifyOTP = async (otp: string) => {
    if (!user || !deviceInfo) {
      return { error: new Error('User or device info not available') };
    }

    try {
      // Check OTP
      const { data: otpData, error: otpError } = await supabase
        .from('device_otp')
        .select('*')
        .eq('user_id', user.id)
        .eq('device_fingerprint', deviceInfo.fingerprint)
        .eq('otp_code', otp)
        .eq('used', false)
        .gte('expires_at', new Date().toISOString())
        .single();

      if (otpError || !otpData) {
        return { error: new Error('Invalid or expired OTP code') };
      }

      // Mark OTP as used
      await supabase
        .from('device_otp')
        .update({ used: true })
        .eq('id', otpData.id);

      // Update or create trusted device
      const { error: deviceError } = await supabase
        .from('trusted_devices')
        .upsert({
          user_id: user.id,
          device_fingerprint: deviceInfo.fingerprint,
          device_name: deviceInfo.deviceName,
          browser: deviceInfo.browser,
          os: deviceInfo.os,
          is_verified: true,
          last_active: new Date().toISOString()
        }, {
          onConflict: 'user_id,device_fingerprint'
        });

      if (deviceError) {
        console.error('Error saving device:', deviceError);
        return { error: deviceError as Error };
      }

      setIsVerified(true);
      return { error: null };
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return { error: error as Error };
    }
  };

  useEffect(() => {
    checkDeviceVerification();
  }, [user]);

  return {
    deviceInfo,
    isVerified,
    loading,
    requestOTP,
    verifyOTP,
    checkDeviceVerification
  };
};
