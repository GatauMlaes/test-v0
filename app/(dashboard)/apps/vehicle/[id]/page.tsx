'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Phone, Mail, MapPin, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVehicleDetail } from '@/features/vehicle/hooks/useVehicles';

const vehicleTypeLabels: Record<string, string> = {
  car: 'Car',
  motorcycle: 'Motorcycle',
  van: 'Van',
  bus: 'Bus',
};

export default function VehicleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const vehicleId = params.id as string;

  const { data: vehicle, isLoading, error } = useVehicleDetail(vehicleId);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-primary border-r-transparent" />
        <p className="mt-4 text-muted-foreground">Loading vehicle...</p>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="text-center py-12 bg-card rounded-2xl border border-border/60">
        <p className="text-muted-foreground">Failed to load vehicle details</p>
        <Button onClick={() => router.back()} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid gap-6">
        {/* Vehicle Info Card */}
        <div className="bg-card border border-border/60 rounded-2xl p-6 md:p-8">
          <h1 className="text-3xl font-bold text-foreground">
            {vehicle.year} {vehicle.brand} {vehicle.model}
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            License Plate: {vehicle.license_plate} | Color: {vehicle.color}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm">
              {vehicleTypeLabels[vehicle.type]}
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-600 rounded-lg text-sm">
              <DollarSign className="h-4 w-4" />
              ${vehicle.price_per_day}/day
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 text-blue-600 rounded-lg text-sm">
              {vehicle.capacity} seats
            </span>
          </div>

          <p className="mt-6 text-foreground leading-relaxed">{vehicle.description}</p>
        </div>

        {/* Location */}
        <div className="bg-card border border-border/60 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Location</h2>
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="text-foreground">{vehicle.address}</p>
              <p className="text-muted-foreground">{vehicle.city}, {vehicle.province}, {vehicle.country} {vehicle.postal_code}</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-card border border-border/60 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Contact Information</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <span className="text-foreground">{vehicle.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <a href={`mailto:${vehicle.email}`} className="text-foreground hover:text-primary">
                {vehicle.email}
              </a>
            </div>
          </div>
        </div>

        {/* Specifications */}
        {vehicle.specifications && vehicle.specifications.length > 0 && (
          <div className="bg-card border border-border/60 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Specifications</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {vehicle.specifications.map((spec, idx) => (
                <div key={idx} className="border border-border/60 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">{spec.key}</p>
                  <p className="font-semibold text-foreground">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
