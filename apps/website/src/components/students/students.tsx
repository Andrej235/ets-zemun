import Expander from "@components/expander/expander";
import StudentsPageParentParliament from "./students-page-parent-parliament";
import StudentsPageStudentParliament from "./students-page-student-parliament";
import "./students.scss";
import StudentsPagePartTimeSection from "./students-page-part-time-section";
import StudentsPagePPService from "./students-page-pp-service";

export default function Students() {
  return (
    <div className="students-page-container">
      <div className="parliaments-container">
        <Expander title="Ucenicki parlament">
          <StudentsPageStudentParliament />
        </Expander>

        <Expander title="Savet roditelja">
          <StudentsPageParentParliament />
        </Expander>
      </div>

      <Expander title="Vanredni učenici">
        <StudentsPagePartTimeSection />
      </Expander>

      <Expander title="Psihološko-pedagoška (PP) služba" initiallyOpen>
        <StudentsPagePPService />
      </Expander>
    </div>
  );
}

