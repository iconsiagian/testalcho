import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet-async';
import { 
  ShoppingCart, 
  Search, 
  Filter,
  Eye,
  Edit,
  Loader2
} from 'lucide-react';
import { format } from 'date-fns';

const OrdersPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders', statusFilter, paymentFilter],
    queryFn: async () => {
      let query = supabase
        .from('orders')
        .select(`
          *,
          customers (business_name, contact_name),
          order_items (id, product_name, quantity, unit_price, total_price)
        `)
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('order_status', statusFilter as 'pending' | 'processing' | 'completed' | 'cancelled');
      }
      if (paymentFilter !== 'all') {
        query = query.eq('payment_status', paymentFilter as 'unpaid' | 'paid' | 'refunded');
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  const updateOrderMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      const { error } = await supabase
        .from('orders')
        .update(updates)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({ title: 'Order updated successfully' });
    },
    onError: (error: Error) => {
      toast({ 
        title: 'Failed to update order', 
        description: error.message,
        variant: 'destructive' 
      });
    }
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const filteredOrders = orders?.filter(order => {
    if (!searchQuery) return true;
    const search = searchQuery.toLowerCase();
    return (
      order.order_number.toLowerCase().includes(search) ||
      order.customers?.business_name?.toLowerCase().includes(search) ||
      order.customers?.contact_name?.toLowerCase().includes(search)
    );
  });

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
      processing: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      completed: 'bg-green-500/10 text-green-500 border-green-500/20',
      cancelled: 'bg-red-500/10 text-red-500 border-red-500/20'
    };
    return <Badge variant="outline" className={styles[status]}>{status}</Badge>;
  };

  const getPaymentBadge = (status: string) => {
    const styles: Record<string, string> = {
      unpaid: 'bg-red-500/10 text-red-500 border-red-500/20',
      paid: 'bg-green-500/10 text-green-500 border-green-500/20',
      refunded: 'bg-purple-500/10 text-purple-500 border-purple-500/20'
    };
    return <Badge variant="outline" className={styles[status]}>{status}</Badge>;
  };

  return (
    <>
      <Helmet>
        <title>Orders - ALCHO Admin</title>
      </Helmet>

      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Orders</h1>
            <p className="text-muted-foreground">Manage and track all orders</p>
          </div>
        </div>

        {/* Filters */}
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Order Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Payment Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card className="border-border/50">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : filteredOrders && filteredOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order: any) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono text-sm">{order.order_number}</TableCell>
                        <TableCell>{order.customers?.business_name || '-'}</TableCell>
                        <TableCell>{order.order_items?.length || 0} items</TableCell>
                        <TableCell className="font-medium">{formatCurrency(order.total_amount)}</TableCell>
                        <TableCell>{getPaymentBadge(order.payment_status)}</TableCell>
                        <TableCell>{getStatusBadge(order.order_status)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {format(new Date(order.created_at), 'dd MMM yyyy')}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Select
                              value={order.order_status}
                              onValueChange={(value) => updateOrderMutation.mutate({
                                id: order.id,
                                updates: { order_status: value }
                              })}
                            >
                              <SelectTrigger className="w-32 h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No orders found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default OrdersPage;
