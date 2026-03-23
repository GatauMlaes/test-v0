'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Phone, Mail, Globe, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHotelDetail } from '@/features/hotel/hooks/useHotels';

export default function HotelDetailPage() {
  const params = useParams();
  const router = useRouter();
  const hotelId = params.id as string;

  const { data: hotel, isLoading, error } = useHotelDetail(hotelId);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-primary border-r-transparent" />
        <p className="mt-4 text-muted-foreground">Loading hotel...</p>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="text-center py-12 bg-card rounded-2xl border border-border/60">
        <p className="text-muted-foreground">Failed to load hotel details</p>
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
        {/* Hotel Info Card */}
        <div className="bg-card border border-border/60 rounded-2xl p-6 md:p-8">
          <h1 className="text-3xl font-bold text-foreground">{hotel.name}</h1>
          <p className="text-sm text-muted-foreground mt-2">
            {hotel.address}, {hotel.city}, {hotel.province}, {hotel.country}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm">
              {hotel.rooms?.length || 0} Rooms
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 text-blue-600 rounded-lg text-sm">
              {hotel.amenities?.length || 0} Amenities
            </span>
          </div>

          <p className="mt-6 text-foreground leading-relaxed">{hotel.description}</p>
        </div>

        {/* Contact Information */}
        <div className="bg-card border border-border/60 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Contact Information</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <span className="text-foreground">{hotel.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <a href={`mailto:${hotel.email}`} className="text-foreground hover:text-primary">
                {hotel.email}
              </a>
            </div>
            {hotel.website && (
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-primary" />
                <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary">
                  {hotel.website}
                </a>
              </div>
            )}
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-foreground">
                Check-in: {hotel.check_in_time} | Check-out: {hotel.check_out_time}
              </span>
            </div>
          </div>
        </div>

        {/* Rooms */}
        {hotel.rooms && hotel.rooms.length > 0 && (
          <div className="bg-card border border-border/60 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Rooms</h2>
            <div className="space-y-4">
              {hotel.rooms.map((room, idx) => (
                <div key={idx} className="border border-border/60 rounded-lg p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Room Type</p>
                      <p className="font-semibold text-foreground">{room.room_type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Total Rooms</p>
                      <p className="font-semibold text-foreground">{room.total_rooms}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Price/Night</p>
                      <p className="font-semibold text-foreground">${room.price_per_night}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Capacity</p>
                      <p className="font-semibold text-foreground">{room.capacity} guests</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Amenities */}
        {hotel.amenities && hotel.amenities.length > 0 && (
          <div className="bg-card border border-border/60 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {hotel.amenities.map((amenity) => (
                <span key={amenity.id} className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm">
                  {amenity.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
