'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useVehicles, useDeleteVehicle } from '@/features/vehicle/hooks/useVehicles';
import { notification } from '@/lib/services/notification';

const vehicleTypeLabels: Record<string, string> = {
  car: 'Car',
  motorcycle: 'Motorcycle',
  van: 'Van',
  bus: 'Bus',
};

export default function VehiclesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading } = useVehicles(page, pageSize, searchQuery);
  const deleteMutation = useDeleteVehicle();

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;
    await deleteMutation.mutateAsync(id);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const vehicles = data?.data || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Vehicles</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your vehicle listings</p>
        </div>
        <Button
          onClick={() => router.push('/apps/vehicle/create')}
          className="gap-2 h-11 px-6"
        >
          <Plus className="h-4 w-4" />
          Add Vehicle
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search vehicles..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 h-11 rounded-xl border-border/60 focus:border-primary/50"
        />
      </div>

      {/* Vehicles List */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-primary border-r-transparent" />
          <p className="mt-4 text-muted-foreground">Loading vehicles...</p>
        </div>
      ) : vehicles.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-2xl border border-border/60">
          <p className="text-muted-foreground">No vehicles found. Create one to get started.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-card border border-border/60 rounded-2xl p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-foreground truncate">
                    {vehicle.year} {vehicle.brand} {vehicle.model}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {vehicle.address}, {vehicle.city}, {vehicle.province}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                      {vehicleTypeLabels[vehicle.type]}
                    </span>
                    <span className="text-xs bg-blue-500/10 text-blue-600 px-2.5 py-1 rounded-full">
                      ${vehicle.price_per_day}/day
                    </span>
                    <span className="text-xs bg-green-500/10 text-green-600 px-2.5 py-1 rounded-full">
                      {vehicle.capacity} seats
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 sm:flex-col">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/apps/vehicle/${vehicle.id}`)}
                    className="gap-2 h-9"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(vehicle.id)}
                    disabled={deleteMutation.isPending}
                    className="gap-2 h-9"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {data && data.meta.total_pages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="h-10"
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {data.meta.total_pages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.min(data.meta.total_pages, p + 1))}
            disabled={page === data.meta.total_pages}
            className="h-10"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
