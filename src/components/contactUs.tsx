import React from 'react';
import { Phone, Mail, MapPin, Clock, Send, User, Smartphone } from 'lucide-react';

const ContactPage = () => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-serif font-bold text-gray-900">Hubungi Kami</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Punya pertanyaan tentang produk atau ingin melakukan pemesanan khusus? Tim kami siap membantu Anda dengan sepenuh hati.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* KOLOM KIRI & TENGAH: INFO KARTU */}
          <div className="lg:col-span-1 grid grid-cols-1 gap-6">
            <ContactInfoCard 
              icon={<Phone className="text-purple-600" size={24} />}
              title="Telepon"
              detail="+62 812 3456 7890"
              subDetail="Senin - Sabtu, 09:00 - 18:00"
            />
            <ContactInfoCard 
              icon={<Mail className="text-purple-600" size={24} />}
              title="Email"
              detail="info@storeanda.com"
              subDetail="Dibalas dalam 24 jam"
            />
            <ContactInfoCard 
              icon={<MapPin className="text-purple-600" size={24} />}
              title="Lokasi"
              detail="Yogyakarta"
              subDetail="Indonesia - 12345"
            />
          </div>

          {/* KOLOM KANAN: FORM MODERN */}
          <div className="lg:col-span-2 bg-[#F9FAFB] rounded-2xl p-8 md:p-12 border border-gray-100 shadow-sm">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Nama Depan</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input type="text" placeholder="Dita" className="w-full p-3 pl-10 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Nama Belakang</label>
                  <input type="text" placeholder="Karang" className="w-full p-3 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">No. WhatsApp</label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input type="text" placeholder="0812..." className="w-full p-3 pl-10 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input type="email" placeholder="Dita@example.com" className="w-full p-3 pl-10 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Pesan Anda</label>
                <textarea rows={4} placeholder="Tuliskan detail pertanyaan Anda di sini..." className="w-full p-3 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all resize-none"></textarea>
              </div>

              <button type="submit" className="w-full md:w-auto px-10 py-4 bg-purple-700 text-white font-bold rounded-lg flex items-center justify-center gap-3 hover:bg-purple-800 transition-all shadow-lg shadow-purple-200 active:scale-95">
                Kirim Pesan <Send size={18} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

// Sub-component untuk Info agar kode lebih bersih
const ContactInfoCard = ({ icon, title, detail, subDetail }: any) => (
  <div className="flex items-start gap-5 p-6 rounded-xl bg-white border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
    <div className="p-3 bg-purple-50 rounded-lg">
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-gray-900">{title}</h4>
      <p className="text-purple-700 font-medium text-sm mt-1">{detail}</p>
      <p className="text-gray-400 text-xs mt-1">{subDetail}</p>
    </div>
  </div>
);

export default ContactPage;