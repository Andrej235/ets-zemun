import Expander from "@components/expander/expander";
import StudentsPageParentParliament from "./students-page-parent-parliament";
import StudentsPageStudentParliament from "./students-page-student-parliament";
import "./students.scss";
import StudentsPagePartTime from "./students-page-part-time";
import StudentsPagePPService from "./students-page-pp-service";
import StudentsPageAntiBullying from "./students-page-anti-bullying";
import StudentsPageMentalHealth from "./students-page-mental-health";

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
        <StudentsPagePartTime />
      </Expander>

      <Expander title="Psihološko-pedagoška (PP) služba" initiallyOpen>
        <StudentsPagePPService />
      </Expander>

      <Expander title="Nasilje" initiallyOpen>
        <StudentsPageAntiBullying />
      </Expander>

      <Expander title="Mentalno Zdravlje" initiallyOpen>
        <StudentsPageMentalHealth />
      </Expander>
    </div>
  );
}

