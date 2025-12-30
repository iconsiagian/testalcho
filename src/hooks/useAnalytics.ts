import { useCallback, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

// Generate unique session ID
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem("analytics_session_id");
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem("analytics_session_id", sessionId);
  }
  return sessionId;
};

// Generate visitor ID (persisted across sessions)
const getVisitorId = (): string => {
  let visitorId = localStorage.getItem("analytics_visitor_id");
  if (!visitorId) {
    visitorId = `vis_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem("analytics_visitor_id", visitorId);
  }
  return visitorId;
};

// Check if new visitor
const isNewVisitor = (): boolean => {
  const hasVisited = localStorage.getItem("analytics_has_visited");
  if (!hasVisited) {
    localStorage.setItem("analytics_has_visited", "true");
    return true;
  }
  return false;
};

// Get device info
const getDeviceInfo = () => {
  const ua = navigator.userAgent;
  const isMobile = /Mobile|Android|iPhone|iPad/.test(ua);
  const isTablet = /Tablet|iPad/.test(ua);

  let browser = "unknown";
  if (ua.includes("Chrome")) browser = "Chrome";
  else if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Safari")) browser = "Safari";
  else if (ua.includes("Edge")) browser = "Edge";

  let os = "unknown";
  if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac")) os = "macOS";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";

  return {
    deviceType: isTablet ? "tablet" : isMobile ? "mobile" : "desktop",
    browser,
    os,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
  };
};

// Event categories
export type EventCategory =
  | "navigation"
  | "engagement"
  | "conversion"
  | "product"
  | "search"
  | "scroll";

// Event names for type safety
export type EventName =
  | "page_view"
  | "whatsapp_click"
  | "lihat_produk_click"
  | "download_pricelist"
  | "pricelist_accordion_expand"
  | "hero_slide_change"
  | "product_card_click"
  | "product_view"
  | "product_add_to_cart"
  | "search_query"
  | "scroll_depth"
  | "section_visible";

export const useAnalytics = () => {
  const sessionId = getSessionId();
  const visitorId = getVisitorId();
  const sessionStartTime = useRef(Date.now());

  // Track page view
  const trackPageView = useCallback(
    async (pagePath?: string, pageTitle?: string) => {
      const deviceInfo = getDeviceInfo();
      const path = pagePath || window.location.pathname;
      const title = pageTitle || document.title;

      try {
        await supabase.from("page_views").insert({
          session_id: sessionId,
          page_path: path,
          page_title: title,
          referrer: document.referrer || null,
          device_type: deviceInfo.deviceType,
          browser: deviceInfo.browser,
          os: deviceInfo.os,
          screen_width: deviceInfo.screenWidth,
          screen_height: deviceInfo.screenHeight,
        });

        // Update or create session
        const { data: existingSession } = await supabase
          .from("analytics_sessions")
          .select("id, page_count")
          .eq("session_id", sessionId)
          .maybeSingle();

        if (existingSession) {
          await supabase
            .from("analytics_sessions")
            .update({
              page_count: (existingSession.page_count || 0) + 1,
              exit_page: path,
              last_activity_at: new Date().toISOString(),
              duration_seconds: Math.floor(
                (Date.now() - sessionStartTime.current) / 1000
              ),
            })
            .eq("session_id", sessionId);
        } else {
          await supabase.from("analytics_sessions").insert({
            session_id: sessionId,
            visitor_id: visitorId,
            is_new_visitor: isNewVisitor(),
            device_type: deviceInfo.deviceType,
            browser: deviceInfo.browser,
            os: deviceInfo.os,
            entry_page: path,
            exit_page: path,
            page_count: 1,
          });
        }
      } catch (error) {
        console.error("Error tracking page view:", error);
      }
    },
    [sessionId, visitorId]
  );

  // Track custom events
  const trackEvent = useCallback(
    async (
      eventName: EventName,
      category: EventCategory,
      eventData?: Record<string, unknown>
    ) => {
      try {
        await supabase.from("analytics_events").insert({
          session_id: sessionId,
          event_name: eventName,
          event_category: category,
          event_data: eventData as Record<string, never> || {},
          page_path: window.location.pathname,
        });
      } catch (error) {
        console.error("Error tracking event:", error);
      }
    },
    [sessionId]
  );

  // Track product interest
  const trackProductInterest = useCallback(
    async (
      productId: string,
      productName: string,
      action: "view" | "click" | "whatsapp" | "cart"
    ) => {
      const today = new Date().toISOString().split("T")[0];

      try {
        // Try to update existing record
        const { data: existing } = await supabase
          .from("product_interests")
          .select("*")
          .eq("product_id", productId)
          .eq("date", today)
          .maybeSingle();

        if (existing) {
          const updates: Record<string, number> = {};
          if (action === "view")
            updates.view_count = (existing.view_count || 0) + 1;
          if (action === "click")
            updates.click_count = (existing.click_count || 0) + 1;
          if (action === "whatsapp")
            updates.whatsapp_count = (existing.whatsapp_count || 0) + 1;
          if (action === "cart")
            updates.cart_count = (existing.cart_count || 0) + 1;

          await supabase
            .from("product_interests")
            .update(updates)
            .eq("id", existing.id);
        } else {
          await supabase.from("product_interests").insert({
            product_id: productId,
            product_name: productName,
            view_count: action === "view" ? 1 : 0,
            click_count: action === "click" ? 1 : 0,
            whatsapp_count: action === "whatsapp" ? 1 : 0,
            cart_count: action === "cart" ? 1 : 0,
            date: today,
          });
        }
      } catch (error) {
        console.error("Error tracking product interest:", error);
      }
    },
    []
  );

  // Track search
  const trackSearch = useCallback(
    async (query: string, resultsCount: number) => {
      try {
        await supabase.from("search_analytics").insert({
          session_id: sessionId,
          search_query: query,
          results_count: resultsCount,
        });

        // Also track as event
        await trackEvent("search_query", "search", {
          query,
          results_count: resultsCount,
        });
      } catch (error) {
        console.error("Error tracking search:", error);
      }
    },
    [sessionId, trackEvent]
  );

  // Track scroll depth
  const trackScrollDepth = useCallback(
    async (depth: number, sectionVisibility?: Record<string, boolean>) => {
      try {
        const path = window.location.pathname;

        // Get existing scroll record for this session and page
        const { data: existing } = await supabase
          .from("scroll_tracking")
          .select("*")
          .eq("session_id", sessionId)
          .eq("page_path", path)
          .maybeSingle();

        const timeOnPage = Math.floor(
          (Date.now() - sessionStartTime.current) / 1000
        );

        if (existing) {
          await supabase
            .from("scroll_tracking")
            .update({
              max_scroll_depth: Math.max(existing.max_scroll_depth || 0, depth),
              section_visibility: sectionVisibility || existing.section_visibility,
              time_on_page: timeOnPage,
            })
            .eq("id", existing.id);
        } else {
          await supabase.from("scroll_tracking").insert({
            session_id: sessionId,
            page_path: path,
            max_scroll_depth: depth,
            section_visibility: sectionVisibility || {},
            time_on_page: timeOnPage,
          });
        }
      } catch (error) {
        console.error("Error tracking scroll:", error);
      }
    },
    [sessionId]
  );

  // Specific tracking functions for common actions
  const trackWhatsAppClick = useCallback(
    (source?: string, productId?: string, productName?: string) => {
      trackEvent("whatsapp_click", "conversion", { source, productId, productName });
      if (productId && productName) {
        trackProductInterest(productId, productName, "whatsapp");
      }
    },
    [trackEvent, trackProductInterest]
  );

  const trackLihatProdukClick = useCallback(() => {
    trackEvent("lihat_produk_click", "navigation");
  }, [trackEvent]);

  const trackDownloadPricelist = useCallback(() => {
    trackEvent("download_pricelist", "conversion");
  }, [trackEvent]);

  const trackPricelistAccordion = useCallback(
    (productId: string, productName: string, isExpanding: boolean) => {
      trackEvent("pricelist_accordion_expand", "engagement", {
        productId,
        productName,
        action: isExpanding ? "expand" : "collapse",
      });
    },
    [trackEvent]
  );

  const trackHeroSlideChange = useCallback(
    (slideIndex: number, isManual: boolean) => {
      trackEvent("hero_slide_change", "engagement", {
        slideIndex,
        isManual,
      });
    },
    [trackEvent]
  );

  const trackProductClick = useCallback(
    (productId: string, productName: string) => {
      trackEvent("product_card_click", "product", { productId, productName });
      trackProductInterest(productId, productName, "click");
    },
    [trackEvent, trackProductInterest]
  );

  const trackProductView = useCallback(
    (productId: string, productName: string) => {
      trackEvent("product_view", "product", { productId, productName });
      trackProductInterest(productId, productName, "view");
    },
    [trackEvent, trackProductInterest]
  );

  const trackAddToCart = useCallback(
    (productId: string, productName: string) => {
      trackEvent("product_add_to_cart", "conversion", { productId, productName });
      trackProductInterest(productId, productName, "cart");
    },
    [trackEvent, trackProductInterest]
  );

  return {
    trackPageView,
    trackEvent,
    trackSearch,
    trackScrollDepth,
    trackWhatsAppClick,
    trackLihatProdukClick,
    trackDownloadPricelist,
    trackPricelistAccordion,
    trackHeroSlideChange,
    trackProductClick,
    trackProductView,
    trackAddToCart,
    trackProductInterest,
    sessionId,
    visitorId,
  };
};

// Auto-track page views
export const usePageTracking = () => {
  const { trackPageView, trackScrollDepth } = useAnalytics();
  const lastScrollDepth = useRef(0);

  useEffect(() => {
    // Track initial page view
    trackPageView();

    // Set up scroll tracking
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const depth = Math.round((window.scrollY / scrollHeight) * 100);

      // Only update if scroll depth increased by at least 10%
      if (depth - lastScrollDepth.current >= 10) {
        lastScrollDepth.current = depth;
        trackScrollDepth(depth);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [trackPageView, trackScrollDepth]);
};
