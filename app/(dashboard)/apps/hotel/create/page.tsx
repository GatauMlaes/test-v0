'use client';

import { useRouter } from 'next/navigation';
import { useHotelFormStore } from '@/store/hotelStore';
import { HotelBasicInfoStep } from '@/features/hotel/components/HotelBasicInfoStep';

export default function CreateHotelPage() {
  const router = useRouter();
  const currentStep = useHotelFormStore((state) => state.currentStep);

  // Route to appropriate step component
  const renderStep = () => {
    switch (currentStep) {
      case 'basic-info':
        return <HotelBasicInfoStep />;
      case 'facilities':
        return <div>Facilities Step - Coming Soon</div>;
      case 'rooms':
        return <div>Rooms Step - Coming Soon</div>;
      case 'contact':
        return <div>Contact Step - Coming Soon</div>;
      case 'assets':
        return <div>Assets Step - Coming Soon</div>;
      case 'review':
        return <div>Review Step - Coming Soon</div>;
      default:
        return <HotelBasicInfoStep />;
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Add New Hotel</h1>
        <p className="text-sm text-muted-foreground mt-1">Complete all steps to list your hotel</p>
      </div>

      <div className="bg-card rounded-2xl border border-border/60 p-6 md:p-8">
        {renderStep()}
      </div>
    </div>
  );
}
