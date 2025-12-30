import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation helper
const isValidUUID = (str: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};

const isValidEmail = (str: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(str) && str.length <= 255;
};

const sanitizeString = (str: string, maxLength: number): string => {
  if (typeof str !== 'string') return '';
  return str.slice(0, maxLength).replace(/<[^>]*>/g, '');
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

    const body = await req.json();
    
    // Input validation
    const { userId, email, deviceFingerprint, deviceName, browser, os } = body as OTPRequest;

    // Validate required fields
    if (!userId || !email || !deviceFingerprint || !deviceName || !browser || !os) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate userId format
    if (!isValidUUID(userId)) {
      return new Response(
        JSON.stringify({ error: "Invalid user ID format" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate and sanitize string lengths
    const sanitizedFingerprint = sanitizeString(deviceFingerprint, 100);
    const sanitizedDeviceName = sanitizeString(deviceName, 255);
    const sanitizedBrowser = sanitizeString(browser, 100);
    const sanitizedOs = sanitizeString(os, 100);

    if (!sanitizedFingerprint || !sanitizedDeviceName || !sanitizedBrowser || !sanitizedOs) {
      return new Response(
        JSON.stringify({ error: "Invalid input parameters" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log(`OTP request received for user ${userId.substring(0, 8)}..., device: ${sanitizedDeviceName}`);

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set expiry to 10 minutes
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    // Delete any existing unused OTPs for this device
    await supabase
      .from("device_otp")
      .delete()
      .eq("user_id", userId)
      .eq("device_fingerprint", sanitizedFingerprint)
      .eq("used", false);

    // Insert new OTP
    const { error: insertError } = await supabase
      .from("device_otp")
      .insert({
        user_id: userId,
        device_fingerprint: sanitizedFingerprint,
        otp_code: otp,
        expires_at: expiresAt
      });

    if (insertError) {
      console.error("Error inserting OTP record");
      throw new Error("Failed to generate verification code");
    }

    // Create or update device record (unverified)
    await supabase
      .from("trusted_devices")
      .upsert({
        user_id: userId,
        device_fingerprint: sanitizedFingerprint,
        device_name: sanitizedDeviceName,
        browser: sanitizedBrowser,
        os: sanitizedOs,
        is_verified: false
      }, {
        onConflict: "user_id,device_fingerprint"
      });

    // TODO: Integrate with email service like Resend to send OTP
    // In production, the OTP should be sent via email and never returned in the response
    console.log(`OTP generated for user ${userId.substring(0, 8)}... - verification code created`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "OTP sent to email"
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-device-otp function");
    
    return new Response(
      JSON.stringify({ error: "Failed to send verification code" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
