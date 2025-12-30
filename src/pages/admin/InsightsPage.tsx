import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { 
  Eye, 
  MousePointer, 
  MessageCircle, 
  TrendingUp, 
  Search,
  ArrowRight,
  Clock,
  Users,
  Monitor,
  Smartphone,
  BarChart3,
  Activity
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  FunnelChart,
  Funnel,
  LabelList
} from "recharts";

interface AnalyticsData {
  totalPageViews: number;
  totalSessions: number;
  totalEvents: number;
  avgTimeOnPage: number;
  newVsReturning: { new: number; returning: number };
  deviceBreakdown: { desktop: number; mobile: number; tablet: number };
  topProducts: { name: string; views: number; clicks: number; whatsapp: number }[];
  topSearches: { query: string; count: number; avgResults: number }[];
  whatsappClicks: { total: number; perPage: Record<string, number>; byHour: Record<number, number> };
  funnelData: { step: string; visitors: number; rate: number }[];
  pageViewsOverTime: { date: string; views: number }[];
  eventsOverTime: { date: string; events: number }[];
}

const COLORS = ["hsl(37, 95%, 40%)", "hsl(37, 95%, 50%)", "hsl(37, 95%, 60%)", "hsl(37, 95%, 70%)"];

const InsightsPage = () => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [dateRange, setDateRange] = useState("7d");

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const days = dateRange === "7d" ? 7 : dateRange === "30d" ? 30 : 90;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      // Fetch page views
      const { data: pageViews } = await supabase
        .from("page_views")
        .select("*")
        .gte("created_at", startDate.toISOString());

      // Fetch sessions
      const { data: sessions } = await supabase
        .from("analytics_sessions")
        .select("*")
        .gte("created_at", startDate.toISOString());

      // Fetch events
      const { data: events } = await supabase
        .from("analytics_events")
        .select("*")
        .gte("created_at", startDate.toISOString());

      // Fetch product interests
      const { data: productInterests } = await supabase
        .from("product_interests")
        .select("*")
        .gte("date", startDate.toISOString().split("T")[0]);

      // Fetch search analytics
      const { data: searches } = await supabase
        .from("search_analytics")
        .select("*")
        .gte("created_at", startDate.toISOString());

      // Fetch scroll tracking
      const { data: scrollData } = await supabase
        .from("scroll_tracking")
        .select("*")
        .gte("created_at", startDate.toISOString());

      // Process data
      const totalPageViews = pageViews?.length || 0;
      const totalSessions = sessions?.length || 0;
      const totalEvents = events?.length || 0;

      // Average time on page
      const avgTimeOnPage = scrollData?.length 
        ? Math.round(scrollData.reduce((sum, s) => sum + (s.time_on_page || 0), 0) / scrollData.length)
        : 0;

      // New vs returning
      const newVisitors = sessions?.filter(s => s.is_new_visitor).length || 0;
      const returningVisitors = (sessions?.length || 0) - newVisitors;

      // Device breakdown
      const desktopCount = sessions?.filter(s => s.device_type === "desktop").length || 0;
      const mobileCount = sessions?.filter(s => s.device_type === "mobile").length || 0;
      const tabletCount = sessions?.filter(s => s.device_type === "tablet").length || 0;

      // Top products
      const productMap = new Map<string, { name: string; views: number; clicks: number; whatsapp: number }>();
      productInterests?.forEach(p => {
        const existing = productMap.get(p.product_id) || { name: p.product_name, views: 0, clicks: 0, whatsapp: 0 };
        productMap.set(p.product_id, {
          name: p.product_name,
          views: existing.views + (p.view_count || 0),
          clicks: existing.clicks + (p.click_count || 0),
          whatsapp: existing.whatsapp + (p.whatsapp_count || 0),
        });
      });
      const topProducts = Array.from(productMap.values())
        .sort((a, b) => (b.views + b.clicks + b.whatsapp) - (a.views + a.clicks + a.whatsapp))
        .slice(0, 5);

      // Top searches
      const searchMap = new Map<string, { count: number; totalResults: number }>();
      searches?.forEach(s => {
        const key = s.search_query.toLowerCase();
        const existing = searchMap.get(key) || { count: 0, totalResults: 0 };
        searchMap.set(key, {
          count: existing.count + 1,
          totalResults: existing.totalResults + (s.results_count || 0),
        });
      });
      const topSearches = Array.from(searchMap.entries())
        .map(([query, data]) => ({
          query,
          count: data.count,
          avgResults: Math.round(data.totalResults / data.count),
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      // WhatsApp clicks
      const whatsappEvents = events?.filter(e => e.event_name === "whatsapp_click") || [];
      const whatsappPerPage: Record<string, number> = {};
      const whatsappByHour: Record<number, number> = {};
      whatsappEvents.forEach(e => {
        const page = e.page_path || "unknown";
        whatsappPerPage[page] = (whatsappPerPage[page] || 0) + 1;
        const hour = new Date(e.created_at).getHours();
        whatsappByHour[hour] = (whatsappByHour[hour] || 0) + 1;
      });

      // Conversion funnel
      const homepageViews = pageViews?.filter(p => p.page_path === "/").length || 0;
      const productPageViews = pageViews?.filter(p => p.page_path === "/produk").length || 0;
      const pricelistViews = events?.filter(e => e.event_name === "download_pricelist").length || 0;
      const whatsappClicks = whatsappEvents.length;

      const funnelData = [
        { step: "Homepage", visitors: homepageViews, rate: 100 },
        { step: "Halaman Produk", visitors: productPageViews, rate: homepageViews ? Math.round((productPageViews / homepageViews) * 100) : 0 },
        { step: "Lihat Pricelist", visitors: pricelistViews, rate: productPageViews ? Math.round((pricelistViews / productPageViews) * 100) : 0 },
        { step: "WhatsApp Click", visitors: whatsappClicks, rate: pricelistViews ? Math.round((whatsappClicks / pricelistViews) * 100) : 0 },
      ];

      // Page views over time
      const viewsByDate = new Map<string, number>();
      pageViews?.forEach(p => {
        const date = new Date(p.created_at).toISOString().split("T")[0];
        viewsByDate.set(date, (viewsByDate.get(date) || 0) + 1);
      });
      const pageViewsOverTime = Array.from(viewsByDate.entries())
        .map(([date, views]) => ({ date, views }))
        .sort((a, b) => a.date.localeCompare(b.date));

      // Events over time
      const eventsByDate = new Map<string, number>();
      events?.forEach(e => {
        const date = new Date(e.created_at).toISOString().split("T")[0];
        eventsByDate.set(date, (eventsByDate.get(date) || 0) + 1);
      });
      const eventsOverTime = Array.from(eventsByDate.entries())
        .map(([date, events]) => ({ date, events }))
        .sort((a, b) => a.date.localeCompare(b.date));

      setAnalytics({
        totalPageViews,
        totalSessions,
        totalEvents,
        avgTimeOnPage,
        newVsReturning: { new: newVisitors, returning: returningVisitors },
        deviceBreakdown: { desktop: desktopCount, mobile: mobileCount, tablet: tabletCount },
        topProducts,
        topSearches,
        whatsappClicks: { total: whatsappClicks, perPage: whatsappPerPage, byHour: whatsappByHour },
        funnelData,
        pageViewsOverTime,
        eventsOverTime,
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  if (loading) {
    return (
      <div className="p-6 animate-pulse">
        <div className="h-8 w-48 bg-muted rounded mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Website Insights | ALCHO Admin</title>
      </Helmet>

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground mb-1">
              Website Insights
            </h1>
            <p className="text-muted-foreground">
              Analisis perilaku pengunjung dan performa website
            </p>
          </div>
          <div className="flex gap-2">
            {["7d", "30d", "90d"].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  dateRange === range
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80 text-foreground"
                }`}
              >
                {range === "7d" ? "7 Hari" : range === "30d" ? "30 Hari" : "90 Hari"}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Page Views</p>
                  <p className="text-2xl font-bold text-foreground">{formatNumber(analytics?.totalPageViews || 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Sesi</p>
                  <p className="text-2xl font-bold text-foreground">{formatNumber(analytics?.totalSessions || 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">WhatsApp Clicks</p>
                  <p className="text-2xl font-bold text-foreground">{formatNumber(analytics?.whatsappClicks.total || 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Time on Page</p>
                  <p className="text-2xl font-bold text-foreground">{formatDuration(analytics?.avgTimeOnPage || 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-secondary">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Produk</TabsTrigger>
            <TabsTrigger value="funnel">Funnel</TabsTrigger>
            <TabsTrigger value="search">Pencarian</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Page Views Chart */}
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    Page Views
                  </CardTitle>
                  <CardDescription>Trend kunjungan halaman</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={analytics?.pageViewsOverTime || []}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="date" 
                          stroke="hsl(var(--muted-foreground))"
                          tick={{ fontSize: 12 }}
                          tickFormatter={(value) => new Date(value).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                        />
                        <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px"
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="views" 
                          stroke="hsl(37, 95%, 50%)" 
                          strokeWidth={2}
                          dot={{ fill: "hsl(37, 95%, 50%)" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Device Breakdown */}
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-primary" />
                    Device Breakdown
                  </CardTitle>
                  <CardDescription>Distribusi perangkat pengunjung</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Desktop", value: analytics?.deviceBreakdown.desktop || 0 },
                            { name: "Mobile", value: analytics?.deviceBreakdown.mobile || 0 },
                            { name: "Tablet", value: analytics?.deviceBreakdown.tablet || 0 },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {COLORS.map((color, index) => (
                            <Cell key={`cell-${index}`} fill={color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px"
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-[hsl(37,95%,40%)]" />
                      <span className="text-sm text-muted-foreground">Desktop: {analytics?.deviceBreakdown.desktop || 0}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-[hsl(37,95%,50%)]" />
                      <span className="text-sm text-muted-foreground">Mobile: {analytics?.deviceBreakdown.mobile || 0}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* New vs Returning */}
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Visitor Type
                  </CardTitle>
                  <CardDescription>Pengunjung baru vs kembali</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Pengunjung Baru</span>
                        <span className="text-sm font-medium">{analytics?.newVsReturning.new || 0}</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ 
                            width: `${analytics?.totalSessions ? (analytics.newVsReturning.new / analytics.totalSessions) * 100 : 0}%` 
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Pengunjung Kembali</span>
                        <span className="text-sm font-medium">{analytics?.newVsReturning.returning || 0}</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-accent rounded-full transition-all"
                          style={{ 
                            width: `${analytics?.totalSessions ? (analytics.newVsReturning.returning / analytics.totalSessions) * 100 : 0}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp by Hour */}
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-green-500" />
                    WhatsApp Clicks by Hour
                  </CardTitle>
                  <CardDescription>Peak time untuk konversi</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={Array.from({ length: 24 }, (_, i) => ({
                          hour: `${i}:00`,
                          clicks: analytics?.whatsappClicks.byHour[i] || 0
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="hour" 
                          stroke="hsl(var(--muted-foreground))"
                          tick={{ fontSize: 10 }}
                          interval={3}
                        />
                        <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px"
                          }}
                        />
                        <Bar dataKey="clicks" fill="hsl(142, 76%, 36%)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Top 5 Produk Paling Diminati
                </CardTitle>
                <CardDescription>Berdasarkan views, clicks, dan WhatsApp inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics?.topProducts.map((product, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {index + 1}
                        </div>
                        <span className="font-medium">{product.name}</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Views</p>
                          <p className="font-semibold text-foreground">{product.views}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Clicks</p>
                          <p className="font-semibold text-foreground">{product.clicks}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">WhatsApp</p>
                          <p className="font-semibold text-green-500">{product.whatsapp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {(!analytics?.topProducts || analytics.topProducts.length === 0) && (
                    <p className="text-center text-muted-foreground py-8">Belum ada data produk</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="funnel" className="space-y-4">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Conversion Funnel
                </CardTitle>
                <CardDescription>Perjalanan pengunjung dari homepage hingga konversi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics?.funnelData.map((step, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{step.step}</span>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-muted-foreground">{step.visitors} visitors</span>
                              <span className="text-sm font-semibold text-primary">{step.rate}%</span>
                            </div>
                          </div>
                          <div className="h-3 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                              style={{ width: `${step.rate}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      {index < (analytics?.funnelData.length || 0) - 1 && (
                        <div className="ml-4 h-4 border-l-2 border-dashed border-border" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="search" className="space-y-4">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary" />
                  Top Pencarian
                </CardTitle>
                <CardDescription>Kata kunci yang paling banyak dicari</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics?.topSearches.map((search, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">#{index + 1}</span>
                        <span className="font-medium">"{search.query}"</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{search.count}x dicari</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          search.avgResults > 0 
                            ? "bg-green-500/10 text-green-500" 
                            : "bg-red-500/10 text-red-500"
                        }`}>
                          {search.avgResults > 0 ? `${search.avgResults} hasil` : "Tidak ada hasil"}
                        </span>
                      </div>
                    </div>
                  ))}
                  {(!analytics?.topSearches || analytics.topSearches.length === 0) && (
                    <p className="text-center text-muted-foreground py-8">Belum ada data pencarian</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default InsightsPage;
