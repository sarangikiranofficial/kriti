import React, { useState, useEffect } from 'react';
import { Mail, MessageCircle, MessageSquare, CheckCircle, Clock, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../common/Toast';
import { EmptyState } from '../common/EmptyState';
import type { Enquiry, EnquiryStatus } from '../../types/database.types';

export const EnquiriesInbox: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .eq('artist_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEnquiries((data as Enquiry[]) || []);
    } catch (err: any) {
      showToast(err.message || 'Failed to fetch enquiries.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [user]);

  const handleToggleStatus = async (enquiryId: string, currentStatus: EnquiryStatus) => {
    const nextStatus: EnquiryStatus = currentStatus === 'unread' ? 'read' : 'unread';
    try {
      const { error } = await supabase
        .from('enquiries')
        .update({ status: nextStatus })
        .eq('id', enquiryId);

      if (error) throw error;

      setEnquiries((prev) =>
        prev.map((item) => (item.id === enquiryId ? { ...item, status: nextStatus } : item))
      );
      showToast(`Marked as ${nextStatus}.`, 'info');
    } catch (err: any) {
      showToast(err.message || 'Failed to update enquiry status.', 'error');
    }
  };

  const handleDeleteEnquiry = async (enquiryId: string) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      const { error } = await supabase.from('enquiries').delete().eq('id', enquiryId);
      if (error) throw error;

      setEnquiries((prev) => prev.filter((item) => item.id !== enquiryId));
      showToast('Enquiry deleted.', 'info');
    } catch (err: any) {
      showToast(err.message || 'Failed to delete enquiry.', 'error');
    }
  };

  const isPhoneNumber = (contact: string) => {
    return /^[\d\s+\-()]{7,}$/.test(contact.trim());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-2 border-b border-terracotta/20">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-oxblood">
            Patron Enquiries &amp; Commissions
          </h2>
          <p className="text-xs text-charcoal/70 mt-0.5">
            Direct purchase requests, exhibition invites, and custom art commissions.
          </p>
        </div>
        <span className="text-xs font-bold text-terracotta bg-paper-cream px-3 py-1 rounded-full border border-terracotta/20">
          {enquiries.length} {enquiries.length === 1 ? 'Message' : 'Messages'}
        </span>
      </div>

      {loading ? (
        <div className="py-12 text-center text-charcoal/60 text-sm">
          Loading patron enquiries...
        </div>
      ) : enquiries.length === 0 ? (
        <EmptyState
          title="No Enquiries Yet"
          description="When art patrons and curators discover your artwork cards or portfolio, their messages and commission requests will arrive here with WhatsApp and email reply shortcuts."
          icon={<MessageSquare className="w-6 h-6" />}
        />
      ) : (
        <div className="space-y-4">
          {enquiries.map((enquiry) => (
            <div
              key={enquiry.id}
              className={`p-5 rounded-xl border transition-all ${
                enquiry.status === 'unread'
                  ? 'bg-paper-cream/80 border-madder-red/40 shadow-xs'
                  : 'bg-warm-ivory border-terracotta/20 opacity-90'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      enquiry.status === 'unread' ? 'bg-madder-red animate-pulse' : 'bg-charcoal/30'
                    }`}
                  />
                  <h3 className="font-serif text-base font-bold text-oxblood">
                    {enquiry.sender_name}
                  </h3>
                  <span className="text-[11px] font-semibold text-terracotta bg-warm-ivory px-2 py-0.5 rounded border border-terracotta/20">
                    {enquiry.enquiry_type}
                  </span>
                  {enquiry.budget && (
                    <span className="text-[11px] text-charcoal/70 bg-paper-cream px-2 py-0.5 rounded border border-terracotta/15">
                      Budget: {enquiry.budget}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-charcoal/60">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{new Date(enquiry.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Message Content */}
              <p className="text-xs sm:text-sm text-charcoal/85 leading-relaxed bg-warm-ivory p-3.5 rounded-lg border border-terracotta/15 mb-4 whitespace-pre-line">
                "{enquiry.message}"
              </p>

              {/* Contact & Reply Shortcuts */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-2 border-t border-terracotta/15">
                <div className="flex items-center gap-2 text-charcoal/80">
                  <span className="font-semibold text-oxblood">Contact:</span>
                  <span className="font-mono bg-paper-cream px-2 py-0.5 rounded border border-terracotta/20">
                    {enquiry.sender_contact}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* WhatsApp shortcut if phone */}
                  {isPhoneNumber(enquiry.sender_contact) && (
                    <a
                      href={`https://wa.me/${enquiry.sender_contact.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Namaskaram ${enquiry.sender_name}, thank you for your ${enquiry.enquiry_type} enquiry on Kriti.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-white font-semibold hover:bg-[#20ba59] transition shadow-2xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Reply</span>
                    </a>
                  )}

                  {/* Mailto shortcut */}
                  <a
                    href={`mailto:${enquiry.sender_contact}?subject=${encodeURIComponent(
                      `Response to your ${enquiry.enquiry_type} enquiry on Kriti`
                    )}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-madder-red text-warm-ivory font-semibold hover:bg-madder-red/90 transition shadow-2xs"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Reply</span>
                  </a>

                  {/* Toggle Read/Unread */}
                  <button
                    onClick={() => handleToggleStatus(enquiry.id, enquiry.status)}
                    className="p-1.5 rounded-lg border border-terracotta/30 text-charcoal/70 hover:text-oxblood hover:bg-paper-cream transition"
                    title={enquiry.status === 'unread' ? 'Mark as Read' : 'Mark as Unread'}
                  >
                    <CheckCircle className={`w-4 h-4 ${enquiry.status === 'read' ? 'text-leaf-green' : ''}`} />
                  </button>

                  {/* Delete Enquiry */}
                  <button
                    onClick={() => handleDeleteEnquiry(enquiry.id)}
                    className="p-1.5 rounded-lg text-charcoal/60 hover:text-madder-red hover:bg-paper-cream transition"
                    title="Delete Enquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
