import React, { useState } from "react"

interface TermsModalProps {
  onAccept: () => void
}

const TermsModal: React.FC<TermsModalProps> = ({ onAccept }) => {
  const [showPrivacy, setShowPrivacy] = useState(false)

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-xl w-full max-h-[90vh] overflow-y-scroll">
        {!showPrivacy ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Terms of Service</h2>
            <p className="mb-4">
              By using this site, you agree to the following terms and
              conditions:
            </p>
            <div className="mb-4 pr-2">
              <ol className="list-decimal list-inside">
                <li>You consent to the recording of your video and audio.</li>
                <li>
                  Your data will be handled according to our privacy policy.
                </li>
                <li>
                  Any misuse of the platform may result in account termination.
                </li>
                <li>We reserve the right to modify these terms at any time.</li>
                <li>
                  All content shared on the platform must comply with copyright
                  laws.
                </li>
                <li>
                  We are not liable for any technical issues that may arise
                  during use.
                </li>
                <li>
                  Any unauthorized access to the platform is strictly
                  prohibited.
                </li>
                <li>
                  We reserve the right to suspend or terminate accounts for
                  violations of these terms.
                </li>
                <li>
                  Users are responsible for maintaining the confidentiality of
                  their account credentials.
                </li>
                <li>
                  These terms are governed by the laws of the jurisdiction in
                  which we operate.
                </li>
              </ol>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowPrivacy(true)}
                className="bg-primary text-white px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">Privacy Policy</h2>
            <div className=" mb-4 pr-2">
              <p className="mb-4">
                Your privacy is important to us. We are committed to protecting
                your personal information and your right to privacy. Please
                review our privacy policy for more details.
              </p>
              <h3 className="font-semibold mb-2">Information We Collect</h3>
              <ol className="list-decimal list-inside mb-4">
                <li>
                  Personal Information: We may collect personal information that
                  you provide to us directly, such as your name, email address,
                  video of your interview, and your screen recording and any
                  other information you choose to provide.
                </li>
                <li>
                  Usage Data: We may collect information about how you access
                  and use our services, including your IP address, browser type,
                  and the time and date of your visit.
                </li>
              </ol>
              <h3 className="font-semibold mb-2">
                How We Use Your Information
              </h3>
              <ol className="list-decimal list-inside mb-4">
                <li>To provide, maintain, and improve our services.</li>
                <li>
                  To communicate with you, including sending updates and
                  notifications.
                </li>
                <li>To process your transactions and manage your account.</li>
                <li>
                  To analyze usage patterns and improve our website and
                  services.
                </li>
                <li>
                  To comply with legal obligations and protect our rights.
                </li>
              </ol>
              <h3 className="font-semibold mb-2">
                Disclosure of Your Information
              </h3>
              <ol className="list-decimal list-inside mb-4">
                <li>
                  With Service Providers: We may share your information with
                  third-party service providers who assist us in operating our
                  website and providing our services.
                </li>
                <li>
                  For Legal Reasons: We may disclose your information if
                  required to do so by law or in response to valid requests by
                  public authorities.
                </li>
              </ol>
              <h3 className="font-semibold mb-2">Data Security</h3>
              <p className="mb-4">
                We take reasonable measures to protect your information from
                unauthorized access, use, or disclosure. However, no method of
                transmission over the internet or method of electronic storage
                is 100% secure.
              </p>
              <h3 className="font-semibold mb-2">Your Rights</h3>
              <ol className="list-decimal list-inside mb-4">
                <li>Access, correct, or delete your personal information.</li>
                <li>
                  Withdraw consent to the processing of your personal
                  information.
                </li>
                <li>Object to the processing of your personal information.</li>
              </ol>
              <h3 className="font-semibold mb-2">
                Changes to This Privacy Policy
              </h3>
              <p className="mb-4">
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page.
              </p>
              <h3 className="font-semibold mb-2">Contact Us</h3>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, please
                contact us at:
              </p>
              <p className="mb-4">
                Interv <br />
                help@interv.cc <br />
              </p>
            </div>
            <p className="mb-4 text-left">
              <span className="font-bold text-primary">* </span>
              Please ensure you have a working camera and microphone for the
              best experience.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowPrivacy(false)}
                className="bg-gray-200 text-black px-4 py-2 rounded"
              >
                Back
              </button>
              <button
                onClick={onAccept}
                className="bg-primary text-white px-4 py-2 rounded"
              >
                I Accept
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default TermsModal
