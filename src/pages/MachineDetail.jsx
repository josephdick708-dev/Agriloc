import React, { useState } from 'react';
import { X, Star, MapPin, Fuel, ShieldCheck, UserCheck, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function MachineDetail({ machine, onClose, onCreateBooking, currentUserId }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [deliveryRequired, setDeliveryRequired] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  
  if (!machine) return null;

  // Calcul du prix
  let totalDays = 0;
  let rawPrice = 0;
  let serviceFee = 0;
  let totalPrice = 0;

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    if (timeDiff >= 0) {
      totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // inclus le jour même
      rawPrice = totalDays * machine.daily_price;
      serviceFee = rawPrice * 0.1; // Commission de 10%
      totalPrice = rawPrice + serviceFee;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (totalDays <= 0) {
      alert("Veuillez sélectionner des dates valides.");
      return;
    }

    const bookingData = {
      machineId: machine.id,
      startDate,
      endDate,
      totalDays,
      totalPrice,
      deliveryRequired,
      deliveryAddress: deliveryRequired ? deliveryAddress : '',
    };

    onCreateBooking(bookingData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-agri-dark/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-gray-100/50 animate-slide-up flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur hover:bg-gray-100 text-gray-700 rounded-full shadow transition-all border border-gray-200"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Side: Images & Info */}
        <div className="md:w-1/2 overflow-y-auto p-6 space-y-6">
          
          {/* Main Image */}
          <div className="h-64 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
            <img 
              src={machine.images && machine.images[0] ? machine.images[0] : 'https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&q=80&w=600'} 
              alt={machine.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Machine Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-agri-light uppercase tracking-widest">{machine.category}</span>
              <div className="flex items-center text-agri-gold space-x-1">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-xs font-bold text-gray-700">{machine.average_rating || '5.0'} (12 avis)</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold font-outfit text-gray-800 leading-snug">{machine.name}</h2>
            
            <div className="flex items-center text-xs text-gray-500">
              <MapPin className="h-4 w-4 text-agri-light mr-1.5" />
              <span>{machine.location_city}, Région des {machine.location_region}</span>
            </div>
          </div>

          {/* Tech Specs Grid */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className="p-4 bg-agri-bg rounded-2xl border border-gray-100 flex items-center space-x-3">
              <Fuel className="h-5 w-5 text-agri-green" />
              <div>
                <span className="text-[10px] text-gray-400 block font-bold uppercase">Puissance</span>
                <span className="text-xs font-bold text-gray-700">{machine.power_hp ? `${machine.power_hp} HP` : 'Chauffeur inclus'}</span>
              </div>
            </div>
            <div className="p-4 bg-agri-bg rounded-2xl border border-gray-100 flex items-center space-x-3">
              <ShieldCheck className="h-5 w-5 text-agri-green" />
              <div>
                <span className="text-[10px] text-gray-400 block font-bold uppercase">Contrôle technique</span>
                <span className="text-xs font-bold text-gray-700">Inspecté / Conforme</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-gray-800 font-outfit">Description de l'équipement</h4>
            <p className="text-xs text-gray-500 leading-relaxed font-light">
              {machine.description || "Ce matériel agricole moderne haut de gamme garantit un rendement exceptionnel pour la préparation, le traitement ou la récolte de vos cultures au Togo. Il est systématiquement loué avec un chauffeur certifié pour assurer la sécurité et l'optimisation des chantiers."}
            </p>
          </div>

          {/* Supplier Info */}
          <div className="p-4 bg-agri-green/5 border border-agri-green/10 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-agri-light rounded-full flex items-center justify-center font-bold text-white shadow-sm">
                SP
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <h4 className="text-xs font-bold text-gray-800">Fournisseur AGRILOC</h4>
                  <UserCheck className="h-3.5 w-3.5 text-agri-light" />
                </div>
                <p className="text-[10px] text-gray-400 font-medium">Partenaire certifié (Sokodé / Kpalimé)</p>
              </div>
            </div>
            <span className="text-[9px] bg-agri-green/10 text-agri-green font-bold px-2 py-0.5 rounded uppercase">Vérifié</span>
          </div>

        </div>

        {/* Right Side: Reservation Calendar Form */}
        <div className="md:w-1/2 bg-gray-50 p-6 flex flex-col justify-between overflow-y-auto border-t md:border-t-0 md:border-l border-gray-200/50">
          
          <div className="space-y-6">
            <div className="border-b border-gray-200/60 pb-4">
              <h3 className="text-lg font-bold font-outfit text-gray-800">Planifier vos travaux</h3>
              <p className="text-xs text-gray-400 font-light mt-0.5">Entrez les dates pour estimer les frais de service et le coût global.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Date pickers */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Date de début</label>
                  <div className="relative">
                    <input 
                      type="date"
                      required
                      value={startDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-3 text-xs font-semibold focus:outline-none focus:border-agri-light"
                    />
                  </div>
                </div>
                <div className="space-y-1.5 text-left">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Date de fin</label>
                  <div className="relative">
                    <input 
                      type="date"
                      required
                      value={endDate}
                      min={startDate || new Date().toISOString().split('T')[0]}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl py-2.5 px-3 text-xs font-semibold focus:outline-none focus:border-agri-light"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Checkbox Option */}
              <div className="bg-white p-4 rounded-2xl border border-gray-100 space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer text-xs font-bold text-gray-700 select-none">
                  <input 
                    type="checkbox"
                    checked={deliveryRequired}
                    onChange={(e) => setDeliveryRequired(e.target.checked)}
                    className="h-4.5 w-4.5 accent-agri-light rounded cursor-pointer"
                  />
                  <span>Demander l'acheminement au champ ?</span>
                </label>
                {deliveryRequired && (
                  <input 
                    type="text"
                    required
                    placeholder="Saisir la ville/champ (ex: Hameau de Kpimé)"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-agri-light"
                  />
                )}
              </div>

              {/* Pricing breakdown summary */}
              {totalDays > 0 ? (
                <div className="bg-white p-4 rounded-2xl border border-gray-100 space-y-2.5">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{parseInt(machine.daily_price).toLocaleString('fr-FR')} FCFA x {totalDays} jours</span>
                    <span className="font-semibold text-gray-700">{rawPrice.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Frais de service (10% commission)</span>
                    <span className="font-semibold text-gray-700">{serviceFee.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                  <div className="border-t border-gray-100 pt-2.5 flex justify-between items-center text-sm font-bold text-gray-800">
                    <span>Coût Total</span>
                    <span className="text-base text-agri-green font-extrabold font-outfit">{totalPrice.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                </div>
              ) : (
                <div className="py-4 text-center text-xs text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200">
                  Sélectionnez vos dates pour afficher le devis.
                </div>
              )}

              {/* Submit CTA Button */}
              {machine.status === 'available' ? (
                <button 
                  type="submit"
                  disabled={totalDays <= 0}
                  className={`w-full py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md ${
                    totalDays > 0 
                      ? 'bg-gradient-to-r from-agri-green to-agri-light hover:scale-[1.02] text-white shadow-agri-green/10'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  <Calendar className="h-4.5 w-4.5" />
                  <span>Procéder à la réservation</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <div className="p-3 bg-red-50 text-red-500 border border-red-100 rounded-xl text-center text-xs font-bold">
                  Cet équipement est actuellement indisponible (déjà loué).
                </div>
              )}

            </form>
          </div>

          {/* Secure lock footer */}
          <div className="pt-6 border-t border-gray-200/60 flex items-center space-x-2 text-[10px] text-gray-400 font-semibold justify-center">
            <CheckCircle2 className="h-4 w-4 text-agri-light" />
            <span>PAIEMENT SÉCURISÉ USSD MOBILE MONEY (T-MONEY / FLOOZ)</span>
          </div>

        </div>

      </div>
    </div>
  );
}
