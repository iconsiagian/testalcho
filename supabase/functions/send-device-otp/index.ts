import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OTPRequest {
  userId: string;
  email: string;
  deviceFingerprint: string;
  deviceName: string;
  browser: string;
  os: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { userId, email, deviceFingerprint, deviceName, browser, os }: OTPRequest = await req.json();

    console.log(`Generating OTP for user ${userId}, device: ${deviceName}`);

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set expiry to 10 minutes
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    // Delete any existing unused OTPs for this device
    await supabase
      .from("device_otp")
      .delete()
      .eq("user_id", userId)
      .eq("device_fingerprint", deviceFingerprint)
      .eq("used", false);

    // Insert new OTP
    const { error: insertError } = await supabase
      .from("device_otp")
      .insert({
        user_id: userId,
        device_fingerprint: deviceFingerprint,
        otp_code: otp,
        expires_at: expiresAt
      });

    if (insertError) {
      console.error("Error inserting OTP:", insertError);
      throw insertError;
    }

    // Create or update device record (unverified)
    await supabase
      .from("trusted_devices")
      .upsert({
        user_id: userId,
        device_fingerprint: deviceFingerprint,
        device_name: deviceName,
        browser: browser,
        os: os,
        is_verified: false
      }, {
        onConflict: "user_id,device_fingerprint"
      });

    // For now, we'll log the OTP (in production, integrate with email service)
    console.log(`OTP for ${email}: ${otp}`);

    // TODO: Integrate with email service like Resend
    // For demo purposes, we'll return success
    // In production, you would send an email here

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "OTP sent to email",
        // Remove this in production - only for demo
        demo_otp: otp 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-device-otp:", errorMessage);
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
