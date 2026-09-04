import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { BRAND, SOCIAL_MEDIA } from '@/utils/constants';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="bg-brand-white">
        {/* Hero */}
        <div className="bg-brand-cream border-b border-brand-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Contact Us</h1>
            <p className="text-brand-gray-600">We'd love to hear from you. Reach out anytime.</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              {/* WhatsApp */}
              <div>
                <h3 className="font-bold text-lg mb-3 flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-brand-gold" />
                  <span>WhatsApp</span>
                </h3>
                <p className="text-brand-gray-600 mb-3">
                  Chat with us directly on WhatsApp for quick responses.
                </p>
                <a
                  href={`https://wa.me/${BRAND.whatsapp.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-gold font-semibold hover:text-brand-black"
                >
                  {BRAND.whatsapp}
                </a>
              </div>

              {/* Email */}
              <div>
                <h3 className="font-bold text-lg mb-3 flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-brand-gold" />
                  <span>Email</span>
                </h3>
                <p className="text-brand-gray-600 mb-3">
                  Send us an email and we'll get back to you soon.
                </p>
                <a
                  href="mailto:contact@pradsfashion.com"
                  className="text-brand-gold font-semibold hover:text-brand-black"
                >
                  contact@pradsfashion.com
                </a>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-bold text-lg mb-3">Follow Us</h3>
                <div className="space-y-2">
                  <a
                    href={SOCIAL_MEDIA.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-brand-gold hover:text-brand-black font-semibold"
                  >
                    Instagram
                  </a>
                  <a
                    href={SOCIAL_MEDIA.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-brand-gold hover:text-brand-black font-semibold"
                  >
                    TikTok
                  </a>
                  <a
                    href={SOCIAL_MEDIA.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-brand-gold hover:text-brand-black font-semibold"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-brand-cream p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    placeholder="Your name"
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="Your email"
                    required
                  />
                </div>

                <Input
                  label="Subject"
                  placeholder="What is this about?"
                  required
                />

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    placeholder="Your message"
                    rows={6}
                    required
                    className="w-full px-4 py-2 border border-brand-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  />
                </div>

                <Button variant="primary" fullWidth>
                  Send Message
                </Button>

                <p className="text-sm text-brand-gray-600 text-center">
                  For fastest response, please use WhatsApp above.
                </p>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-brand-black text-brand-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2">How do I place an order?</h3>
                <p className="text-brand-gray-300">
                  Browse our collection, add items to your cart, and proceed to checkout. 
                  You can also order directly via WhatsApp for personalized assistance.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">What are the shipping options?</h3>
                <p className="text-brand-gray-300">
                  We offer standard shipping with tracking. Shipping details and costs are provided during checkout.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Can I return items?</h3>
                <p className="text-brand-gray-300">
                  Please refer to our Return Policy for detailed information. 
                  Contact us via WhatsApp for specific return inquiries.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Do you offer custom orders?</h3>
                <p className="text-brand-gray-300">
                  Yes! We love custom projects. Contact us via WhatsApp to discuss your specific requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
