import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Helmet } from 'react-helmet-async';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  DollarSign
} from 'lucide-react';
import { format, subDays, startOfDay, endOfDay, startOfMonth, endOfMonth } from 'date-fns';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CashflowPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<'7d' | '30d' | 'month'>('30d');

  const { data: cashflowData } = useQuery({
    queryKey: ['cashflow', dateRange],
    queryFn: async () => {
      let startDate: Date;
      let endDate = new Date();

      if (dateRange === '7d') {
        startDate = subDays(endDate, 7);
      } else if (dateRange === '30d') {
        startDate = subDays(endDate, 30);
      } else {
        startDate = startOfMonth(endDate);
        endDate = endOfMonth(endDate);
      }

      const { data: orders, error } = await supabase
        .from('orders')
        .select('total_amount, created_at, payment_status')
        .gte('created_at', startOfDay(startDate).toISOString())
        .lte('created_at', endOfDay(endDate).toISOString())
        .eq('payment_status', 'paid');

      if (error) throw error;

      // Group by date
      const groupedData: Record<string, number> = {};
      orders?.forEach(order => {
        const date = format(new Date(order.created_at), 'yyyy-MM-dd');
        groupedData[date] = (groupedData[date] || 0) + Number(order.total_amount);
      });

      // Create chart data
      const chartData = [];
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const dateStr = format(currentDate, 'yyyy-MM-dd');
        chartData.push({
          date: dateStr,
          displayDate: format(currentDate, 'dd MMM'),
          revenue: groupedData[dateStr] || 0
        });
        currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
      }

      // Calculate totals
      const totalRevenue = orders?.reduce((sum, o) => sum + Number(o.total_amount), 0) || 0;
      const dailyAverage = chartData.length > 0 ? totalRevenue / chartData.length : 0;

      // Calculate previous period for comparison
      const prevStartDate = new Date(startDate.getTime() - (endDate.getTime() - startDate.getTime()));
      const { data: prevOrders } = await supabase
        .from('orders')
        .select('total_amount')
        .gte('created_at', startOfDay(prevStartDate).toISOString())
        .lte('created_at', endOfDay(startDate).toISOString())
        .eq('payment_status', 'paid');

      const prevRevenue = prevOrders?.reduce((sum, o) => sum + Number(o.total_amount), 0) || 0;
      const growthPercent = prevRevenue > 0 ? ((totalRevenue - prevRevenue) / prevRevenue) * 100 : 0;

      return {
        chartData,
        totalRevenue,
        dailyAverage,
        growthPercent,
        orderCount: orders?.length || 0
      };
    }
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <>
      <Helmet>
        <title>Cashflow - ALCHO Admin</title>
      </Helmet>

      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Cashflow</h1>
            <p className="text-muted-foreground">Track revenue and financial performance</p>
          </div>
          <Select value={dateRange} onValueChange={(v: '7d' | '30d' | 'month') => setDateRange(v)}>
            <SelectTrigger className="w-40">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="month">This month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {formatCurrency(cashflowData?.totalRevenue || 0)}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Daily Average</p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {formatCurrency(cashflowData?.dailyAverage || 0)}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Growth</p>
                  <p className={`text-2xl font-bold mt-1 ${
                    (cashflowData?.growthPercent || 0) >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {(cashflowData?.growthPercent || 0) >= 0 ? '+' : ''}
                    {(cashflowData?.growthPercent || 0).toFixed(1)}%
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  (cashflowData?.growthPercent || 0) >= 0 ? 'bg-green-500/10' : 'bg-red-500/10'
                }`}>
                  {(cashflowData?.growthPercent || 0) >= 0 ? (
                    <TrendingUp className="w-6 h-6 text-green-500" />
                  ) : (
                    <TrendingDown className="w-6 h-6 text-red-500" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Paid Orders</p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {cashflowData?.orderCount || 0}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {cashflowData?.chartData && cashflowData.chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cashflowData.chartData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="displayDate" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                    />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
                              <p className="text-sm text-muted-foreground">{payload[0].payload.displayDate}</p>
                              <p className="text-lg font-bold text-foreground">
                                {formatCurrency(payload[0].value as number)}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--primary))"
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <Wallet className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No revenue data available</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CashflowPage;
