-- Create analytics tables for tracking website behavior

-- Page views table
CREATE TABLE public.page_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  device_type TEXT NOT NULL DEFAULT 'desktop',
  browser TEXT,
  os TEXT,
  screen_width INTEGER,
  screen_height INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Analytics events table
CREATE TABLE public.analytics_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  event_name TEXT NOT NULL,
  event_category TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  page_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Sessions table for visitor tracking
CREATE TABLE public.analytics_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  visitor_id TEXT NOT NULL,
  is_new_visitor BOOLEAN NOT NULL DEFAULT true,
  device_type TEXT NOT NULL DEFAULT 'desktop',
  browser TEXT,
  os TEXT,
  entry_page TEXT,
  exit_page TEXT,
  page_count INTEGER NOT NULL DEFAULT 0,
  duration_seconds INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_activity_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Product interests table for aggregated product analytics
CREATE TABLE public.product_interests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  view_count INTEGER NOT NULL DEFAULT 0,
  click_count INTEGER NOT NULL DEFAULT 0,
  whatsapp_count INTEGER NOT NULL DEFAULT 0,
  cart_count INTEGER NOT NULL DEFAULT 0,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  UNIQUE(product_id, date)
);

-- Search analytics table
CREATE TABLE public.search_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  search_query TEXT NOT NULL,
  results_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Scroll depth tracking
CREATE TABLE public.scroll_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  max_scroll_depth INTEGER NOT NULL DEFAULT 0,
  section_visibility JSONB DEFAULT '{}',
  time_on_page INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scroll_tracking ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for tracking without auth)
CREATE POLICY "Anyone can insert page views" ON public.page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert events" ON public.analytics_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert sessions" ON public.analytics_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert product interests" ON public.product_interests FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert search analytics" ON public.search_analytics FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert scroll tracking" ON public.scroll_tracking FOR INSERT WITH CHECK (true);

-- Allow updates for sessions (to update duration, page count, etc.)
CREATE POLICY "Anyone can update sessions" ON public.analytics_sessions FOR UPDATE USING (true);
CREATE POLICY "Anyone can update product interests" ON public.product_interests FOR UPDATE USING (true);
CREATE POLICY "Anyone can update scroll tracking" ON public.scroll_tracking FOR UPDATE USING (true);

-- Admin can view all analytics
CREATE POLICY "Admins can view page views" ON public.page_views FOR SELECT USING (is_admin_user(auth.uid()));
CREATE POLICY "Admins can view events" ON public.analytics_events FOR SELECT USING (is_admin_user(auth.uid()));
CREATE POLICY "Admins can view sessions" ON public.analytics_sessions FOR SELECT USING (is_admin_user(auth.uid()));
CREATE POLICY "Admins can view product interests" ON public.product_interests FOR SELECT USING (is_admin_user(auth.uid()));
CREATE POLICY "Admins can view search analytics" ON public.search_analytics FOR SELECT USING (is_admin_user(auth.uid()));
CREATE POLICY "Admins can view scroll tracking" ON public.scroll_tracking FOR SELECT USING (is_admin_user(auth.uid()));

-- Create indexes for better query performance
CREATE INDEX idx_page_views_session ON public.page_views(session_id);
CREATE INDEX idx_page_views_created ON public.page_views(created_at);
CREATE INDEX idx_page_views_path ON public.page_views(page_path);
CREATE INDEX idx_events_session ON public.analytics_events(session_id);
CREATE INDEX idx_events_created ON public.analytics_events(created_at);
CREATE INDEX idx_events_name ON public.analytics_events(event_name);
CREATE INDEX idx_events_category ON public.analytics_events(event_category);
CREATE INDEX idx_sessions_visitor ON public.analytics_sessions(visitor_id);
CREATE INDEX idx_sessions_created ON public.analytics_sessions(created_at);
CREATE INDEX idx_product_interests_date ON public.product_interests(date);
CREATE INDEX idx_product_interests_product ON public.product_interests(product_id);
CREATE INDEX idx_search_created ON public.search_analytics(created_at);