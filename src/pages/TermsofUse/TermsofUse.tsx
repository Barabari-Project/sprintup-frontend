import React from "react";
import styles from "./TermsofUse.module.scss";
import classNames from "classnames";

const TermsofUse: React.FC = () => {
  return (
    <div className={styles.termsSection}>
      <div className={styles.termsOfUse}>
        <h1 className={styles.pageHeading}>Terms of Use</h1>

        <section>
          <h3 className={styles.title}>Terms of Service</h3>
          <p className={classNames(styles.mb_1)}>
            These Terms of Service (the “ToS”) apply to the usage of the
            Platform (defined hereinafter) and the services offered by SprintUp
            Digital Space Private Limited (“SprintUp”, “we”, or “us”), having
            its office at B-2/12, Second Floor, Vibhuti Khand, Gomti Nagar,
            Lucknow, Uttar Pradesh - 226010 IN. By accessing the website at{" "}
            <a href="mailto:https://www.sprintup.in">https://www.sprintup.in</a>
            , you are agreeing to be bound by these terms of service, and all
            applicable laws and regulations, and you agree that you are
            responsible for compliance with any applicable local laws
          </p>
          <p>
            These Terms of Service shall mutatis mutandis apply to mobile apps,
            WhatsApp groups, Facebook groups, Instagram pages, Facebook pages,
            email/SMS/phone communications and other communication forums/media
            hosted by SprintUp, which shall be deemed to be part of the Platform
            (defined hereinafter). IF YOU DO NOT AGREE TO BE BOUND BY ALL
            CONDITIONS/CLAUSES CAPTURED IN THESE TOS, PLEASE DO NOT USE THE
            PLATFORM OR SERVICES.
          </p>
        </section>

        <section>
          <h3 className={styles.title}>Platform Usage License</h3>
          <ul className={classNames(styles.list_number, styles.list_inside)}>
            <li className={styles.mb_1}>
              Permission is granted to temporarily download one copy of the
              materials (information or software) on the SprintUp website for
              personal, non-commercial transitory viewing only. This is the
              grant of a licence, not a transfer of title, and under this
              licence, you may not:
              <ul
                className={classNames(
                  styles.list_roman,
                  styles.ml_1,
                  styles.flex_col,
                  styles.gap_1,
                  styles.mt_1
                )}
              >
                <li>modify or copy the materials;</li>
                <li>
                  use the materials for any commercial purpose, or any public
                  display (commercial or non-commercial);
                </li>
                <li>
                  attempt to decompile or reverse engineer any software
                  contained on SprintUp's website;
                </li>
                <li>
                  remove any copyright or other proprietary notations from the
                  materials; or
                </li>
                <li>
                  transfer the materials to another person or "mirror" the
                  materials on any other server.
                </li>
              </ul>
            </li>
            <li>
              This licence shall automatically terminate if you violate any of
              these restrictions and may be terminated by SprintUp at any time.
              Upon terminating your viewing of these materials or upon the
              termination of this licence, you must destroy any downloaded
              materials in your possession whether in electronic or printed
              format.
            </li>
          </ul>
        </section>

        <section>
          <h3 className={styles.title}>Disclaimer</h3>
          <ul
            className={classNames(
              styles.list_number,
              styles.flex_col,
              styles.gap_1,
              styles.list_inside
            )}
          >
            <li>
              The materials on SprintUp's website are provided on an 'as is'
              basis. SprintUp makes no warranties, expressed or implied, and
              hereby disclaims and negates all other warranties including,
              without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of
              rights.
            </li>
            <li>
              Further, SprintUp does not warrant or make any representations
              concerning the accuracy, likely results, or reliability of the use
              of the materials on its website or otherwise relating to such
              materials or on any sites linked to this site.
            </li>
          </ul>
        </section>

        <section>
          <h3 className={styles.title}>Limitations</h3>
          <p>
            In no event shall SprintUp or its suppliers be liable for any
            damages (including, without limitation, damages for loss of data or
            profit, or due to business interruption) arising out of the use or
            inability to use the materials on SprintUp's website, even if
            SprintUp or a SprintUp authorised representative has been notified
            orally or in writing of the possibility of such damage. Because some
            jurisdictions do not allow limitations on implied warranties or
            limitations of liability for consequential or incidental damages,
            these limitations may not apply to you.
          </p>
        </section>

        <section>
          <h3 className={styles.title}>Accuracy of materials</h3>
          <p>
            The materials appearing on SprintUp’s website could include
            technical, typographical, or photographic errors. SprintUp does not
            warrant that any of the materials on its website are accurate,
            complete or current. SprintUp may make changes to the materials
            contained on its website at any time without notice. However,
            SprintUp does not make any commitment to update the materials.
          </p>
        </section>

        <section>
          <h3 className={styles.title}>Links</h3>
          <p>
            SprintUp has not reviewed all of the sites linked to its website and
            is not responsible for the contents of any such linked site. The
            inclusion of any link does not imply endorsement by SprintUp of the
            site. Use of any such linked website is at the user's own risk.
          </p>
        </section>

        <section>
          <h3 className={styles.title}>Modifications</h3>
          <p>
            SprintUp may revise these terms of service for its website at any
            time without notice. By using this website you are agreeing to be
            bound by the then-current version of these terms of service.
          </p>
        </section>

        <section>
          <h3 className={styles.title}>Governing Law</h3>
          <p>
            These terms and conditions are governed by and construed under the
            laws of India and you irrevocably submit to the exclusive
            jurisdiction of the courts in that State or location.
          </p>
        </section>

        <section>
          <h3 className={styles.title}>Communication Policy</h3>
          <p className={styles.mb_1}>
            SprintUp may use the information submitted by you to respond to any
            queries raised by you pursuant to your use and access to the
            Website. We may also use this information to send you e-mails,
            Whatsapp messages, calls and SMS for administrative and marketing
            purposes, through its servers and systems; or through third-party
            e-mails, Whatsapp messages, calls and SMS service providers.
          </p>

          <p>
            Users can unsubscribe/opt-out from our communications sent via
            e-mails, Whatsapp messages, calls and SMS anytime: Please email us
            at <a href="mailto:help.sprintup@gmail.com">help.sprintup@gmail.com</a> to
            unsubscribe from e-mails, WhatsApp messages, calls and SMS; Users
            can also unsubscribe from emails, by clicking the "Unsubscribe URL"
            mentioned in the footer of the emails.
          </p>
        </section>

        <section>
          <h3 className={styles.title}>Placement Guarantee Policy:</h3>
          <p>
            For the MERN Full Stack Web Development Course, SprintUp offers a
            100% Placement Guarantee Assurance program to all students who
            complete the course. By completing the course, SprintUp implies the
            following criteria:
          </p>
          <ul
            className={classNames(
              styles.mb_1,
              styles.list_disc,
              styles.list_inside,
              styles.ml_1,
              styles.mt_1,
              styles.flex_col,
              styles.gap_1_2
            )}
          >
            <li>Attend more than 90% of all mandatory in-class lectures</li>
            <li>Complete all assignments in due time</li>
            <li>Secure over 80% in all the internal tests</li>
            <li>
              No cheating, plagiarism, or using any other illegal means to
              complete the assignment
            </li>
            <li>
              No internal complaints against the candidate, wherein the
              candidate is found to have harmed any colleague, teacher or staff
            </li>
          </ul>
          <p className={styles.mb_1}>
            Exceptions to the attendance policy can be allowed only in
            extraordinary scenarios including accidents to self or kin, passing
            in the family, and medical reasons. All such cases will have to be
            verified by the student within a week of missing the class.
          </p>
          <p>
            If the student is found violating any of the criteria mentioned
            above, they will be disqualified from the 100% placement guarantee
            policy. However, they will still get 100% placement support from the
            team. This includes a dedicated resume review session, 4 mock
            interviews, and guidance around the interview process. This support
            will be limited to 12 months from the day of the last lecture of the
            course. The 100% Placement Guarantee Assurance will not be
            applicable to students in their 1st year or 2nd year of college.
          </p>
        </section>

        <section>
          <h3 className={styles.title}>
            100% Placement Guarantee Assurance program:
          </h3>
          <p>
            The students who will qualify for the 100% Placement Guarantee
            Assurance program will get at least 10 interview opportunities in a
            maximum span of 12 months from the day of program completion. Along
            with the interviews, the SprintUp team will constantly provide
            mentoring support to these students.
          </p>
          <p>The placement mentoring support will include the following:</p>
          <ul
            className={classNames(
              styles.mb_1,
              styles.list_disc,
              styles.list_inside,
              styles.ml_1,
              styles.mt_1,
              styles.flex_col,
              styles.gap_1_2
            )}
          >
            <li>1:1 mentor-mentee connect</li>
            <li>Resume building & refining process</li>
            <li>4 mock interviews with expert mentors</li>
            <li>Preparation material for future material</li>
            <li>Guidance to navigate future interview rounds</li>
          </ul>
          <p>
            Notably, a student who has qualified for the 100% Placement
            Guarantee Assurance program may be disqualified in the following
            scenarios:
          </p>
          <ul
            className={classNames(
              styles.list_dash,
              styles.list_inside,
              styles.ml_1,
              styles.mt_1,
              styles.flex_col,
              styles.gap_1_2
            )}
          >
            <li>
              The qualified candidate doesn’t show up for two or more scheduled
              interviews or placement rounds.
            </li>
            <li>
              The qualified candidate is found cheating, plagiarising or using
              other illegal means during the interview process.
            </li>
            <li>
              The qualified candidate showcases unruly behaviour towards other
              students, instructors, or staff within the office premises or in
              online forums.
            </li>
          </ul>
        </section>

        <section>
          <h3 className={styles.title}>Cancellation and Refund Policies:</h3>
          <p className={styles.mb_1}>
            For our MERN Full Stack Development Program, students receive a
            14-day trial starting from their first class.
          </p>
          <p>
            The following refund policy would be followed with respect to the
            booking amount and the full fee payments:
          </p>
          <ul
            className={classNames(
              styles.mb_1,
              styles.list_disc,
              styles.list_inside,
              styles.ml_1,
              styles.mt_1,
              styles.flex_col,
              styles.gap_1_2
            )}
          >
            <li>The booking amount is non-refundable.</li>
            <li>Full payments are non-refundable after the trial period.</li>
          </ul>
          <p>
            For exceptional cases, please mail the details of the case to{" "}
            <a href="mailto:help.sprintup@gmail.com">help.sprintup@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsofUse;
