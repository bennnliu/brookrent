import React from "react";

function TermsofServicesPage() {
  return (
    <main className="flex flex-col items-center px-4 py-6 gap-6">
      
      <h1 className="text-3xl md:text-5xl font-bold text-center">
        Terms of Service
      </h1>

      <hr className="w-full max-w-4xl border-black" />

      <section className="flex flex-col gap-6 max-w-3xl text-base md:text-lg leading-relaxed">
        <p>
          <strong>1.</strong> Seawolves Housing Hub is a student-run platform created
          to help Stony Brook University students connect with off-campus housing
          opportunities, roommates, and rental resources. We are not affiliated
          with or endorsed by Stony Brook University.
        </p>

        <p>
          <strong>2.</strong> All listings and information on this site are
          submitted by users and are not independently verified. Seawolves Housing
          Hub makes no representations or warranties regarding the accuracy,
          reliability, or legality of any listings. Users are responsible for
          verifying all information, including property conditions, lease terms,
          and landlord legitimacy, before making any agreements or payments.
        </p>

        <p>
          <strong>3.</strong> Seawolves Housing Hub does not act as a broker, agent,
          or intermediary in any transaction and does not handle payments or lease
          negotiations. All users must comply with Fair Housing laws and avoid
          discriminatory language or practices. By using this website, you agree
          that Seawolves Housing Hub and its student administrators are not liable
          for any damages, disputes, or losses that may arise from use of this
          platform.
        </p>
      </section>
    </main>
  );
}

export default TermsofServicesPage;

