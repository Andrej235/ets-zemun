import Expander from "@components/expander/expander";
import StudentsPageParentParliament from "./students-page-parent-parliament";
import StudentsPageStudentParliament from "./students-page-student-parliament";
import "./students.scss";

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
    </div>
  );
}

