import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Helmet } from 'react-helmet-async';
import { 
  ShoppingCart, 
  DollarSign, 
  Clock, 
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Package,
  Users
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { profile } = useAuth();

  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const [ordersRes, customersRes, productsRes] = await Promise.all([
        supabase.from('orders').select('*'),
        supabase.from('customers').select('id'),
        supabase.from('admin_products').select('id').eq('is_active', true)
      ]);

      const orders = ordersRes.data || [];
      const totalOrders = orders.length;
      const totalRevenue = orders
        .filter(o => o.payment_status === 'paid')
        .reduce((sum, o) => sum + Number(o.total_amount), 0);
      const pendingOrders = orders.filter(o => o.order_status === 'pending').length;
      const completedOrders = orders.filter(o => o.order_status === 'completed').length;

      return {
        totalOrders,
        totalRevenue,
        pendingOrders,
        completedOrders,
        totalCustomers: customersRes.data?.length || 0,
        activeProducts: productsRes.data?.length || 0
      };
    }
  });

  const { data: recentOrders } = useQuery({
    queryKey: ['recent-orders'],
    queryFn: async () => {
      const { data } = await supabase
        .from('orders')
        .select(`
          *,
          customers (business_name)
        `)
        .order('created_at', { ascending: false })
        .limit(5);
      return data || [];
    }
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const statCards = [
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(stats?.totalRevenue || 0),
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Pending Orders',
      value: stats?.pendingOrders || 0,
      icon: Clock,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    },
    {
      title: 'Completed Orders',
      value: stats?.completedOrders || 0,
      icon: CheckCircle,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - ALCHO Admin</title>
      </Helmet>

      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Selamat datang kembali, {profile?.full_name || 'Admin'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.title} className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Customers</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stats?.totalCustomers || 0}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Products</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stats?.activeProducts || 0}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center">
                  <Package className="w-6 h-6 text-pink-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {recentOrders && recentOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Order ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order: any) => (
                      <tr key={order.id} className="border-b border-border/50 hover:bg-muted/30">
                        <td className="py-3 px-4 font-mono text-sm">{order.order_number}</td>
                        <td className="py-3 px-4 text-sm">{order.customers?.business_name || '-'}</td>
                        <td className="py-3 px-4 text-sm font-medium">{formatCurrency(order.total_amount)}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            order.order_status === 'completed' ? 'bg-green-500/10 text-green-500' :
                            order.order_status === 'pending' ? 'bg-orange-500/10 text-orange-500' :
                            order.order_status === 'processing' ? 'bg-blue-500/10 text-blue-500' :
                            'bg-red-500/10 text-red-500'
                          }`}>
                            {order.order_status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Belum ada pesanan</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DashboardPage;
