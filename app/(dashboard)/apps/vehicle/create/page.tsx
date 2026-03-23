'use client';

import { useRouter } from 'next/navigation';
import { useVehicleFormStore } from '@/store/vehicleStore';

export default function CreateVehiclePage() {
  const router = useRouter();
  const currentStep = useVehicleFormStore((state) => state.currentStep);

  const renderStep = () => {
    return <div>Vehicle wizard - Coming Soon</div>;
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Add New Vehicle</h1>
        <p className="text-sm text-muted-foreground mt-1">Complete all steps to list your vehicle</p>
      </div>

      <div className="bg-card rounded-2xl border border-border/60 p-6 md:p-8">
        {renderStep()}
      </div>
    </div>
  );
}
