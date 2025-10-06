import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Shield, 
  Users, 
  Lock, 
  AlertCircle, 
  CheckCircle, 
  X,
  ChevronDown,
  ChevronUp,
  ArrowLeft
} from 'lucide-react';
import imge from '../../assets/images/aboutus/about-1.jpg';

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const handleAcceptTerms = () => {
    setAcceptedTerms(true);
    setShowAcceptModal(true);
    setTimeout(() => setShowAcceptModal(false), 3000);
  };

  const termsData = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "1. Introduction and Acceptance",
      content: `Welcome to ShyEyes Dating Platform. By accessing or using our services, you agree to be bound by these Terms and Conditions. These terms govern your use of our platform, including all features, content, and services we offer.

• You must be at least 18 years old to use our services
• You agree to provide accurate and truthful information
• You understand that creating false profiles is strictly prohibited
• You acknowledge that we may update these terms from time to time

By continuing to use our platform, you accept these terms in their entirety. If you do not agree with any part of these terms, please discontinue use of our services immediately.`
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "2. User Accounts and Responsibilities",
      content: `Creating and maintaining an account on ShyEyes comes with certain responsibilities:

Account Creation:
• You must provide accurate, current, and complete information
• You are responsible for maintaining the confidentiality of your account credentials
• You must not share your account with others
• You agree to notify us immediately of any unauthorized access

User Conduct:
• Be respectful and courteous to all users
• Do not harass, threaten, or intimidate other users
• Do not post inappropriate, offensive, or illegal content
• Do not use the platform for commercial purposes without authorization
• Do not attempt to manipulate or exploit platform features

Profile Information:
• Use recent, genuine photos of yourself
• Provide honest information about your age, location, and interests
• Do not impersonate others or create fake profiles
• Update your information to keep it current and accurate`
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "3. Privacy and Data Protection",
      content: `Your privacy is important to us. This section outlines how we handle your personal information:

Data Collection:
• We collect information you provide during registration
• We gather usage data to improve our services
• Location data may be collected with your permission
• We use cookies and similar technologies

Data Usage:
• Your data helps us provide personalized matches
• We use information to improve platform functionality
• Data may be used for security and fraud prevention
• Analytics help us understand user behavior

Data Protection:
• We implement industry-standard security measures
• Your data is encrypted both in transit and at rest
• We never sell your personal information to third parties
• You can request data deletion at any time

Third-Party Services:
• We may use third-party services for payment processing
• Analytics providers help us understand platform usage
• These services have their own privacy policies
• We ensure third parties comply with data protection standards`
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "4. Safety and Security Guidelines",
      content: `Your safety is our priority. Please follow these guidelines:

Personal Safety:
• Never share personal information too quickly
• Meet in public places for first dates
• Inform friends or family about your plans
• Trust your instincts—if something feels wrong, it probably is
• Report suspicious behavior immediately

Financial Security:
• Never send money to people you meet on the platform
• Be wary of requests for financial assistance
• Report any attempts at financial fraud
• Use secure payment methods for subscriptions

Content Safety:
• Do not share explicit content without consent
• Report inappropriate content or behavior
• Block users who make you uncomfortable
• Screenshots and recordings should respect privacy

Platform Security:
• Use strong, unique passwords
• Enable two-factor authentication when available
• Log out from shared devices
• Keep your app updated to the latest version`
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "5. Prohibited Activities",
      content: `The following activities are strictly prohibited on our platform:

Content Violations:
• Posting illegal, harmful, or offensive content
• Sharing explicit material without consent
• Promoting violence, hate speech, or discrimination
• Spreading false information or scams

Behavioral Violations:
• Harassment, stalking, or threatening other users
• Catfishing or creating fake profiles
• Soliciting money or financial information
• Spamming or sending unsolicited promotional content

Technical Violations:
• Attempting to hack or compromise platform security
• Using bots, scrapers, or automated tools
• Reverse engineering the application
• Accessing accounts without authorization

Commercial Violations:
• Using the platform for unauthorized business purposes
• Advertising products or services without permission
• Recruiting for multi-level marketing schemes
• Soliciting for escort or adult services

Consequences:
• First offense: Warning and content removal
• Repeated violations: Temporary account suspension
• Serious violations: Permanent account termination
• Legal violations: Report to law enforcement authorities`
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "6. Subscription and Payment Terms",
      content: `Our platform offers both free and premium subscription options:

Free Membership:
• Basic profile creation and browsing
• Limited daily likes and matches
• Standard messaging features
• Access to basic search filters

Premium Subscriptions:
• Unlimited likes and super likes
• Advanced search and filter options
• See who liked your profile
• Priority customer support
• Ad-free experience

Payment Terms:
• Subscriptions are billed in advance
• Prices may vary by region and currency
• Auto-renewal occurs unless cancelled
• Refunds are subject to our refund policy

Cancellation Policy:
• You can cancel anytime from account settings
• Cancellation takes effect at the end of billing period
• No refunds for partial subscription periods
• Premium features remain active until expiration

Refund Policy:
• Refunds available within 14 days of purchase (subject to usage)
• Technical issues may qualify for partial refunds
• Subscription transfers are not permitted
• Contact support for refund requests`
    },
//     {
//       icon: <Shield className="w-6 h-6" />,
//       title: "7. Intellectual Property Rights",
//       content: `All content and materials on ShyEyes are protected by intellectual property laws:

// Our Rights:
// • Platform design, logos, and branding are our property
// • Software code and algorithms are proprietary
// • Content we create remains our intellectual property
// • Trademarks and service marks are protected

// Your Rights:
// • You retain ownership of content you post
// • You grant us license to use your content on the platform
// • This license allows us to display, distribute, and promote content
// • License terminates when you delete content or your account

// Usage Restrictions:
// • Do not copy, modify, or distribute platform elements
// • Do not use our trademarks without written permission
// • Do not create derivative works from our platform
// • Respect intellectual property of other users

// Content License:
// • By posting content, you grant us a worldwide, non-exclusive license
// • We may use content for promotional purposes
// • Content may appear in recommendations and features
// • You represent that you have rights to all content you post`
//     },
//     {
//       icon: <AlertCircle className="w-6 h-6" />,
//       title: "8. Disclaimers and Limitations",
//       content: `Please understand the following limitations of our service:

// Service Disclaimer:
// • Platform is provided "as is" without warranties
// • We do not guarantee specific results or matches
// • Service availability may be interrupted
// • Features may change or be discontinued

// No Guarantee of Results:
// • We cannot guarantee you will find a match
// • Success depends on many factors beyond our control
// • User profiles are self-reported and not verified
// • We are not responsible for offline interactions

// Limitation of Liability:
// • We are not liable for indirect or consequential damages
// • Our liability is limited to subscription fees paid
// • We are not responsible for user conduct or content
// • Force majeure events release us from obligations

// Third-Party Content:
// • Links to external websites are provided for convenience
// • We do not endorse or control third-party sites
// • We are not responsible for third-party content or services
// • Use of third-party services is at your own risk

// User Interactions:
// • We are not responsible for offline meetings or relationships
// • Users are solely responsible for their interactions
// • We recommend following safety guidelines
// • Report any concerning behavior to our support team`
//     },
//     {
//       icon: <Users className="w-6 h-6" />,
//       title: "9. Dispute Resolution",
//       content: `If disputes arise, we encourage resolution through these methods:

// Customer Support:
// • Contact our support team first for assistance
// • We aim to resolve issues within 5-7 business days
// • Provide detailed information about your concern
// • Keep communication professional and respectful

// Mediation:
// • If support cannot resolve the issue, mediation is available
// • Both parties agree to good-faith negotiation
// • Mediation costs may be shared equally
// • Mediation decisions are non-binding

// Arbitration:
// • Unresolved disputes may proceed to arbitration
// • Arbitration is binding and final
// • Class action waivers apply
// • Arbitration location follows local laws

// Legal Jurisdiction:
// • These terms are governed by applicable local laws
// • Exclusive jurisdiction in courts of our registered location
// • You waive right to jury trial
// • Legal costs may be awarded to prevailing party

// Exceptions:
// • Intellectual property disputes may be litigated
// • Injunctive relief may be sought in court
// • Small claims court remains available option
// • Government authorities may investigate violations`
//     },
//     {
//       icon: <FileText className="w-6 h-6" />,
//       title: "10. Changes and Termination",
//       content: `We reserve the right to modify these terms and terminate accounts:

// Terms Modifications:
// • We may update terms at any time
// • Significant changes will be notified via email or platform
// • Continued use constitutes acceptance of new terms
// • You should review terms regularly

// Account Termination by You:
// • You may delete your account at any time
// • Deletion is permanent and irreversible
// • Some data may be retained for legal purposes
// • Outstanding subscription fees remain due

// Account Termination by Us:
// • We may terminate accounts for terms violations
// • Suspicious or fraudulent activity may result in immediate termination
// • Multiple user reports may trigger review and termination
// • We are not required to provide specific reasons for termination

// Effects of Termination:
// • All access to platform features ceases
// • Your profile and content are removed
// • Subscriptions are cancelled (no refunds)
// • You remain liable for any outstanding obligations

// Data After Termination:
// • Personal data is deleted per our privacy policy
// • Some information may be retained for legal compliance
// • Anonymous aggregated data may be retained
// • You can request data export before termination`
//     }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <div className="relative overflow-hidden py-12 sm:py-16">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={imge}
            alt="Terms Background"
            className="w-full h-full object-cover"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-r from-pink-500/90 to-pink-400/90"></div> */}
          <div className="absolute inset-0 bg-gradient-to-t from-pink-600/70 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-white hover:text-pink-100 transition-colors mb-6 text-sm font-medium backdrop-blur-sm bg-white/10 px-4 py-2 rounded-lg"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl shadow-lg">
              <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                Terms & Conditions
              </h1>
              <p className="text-pink-100 mt-2 text-sm sm:text-base drop-shadow-md">
                Last updated: October 6, 2025
              </p>
            </div>
          </div>
          
          <p className="text-lg text-white max-w-3xl drop-shadow-md backdrop-blur-sm bg-white/5 p-4 rounded-xl">
            Please read these terms carefully before using ShyEyes. By accessing our platform, you agree to be bound by these terms and conditions.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Important Notice */}
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 sm:p-6 rounded-r-xl mb-8 shadow-sm">
          <div className="flex gap-3">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-900 text-lg mb-2">
                Important Notice
              </h3>
              <p className="text-amber-800 text-sm sm:text-base leading-relaxed">
                These terms constitute a legally binding agreement between you and ShyEyes. By using our platform, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree, please do not use our services.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="space-y-4">
          {termsData.map((section, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg"
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full flex items-center justify-between p-4 sm:p-6 text-left transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3 sm:gap-4 flex-1">
                  <div className="bg-gradient-to-br from-pink-500 to-pink-400 text-white p-2 sm:p-3 rounded-xl flex-shrink-0">
                    {section.icon}
                  </div>
                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                    {section.title}
                  </h2>
                </div>
                <div className="text-pink-500 ml-2 flex-shrink-0">
                  {activeSection === index ? (
                    <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </div>
              </button>

              <div 
                className={`transition-all duration-300 ease-in-out ${
                  activeSection === index 
                    ? 'max-h-[2000px] opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0">
                  <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="mt-12 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 sm:p-8 shadow-md border border-pink-100">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Questions or Concerns?
          </h3>
          <p className="text-gray-700 mb-6 text-sm sm:text-base leading-relaxed">
            If you have any questions about these Terms and Conditions, please don't hesitate to contact us:
          </p>
          <div className="space-y-3 text-sm sm:text-base">
            <div className="flex items-start gap-3">
              <div className="bg-pink-500 text-white p-2 rounded-lg flex-shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Email Support</p>
                <a href="mailto:support@shyeyes.com" className="text-pink-600 hover:text-pink-700 transition-colors">
                  support@shyeyes.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-pink-500 text-white p-2 rounded-lg flex-shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Customer Service</p>
                <p className="text-gray-600">Available 24/7 via in-app chat</p>
              </div>
            </div>
          </div>
        </div>

        {/* Acceptance Button */}
        <div className="mt-8 bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-gray-100">
          <div className="flex items-start gap-3 mb-6">
            <input
              type="checkbox"
              id="accept-terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-1 w-5 h-5 text-pink-500 border-gray-300 rounded focus:ring-pink-500 cursor-pointer"
            />
            <label htmlFor="accept-terms" className="text-gray-700 text-sm sm:text-base cursor-pointer">
              I have read and agree to the Terms and Conditions outlined above. I understand my rights and responsibilities as a user of ShyEyes platform.
            </label>
          </div>
          <button
            onClick={handleAcceptTerms}
            disabled={!acceptedTerms}
            className={`w-full py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 ${
              acceptedTerms
                ? 'bg-gradient-to-r from-pink-500 to-pink-400 text-white hover:from-pink-600 hover:to-pink-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {acceptedTerms ? 'Accept Terms & Continue' : 'Please Read and Check Above'}
          </button>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 to-pink-400 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      {/* Success Modal */}
      {showAcceptModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-slideInUp">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-2">
              Terms Accepted!
            </h3>
            <p className="text-center text-gray-600 text-sm sm:text-base">
              Thank you for accepting our terms and conditions. You can now enjoy all features of ShyEyes.
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideInUp {
          animation: slideInUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TermsAndConditions;